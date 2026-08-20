/* ═══════════════════════════════════════════════════════════════════════
   Francisco J. Padilla · Docente FPE — comportamiento de la web
   Sin dependencias externas. Todo degrada con elegancia si algo falla.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Año del pie ─────────────────────────────────────────────────── */
  var anio = document.getElementById('anio');
  if (anio) anio.textContent = new Date().getFullYear();

  /* ── Menú móvil ──────────────────────────────────────────────────── */
  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu-movil');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var abierto = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!abierto));
      menu.hidden = abierto;
      burger.setAttribute('aria-label', abierto ? 'Abrir menú' : 'Cerrar menú');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        burger.setAttribute('aria-expanded', 'false');
        menu.hidden = true;
      }
    });
  }

  /* ── Borde de la barra al hacer scroll ───────────────────────────── */
  var nav = document.getElementById('nav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('nav--scroll', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Enlace activo según la sección visible ──────────────────────── */
  var enlaces = Array.prototype.slice.call(document.querySelectorAll('.nav__links a[href^="#"]'));
  var secciones = enlaces
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && secciones.length) {
    var spy = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (!en.isIntersecting) return;
        enlaces.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    secciones.forEach(function (s) { spy.observe(s); });
  }

  /* ── Aparición al entrar en pantalla ─────────────────────────────── */
  var animables = document.querySelectorAll(
    '.sec .h2, .sec .lead, .card, .acr, .flow__step, .ia__item, .qcard, .tl__yr, .acc, .perfil__box, .perfil__txt, .cvfig, .tools__grp, .dos-col > div'
  );

  if (reduce || !('IntersectionObserver' in window)) {
    // Sin animación: todo visible desde el principio.
  } else {
    var obs = new IntersectionObserver(function (entradas, o) {
      entradas.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-in');
        o.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    Array.prototype.forEach.call(animables, function (el) {
      // Lo que ya está a la vista al cargar no se oculta: evita el parpadeo.
      if (el.getBoundingClientRect().top < window.innerHeight) return;
      el.classList.add('reveal');
      obs.observe(el);
    });
  }

  /* ── Contadores de las cifras ────────────────────────────────────── */
  var contadores = document.querySelectorAll('[data-count]');
  var formatea = function (n) { return n.toLocaleString('es-ES'); };

  var anima = function (el) {
    var fin = parseInt(el.getAttribute('data-count'), 10);
    var pre = el.getAttribute('data-prefix') || '';
    if (isNaN(fin)) return;
    if (reduce) { el.textContent = pre + formatea(fin); return; }

    var dur = 1100, t0 = null;
    var paso = function (t) {
      if (t0 === null) t0 = t;
      var p = Math.min((t - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = pre + formatea(Math.round(fin * eased));
      if (p < 1) requestAnimationFrame(paso);
    };
    requestAnimationFrame(paso);
  };

  if (contadores.length && 'IntersectionObserver' in window) {
    var obsC = new IntersectionObserver(function (entradas, o) {
      entradas.forEach(function (en) {
        if (!en.isIntersecting) return;
        anima(en.target);
        o.unobserve(en.target);
      });
    }, { threshold: 0.5 });
    Array.prototype.forEach.call(contadores, function (el) { obsC.observe(el); });
  }

  /* ── Visor del CV infográfico ────────────────────────────────────── */
  var zoom = document.getElementById('cv-zoom');
  var caja = document.getElementById('lightbox');
  var cerrar = document.getElementById('lightbox-close');

  if (zoom && caja && cerrar) {
    var abrir = function () {
      caja.hidden = false;
      document.body.style.overflow = 'hidden';
      cerrar.focus();
    };
    var ocultar = function () {
      caja.hidden = true;
      document.body.style.overflow = '';
      zoom.focus();
    };
    zoom.addEventListener('click', abrir);
    cerrar.addEventListener('click', ocultar);
    caja.addEventListener('click', function (e) { if (e.target === caja) ocultar(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !caja.hidden) ocultar();
    });
  }

  /* ── Formulario de contacto ──────────────────────────────────────────
     Envía a Web3Forms si hay una clave configurada. Si no la hay,
     abre el correo del visitante con el mensaje ya redactado, de modo
     que el formulario nunca deja de funcionar.
     Configuración: index.html → input[name="access_key"]  ·  ver GUIA.md
     ─────────────────────────────────────────────────────────────────── */
  var form = document.getElementById('form-contacto');
  var msg = document.getElementById('form-msg');
  var boton = document.getElementById('btn-enviar');
  var CORREO = 'padillaglez@gmail.com'; // EDITAR si cambias de email

  if (form && msg && boton) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var datos = new FormData(form);
      var clave = (datos.get('access_key') || '').toString();
      var configurado = clave && clave.indexOf('TU_ACCESS_KEY') === -1;

      var decir = function (texto, clase) {
        msg.textContent = texto;
        msg.className = 'form__msg ' + (clase || '');
      };

      /* Sin clave: se abre el gestor de correo con todo redactado. */
      if (!configurado) {
        var cuerpo =
          'Nombre y entidad: ' + (datos.get('nombre') || '') + '\n' +
          'Email: ' + (datos.get('email') || '') + '\n' +
          'Teléfono: ' + (datos.get('telefono') || '—') + '\n' +
          'Tipo de colaboración: ' + (datos.get('tipo') || '') + '\n\n' +
          (datos.get('mensaje') || '');

        window.location.href =
          'mailto:' + CORREO +
          '?subject=' + encodeURIComponent('Consulta desde la web · ' + (datos.get('nombre') || '')) +
          '&body=' + encodeURIComponent(cuerpo);

        decir('Se ha abierto tu programa de correo con la consulta preparada. Solo tienes que enviarla.', 'ok');
        return;
      }

      /* Con clave: envío directo, sin salir de la página. */
      boton.disabled = true;
      var textoOriginal = boton.textContent;
      boton.textContent = 'Enviando…';
      decir('');

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: datos
      })
        .then(function (r) { return r.json(); })
        .then(function (r) {
          if (r && r.success) {
            form.reset();
            decir('Consulta enviada. Te respondo en menos de 24 horas.', 'ok');
          } else {
            decir('No se ha podido enviar. Escríbeme a ' + CORREO + '.', 'err');
          }
        })
        .catch(function () {
          decir('No se ha podido enviar. Escríbeme a ' + CORREO + '.', 'err');
        })
        .finally(function () {
          boton.disabled = false;
          boton.textContent = textoOriginal;
        });
    });
  }
})();

