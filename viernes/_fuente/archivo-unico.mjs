/* ═══════════════════════════════════════════════════════════════════════
   ARCHIVO ÚNICO DE PREVISUALIZACIÓN
   ───────────────────────────────────────────────────────────────────────
   Ejecutar desde la carpeta «viernes»:  node _fuente/archivo-unico.mjs

   Reúne el sitio entero —las 24 páginas, los estilos, el guion, las
   tipografías y las fotografías— en un solo archivo HTML autónomo.
   Se abre con doble clic desde cualquier sitio, sin carpetas alrededor
   y sin conexión, y se navega igual que la web real.

   Es una pieza de PREVISUALIZACIÓN, no la web que se publica: para eso
   está el sitio de varias páginas, donde cada curso tiene su propia
   dirección, que es justo lo que un buscador necesita.
   ═══════════════════════════════════════════════════════════════════════ */

import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { dirname, join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const AQUI = dirname(fileURLToPath(import.meta.url));
const RAIZ = join(AQUI, '..');

/* ── Imágenes en línea ───────────────────────────────────────────────── */
const TIPOS = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml' };

const enBase64 = (ruta) => {
  const abs = join(RAIZ, ruta);
  if (!existsSync(abs)) return null;
  const tipo = TIPOS[extname(ruta).toLowerCase()] || 'application/octet-stream';
  return `data:${tipo};base64,${readFileSync(abs).toString('base64')}`;
};

/* ── Páginas del sitio ───────────────────────────────────────────────── */
const ORDEN = [
  'index.html', 'cursos.html', 'comprobar-requisitos.html', 'inscripcion.html',
  'empresas.html', 'agencia-colocacion.html', 'centro.html', 'opiniones.html',
  'contacto.html', 'accesibilidad.html', 'aviso-legal.html', 'privacidad.html',
  'transparencia.html', '404.html'
];

const paginas = [
  ...ORDEN,
  ...readdirSync(RAIZ).filter(f => f.startsWith('curso-') && f.endsWith('.html')).sort()
].filter(f => existsSync(join(RAIZ, f)));

const entre = (html, etiqueta) => {
  const i = html.indexOf(`<${etiqueta}`);
  const j = html.lastIndexOf(`</${etiqueta}>`);
  return i === -1 ? '' : html.slice(html.indexOf('>', i) + 1, j);
};

const idDe = (archivo) => 'pg-' + archivo.replace('.html', '').replace(/[^a-z0-9-]/gi, '-');

/* Del primer documento se toman la cabecera y el pie, comunes a todos. */
const primero = readFileSync(join(RAIZ, paginas[0]), 'utf8');
const cabecera = entre(primero, 'header').trim();
const pie = entre(primero, 'footer').trim();
const aviso = primero.slice(primero.indexOf('<div class="maqueta"'), primero.indexOf('</div>\n</div>', primero.indexOf('<div class="maqueta"')) + 13);

let secciones = '';
let indice = [];

for (const archivo of paginas) {
  const html = readFileSync(join(RAIZ, archivo), 'utf8');
  const titulo = (html.match(/<title>([^<]*)<\/title>/) || [, archivo])[1];
  const cuerpo = entre(html, 'main');
  secciones += `\n<section class="pagina" id="${idDe(archivo)}" data-archivo="${archivo}" hidden>\n${cuerpo}\n</section>\n`;
  indice.push({ id: idDe(archivo), archivo, titulo });
}

/* ── Estilos, guion y datos ──────────────────────────────────────────── */
let css = readFileSync(join(RAIZ, 'assets/css/fuentes.css'), 'utf8')
        + '\n' + readFileSync(join(RAIZ, 'assets/css/estilos.css'), 'utf8');

/* Las tipografías del juego extendido siguen enlazadas en el sitio normal;
   aquí se incrustan también, para que no falte nada al abrir el archivo. */
css = css.replace(/url\(\.\.\/fonts\/([^)]+)\)/g, (todo, archivo) => {
  const datos = enBase64('assets/fonts/' + archivo);
  return datos ? `url(${datos.replace('application/octet-stream', 'font/woff2')})` : todo;
});

const datos = readFileSync(join(RAIZ, 'assets/js/cursos-datos.js'), 'utf8');
const js = readFileSync(join(RAIZ, 'assets/js/main.js'), 'utf8');

