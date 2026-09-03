/* ═══════════════════════════════════════════════════════════════════════
   GENERADOR DEL SITIO
   ───────────────────────────────────────────────────────────────────────
   Ejecutar desde la carpeta «viernes»:   node _fuente/generar.mjs

   Toma los cuerpos de _fuente/paginas/ y los datos de _fuente/cursos.mjs
   y escribe el sitio completo: páginas, una ficha por curso, los datos
   para el comprobador de requisitos, el sitemap y el robots.
   Nada de esto se edita a mano: se edita la fuente y se regenera.
   ═══════════════════════════════════════════════════════════════════════ */

import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CURSOS, AREAS, ESTADOS, MODALIDADES } from './cursos.mjs';
import { CENTRO, pagina, tarjetaCurso, urlCurso, etiEstado, tel, mail, wa, pdte, foto } from './plantilla.mjs';

const AQUI  = dirname(fileURLToPath(import.meta.url));
const RAIZ  = join(AQUI, '..');
const HOY   = new Date().toISOString().slice(0, 10);

const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* ── Sustitución de marcadores comunes ───────────────────────────────── */
const abiertos = CURSOS.filter(c => c.estado === 'abierto');
const proximos = CURSOS.filter(c => c.estado === 'proximo');

const gridTodos = CURSOS.map(tarjetaCurso).join('\n');
const gridAbiertos = abiertos.slice(0, 3).map(tarjetaCurso).join('\n');

const opciones = CURSOS
  .filter(c => c.estado !== 'cerrado')
  .map(c => `            <option value="${c.slug}">${esc(c.titulo)}${c.codigo ? ' · ' + c.codigo : ''}</option>`)
  .join('\n');

const calendario = [...abiertos, ...proximos].map(c => `
          <tr>
            <td><a href="${urlCurso(c)}">${esc(c.titulo)}</a></td>
            <td>${esc(c.inicio)}</td>
            <td>${c.modalidad.map(m => MODALIDADES[m]).join(' · ')}</td>
            <td>${etiEstado(c.estado)}</td>
          </tr>`).join('');

const marcadores = (html) => html
  .replace(/\{\{CURSOS_GRID\}\}/g, gridTodos)
  .replace(/\{\{CURSOS_ABIERTOS\}\}/g, gridAbiertos)
  .replace(/\{\{CURSOS_OPCIONES\}\}/g, opciones)
  .replace(/\{\{CALENDARIO\}\}/g, calendario)
  .replace(/\{\{N_ABIERTOS\}\}/g, String(abiertos.length))
  .replace(/\{\{N_CURSOS\}\}/g, String(CURSOS.length))
  .replace(/\{\{TEL\}\}/g, tel())
  .replace(/\{\{MAIL\}\}/g, mail())
  .replace(/\{\{WA\}\}/g, wa('Hola, os escribo desde la web. Me gustaría informarme sobre un curso.'))
  .replace(/\{\{DIRECCION\}\}/g, CENTRO.direccion)
  .replace(/\{\{CIUDAD\}\}/g, CENTRO.ciudad)
  .replace(/\{\{HORARIO\}\}/g, CENTRO.horario)
  .replace(/\{\{CAMPUS\}\}/g, CENTRO.campus)
  .replace(/\{\{INSTAGRAM\}\}/g, CENTRO.instagram)
  .replace(/\{\{FACEBOOK\}\}/g, CENTRO.facebook)
  .replace(/\{\{TIKTOK\}\}/g, CENTRO.tiktok)
  .replace(/\{\{GOOGLE_NOTA\}\}/g, CENTRO.googleNota)
  .replace(/\{\{GOOGLE_RESENAS\}\}/g, CENTRO.googleResenas)
  .replace(/\{\{SCE_DESDE\}\}/g, CENTRO.sceDesde)
  .replace(/\{\{PDTE:([^}]+)\}\}/g, (_, q) => pdte(q))
  .replace(/\{\{FOTO:([a-z]+)(?::([a-z0-9 -]+))?\}\}/g, (_, clave, clase) => foto(clave, clase || ''));

/* ── Datos estructurados del centro ──────────────────────────────────── */
const jsonldCentro = `<script type="application/ld+json">
${JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: CENTRO.nombreLargo,
  url: CENTRO.dominio,
  address: {
    '@type': 'PostalAddress',
    streetAddress: CENTRO.direccion,
    addressLocality: CENTRO.ciudad,
    addressRegion: 'Santa Cruz de Tenerife',
    addressCountry: 'ES'
  },
  sameAs: [CENTRO.instagram, CENTRO.facebook, CENTRO.tiktok]
}, null, 2)}
</script>`;

/* ── Páginas estáticas ───────────────────────────────────────────────── */
const carpetaPaginas = join(AQUI, 'paginas');
let nPaginas = 0;

