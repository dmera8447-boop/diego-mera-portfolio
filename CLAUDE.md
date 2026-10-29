# Portafolio — Diego Mera (UX/UI Designer)

Contexto del proyecto para sesiones de Claude Code. Léelo antes de hacer cualquier cambio.

---

## Identidad

- **Owner**: Diego Andrés Mera Rojas — Diseñador UX/UI en Shepwashi
- **Ubicación**: Samborondón, Guayas, Ecuador (GMT−5)
- **Email**: diego.mera2002@hotmail.com · **WhatsApp**: +593 99 335 7160
- **LinkedIn**: linkedin.com/in/diegomerarojas
- **Especialidad**: dashboards B2B, productos SaaS, sitios corporativos, design systems
- **Diseño fuente de verdad**: Figma `Diego Mera Portfolio` (file key `yulmuyDDjurUaAL63MdD27`), página **"Propuesta A — Nombre gigante"** (Home, Caso de estudio, Sobre mí, Contacto en desktop 1440 y mobile 393). La página "Brief y estrategia" tiene público, conversión y pendientes.

## Objetivo del sitio

Convertir visitas en conversaciones. Público principal: empresas de software B2B/SaaS que contratan (full-time); secundario: clientes freelance. Conversión principal: **agendar una llamada de 30 min**; secundarias: WhatsApp y email. Sin descarga de CV.

## Live

- **Producción**: https://diego-mera-portfolio.vercel.app
- **Repo**: https://github.com/dmera8447-boop/diego-mera-portfolio (branch `main`)
- **Hosting**: Vercel (auto-deploy en cada `git push origin main`; las otras ramas generan previews)
- **Email transaccional**: Resend (formulario de contacto)

---

## Stack

| Capa | Tecnología | Versión |
|---|---|---|
| Framework | Next.js (App Router) | **15.5.x** (NO 16+) |
| Lenguaje | TypeScript strict | 5.x |
| Estilos | Tailwind CSS v4 | tokens en `tailwind.config.ts` enlazado por `@config` |
| Contenido | MDX + gray-matter + next-mdx-remote (≥ 6.0.0) | |
| Formularios | react-hook-form + zod | |
| Animación de casos | lottie-react (lazy) | |
| Fuentes | next/font (Host Grotesk 400/500, self-hosted) | |
| Hosting | Vercel | `pnpm install` + `next build` |

`framer-motion` y `lucide-react` siguen instalados pero el rediseño no los usa (el movimiento es CSS + IntersectionObserver).

---

## Design System — "Propuesta A · Nombre gigante"

Blanco y negro, una sola familia, un acento naranja reservado para la acción principal. Reglas de la skill `design-taste-frontend`: sin eyebrows, sin monospace, sin numeración 01/02, sin líneas divisorias, sin gradientes, sin sombras en reposo, titulares de máximo dos líneas.

### Colores (`tailwind.config.ts`)

| Token | Hex | Uso |
|---|---|---|
| `bg` | `#ffffff` | Fondo |
| `ink` | `#0b0b0b` | Texto, footer, botón secundario |
| `ink-2` | `#3a3a38` | Segunda etapa del proceso, hover de botón tinta |
| `soft` | `#6b6b68` | Texto secundario (5.3:1) |
| `faint` | `#b4b4b0` | Solo elementos deshabilitados/decorativos, nunca texto de lectura |
| `tone` / `tone-2` | `#f1f1ef` / `#e4e4e1` | Superficies (se separa por tono, no con bordes) |
| `accent` | `#ff4d00` | **Solo** la acción de agendar (texto en `ink` encima, 6.5:1) |
| `on-ink` / `on-ink-soft` | `#ffffff` / `#a9a9a5` | Texto sobre tinta |
| `error` | `#b3261e` | Validación |

### Tipografía (Host Grotesk 400/500, clases en `globals.css`)

| Clase | Tamaño | Uso |
|---|---|---|
| `.type-name` | 20.66% del ancho del contenedor `.name-fit` | El nombre a todo el ancho (hero y footer) |
| `.type-h1` | clamp(48px, 8.4vw, 120px) | h1 de páginas internas |
| `.type-h2` | clamp(40px, 4.45vw, 64px) | Títulos de sección |
| `.type-lead` | clamp(24px, 2.2vw, 32px) | Enunciados, nombres de casos |
| `.type-title` | 24px | Subtítulos |
| body | 16px / 1.6 | Texto corrido |

