# viernes. Centro de Formación · maqueta de la web

Maqueta completa y navegable, preparada para enseñar al centro antes de
decidir nada. **No hace falta internet, ni servidor, ni instalar nada.**

---

## Cómo verla

### Desde un pendrive o desde el ordenador

1. Copia **toda la carpeta `viernes`** al pendrive. Completa: si falta la
   subcarpeta `assets`, la web se ve sin diseño.
2. Abre la carpeta y haz doble clic en **`index.html`**.
3. Se abre en el navegador y funciona todo: buscador, filtros, fichas de
   curso y comprobador de requisitos.

Funciona sin conexión. Las tipografías van dentro del propio archivo de
estilos precisamente para eso.

### Desde un enlace, si quieres que la miren en casa

Subiendo esta carpeta a un repositorio de GitHub con Pages activado.
Mientras sea una maqueta se publica con `noindex`, para que no compita en
Google con la web real del centro (ver más abajo).

---

## Qué incluye

| Página | Qué hace |
|---|---|
| `index.html` | Portada: buscador, cursos abiertos, opiniones, espacio, calendario y preguntas frecuentes |
| `cursos.html` | Catálogo con buscador y cinco filtros, funcionando de verdad |
| `curso-*.html` | Una ficha por curso, con URL propia. Diez fichas |
| `comprobar-requisitos.html` | Asistente de cinco preguntas que dice a qué se puede acceder |
| `inscripcion.html` | Solicitud de plaza, fase 1: solo lo imprescindible |
| `empresas.html` | Formación a medida y bonificable |
| `agencia-colocacion.html` | Doble puerta: personas y empresas |
| `centro.html` | El centro, el espacio, el equipo y cómo llegar |
| `opiniones.html` | Reputación, y qué se hace cuando algo va mal |
| `contacto.html` | Formulario, datos y canal de sugerencias |
| `accesibilidad.html` · `aviso-legal.html` · `privacidad.html` · `transparencia.html` | Páginas legales e institucionales |
| `404.html` | Página de error, para los enlaces antiguos |

---

## Lo que resuelve, punto por punto

Del análisis previo de la web actual:

| Problema detectado | Cómo queda resuelto |
|---|---|
| Dos direcciones distintas conviviendo | Una sola, definida en un único sitio del código |
| No se sabe qué curso está abierto | Estado visible en cada tarjeta y filtro por estado |
| No hay ficha por curso | Diez fichas con URL propia y datos estructurados |
| No hay buscador ni filtros | Buscador y cinco filtros, sin recargar la página |
| El formulario pide de más en el primer contacto | Fase 1 con cinco campos. El DNI se pide en la matrícula |
| Sin metadescripción, sin canónica, sin Open Graph | Las tres, en todas las páginas |
| Ocho etiquetas H1 en la portada | Una sola por página, comprobado |
| «TVP para hostelería» | Corregido: TPV |
| Texto a 14 píxeles | Base de 17 píxeles |
| Barrera de cookies ocupando media pantalla | No hay cookies de seguimiento, así que no hay barrera |
| Instagram enlaza a un Google Forms | Formulario propio que ya sabe a qué curso te apuntas |

---

## Publicar un curso nuevo

**No se toca el HTML.** Se edita un solo archivo y se regenera:

1. Abre `_fuente/cursos.mjs` y copia el bloque de un curso existente.
2. Cambia los datos.
3. Ejecuta, dentro de la carpeta `viernes`:

   ```
   node _fuente/generar.mjs
   ```

Eso regenera la ficha del curso, el catálogo, la portada, el calendario,
el comprobador, el desplegable del formulario y el sitemap. Todo a la vez
y sin que nada se quede desincronizado.

Lo mismo con los datos del centro: teléfono, correo o dirección se cambian
en `_fuente/plantilla.mjs` y aparecen actualizados en todas las páginas.

---

## Cuando deje de ser una maqueta

En `_fuente/plantilla.mjs`, primera línea de configuración:

```js
export const MAQUETA = true;   // ponerlo en false al publicar
```

Con `false` desaparecen a la vez el aviso superior de maqueta y el
`noindex` de todas las páginas.

---

## Archivos de trabajo

- **`CONFIGURACION.md`** — dónde va cada clave: formulario, analítica, dominio.
- **`DATOS-PENDIENTES.md`** — qué hay que pedirle al centro, ordenado por urgencia.
- **`_fuente/`** — la fuente del sitio. No hace falta para verlo, pero sí para mantenerlo.

---

Maqueta preparada para viernes. Centro de Formación.
Contenidos de cursos y fechas de ejemplo, pendientes de sustituir por los reales.
