"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { InView } from "@/components/ui/InView";

/**
 * Bloque de nombre en tinta + bloque de cita. Uno a la vez, con Anterior /
 * Siguiente. La home solo lo monta cuando hay testimonios reales.
 */
export function Testimonials({ t }: { t: Dictionary["home"]["testimonials"] }) {
  const [index, setIndex] = useState(0);
  const items = t.items;
  const item = items[index];
  if (!item) return null;
  const go = (step: number) =>
    setIndex((i) => (i + step + items.length) % items.length);

  return (
    <section
      aria-labelledby="testimonials-title"
      className="px-edge pt-section"
    >
      <InView>
        <h2 id="testimonials-title" className="type-h2 reveal">
          {t.title}
        </h2>
        <figure className="reveal mt-8 grid md:mt-12 md:min-h-[520px] md:grid-cols-12">
          <blockquote className="bg-tone flex flex-col justify-between gap-12 p-6 md:order-2 md:col-span-7 md:p-12">
            <p className="type-lead max-w-[24ch]">“{item.quote}”</p>
            {items.length > 1 ? (
              <div className="flex items-center justify-between">
                <span className="text-soft tabular-nums">
                  {index + 1} {t.of} {items.length}
                </span>
                <span className="flex gap-6">
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    className="min-h-11 underline underline-offset-[5px]"
                  >
                    {t.prev}
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    className="min-h-11 underline underline-offset-[5px]"
                  >
                    {t.next} →
                  </button>
                </span>
              </div>
            ) : null}
          </blockquote>
          <figcaption className="bg-ink text-on-ink flex flex-col justify-end gap-1 p-6 md:order-1 md:col-span-5 md:p-8">
            <span className="type-title font-medium">{item.name}</span>
            <span className="text-on-ink-soft">{item.role}</span>
          </figcaption>
        </figure>
      </InView>
    </section>
  );
}
