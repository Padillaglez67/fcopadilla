/* ═══════════════════════════════════════════════════════════════════════
   PLANTILLA COMÚN · cabecera, navegación, pie y piezas reutilizables
   Una sola definición para todo el sitio: si cambia el teléfono o el
   menú, se cambia aquí y se regenera. Es lo que evita que vuelva a
   pasar lo de las dos direcciones distintas conviviendo en la web.
   ═══════════════════════════════════════════════════════════════════════ */

import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { AREAS, ESTADOS, MODALIDADES } from './cursos.mjs';
import { FOTOS } from './fotos.mjs';

const RAIZ_SITIO = join(dirname(fileURLToPath(import.meta.url)), '..');

/* ── Fotografía o marcador ──────────────────────────────────────────────
   Si el archivo está en assets/img/fotos/, se coloca la imagen. Si no,
   se coloca un marcador que se ve deliberado y dice qué falta. La web
   nunca queda con un hueco roto ni con una imagen inventada.
   `clase` permite alargar el hueco (foto--alta, foto--ancha).       */
export const foto = (clave, clase = '') => {
  const f = FOTOS[clave];
  if (!f) throw new Error('Fotografía no definida: ' + clave);

  const ruta = 'assets/img/fotos/' + f.archivo;

  if (existsSync(join(RAIZ_SITIO, ruta))) {
    return `<figure class="marco ${clase}">
          <img src="${ruta}" alt="${f.alt.replace(/"/g, '&quot;')}" loading="lazy" decoding="async">
          <figcaption>${f.pie}</figcaption>
        </figure>`;
  }

  return `<div class="foto ${clase}">
          <div class="foto__txt">
            <svg class="foto__ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h3l2-2h8l2 2h3v12H3z"/><circle cx="12" cy="13" r="3.5"/></svg>
            <b>${f.pie}</b>
            <span>${f.nota}</span>
          </div>
        </div>`;
};

/* ── Interruptor de maqueta ─────────────────────────────────────────────
   Mientras valga true, la web se identifica como maqueta: muestra el aviso
   superior y pide a los buscadores que NO la indexen, para que una versión
   de demostración no acabe compitiendo en Google con la web real del centro.
   Al publicar la web definitiva se pone en false y las dos cosas
   desaparecen a la vez, en todas las páginas. */
export const MAQUETA = true;

/* ── Datos del centro ───────────────────────────────────────────────────
   Los marcados como null se pintan como «pendiente de confirmar» en toda
   la web. En cuanto el centro los facilite, se rellenan aquí una sola vez.
   Dirección: la que figura en la portada actual, en Facebook y en la ficha
   de Google. La página «Contacta» de la web vieja aún muestra otra: es uno
   de los errores que esta maqueta corrige. */
export const CENTRO = {
  nombre:    'viernes.',
  nombreLargo: 'viernes. Centro de Formación',
  claim:     'Centro de formación en Santa Cruz de Tenerife',
  dominio:   'https://www.somosviernes.es',
  direccion: 'Calle Celia Cruz, 6 · locales 3 y 4',
  ciudad:    'Santa Cruz de Tenerife',
  telefono:  null,           // ← PENDIENTE: teléfono oficial del centro
  whatsapp:  null,           // ← PENDIENTE: número de WhatsApp, formato 34XXXXXXXXX
  correo:    null,           // ← PENDIENTE: correo oficial del centro
  horario:   'De lunes a viernes, de 9:00 a 14:00 y de 16:00 a 20:00',
  campus:    'https://www.somosviernes.es',   // ← PENDIENTE: URL real del campus
  instagram: 'https://www.instagram.com/somosviernes/',
  facebook:  'https://www.facebook.com/viernescentrodeformacion',
  tiktok:    'https://www.tiktok.com/@somos.viernes',
  googleNota: '4,8',
  googleResenas: '53',
  sceDesde: '2014'
};

