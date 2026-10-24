import type { CSSProperties } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { InView } from "@/components/ui/InView";
import { cn } from "@/lib/utils";

// Un color plano por etapa; el acento marca la etapa más larga (diseñar)
const STAGE_COLORS = [
  "bg-ink text-on-ink",
  "bg-ink-2 text-on-ink",
  "bg-accent text-ink",
  "bg-tone-2 text-ink",
  "bg-tone text-ink",
] as const;

/**
 * El proceso como una sola barra: el ancho de cada etapa sigue lo que dura
 * de verdad. En móvil la barra se vuelve vertical y conserva las proporciones.
 */
export function ProcessBar({ t }: { t: Dictionary["home"]["process"] }) {
  return (
    <section
      id="proceso"
      aria-labelledby="process-title"
      className="px-edge pt-section"
    >
      <InView amount={0.3}>
        <h2 id="process-title" className="type-h2 reveal">
          {t.title}
        </h2>
        <ol className="mt-10 flex flex-col gap-1.5 md:mt-14 md:flex-row">
          {t.stages.map((stage, i) => (
            <li
              key={stage.name}
              className="flex min-w-0 flex-col"
              style={{ flexGrow: stage.weight, flexBasis: 0 }}
            >
              <div
                className={cn(
                  "clip-reveal flex min-h-[max(96px,calc(var(--w)*5px))] flex-col justify-between p-4 md:h-[200px] md:min-h-0 md:p-5",
                  STAGE_COLORS[i % STAGE_COLORS.length],
                )}
                style={{ "--i": i, "--w": stage.weight } as CSSProperties}
              >
                <div className="flex items-baseline justify-between gap-3 md:flex-col md:gap-1">
                  <span className="type-title font-medium">{stage.name}</span>
                  <span>{stage.duration}</span>
                </div>
                <p className="mt-3 md:hidden">{stage.desc}</p>
              </div>
              <p
                className="reveal mt-4 hidden pr-4 md:block"
                style={{ "--i": i + 2 } as CSSProperties}
              >
                {stage.desc}
              </p>
            </li>
          ))}
        </ol>
      </InView>
    </section>
  );
}
