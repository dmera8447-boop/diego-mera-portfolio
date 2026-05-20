import { type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Retardo escalonado (s) para secuenciar elementos. */
  delay?: number;
}

/**
 * Entrada quirúrgica: fade-in + slide-up sutil al cargar (CSS puro).
 *  · `prefers-reduced-motion` lo desactiva (vía media query en globals.css).
 *  · `forwards` mantiene el estado final aunque la animación se pause
 *    (ej. pestaña en background) — el contenido siempre acaba visible.
 *  · Server-renderable: no requiere JS para ejecutarse.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const style: CSSProperties | undefined =
    delay > 0 ? { animationDelay: `${delay}s` } : undefined;

  return (
    <div className={cn("animate-reveal", className)} style={style}>
      {children}
    </div>
  );
}