/* Dato pendiente: se ve, pero se ve que falta. Nunca se inventa. */
export const pdte = (que) => `<span class="pdte" title="Dato pendiente de facilitar por el centro">${que} pendiente</span>`;

export const tel = () => CENTRO.telefono
  ? `<a href="tel:${CENTRO.telefono.replace(/\s/g, '')}">${CENTRO.telefono}</a>`
  : pdte('Teléfono');

export const mail = () => CENTRO.correo
  ? `<a href="mailto:${CENTRO.correo}">${CENTRO.correo}</a>`
  : pdte('Correo');

export const wa = (texto) => CENTRO.whatsapp
  ? `https://wa.me/${CENTRO.whatsapp}?text=${encodeURIComponent(texto || 'Hola, os escribo desde la web.')}`
  : 'contacto.html';

/* ── Navegación ─────────────────────────────────────────────────────────
   Conserva el vocabulario propio de la marca donde aporta personalidad
   («Así somos», «Flota de profes», «Nuestro espacio») pero reordenado:
   lo primero es encontrar un curso, que es a lo que se viene. */
const MENU = [
  { url: 'cursos.html',              txt: 'Cursos',                id: 'cursos' },
  { url: 'empresas.html',            txt: 'Empresas',              id: 'empresas' },
  { url: 'agencia-colocacion.html',  txt: 'Agencia de colocación', id: 'agencia' },
  { url: 'centro.html',              txt: 'El centro',             id: 'centro' },
  { url: 'opiniones.html',           txt: 'Opiniones',             id: 'opiniones' },
  { url: 'contacto.html',            txt: 'Contacta',              id: 'contacto' }
];

const logo = (destino = 'index.html') => `
    <a class="logo" href="${destino}" aria-label="viernes. Centro de Formación · Inicio">
      <span class="logo__n">viernes<i>.</i></span>
      <span class="logo__s">Centro de Formación</span>
    </a>`;

export const nav = (activo) => `
<header class="nav" id="nav">
  <div class="wrap nav__in">${logo()}
    <nav class="nav__links" aria-label="Navegación principal">
      ${MENU.map(m => `<a href="${m.url}"${m.id === activo ? ' aria-current="page"' : ''}>${m.txt}</a>`).join('\n      ')}
    </nav>
    <div class="nav__acc">
      <a class="nav__campus" href="${CENTRO.campus}" target="_blank" rel="noopener">Campus</a>
      <a class="btn btn--sm" href="inscripcion.html">Solicitar plaza</a>
      <button class="burger" id="burger" aria-label="Abrir el menú" aria-expanded="false" aria-controls="menu-movil">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
  <div class="nav__movil" id="menu-movil" hidden>
    ${MENU.map(m => `<a href="${m.url}">${m.txt}</a>`).join('\n    ')}
    <a href="comprobar-requisitos.html">Comprobar requisitos</a>
    <a href="${CENTRO.campus}" target="_blank" rel="noopener">Campus virtual</a>
    <a class="btn" href="inscripcion.html">Solicitar plaza</a>
  </div>
</header>`;

const RED_ICONOS = {
  instagram: '<path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.22 1 .48 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c0-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.1 0-3.5 0-4.7.07-1.1.05-1.7.24-2.1.4-.5.2-.9.44-1.3.83-.4.4-.63.8-.83 1.3-.16.4-.35 1-.4 2.1C2.6 8.5 2.6 8.9 2.6 12s0 3.5.07 4.7c.05 1.1.24 1.7.4 2.1.2.5.44.9.83 1.3.4.4.8.63 1.3.83.4.16 1 .35 2.1.4 1.2.07 1.6.07 4.7.07s3.5 0 4.7-.07c1.1-.05 1.7-.24 2.1-.4.5-.2.9-.44 1.3-.83.4-.4.63-.8.83-1.3.16-.4.35-1 .4-2.1.07-1.2.07-1.6.07-4.7s0-3.5-.07-4.7c-.05-1.1-.24-1.7-.4-2.1-.2-.5-.44-.9-.83-1.3-.4-.4-.8-.63-1.3-.83-.4-.16-1-.35-2.1-.4C15.5 4 15.1 4 12 4zm0 3.1a4.9 4.9 0 110 9.8 4.9 4.9 0 010-9.8zm0 8a3.1 3.1 0 100-6.2 3.1 3.1 0 000 6.2zm6.2-8.2a1.15 1.15 0 11-2.3 0 1.15 1.15 0 012.3 0z"/>',
  facebook:  '<path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.9h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94z"/>',
  tiktok:    '<path d="M16.6 5.82A4.28 4.28 0 0115.5 3h-2.9v11.67a2.44 2.44 0 01-2.44 2.36 2.44 2.44 0 112.44-2.5V11.5a5.34 5.34 0 105.34 5.34V9.4a7.1 7.1 0 004.06 1.27V7.8a4.28 4.28 0 01-3.4-1.98z"/>'
};

