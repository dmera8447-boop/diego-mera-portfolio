"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { alternatePath } from "@/lib/links";
import { cn } from "@/lib/utils";

interface LangSwitchProps {
  lang: Locale;
  label: string;
  /** "full" muestra ES / EN; "short" solo el idioma al que se cambia */
  mode?: "full" | "short";
  inverse?: boolean;
}

export function LangSwitch({
  lang,
  label,
  mode = "full",
  inverse = false,
}: LangSwitchProps) {
  const pathname = usePathname() ?? "/";
  const other: Locale = lang === "es" ? "en" : "es";
  const href = alternatePath(pathname, other);
  const linkClass = cn(
    "inline-flex min-h-11 items-center underline-offset-[5px] transition-colors hover:underline",
    inverse ? "text-on-ink" : "text-ink",
  );

  if (mode === "short") {
    return (
      <Link
        href={href}
        hrefLang={other}
        lang={other}
        aria-label={label}
        className={cn(linkClass, "font-medium uppercase")}
      >
        {other}
      </Link>
    );
  }

  const codes = (["es", "en"] as const).map((code) =>
    code === lang ? (
      <span key={code} aria-current="true" className="font-medium uppercase">
        {code}
      </span>
    ) : (
      <Link
        key={code}
        href={href}
        hrefLang={code}
        lang={code}
        aria-label={label}
        className={cn(linkClass, "uppercase", !inverse && "text-soft")}
      >
        {code}
      </Link>
    ),
  );

  return (
    <span className="inline-flex items-center gap-1.5">
      {codes[0]}
      <span
        aria-hidden="true"
        className={inverse ? "text-on-ink-soft" : "text-faint"}
      >
        /
      </span>
      {codes[1]}
    </span>
  );
}
