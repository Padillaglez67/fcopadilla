---
name: auditoria-web
description: Revisa frandocencia.com entera antes de publicar — títulos medidos en píxeles, meta descriptions, canónicas, Open Graph, h1, datos estructurados, imágenes rotas y sin alt, enlaces y anclas rotos, duplicados, sitemap contra ficheros reales, robots.txt y enlaces entrantes por ficha, en escritorio y en móvil. Úsala SIEMPRE antes de mezclar cualquier cambio de este repositorio con master, y cuando se pida comprobar, revisar o auditar la web.
---

# Auditoría de frandocencia.com

Este repositorio es un sitio estático publicado por GitHub Pages desde `master`.
No hay tests. **Esta auditoría es la única red de seguridad que hay**, así que
pasa antes de cada merge a `master`.

## Cómo se ejecuta

Una sola orden, desde la raíz del repositorio:

```bash
python3.13 -I .claude/skills/auditoria-web/scripts/auditoria.py
```

El script levanta su propio servidor en un puerto libre, abre Chromium y revisa
todas las páginas. **Sale con código 1 si hay fallos y 0 si no**, así que se
puede encadenar: `... && git commit`.

Dos detalles que ahorran tiempo perdido:

- **`python3.13`, no `python3`.** Playwright está instalado en el 3.13. Con
  `python3` (3.11) falla con `ImportError: cannot import name '_imaging'` o no
  encuentra `playwright`.
- **`-I`** porque el script vive junto a ficheros del repositorio.

Opciones: `--dir <ruta>` para revisar otra copia, `--json` para dejar además un
`informe.json`. Ejecuta `--help` antes de cambiar nada.

**No leas el fuente del script para entender qué comprueba.** Está pensado para
usarse como caja negra; su `--help` y esta página bastan. Léelo solo si hay que
modificar una comprobación.

## Qué significa cada resultado

**Fallos** son cosas que hay que arreglar antes de publicar. **Avisos** son cosas
que conviene mirar pero no bloquean.

El resultado bueno es `0 fallos, 0 avisos`. Si sale cualquier otra cosa, se
arregla; no se publica «con un fallito».

## Tres cosas que el script hace a propósito y conviene no «corregir»

**Los títulos se miden en píxeles, no en caracteres.** Google corta a unos
600 px de Arial 20 px. Una «m» ocupa el triple que una «i», así que contar
caracteres da falsos negativos. El script renderiza el título en el navegador y
mide el ancho real.

**Baja hasta el pie antes de mirar las imágenes.** Lo que lleva
`loading="lazy"` no se carga hasta entrar en pantalla. Sin bajar, el logo del
pie aparece como «imagen rota» en todas las páginas. Es un falso positivo que ya
ocurrió una vez.

**`aviso-legal.html` y `privacidad.html` son `noindex` a propósito.** No se les
exige etiqueta canónica, porque ahí sobra. Lo que sí es un fallo es que esas dos
aparezcan en el `sitemap.xml`.

## Después de tocar cualquier página

Hay que actualizar a mano el `<lastmod>` de esa página en `sitemap.xml`. El
script avisa si una URL se queda sin `lastmod`, pero **no detecta una fecha
desactualizada**: eso se olvida con facilidad y ya pasó una vez con la portada.

## Qué NO cubre

No mide rendimiento, ni contraste de color, ni accesibilidad más allá del `alt`
de las imágenes. No valida el contenido: que una cifra sea correcta es cosa de
comprobarla contra su documento, no del script.
