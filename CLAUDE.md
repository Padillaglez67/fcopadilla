# frandocencia.com

Web personal de **Francisco Javier Padilla González**, docente de Formación
Profesional para el Empleo en Tenerife. HTML estático, sin framework ni build.
GitHub Pages la publica desde `master`; el `CNAME` apunta a frandocencia.com.

Su finalidad es que un centro de formación encuentre, en un minuto, si puede
ponerle delante de un módulo concreto y con qué papel lo justifica. Todo lo que
se escriba aquí tiene que servir a eso.

---

## 1 · Protección de datos. Esto no se negocia

**Nunca publicar** en la web, en redes ni en ningún material:

- DNI o NIE
- Número de la Seguridad Social
- Dirección postal completa ni código postal
- Teléfono fijo
- Periodos de desempleo, ni nada de lo que puedan deducirse

El **NIF aparece solo** en `aviso-legal.html` y en `privacidad.html`, porque la
LSSI lo exige. En ningún otro sitio.

Sus contratos, nóminas y resoluciones contienen varios de esos datos. Se pueden
**leer** para verificar fechas, códigos y horas; **no se copian** a la web ni al
historial de commits.

Tampoco se publican **fotos reales de su alumnado**: no hay consentimiento. Las
imágenes de aula que se usan en redes son generadas con IA y van etiquetadas
como tales.

## 2 · No inventar. Preguntar

**No añadas ningún dato que no esté en la fuente que te han dado.** Si falta uno
—un código de expediente, unas horas, una fecha— se pregunta. No se deduce, no
se completa «por lógica» y no se rellena de memoria.

Orden de autoridad cuando dos documentos se contradicen:

1. La resolución o el anexo oficial del organismo (SCE, SEPE, Ministerio)
2. El programa oficial de la especialidad o certificado
3. Lo que él confirme por escrito
4. Lo que ya dice la web

Si la web dice algo distinto de los tres primeros, **manda el documento y se
corrige la web**.

## 3 · Cómo se nombran las cosas

- En materiales públicos firma **Francisco J. Padilla** o **Francisco Padilla**.
  No «Fran Padilla».
  *(Excepción actual, pendiente de su decisión: `index.html` lo incluye en el
  `alternateName` del JSON-LD, porque «fran padilla» aparece como búsqueda real
  en Search Console. Es un dato para el buscador, no una firma.)*
- **Nunca se nombra a la cooperativa** donde trabajó. Se dice «una cooperativa
  farmacéutica de Tenerife» o «distribución farmacéutica».
- Se distingue siempre entre:
  - **acreditación del SCE** — verificado para impartir
  - **especialidad impartida** — la ha dado, con expediente
  - **horas certificadas** — hay informe firmado del SCE que las acredita
  Escribir «certificadas» sin informe firmado es afirmar un papel que no existe.

## 4 · Datos verificados del perfil

- **9 acreditaciones docentes** del Servicio Canario de Empleo: COML0110,
  COML0309, COML0210, COML0209, COML0109, ADGG0208 (solo el módulo MF0233_2),
  COML20, COML0008 y COMM0042.
- **13 módulos formativos.** El MF1005_3 se repite en tres certificados.
- **No está acreditado para el MF1006_2** de inglés profesional. Se dice de
  frente; no se omite.
- **Asesor y evaluador del PEAC** en el estándar ECP0432_1 desde junio de 2026.
- **31 años en logística de almacén**, de 1990 a 2021, en un alta continua.
  Docente desde 2023.

## 5 · Flujo de trabajo

**Rama y visto bueno.** Se trabaja en `claude/custom-website-creation-1bsamr`.
Nada llega a `master` sin que él lo apruebe. Sin excepciones, por pequeño que
sea el cambio.

**Auditoría antes de mezclar.** Está en la skill `auditoria-web`:

```bash
python3.13 -I .claude/skills/auditoria-web/scripts/auditoria.py
```

Tiene que dar **0 fallos y 0 avisos**. Si no, se arregla antes.

**El `sitemap.xml` se actualiza a mano.** Cada página que se toca necesita su
`<lastmod>` al día. El script avisa si falta, pero no si está desactualizado.

## 6 · Nada de pagos

**Prohibido contratar, suscribir o pagar nada, en ningún sitio.** Si una
funcionalidad requiere plan de pago, se dice y se busca otra vía gratuita. Ya ha
pasado con el primer comentario de Buffer y con los vídeos de Canva: se
descartaron, no se pagaron.

## 7 · No actuar en su nombre sin permiso

No se publica en sus redes, no se envían correos y no se contesta a nadie en su
nombre salvo que lo pida para ese caso concreto. Preparar y dejar listo, sí;
enviar por iniciativa propia, no.

Lo que ya está programado en Typefully (LinkedIn) y Buffer (Instagram) lo
aprobó él publicación por publicación.

**Son dos redes, siempre las dos.** Cualquier comprobación, recuento o informe
de redes sociales cubre **LinkedIn (Typefully) e Instagram (Buffer)**, no una
sola. Mirar únicamente la que acaba de publicar deja la mitad sin revisar, y la
mitad sin revisar es donde se esconde el fallo.

En Typefully hay que distinguir `scheduled` de `planned`: una publicación
`planned` tiene fecha pero **no se publica sola** hasta que se confirma. Pasada
su fecha no da error, simplemente no ha salido. Hay que comprobarlo a propósito
porque no avisa.

## 8 · Entorno

- **Playwright y Chromium están en `python3.13`**, no en `python3` (3.11). Con
  el intérprete equivocado falla con `ImportError: cannot import name
  '_imaging'`.
- La ruta de Chromium **cambia entre versiones del contenedor**. Hay que
  localizarla con glob sobre `/opt/pw-browsers/`, nunca fijarla a mano.
- El proxy **bloquea frandocencia.com** desde esta sesión. Para comprobar el
  sitio hay que servirlo en local, que es lo que hace la auditoría.
- Hay una rama `media-instagram` que aloja imágenes para Buffer. **No se mezcla
  jamás con `master`**: si llegara, esas imágenes se publicarían en la web.

## 9 · Al escribir

- Castellano, trato de tú, sin autobombo ni frases huecas.
- Cifras y códigos concretos antes que adjetivos. Un centro no necesita «amplia
  experiencia», necesita «125 horas certificadas por informe del SCE».
- Poner el denominador cuando se dan horas parciales: «90 de las 420 del
  certificado». Blinda la afirmación y es su estilo.
- **Negrita en LinkedIn:** se usan los caracteres Unicode de sans-serif bold,
  pero **las vocales acentuadas y la ñ no tienen versión en negrita**. Una frase
  con tilde sale rota o, peor, mal escrita. Se eligen frases sin tildes, o se
  deja sin negrita. Generar los caracteres con un script, nunca a mano.
- **Instagram:** sin negrita Unicode. Mayúsculas y emoji, que se ven en todos
  los móviles y no rompen los lectores de pantalla.