export const pie = () => `
<footer class="pie">
  <div class="wrap">
    <div class="pie__in">

      <div>
        ${logo()}
        <p style="margin-top:1rem;color:var(--tinta-2);max-width:32ch">
          Formación profesional para el empleo en Santa Cruz de Tenerife.
          Entidad colaboradora del Servicio Canario de Empleo desde ${CENTRO.sceDesde}.
        </p>
        <div class="redes">
          <a href="${CENTRO.instagram}" target="_blank" rel="noopener" aria-label="Instagram de viernes. (se abre en una pestaña nueva)"><svg viewBox="0 0 24 24" aria-hidden="true">${RED_ICONOS.instagram}</svg></a>
          <a href="${CENTRO.facebook}" target="_blank" rel="noopener" aria-label="Facebook de viernes. (se abre en una pestaña nueva)"><svg viewBox="0 0 24 24" aria-hidden="true">${RED_ICONOS.facebook}</svg></a>
          <a href="${CENTRO.tiktok}" target="_blank" rel="noopener" aria-label="TikTok de viernes. (se abre en una pestaña nueva)"><svg viewBox="0 0 24 24" aria-hidden="true">${RED_ICONOS.tiktok}</svg></a>
        </div>
      </div>

      <div>
        <h3>Formación</h3>
        <ul>
          <li><a href="cursos.html?estado=abierto">Cursos abiertos</a></li>
          <li><a href="cursos.html">Catálogo completo</a></li>
          <li><a href="comprobar-requisitos.html">Comprobar requisitos</a></li>
          <li><a href="inscripcion.html">Solicitar plaza</a></li>
          <li><a href="${CENTRO.campus}" target="_blank" rel="noopener">Campus virtual</a></li>
        </ul>
      </div>

      <div>
        <h3>El centro</h3>
        <ul>
          <li><a href="centro.html">Así somos</a></li>
          <li><a href="centro.html#espacio">Nuestro espacio</a></li>
          <li><a href="centro.html#equipo">Flota de profes</a></li>
          <li><a href="opiniones.html">Opiniones</a></li>
          <li><a href="empresas.html">Para empresas</a></li>
          <li><a href="agencia-colocacion.html">Agencia de colocación</a></li>
        </ul>
      </div>

      <div>
        <h3>Contacto</h3>
        <address>
          ${CENTRO.direccion}<br>
          ${CENTRO.ciudad}<br><br>
          ${tel()}<br>
          ${mail()}<br><br>
          <span style="color:var(--tinta-3);font-size:var(--t-xs)">${CENTRO.horario}</span>
        </address>
      </div>

    </div>

    <div class="pie__base">
      <p style="margin:0">© <span data-anio>2026</span> ${CENTRO.nombreLargo}</p>
      <p style="margin:0">
        <a href="aviso-legal.html">Aviso legal</a> ·
        <a href="privacidad.html">Privacidad</a> ·
        <a href="accesibilidad.html">Accesibilidad</a> ·
        <a href="transparencia.html">Transparencia</a>
      </p>
    </div>
  </div>
</footer>`;