### Espaciado y forma

- Margen exterior `px-edge`: 20px móvil / 32px desde md. Entre secciones `pt-section`: 96px / 160px.
- Esquinas rectas en todo. Botones: primario (acento), tinta, enlace subrayado (`components/ui/Button.tsx`).

### Movimiento

- Firma: el nombre sube desde su línea base al cargar (`.mask-line`).
- Entradas por scroll: `<InView>` pone `data-armed`/`data-inview`; los hijos con `.reveal` (y `--i` para el orden) o `.clip-reveal` (barra de proceso) animan en CSS. Sin JS o con `prefers-reduced-motion`, todo es visible.
- Lotties: se cargan al entrar en pantalla, se pausan fuera y con reduced-motion muestran el primer cuadro. Sus fondos fueron recoloreados a `tone` (#f1f1ef) para fundirse con el espacio de imagen.

---

## Estructura

```
src/
├─ middleware.ts                 ← ES en la raíz (rewrite a /es), EN en /en, /es/* redirige 308
├─ i18n/
│  ├─ config.ts                  ← locales, localePath()
│  └─ dictionaries.ts            ← TODO el texto ES/EN (fill() para plantillas {llave})
├─ app/
│  ├─ globals.css                ← tokens de tipo, .case-body, movimiento
│  ├─ [lang]/layout.tsx          ← html lang, fuente, nav, footer, barra móvil, JSON-LD
│  ├─ [lang]/page.tsx            ← Home: Hero → Cifras → Trabajo → Sobre mí → Proceso → (Testimonios) → Contacto
│  ├─ [lang]/projects/[slug]/    ← Caso de estudio (frontmatter + cuerpo MDX)
│  ├─ [lang]/about/              ← Sobre mí
│  ├─ [lang]/contact/            ← Agenda + canales + formulario + FAQ
│  ├─ api/contact/route.ts       ← Zod + honeypot + rate-limit + Resend (o mock)
│  ├─ sitemap.ts / robots.ts     ← sitemap con ambos idiomas y hreflang
│  └─ icon / og / twitter images
├─ components/
│  ├─ layout/   SiteNav, SiteFooter, LangSwitch, MobileCallBar
│  ├─ home/     Hero, Numbers, WorkLedger, AboutTeaser, ProcessBar, Testimonials, HomeContact
│  ├─ contact/  CallPlanner, ContactForm, LocalTime
│  ├─ work/     LottieCover, case-mdx
│  └─ ui/       Button, ActionRow, CtaBand, InView, MediaSlot, Highlighted
└─ lib/
   ├─ site.ts            ← datos fijos (email, WhatsApp, LinkedIn, bookingUrl) + whatsappHref/mailtoHref
   ├─ links.ts           ← bookHref(), navItems(), alternatePath()
   ├─ content.ts         ← casos por idioma, isFilled(), getNextCaseStudy()
   ├─ contact-schema.ts  ← Zod (errores como códigos traducibles)
   └─ rate-limit.ts
content/case-studies/
├─ *.mdx                 ← casos en español; principales: siniestros, labreicis, luntriqa, robotica, ecosystem (el resto con `hidden: true`)
└─ en/*.mdx              ← traducción: campos vacíos caen al español
```

### Rutas

| ES | EN |
|---|---|
| `/` | `/en` |
| `/about` | `/en/about` |
| `/contact` (`#agenda`) | `/en/contact` |
| `/projects/[slug]` | `/en/projects/[slug]` |

Anclas de la home: `#trabajo`, `#proceso`, `#contacto`.

---

## Contenido: cómo editar

- **Textos de páginas**: `src/i18n/dictionaries.ts` (editar `es` y `en` a la vez).
- **Testimonios**: `home.testimonials.items` en el diccionario. La sección no aparece mientras la lista esté vacía.
- **Agenda real**: poner el link de Cal.com/Calendly en `siteConfig.bookingUrl`; todos los "Agendar llamada" lo usan. Vacío = el planificador de `/contact` arma un WhatsApp con día y hora.
- **Casos** (frontmatter): `shortTitle` (nombre en lista y h1), `kind`, `company`, `description`, `role`, `team`, `duration`, `platform`, `year`, `order`, `featured` (caso del hero), `hidden` (fuera de la lista y el sitemap), `lottie`, `results` (lista `{value, label}`; la sección Resultados se oculta si falta), `coverReady: true` cuando `cover`/`hero` sean capturas reales.
- Imágenes extra en el cuerpo: `<Figure src="/case-studies/slug/x.jpg" alt="…" />`. Las capturas salen de la página **Assets** del Figma (exportadas a JPG 2400px).
- Casos largos (ver `gestion-de-siniestros.mdx`): `<Modules>` + `<Module title audience src alt>` (texto a la izquierda, laptop sobre tono a la derecha), `<Feature>` (sección destacada a todo el ancho sobre tinta, misma grilla) y `<ThemeGallery>` (pestañas claro/oscuro accesibles con teclado). Las props del MDX van solo como texto: next-mdx-remote bloquea expresiones JS (`{[…]}`), por eso `screens="archivo:Nombre, …"`. Mockups de Siniestros y Mr. I: página **Mockups Gestion de Siniestros Mr.I** del Figma (PNG a 2x).
- Valores que empiezan con `[` se consideran pendientes y no se muestran en la ficha del caso.
- **Cuerpo de los casos**: los 5 principales tienen texto (Contexto, Reto, Enfoque, Solución, Aprendizajes) escrito por Claude a partir de las capturas, sin métricas inventadas; Diego lo revisa y se afina con sus respuestas. Los ocultos siguen como `[REEMPLAZAR]`.

---

## Variables de entorno

```
RESEND_API_KEY=re_XXXXXXXX     # Real en producción; cualquier placeholder activa modo mock
CONTACT_EMAIL=diego.mera2002@hotmail.com
```

Modo mock: si la key falta o es placeholder, `/api/contact` registra en consola y responde `{ok:true, mocked:true}`. En producción se envía desde `onboarding@resend.dev` (solo entrega al dueño de la cuenta Resend).

---

## Comandos

```bash
pnpm dev              # localhost:3000
pnpm typecheck && pnpm lint && pnpm build   # antes de pushear
pnpm format           # Prettier + orden de clases
node ~/.claude/skills/design-taste-frontend/scripts/inspect.mjs http://localhost:3000   # inspector de diseño
node ~/.claude/skills/design-taste-frontend/scripts/lint.mjs src                       # lint de patrones prohibidos
```

Si el dev server se rompe tras un build: `rm -rf .next && pnpm dev`.

---

## Reglas

1. Fidelidad al Figma "Propuesta A"; cualquier desvío se avisa.
2. Mobile-first real (breakpoint md = 768px; diseño móvil a 393px).
3. WCAG AA: contraste 4.5:1+, foco visible, alt/aria, headings sin saltos, objetivos táctiles ≥ 44px.
4. TypeScript strict + `noUncheckedIndexedAccess`.
5. Server components por defecto; `'use client'` solo con estado o APIs del navegador.
6. Todo texto visible va en el diccionario (ES y EN).
7. El acento naranja solo en la acción de agendar.
8. `prefers-reduced-motion` siempre respetado.
9. NUNCA commitear `.env.local` ni keys reales.
10. Código en inglés, contenido en español (y su traducción).
11. Commits en imperativo, primera línea < 72 caracteres.

---

## Pendientes

- Retrato listo en `public/about/retrato.jpg` (recorte 4:5). Confirmar años, rol y empresa de Luntriqa, Robótica y Ecosystem.
- Métricas por caso (`results`); Diego debe validar el texto de los 5 casos (se agregan secciones Investigación/Impacto cuando haya datos reales).
- Testimonios de LinkedIn.
- Logo: isotipo DM de Diego (Figma Assets, "Logo DM Blanco/Negro") en blanco sobre recuadro de tinta (`components/brand/LogoMark.tsx`, `app/icon.svg`, `icon.png`, `apple-icon.png`).
- Link de agenda (`bookingUrl`).
- Confirmar: años de cada caso, "respondo en menos de 24 horas".
- Imagen OG/Twitter todavía es la del diseño anterior.
- Dominio custom opcional (actualizar `siteConfig.url`, verificar dominio en Resend, cambiar `from:`).
- Rotar API key de Resend (fue compartida en un chat anterior).
