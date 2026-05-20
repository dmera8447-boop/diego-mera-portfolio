"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { navLinks, siteConfig } from "@/lib/site";

/** id de sección a partir de un href "/#id" */
function sectionId(href: string): string {
  return href.split("#")[1] ?? "";
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Scrollspy: marca el link activo según la sección visible.
  useEffect(() => {
    const ids = navLinks.map((l) => sectionId(l.href)).filter(Boolean);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  // Esc cierra el panel móvil; foco al primer link al abrir.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    firstLinkRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  const linkClass = (href: string) =>
    cn(
      "font-meta-code text-meta-code uppercase transition-none",
      activeId === sectionId(href)
        ? "text-primary underline decoration-2 underline-offset-8"
        : "text-secondary hover:text-primary",
    );

  return (
    <nav
      aria-label="Navegación principal"
      className="sticky top-0 z-50 flex w-full max-w-full items-center justify-between border-b-2 border-border-dark bg-background px-margin-edge py-base"
    >
      <Link
        href="/"
        className="font-headline-md text-headline-md tracking-tighter text-primary"
        aria-label={`${siteConfig.name} — inicio`}
      >
        DIEGO_MERA
      </Link>

      {/* Desktop */}
      <div className="hidden items-center gap-gutter md:flex">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className={linkClass(link.href)}>
            {link.label}
          </Link>
        ))}
      </div>
      <Link
        href="/#contacto"
        className="hidden border-2 border-border-dark px-4 py-2 font-meta-code text-meta-code uppercase transition-none hover:bg-primary hover:text-on-primary md:inline-block"
      >
        Contactar
      </Link>

      {/* Mobile: trigger de texto (sin hamburguesa — fiel al design system) */}
      <button
        ref={menuButtonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="border-2 border-border-dark px-2 py-1 font-meta-code text-meta-code uppercase transition-none hover:bg-primary hover:text-on-primary md:hidden"
      >
        {open ? "Cerrar" : "Menú"}
      </button>

      {/* Panel móvil */}
      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-[var(--nav-h)] z-40 flex flex-col border-b-2 border-border-dark bg-background px-margin-edge py-section-gap md:hidden"
        >
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              ref={i === 0 ? firstLinkRef : undefined}
              onClick={close}
              className={cn(
                "border-b border-accent-gray py-6 font-headline-lg text-headline-lg uppercase transition-none",
                activeId === sectionId(link.href)
                  ? "text-primary"
                  : "text-secondary hover:text-primary",
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contacto"
            onClick={close}
            className="mt-8 border-2 border-border-dark px-4 py-3 text-center font-meta-code text-meta-code uppercase transition-none hover:bg-primary hover:text-on-primary"
          >
            Contactar
          </Link>
        </div>
      )}
    </nav>
  );
}
