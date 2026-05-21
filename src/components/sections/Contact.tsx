import { ContactForm } from "@/components/sections/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/lib/site";

/**
 * CONTACTO — réplica de la pantalla Contact & Connect de Stitch.
 * Estructura: titular display-xl con borde inferior 2px + grid 8/4
 * (formulario / detalles directos).
 *
 * Cambios respecto a Stitch:
 *  · Copy en español; datos reales de Diego.
 *  · Se añade campo "Asunto" (Stitch tenía 3 campos; tu brief pidió 4).
 *  · Se omite el bloque "PRESENCE" (4 cards de redes ficticias) — solo
 *    tienes LinkedIn + email, ya presentes en el bloque DIRECTO y el footer.
 */
export function Contact() {
  return (
    <section
      id="contacto"
      aria-labelledby="contacto-title"
      className="px-margin-edge pb-section-gap pt-section-gap"
    >
      {/* Título + subtítulo */}
      <Reveal className="mb-section-gap w-full">
        <h2
          id="contacto-title"
          className="break-words border-b-2 border-primary pb-gutter text-left font-display-xl-mobile text-display-xl-mobile uppercase text-primary md:font-display-xl md:text-display-xl"
        >
          ¿Tienes un proyecto
          <br />
          en mente?
        </h2>
        <p className="mt-8 max-w-2xl font-body-lg text-body-lg text-secondary">
          Estoy disponible para posiciones full-time y proyectos freelance.
          Hablemos.
        </p>
      </Reveal>

      {/* Grid: form 8 col · directos 4 col */}
      <div className="relative grid grid-cols-1 gap-0 border-y border-accent-gray md:grid-cols-12">
        {/* Formulario */}
        <Reveal className="relative z-10 col-span-1 border-b border-accent-gray pb-margin-edge md:col-span-8 md:border-b-0 md:border-r md:pb-0 md:pr-margin-edge">
          <ContactForm />
        </Reveal>

        {/* Detalles directos */}
        <Reveal
          delay={0.1}
          className="relative z-10 col-span-1 pt-margin-edge md:col-span-4 md:pl-margin-edge md:pt-margin-edge"
        >
          <div className="flex h-full flex-col">
            <h3 className="mb-base inline-block border-b border-accent-gray pb-1 self-start font-meta-code text-meta-code uppercase text-meta-text">
              {"// DIRECTO"}
            </h3>
            <ul className="mt-4 space-y-base">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="-ml-1 inline-block p-1 font-body-lg text-body-lg text-primary transition-none hover:bg-primary hover:text-on-primary"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/diegomerarojas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="-ml-1 inline-block p-1 font-body-lg text-body-lg text-primary transition-none hover:bg-primary hover:text-on-primary"
                >
                  linkedin.com/in/diegomerarojas ↗
                </a>
              </li>
            </ul>

            <p className="mt-margin-edge font-meta-code text-meta-code uppercase text-meta-text">
              {siteConfig.location}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