for (const archivo of readdirSync(carpetaPaginas).filter(f => f.endsWith('.html')).sort()) {
  const bruto = readFileSync(join(carpetaPaginas, archivo), 'utf8');
  const m = bruto.match(/^<!--META\s*([\s\S]*?)\s*META-->\s*/);
  if (!m) { console.warn('  ! Sin bloque META:', archivo); continue; }

  const meta = JSON.parse(m[1]);
  const cuerpo = marcadores(bruto.slice(m[0].length));

  writeFileSync(join(RAIZ, archivo), pagina({
    archivo,
    titulo: meta.titulo,
    desc: meta.desc,
    activo: meta.activo || '',
    cuerpo,
    jsonld: meta.centro ? jsonldCentro : '',
    extraCss: meta.css ? `\n<style>\n${meta.css}\n</style>` : ''
  }));
  nPaginas++;
}

/* ── Una ficha por curso ─────────────────────────────────────────────── */
const ficha = (c) => {
  const jsonld = `<script type="application/ld+json">
${JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: c.titulo,
  description: c.resumen,
  provider: { '@type': 'EducationalOrganization', name: CENTRO.nombreLargo, sameAs: CENTRO.dominio },
  url: `${CENTRO.dominio}/${urlCurso(c)}`,
  educationalCredentialAwarded: c.acredita,
  ...(c.codigo ? { courseCode: c.codigo } : {})
}, null, 2)}
</script>`;

  const cuerpo = `
<section class="ficha">
  <div class="wrap">
    <p class="migas">
      <a href="index.html">Inicio</a> ›
      <a href="cursos.html">Cursos</a> ›
      <a href="cursos.html?area=${c.area}">${AREAS[c.area]}</a> ›
      <span>${esc(c.titulo)}</span>
    </p>
    <div class="ficha__etis">
      ${etiEstado(c.estado)}
      ${c.gratuito ? '<span class="eti eti--gratis">Gratuito</span>' : ''}
      ${c.codigo ? `<span class="eti eti--cod">${c.codigo}</span>` : ''}
      <span class="eti">${esc(c.tipo)}</span>
    </div>
    <h1>${esc(c.titulo)}</h1>
    <p class="ficha__lede">${esc(c.resumen)}</p>
  </div>
</section>

<div class="wrap ficha__in">

  <div>
    <div class="bloque">
      <h2>A quién va dirigido</h2>
      <p>${esc(c.destinatarios)}</p>
    </div>

    <div class="bloque">
      <h2>Requisitos de acceso</h2>
      <ul class="lista-check">
        ${c.requisitos.map(r => `<li>${esc(r)}</li>`).join('\n        ')}
      </ul>
      <div class="caja-aviso">
        <p><b>¿No lo tienes claro?</b> Es la duda más frecuente y casi siempre hay una vía posible.
        Usa el <a href="comprobar-requisitos.html">comprobador de requisitos</a> o llámanos: en cinco minutos lo resolvemos.</p>
      </div>
    </div>

    <div class="bloque">
      <h2>Qué vas a aprender</h2>
      <ol class="modulos">
        ${c.modulos.map(mo => `<li><b>${esc(mo.n)}</b>${esc(mo.d)}</li>`).join('\n        ')}
      </ol>
    </div>

    <div class="bloque">
      <h2>Salidas profesionales</h2>
      <ul class="lista-check">
        ${c.salidas.map(s => `<li>${esc(s)}</li>`).join('\n        ')}
      </ul>
      <p style="margin-top:1rem">Al terminar, nuestra <a href="agencia-colocacion.html">agencia de colocación</a> trabaja contigo la búsqueda de empleo. No te dejamos con el diploma en la mano y hasta luego.</p>
    </div>

    ${c.faq && c.faq.length ? `<div class="bloque faq">
      <h2>Preguntas frecuentes</h2>
      ${c.faq.map(f => `<details>
        <summary>${esc(f.p)}</summary>
        <div><p>${esc(f.r)}</p></div>
      </details>`).join('\n      ')}
    </div>` : ''}
  </div>

  <aside>
    <div class="panel">
      <h2>Datos del curso</h2>
      <dl class="datos">
        <div><dt>Inicio</dt><dd>${esc(c.inicio)}</dd></div>
        <div><dt>Fin</dt><dd>${esc(c.fin)}</dd></div>
        <div><dt>Duración</dt><dd>${esc(c.duracion)}</dd></div>
        ${c.practicas ? `<div><dt>Prácticas</dt><dd>${esc(c.practicas)}</dd></div>` : ''}
        <div><dt>Horario</dt><dd>${esc(c.horario)}</dd></div>
        <div><dt>Modalidad</dt><dd>${c.modalidad.map(m => MODALIDADES[m]).join('<br>')}</dd></div>
        <div><dt>Lugar</dt><dd>${esc(c.sede)}</dd></div>
        <div><dt>Plazas</dt><dd>${esc(c.plazas)}</dd></div>
        <div><dt>Precio</dt><dd>${c.gratuito ? 'Gratuito' : 'Consultar'}</dd></div>
        <div><dt>Acredita</dt><dd>${esc(c.acredita)}</dd></div>
      </dl>
      ${c.estado === 'abierto'
        ? `<a class="btn btn--lg" href="inscripcion.html?curso=${c.slug}">Solicitar plaza</a>
      <a class="btn btn--linea" href="comprobar-requisitos.html">Comprobar si cumplo requisitos</a>`
        : c.estado === 'medida'
          ? `<a class="btn btn--lg" href="empresas.html">Pedir propuesta para mi empresa</a>`
          : `<a class="btn btn--lg" href="inscripcion.html?curso=${c.slug}">Avísame cuando se abra</a>
      <a class="btn btn--linea" href="cursos.html?estado=abierto">Ver cursos abiertos ahora</a>`}
      <p class="panel__nota">${esc(c.financiacion)}</p>
      <p class="panel__nota">¿Dudas? Llámanos al {{TEL}} o escríbenos a {{MAIL}}.</p>
    </div>
  </aside>

</div>

<section class="sec sec--arena">
  <div class="wrap">
    <p class="rotulo">Sigue mirando</p>
    <h2>Otros cursos que te pueden encajar</h2>
    <div class="rejilla rejilla--3" style="margin-top:2rem">
      ${CURSOS.filter(o => o.slug !== c.slug && o.estado === 'abierto').slice(0, 3).map(tarjetaCurso).join('\n')}
    </div>
  </div>
</section>`;

  return pagina({
    archivo: urlCurso(c),
    titulo: `${c.titulo}${c.codigo ? ' · ' + c.codigo : ''} · viernes. Centro de Formación`,
    desc: `${c.resumen} ${c.duracion}. ${c.gratuito ? 'Curso gratuito. ' : ''}Inicio: ${c.inicio}. Santa Cruz de Tenerife.`,
    activo: 'cursos',
    cuerpo: marcadores(cuerpo),
    jsonld
  });
};

