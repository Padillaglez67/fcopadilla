#!/usr/bin/env python3
"""Revision completa de frandocencia.com servida por HTTP desde el arbol de trabajo.

Levanta su propio servidor en un puerto libre, abre Chromium con Playwright y
comprueba la web entera en escritorio y en movil. Sale con codigo 1 si hay
fallos, para poder encadenarlo antes de un commit.

    auditoria.py                 # revisa el repositorio actual
    auditoria.py --dir /ruta     # revisa otra copia
    auditoria.py --json          # ademas escribe informe.json
    auditoria.py --help

Por que algunas comprobaciones son como son:

  · El titulo se mide en PIXELES, no en caracteres. Google corta a ~600 px de
    Arial 20 px, y una «m» ocupa el triple que una «i». Contar caracteres da
    falsos negativos.
  · Antes de mirar las imagenes baja hasta el pie. Lo que lleva loading="lazy"
    no se carga hasta entrar en pantalla, y sin bajar parece roto.
  · La etiqueta canonica solo se exige en las paginas indexables. El aviso
    legal y la privacidad son noindex a proposito, y ahi la canonica sobra;
    lo que si es un fallo es que esas dos aparezcan en el sitemap.
"""
import argparse
import contextlib
import functools
import glob
import http.server
import json
import pathlib
import re
import socket
import socketserver
import sys
import threading
from collections import Counter

from playwright.sync_api import sync_playwright

LIMITE_TITULO = 600  # px utiles del titulo en el resultado de Google
NOINDEX_ESPERADO = {"aviso-legal.html", "privacidad.html"}
DOMINIO = "https://frandocencia.com/"


def chrome() -> str:
    """El contenedor cambia de version de Chromium cada pocas semanas."""
    for patron in (
        "/opt/pw-browsers/chromium-*/chrome-linux*/chrome",
        "/opt/pw-browsers/chromium_headless_shell-*/*/chrome-headless-shell",
    ):
        if c := sorted(glob.glob(patron)):
            return c[-1]
    raise SystemExit("no encuentro Chromium en /opt/pw-browsers")


@contextlib.contextmanager
def servidor(raiz: pathlib.Path):
    """Sirve `raiz` en un puerto libre mientras dure el bloque."""
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        puerto = s.getsockname()[1]

    class Mudo(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *_):
            pass

    manejador = functools.partial(Mudo, directory=str(raiz))
    httpd = socketserver.TCPServer(("127.0.0.1", puerto), manejador)
    hilo = threading.Thread(target=httpd.serve_forever, daemon=True)
    hilo.start()
    try:
        yield f"http://127.0.0.1:{puerto}"
    finally:
        httpd.shutdown()
        httpd.server_close()


def attr(pag, sel, at):
    """El atributo, o None, sin quedarse esperando si el elemento no existe."""
    return pag.evaluate(
        "([s,a])=>{const e=document.querySelector(s);return e?e.getAttribute(a):null}",
        [sel, at],
    )


