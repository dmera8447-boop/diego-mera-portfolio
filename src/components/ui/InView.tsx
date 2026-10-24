"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface InViewProps {
  children: ReactNode;
  className?: string;
  /** Fracción visible para disparar (0..1). */
  amount?: number;
}

/**
 * Marca su contenedor con data-inview la primera vez que entra al viewport.
 * Las animaciones viven en CSS (.reveal, .clip-reveal), así el contenido es
 * visible sin JavaScript y con prefers-reduced-motion.
 */
export function InView({ children, className, amount = 0.2 }: InViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    // Lo que ya está en pantalla al montar no se esconde.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
      setInView(true);
    }
    setArmed(true);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        }
      },
      { threshold: amount, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [amount]);

  return (
    <div
      ref={ref}
      className={className}
      data-armed={armed || undefined}
      data-inview={inView || undefined}
    >
      {children}
    </div>
  );
}
