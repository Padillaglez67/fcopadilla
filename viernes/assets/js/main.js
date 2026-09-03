/* ═══════════════════════════════════════════════════════════════════════
   viernes. · Centro de Formación — comportamiento de la maqueta
   ───────────────────────────────────────────────────────────────────────
   JavaScript sin dependencias ni peticiones externas: la web funciona
   abriendo el archivo desde un pendrive, sin conexión y sin servidor.
   Todo lo esencial se puede usar también sin JavaScript activado.
   ═══════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ── Aviso de maqueta ───────────────────────────────────────────────
     Se recuerda la decisión durante la sesión para no molestar al
     navegar entre páginas. */
  var aviso = $('#aviso-maqueta');
  if (aviso) {
    try {
      if (sessionStorage.getItem('viernes-maqueta-oculta') === '1') aviso.hidden = true;
    } catch (e) { /* navegación privada: se muestra igualmente */ }
    var cerrar = $('#cerrar-maqueta');
    if (cerrar) {
      cerrar.addEventListener('click', function () {
        aviso.hidden = true;
        try { sessionStorage.setItem('viernes-maqueta-oculta', '1'); } catch (e) {}
      });
    }
  }

  /* ── Cabecera: sombra al desplazar ─────────────────────────────────── */
  var nav = $('#nav');
  if (nav) {
    var fijar = function () { nav.classList.toggle('is-fija', window.scrollY > 8); };
    fijar();
    window.addEventListener('scroll', fijar, { passive: true });
  }

  /* ── Menú en móvil ─────────────────────────────────────────────────── */
  var burger = $('#burger');
  var menu = $('#menu-movil');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var abierto = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!abierto));
      menu.hidden = abierto;
    });
    /* Escape cierra el menú y devuelve el foco al botón. */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
        burger.setAttribute('aria-expanded', 'false');
        menu.hidden = true;
        burger.focus();
      }
    });
  }

  /* ── Aparición suave de bloques ────────────────────────────────────── */
  var aparecen = $$('.aparece');
  if (aparecen.length) {
    if ('IntersectionObserver' in window) {
      var obs = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('visto'); obs.unobserve(en.target); }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
      aparecen.forEach(function (el) { obs.observe(el); });
    } else {
      aparecen.forEach(function (el) { el.classList.add('visto'); });
    }
  }

  /* ── Año en curso en el pie ────────────────────────────────────────── */
  $$('[data-anio]').forEach(function (el) { el.textContent = String(new Date().getFullYear()); });

  /* ── Buscador de la portada: lleva al catálogo con el texto puesto ── */
  var formBuscar = $('#form-buscar');
  if (formBuscar) {
    formBuscar.addEventListener('submit', function (e) {
      e.preventDefault();
      var q = $('#q-portada').value.trim();
      window.location.href = 'cursos.html' + (q ? '?q=' + encodeURIComponent(q) : '');
    });
  }

  /* ═════════════════════════════════════════════════════════════════════
     CATÁLOGO DE CURSOS · buscador y filtros
     Los datos viven en el propio HTML de cada tarjeta, en atributos
     data-*. Así el catálogo se ve completo aunque el JavaScript falle:
     los filtros son una mejora, no un requisito.
     ═════════════════════════════════════════════════════════════════ */
  var catalogo = $('#catalogo');
  if (catalogo) {
    var tarjetas = $$('.curso', catalogo);
    var fTexto  = $('#f-texto');
    var fEstado = $('#f-estado');
    var fArea   = $('#f-area');
    var fModo   = $('#f-modalidad');
    var fPara   = $('#f-para');
    var salida  = $('#n-resultados');
    var nada    = $('#sin-resultados');

    var normaliza = function (t) {
      return (t || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    };

    var filtrar = function () {
      var q      = normaliza(fTexto ? fTexto.value.trim() : '');
      var estado = fEstado ? fEstado.value : '';
      var area   = fArea ? fArea.value : '';
      var modo   = fModo ? fModo.value : '';
      var para   = fPara ? fPara.value : '';
      var n = 0;

      tarjetas.forEach(function (t) {
        var ok =
          (!estado || t.dataset.estado === estado) &&
          (!area   || t.dataset.area === area) &&
          (!modo   || (t.dataset.modalidad || '').indexOf(modo) !== -1) &&
          (!para   || (t.dataset.para || '').indexOf(para) !== -1) &&
          (!q      || normaliza(t.dataset.busca).indexOf(q) !== -1);
        t.classList.toggle('is-oculto', !ok);
        if (ok) n++;
      });

      if (salida) {
        salida.innerHTML = n === 1
          ? '<b>1</b> curso encontrado'
          : '<b>' + n + '</b> cursos encontrados';
      }
      if (nada) nada.hidden = n !== 0;
    };

    [fTexto, fEstado, fArea, fModo, fPara].forEach(function (c) {
      if (!c) return;
      c.addEventListener(c.tagName === 'SELECT' ? 'change' : 'input', filtrar);
    });

    var limpiar = $('#limpiar-filtros');
    if (limpiar) {
      limpiar.addEventListener('click', function () {
        [fTexto, fEstado, fArea, fModo, fPara].forEach(function (c) { if (c) c.value = ''; });
        filtrar();
        if (fTexto) fTexto.focus();
      });
    }

    /* Texto o filtro llegado desde la portada o desde un enlace directo. */
    var params = new URLSearchParams(window.location.search);
    if (params.get('q') && fTexto) fTexto.value = params.get('q');
    if (params.get('area') && fArea) fArea.value = params.get('area');
    if (params.get('estado') && fEstado) fEstado.value = params.get('estado');
    filtrar();
  }

  /* ═════════════════════════════════════════════════════════════════════
     COMPROBADOR DE REQUISITOS
     Cinco preguntas y una respuesta clara. Resuelve la consulta que más
     se repite por teléfono y filtra solicitudes que no pueden prosperar,
     explicando siempre el porqué. Nunca dice solo «no».
     ═════════════════════════════════════════════════════════════════ */
  var asis = $('#asistente');
  if (asis && window.VIERNES_CURSOS) {
    var preguntas = [
      { id: 'situacion', t: '¿Cuál es tu situación laboral ahora mismo?',
        o: [['desempleada','Estoy en desempleo'],['ocupada','Estoy trabajando'],['estudiante','Estudio o busco mi primer empleo'],['autonoma','Soy autónoma o autónomo']] },
      { id: 'estudios', t: '¿Cuál es el nivel de estudios más alto que has terminado?',
        o: [['sin','Sin titulación oficial'],['eso','ESO o equivalente'],['bach','Bachillerato o FP de grado medio'],['sup','FP superior o estudios universitarios']] },
      { id: 'area', t: '¿Qué te interesa aprender?',
        o: [['logistica','Logística y almacén'],['administracion','Administración y gestión'],['digital','Digital, informática e IA'],['idiomas','Idiomas'],['hosteleria','Hostelería y comercio'],['docencia','Docencia y formación']] },
      { id: 'modalidad', t: '¿Cómo prefieres formarte?',
        o: [['presencial','En el centro, presencial'],['virtual','En aula virtual, en directo'],['teleformacion','Teleformación, a mi ritmo'],['igual','Me da igual, lo que haya']] },
      { id: 'tiempo', t: '¿Qué disponibilidad tienes?',
        o: [['manana','Mañanas'],['tarde','Tardes'],['completa','Cualquier horario'],['poca','Muy poca: busco algo corto']] }
    ];

    var paso = 0;
    var resp = {};
    var barra = $('#barra i', asis);
    var zona  = $('#asistente-paso');
    var pie   = $('#asistente-pie');

    var pinta = function () {
      var p = preguntas[paso];
      barra.style.width = ((paso + 1) / preguntas.length * 100) + '%';
      var html = '<p class="paso__n">PREGUNTA ' + (paso + 1) + ' DE ' + preguntas.length + '</p>' +
                 '<h2 id="titulo-paso">' + p.t + '</h2><ul class="opciones">';
      p.o.forEach(function (op) {
        var sel = resp[p.id] === op[0] ? ' is-elegida' : '';
        html += '<li><button type="button" class="opcion' + sel + '" data-v="' + op[0] + '">' + op[1] + '</button></li>';
      });
      html += '</ul>';
      zona.innerHTML = html;

      $$('.opcion', zona).forEach(function (b) {
        b.addEventListener('click', function () {
          resp[p.id] = b.dataset.v;
          if (paso < preguntas.length - 1) { paso++; pinta(); }
          else { resultado(); }
        });
      });

      pie.innerHTML = paso > 0
        ? '<button type="button" class="enlace-btn" id="atras">← Volver a la anterior</button><span class="paso__n">Sin registro · nada se envía</span>'
        : '<span></span><span class="paso__n">Sin registro · nada se envía</span>';
      var atras = $('#atras', pie);
      if (atras) atras.addEventListener('click', function () { paso--; pinta(); });

      var h = $('#titulo-paso', zona);
      if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
    };

    /* Orden de estudios, para comparar el nivel exigido con el que se tiene. */
    var escala = { sin: 0, eso: 1, bach: 2, sup: 3 };

    var resultado = function () {
      barra.style.width = '100%';
      var validos = [], casi = [];

      window.VIERNES_CURSOS.forEach(function (c) {
        if (c.estado === 'cerrado') return;
        var cumpleEstudios = escala[resp.estudios] >= escala[c.nivelMin];
        var encajaArea = resp.area === c.area;
        var encajaPara = c.para.indexOf(resp.situacion) !== -1 || c.para.indexOf('todas') !== -1;
        if (cumpleEstudios && encajaArea && encajaPara) validos.push(c);
        else if (cumpleEstudios && encajaPara) casi.push(c);
      });

      var html = '<div class="resultado">';
      if (validos.length) {
        html += '<div class="resultado__cab"><h3>Buenas noticias: encajas en ' +
                validos.length + (validos.length === 1 ? ' curso' : ' cursos') + '</h3>' +
                '<p>Según lo que nos has contado, puedes solicitar plaza en lo siguiente. La comprobación definitiva la hacemos contigo, sin compromiso.</p></div>';
      } else {
        html += '<div class="resultado__cab vacia"><h3>Ahora mismo no tenemos nada abierto que encaje del todo</h3>' +
                '<p>No es un no. Te apuntamos a la lista de avisos y te escribimos en cuanto salga una convocatoria de tu área. También podemos verlo por teléfono: muchas veces hay una vía que no se ve en la web.</p></div>';
      }

      var muestra = validos.length ? validos : casi.slice(0, 3);
      if (muestra.length) {
        if (!validos.length) html += '<p class="paso__n">MIENTRAS TANTO, ESTO PODRÍA INTERESARTE</p>';
        html += '<div class="rejilla rejilla--2">';
        muestra.forEach(function (c) {
          html += '<article class="tarjeta"><h3 style="font-size:1.05rem">' + c.titulo + '</h3>' +
                  '<p style="font-size:.9375rem;color:var(--tinta-2)">' + c.resumen + '</p>' +
                  '<a class="btn btn--sm" href="' + c.url + '">Ver la ficha completa</a></article>';
        });
        html += '</div>';
      }

      html += '<div class="caja-aviso"><p><b>Nada de esto queda registrado.</b> La comprobación se hace en tu navegador: no hemos guardado ni enviado ninguna respuesta. Si quieres que te ayudemos, escríbenos tú.</p></div>';
      html += '</div>';

      zona.innerHTML = html;
      pie.innerHTML = '<button type="button" class="enlace-btn" id="reiniciar">← Empezar de nuevo</button>' +
                      '<a class="btn btn--sm" href="inscripcion.html">Solicitar plaza</a>';
      $('#reiniciar', pie).addEventListener('click', function () { paso = 0; resp = {}; pinta(); });
      zona.setAttribute('tabindex', '-1');
      zona.focus({ preventScroll: true });
    };

    pinta();
  }

  /* ═════════════════════════════════════════════════════════════════════
     FORMULARIO DE SOLICITUD · fase 1
     Se pide lo mínimo imprescindible para poder informar: nombre,
     teléfono, correo, curso y situación. Los datos que exige la
     administración se recogen después, ya con la plaza preseleccionada
     y explicando para qué sirve cada uno.
     ═════════════════════════════════════════════════════════════════ */
  var form = $('#form-solicitud');
  if (form) {
    var msg = $('#form-msg');
    var decir = function (t, clase) {
      if (!msg) return;
      msg.textContent = t;
      msg.className = 'aviso-form ' + (clase || '');
      msg.hidden = !t;
    };

    /* El curso llega preseleccionado desde la ficha correspondiente. */
    var elegido = new URLSearchParams(window.location.search).get('curso');
    var selCurso = $('#f-curso');
    if (elegido && selCurso) {
      var hay = $$('option', selCurso).some(function (o) { return o.value === elegido; });
      if (hay) selCurso.value = elegido;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      decir('');

      if (!form.checkValidity()) {
        var malo = $(':invalid', form);
        if (malo) malo.focus();
        decir('Revisa los campos marcados: falta algo por rellenar.', 'err');
        return;
      }

      var clave = $('input[name="access_key"]', form);
      if (!clave || /PEGAR-CLAVE/.test(clave.value)) {
        decir('Maqueta de demostración: el envío está desactivado hasta que se configure la clave del formulario. En la web real, aquí se enviaría la solicitud.', 'err');
        return;
      }

      var boton = $('button[type="submit"]', form);
      var textoOriginal = boton.textContent;
      boton.disabled = true;
      boton.textContent = 'Enviando…';

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form)
      })
        .then(function (r) { return r.json(); })
        .then(function (r) {
          if (r && r.success) {
            form.reset();
            decir('Solicitud enviada. Te contestamos en menos de 48 horas laborables.', 'ok');
          } else {
            decir('No se ha podido enviar. Llámanos o escríbenos por WhatsApp y lo resolvemos.', 'err');
          }
        })
        .catch(function () {
          decir('No se ha podido enviar. Llámanos o escríbenos por WhatsApp y lo resolvemos.', 'err');
        })
        .finally(function () {
          boton.disabled = false;
          boton.textContent = textoOriginal;
        });
    });
  }
})();