/* ═══════════════════════════════════════════════════════════════════════
   Fondo animado: una red de nodos con envíos circulando por sus rutas.
   Lee a la vez como red neuronal y como red de distribución, que es
   justo el cruce entre la IA y la logística.
   Se desactiva por completo si el sistema pide menos movimiento.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var lienzo = document.getElementById('red');
  if (!lienzo) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    lienzo.remove();
    return;
  }

  var ctx = lienzo.getContext('2d');
  if (!ctx) { lienzo.remove(); return; }

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var an, al, nodos = [], rutas = [], envios = [], pulsos = [];
  var barrido = 0;

  /* Tres focos de color recorriendo toda la página. El primero sigue al
     cursor; los otros dos van por su cuenta describiendo trayectorias
     lentas que barren el ancho y el alto completos. */
  var focos = [
    { color: '34,211,238',  sigue: true,  x: 0.5, y: 0.35, r: 0.44, alfa: 0.26, vx: 0.00013, vy: 0.00019, fx: 0, fy: 0 },
    { color: '79,155,255',  sigue: false, x: 0.5, y: 0.5,  r: 0.42, alfa: 0.17, vx: 0.00009, vy: 0.00015, fx: 1.9, fy: 4.1 },
    { color: '139,110,255', sigue: false, x: 0.5, y: 0.5,  r: 0.50, alfa: 0.13, vx: 0.00007, vy: 0.00011, fx: 3.6, fy: 1.2 }
  ];
  var raton = { x: null, y: null };   // null mientras no haya cursor
  var DIST = 190;                       // distancia máxima para trazar ruta
  var raf = null;

  // El cursor solo mueve el primer foco; se guarda en coordenadas de
  // ventana porque el lienzo está fijo.
  window.addEventListener('pointermove', function (e) {
    raton.x = e.clientX;
    raton.y = e.clientY;
  }, { passive: true });

  window.addEventListener('pointerleave', function () {
    raton.x = null; raton.y = null;   // al salir, vuelve a su deriva
  }, { passive: true });

  function pintaFocos(ahora) {
    var menor = Math.min(an, al);
    ctx.globalCompositeOperation = 'lighter';

    for (var i = 0; i < focos.length; i++) {
      var f = focos[i];
      var destinoX, destinoY;

      if (f.sigue && raton.x !== null) {
        destinoX = raton.x;
        destinoY = raton.y;
      } else {
        // Trayectoria de Lissajous: recorre toda la superficie sin repetirse.
        destinoX = an * (0.5 + 0.42 * Math.sin(ahora * f.vx + f.fx));
        destinoY = al * (0.5 + 0.40 * Math.cos(ahora * f.vy + f.fy));
      }

      // Persecución suave: el foco nunca da saltos.
      f.x += (destinoX - f.x) * (f.sigue ? 0.085 : 0.02);
      f.y += (destinoY - f.y) * (f.sigue ? 0.085 : 0.02);

      var radio = menor * f.r;
      var g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, radio);
      g.addColorStop(0,    'rgba(' + f.color + ',' + f.alfa + ')');
      g.addColorStop(0.45, 'rgba(' + f.color + ',' + (f.alfa * 0.38).toFixed(3) + ')');
      g.addColorStop(1,    'rgba(' + f.color + ',0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(f.x, f.y, radio, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalCompositeOperation = 'source-over';
  }

  function medir() {
    an = lienzo.clientWidth;
    al = lienzo.clientHeight;
    lienzo.width = Math.round(an * dpr);
    lienzo.height = Math.round(al * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Reparto inicial: uno arriba a la izquierda, otro a la derecha y el
    // tercero abajo, para que los tres se vean desde el primer instante.
    var inicio = [[0.24, 0.28], [0.78, 0.42], [0.5, 0.82]];
    for (var i = 0; i < focos.length; i++) {
      focos[i].x = an * inicio[i][0];
      focos[i].y = al * inicio[i][1];
    }
  }

  function sembrar() {
    // Densidad proporcional al área, con techo para no castigar equipos lentos.
    var n = Math.min(Math.round((an * al) / 19000), 90);
    nodos = [];
    for (var i = 0; i < n; i++) {
      nodos.push({
        x: Math.random() * an,
        y: Math.random() * al,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() < 0.18 ? 3.4 : 1.8,   // unos pocos nodos «centro logístico»
        eje: Math.random() < 0.18
      });
    }
    envios = [];
    pulsos = [];
  }

  function nuevoEnvio() {
    if (!rutas.length || envios.length > 26) return;
    var r = rutas[Math.floor(Math.random() * rutas.length)];
    envios.push({ a: r.a, b: r.b, t: 0, v: 0.008 + Math.random() * 0.012 });
  }

  function pinta(ahora) {
    ctx.clearRect(0, 0, an, al);
    rutas.length = 0;

    // Los focos van al fondo del todo, por detrás de la red.
    pintaFocos(ahora || 0);

    // DETALLE 1 · Barrido de datos: una línea de luz que recorre la pantalla
    // muy despacio, como el refresco de un panel de control.
    barrido += 0.55;
    if (barrido > al + 260) barrido = -260;
    var gr = ctx.createLinearGradient(0, barrido - 130, 0, barrido + 130);
    gr.addColorStop(0, 'rgba(34,211,238,0)');
    gr.addColorStop(0.5, 'rgba(34,211,238,.055)');
    gr.addColorStop(1, 'rgba(34,211,238,0)');
    ctx.fillStyle = gr;
    ctx.fillRect(0, barrido - 130, an, 260);

    // Movimiento y rebote en los bordes
    for (var i = 0; i < nodos.length; i++) {
      var p = nodos[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > an) p.vx *= -1;
      if (p.y < 0 || p.y > al) p.vy *= -1;
    }

    // Rutas entre nodos próximos
    for (var a = 0; a < nodos.length; a++) {
      for (var b = a + 1; b < nodos.length; b++) {
        var p1 = nodos[a], p2 = nodos[b];
        var dx = p1.x - p2.x, dy = p1.y - p2.y;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d > DIST) continue;
        var fuerza = 1 - d / DIST;
        ctx.strokeStyle = 'rgba(34,211,238,' + (fuerza * 0.42).toFixed(3) + ')';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
        rutas.push({ a: p1, b: p2 });
      }
    }

    // Nodos
    for (var k = 0; k < nodos.length; k++) {
      var q = nodos[k];
      ctx.beginPath();
      ctx.arc(q.x, q.y, q.r, 0, Math.PI * 2);
      ctx.fillStyle = q.eje ? 'rgba(105,175,255,.95)' : 'rgba(34,211,238,.8)';
      ctx.fill();
      if (q.eje) {
        ctx.beginPath();
        ctx.arc(q.x, q.y, q.r + 6, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(105,175,255,.38)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    // DETALLE 2 · Pulsos: cada cierto tiempo un centro logístico emite una
    // onda, como una consulta que se propaga por la red.
    if (Math.random() < 0.022) {
      var ejes = nodos.filter(function (o) { return o.eje; });
      if (ejes.length) {
        var c = ejes[Math.floor(Math.random() * ejes.length)];
        pulsos.push({ x: c.x, y: c.y, r: 0 });
      }
    }
    for (var u = pulsos.length - 1; u >= 0; u--) {
      var o = pulsos[u];
      o.r += 0.9;
      if (o.r > 105) { pulsos.splice(u, 1); continue; }
      ctx.beginPath();
      ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(34,211,238,' + (0.3 * (1 - o.r / 105)).toFixed(3) + ')';
      ctx.lineWidth = 1.4;
      ctx.stroke();
    }

    // Envíos circulando por las rutas
    for (var g = 0; g < 3; g++) { if (Math.random() < 0.14) nuevoEnvio(); }
    for (var e = envios.length - 1; e >= 0; e--) {
      var s = envios[e];
      s.t += s.v;
      if (s.t >= 1) { envios.splice(e, 1); continue; }
      var x = s.a.x + (s.b.x - s.a.x) * s.t;
      var y = s.a.y + (s.b.y - s.a.y) * s.t;
      var alfa = Math.sin(s.t * Math.PI);          // aparece y se desvanece
      // Estela: un tramo del recorrido ya cubierto
      var tc = Math.max(0, s.t - 0.13);
      ctx.beginPath();
      ctx.moveTo(s.a.x + (s.b.x - s.a.x) * tc, s.a.y + (s.b.y - s.a.y) * tc);
      ctx.lineTo(x, y);
      ctx.strokeStyle = 'rgba(245,165,36,' + (alfa * 0.5).toFixed(3) + ')';
      ctx.lineWidth = 1.6;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, 11, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(245,165,36,' + (alfa * 0.16).toFixed(3) + ')';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x, y, 3.1, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,205,110,' + alfa.toFixed(3) + ')';
      ctx.fill();
    }

    raf = requestAnimationFrame(pinta);
  }

  function arranca() { if (raf === null) raf = requestAnimationFrame(pinta); }
  function para() { if (raf !== null) { cancelAnimationFrame(raf); raf = null; } }

  medir(); sembrar(); arranca();

  var temporizador;
  window.addEventListener('resize', function () {
    clearTimeout(temporizador);
    temporizador = setTimeout(function () { medir(); sembrar(); }, 180);
  }, { passive: true });

  // En segundo plano no se gasta batería.
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) para(); else arranca();
  });
})();

