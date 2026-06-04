# Portafolio — Diego Mera (UX/UI Designer)

Contexto del proyecto para sesiones de Claude Code. Léelo antes de hacer cualquier cambio.

---

## Identidad

- **Owner**: Diego Andrés Mera Rojas — Diseñador UX/UI · 2+ años
- **Ubicación**: Samborondón, Guayas, Ecuador
- **Email**: diego.mera2002@hotmail.com
- **LinkedIn**: linkedin.com/in/diegomerarojas
- **Especialidad**: dashboards B2B, productos SaaS, Design Systems
- **Diseño fuente de verdad**: Stitch (Google) — proyecto "Minimalist Brutalist UX Portfolio" (ID `1944364421998808726`), design system **"Structural Monolith"** (Brutalismo + Minimalismo)

## Live

- **Producción**: https://diego-mera-portfolio.vercel.app
- **Repo**: https://github.com/dmera8447-boop/diego-mera-portfolio (público, branch `main`)
- **Hosting**: Vercel (auto-deploy en cada `git push origin main`)
- **Email transaccional**: Resend (form de contacto)

---

## Stack (NO NEGOCIABLE — viene del brief original)

| Capa | Tecnología | Versión |
|---|---|---|
| Framework | Next.js | **15.5.18** (NO 16+ — el brief lo fijó en 15) |
| Lenguaje | TypeScript strict | 5.x |
| Estilos | Tailwind CSS v4 | con tokens en `tailwind.config.ts` enlazado por `@config` |
| Animaciones | Framer Motion | 11.18.2 |
| Iconos | lucide-react | 0.469.0 |
| Fuentes | next/font | self-hosted (NO Google Fonts CDN) |
| Imágenes | next/image | avif/webp |
| Hosting | Vercel | con `pnpm install` + `next build` |
| Gestor | pnpm | 11.x (via corepack) |

### Dependencias completas

**deps**: `clsx`, `framer-motion`, `gray-matter`, `lottie-react`, `lucide-react`, `next`, `next-mdx-remote` (≥ **6.0.0** — la 5.x es bloqueada por Vercel security gate), `react`, `react-dom`, `tailwind-merge`, `zod`, `@hookform/resolvers`, `react-hook-form`, `resend`

**devDeps**: `@eslint/eslintrc`, `@tailwindcss/postcss`, `eslint`, `eslint-config-next` (15.x — emparejada con Next 15), `eslint-config-prettier`, `prettier`, `prettier-plugin-tailwindcss`, `sharp`, `tailwindcss`, `typescript`

---

## Design System — "Structural Monolith"

### Colores (en `tailwind.config.ts`)

| Token | Hex | Uso |
|---|---|---|
| `primary` / `border-dark` | `#000000` | Tinta, bordes 2px |
| `on-primary` | `#ffffff` | Texto sobre negro |
| `background` / `surface` | `#f9f9f9` | Canvas |
| `surface-container-lowest` | `#ffffff` | Cards |
| `surface-container-high` | `#e8e8e8` | NO usar como fondo de cards de proyecto — los Lotties son blancos, queda marco gris visible. Usar `surface-container-lowest` |
| `on-surface` / `on-background` | `#1a1c1c` | Texto principal |
| `secondary` | `#5d5f5f` | Texto secundario |
| `accent-gray` | `#e0e0e0` | Líneas de grid 1px |
| `meta-text` | `#666666` | Metadatos / footer |
| `error` | `#ba1a1a` | Validación de formularios |

### Tipografía

| Estilo | Familia | Tamaño | Notas |
|---|---|---|---|
| `display-xl` | Anton | 120px / 110% / -0.04em | h1 desktop |
| `display-xl-mobile` | Anton | 64px / 110% / -0.02em | Token. En el Hero está OVERRIDED a 44px (sm: 56px) por overflow |
| `headline-lg` | Anton | 48px / 120% | Section headings |
| `headline-md` | Anton | 32px / 120% | Card titles |
| `body-lg` | Inter | 20px / 160% | Párrafos importantes |
| `body-md` | Inter | 16px / 160% | Body genérico |
| `meta-code` | JetBrains Mono | 12px / 140% / 0.05em | Labels técnicos (`// 01_PERFIL`, `FASE_01`, eyebrows) |

