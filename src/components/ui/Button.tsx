import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ink" | "link" | "linkInverse";

const variants: Record<Variant, string> = {
  // Acción principal: un solo acento, siempre con texto en tinta
  primary:
    "min-h-12 bg-accent px-6 py-3 text-ink hover:bg-ink hover:text-on-ink",
  ink: "min-h-12 bg-ink px-6 py-3 text-on-ink hover:bg-ink-2",
  link: "min-h-11 underline decoration-1 underline-offset-[5px] hover:decoration-2",
  linkInverse:
    "min-h-11 text-on-ink underline decoration-1 underline-offset-[5px] hover:decoration-2",
};

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  ariaLabel?: string;
}

/**
 * Enlace con forma de botón. Rutas internas usan next/link; http, mailto y
 * WhatsApp abren con <a> (los externos en pestaña nueva).
 */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  ariaLabel,
}: ButtonLinkProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 font-medium transition-[background-color,color,text-decoration-thickness,transform] duration-150 active:translate-y-px",
    variants[variant],
    className,
  );

  if (/^(https?:|mailto:|tel:)/.test(href)) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
