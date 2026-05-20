import type { Config } from "tailwindcss";

/**
 * DESIGN TOKENS — "Structural Monolith"
 * Fuente de verdad: Stitch › Minimalist Brutalist UX Portfolio.
 * Brutalismo + Minimalismo: negro/blanco puros, grid visible, 0 radios, 0 sombras.
 *
 * Nota (Tailwind v4): v4 es CSS-first, pero soporta config JS vía `@config`.
 * Mantenemos los tokens aquí (petición explícita del brief) y los enlazamos
 * desde `globals.css` con `@config`. Las familias tipográficas se inyectan
 * por CSS variables generadas por `next/font` (self-hosted, sin CDN).
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Superficies
        surface: "#f9f9f9",
        "surface-dim": "#dadada",
        "surface-bright": "#f9f9f9",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f3f3f3",
        "surface-container": "#eeeeee",
        "surface-container-high": "#e8e8e8",
        "surface-container-highest": "#e2e2e2",
        "surface-variant": "#e2e2e2",
        "surface-tint": "#5e5e5e",
        // Texto sobre superficies
        "on-surface": "#1a1c1c",
        "on-surface-variant": "#4c4546",
        "inverse-surface": "#2f3131",
        "inverse-on-surface": "#f1f1f1",
        // Primario (negro tinta)
        primary: "#000000",
        "on-primary": "#ffffff",
        "primary-container": "#1b1b1b",
        "on-primary-container": "#848484",
        "inverse-primary": "#c6c6c6",
        // Secundario
        secondary: "#5d5f5f",
        "on-secondary": "#ffffff",
        "secondary-container": "#dfe0e0",
        "on-secondary-container": "#616363",
        // Terciario
        tertiary: "#000000",
        "on-tertiary": "#ffffff",
        "tertiary-container": "#1b1b1b",
        "on-tertiary-container": "#848484",
        // Error (validación de formularios)
        error: "#ba1a1a",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a",
        // Fixed
        "primary-fixed": "#e2e2e2",
        "primary-fixed-dim": "#c6c6c6",
        "on-primary-fixed": "#1b1b1b",
        "on-primary-fixed-variant": "#474747",
        "secondary-fixed": "#e2e2e2",
        "secondary-fixed-dim": "#c6c6c7",
        "on-secondary-fixed": "#1a1c1c",
        "on-secondary-fixed-variant": "#454747",
        "tertiary-fixed": "#e2e2e2",
        "tertiary-fixed-dim": "#c6c6c6",
        "on-tertiary-fixed": "#1b1b1b",
        "on-tertiary-fixed-variant": "#474747",
        // Estructura
        background: "#f9f9f9",
        "on-background": "#1a1c1c",
        outline: "#7e7576",
        "outline-variant": "#cfc4c5",
        "accent-gray": "#e0e0e0", // líneas de grid 1px
        "border-dark": "#000000", // bordes pesados 1–2px
        "meta-text": "#666666", // metadatos / footer
      },
      fontFamily: {
        // Familias base (CSS vars de next/font)
        anton: ["var(--font-anton)", "Impact", "sans-serif"],
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
        // Alias por estilo de la escala
        "display-xl": ["var(--font-anton)", "Impact", "sans-serif"],
        "display-xl-mobile": ["var(--font-anton)", "Impact", "sans-serif"],
        "headline-lg": ["var(--font-anton)", "Impact", "sans-serif"],
        "headline-md": ["var(--font-anton)", "Impact", "sans-serif"],
        "body-lg": ["var(--font-inter)", "system-ui", "sans-serif"],
        "body-md": ["var(--font-inter)", "system-ui", "sans-serif"],
        "meta-code": ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-xl": [
          "7.5rem", // 120px
          { lineHeight: "110%", letterSpacing: "-0.04em", fontWeight: "400" },
        ],
        "display-xl-mobile": [
          "4rem", // 64px
          { lineHeight: "110%", letterSpacing: "-0.02em", fontWeight: "400" },
        ],
        "headline-lg": [
          "3rem", // 48px
          { lineHeight: "120%", fontWeight: "400" },
        ],
        "headline-md": [
          "2rem", // 32px
          { lineHeight: "120%", fontWeight: "400" },
        ],
        "body-lg": [
          "1.25rem", // 20px
          { lineHeight: "160%", fontWeight: "400" },
        ],
        "body-md": [
          "1rem", // 16px
          { lineHeight: "160%", fontWeight: "400" },
        ],
        "meta-code": [
          "0.75rem", // 12px
          { lineHeight: "140%", letterSpacing: "0.05em", fontWeight: "500" },
        ],
      },
      spacing: {
        base: "8px", // unidad base de ritmo vertical
        gutter: "24px", // gutter del grid
        "margin-edge": "48px", // margen de borde del viewport
        "section-gap": "160px", // separación entre "monumentos"
        "grid-line-weight": "1px", // grosor de línea de grid
      },
      borderRadius: {
        // Lenguaje de forma: SHARP. 0px en todo (brutalismo).
        none: "0",
        DEFAULT: "0",
        sm: "0",
        md: "0",
        lg: "0",
        xl: "0",
        "2xl": "0",
        "3xl": "0",
        full: "0",
      },
      boxShadow: {
        // Sistema estrictamente plano: sin sombras.
        none: "none",
        DEFAULT: "none",
        sm: "none",
        md: "none",
        lg: "none",
        xl: "none",
        "2xl": "none",
        inner: "none",
      },
      gridTemplateColumns: {
        // 12 col desktop / 4 col mobile (mobile-first)
        "12": "repeat(12, minmax(0, 1fr))",
        "4": "repeat(4, minmax(0, 1fr))",
      },
      transitionDuration: {
        // Interacción "dura": inversión instantánea, sin easing decorativo
        "0": "0ms",
      },
    },
  },
  plugins: [],
};

export default config;