def revisa(base: str, raiz: pathlib.Path):
    pags = sorted(p.name for p in raiz.glob("*.html"))
    if not pags:
        raise SystemExit(f"no hay ningun .html en {raiz}")

    fallos, avisos = [], []
    titulos, descripciones, canonicas, anchos = {}, {}, {}, {}

    with sync_playwright() as p:
        nav = p.chromium.launch(executable_path=chrome())

        regla = nav.new_page()
        regla.set_content("<span id=m style=\"font:20px Arial;white-space:pre\"></span>")

        def ancho(t):
            return regla.evaluate(
                "t=>{const m=document.getElementById('m');m.textContent=t;"
                "return Math.round(m.getBoundingClientRect().width)}",
                t,
            )

        for w, etq in ((1280, "escritorio"), (390, "movil")):
            ctx = nav.new_context(viewport={"width": w, "height": 900})
            pag = ctx.new_page()
            errores, recursos = [], []
            pag.on("pageerror", lambda e: errores.append(str(e)))
            pag.on(
                "response",
                lambda r: recursos.append((r.status, r.url))
                if r.status >= 400 and "127.0.0.1" in r.url
                else None,
            )

            for ruta in pags:
                pag.goto(f"{base}/{ruta}", wait_until="load")
                # bajar al pie: lo lazy no se carga hasta entrar en pantalla
                pag.evaluate("()=>window.scrollTo(0,document.body.scrollHeight)")
                pag.wait_for_timeout(600)
                pag.evaluate("()=>window.scrollTo(0,0)")

                desborde = pag.evaluate(
                    "()=>document.documentElement.scrollWidth"
                    "-document.documentElement.clientWidth"
                )
                if desborde:
                    fallos.append(f"{ruta} ({etq}): desborda {desborde} px a lo ancho")

                if etq != "escritorio":
                    continue

                t = pag.title()
                titulos[ruta] = t
                anchos[ruta] = px = ancho(t)
                if px > LIMITE_TITULO:
                    fallos.append(
                        f"{ruta}: el titulo mide {px} px, Google corta en ~{LIMITE_TITULO}"
                    )

                robots = attr(pag, 'meta[name="robots"]', "content") or ""
                noindex = "noindex" in robots
                if noindex != (ruta in NOINDEX_ESPERADO) and ruta != "404.html":
                    fallos.append(f"{ruta}: robots=«{robots}», no es lo esperado")

                d = attr(pag, 'meta[name="description"]', "content")
                if ruta != "404.html":
                    if not d:
                        fallos.append(f"{ruta}: sin meta description")
                    else:
                        descripciones[ruta] = d
                        if len(d) > 160:
                            fallos.append(f"{ruta}: descripcion de {len(d)} caracteres")

                c = attr(pag, 'link[rel="canonical"]', "href")
                if ruta != "404.html" and not noindex:
                    if not c:
                        fallos.append(f"{ruta}: sin etiqueta canonica")
                    else:
                        canonicas[ruta] = c

                if ruta not in NOINDEX_ESPERADO | {"404.html"}:
                    if not attr(pag, 'meta[property="og:title"]', "content") or not attr(
                        pag, 'meta[property="og:description"]', "content"
                    ):
                        fallos.append(f"{ruta}: faltan og:title / og:description")

                if ruta != "404.html" and (n := pag.locator("h1").count()) != 1:
                    fallos.append(f"{ruta}: tiene {n} etiquetas h1 (debe haber una)")

                for i, s in enumerate(
                    pag.eval_on_selector_all(
                        'script[type="application/ld+json"]', "ns=>ns.map(n=>n.textContent)"
                    )
                ):
                    try:
                        json.loads(s)
                    except Exception as e:
                        fallos.append(f"{ruta}: datos estructurados n.{i + 1} invalidos ({e})")

                for src, alt, nat in pag.eval_on_selector_all(
                    "img",
                    "ns=>ns.map(i=>[i.getAttribute('src'),i.getAttribute('alt'),i.naturalWidth])",
                ):
                    if nat == 0:
                        fallos.append(f"{ruta}: imagen rota {src}")
                    if alt is None:
                        fallos.append(f"{ruta}: imagen sin atributo alt {src}")

                for h in pag.eval_on_selector_all(
                    "a[href]", "ns=>ns.map(a=>a.getAttribute('href'))"
                ):
                    if h.startswith(("http", "mailto:", "tel:")):
                        continue
                    if h.startswith("#"):
                        if len(h) > 1 and pag.locator(h).count() == 0:
                            fallos.append(f"{ruta}: el ancla {h} no existe en la pagina")
                        continue
                    destino = h.partition("#")[0]
                    if destino and pag.request.get(f"{base}/{destino.lstrip('/')}").status >= 400:
                        fallos.append(f"{ruta}: enlace roto {h}")

            fallos += [f"({etq}) error de JavaScript: {e}" for e in errores]
            fallos += [f"({etq}) recurso {st}: {u}" for st, u in recursos]
            ctx.close()
        nav.close()

    for nombre, d in (("titulo", titulos), ("descripcion", descripciones)):
        for v, n in Counter(d.values()).items():
            if n > 1:
                fallos.append(f"{n} paginas comparten {nombre}: «{v[:60]}…»")

    for ruta, c in canonicas.items():
        esperada = DOMINIO + ("" if ruta == "index.html" else ruta)
        if c != esperada:
            avisos.append(f"{ruta}: canonica {c} (esperaba {esperada})")

    xml = (raiz / "sitemap.xml").read_text(encoding="utf-8")
    urls = re.findall(r"<loc>" + re.escape(DOMINIO) + r"(.*?)</loc>", xml)
    for u in urls:
        if (u or "index.html") not in pags:
            fallos.append(f"sitemap: {u} no existe como fichero")
    for f in pags:
        if f == "404.html":
            continue
        if f in NOINDEX_ESPERADO:
            if f in urls:
                fallos.append(f"sitemap: {f} es noindex y no deberia estar listada")
            continue
        if f not in urls and not (f == "index.html" and "" in urls):
            fallos.append(f"sitemap: falta {f}")
    if len(re.findall(r"<lastmod>", xml)) != len(urls):
        fallos.append("sitemap: hay URLs sin lastmod")

    robots_txt = (raiz / "robots.txt").read_text(encoding="utf-8")
    if f"Sitemap: {DOMINIO}sitemap.xml" not in robots_txt:
        fallos.append("robots.txt no declara el sitemap")
    if re.search(r"^Disallow: /\s*$", robots_txt, re.M):
        fallos.append("robots.txt bloquea todo el sitio")

    fichas = [p for p in pags if re.match(r"(coml|comm|adgg)", p)]
    entrantes = Counter()
    for p_ in pags:
        h = (raiz / p_).read_text(encoding="utf-8")
        cuerpo = h.split("<main", 1)[-1].split("</main>", 1)[0] if "<main" in h else ""
        for d in fichas:
            entrantes[d] += len(re.findall(r'href="' + re.escape(d) + r'"', cuerpo))

    return fallos, avisos, titulos, anchos, entrantes, fichas


