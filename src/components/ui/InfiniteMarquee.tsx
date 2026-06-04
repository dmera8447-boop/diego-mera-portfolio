import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface InfiniteMarqueeProps {
  children: ReactNode;
  /** Segundos para una vuelta completa. Default 30s. */
  speed?: number;
  /** Pausar la animación al hover. */
  pauseOnHover?: boolean;
  /** Dirección del scroll. Default left. */
  direction?: "left" | "right";
  className?: string;
}

/**
 * Marquee infinito por CSS puro — sin dependencias, sin JS.
 *
 *  · Renderiza el contenido DOS veces. Cuando la primera copia hace
 *    translateX(-100%), la segunda copia rellena el espacio →
 *    loop visualmente continuo.
 *  · `aria-hidden` en la 2ª copia (lector de pantalla no lo duplica).
 *  · `prefers-reduced-motion: reduce` pausa la animación (definido
 *    en globals.css como variante de la animación `marquee`).
 */
export function InfiniteMarquee({
  children,
  speed = 30,
  pauseOnHover = false,
  direction = "left",
  className,
}: InfiniteMarqueeProps) {
  const animationClass =
    direction === "left" ? "animate-marquee" : "animate-marquee-reverse";

  return (
    <div
      className={cn(
        "group relative flex w-full overflow-hidden",
        className,
      )}
    >
      <div
        className={cn(
          "flex shrink-0 items-center gap-6 pr-6 md:gap-10 md:pr-10",
          animationClass,
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className={cn(
          "flex shrink-0 items-center gap-6 pr-6 md:gap-10 md:pr-10",
          animationClass,
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
      </div>
    </div>
  );
}
