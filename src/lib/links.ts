import { localePath, type Locale } from "@/i18n/config";
import { siteConfig } from "@/lib/site";

/** Destino del CTA "Agendar llamada": link de agenda o el planificador. */
export function bookHref(lang: Locale): string {
  return siteConfig.bookingUrl || `${localePath(lang, "/contact")}#agenda`;
}

export function navItems(lang: Locale) {
  return [
    { key: "work", href: `${localePath(lang, "/")}#trabajo` },
    { key: "about", href: localePath(lang, "/about") },
    { key: "process", href: `${localePath(lang, "/")}#proceso` },
    { key: "contact", href: localePath(lang, "/contact") },
  ] as const;
}

/** URL equivalente en el otro idioma para el selector ES / EN. */
export function alternatePath(pathname: string, target: Locale): string {
  const bare = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  return localePath(target, bare);
}