**Convenciones**: Anton siempre `uppercase`. Inter para cuerpo. Mono para metadatos. Las 3 fuentes se cargan vía `next/font/google` (self-hosted automáticamente).

### Espaciado

- `base`: 8px
- `gutter`: 24px
- `margin-edge`: 48px (horizontal de sección — ojo: en mobile 375 esto deja 279px usable)
- `section-gap`: 160px (separación entre "monumentos")
- `grid-line-weight`: 1px

### Reglas brutalistas (estrictas)

- ❌ **CERO border-radius** en cualquier `rounded-*` utility (`full: "0"` también — TODOS los `rounded-*` resuelven a 0). Si necesitas algo redondo (cursor, avatar), usa **inline** `style={{ borderRadius: "9999px" }}` para bypass.
- ❌ **CERO shadows** (`box-shadow: none` en todos los `shadow-*`)
- ❌ Sin gradientes
- ✅ Bordes 1px (accent-gray) o 2px (border-dark) son TODOS los separators
- ✅ Líneas de grid visibles (12-col desktop / 4-col mobile) vía `.grid-bg` utility
- ✅ Composición asimétrica intencional (hero original, before centering)
- ✅ Hover = **inversión dura instantánea** (sin easing decorativo), `transition-none` casi siempre
- ✅ Imágenes con borde 2px negro, `aspect-*` definido

---

## Estructura

```
diego-mera-portfolio/
├─ CLAUDE.md                        ← este archivo
├─ README.md                        ← instrucciones públicas
├─ .env.local                       ← gitignored: RESEND_API_KEY + CONTACT_EMAIL
├─ .env.example                     ← versionado (vacío)
├─ next.config.ts                   ← reactStrictMode, formats avif/webp
├─ tailwind.config.ts               ← TODOS los design tokens
├─ eslint.config.mjs                ← FlatCompat + next/core-web-vitals + prettier
├─ tsconfig.json                    ← strict + noUncheckedIndexedAccess
├─ content/case-studies/            ← 4 .mdx (frontmatter alimenta home + detail)
│  ├─ shepwashi.mdx
│  ├─ todo-domi.mdx
│  ├─ labreicis.mdx
│  └─ fundacion-madre-dolorosa.mdx
├─ public/
│  ├─ case-studies/[slug]/          ← cover/hero/body-01.png (placeholders blancos)
│  └─ lottie/[slug].json            ← 4 animaciones Jitter Pro (license OK)
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx                 ← next/font + metadata + Preloader + Cursor + JSON-LD
│  │  ├─ page.tsx                   ← Hero → FeaturedProjects → Process → About → Contact
│  │  ├─ globals.css                ← @import tailwindcss + @config + base + preloader + grid-bg
│  │  ├─ icon.png / apple-icon.png  ← favicons (DM monograma, gen via sharp)
│  │  ├─ opengraph-image.png        ← OG (1200×630)
│  │  ├─ twitter-image.png          ← Twitter card (1200×630)
│  │  ├─ sitemap.ts                 ← genera sitemap.xml con home + 4 casos
│  │  ├─ robots.ts                  ← Allow / · Disallow /api/
│  │  ├─ projects/[slug]/page.tsx   ← SSG via generateStaticParams + MDX render
│  │  └─ api/contact/route.ts       ← POST: Zod validation + honeypot + rate-limit + Resend (o mock)
│  ├─ components/
│  │  ├─ layout/   Navbar, Footer, GridOverlay, Preloader
│  │  ├─ sections/ Hero, FeaturedProjects, Process, About, Contact, ContactForm
│  │  ├─ ui/       Reveal, Cursor, TextRotate
│  │  └─ work/     ProjectCard, LottieCover, CaseStudyNav, mdx-components
│  └─ lib/
│     ├─ site.ts          ← siteConfig, navLinks, socialLinks (TODO: dominio custom)
│     ├─ utils.ts         ← cn() (clsx + tailwind-merge)
│     ├─ content.ts       ← getAllCaseStudies, getCaseStudy, getCaseStudySlugs, getAdjacentCaseStudies
│     ├─ contact-schema.ts← Zod schema compartido cliente/servidor
│     └─ rate-limit.ts    ← in-memory sliding window 5/10min/IP
```

