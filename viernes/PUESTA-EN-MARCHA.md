# Puesta en marcha, por fases

Cada fase deja algo funcionando y se puede parar ahí. Nada de lo anterior
se rompe si la siguiente tarda semanas.

| Fase | Qué queda funcionando | Coste |
|---|---|---|
| **0** · Cuentas | El correo y el repositorio del centro | 0 € |
| **1** · La web en línea | Una dirección para enseñarla, con `noindex` | 0 € |
| **2** · El formulario | Las solicitudes llegan al correo del centro | 0 € |
| **3** · El dominio | `somosviernes.es` apuntando a la web nueva | ~12 €/año |
| **4** · Cloudflare | Velocidad y redirecciones de las direcciones antiguas | 0 € |
| **5** · Publicación | La web indexada en Google, sin aviso de maqueta | 0 € |

---

# FASE 0 · Las cuentas

**Quién:** Fran, antes de entregar nada.

### El correo de servicio

Un correo **del centro**, no personal. Por ejemplo `web@somosviernes.es`.
Con él se darán de alta todas las cuentas. El motivo es simple: cuando la
persona que las creó deja de estar, no se va con ella el dominio, la web y
la ficha de Google.

Si aún no hay correo propio del dominio, sirve uno provisional, pero que
sea del centro y que alguien del centro pueda abrir.

### La cuenta de GitHub

1. Crear la cuenta con ese correo, en github.com.
2. Activar la **verificación en dos pasos** e imprimir los códigos de
   recuperación. Guardarlos en el centro, en papel.
3. Crear un repositorio nuevo, **público** y **vacío** —sin README, sin
   `.gitignore`, sin licencia—, por ejemplo `web`.

   Público es necesario: GitHub Pages solo publica repositorios privados en
   los planes de pago. El código de una web se ve igual desde el navegador,
   así que no se pierde nada. Lo único importante es no subir nunca datos
   de alumnado.

4. Anotar la dirección que queda, del estilo
   `https://github.com/somosviernes/web.git`.

### Qué se entrega

- El ZIP de la maqueta.
- El correo y la contraseña de la cuenta de GitHub, o una invitación como
  colaborador si se prefiere.
- La dirección del repositorio vacío.

---

# FASE 1 · Poner la web en línea

**Quién:** el Claude del centro, con el ZIP delante.

**Resultado:** una dirección para enseñar la web desde cualquier sitio, sin
comprar nada. Sale con `noindex`, así que no compite en Google con la web
actual.

### Mensaje para copiar

---

Hola. Vamos a poner en marcha la web de **viernes. Centro de Formación**,
un centro de formación profesional para el empleo de Santa Cruz de Tenerife
que es además agencia de colocación.

Tengo un archivo comprimido con la web ya hecha. Está en: [ruta del ZIP]

Necesito que hagas esto:

1. Descomprímelo. Dentro hay una carpeta llamada `viernes`. **El contenido
   de esa carpeta pasa a ser la raíz del repositorio**: `index.html` tiene
   que quedar arriba del todo, no dentro de una subcarpeta.

2. Lee `CLAUDE.md` antes de tocar nada. Son las reglas del proyecto y
   explican por qué está montado así.

3. Sube todo al repositorio vacío que ya existe:
   `https://github.com/[cuenta]/[repositorio].git`

4. Dime cómo activar GitHub Pages y en qué dirección quedará la web.

5. Comprueba que se ve bien y avísame si algo falla.

Cuatro cosas que conviene que sepas desde el principio:

**Uno.** Un curso es un dato, no un párrafo. Todo sale de
`_fuente/cursos.mjs` y se regenera con `node _fuente/generar.mjs`. Nunca
edites los `.html` de la raíz: son generados y el cambio se pierde.

**Dos.** Si falta un dato, se señala como pendiente. No se inventa. Ni
teléfonos, ni fechas, ni testimonios, ni porcentajes de inserción laboral.

**Tres.** La web no usa cookies de seguimiento ni carga nada de terceros.
Funciona sin conexión abriendo el archivo. Eso es deliberado y no debe
romperse: es lo que le ahorra la barrera de cookies.

**Cuatro.** El formulario de primer contacto pide cinco campos y no incluye
DNI ni datos de salud. Es minimización de datos, no un descuido.

Escríbeme siempre en español y trátame de tú.

---

### Cómo saber que la fase ha salido bien

- La web se abre en `https://[cuenta].github.io/[repositorio]/`.
- Se ve con su diseño, no como texto suelto. Si sale sin estilos, es que la
  carpeta `assets` no se subió o quedó dentro de otra carpeta.
- Arriba aparece la franja de maqueta con la fecha de la versión.
- El catálogo filtra y el comprobador de requisitos responde.

---

# FASE 2 · Que el formulario envíe

**Quién:** el Claude del centro. **Antes:** hace falta el correo del centro.

**Resultado:** las solicitudes de plaza llegan a un buzón real. Hasta
ahora el formulario valida los campos pero no envía.

### Mensaje para copiar

---

