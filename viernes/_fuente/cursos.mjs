/* ═══════════════════════════════════════════════════════════════════════
   CATÁLOGO DE CURSOS · fuente única de datos
   ───────────────────────────────────────────────────────────────────────
   Este archivo es el corazón del sitio. De aquí salen, automáticamente:
     · la ficha individual de cada curso, con su URL propia
     · el buscador y los filtros del catálogo
     · el bloque de cursos abiertos de la portada
     · el comprobador de requisitos
     · el desplegable del formulario de solicitud
     · los datos estructurados para Google
     · el sitemap
   Publicar un curso es rellenar una ficha aquí y ejecutar:
       node _fuente/generar.mjs
   No hay que tocar el HTML de ninguna página.

   CONTENIDO DE EJEMPLO. Las denominaciones y códigos de certificado son
   reales, pero las fechas, horarios, duraciones y plazas son ilustrativas
   y deben sustituirse por los datos oficiales de cada convocatoria antes
   de publicar. Ver DATOS-PENDIENTES.md
   ═══════════════════════════════════════════════════════════════════════ */

export const AREAS = {
  logistica:      'Logística y almacén',
  administracion: 'Administración y gestión',
  digital:        'Digital, informática e IA',
  idiomas:        'Idiomas',
  hosteleria:     'Hostelería y comercio',
  docencia:       'Docencia y formación'
};

export const ESTADOS = {
  abierto:  { txt: 'Inscripción abierta',   clase: 'abierto' },
  proximo:  { txt: 'Próxima convocatoria',  clase: 'proximo' },
  medida:   { txt: 'A medida para empresas', clase: 'medida' },
  cerrado:  { txt: 'Convocatoria cerrada',  clase: 'cerrado' }
};

export const MODALIDADES = {
  presencial:    'Presencial en el centro',
  virtual:       'Aula virtual en directo',
  teleformacion: 'Teleformación'
};

