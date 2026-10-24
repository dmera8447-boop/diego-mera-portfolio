"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { LottieRefCurrentProps } from "lottie-react";
import { cn } from "@/lib/utils";

// Dynamic import — el runtime de lottie-react (~60KB) solo se descarga
// cuando un caso con animación entra en pantalla.
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

interface LottieCoverProps {
  /** Path al JSON Lottie en /public/lottie/[slug].json */
  src: string;
  /** Descripción accesible de la animación */
  alt?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

/**
 * Animación del caso:
 *  · Descarga el JSON solo cuando entra al viewport (o de inmediato si es
 *    `priority`, p.ej. el caso destacado del hero).
 *  · Pausa cuando sale del viewport (ahorro de CPU).
 *  · prefers-reduced-motion: muestra el primer cuadro, sin reproducir.
 */
export function LottieCover({
  src,
  alt = "",
  priority = false,
  className,
}: LottieCoverProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [data, setData] = useState<object | null>(null);
  const [inView, setInView] = useState(priority);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mql.matches);
    const onChange = () => setReduce(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (!inView || data) return;
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
  }, [inView, data, src]);

  useEffect(() => {
    const player = lottieRef.current;
    if (!player) return;
    if (inView && !reduce) player.play();
    else player.pause();
  }, [inView, data, reduce]);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={alt}
      className={cn("absolute inset-0 h-full w-full", className)}
    >
      {data ? (
        <div aria-hidden="true" className="absolute inset-0">
          <Lottie
            lottieRef={lottieRef}
            animationData={data}
            loop
            autoplay={!reduce}
            className="h-full w-full"
            rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
          />
        </div>
      ) : null}
    </div>
  );
}