---

## Componentes custom (inventario rápido)

### `layout/`
- **Navbar**: sticky 2px border-b, scrollspy via IntersectionObserver, panel móvil text "MENÚ/CERRAR" (NO hamburguesa — design system explicit ban), skip-link gestionado en layout.tsx
- **Footer**: 2px border-t, logo "DIEGO_MERA" Anton, LinkedIn + Email, copyright dinámico
- **GridOverlay**: reglas verticales fijas `accent-gray`, decorativo (`aria-hidden`), z-0
- **Preloader**: CSS-only splash que se oculta solo en 1.3s, logo `DIEGO_MERA` centered, `forwards` mantiene oculto post-animación. Solo se ve en hard refresh — RSC navigations no remontan layout

### `ui/`
- **Reveal**: wrapper client con IntersectionObserver — fade+slide al entrar viewport, una vez. Prop `immediate` (Hero above-the-fold), `delay` (stagger). Respeta `prefers-reduced-motion`
- **Cursor**: puntero custom desktop only (`matchMedia("(hover: hover) and (pointer: fine)")`), anillo 32px + punto 3px **inline** `borderRadius: 9999px` (bypass del `rounded-full: 0`), `mix-blend-difference` → negro sobre claro, blanco sobre oscuro automático. Hover sobre interactivos (a/button/input/[data-cursor-hover]) → escala 1.6×. Lerp 0.18/frame
- **TextRotate**: rotador char-by-char con AnimatePresence + LayoutGroup support. Adaptado de motion-primitives (snippet del user) a framer-motion. Usado en Hero

### `sections/`
- **Hero**: titular centered con `LayoutGroup` + `TextRotate`. Hook "Diseño productos que [verbo]". Mobile 44px → sm 56px → md+ 120px. **No tagline larga** (eliminada). Body con `max-w-2xl mx-auto text-center`
- **FeaturedProjects**: grid 2×2 con 4 case studies (col-span-6 cada uno, aspect-16/9). Sin titular visible (sr-only solo)
- **Process**: 7 fases en grid 3-col (last col-span-3 monumento). Icono + FASE_NN + título + descripción siempre visibles. Stagger fade-in via framer-motion viewport. **NO curtain-reveal** (revertido)
- **About**: quote como h2 display-xl + bio + Skills agrupados (UX/UI, IA, Soft skills)
- **Contact**: h2 "¿Tienes un proyecto en mente?" + subtitle + ContactForm + DIRECTO (email + LinkedIn)
- **ContactForm**: react-hook-form + zod, honeypot oculto, estados idle/loading/success/error, focus al status accesible

### `work/`
- **ProjectCard**: bordered 2px, **bg-surface-container-lowest** (NO -high — diferencia con Lottie blanco), aspect-16/9 default. Si `meta.lottie` existe → renderiza LottieCover, sino Image. Hover: title underline, focus visible
- **LottieCover**: lazy-load runtime de lottie-react vía `next/dynamic`. Fetch JSON solo cuando card entra viewport (IO threshold 0.05). Pausa cuando sale viewport. `prefers-reduced-motion` → nunca carga Lottie, solo PNG fallback. Lotties siempre a color (sin grayscale ni mix-blend), `preserveAspectRatio: "xMidYMid meet"` (no crop), padding `p-4 md:p-6`
- **CaseStudyNav**: prev/next circular, hover invert
- **mdx-components**: tipografía cuidada para lectura larga en MDX, imágenes con next/image (w=1600 h=1000 default)

---

## Anclas / Routing

- **Home single-page** con anchors: `#proyectos · #proceso · #sobre-mi · #contacto`
- **Nav** (`navLinks` en `site.ts`): PROYECTOS / PROCESO / SOBRE MÍ / CONTACTO
- **Order del DOM en page.tsx**: Hero → FeaturedProjects → Process → About → Contact
- **/projects/[slug]**: SSG 4 páginas (shepwashi, todo-domi, labreicis, fundacion-madre-dolorosa)

