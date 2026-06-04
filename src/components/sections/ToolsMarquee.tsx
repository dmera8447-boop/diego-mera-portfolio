/* eslint-disable @next/next/no-img-element */
import { InfiniteMarquee } from "@/components/ui/InfiniteMarquee";

interface Tool {
  name: string;
  src: string;
}

/**
 * TODO: edita esta lista cuando agregues / quites herramientas.
 * Los SVG en /public/logos/ se renderizan en sus colores de marca
 * originales — sin filtro monocromo.
 */
const tools: Tool[] = [
  { name: "Figma", src: "/logos/figma.svg" },
  { name: "Miro", src: "/logos/miro.svg" },
  { name: "Claude", src: "/logos/claude.svg" },
  { name: "Affinity", src: "/logos/affinity.svg" },
  { name: "Canva", src: "/logos/canva.svg" },
];

/**
 * Repetimos la lista varias veces dentro de CADA copia para que el
 * ancho total del track supere cualquier viewport. Eso elimina la
 * sensación de "se queda vacío" cuando una copia termina su scroll y
 * la siguiente todavía no llegó a posición. Con 5 tools × 4 = 20
 * logos por copia, y la copia se renderiza 2 veces → 40 logos en
 * el DOM, suficientes para cubrir incluso monitores de 4K.
 */
const REPEATS = 4;
const repeatedTools: Tool[] = Array.from({ length: REPEATS }, () => tools).flat();

/**
 * TOOLS MARQUEE — banda infinita con los logos de las herramientas
 * que usa Diego, entre el Hero y la sección Proyectos.
 *
 *  · Sin bordes ni eyebrow → solo el strip de logos.
 *  · Animación CSS pura, sin JS de scroll.
 *  · Logos en colores de marca originales (sin filtro).
 *  · Loop visualmente continuo (lista duplicada 4 veces por copia).
 *  · prefers-reduced-motion: reduce → animación pausada.
 */
export function ToolsMarquee() {
  return (
    <section
      aria-labelledby="tools-title"
      className="relative z-10 bg-background py-10 md:py-14"
    >
      <h2 id="tools-title" className="sr-only">
        Herramientas que uso
      </h2>

      <InfiniteMarquee speed={30}>
        {repeatedTools.map((tool, i) => (
          <img
            key={`${tool.name}-${i}`}
            src={tool.src}
            alt={tool.name}
            className="h-12 w-auto shrink-0 select-none md:h-16"
            draggable={false}
          />
        ))}
      </InfiniteMarquee>
    </section>
  );
}
