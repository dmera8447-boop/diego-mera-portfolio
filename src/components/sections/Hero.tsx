import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

/**
 * HERO — réplica del Portfolio Home de Stitch.
 * Composición asimétrica: titular display-xl alineado a la derecha +
 * propuesta de valor con borde superior + dos CTAs + afordancia de scroll.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="grid grid-cols-4 gap-gutter px-margin-edge pb-section-gap pt-section-gap md:grid-cols-12"
    >
      <Reveal immediate className="col-span-4 md:col-span-10 md:col-start-2">
        <h1
          id="hero-title"
          className="break-words text-right font-display-xl-mobile text-display-xl-mobile uppercase text-primary md:font-display-xl md:text-display-xl"
        >
          Diego Andrés
          <br />
          Mera Rojas.
        </h1>
      </Reveal>

      <Reveal
        immediate
        delay={0.15}
        className="col-span-4 mt-12 text-right md:col-span-5 md:col-start-8"
      >
        <p className="font-meta-code text-meta-code uppercase text-meta-text">
          {"// DISEÑADOR UX/UI"}
        </p>
        <p className="mt-4 border-t border-accent-gray pt-4 font-body-lg text-body-lg text-secondary">
          Diseño experiencias digitales donde las necesidades del usuario y los
          objetivos del negocio se encuentran.
        </p>
        <p className="mt-4 font-body-md text-body-md text-secondary">
          Especializado en productos B2B, dashboards y aplicaciones móviles.
          Más de 15 proyectos entregados en Ecuador, combinando investigación
          de usuarios, Design Systems y prototipado en Figma para crear
          soluciones que funcionan de verdad.
        </p>

        <div className="mt-8 flex flex-col items-end gap-3">
          <div className="flex flex-wrap justify-end gap-3">
            <Link
              href="/#contacto"
              className="inline-block border-2 border-primary bg-primary px-6 py-3 font-meta-code text-meta-code uppercase text-on-primary transition-none hover:bg-surface hover:text-primary"
            >
              Contáctame →
            </Link>
            <Link
              href="/#proyectos"
              className="inline-block border-2 border-primary px-6 py-3 font-meta-code text-meta-code uppercase text-primary transition-none hover:bg-primary hover:text-on-primary"
            >
              Ver proyectos
            </Link>
          </div>
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