### Convenciones de slugs

| Slug | Title (frontmatter) | Company |
|---|---|---|
| `shepwashi` | Dashboard interno de métricas | Shepwashi · Desarrollo de Software |
| `todo-domi` | App de administración para restaurantes | Todo Domi · Plataforma de Delivery |
| `labreicis` | Dashboard operativo multi-módulo | Labreicis · Acuicultura |
| `fundacion-madre-dolorosa` | Sitio web institucional | Fundación Madre Dolorosa · Sin fines de lucro |

---

## Variables de entorno

Solo dos. `.env.local` (gitignored) y Vercel Environment Variables:

```
RESEND_API_KEY=re_XXXXXXXX     # Real para production; cualquier placeholder activa modo mock
CONTACT_EMAIL=diego.mera2002@hotmail.com
```

**Modo mock**: si `RESEND_API_KEY` no existe o vale `"aquí_va_mi_api_key"` (o similar), `/api/contact` registra el envío en console y devuelve `{ok:true, mocked:true}` sin tocar Resend. Útil para desarrollo sin gastar cuota.

**Dominio Resend**: en producción se envía desde `onboarding@resend.dev` (test sender de Resend — solo entrega al owner de la cuenta). Para enviar a cualquier email, verificar dominio custom en Resend y cambiar el `from:` en `src/app/api/contact/route.ts` línea ~75.

---

## Comandos comunes

```bash
pnpm install          # deps
pnpm dev              # localhost:3000
pnpm build            # production build (verifica antes de pushear)
pnpm lint             # next lint (next/core-web-vitals + typescript + prettier)
pnpm typecheck        # tsc --noEmit
pnpm format           # Prettier con orden de clases Tailwind
```

### Flujo de iteración

```bash
# Editar lo que sea
git add .
git commit -m "..."
git push                       # Vercel auto-deploya en ~1-2 min
```

### Reset cuando dev se rompe

```bash
rm -rf .next node_modules/.cache
pnpm dev
```

Si hay error tipo `Cannot read properties of undefined (reading 'call')` en webpack — siempre es cache HMR sucio. Ese reset lo arregla.

---

## Reglas estrictas (acumuladas — respetar siempre)

1. **Fidelidad pixel-perfect al diseño de Stitch** salvo donde el user pida lo contrario. NO improvisar ni "mejorar". Cualquier desvío requiere flag explícito.
2. **Mobile-first y responsive** real. Mobile breakpoint: 768px (md).
3. **A11y WCAG AA**: contraste 4.5:1+, keyboard nav, focus visible, alt texts, ARIA labels, headings jerárquicos sin saltos.
4. **TypeScript strict** + `noUncheckedIndexedAccess` + `noImplicitOverride`.
5. **Server components por defecto**, `'use client'` SOLO cuando es necesario (state, effects, browser APIs).
6. **next/font** — NO Google Fonts CDN.
7. **next/image** para todo, lazy por defecto, `priority` solo above-the-fold (Hero, primera card).
8. **Sin librerías de componentes pesadas** (no shadcn, MUI, Chakra) salvo que el user lo pida. Excepción aceptada: clsx + tailwind-merge (utilities tiny).
9. **Nombres en inglés para código, contenido en español**.
10. **Sin animaciones decorativas tipo "AI portfolio típico"**. Framer Motion solo donde aporte valor.
11. **`prefers-reduced-motion`** SIEMPRE respetado — implementar fallbacks visibles.
12. **NUNCA committear `.env.local`** ni keys reales — `.gitignore` ya lo cubre con `.env*` + `!.env.example`.

---

## Conventions de naming

- Componentes: `PascalCase.tsx`
- Utilities: `kebab-case.ts` (`utils.ts`, `contact-schema.ts`)
- Eyebrows brutalistas: `// PROCESO_DE_DISENO` (sin acentos, SCREAMING_SNAKE_CASE)
- Phase labels: `FASE_01..07` (padded a 2 dígitos)
- Frontmatter: `kebab-case` keys, valores en español
- Commits: imperative mood, primera línea < 72 chars, cuerpo con razonamiento (no solo el "qué")

---

## Quirks / gotchas a recordar