/* ── Brillo de las tarjetas siguiendo al cursor ───────────────────────── */
(function () {
  'use strict';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.matchMedia('(hover: hover)').matches) return;

  document.addEventListener('pointermove', function (e) {
    var t = e.target.closest ? e.target.closest('.card, .acr, .qcard') : null;
    if (!t) return;
    var c = t.getBoundingClientRect();
    t.style.setProperty('--mx', ((e.clientX - c.left) / c.width * 100).toFixed(1) + '%');
    t.style.setProperty('--my', ((e.clientY - c.top) / c.height * 100).toFixed(1) + '%');
  }, { passive: true });
})();

/* ═══════════════════════════════════════════════════════════════════════
   Ventana de documentos legales

   El aviso legal y la política de privacidad se leen superpuestos, sin
   salir de la página. Las páginas privacidad.html y aviso-legal.html
   siguen existiendo con dirección propia —la LSSI y el RGPD exigen que
   sean accesibles y citables—, y desde la ventana se puede abrir la
   página completa en una pestaña.

   El contenido se toma, por este orden:
     1. de una <template> incrustada, si la hay (versión de un archivo);
     2. del propio archivo HTML, pidiéndolo al servidor;
     3. si nada de lo anterior funciona, se abre la página directamente.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var caja = document.getElementById('doc');
  var cuerpo = document.getElementById('doc-cuerpo');
  if (!caja || !cuerpo) return;

  var titulo = document.getElementById('doc-titulo');
  var enlace = document.getElementById('doc-enlace');
  var aceptar = document.getElementById('doc-aceptar');
  var casilla = document.getElementById('f-rgpd');

  var TITULOS = {
    'privacidad': 'Política de privacidad y protección de datos',
    'aviso-legal': 'Aviso legal y condiciones de uso'
  };

  var cache = {};
  var devolverFoco = null;
  var docActual = null;

  function extraeMain(html) {
    var doc = new DOMParser().parseFromString(html, 'text/html');
    var main = doc.querySelector('main');
    if (!main) return null;
    var h1 = main.querySelector('h1');
    if (h1) h1.remove();                       // el título ya está en la cabecera
    var eyebrow = main.querySelector('.eyebrow');
    if (eyebrow) eyebrow.remove();
    return main.innerHTML;
  }

  function carga(nombre) {
    if (cache[nombre]) return Promise.resolve(cache[nombre]);

    var plantilla = document.getElementById('doc-' + nombre);
    if (plantilla && plantilla.content) {
      cache[nombre] = plantilla.innerHTML;
      return Promise.resolve(cache[nombre]);
    }

    return fetch(nombre + '.html')
      .then(function (r) {
        if (!r.ok) throw new Error(r.status);
        return r.text();
      })
      .then(function (html) {
        var trozo = extraeMain(html);
        if (!trozo) throw new Error('sin contenido');
        cache[nombre] = trozo;
        return trozo;
      });
  }

  function abre(nombre, origen) {
    docActual = nombre;
    devolverFoco = origen || document.activeElement;

    if (titulo) titulo.textContent = TITULOS[nombre] || 'Documento';

    // En la versión de un solo archivo no hay páginas sueltas que abrir,
    // así que este enlace puede no existir.
    if (enlace) enlace.setAttribute('href', nombre + '.html');

    cuerpo.innerHTML = '<p class="doc__cargando">Cargando el documento…</p>';
    cuerpo.scrollTop = 0;

    // Solo tiene sentido aceptar la privacidad, y solo si hay casilla.
    if (aceptar) aceptar.hidden = !(casilla && nombre === 'privacidad');

    caja.hidden = false;
    document.body.classList.add('sin-scroll');

    carga(nombre)
      .then(function (html) {
        cuerpo.innerHTML = html;
        cuerpo.focus();
      })
      .catch(function () {
        // Sin servidor no se puede pedir el archivo: se abre la página.
        cierra();
        window.open(nombre + '.html', '_blank', 'noopener');
      });
  }

  function cierra() {
    caja.hidden = true;
    document.body.classList.remove('sin-scroll');
    if (devolverFoco && devolverFoco.focus) devolverFoco.focus();
    devolverFoco = null;
  }

  /* Enlaces marcados con data-doc */
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[data-doc]') : null;
    if (!a) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;  // respeta abrir en pestaña
    e.preventDefault();
    abre(a.getAttribute('data-doc'), a);
  });

  /* Cerrar: aspa, botón, fondo y Escape */
  caja.addEventListener('click', function (e) {
    if (e.target.closest && e.target.closest('[data-cerrar]')) cierra();
  });

  document.addEventListener('keydown', function (e) {
    if (caja.hidden) return;

    if (e.key === 'Escape') { cierra(); return; }

    /* El foco no debe escaparse de la ventana mientras está abierta. */
    if (e.key === 'Tab') {
      var foco = caja.querySelectorAll(
        'button:not([hidden]), a[href], [tabindex]:not([tabindex="-1"])'
      );
      if (!foco.length) return;
      var primero = foco[0], ultimo = foco[foco.length - 1];
      if (e.shiftKey && document.activeElement === primero) {
        e.preventDefault(); ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault(); primero.focus();
      }
    }
  });

  /* Aceptar: marca la casilla del formulario y avisa de ello */
  if (aceptar) {
    aceptar.addEventListener('click', function () {
      if (casilla && docActual === 'privacidad') {
        casilla.checked = true;
        casilla.dispatchEvent(new Event('change', { bubbles: true }));

        var aviso = document.getElementById('form-msg');
        if (aviso) {
          aviso.textContent = 'Política de privacidad aceptada. Ya puedes enviar la consulta.';
          aviso.className = 'form__msg ok';
        }
      }
      cierra();
    });
  }
})();
