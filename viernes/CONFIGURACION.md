# Configuración técnica

Todo lo que hay que rellenar para que la maqueta pase a ser la web real.
Cada apartado indica **dónde** se toca y **quién** debe crear la cuenta.

> **Regla que no se salta:** todas las cuentas se crean con un correo del
> centro (por ejemplo `web@somosviernes.es`), nunca con el Gmail personal
> de nadie. Quien monta la web entra invitado, no como propietario.

---

## 1 · Datos del centro

**Archivo:** `_fuente/plantilla.mjs`, objeto `CENTRO`.

```js
telefono:  null,   // ← teléfono oficial, formato "922 00 00 00"
whatsapp:  null,   // ← número de WhatsApp, formato "34600000000"
correo:    null,   // ← correo oficial del centro
campus:    '…',    // ← URL real del campus virtual
```

Mientras valgan `null`, la web muestra visiblemente **«Teléfono pendiente»**
en lugar de inventarse un número. Se rellenan aquí una vez y aparecen en
todas las páginas.

Después: `node _fuente/generar.mjs`

---

## 2 · Formulario · Web3Forms

**Cuenta:** la crea el centro en web3forms.com con su correo.
**Nunca se reutiliza la clave de otra web:** la clave viaja escrita en el
HTML y determina a qué buzón llegan las solicitudes.

1. Dar de alta el correo del centro y copiar la *access key*.
2. Buscar en el proyecto `PEGAR-CLAVE-WEB3FORMS-DEL-CENTRO` y sustituirlo.
   Aparece en `_fuente/paginas/inscripcion.html` y en
   `_fuente/paginas/contacto.html`.
3. Regenerar.

Mientras no haya clave, el formulario valida los campos pero **no envía**, y
avisa de que está en modo maqueta.

**A comprobar antes de publicar:** el límite de envíos del plan gratuito.
Un centro en temporada de convocatorias puede superarlo.

---

## 3 · Analítica · Cloudflare Web Analytics

**Cuenta:** la crea el centro en cloudflare.com.

Recomendada frente a Google Analytics por un motivo concreto: **no usa
cookies**, así que la web no necesita barrera de consentimiento. Ese era uno
de los problemas de accesibilidad de la web actual.

Se añade el fragmento que da Cloudflare justo antes de `</body>` en
`_fuente/plantilla.mjs`.

---

## 4 · Buscadores

- **Google Search Console** — verificación por registro TXT en el DNS. Vale
  para todo el dominio y sigue funcionando aunque cambie el alojamiento.
  Enviar `sitemap.xml`.
- **Google Business Profile** — la ficha del centro. Corregir la dirección,
  subir fotos actuales y responder **todas** las reseñas.
- **Bing Webmaster Tools** — se importa desde Search Console.

---

## 4 bis · El mapa · pendiente antes de publicar

La imagen `assets/img/fotos/mapa.png` es **una captura de Google Maps**.
Para la maqueta y la presentación vale. **Para la web publicada, no**: la
cartografía de Google tiene licencia y no puede reproducirse como imagen
propia.

Al publicar hay que sustituirla por una de estas dos vías:

| Vía | Qué implica |
|---|---|
| **Google Maps Embed** | Es la forma autorizada de mostrar Google Maps. Carga servicios de Google, así que exige aviso de cookies o un botón de «pulsa para cargar el mapa» |
| **OpenStreetMap** | Licencia libre con atribución. No pone cookies, no necesita banner. Es la opción coherente con el resto de la web |

Mi recomendación es OpenStreetMap, por coherencia: toda la web está
construida para no depender de terceros ni necesitar barrera de cookies.

Los enlaces de «Cómo llegar» sí pueden quedarse como están: enlazar a
Google Maps no tiene ningún problema, es reproducir su mapa lo que sí.

---

## 5 · Dominio y alojamiento

El centro **ya tiene** `somosviernes.es`. No hay que comprar dominio: hay que
apuntar el existente al nuevo alojamiento.

Antes de tocar un solo registro DNS:

1. **Exportar el DNS actual completo**, con captura de pantalla incluida.
2. Localizar los registros **MX** y los **TXT** de SPF, DKIM y DMARC.
3. Copiarlos íntegros en el nuevo DNS **antes** del cambio.

Saltarse esto deja al centro sin correo en cuestión de minutos.

**Alojamiento recomendado:** GitHub Pages, gratuito, con Cloudflare por
delante para las redirecciones 301 de las URL antiguas indexadas. GitHub
Pages por sí solo no puede hacer esas redirecciones.

---

## 6 · Antes de publicar

- [ ] `MAQUETA = false` en `_fuente/plantilla.mjs`
- [ ] Teléfono, correo, WhatsApp y campus rellenados
- [ ] Clave de Web3Forms puesta y **envío probado de verdad**
- [ ] Fotografías reales incorporadas, con su texto alternativo
- [ ] Cursos reales, con fechas y requisitos oficiales
- [ ] Aviso legal y privacidad completados y revisados jurídicamente
- [ ] Datos registrales y número de entidad colaboradora del SCE
- [ ] Listado de URL antiguas y su redirección de destino
- [ ] Sitemap enviado en Search Console
- [ ] Enlace de Instagram y Facebook apuntando al dominio propio
