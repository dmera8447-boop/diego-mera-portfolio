import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { navItems } from "@/lib/links";
import { mailtoHref, siteConfig, whatsappHref } from "@/lib/site";
import { LangSwitch } from "./LangSwitch";

interface SiteFooterProps {
  lang: Locale;
  t: Dictionary;
}

/** Cierre en tinta: enlaces arriba y el nombre a todo el ancho, recortado abajo. */
export function SiteFooter({ lang, t }: SiteFooterProps) {
  const year = new Date().getFullYear();
  const linkClass =
    "inline-flex min-h-9 items-center underline-offset-[5px] hover:underline";

  return (
    <footer className="bg-ink text-on-ink">
      <div className="px-edge grid grid-cols-2 gap-x-5 gap-y-10 pt-16 md:grid-cols-4 md:gap-8 md:pt-24">
        <nav aria-label="Pie de página">
          <ul className="flex flex-col">
            {navItems(lang).map((item) => (
              <li key={item.key}>
                <Link href={item.href} className={linkClass}>
                  {t.nav[item.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="flex flex-col">
          <li>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a href={mailtoHref(t.common.mailSubject)} className={linkClass}>
              Email
            </a>
          </li>
          <li>
            <a
              href={whatsappHref(t.common.whatsappHello)}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              WhatsApp
            </a>
          </li>
        </ul>
        <p className="text-on-ink-soft col-span-2 md:col-span-1">
          © {year} {t.footer.rights}
          <br />
          {t.footer.made}
        </p>
        <div className="col-span-2 flex items-start justify-between md:col-span-1 md:flex-col md:items-end md:gap-1">
          <LangSwitch lang={lang} label={t.nav.switchLabel} inverse />
          <a href="#top" className={linkClass + " underline"}>
            {t.footer.backTop} ↑
          </a>
        </div>
      </div>

      {/* El nombre vuelve a todo el ancho; el recorte inferior cierra la página */}
      <div aria-hidden="true" className="px-edge mt-16 md:mt-[120px]">
        {/* Alto = 74% del cuerpo del nombre → recorta la base de las letras */}
        <div className="name-fit aspect-[1/0.1529] overflow-hidden">
          <p className="type-name">Diego Mera</p>
        </div>
      </div>
    </footer>
  );
}
