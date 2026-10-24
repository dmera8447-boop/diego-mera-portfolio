"use client";

import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { bookHref } from "@/lib/links";
import { whatsappHref } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";

interface MobileCallBarProps {
  lang: Locale;
  t: Dictionary;
}

/**
 * Barra fija inferior en móvil: la acción principal siempre a un pulgar.
 * No aparece en /contact, donde la agenda ya está en pantalla.
 */
export function MobileCallBar({ lang, t }: MobileCallBarProps) {
  const pathname = usePathname() ?? "/";
  if (/\/contact$/.test(pathname)) return null;

  return (
    <div className="bg-bg px-edge fixed inset-x-0 bottom-0 z-30 flex gap-2 pt-3 pb-[max(16px,env(safe-area-inset-bottom))] md:hidden">
      <ButtonLink href={bookHref(lang)} className="flex-1">
        {t.nav.book}
      </ButtonLink>
      <ButtonLink
        href={whatsappHref(t.common.whatsappHello)}
        variant="ink"
        className="bg-tone text-ink hover:bg-tone-2"
      >
        {t.common.whatsappShort}
      </ButtonLink>
    </div>
  );
}
