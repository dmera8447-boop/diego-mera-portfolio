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
 * TOOLS MARQUEE — banda infinita con los logos de las herramientas
 * que usa Diego, entre el Hero y la sección Proyectos.
 *
 *  · Animación CSS pura, sin JS de scroll.
 *  · Logos en colores de marca originales (sin filtro).
 *  · Loop continuo sin pausa, gap reducido para que se vean "de corrido".
 *  · prefers-reduced-motion: reduce → animación pausada.
 */
export function ToolsMarquee() {
  return (
    <section
      aria-labelledby="tools-title"
      className="relative z-10 border-y-2 border-border-dark bg-background"
    >
      <div className="border-b border-accent-gray px-margin-edge py-6">
        <p className="font-meta-code text-meta-code uppercase text-meta-text">
          {"// HERRAMIENTAS"}
        </p>
        <h2 id="tools-title" className="sr-only">
          Herramientas que uso
        </h2>
      </div>

      <div className="py-10 md:py-14">
        <InfiniteMarquee speed={30}>
          {tools.map((tool) => (
            <img
              key={tool.name}
              src={tool.src}
              alt={tool.name}
              className="h-12 w-auto shrink-0 select-none md:h-16"
              draggable={false}
            />
          ))}
        </InfiniteMarquee>
      </div>
    </section>
  );
}
