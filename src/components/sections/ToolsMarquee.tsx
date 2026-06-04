/* eslint-disable @next/next/no-img-element */
import { InfiniteMarquee } from "@/components/ui/InfiniteMarquee";

interface Tool {
  name: string;
  src: string;
}

/**
 * TODO: edita esta lista cuando agregues / quites herramientas.
 * Cualquier SVG en /public/logos/ se renderiza monocromo (filter:brightness(0))
 * para mantener el lenguaje brutalista blanco/negro del sitio.
 */
const tools: Tool[] = [
  { name: "Figma", src: "/logos/figma.svg" },
  { name: "Miro", src: "/logos/miro.svg" },
  { name: "Claude", src: "/logos/claude.svg" },
  { name: "Affinity", src: "/logos/affinity.svg" },
  { name: "Claude (wordmark)", src: "/logos/claude-wordmark.svg" },
];

/**
 * TOOLS MARQUEE — banda infinita con los logos de las herramientas
 * que usa Diego. Se renderiza entre el Hero y la sección Proyectos.
 *
 *  · CSS-only (componente InfiniteMarquee), sin JS de scroll.
 *  · Logos en `<img>` (los SVGs son vectoriales — no necesitan
 *    next/image, que además requeriría `dangerouslyAllowSVG`).
 *  · Filtro `brightness(0)` → todos los logos en negro puro, lenguaje
 *    monocromo del design system. Si querés mantener los colores de
 *    marca, eliminá el style en línea.
 *  · pauseOnHover: la cinta se detiene al hover para inspeccionar
 *    cada logo.
 *  · prefers-reduced-motion: reduce → la animación se desactiva
 *    (definido en globals.css).
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

      <div className="py-12 md:py-16">
        <InfiniteMarquee speed={35} pauseOnHover>
          {tools.map((tool) => (
            <img
              key={tool.name}
              src={tool.src}
              alt={tool.name}
              className="h-12 w-auto shrink-0 select-none md:h-16"
              style={{ filter: "brightness(0)" }}
              draggable={false}
            />
          ))}
        </InfiniteMarquee>
      </div>
    </section>
  );
}