Vamos a activar el formulario. He dado de alta la cuenta en web3forms.com
con el correo del centro y la clave es: [pegar la clave]

Busca en el proyecto el texto `PEGAR-CLAVE-WEB3FORMS-DEL-CENTRO`,
sustitúyelo por esa clave, regenera el sitio y súbelo.

Aprovecha para poner también los datos que faltan en
`_fuente/plantilla.mjs`: el correo del centro es [correo] y el WhatsApp
[número, en formato 34XXXXXXXXX]. Después comprueba que no queda ningún
dato marcado como pendiente.

Cuando esté, dime cómo probar el envío de verdad.

---

### Ojo con esto

Comprobar el **límite de envíos del plan gratuito** en el momento del alta.
Un centro en temporada de convocatorias puede superarlo, y entonces las
solicitudes dejan de llegar sin que nadie se entere.

---

# FASE 3 · El dominio

**Quién:** Fran y el centro, juntos. **Aquí es donde hay que ir con cuidado.**

El centro **ya tiene** `somosviernes.es`. No hay que comprar dominio: hay
que apuntar el que ya existe hacia la web nueva. Transferirlo a Porkbun es
opcional y no corre prisa; si se hace, mejor cerca de la renovación.

### Antes de tocar un solo registro

1. **Exportar el DNS actual completo**, con captura de pantalla incluida.
2. Localizar los registros **MX** y los **TXT** de SPF, DKIM y DMARC.
3. Copiarlos íntegros en el nuevo DNS **antes** del cambio.

Saltarse esto deja al centro sin correo en cuestión de minutos. Es el error
clásico de las migraciones y no avisa.

### Los registros que hay que poner

Para el dominio raíz, una de estas dos vías:

| Vía | Registro | Valor |
|---|---|---|
| **Recomendada en Porkbun** | `ALIAS` en la raíz | `[cuenta].github.io` |
| Clásica | 4 registros `A` en la raíz | Las cuatro IP que publica GitHub en su documentación |

La primera es mejor: si GitHub cambia sus direcciones algún día, no hay que
tocar nada.

Y para `www`, un `CNAME` apuntando a `[cuenta].github.io`.

En GitHub, *Settings → Pages → Custom domain*, poner el dominio y esperar a
que aparezca el candado antes de marcar **Enforce HTTPS**. Puede tardar
desde unos minutos hasta un día.

---

# FASE 4 · Cloudflare

**Quién:** el Claude del centro, guiando.

**Resultado:** la web carga rápido desde fuera de Canarias, y —esto es lo
importante— **las direcciones antiguas de la web vieja redirigen a las
nuevas**. GitHub Pages por sí solo no puede hacer esas redirecciones.

Antes hace falta una lista: qué páginas antiguas tiene Google indexadas y a
cuál de las nuevas corresponde cada una. Google Search Console lo dice.

Aquí se añade también la analítica sin cookies. **No usar Google Analytics**:
obligaría a poner barrera de consentimiento, que es justo uno de los
problemas que esta web evita.

---

# FASE 5 · Publicar de verdad

**Quién:** el Claude del centro, con la lista delante.

Esta es la fase que convierte la maqueta en la web del centro. **No se hace
hasta que todo lo anterior esté resuelto.**

### Mensaje para copiar

---

Vamos a publicar la web definitiva. Antes de tocar nada, repasa conmigo la
lista de `CONFIGURACION.md`, apartado 6, punto por punto, y dime qué falta.

Presta atención especial a tres cosas:

1. Los cursos y las fechas actuales son de ejemplo. Hay que sustituirlos por
   las convocatorias reales antes de que esto sea visible en Google.
2. La imagen del mapa es una captura de Google Maps: vale para enseñarla,
   no para publicarla. Hay que cambiarla por OpenStreetMap o por el sistema
   oficial de incrustar Google Maps.
3. El aviso legal y la política de privacidad están redactados como
   estructura de trabajo. Necesitan los datos registrales reales y revisión
   jurídica.

Cuando esté todo, pon `MAQUETA = false` en `_fuente/plantilla.mjs`, regenera
y súbelo. Después ayúdame a enviar el `sitemap.xml` en Google Search Console.

---

### Y el mismo día

- Actualizar el enlace de Instagram, Facebook y TikTok al dominio propio.
- Corregir la dirección en la ficha de Google Business.
- **No dar de baja el alojamiento antiguo hasta pasadas dos o tres
  semanas**, y con copia de seguridad completa guardada antes.

---

# Resumen para Fran

| Fase | Te toca a ti | Le toca al Claude del centro |
|---|---|---|
| 0 | Correo, cuenta de GitHub, repositorio vacío | — |
| 1 | Entregar el ZIP y el mensaje | Subirlo y activar Pages |
| 2 | Alta en Web3Forms, dar la clave y el correo | Ponerlos y regenerar |
| 3 | Exportar el DNS y cambiar los registros | Indicar qué registros |
| 4 | Crear la cuenta de Cloudflare | Redirecciones y analítica |
| 5 | Cursos reales, mapa y textos legales | Interruptor y Search Console |
