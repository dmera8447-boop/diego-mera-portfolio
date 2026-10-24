/**
 * Datos globales del sitio (independientes del idioma).
 * Los textos traducibles viven en src/i18n/dictionaries.ts.
 */
export const siteConfig = {
  name: "Diego Mera",
  fullName: "Diego Andrés Mera Rojas",
  // Dominio actual de Vercel. Cuando configures un dominio custom
  // (p.ej. diegomera.com), reemplaza este valor y haz push.
  url: "https://diego-mera-portfolio.vercel.app",
  location: "Samborondón, Ecuador",
  timeZone: "America/Guayaquil",
  email: "diego.mera2002@hotmail.com",
  phoneDisplay: "+593 99 335 7160",
  whatsapp: "593993357160",
  linkedin: "https://linkedin.com/in/diegomerarojas",
  linkedinDisplay: "linkedin.com/in/diegomerarojas",
  /**
   * Link de agenda (Cal.com o Calendly). Vacío = el planificador de
   * /contact arma un mensaje de WhatsApp con el día y la hora elegidos.
   */
  bookingUrl: "",
} as const;

export function whatsappHref(text?: string): string {
  const base = `https://wa.me/${siteConfig.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function mailtoHref(subject?: string, body?: string): string {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const qs = params.toString().replace(/\+/g, "%20");
  return `mailto:${siteConfig.email}${qs ? `?${qs}` : ""}`;
}
