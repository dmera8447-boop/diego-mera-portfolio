# Portafolio — Diego Mera (UX/UI Designer)

Portafolio personal de **Diego Andrés Mera Rojas** — Diseñador UX/UI con 2+ años de experiencia en dashboards B2B, productos SaaS y Design Systems. Fuente de verdad del diseño: **Stitch → Minimalist Brutalist UX Portfolio** (design system "Structural Monolith": Brutalismo + Minimalismo).

## Stack

- **Next.js 15** (App Router) + **TypeScript** strict (`noUncheckedIndexedAccess`, `noImplicitOverride` activos)
- **Tailwind CSS v4** — tokens en `tailwind.config.ts` referenciados desde `globals.css` con `@config`
- **Framer Motion** — animación quirúrgica (stagger en Proceso, fade-in al cargar vía CSS)
- **lucide-react** — iconos del Proceso
- **next/font** — Anton + Inter + JetBrains Mono self-hosted (sin Google Fonts CDN)
- **next/image** — `avif/webp` automáticos, lazy loading
- **Casos de estudio en MDX** (`content/case-studies/`) — `next-mdx-remote/rsc` + `gray-matter`
- **Formulario** — `react-hook-form` + `zod` (mismo schema cliente/servidor)
- **Email** — Resend (con **modo simulado** automático si la API key no está configurada)
- **Gestor de paquetes:** pnpm · **Hosting:** Vercel

## Estructura

```
src/
├─ app/
│  ├─ layout.tsx · page.tsx · globals.css
│  ├─ projects/[slug]/page.tsx     ← detalle de caso (SSG, generateStaticParams)
│  ├─ api/contact/route.ts          ← endpoint POST (Resend + mock + rate-limit)
│  ├─ icon.png · apple-icon.png · opengraph-image.png · twitter-image.png
│  ├─ sitemap.ts · robots.ts
│  └─ ...
├─ components/
│  ├─ layout/   (Navbar · Footer · GridOverlay)
│  ├─ sections/ (Hero · FeaturedProjects · Process · About · Contact · ContactForm)
│  ├─ work/     (ProjectCard · CaseStudyNav · mdx-components)
│  └─ ui/       (Reveal)
└─ lib/         (site · utils · content · contact-schema · rate-limit)
content/case-studies/  shepwashi.mdx · todo-domi.mdx · labreicis.mdx
public/case-studies/[slug]/  cover.png · hero.png · body-01.png  (placeholders)
tailwind.config.ts  ← tokens "Structural Monolith"
```

## Requisitos

- Node.js 20+ (probado en v24)
- pnpm 9+ → `corepack enable pnpm` (incluido en Node)

## Desarrollo

```bash
pnpm install      # instalar dependencias
pnpm dev          # servidor de desarrollo → http://localhost:3000
pnpm build        # build de producción
pnpm start        # servir el build localmente
pnpm lint         # ESLint (next/core-web-vitals + typescript)
pnpm typecheck    # tsc --noEmit
pnpm format       # Prettier (con orden de clases Tailwind)
```

## Variables de entorno

Copia `.env.example` a `.env.local` y rellena los valores:

```bash
cp .env.example .env.local
```

| Variable          | Descripción                                                       | Obligatoria |
| ----------------- | ----------------------------------------------------------------- | ----------- |
| `RESEND_API_KEY`  | API key de https://resend.com (formato `re_…`)                    | Producción  |
| `CONTACT_EMAIL`   | Dirección donde recibir los mensajes del formulario                | Producción  |

Si `RESEND_API_KEY` no está configurada (o sigue siendo el placeholder), el endpoint `/api/contact` entra automáticamente en **modo simulado**: registra el envío en la consola del servidor y devuelve `{ ok: true, mocked: true }`. Útil para desarrollo sin cuenta de Resend.

## Contenido a personalizar

| Archivo                                          | Qué actualizar                                          |
| ------------------------------------------------ | ------------------------------------------------------- |
| `src/lib/site.ts`                                | URL del sitio, datos de contacto, redes                 |
| `src/components/sections/Hero.tsx`               | Título y propuesta de valor (`[TÍTULO PRINCIPAL]`…)     |
| `src/components/sections/About.tsx`              | Declaración, bio, experiencia, herramientas             |
| `src/components/sections/Process.tsx`            | Descripción de cada una de las 7 fases                  |
| `content/case-studies/*.mdx`                     | Frontmatter + 7 secciones por caso                      |
| `public/case-studies/[slug]/`                    | Imágenes reales (reemplazar placeholders)               |

