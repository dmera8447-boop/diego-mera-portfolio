"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { bookHref, navItems } from "@/lib/links";
import { whatsappHref } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { LogoMark } from "@/components/brand/LogoMark";
import { LangSwitch } from "./LangSwitch";
import { cn } from "@/lib/utils";

interface SiteNavProps {
  lang: Locale;
  t: Dictionary["nav"];
  common: Dictionary["common"];
}

/**
 * Barra plana: marca, cuatro enlaces, ES / EN y la acción principal.
 * En móvil, "Menú" abre un panel a pantalla completa (sin hamburguesa).
 */
export function SiteNav({ lang, t, common }: SiteNavProps) {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const items = navItems(lang);

  // Cierra el panel al navegar y con Escape; bloquea el scroll mientras está abierto.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isCurrent = (href: string) => !href.includes("#") && href === pathname;

  return (
    <header className="bg-bg sticky top-0 z-40">
      <div className="px-edge flex h-[var(--nav-h)] items-center justify-between gap-6">
        <Link
          href={localePath(lang, "/")}
          aria-label={t.home}
          className="flex items-center gap-2.5"
        >
          <LogoMark className="h-8 w-8" />
          <span className="font-medium">Diego Mera</span>
        </Link>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {items.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  className={cn(
                    "inline-flex min-h-11 items-center underline-offset-[5px] hover:underline",
                    isCurrent(item.href) && "font-medium underline",
                  )}
                >
                  {t[item.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-7 md:flex">
          <LangSwitch lang={lang} label={t.switchLabel} />
          <ButtonLink href={bookHref(lang)}>{t.book}</ButtonLink>
        </div>

        <div className="flex items-center gap-5 md:hidden">
          <LangSwitch lang={lang} label={t.switchLabel} mode="short" />
          <button
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex min-h-11 items-center font-medium underline underline-offset-[5px]"
          >
            {open ? t.close : t.menu}
          </button>
        </div>
      </div>

      <div
        id={panelId}
        hidden={!open}
        className="bg-bg px-edge fixed inset-x-0 top-[var(--nav-h)] bottom-0 z-40 overflow-y-auto pt-6 pb-10 md:hidden"
      >
        <nav aria-label="Principal">
          <ul className="flex flex-col gap-2">
            {items.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  className="type-h2 block py-2 font-medium"
                >
                  {t[item.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-10 flex flex-col items-center gap-3">
          <ButtonLink href={bookHref(lang)} className="w-full">
            {common.bookCall}
          </ButtonLink>
          <ButtonLink href={whatsappHref(common.whatsappHello)} variant="link">
            {common.whatsapp}
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
