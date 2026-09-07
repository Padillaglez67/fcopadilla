# Skills instaladas en este repositorio

## Qué hay aquí

Dos skills de **Emil Kowalski** (autor de las librerías Sonner y Vaul,
ex-Vercel y ex-Linear), sobre animación y pulido de interfaces:

| Skill | Para qué sirve |
|---|---|
| `emil-design-eng` | Su criterio sobre pulido de interfaces, diseño de componentes y decisiones de animación |
| `review-animations` | Revisa animaciones existentes contra un listón exigente, con tabla Antes / Después / Por qué |

**Origen:** https://github.com/emilkowalski/skills
**Versión instalada:** commit `d23d7f8`
**Licencia:** MIT · el texto completo está en `LICENSE-emilkowalski.txt`

Del repositorio original, que trae doce skills, se han instalado solo estas
dos. Las demás —Swift, React Native, prototipado, librerías de interfaz—
son de otro terreno y solo añadirían ruido.

---

## Ninguna de las dos se activa sola

Las dos llevan `disable-model-invocation: true` en su cabecera. Eso
significa que **no entran en juego por su cuenta**: solo se usan si se
piden por su nombre.

`review-animations` ya venía así de origen. A `emil-design-eng` se le
añadió, porque no lo traía y podía activarse sola. Es el único cambio de
comportamiento respecto al original; el contenido está intacto.

Para usarlas, hay que llamarlas explícitamente:

```
/emil-design-eng
/review-animations
```

---

## Alcance: solo este repositorio

Están dentro de `.claude/skills/` de este proyecto, no en la configuración
personal. Es decir:

- Solo existen al trabajar **en este repositorio**.
- **No afectan** a los documentos docentes, a los manuales de módulos
  formativos, a las evaluaciones ni a ningún otro trabajo.
- No tocan las skills propias ni la configuración de Claude Code.

---

## Un aviso sobre `emil-design-eng`

Al invocarla, lo primero que hace es responder con un mensaje que enlaza al
curso de pago de su autor, y no continúa hasta que se le pregunta algo
concreto. Es legítimo —el material es gratuito y de ahí vive—, pero
conviene saberlo para no llevarse la sorpresa.

---

## Cómo quitarlas

Borrar la carpeta `.claude/skills/` entera. No queda nada más instalado en
ningún otro sitio.

---

## Si se quieren también en el ordenador de casa

Estas viven solo en este repositorio. Para tenerlas disponibles en todos
los proyectos del ordenador:

```bash
npx skills@latest add emilkowalski/skills
```

Ese comando instala **las doce** y en la configuración personal. Si se hace
así, conviene borrar después las que no se vayan a usar y volver a añadir
`disable-model-invocation: true` a `emil-design-eng`.