/* ── Aviso de maqueta ─────────────────────────────────────────────────── */
export const avisoMaqueta = () => `
<div class="maqueta" id="aviso-maqueta">
  <div class="wrap maqueta__in">
    <p><b>Maqueta de presentación.</b> El diseño y el funcionamiento son reales; los cursos, fechas y datos de contacto son de ejemplo y están pendientes de confirmar con el centro.</p>
    <button type="button" id="cerrar-maqueta">Entendido</button>
  </div>
</div>`;

/* ── Documento completo ─────────────────────────────────────────────────
   Un solo H1 por página, metadescripción, canónica y Open Graph: los
   cuatro puntos que el análisis señalaba como ausentes en la web actual. */
export const pagina = ({ archivo, titulo, desc, activo, cuerpo, jsonld = '', extraCss = '' }) => `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>${titulo}</title>
<meta name="description" content="${desc}">
<meta name="robots" content="${MAQUETA ? 'noindex, nofollow' : 'index, follow'}">
<link rel="canonical" href="${CENTRO.dominio}/${archivo === 'index.html' ? '' : archivo}">

<meta property="og:type" content="website">
<meta property="og:locale" content="es_ES">
<meta property="og:site_name" content="${CENTRO.nombreLargo}">
<meta property="og:title" content="${titulo}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${CENTRO.dominio}/${archivo === 'index.html' ? '' : archivo}">
<meta property="og:image" content="${CENTRO.dominio}/assets/img/og.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#FCFAF7">

<link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
<script>document.documentElement.className += ' js';</script>
<link rel="stylesheet" href="assets/css/fuentes.css">
<link rel="stylesheet" href="assets/css/estilos.css">${extraCss}
</head>

<body>
<a class="skip" href="#contenido">Saltar al contenido principal</a>
${MAQUETA ? avisoMaqueta() : ''}
${nav(activo)}

<main id="contenido">
${cuerpo}
</main>

${pie()}

<script src="assets/js/cursos-datos.js"></script>
<script src="assets/js/main.js"></script>
${jsonld}
</body>
</html>
`;

/* ── Piezas de curso reutilizables ──────────────────────────────────── */

export const etiEstado = (estado) =>
  `<span class="eti eti--${ESTADOS[estado].clase}">${ESTADOS[estado].txt}</span>`;

export const urlCurso = (c) => `curso-${c.slug}.html`;

export const tarjetaCurso = (c) => {
  const busca = [c.titulo, c.codigo || '', AREAS[c.area], c.resumen, c.tipo,
                 ...c.modalidad.map(m => MODALIDADES[m]), ...(c.salidas || [])].join(' ');
  return `
        <article class="curso" data-estado="${c.estado}" data-area="${c.area}" data-modalidad="${c.modalidad.join(' ')}" data-para="${c.para.join(' ')}" data-busca="${busca.replace(/"/g, '&quot;')}">
          <div class="curso__top">
            ${etiEstado(c.estado)}
            ${c.gratuito ? '<span class="eti eti--gratis">Gratuito</span>' : ''}
            ${c.codigo ? `<span class="eti eti--cod">${c.codigo}</span>` : ''}
          </div>
          <div class="curso__cuerpo">
            <h3 class="curso__t"><a href="${urlCurso(c)}">${c.titulo}</a></h3>
            <p class="curso__d">${c.resumen}</p>
            <ul class="curso__meta">
              <li><b>Inicio</b> ${c.inicio}</li>
              <li><b>Duración</b> ${c.duracion}${c.practicas ? ' + prácticas' : ''}</li>
              <li><b>Modalidad</b> ${c.modalidad.map(m => MODALIDADES[m]).join(' · ')}</li>
              <li><b>Horario</b> ${c.horario}</li>
            </ul>
            <p class="curso__pie"><span class="curso__ver">Ver ficha completa →</span></p>
          </div>
        </article>`;
};
