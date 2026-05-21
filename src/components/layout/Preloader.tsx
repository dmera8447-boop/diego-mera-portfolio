/**
 * PRELOADER — pantalla blanca con logotipo "DIEGO_MERA" en el centro
 * que hace fade-out al cargar la página.
 *
 * Implementación CSS pura (sin JS) — funciona incluso con JS deshabilitado:
 *  · Auto-corre la animación al primer render.
 *  · `forwards` deja el estado final (oculto, sin layout, sin clicks).
 *  · `prefers-reduced-motion: reduce` lo oculta al instante.
 *  · aria-hidden → lectores de pantalla saltan al contenido.
 *
 * Solo se muestra en cargas completas (hard refresh / primer visit).
 * Las navegaciones internas vía RSC no remontan el layout → no reaparece.
 */
export function Preloader() {
  return (
    <div className="preloader" aria-hidden="true">
      <span className="preloader__logo font-display-xl-mobile text-display-xl-mobile uppercase tracking-tighter text-primary md:font-display-xl md:text-display-xl">
        DIEGO_MERA
      </span>
    </div>
  );
}
