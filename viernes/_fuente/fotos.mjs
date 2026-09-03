/* ═══════════════════════════════════════════════════════════════════════
   FOTOGRAFÍAS DEL CENTRO
   ───────────────────────────────────────────────────────────────────────
   Cada entrada define un hueco de la web. Al generar el sitio:

     · si el archivo EXISTE en assets/img/fotos/ → se coloca la fotografía
     · si NO existe                             → se coloca un marcador

   Así, incorporar las fotos reales es copiar los archivos con estos
   nombres exactos en assets/img/fotos/ y ejecutar:

       node _fuente/generar.mjs

   No hay que tocar ni una línea de HTML.

   El texto alternativo (alt) no es un adorno: es lo que lee en voz alta un
   lector de pantalla. Por eso describe la escena, y nunca dice «foto de».
   ═══════════════════════════════════════════════════════════════════════ */

export const FOTOS = {

  recepcion: {
    archivo: 'recepcion.jpg',
    alt: 'Recepción del centro: suelo de madera clara, paredes blancas, plantas y una sala de trabajo al fondo con luz natural.',
    pie: 'Recepción y zona común',
    nota: 'Entrada del centro'
  },

  informatica: {
    archivo: 'aula-informatica.jpg',
    alt: 'Aula de informática con puestos individuales de ordenador frente a ventanas con vistas.',
    pie: 'Aula de informática',
    nota: 'Equipos individuales'
  },

  sala: {
    archivo: 'sala-trabajo.jpg',
    alt: 'Sala de trabajo en grupo con mesas amplias, sillas de colores y el rótulo «viernes.» en la pared.',
    pie: 'Sala de trabajo en grupo',
    nota: 'Trabajo en equipo'
  },

  descanso: {
    archivo: 'zona-descanso.jpg',
    alt: 'Zona de descanso con una barra alta de madera junto a la pared y taburetes, con lámparas colgantes.',
    pie: 'Zona de descanso',
    nota: 'Barra alta y taburetes'
  },

  infantil: {
    archivo: 'zona-infantil.jpg',
    alt: 'Pasillo con una pared pintada de pizarra, dibujada con tizas, y mesas y taburetes pequeños para menores.',
    pie: 'Espacio para menores',
    nota: 'Pared de pizarra'
  },

  equipo: {
    archivo: 'equipo.jpg',
    alt: 'El equipo docente del centro.',
    pie: 'La flota de profes',
    nota: 'Pendiente: el equipo, en el propio centro'
  },

  empresas: {
    archivo: 'formacion-empresa.jpg',
    alt: 'Sesión de formación con un grupo de personas trabajadoras de una empresa.',
    pie: 'Formación en empresa',
    nota: 'Pendiente: una sesión real con una plantilla'
  },

  mapa: {
    archivo: 'mapa.png',
    alt: 'Plano de situación del centro en la calle Celia Cruz, 6, en Santa Cruz de Tenerife.',
    pie: 'Cómo llegar · imagen © Google Maps',
    nota: 'Pendiente: imagen del plano con enlace al mapa'
  }

};
