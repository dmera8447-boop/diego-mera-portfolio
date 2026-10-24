"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { CaseStudyMeta } from "@/lib/content";
import { InView } from "@/components/ui/InView";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { cn } from "@/lib/utils";

type LedgerStudy = Pick<
  CaseStudyMeta,
  | "slug"
  | "shortTitle"
  | "kind"
  | "year"
  | "description"
  | "lottie"
  | "cover"
  | "coverReady"
>;

interface WorkLedgerProps {
  lang: Locale;
  t: Dictionary;
  studies: LedgerStudy[];
}

/**
 * Lista de casos: nombre, tipo de trabajo y año en tres columnas fijas.
 * Al pasar el cursor (o el foco) por una fila, las demás se atenúan y la
 * vista previa de la derecha muestra ese caso. En móvil, los tres primeros
 * casos llevan su imagen encima.
 */
export function WorkLedger({ lang, t, studies }: WorkLedgerProps) {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const current = studies[active];

  return (
    <section
      id="trabajo"
      aria-labelledby="work-title"
      className="px-edge pt-section"
    >
      <InView>
        <h2 id="work-title" className="type-h2 reveal">
          {t.home.work.title}
        </h2>

        <div className="mt-8 md:mt-12 md:grid md:grid-cols-12 md:gap-8">
          <ul
            className="flex flex-col gap-8 md:col-span-8 md:gap-0"
            onMouseLeave={() => setHovering(false)}
          >
            {studies.map((study, i) => {
              const dim = hovering && i !== active;
              return (
                <li
                  key={study.slug}
                  className="reveal"
                  style={{ "--i": Math.min(i + 1, 4) } as CSSProperties}
                >
                  {i < 3 ? (
                    <MediaSlot
                      label={study.shortTitle}
                      note={t.common.imagePending}
                      lottie={study.lottie}
                      image={study.cover}
                      ready={study.coverReady}
                      sizes="100vw"
                      className="mb-3 aspect-[16/10] md:hidden"
                    />
                  ) : null}
                  <Link
                    href={localePath(lang, `/projects/${study.slug}`)}
                    onMouseEnter={() => {
                      setActive(i);
                      setHovering(true);
                    }}
                    onFocus={() => setActive(i)}
                    className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 md:grid-cols-[1fr_300px_96px] md:items-baseline md:gap-x-6 md:py-5"
                  >
                    <span
                      className={cn(
                        "type-lead col-start-1 row-start-1 font-medium transition-colors duration-150",
                        dim && "md:text-soft",
                      )}
                    >
                      {study.shortTitle}
                    </span>
                    <span
                      className={cn(
                        "col-start-2 row-start-1 self-baseline text-right tabular-nums transition-colors duration-150 md:col-start-3",
                        dim && "md:text-soft",
                      )}
                    >
                      {study.year}
                    </span>
                    <span
                      className={cn(
                        "text-soft md:text-ink col-span-2 row-start-2 transition-colors duration-150 md:col-span-1 md:col-start-2 md:row-start-1",
                        dim && "md:text-soft",
                      )}
                    >
                      {study.kind}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden md:col-span-4 md:block">
            <div
              className="reveal sticky top-[calc(var(--nav-h)+24px)]"
              style={{ "--i": 2 } as CSSProperties}
            >
              <div className="relative aspect-[4/3]">
                {studies.map((study, i) => (
                  <div
                    key={study.slug}
                    aria-hidden={i !== active}
                    className={cn(
                      "absolute inset-0 transition-opacity duration-200",
                      i === active ? "opacity-100" : "opacity-0",
                    )}
                  >
                    <MediaSlot
                      label={study.shortTitle}
                      note={t.common.imagePending}
                      lottie={study.lottie}
                      image={study.cover}
                      ready={study.coverReady}
                      sizes="33vw"
                      className="h-full"
                    />
                  </div>
                ))}
              </div>
              {current ? (
                <p className="text-soft mt-4">{current.description}</p>
              ) : null}
            </div>
          </div>
        </div>
      </InView>
    </section>
  );
}