Cada bloque está marcado con `{/* TODO: contenido final */}` o `[REEMPLAZAR]` para localizarlo fácilmente.

## Deploy en Vercel

### 1) Sube el código a GitHub

```bash
cd ~/diego-mera-portfolio
git init
git add .
git commit -m "Portafolio inicial"
# Crea un repo nuevo en https://github.com/new y luego:
git branch -M main
git remote add origin https://github.com/<tu-usuario>/diego-mera-portfolio.git
git push -u origin main
```

### 2) Importa el proyecto en Vercel

1. Entra en https://vercel.com/new
2. **Import Git Repository → autoriza GitHub → selecciona el repo.**
3. Vercel detecta automáticamente Next.js 15, `pnpm` y `pnpm build`. **Deja todo por defecto** (Framework Preset = Next.js, Root Directory = `./`).
4. **No despliegues todavía** — antes configura las variables de entorno.

### 3) Variables de entorno en Vercel

En la pantalla de importación, expande **Environment Variables** y añade:

| Name              | Value                              | Environments              |
| ----------------- | ---------------------------------- | ------------------------- |
| `RESEND_API_KEY`  | `re_…` (tu API key real de Resend) | Production · Preview · Dev |
| `CONTACT_EMAIL`   | `diego.mera2002@hotmail.com`       | Production · Preview · Dev |

Después clica **Deploy**.

### 4) Dominio custom (opcional)

1. En el dashboard del proyecto Vercel → **Settings → Domains → Add**.
2. Escribe tu dominio (p.ej. `diegomera.com`).
3. Vercel te muestra el registro DNS a configurar:
   - **A** `@` → `76.76.21.21` (para apex) **o**
   - **CNAME** `www` → `cname.vercel-dns.com`
4. Configura el DNS en tu proveedor y espera la verificación (~minutos).
5. Cuando el dominio aparezca como **Valid**, actualiza `src/lib/site.ts`:
   ```ts
   export const siteConfig = {
     url: "https://diegomera.com",
     // ...
   };
   ```
6. Commit + push → Vercel re-deploya automáticamente.
7. **Sitemap y robots quedan actualizados automáticamente** porque leen `siteConfig.url`.

### 5) Dominio verificado en Resend (envíos a cualquiera)

Por defecto el remitente es `onboarding@resend.dev` (dominio de pruebas — **solo envía al email del owner de la cuenta Resend**, no a terceros). Para producción:

1. Resend → **Domains → Add Domain** (p.ej. `diegomera.com`).
2. Añade los registros **SPF + DKIM + DMARC** que Resend muestra.
3. Cuando aparezca **Verified**:
   - Edita `src/app/api/contact/route.ts` ~línea 75:
     ```ts
     from: "Portafolio <hola@diegomera.com>",
     ```
   - Commit + push → redeploy.

### 6) Verifica producción

- [ ] `https://<dominio>/` carga el home en < 2s.
- [ ] `https://<dominio>/projects/shepwashi` (y los otros 2 casos) responden 200.
- [ ] `https://<dominio>/robots.txt` y `/sitemap.xml` muestran tu dominio.
- [ ] Envía un mensaje desde `/#contacto` con un email real → llega al `CONTACT_EMAIL`.
- [ ] Comparte el link en LinkedIn y verifica la imagen de OG (puedes pre-cachear en https://opengraph.xyz).
- [ ] Lighthouse → `pnpm dlx lighthouse https://<dominio> --view` (objetivo 90+ en las 4 métricas).

## Decisiones técnicas relevantes

- **Tailwind v4 con `tailwind.config.ts`**: v4 es CSS-first, pero conservamos la config TS y la enlazamos con `@config` desde `globals.css` (válido en v4) para tener tipado.
- **Página única + anclas**: nav apunta a `#proyectos · #proceso · #sobre-mi · #contacto`. Scrollspy con IntersectionObserver. `/projects/[slug]` para detalle.
- **`Reveal` en CSS puro**: animación de entrada vía `@keyframes` (no requiere JS), `prefers-reduced-motion` lo desactiva, `animation-fill-mode: both` asegura estado final.
- **Stagger Framer Motion en `Process`**: 7 fases entran secuencialmente al hacer scroll. Respeta reduced-motion.
- **Honeypot + rate-limit en memoria**: anti-spam pragmático (5/10min/IP). Si recibes spam, upgrade a Upstash Ratelimit + Redis.
- **Modo simulado del formulario**: sin Resend configurado, el endpoint registra en consola y responde 200 → permite testing local sin tocar la cuenta de Resend.

## Licencia

© 2026 Diego Andrés Mera Rojas. Todos los derechos reservados.