- **`rounded-full` = 0**: por la config brutalista. Cualquier círculo necesita `style={{ borderRadius: "9999px" }}` inline.
- **shape layer ty:4 en Lotties Jitter**: el fondo de cada animación vive en una shape layer (rect + fill). Para uniformizar fondos, modificar el fill color a `[1,1,1]` (RGB normalizado).
- **Framer Motion `whileInView` se congela en tabs hidden**: por eso usamos IntersectionObserver custom en `Reveal` (más confiable que viewport prop).
- **Vercel security gate**: bloquea deploys con deps vulnerables. Si aparece `Build Failed` con "Vulnerable version of X detected", actualizar y push.
- **Cursor + cards interactivas**: agregar `data-cursor-hover` para que el puntero escale al pasar encima.
- **`maxlinks-2xl` mx-auto** en body Hero (centered desktop) para evitar line-length 1200px+ ilegible.
- **Modo simulado de Resend**: si pushas a Vercel y el form devuelve `mocked:true`, falta actualizar `RESEND_API_KEY` en Vercel Settings → Environment Variables.

---

## Estado de contenido (TODOs visibles)

### Real

- ✅ Hero: hook + tagline + CTAs
- ✅ About: quote + bio + skills (UX/UI, IA, Soft skills)
- ✅ Process: 7 fases con descripciones reales
- ✅ Contact: copy real, form funcional probado E2E
- ✅ Project cards (home): título, company, descripción, tags, año para los 4 casos
- ✅ Imágenes Lottie animadas (4 casos, Jitter Pro license)

### Pendiente

- ⏳ **Cuerpo de los 4 case studies** — los 7 bloques (Contexto, Reto, Investigación, Proceso, Solución, Impacto, Aprendizajes) están como `[REEMPLAZAR]` en cada `.mdx`. NO TOCAR salvo que el user lo pida explícitamente — se trabajan en sesión separada.
- ⏳ **Frontmatter de Fundación Madre Dolorosa**: `role` / `duration` / `team` son placeholders. Tags y description fueron rellenados con defaults razonables.
- ⏳ **Screenshots reales** en `public/case-studies/[slug]/`: actualmente PNG blancos solid (32K cada uno). Diego los reemplaza con capturas reales sin cambiar dimensiones (1600×900 cover, 1920×1080 hero, 1600×1000 body-01).
- ⏳ **Dominio custom** opcional (`diegomera.com` u otro). Al activarlo: actualizar `siteConfig.url`, verificar en Resend, cambiar `from:` en route handler.
- ⏳ **Rotar API key Resend** — la actual fue compartida en chat anterior.

---

## Workflow por fases (del brief original)

El proyecto se construyó en 4 fases con gates explícitos:

1. **FASE 1**: Descubrimiento del diseño en Stitch ✅
2. **FASE 2**: Arquitectura y design tokens ✅
3. **FASE 3**: Implementación sección por sección ✅ (3.1 Layout · 3.2 Hero+About · 3.3 Proyectos · 3.4 Proceso · 3.5 Contacto)
4. **FASE 4**: Pulido, QA, deploy ✅

Cambios posteriores al deploy: contenido real, microinteracciones, Lottie covers, cursor, preloader, hero rotator.

**Regla del brief**: no avanzar entre fases sin aprobación explícita del user.

---

## Si vas a ayudar a Diego en una sesión nueva

1. Lee este archivo entero antes de tocar nada.
2. Verifica el dev server limpio: `cd ~/diego-mera-portfolio && rm -rf .next && pnpm dev`.
3. Si vas a editar la home: revisar `src/app/page.tsx` y los `src/components/sections/*`.
4. Si vas a editar contenido: probablemente `src/lib/site.ts` (datos personales) o `content/case-studies/*.mdx` (casos).
5. Si el cambio es visual: verificar que mantiene los design tokens y las reglas brutalistas.
6. Antes de pushear: `pnpm typecheck && pnpm lint && pnpm build` deben pasar verde.
7. Commit en imperative mood + push → Vercel auto-deploya. Confirmar verificando la URL.

Cualquier decisión que se desvíe de estas convenciones: discutirla explícitamente con Diego antes de implementarla.