def main():
    ap = argparse.ArgumentParser(
        description="Revision completa de la web: SEO, enlaces, imagenes, sitemap y robots.",
        epilog="Sale con codigo 1 si hay fallos, 0 si no.",
    )
    ap.add_argument("--dir", default=".", help="carpeta del sitio (por defecto, la actual)")
    ap.add_argument("--json", action="store_true", help="escribe tambien informe.json")
    args = ap.parse_args()

    raiz = pathlib.Path(args.dir).resolve()
    with servidor(raiz) as base:
        fallos, avisos, titulos, anchos, entrantes, fichas = revisa(base, raiz)

    print("=" * 78)
    print(f"TITULOS  (limite ~{LIMITE_TITULO} px: lo que Google muestra entero)")
    print("=" * 78)
    for ruta in sorted(titulos):
        print(f"  {anchos[ruta]:4} px  {ruta:52} {titulos[ruta]}")

    print()
    print("=" * 78)
    print("ENLACES ENTRANTES POR FICHA")
    print("=" * 78)
    for d in sorted(fichas):
        print(f"  {entrantes[d]:2}  {d}")

    print()
    print("=" * 78)
    print(f"RESULTADO: {len(fallos)} fallos, {len(avisos)} avisos")
    print("=" * 78)
    for f in fallos:
        print("  x", f)
    for a in avisos:
        print("  .", a)
    if not fallos:
        print("  Sin fallos.")

    if args.json:
        destino = raiz / "informe.json"
        destino.write_text(
            json.dumps(
                {
                    "fallos": fallos,
                    "avisos": avisos,
                    "titulos_px": anchos,
                    "entrantes": dict(entrantes),
                },
                ensure_ascii=False,
                indent=2,
            ),
            encoding="utf-8",
        )
        print(f"\ninforme en {destino}")

    return 1 if fallos else 0


if __name__ == "__main__":
    sys.exit(main())
