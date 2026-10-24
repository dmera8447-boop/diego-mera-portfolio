import Link from "next/link";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface ActionRowProps {
  href: string;
  label: string;
  value: string;
  /** La fila principal (agendar) va en el acento */
  primary?: boolean;
  className?: string;
  style?: CSSProperties;
}

/** Fila de contacto: etiqueta pequeña, valor grande y flecha. Toda la fila es el enlace. */
export function ActionRow({
  href,
  label,
  value,
  primary = false,
  className,
  style,
}: ActionRowProps) {
  const external = /^https?:/.test(href);
  const classes = cn(
    "group flex items-center justify-between gap-4 transition-colors duration-150",
    primary
      ? "bg-accent text-ink hover:bg-ink hover:text-on-ink p-5 md:p-7"
      : "bg-tone hover:bg-tone-2 px-5 py-4 md:px-7 md:py-6",
    className,
  );
  const content = (
    <>
      <span className="flex min-w-0 flex-col gap-1">
        <span className={primary ? "" : "text-soft"}>{label}</span>
        <span
          className={cn(
            "font-medium break-words",
            primary
              ? "type-lead"
              : "text-[18px] leading-[1.3] sm:text-[24px] sm:leading-[1.25]",
          )}
        >
          {value}
        </span>
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "shrink-0 transition-transform duration-200 group-hover:translate-x-1",
          primary ? "type-lead" : "type-title",
        )}
      >
        {primary ? "→" : "↗"}
      </span>
    </>
  );

  if (/^(https?:|mailto:|tel:)/.test(href)) {
    return (
      <a
        href={href}
        className={classes}
        style={style}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} style={style}>
      {content}
    </Link>
  );
}