export const CURSOS = [

  {
    slug: 'coml0110-actividades-auxiliares-almacen',
    codigo: 'COML0110',
    titulo: 'Actividades auxiliares de almacén',
    area: 'logistica',
    tipo: 'Certificado de profesionalidad · Nivel 1',
    estado: 'abierto',
    modalidad: ['presencial'],
    para: ['desempleada', 'estudiante'],
    nivelMin: 'sin',
    gratuito: true,
    financiacion: 'Acción formativa gratuita para personas desempleadas, financiada con fondos públicos.',
    duracion: '210 horas',
    practicas: '40 horas de prácticas en empresa',
    inicio: '13 de octubre de 2026',
    fin: '19 de diciembre de 2026',
    horario: 'De lunes a viernes, de 9:00 a 14:00',
    sede: 'Centro Viernes · Calle Celia Cruz, 6',
    plazas: '15 plazas',
    acredita: 'Certificado de profesionalidad completo, con validez en toda España.',
    resumen: 'Aprende a recibir, ubicar, preparar y expedir mercancía en un almacén real, con la documentación y los equipos que se usan de verdad.',
    destinatarios: 'Personas en desempleo que quieran entrar en el sector de la logística. No hace falta titulación previa ni experiencia: es un nivel 1, pensado justamente para empezar.',
    requisitos: [
      'No se exige titulación académica: es un certificado de nivel 1.',
      'Estar inscrito o inscrita como demandante de empleo.',
      'Saber leer, escribir y hacer operaciones aritméticas básicas.'
    ],
    modulos: [
      { n: 'MF1013_1 · Operaciones auxiliares de almacenaje', d: 'Recepción, ubicación y control de la mercancía. Documentación de entrada y salida.' },
      { n: 'MF1014_1 · Manipulación de cargas con carretillas elevadoras', d: 'Conducción segura, estabilidad de la carga y prevención de riesgos.' },
      { n: 'MF1015_1 · Preparación de pedidos', d: 'Picking, embalaje, etiquetado y control de calidad de la preparación.' },
      { n: 'MP · Prácticas profesionales no laborales', d: 'Estancia en una empresa del sector, con tutor del centro y tutor de la empresa.' }
    ],
    salidas: ['Auxiliar de almacén', 'Preparador o preparadora de pedidos', 'Carretillero o carretillera', 'Auxiliar de logística y distribución'],
    faq: [
      { p: '¿Hace falta experiencia previa?', r: 'No. Es un certificado de nivel 1 y está diseñado para quien empieza de cero en el sector.' },
      { p: '¿Salgo con el carné de carretillera?', r: 'El módulo de manipulación de cargas forma parte del certificado oficial. Te explicamos en la entrevista qué acredita exactamente y qué habilitación adicional puede necesitar cada empresa.' },
      { p: '¿Las prácticas son obligatorias?', r: 'Sí, forman parte del certificado. Te buscamos empresa nosotros: no tienes que salir a buscarla por tu cuenta.' }
    ]
  },

  {
    slug: 'adgg0208-actividades-administrativas-cliente',
    codigo: 'ADGG0208',
    titulo: 'Actividades administrativas en la relación con el cliente',
    area: 'administracion',
    tipo: 'Certificado de profesionalidad · Nivel 2',
    estado: 'abierto',
    modalidad: ['presencial'],
    para: ['desempleada', 'estudiante'],
    nivelMin: 'eso',
    gratuito: true,
    financiacion: 'Acción formativa gratuita para personas desempleadas, financiada con fondos públicos.',
    duracion: '800 horas',
    practicas: '120 horas de prácticas en empresa',
    inicio: '3 de noviembre de 2026',
    fin: '10 de junio de 2027',
    horario: 'De lunes a viernes, de 15:30 a 20:30',
    sede: 'Centro Viernes · Calle Celia Cruz, 6',
    plazas: '15 plazas',
    acredita: 'Certificado de profesionalidad completo, con validez en toda España.',
    resumen: 'El certificado administrativo más demandado: atención al cliente, gestión documental, ofimática avanzada e inglés profesional.',
    destinatarios: 'Personas en desempleo que quieran trabajar en administración, atención al cliente o gestión comercial. Es el itinerario más completo del área administrativa.',
    requisitos: [
      'Título de Graduado en ESO o equivalente.',
      'O bien haber superado la prueba de acceso a ciclos formativos de grado medio.',
      'O bien superar la prueba de nivel que organiza el propio centro.'
    ],
    modulos: [
      { n: 'MF0975_2 · Técnicas de recepción y comunicación', d: 'Atención presencial, telefónica y por escrito. Gestión de la información.' },
      { n: 'MF0976_2 · Operaciones administrativas comerciales', d: 'Pedidos, albaranes, facturas, cobros y pagos. Gestión de clientes.' },
      { n: 'MF0973_1 · Grabación de datos', d: 'Mecanografía, precisión y ergonomía en el puesto de trabajo.' },
      { n: 'MF0978_2 · Gestión de archivos', d: 'Archivo convencional y digital. Protección de datos aplicada a la oficina.' },
      { n: 'MF0233_2 · Ofimática', d: 'Word, Excel, PowerPoint, Outlook y trabajo en la nube, a nivel profesional.' },
      { n: 'MF9998_2 · Comunicación en inglés, nivel A2', d: 'Inglés aplicado a la atención al cliente y a la gestión administrativa.' },
      { n: 'MP · Prácticas profesionales no laborales', d: 'Estancia en empresa con tutorización doble.' }
    ],
    salidas: ['Auxiliar administrativo', 'Recepcionista', 'Personal de atención al cliente', 'Auxiliar de gestión comercial'],
    faq: [
      { p: 'No tengo la ESO. ¿Puedo entrar?', r: 'Puedes acceder superando la prueba de nivel del centro. Llámanos y te explicamos cómo funciona: hay más vías de las que parece.' },
      { p: 'Son muchas horas. ¿Es compatible con otra cosa?', r: 'La convocatoria de este curso es de tarde, precisamente para que sea compatible con obligaciones familiares o con formación por la mañana.' },
      { p: '¿Puedo hacer solo el módulo de ofimática?', r: 'Sí. Los módulos formativos pueden cursarse de forma independiente y se acreditan por separado. Pregúntanos por la disponibilidad.' }
    ]
  },

  {
    slug: 'ia-generativa-aplicada-al-trabajo',
    codigo: null,
    titulo: 'Inteligencia artificial generativa aplicada al trabajo',
    area: 'digital',
    tipo: 'Especialidad formativa',
    estado: 'abierto',
    modalidad: ['virtual'],
    para: ['desempleada', 'ocupada', 'autonoma', 'estudiante'],
    nivelMin: 'sin',
    gratuito: true,
    financiacion: 'Plazas gratuitas. Consulta la financiación aplicable a tu situación.',
    duracion: '30 horas',
    practicas: null,
    inicio: '6 de octubre de 2026',
    fin: '29 de octubre de 2026',
    horario: 'Martes y jueves, de 18:00 a 20:00',
    sede: 'Aula virtual en directo',
    plazas: '20 plazas',
    acredita: 'Diploma de aprovechamiento del centro.',
    resumen: 'De la curiosidad al uso real: redactar, resumir, analizar datos y generar imágenes con criterio profesional y sin meter la pata.',
    destinatarios: 'Cualquier persona que trabaje con textos, datos o atención al público y quiera usar la IA generativa de forma útil, segura y honesta. No hace falta base técnica.',
    requisitos: [
      'Manejo básico de ordenador y navegador.',
      'Conexión a internet y un dispositivo con cámara y micrófono.',
      'Ganas de probar cosas: se aprende haciendo.'
    ],
    modulos: [
      { n: 'Qué es y qué no es la IA generativa', d: 'Cómo funciona por dentro, qué puede hacer y dónde se equivoca.' },
      { n: 'Escribir buenas instrucciones', d: 'Estructura, contexto, ejemplos e iteración. El oficio del prompt.' },
      { n: 'Aplicaciones al puesto de trabajo', d: 'Correos, informes, resúmenes, hojas de cálculo, atención al cliente.' },
      { n: 'Imagen y contenido visual', d: 'Generación de imágenes y materiales de comunicación.' },
      { n: 'Uso responsable', d: 'Protección de datos, sesgos, verificación y propiedad intelectual.' }
    ],
    salidas: ['Mejora de la productividad en cualquier puesto', 'Comunicación y redes sociales', 'Administración y atención al cliente'],
    faq: [
      { p: '¿Necesito saber programar?', r: 'En absoluto. El curso está pensado para perfiles no técnicos.' },
      { p: '¿Las clases quedan grabadas?', r: 'Sí. Si un día no puedes conectarte, tienes la grabación disponible en el campus.' },
      { p: '¿Sirve para mi trabajo aunque no sea de oficina?', r: 'Sí. Trabajamos con casos reales del alumnado: comercio, hostelería, almacén, educación o autónomos.' }
    ]
  },

  {
    slug: 'competencias-digitales-basicas',
    codigo: null,
    titulo: 'Competencias digitales básicas',
    area: 'digital',
    tipo: 'Especialidad formativa',
    estado: 'abierto',
    modalidad: ['presencial'],
    para: ['desempleada', 'ocupada', 'estudiante'],
    nivelMin: 'sin',
    gratuito: true,
    financiacion: 'Acción formativa gratuita.',
    duracion: '60 horas',
    practicas: null,
    inicio: '20 de octubre de 2026',
    fin: '21 de noviembre de 2026',
    horario: 'Lunes, miércoles y viernes, de 9:30 a 12:30',
    sede: 'Centro Viernes · Calle Celia Cruz, 6',
    plazas: '16 plazas',
    acredita: 'Diploma de aprovechamiento del centro.',
    resumen: 'Perder el miedo al ordenador y al móvil: correo, trámites en línea, archivos, seguridad y todo lo que hoy hace falta para buscar trabajo.',
    destinatarios: 'Personas que necesitan manejarse con soltura en el entorno digital, tanto para el día a día como para buscar empleo o hacer gestiones con la administración.',
    requisitos: [
      'No se exige ningún conocimiento previo.',
      'Ganas de aprender sin agobios: se empieza desde cero.'
    ],
    modulos: [
      { n: 'El equipo y los archivos', d: 'Ordenador, móvil, carpetas, copias de seguridad y la nube.' },
      { n: 'Internet y correo electrónico', d: 'Navegar con criterio, gestionar el correo y adjuntar documentos.' },
      { n: 'Trámites en línea', d: 'Certificado digital, Cl@ve, cita previa y sede electrónica.' },
      { n: 'Seguridad y protección de datos', d: 'Contraseñas, estafas, privacidad y huella digital.' },
      { n: 'Herramientas de búsqueda de empleo', d: 'Currículum digital, portales de empleo y videollamadas.' }
    ],
    salidas: ['Base para cualquier itinerario formativo posterior', 'Autonomía en gestiones y trámites', 'Búsqueda activa de empleo'],
    faq: [
      { p: 'Me manejo fatal con la tecnología. ¿Voy a poder seguirlo?', r: 'Sí. Este curso está hecho exactamente para eso. Se va al ritmo del grupo y nadie se queda atrás.' },
      { p: '¿Tengo que llevar ordenador?', r: 'No. El centro pone los equipos. Si prefieres traer el tuyo para practicar con él, también puedes.' }
    ]
  },

  {
    slug: 'ingles-atencion-al-publico',
    codigo: null,
    titulo: 'Inglés para la atención al público',
    area: 'idiomas',
    tipo: 'Especialidad formativa · Nivel A2',
    estado: 'abierto',
    modalidad: ['virtual'],
    para: ['desempleada', 'ocupada', 'autonoma'],
    nivelMin: 'sin',
    gratuito: true,
    financiacion: 'Plazas gratuitas para personas trabajadoras y en desempleo.',
    duracion: '120 horas',
    practicas: null,
    inicio: '27 de octubre de 2026',
    fin: '26 de febrero de 2027',
    horario: 'Lunes y miércoles, de 17:00 a 19:30',
    sede: 'Aula virtual en directo',
    plazas: '18 plazas',
    acredita: 'Diploma de aprovechamiento del centro, con referencia al nivel A2 del Marco Común Europeo.',
    resumen: 'El inglés que de verdad se usa cara al público en Canarias: recibir, informar, resolver y despedir sin bloquearse.',
    destinatarios: 'Personas que trabajan o quieren trabajar de cara al público en hostelería, comercio, turismo o administración y necesitan defenderse en inglés.',
    requisitos: [
      'Nivel de partida A1 o nociones básicas.',
      'Prueba de nivel orientativa al inicio, sin efectos excluyentes.'
    ],
    modulos: [
      { n: 'Recibir y acompañar', d: 'Saludos, presentaciones y primeras necesidades del cliente.' },
      { n: 'Informar y describir', d: 'Productos, servicios, precios, horarios y direcciones.' },
      { n: 'Resolver situaciones', d: 'Quejas, incidencias, cambios y devoluciones.' },
      { n: 'Teléfono y correo', d: 'Reservas, confirmaciones y escritura profesional básica.' },
      { n: 'Vocabulario del sector', d: 'Hostelería, comercio y turismo aplicados a Canarias.' }
    ],
    salidas: ['Atención al cliente', 'Hostelería y restauración', 'Comercio y turismo', 'Recepción'],
    faq: [
      { p: 'Hace veinte años que no doy inglés. ¿Es para mí?', r: 'Sí, siempre que tengas alguna noción. Hacemos una prueba de nivel al principio solo para organizar el grupo, no para dejar a nadie fuera.' },
      { p: '¿Es un curso de gramática?', r: 'No. Es un curso de hablar. La gramática aparece cuando hace falta para comunicarse mejor.' }
    ]
  },

  {
    slug: 'tpv-hosteleria',
    codigo: null,
    titulo: 'TPV y gestión de caja para hostelería',
    area: 'hosteleria',
    tipo: 'Especialidad formativa',
    estado: 'abierto',
    modalidad: ['presencial'],
    para: ['desempleada', 'ocupada', 'estudiante'],
    nivelMin: 'sin',
    gratuito: true,
    financiacion: 'Acción formativa gratuita.',
    duracion: '40 horas',
    practicas: null,
    inicio: '10 de noviembre de 2026',
    fin: '28 de noviembre de 2026',
    horario: 'De lunes a viernes, de 16:00 a 19:00',
    sede: 'Centro Viernes · Calle Celia Cruz, 6',
    plazas: '14 plazas',
    acredita: 'Diploma de aprovechamiento del centro.',
    resumen: 'Manejar el terminal punto de venta con soltura: comandas, cobros, arqueo, cierres y los errores que cuestan dinero al final del turno.',
    destinatarios: 'Personas que quieran trabajar en sala, barra o comercio y necesiten dominar el TPV desde el primer día, sin aprender a base de sustos.',
    requisitos: [
      'No se exige titulación previa.',
      'Manejo básico de dispositivos táctiles.'
    ],
    modulos: [
      { n: 'El TPV por dentro', d: 'Configuración, cartas, familias de producto y modificadores.' },
      { n: 'Servicio y comandas', d: 'Apertura de mesas, cambios, invitaciones y anulaciones.' },
      { n: 'Cobros', d: 'Efectivo, tarjeta, propinas, divisiones de cuenta y facturas.' },
      { n: 'Arqueo y cierre', d: 'Descuadres, informes de caja y control de consumos.' },
      { n: 'Errores frecuentes', d: 'Qué se descuadra siempre y cómo evitarlo.' }
    ],
    salidas: ['Camarero o camarera de sala y barra', 'Dependiente o dependienta', 'Personal de caja'],
    faq: [
      { p: '¿Se practica con un TPV real?', r: 'Sí. Trabajamos con software de terminal punto de venta durante todo el curso, con simulaciones de servicio.' },
      { p: '¿Sirve para comercio y no solo para hostelería?', r: 'La lógica es muy parecida y buena parte del contenido es aplicable. Consúltanos tu caso.' }
    ]
  },

  {
    slug: 'ssce0110-docencia-formacion-profesional-empleo',
    codigo: 'SSCE0110',
    titulo: 'Docencia de la formación profesional para el empleo',
    area: 'docencia',
    tipo: 'Certificado de profesionalidad · Nivel 3',
    estado: 'proximo',
    modalidad: ['teleformacion', 'virtual'],
    para: ['desempleada', 'ocupada', 'autonoma'],
    nivelMin: 'bach',
    gratuito: false,
    financiacion: 'Consulta la financiación disponible y las condiciones de bonificación para empresas.',
    duracion: '380 horas',
    practicas: '40 horas de prácticas en empresa',
    inicio: 'Previsto para enero de 2027',
    fin: 'Previsto para junio de 2027',
    horario: 'Teleformación con sesiones en directo semanales',
    sede: 'Campus virtual y aula virtual',
    plazas: '25 plazas',
    acredita: 'Certificado de profesionalidad completo. Es la acreditación que habilita para impartir formación para el empleo.',
    resumen: 'El certificado que necesitas para dar clase en formación para el empleo: programar, impartir, tutorizar y evaluar con criterio.',
    destinatarios: 'Profesionales con experiencia en su sector que quieran dedicarse a la docencia, y personal formador que necesite acreditar su competencia docente.',
    requisitos: [
      'Título de Bachiller o equivalente.',
      'O bien certificado de profesionalidad de nivel 3, o de nivel 2 de la misma familia profesional.',
      'O bien cumplir los requisitos de acceso a la formación de nivel 3 por la vía de la prueba de competencias clave.'
    ],
    modulos: [
      { n: 'MF1442_3 · Programación didáctica', d: 'Programación de acciones formativas para el empleo, adaptada a la normativa vigente.' },
      { n: 'MF1443_3 · Selección y elaboración de materiales', d: 'Diseño de materiales didácticos y medios de apoyo.' },
      { n: 'MF1444_3 · Impartición y tutorización', d: 'Dinamización del aula, presencial y en línea. Tutorización en teleformación.' },
      { n: 'MF1445_3 · Evaluación del aprendizaje', d: 'Instrumentos de evaluación, criterios y seguimiento del alumnado.' },
      { n: 'MF1446_3 · Orientación laboral', d: 'Orientación y promoción de la calidad en la formación profesional para el empleo.' },
      { n: 'MP · Prácticas profesionales no laborales', d: 'Prácticas docentes tutorizadas.' }
    ],
    salidas: ['Formador o formadora de formación para el empleo', 'Tutor o tutora de teleformación', 'Formación en empresa'],
    faq: [
      { p: '¿Es lo mismo que el antiguo CAP o el máster de profesorado?', r: 'No. Este certificado acredita la competencia docente para la formación profesional para el empleo, que es un ámbito distinto del sistema educativo reglado.' },
      { p: '¿Puedo hacerlo trabajando?', r: 'Sí. Es la razón de que sea en teleformación, con sesiones en directo en horario compatible.' }
    ]
  },

  {
    slug: 'coml0309-organizacion-gestion-almacenes',
    codigo: 'COML0309',
    titulo: 'Organización y gestión de almacenes',
    area: 'logistica',
    tipo: 'Certificado de profesionalidad · Nivel 3',
    estado: 'proximo',
    modalidad: ['presencial'],
    para: ['desempleada', 'ocupada'],
    nivelMin: 'bach',
    gratuito: true,
    financiacion: 'Prevista financiación pública. Pendiente de confirmar en la convocatoria.',
    duracion: '390 horas',
    practicas: '80 horas de prácticas en empresa',
    inicio: 'Previsto para febrero de 2027',
    fin: 'Previsto para junio de 2027',
    horario: 'De lunes a viernes, de 9:00 a 14:00',
    sede: 'Centro Viernes · Calle Celia Cruz, 6',
    plazas: '15 plazas',
    acredita: 'Certificado de profesionalidad completo, con validez en toda España.',
    resumen: 'El salto de operario a responsable: diseñar el almacén, gestionar el stock, dirigir el equipo y controlar los costes.',
    destinatarios: 'Personas con experiencia en almacén que quieran asumir responsabilidad de organización, y profesionales de logística que necesiten acreditar oficialmente su competencia.',
    requisitos: [
      'Título de Bachiller o equivalente.',
      'O bien certificado de profesionalidad de nivel 3, o de nivel 2 de la familia de comercio y marketing.',
      'O bien superar la prueba de competencias clave de nivel 3.'
    ],
    modulos: [
      { n: 'MF1014_3 · Organización de almacenes', d: 'Diseño, zonificación, flujos y dimensionamiento del almacén.' },
      { n: 'MF1015_2 · Gestión del equipo de trabajo', d: 'Organización de turnos, formación del equipo y prevención de riesgos.' },
      { n: 'MF1005_3 · Optimización de la cadena logística', d: 'Costes, indicadores, aprovisionamiento y mejora continua.' },
      { n: 'MF0233_2 · Ofimática', d: 'Hoja de cálculo aplicada al control de stock e indicadores.' },
      { n: 'MP · Prácticas profesionales no laborales', d: 'Estancia en empresa del sector logístico.' }
    ],
    salidas: ['Jefe o jefa de almacén', 'Responsable de logística', 'Técnico o técnica en gestión de stock', 'Coordinación de aprovisionamiento'],
    faq: [
      { p: 'Llevo años en un almacén pero no tengo título. ¿Puedo?', r: 'Puedes acceder superando la prueba de competencias clave de nivel 3. Y si tienes mucha experiencia, pregúntanos también por el procedimiento de acreditación de competencias, que es otra vía distinta.' },
      { p: '¿Cuándo se abre la inscripción?', r: 'En cuanto se confirme la convocatoria. Déjanos tus datos y te avisamos el primer día.' }
    ]
  },

  {
    slug: 'adgd0208-gestion-integrada-recursos-humanos',
    codigo: 'ADGD0208',
    titulo: 'Gestión integrada de recursos humanos',
    area: 'administracion',
    tipo: 'Certificado de profesionalidad · Nivel 3',
    estado: 'proximo',
    modalidad: ['presencial', 'virtual'],
    para: ['desempleada', 'ocupada'],
    nivelMin: 'bach',
    gratuito: true,
    financiacion: 'Prevista financiación pública. Pendiente de confirmar en la convocatoria.',
    duracion: '650 horas',
    practicas: '80 horas de prácticas en empresa',
    inicio: 'Previsto para marzo de 2027',
    fin: 'Previsto para octubre de 2027',
    horario: 'De lunes a viernes, de 15:30 a 20:30',
    sede: 'Centro Viernes · Calle Celia Cruz, 6',
    plazas: '15 plazas',
    acredita: 'Certificado de profesionalidad completo, con validez en toda España.',
    resumen: 'Contratación, nóminas, seguros sociales y desarrollo de personas: el área administrativa con más recorrido profesional.',
    destinatarios: 'Personas con base administrativa que quieran especializarse en recursos humanos, y profesionales que ya llevan nóminas y necesitan acreditarlo oficialmente.',
    requisitos: [
      'Título de Bachiller o equivalente.',
      'O bien certificado de profesionalidad de nivel 3, o de nivel 2 de la familia administrativa.',
      'O bien superar la prueba de competencias clave de nivel 3.'
    ],
    modulos: [
      { n: 'MF0237_3 · Gestión administrativa de personal', d: 'Contratación, nóminas, cotización y documentación laboral.' },
      { n: 'MF0238_3 · Gestión de recursos humanos', d: 'Selección, formación, desarrollo y clima laboral.' },
      { n: 'MF0233_2 · Ofimática', d: 'Hoja de cálculo y gestión documental aplicadas a personal.' },
      { n: 'MP · Prácticas profesionales no laborales', d: 'Estancia en departamento de personal o asesoría laboral.' }
    ],
    salidas: ['Técnico o técnica de recursos humanos', 'Administrativo o administrativa de personal', 'Asesoría laboral', 'Gestión de nóminas'],
    faq: [
      { p: '¿Se trabaja con programas reales de nóminas?', r: 'Sí. El objetivo es que salgas manejando las herramientas que vas a encontrarte en una asesoría o en un departamento de personal.' }
    ]
  },

  {
    slug: 'prevencion-riesgos-laborales-nivel-basico',
    codigo: null,
    titulo: 'Prevención de riesgos laborales · nivel básico',
    area: 'administracion',
    tipo: 'Formación para empresas',
    estado: 'medida',
    modalidad: ['presencial', 'virtual'],
    para: ['ocupada', 'autonoma'],
    nivelMin: 'sin',
    gratuito: false,
    financiacion: 'Bonificable para empresas a través del crédito de formación. Nos encargamos de la gestión.',
    duracion: '60 horas',
    practicas: null,
    inicio: 'A convenir con la empresa',
    fin: 'A convenir con la empresa',
    horario: 'Adaptado a los turnos del centro de trabajo',
    sede: 'En el centro o en las instalaciones de la empresa',
    plazas: 'Grupos de 8 a 20 personas',
    acredita: 'Diploma acreditativo del nivel básico en prevención de riesgos laborales.',
    resumen: 'La formación preventiva que la empresa necesita tener cubierta, impartida sin burocracia y con casos del propio centro de trabajo.',
    destinatarios: 'Empresas que necesitan designar personal con formación de nivel básico en prevención, y profesionales autónomos que quieran acreditarla.',
    requisitos: [
      'No se exige titulación previa.',
      'Se organiza a partir de un grupo mínimo.'
    ],
    modulos: [
      { n: 'Conceptos básicos', d: 'Trabajo, salud y marco normativo de la prevención.' },
      { n: 'Riesgos generales y su prevención', d: 'Lugares de trabajo, equipos, carga física y riesgos psicosociales.' },
      { n: 'Riesgos específicos del sector', d: 'Adaptado a la actividad real de la empresa.' },
      { n: 'Emergencias y primeros auxilios', d: 'Planes de emergencia, evacuación y actuación básica.' },
      { n: 'Organización de la prevención', d: 'Funciones del nivel básico y gestión documental.' }
    ],
    salidas: ['Persona designada para funciones preventivas de nivel básico', 'Responsable de prevención en pequeña empresa'],
    faq: [
      { p: '¿Podéis darlo en nuestras instalaciones?', r: 'Sí. Nos desplazamos a la empresa y adaptamos los ejemplos a vuestro centro de trabajo y a vuestros turnos.' },
      { p: '¿Se puede bonificar?', r: 'Sí, a través del crédito de formación de la empresa. Nos ocupamos nosotros de la gestión y del plazo de comunicación.' }
    ]
  }

];
