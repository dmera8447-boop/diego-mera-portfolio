import type { Config } from "tailwindcss";

/**
 * DESIGN TOKENS — "Propuesta A · Nombre gigante"
 * Fuente de verdad: Figma › Diego Mera Portfolio › Propuesta A — Nombre gigante.
 * Blanco y negro, una sola familia (Host Grotesk), un acento naranja reservado
 * para la acción principal (agendar una llamada).
 *
 * Tailwind v4 lee este archivo vía `@config` en globals.css.
 * La familia se inyecta con la CSS variable que genera `next/font`.
 */
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#ffffff",
        ink: "#0b0b0b",
        "ink-2": "#3a3a38",
        // Texto secundario (contraste 5.3:1 sobre blanco)
        soft: "#6b6b68",
        // Solo para elementos atenuados o decorativos, nunca texto de lectura
        faint: "#b4b4b0",
        // Superficies: un paso de tono en vez de bordes o sombras
        tone: "#f1f1ef",
        "tone-2": "#e4e4e1",
        // Acción principal — siempre con texto en tinta (6.5:1)
        accent: "#ff4d00",
        "on-ink": "#ffffff",
        "on-ink-soft": "#a9a9a5",
        error: "#b3261e",
      },
      fontFamily: {
        sans: ["var(--font-host)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      spacing: {
        // Margen exterior: 20px en móvil, 32px desde md
        edge: "var(--edge)",
        // Separación entre secciones: 96px móvil, 160px desktop
        section: "var(--section)",
      },
      maxWidth: {
        measure: "38rem",
      },
    },
  },
  plugins: [],
};

export default config;
