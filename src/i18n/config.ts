/**
 * Idiomas del sitio. Español sin prefijo (/, /about…), inglés bajo /en.
 * El middleware reescribe las rutas sin prefijo a /es internamente.
 */
export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Ruta pública para un idioma: localePath("en", "/about") → "/en/about". */
export function localePath(lang: Locale, path = "/"): string {
  if (lang === defaultLocale) return path;
  return path === "/" ? `/${lang}` : `/${lang}${path}`;
}
