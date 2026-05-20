/**
 * Configuración global del sitio.
 * Datos reales de Diego (reemplazan el contenido placeholder de Stitch).
 */
export const siteConfig = {
  name: "Diego Mera",
  fullName: "Diego Andrés Mera Rojas",
  role: "Diseñador UX/UI",
  // TODO: ajustar al dominio final antes del deploy (FASE 4)
  url: "https://diegomera.vercel.app",
  description:
    "Diseñador UX/UI con 2+ años de experiencia en dashboards B2B, productos SaaS y Design Systems. Arquitectura de experiencias digitales con lógica estructural y precisión.",
  location: "Samborondón, Guayas, Ecuador",
  email: "diego.mera2002@hotmail.com",
  experienceYears: "2+",
} as const;

/** Navegación principal (anclas de scroll, según el diseño de Stitch). */
export const navLinks = [
  { label: "PROYECTOS", href: "/#proyectos" },
  { label: "PROCESO", href: "/#proceso" },
  { label: "SOBRE MÍ", href: "/#sobre-mi" },
  { label: "CONTACTO", href: "/#contacto" },
] as const;

/** Redes (reemplazan DRIBBBLE/READCV/GITHUB ficticios de Stitch). */
export const socialLinks = [
  {
    label: "LINKEDIN",
    href: "https://linkedin.com/in/diegomerarojas",
  },
  {
    label: "EMAIL",
    href: `mailto:${siteConfig.email}`,
  },
] as const;

export type NavLink = (typeof navLinks)[number];
export type SocialLink = (typeof socialLinks)[number];
