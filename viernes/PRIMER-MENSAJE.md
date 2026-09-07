# Primer mensaje para el Claude del centro

Este archivo tiene dos partes:

1. **El texto para copiar y pegar** en el primer mensaje, la primera vez que
   se abra el proyecto con Claude Code.
2. **Los pasos previos**, para dejar el repositorio montado.

Después del primer día no hace falta repetirlo: `CLAUDE.md` está en el
repositorio y Claude lo lee solo al abrirlo.

---

## 1 · Antes del primer mensaje

### Crear el repositorio

1. Una cuenta u organización de GitHub **del centro**, dada de alta con un
   correo del centro (por ejemplo `web@somosviernes.es`), nunca con el
   correo personal de nadie.
2. Verificación en dos pasos activada, con los códigos de recuperación
   impresos y guardados.
3. Repositorio nuevo, por ejemplo `somosviernes/web`.

### Subir los archivos

**El contenido de la carpeta `viernes` pasa a ser la raíz del repositorio.**
Es decir, `index.html` queda arriba del todo, no dentro de una subcarpeta.

```bash
cd viernes
git init
git add .
git commit -m "Primera versión de la web"
git branch -M main
git remote add origin https://github.com/somosviernes/web.git
git push -u origin main
```

### Comprobar que se ve

En *Settings → Pages*, origen `main` y carpeta `/ (root)`. En un par de
minutos estará en `https://somosviernes.github.io/web/`.

Mientras sea maqueta sale con `noindex`, así que no competirá en Google con
la web actual del centro.

---

## 2 · El mensaje para copiar

Copiar todo lo que hay entre las líneas y enviarlo como primer mensaje:

---

Hola. Vas a trabajar en la web de **viernes. Centro de Formación**, un
centro de formación profesional para el empleo de Santa Cruz de Tenerife
que es además agencia de colocación.

Antes de nada, lee estos archivos del repositorio y sigue lo que dicen:

- `CLAUDE.md` — las reglas del proyecto. Es lo más importante.
- `LEEME.md` — qué incluye la web y cómo se mantiene.
- `CONFIGURACION.md` — dónde va cada clave técnica.
- `DATOS-PENDIENTES.md` — qué falta por aportar.

Cuatro cosas que conviene que sepas desde el principio:

**Uno.** Un curso es un dato, no un párrafo. Todo sale de
`_fuente/cursos.mjs` y se regenera con `node _fuente/generar.mjs`. Nunca
edites los `.html` de la raíz: son generados y el cambio se pierde.

**Dos.** Si falta un dato, se señala como pendiente. No se inventa. Ni
teléfonos, ni fechas, ni testimonios, ni porcentajes de inserción laboral.

**Tres.** La web no usa cookies de seguimiento ni carga nada de terceros.
Funciona sin conexión, abriendo el archivo. Eso es deliberado y no debe
romperse: es lo que le ahorra la barrera de cookies.

**Cuatro.** El formulario de primer contacto pide cinco campos y no incluye
DNI ni datos de salud. Es minimización de datos, no un descuido.

Escríbeme siempre en español y trátame de tú.

Para empezar, dime qué has entendido del proyecto y qué datos faltan por
aportar según `DATOS-PENDIENTES.md`.

---

## 3 · Peticiones habituales, ya redactadas

**Publicar una convocatoria nueva**

> Añade este curso al catálogo: [denominación, código, nivel, horas,
> prácticas, fechas de inicio y fin, horario, modalidad, plazas, requisitos
> de acceso, módulos, salidas profesionales y si es gratuito]. Edita
> `_fuente/cursos.mjs`, regenera con `node _fuente/generar.mjs` y enséñame
> cómo queda la ficha antes de subirlo.

**Cerrar una convocatoria**

> Cambia el estado del curso [nombre] a `cerrado` en `_fuente/cursos.mjs` y
> regenera.

**Incorporar fotografías**

> He dejado las fotos en `assets/img/fotos/` con los nombres que indica el
> LEEME de esa carpeta. Regenera y comprueba que ya no queda ningún
> marcador de foto pendiente.

**Rellenar los datos del centro**

> El correo del centro es [correo] y el WhatsApp [número]. Ponlos en
> `_fuente/plantilla.mjs` y regenera. Comprueba que no queda ningún dato en
> amarillo.

**Publicar la versión definitiva**

> Vamos a publicar la web de verdad. Repasa conmigo la lista de
> `CONFIGURACION.md`, apartado 6, punto por punto, y dime qué falta antes de
> poner `MAQUETA = false`.

---

## 4 · Lo que hay que resolver antes de publicar de verdad

Está detallado en `CONFIGURACION.md`, pero estos tres son los que no se
pueden olvidar:

1. **El correo del centro y el WhatsApp.** Sin ellos, la web muestra
   «pendiente» donde debería haber una vía de contacto.

2. **La imagen del mapa.** La actual es una captura de Google Maps: vale
   para enseñarla, no para publicarla. Hay que sustituirla por
   OpenStreetMap o por el sistema oficial de incrustar Google Maps. Los
   enlaces de «Cómo llegar» sí pueden quedarse: enlazar no es reproducir.

3. **El aviso legal y la política de privacidad.** Están redactados como
   estructura de trabajo y necesitan los datos registrales reales y una
   revisión jurídica.

---

## 5 · Y una cosa que no es técnica

La web anterior tenía dos direcciones distintas conviviendo, convocatorias
que solo aparecían en Instagram y un formulario que pedía el DNI antes de
contarte nada. Nada de eso era un fallo de diseño: era falta de un sitio
único donde estuviera cada dato.

Este proyecto está montado para que eso no vuelva a pasar. Si en algún
momento alguien propone «poner el teléfono también aquí» o «editar
directamente el HTML porque es más rápido», ahí empieza el camino de vuelta.
