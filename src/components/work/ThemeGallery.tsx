"use client";

import Image from "next/image";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

type Theme = "claro" | "oscuro";
const THEMES: Theme[] = ["claro", "oscuro"];

interface ThemeGalleryProps {
  /** Carpeta en /public, p.ej. "/case-studies/gestion-de-siniestros" */
  base: string;
  /**
   * Pantallas de móvil como "archivo:Nombre, …" (el MDX solo pasa texto):
   * cada archivo es `iphone-{archivo}-{tema}.png`.
   */
  screens: string;
  /** Captura de escritorio: archivo `{wide}-{tema}.png` */
  wide: string;
  wideAlt: string;
  /** Nombre de la galería para lectores de pantalla */
  label: string;
  lightLabel: string;
  darkLabel: string;
  note: string;
}

/**
 * Galería con dos versiones (claro y oscuro) que se alternan con pestañas.
 * Teclado: flechas izquierda/derecha, Inicio y Fin mueven entre pestañas.
 */
export function ThemeGallery({
  base,
  screens,
  wide,
  wideAlt,
  label,
  lightLabel,
  darkLabel,
  note,
}: ThemeGalleryProps) {
  const themeLabels: Record<Theme, string> = {
    claro: lightLabel,
    oscuro: darkLabel,
  };
  const shots = screens.split(",").map((pair) => {
    const [file = "", name = ""] = pair.split(":").map((v) => v.trim());
    return { file, label: name };
  });
  const [active, setActive] = useState<Theme>("claro");
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (index: number) => {
    const next = THEMES[(index + THEMES.length) % THEMES.length] ?? "claro";
    setActive(next);
    tabs.current[THEMES.indexOf(next)]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const moves: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: THEMES.length - 1,
    };
    const target = moves[e.key];
    if (target === undefined) return;
    e.preventDefault();
    select(target);
  };

  return (
    <figure className="flex flex-col gap-6">
      <div
        role="tablist"
        aria-label={label}
        className="bg-ink-2 flex self-start p-1"
      >
        {THEMES.map((theme, i) => (
          <button
            key={theme}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${id}-tab-${theme}`}
            aria-selected={active === theme}
            aria-controls={`${id}-panel-${theme}`}
            tabIndex={active === theme ? 0 : -1}
            onClick={() => setActive(theme)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={cn(
              "focus-visible:outline-on-ink min-h-11 px-5 font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2",
              active === theme
                ? "bg-on-ink text-ink"
                : "text-on-ink-soft hover:text-on-ink",
            )}
          >
            {themeLabels[theme]}
          </button>
        ))}
      </div>

      {THEMES.map((theme) => (
        <div
          key={theme}
          role="tabpanel"
          id={`${id}-panel-${theme}`}
          aria-labelledby={`${id}-tab-${theme}`}
          hidden={active !== theme}
          className="flex flex-col gap-3"
        >
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {shots.map((s) => (
              <li key={s.file} className="flex flex-col gap-3">
                <div className="bg-ink-2 px-4 py-6 sm:px-8 sm:py-10">
                  <Image
                    src={`${base}/iphone-${s.file}-${theme}.png`}
                    alt={`${s.label} · ${themeLabels[theme]}`}
                    width={858}
                    height={1760}
                    sizes="(min-width: 768px) 20vw, 45vw"
                    className="mx-auto h-auto w-full max-w-[260px]"
                  />
                </div>
                <span className="text-on-ink-soft">{s.label}</span>
              </li>
            ))}
          </ul>
          <div className="bg-ink-2 mt-3 p-4 sm:p-8 md:p-12">
            <Image
              src={`${base}/${wide}-${theme}.png`}
              alt={`${wideAlt} · ${themeLabels[theme]}`}
              width={3480}
              height={1936}
              sizes="100vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      ))}

      <figcaption className="text-on-ink-soft">{note}</figcaption>
    </figure>
  );
}
