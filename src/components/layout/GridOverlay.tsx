/**
 * GridOverlay — marco estructural persistente del viewport.
 * Reglas verticales 1px en accent-gray (margin-edge a cada lado).
 * Réplica exacta del overlay del diseño de Stitch. Decorativo → aria-hidden.
 */
export function GridOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 mx-margin-edge border-x border-accent-gray"
    />
  );
}
