"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Retardo escalonado (s) para secuenciar elementos en una grilla. */
  delay?: number;
  /** Fracción del elemento visible para disparar (0..1). Default 0.15. */
  amount?: number;
  /** Si true, anima al montar sin observar viewport (ideal above-the-fold). */
  immediate?: boolean;
}

/**
 * Entrada quirúrgica: fade-in + slide-up al entrar al viewport.
 *  · IntersectionObserver nativo (sin deps).
 *  · Una sola vez por elemento (no se invierte al salir).
 *  · prefers-reduced-motion lo desactiva (contenido visible al instante).
 *  · El layout se mantiene desde SSR — opacity no afecta dimensiones.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  amount = 0.15,
  immediate = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce || immediate) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: amount, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [amount, immediate]);

  const style: CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? "none" : "translateY(24px)",
    transition:
      "opacity 700ms cubic-bezier(0.22, 1, 0.36, 1), transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
    transitionDelay: visible ? `${delay}s` : "0s",
    willChange: visible ? "auto" : "opacity, transform",
  };

  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
}
