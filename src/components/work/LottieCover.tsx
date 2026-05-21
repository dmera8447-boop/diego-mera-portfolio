"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import type { LottieRefCurrentProps } from "lottie-react";
import { cn } from "@/lib/utils";

// Dynamic import — el runtime de lottie-react (~60KB) solo se descarga
// cuando una card monta el componente (lazy chunk).
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

interface LottieCoverProps {
  /** Path al JSON Lottie en /public/lottie/[slug].json */
  src: string;
  /** PNG estático que se muestra mientras carga / si reduced-motion */
  fallback: string;
  /** Texto alternativo de la imagen estática (a11y) */
  alt?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

/**
 * Cubierta animada para project cards:
 *  · Muestra el PNG estático hasta que el JSON Lottie esté cargado.
 *  · Lazy-load del runtime de lottie-react (dynamic import).
 *  · Solo descarga el JSON cuando la card entra al viewport (IntersectionObserver).
 *  · Pausa la animación cuando sale del viewport (ahorro de CPU).
 *  · prefers-reduced-motion: reduce → nunca carga Lottie, solo PNG.
 *  · Mantiene el tratamiento brutalista (grayscale por defecto, color en hover).
 */
export function LottieCover({
  src,
  fallback,
  alt = "",
  sizes,
  priority = false,
  className,
}: LottieCoverProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [data, setData] = useState<object | null>(null);
  const [inView, setInView] = useState(false);
  const [reduce, setReduce] = useState(true);

  // Detecta prefers-reduced-motion (no autoplay si está activo)
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mql.matches);
    const onChange = () => setReduce(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // Observa el viewport
  useEffect(() => {
    if (reduce) return;
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) setInView(entry.isIntersecting);
      },
      { threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduce]);

  // Descarga el JSON Lottie sólo cuando la card entra en viewport (1ª vez)
  useEffect(() => {
    if (reduce || !inView || data) return;
    let cancelled = false;
    fetch(src)
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (!cancelled && json) setData(json);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [inView, data, src, reduce]);

  // Pausa/reproduce según visibilidad (ahorra CPU al hacer scroll)
  useEffect(() => {
    const player = lottieRef.current;
    if (!player) return;
    if (inView) player.play();
    else player.pause();
  }, [inView, data]);

  const showLottie = !!data && !reduce;

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 h-full w-full", className)}
    >
      {/* PNG estático: visible como reduced-motion fallback y mientras carga el Lottie */}
      <Image
        src={fallback}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-0",
          showLottie && "opacity-0",
        )}
      />

      {/* Lottie animado: a color, contenido completo (meet → no crop), con respiro interno */}
      {showLottie && (
        <div
          aria-hidden="true"
          className="absolute inset-0 h-full w-full p-4 md:p-6"
        >
          <Lottie
            lottieRef={lottieRef}
            animationData={data}
            loop
            autoplay
            className="h-full w-full"
            rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
          />
        </div>
      )}
    </div>
  );
}
