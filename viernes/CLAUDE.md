# Instrucciones del proyecto · web de viernes. Centro de Formación

Este archivo lo lee Claude Code automáticamente al abrir el repositorio.
Contiene las reglas de trabajo del proyecto: qué es cada cosa, qué se puede
tocar y qué no.

---

## Qué es este repositorio

La web de **viernes. Centro de Formación**, en Santa Cruz de Tenerife:
centro de formación profesional para el empleo y agencia de colocación,
entidad colaboradora del Servicio Canario de Empleo desde 2014.

Es un **sitio estático**: HTML, CSS y JavaScript, sin marcos de trabajo,
sin dependencias externas y sin peticiones a terceros. Se aloja en GitHub
Pages y funciona igual abriendo `index.html` desde un pendrive.

**Está en español de España. Todo —textos, comentarios del código, nombres
de archivo y mensajes de commit— se escribe en español.**

---

## La regla que sostiene todo el proyecto

> **Un curso es un dato, no un párrafo.**

`_fuente/cursos.mjs` es la fuente única. De ahí salen automáticamente:

- la ficha individual de cada curso, con su dirección propia
- el buscador y los cinco filtros del catálogo
- el bloque de cursos abiertos de la portada
- el calendario de convocatorias
- el comprobador de requisitos
- el desplegable del formulario de solicitud
- los datos estructurados para Google
- el sitemap

Lo mismo con los datos del centro, que viven **solo** en
`_fuente/plantilla.mjs`: teléfono, correo, dirección, redes y horario.

**Esto no es un capricho de organización.** La web anterior del centro tenía
dos direcciones distintas conviviendo en páginas diferentes, y las
convocatorias de las redes sociales no aparecían en la web. Todo lo que se
duplique volverá a desincronizarse.

---

## Cómo se trabaja

### Publicar o modificar un curso

1. Editar `_fuente/cursos.mjs`.
2. Ejecutar, en la raíz del repositorio:
   ```
   node _fuente/generar.mjs
   ```
3. Comprobar el resultado y hacer commit.

### Cambiar un dato del centro

1. Editar el objeto `CENTRO` en `_fuente/plantilla.mjs`.
2. Regenerar igual.

### Cambiar textos de una página

Los cuerpos están en `_fuente/paginas/`. **Nunca se editan los `.html` de
la raíz**: se sobrescriben en cada generación y el cambio se pierde.

### Regenerar el archivo único de previsualización

```
node _fuente/archivo-unico.mjs
```

Produce `viernes-web-completa.html`, con toda la web en un solo archivo
autónomo. Sirve para enseñarla por correo o desde un pendrive. **No es la
web publicable**: cada curso necesita su propia dirección para que Google
pueda indexarlo.

---

## Qué NO se debe hacer

| No | Por qué |
|---|---|
| Editar los `.html` de la raíz | Son generados: el cambio se pierde al regenerar |
| Duplicar el teléfono, el correo o la dirección en una página | Vuelve el problema de las dos direcciones |
| Inventar un dato que falte | Ver «Datos pendientes» más abajo |
| Añadir librerías, marcos o fuentes externas | Rompe el funcionamiento sin conexión y añade cookies |
| Introducir analítica con cookies | Obligaría a poner barrera de cookies, que hoy no hace falta |
| Publicar sin poner `MAQUETA = false` | La web saldría con `noindex` y no se indexaría |
| Meter datos personales de alumnado en el repositorio | Es público |

---

## Datos pendientes: se señalan, no se inventan

Cuando falte un dato, se marca visiblemente como pendiente. Nunca se rellena
con algo verosímil.

- En `plantilla.mjs`, un valor a `null` se pinta como «pendiente» en toda la
  web, con la función `pdte()`.
- En `_fuente/fotos.mjs`, si el archivo no existe en `assets/img/fotos/`, el
  hueco muestra un marcador que dice qué falta.

Un teléfono equivocado en una web hace más daño que un hueco reconocible.
Lo que queda pendiente está en `DATOS-PENDIENTES.md`.

---

## Criterios que hay que mantener

**Accesibilidad · WCAG 2.2 nivel AA.** Se navega entera con el teclado, con
el foco visible. Un solo `h1` por página. Contraste comprobado par a par:
si se cambia un color, hay que recalcularlo. Texto base de 17 píxeles.
Ningún texto informativo incrustado dentro de una imagen. Textos
alternativos descriptivos, nunca «imagen1».

**Movimiento.** Revisado con la skill `emilkowalski/review-animations`.
Reglas heredadas: curvas propias en lugar de las del navegador; nada por
encima de 300 ms en la interfaz; solo se anima `transform` y `opacity`;
todo lo pulsable responde al pulsarlo; el movimiento que depende del ratón
va dentro de `@media (hover: hover) and (pointer: fine)`; con movimiento
reducido se conservan opacidad y color, y se elimina el desplazamiento.

**Privacidad.** El formulario de primer contacto pide cinco campos: nombre,
teléfono, correo, curso y situación laboral. **No se pide DNI, ni fecha de
nacimiento, ni datos de discapacidad en el primer contacto**: eso
corresponde a la matrícula, explicando para qué sirve cada dato. Es una
decisión deliberada de minimización, no un olvido.

**Sin cookies de seguimiento**, y por tanto sin barrera de cookies.

---

## Estado actual

Es una **maqueta de presentación**. El interruptor está en
`_fuente/plantilla.mjs`:

```js
export const MAQUETA = true;
```

Mientras valga `true`, la web muestra el aviso superior de maqueta y pide a
los buscadores que no la indexen. Al publicar la versión real se pone en
`false` y las dos cosas desaparecen a la vez.

**Los cursos, las fechas y los horarios son de ejemplo.** Las
denominaciones y los códigos de certificado son reales, pero las
duraciones y convocatorias deben sustituirse por los datos oficiales.

---

## Documentos de referencia

| Archivo | Contiene |
|---|---|
| `LEEME.md` | Qué incluye la web y cómo se mantiene |
| `CONFIGURACION.md` | Dónde va cada clave técnica y la lista previa a publicar |
| `DATOS-PENDIENTES.md` | Qué falta por aportar, ordenado por urgencia |
| `assets/img/fotos/LEEME.txt` | Nombres exactos de las fotografías |