for (const c of CURSOS) writeFileSync(join(RAIZ, urlCurso(c)), ficha(c));

/* ── Datos para el comprobador de requisitos y el buscador ───────────── */
const datos = CURSOS.map(c => ({
  slug: c.slug, titulo: c.titulo, codigo: c.codigo, area: c.area, estado: c.estado,
  modalidad: c.modalidad, para: c.para, nivelMin: c.nivelMin, resumen: c.resumen,
  inicio: c.inicio, duracion: c.duracion, gratuito: c.gratuito, url: urlCurso(c)
}));

mkdirSync(join(RAIZ, 'assets', 'js'), { recursive: true });
writeFileSync(join(RAIZ, 'assets', 'js', 'cursos-datos.js'),
`/* Generado automáticamente por _fuente/generar.mjs · no editar a mano.
   Alimenta el comprobador de requisitos. Se sirve como archivo suelto
   para que funcione también abriendo la web desde un pendrive. */
window.VIERNES_CURSOS = ${JSON.stringify(datos, null, 2)};
`);

/* ── Sitemap y robots ────────────────────────────────────────────────── */
const urls = [
  ['index.html', '1.0', 'weekly'],
  ['cursos.html', '0.9', 'weekly'],
  ['comprobar-requisitos.html', '0.8', 'monthly'],
  ['inscripcion.html', '0.8', 'monthly'],
  ['empresas.html', '0.7', 'monthly'],
  ['agencia-colocacion.html', '0.7', 'monthly'],
  ['centro.html', '0.7', 'monthly'],
  ['opiniones.html', '0.6', 'monthly'],
  ['contacto.html', '0.6', 'monthly'],
  ...CURSOS.map(c => [urlCurso(c), '0.8', 'weekly']),
  ['accesibilidad.html', '0.2', 'yearly'],
  ['aviso-legal.html', '0.2', 'yearly'],
  ['privacidad.html', '0.2', 'yearly'],
  ['transparencia.html', '0.3', 'yearly']
];

writeFileSync(join(RAIZ, 'sitemap.xml'),
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(([u, p, f]) => `  <url>
    <loc>${CENTRO.dominio}/${u === 'index.html' ? '' : u}</loc>
    <lastmod>${HOY}</lastmod>
    <changefreq>${f}</changefreq>
    <priority>${p}</priority>
  </url>`).join('\n')}
</urlset>
`);

writeFileSync(join(RAIZ, 'robots.txt'),
`User-agent: *
Allow: /

Sitemap: ${CENTRO.dominio}/sitemap.xml
`);

console.log(`Generado:
  · ${nPaginas} páginas
  · ${CURSOS.length} fichas de curso
  · assets/js/cursos-datos.js
  · sitemap.xml (${urls.length} URL) y robots.txt`);
