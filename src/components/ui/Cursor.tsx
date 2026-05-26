"use client";

import { useEffect, useRef, useState } from "react";

/**
 * CURSOR — puntero custom para desktop.
 *
 *  · Anillo 32px + punto 3px en el centro.
 *  · Sigue al mouse con lerp (~18%/frame) → trailing fluido.
 *  · `mix-blend-mode: difference` + color blanco → renderiza NEGRO sobre
 *    fondos claros e INVERTIDO sobre fondos oscuros, garantiza contraste
 *    siempre y no destruye la legibilidad del texto.
 *  · Solo en dispositivos con mouse (hover: hover + pointer: fine).
 *    Mobile / touch nunca lo monta — usa el cursor nativo del SO.
 *  · `prefers-reduced-motion: reduce` → no se monta.
 *  · Hover sobre interactivos (a, button, input, [data-cursor-hover]) →
 *    el anillo escala 1.6× con transición de 200ms.
 *  · Esconde el cursor nativo solo mientras está activo
 *    (body.cursor-active en globals.css).
 */
export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const hasMouse = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!hasMouse || reduce) return;

    setActive(true);
    document.body.classList.add("cursor-active");

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { x: target.x, y: target.y };
    let raf = 0;
    let started = false;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!started) {
        // Primera entrada del mouse: snap a la posición real (sin trail)
        current.x = target.x;
        current.y = target.y;
        started = true;
        if (ringRef.current) ringRef.current.style.opacity = "1";
      }
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as Element | null;
      if (!el) return;
      const interactive = !!el.closest(
        "a, button, input, textarea, select, [role='button'], [data-cursor-hover]",
      );
      setHovering(interactive);
    };

    const onLeave = () => {
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };
    const onEnter = () => {
      if (ringRef.current && started) ringRef.current.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    const tick = () => {
      const lerp = 0.18;
      current.x += (target.x - current.x) * lerp;
      current.y += (target.y - current.y) * lerp;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.body.classList.remove("cursor-active");
    };
  }, []);

  if (!active) return null;

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] opacity-0 mix-blend-difference"
      style={{ willChange: "transform, opacity" }}
    >
      <div
        className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-white transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          width: "32px",
          height: "32px",
          transform: `translate(-50%, -50%) scale(${hovering ? 1.6 : 1})`,
        }}
      >
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          style={{ width: "3px", height: "3px" }}
        />
      </div>
    </div>
  );
}
