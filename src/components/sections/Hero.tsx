import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

/**
 * HERO — réplica del "Portfolio Home" de Stitch.
 * Composición asimétrica: titular display-xl alineado a la derecha +
 * propuesta de valor con borde superior + afordancia de scroll.
 *
 * Stitch NO incluye foto ni botón CTA en el hero (la "color" la aportan
 * las imágenes de proyecto). Se mantiene fiel: sin foto; el CTA es la
 * afordancia textual de scroll, convertida en enlace accesible a #work.
 *
 * Contenido en placeholders claros — reemplazar antes de publicar.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="grid grid-cols-4 gap-gutter px-margin-edge pb-section-gap pt-section-gap md:grid-cols-12"
    >
      <Reveal className="col-span-4 md:col-span-10 md:col-start-2">
        {/* TODO: contenido final — titular principal.
            Original Stitch (ref. layout): "UX STRATEGY & DESIGN" */}
        <h1
          id="hero-title"
          className="break-words text-right font-display-xl-mobile text-display-xl-mobile uppercase text-primary md:font-display-xl md:text-display-xl"
        >
          [TÍTULO PRINCIPAL
          <br />
          PENDIENTE]
        </h1>
      </Reveal>

      <Reveal
        delay={0.1}
        className="col-span-4 mt-12 text-right md:col-span-4 md:col-start-9"
      >
        {/* TODO: contenido final — propuesta de valor (1–2 frases).
            Original Stitch (ref.): "Architecting digital experiences through
            structural logic, uncompromising precision, and brutalist minimalism." */}
        <p className="border-t border-accent-gray pt-4 font-body-lg text-body-lg text-secondary">
          [Propuesta de valor — pendiente de definir]
        </p>
        <div className="mt-8 flex flex-col items-end gap-4">
          <Link
            href="/#proyectos"
            className="inline-block border-2 border-primary px-6 py-3 font-meta-code text-meta-code uppercase text-primary transition-none hover:bg-primary hover:text-on-primary"
          >
            Ver proyectos →
          </Link>
          <Link
            href="/#proyectos"
            className="font-meta-code text-meta-code uppercase text-secondary transition-none hover:text-primary"
            aria-label="Desplázate para explorar los proyectos"
          >
            Desplázate para explorar ↓
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
