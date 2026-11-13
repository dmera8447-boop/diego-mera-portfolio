# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Principal:** empresas de software B2B/SaaS que buscan contratar un diseñador UX/UI full-time (in-house). Quien llega suele ser un hiring manager, líder de producto o reclutador que compara portafolios y decide si vale la pena una conversación.
- **Secundario:** clientes freelance (empresas que necesitan un diseñador por proyecto: producto, dashboard o sitio corporativo).

Confirmado por Diego el 2026-11-13.

## Product Purpose

Portafolio personal de Diego Andrés Mera Rojas, diseñador UX/UI en Shepwashi (Samborondón, Ecuador). Existe para convertir visitas en conversaciones. El éxito es que el visitante agende una llamada de 30 minutos; las conversiones secundarias son WhatsApp y email. No hay descarga de CV.

## Positioning

Lo que Diego confirmó que lo distingue:

- **Dashboards complejos:** experiencia en productos B2B densos (gestión de siniestros/insurtech, acuicultura en desktop + iPad, plataformas multirol).
- **Diseño + sistema:** entrega design systems y tokens en Figma listos para desarrollo, no solo pantallas.
- **Negocios digitales:** formación en Negocios Digitales (Universidad Espíritu Santo); decide con objetivos y métricas de negocio.

## Operating Context

- El visitante evalúa el trabajo comparando con otros candidatos; lee casos de estudio para juzgar proceso, criterio y resultados.
- Desktop (diseño a 1440) y móvil (diseño a 393) importan por igual; en móvil hay una barra fija para agendar.
- Contacto: agenda (link de Cal.com/Calendly pendiente; mientras tanto el planificador de `/contact` arma un WhatsApp con día y hora), WhatsApp, email y formulario (Resend).
- Zona horaria del dueño: America/Guayaquil (GMT−5).

## Capabilities and Constraints

- Páginas: Home, Caso de estudio (plantilla MDX), Sobre mí, Contacto (agenda + canales + formulario + FAQ).
- Bilingüe: español por defecto en `/`, inglés en `/en`. Todo texto visible vive en `src/i18n/dictionaries.ts` con ambas versiones.
- Fuente de verdad del diseño: Figma `Diego Mera Portfolio` (file key `yulmuyDDjurUaAL63MdD27`), página "Propuesta A — Nombre gigante". Cualquier desvío se avisa.
- La conversión principal (agendar) define la jerarquía de acciones en todas las páginas.
- Stack y reglas técnicas documentados en `CLAUDE.md` (Next.js 15.5, Tailwind v4, MDX, Vercel).
- Pendiente de decidir: dominio propio (hoy `diego-mera-portfolio.vercel.app`).

## Brand Commitments

- Nombre público: Diego Mera. Logo: isotipo "DM" (`src/components/brand/LogoMark.tsx`, `src/app/icon.svg`).
- Voz: español claro y directo, primera persona; inglés como traducción fiel.
- Referencia que Diego hizo explícita al iniciar el rediseño: matthieugivelet.com (minimalismo B/N, nombre gigante, tipografía, tono).

## Evidence on Hand

- Casos principales con texto: `content/case-studies/gestion-de-siniestros.mdx`, `labreicis.mdx`, `luntriqa.mdx`, `robotica.mdx`, `ecosystem.mdx` (traducciones en `content/case-studies/en/`). El resto está con `hidden: true`.
- Capturas de los casos en la página "Assets" del Figma; Lotties de portada recoloreadas.
- Retrato: `public/about/retrato.jpg`.
- Certificado Google UX Design y cursos completados (página Sobre mí).
- **Ausencias que no se deben inventar:** testimonios (pendientes de LinkedIn; la sección se oculta sin datos), métricas por caso (`results` vacío hasta validarlas), años/rol de Luntriqa, Robótica y Ecosystem por confirmar, tiempo de respuesta "menos de 24 horas" sin confirmar, link de agenda real.

## Product Principles

1. **Todo empuja a agendar.** Cada página termina en una forma clara de iniciar la conversación; agendar va primero, WhatsApp y email después.
2. **Nada inventado.** Métricas, testimonios, clientes y fechas solo aparecen cuando son reales; lo pendiente se oculta, no se rellena.
3. **El trabajo prueba el criterio.** Los casos de estudio muestran el razonamiento de producto y negocio detrás de interfaces complejas, no solo pantallas bonitas.
4. **Dos idiomas, una sola calidad.** Español e inglés reciben el mismo cuidado; ningún texto existe en un solo idioma.

## Accessibility & Inclusion

WCAG 2.1 AA: contraste de texto 4.5:1 o más, foco visible, alt y aria completos, headings sin saltos, objetivos táctiles de 44px o más, y `prefers-reduced-motion` respetado siempre.