/* ── Documento final ─────────────────────────────────────────────────── */
let doc = `<!DOCTYPE html>
<html lang="es" class="js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>viernes. Centro de Formación · previsualización completa</title>
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#FCFAF7">
<link rel="icon" href="${enBase64('assets/img/favicon.svg')}">
<style>
${css}

/* ── Propio de la previsualización ─────────────────────────────────── */
.pagina[hidden]{ display:none !important; }
.aparece{ opacity:1 !important; transform:none !important; }
</style>
</head>
<body>
<a class="skip" href="#contenido">Saltar al contenido principal</a>
${aviso}
${cabecera}
<main id="contenido">${secciones}</main>
${pie}

<script>
${datos}
</script>
<script>
/* ── Navegación entre páginas dentro del mismo archivo ─────────────────
   Cada página vive en su propia sección. Los enlaces que apuntan a un
   archivo .html muestran la sección correspondiente en lugar de intentar
   abrir un archivo que aquí no existe. */
(function () {
  var paginas = ${JSON.stringify(indice)};
  var porArchivo = {};
  paginas.forEach(function (p) { porArchivo[p.archivo] = p; });

  var tituloBase = document.title;

  function mostrar(archivo, consulta, ancla) {
    var p = porArchivo[archivo] || porArchivo['404.html'];
    document.querySelectorAll('.pagina').forEach(function (s) { s.hidden = true; });
    var seccion = document.getElementById(p.id);
    seccion.hidden = false;
    document.title = p.titulo;

    /* El catálogo y la solicitud leen la consulta de la dirección: aquí se
       la damos reescribiendo el fragmento, sin recargar nada. */
    if (consulta) {
      try { history.replaceState(null, '', '?' + consulta + '#' + archivo); } catch (e) {}
    }

    iniciar(seccion);

    var destino = ancla && seccion.querySelector('#' + ancla);
    (destino || document.documentElement).scrollIntoView(
      destino ? { behavior: 'auto', block: 'start' } : { block: 'start' });
    if (!destino) window.scrollTo(0, 0);

    document.querySelectorAll('.nav__links a, .nav__movil a').forEach(function (a) {
      var h = (a.getAttribute('href') || '').split('?')[0].split('#')[0];
      if (h === archivo) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  }

  /* El guion del sitio se ejecuta una vez por sección, cuando se muestra. */
  function iniciar(seccion) {
    if (seccion.dataset.listo === '1') return;
    seccion.dataset.listo = '1';
    if (window.VIERNES_INICIAR) window.VIERNES_INICIAR();
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href');
    if (!href || /^(https?:|mailto:|tel:)/.test(href)) return;

    if (href.charAt(0) === '#') return;   /* anclas dentro de la página */

    var partes = href.split('#');
    var conConsulta = partes[0].split('?');
    var archivo = conConsulta[0];
    if (!/\\.html$/.test(archivo)) return;

    e.preventDefault();
    mostrar(archivo, conConsulta[1] || '', partes[1] || '');
  });

  /* Botones atrás y adelante del navegador. */
  window.addEventListener('hashchange', function () {
    var h = location.hash.slice(1);
    if (porArchivo[h]) mostrar(h, '', '');
  });

  var inicial = location.hash.slice(1);
  mostrar(porArchivo[inicial] ? inicial : 'index.html', '', '');
})();
</script>
<script>
${js}
</script>
</body>
</html>
`;

/* ── Fotografías y demás imágenes, incrustadas ───────────────────────── */
doc = doc.replace(/ loading="lazy"/g, '');

let incrustadas = 0;
doc = doc.replace(/(src|href)="(assets\/img\/[^"]+)"/g, (todo, attr, ruta) => {
  const datos = enBase64(ruta);
  if (!datos) return todo;
  incrustadas++;
  return `${attr}="${datos}"`;
});

const salida = join(RAIZ, 'viernes-web-completa.html');
writeFileSync(salida, doc);

console.log(`Archivo único generado:
  · ${paginas.length} páginas en un solo documento
  · ${incrustadas} imágenes incrustadas
  · ${(statSync(salida).size / 1024 / 1024).toFixed(2)} MB
  · ${salida}`);
