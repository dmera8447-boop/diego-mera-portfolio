import { Reveal } from "@/components/ui/Reveal";

/**
 * SOBRE MÍ — réplica de la pantalla "About & Process" de Stitch.
 * Incluye: declaración de perfil + Experiencia + Herramientas/skills.
 * (La sección "The Process" y el image-break pertenecen a la tarea
 *  "Proceso" — no se implementan aquí.)
 *
 * Jerarquía de headings (página única): h1 = Hero · h2 = Sobre mí ·
 * h3 = Experiencia/Herramientas · h4 = cargos. Sin saltos de nivel.
 *
 * Contenido en placeholders claros — reemplazar antes de publicar.
 */

// TODO: contenido final — experiencia laboral real de Diego.
const experience = [
  {
    period: "[20XX — PRESENTE]",
    company: "[EMPRESA]",
    title: "[Cargo]",
    description: "[Descripción del rol — pendiente de definir]",
  },
  {
    period: "[20XX — 20XX]",
    company: "[EMPRESA]",
    title: "[Cargo]",
    description: "[Descripción del rol — pendiente de definir]",
  },
];

// TODO: contenido final — stack real.
// Original Stitch (ref.): FIGMA / FIGJAM / PROTOPIE / WEBFLOW /
// USERTESTING.COM / MIRO / HTML / CSS / NOTION
const tools = [
  "[HERRAMIENTA]",
  "[HERRAMIENTA]",
  "[HERRAMIENTA]",
  "[HERRAMIENTA]",
  "[HERRAMIENTA]",
];

export function About() {
  return (
    <section id="sobre-mi" aria-labelledby="about-title">
      {/* Declaración de perfil */}
      <div className="grid grid-cols-4 items-end gap-gutter border-b border-accent-gray px-margin-edge py-section-gap md:grid-cols-12">
        <Reveal className="col-span-4 md:col-span-8">
          <p className="mb-4 font-meta-code text-meta-code uppercase text-meta-text">
            {"// 01_PERFIL"}
          </p>
          {/* TODO: contenido final — declaración de perfil.
              Original Stitch (ref. layout): "LOGIC OVER ARTIFICE." */}
          <h2
            id="about-title"
            className="m-0 font-display-xl-mobile text-display-xl-mobile uppercase leading-none md:font-display-xl md:text-display-xl"
          >
            [DECLARACIÓN
            <br />
            PENDIENTE]
          </h2>
        </Reveal>
        <Reveal
          delay={0.1}
          className="col-span-4 flex flex-col justify-end pb-2 md:col-span-4"
        >
          {/* TODO: contenido final — bio corta (1–2 frases).
              Original Stitch (ref.): "I am a UX Architect focused on stripping
              away decorative noise to reveal underlying structures…" */}
          <p className="font-body-lg text-body-lg text-secondary">
            [Bio corta — pendiente de definir]
          </p>
        </Reveal>
      </div>

      {/* Experiencia & Herramientas */}
      <div className="grid w-full grid-cols-1 md:grid-cols-12">
        {/* Experiencia */}
        <div className="col-span-1 border-b border-accent-gray md:col-span-8 md:border-b-0 md:border-r">
          <div className="border-b border-accent-gray px-margin-edge py-12">
            <h3 className="font-headline-lg text-headline-lg uppercase">
              Experiencia
            </h3>
          </div>
          <div className="flex flex-col">
            {experience.map((job, i) => (
              <div
                key={i}
                className="group grid cursor-default grid-cols-1 gap-gutter border-b border-accent-gray px-margin-edge py-12 transition-none hover:bg-primary hover:text-on-primary md:grid-cols-12"
              >
                <div className="flex flex-col justify-start md:col-span-4">
                  <span className="font-meta-code text-meta-code text-meta-text transition-none group-hover:text-on-primary">
                    {job.period}
                  </span>
                  <span className="mt-1 font-meta-code text-meta-code">
                    {job.company}
                  </span>
                </div>
                <div className="mt-4 md:col-span-8 md:mt-0">
                  <h4 className="m-0 font-headline-md text-headline-md uppercase leading-none">
                    {job.title}
                  </h4>
                  <p className="mt-4 font-body-md text-body-md text-secondary transition-none group-hover:text-surface-dim">
                    {job.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Herramientas / skills */}
        <div className="col-span-1 flex flex-col md:col-span-4">
          <div className="border-b border-accent-gray px-margin-edge py-12">
            <h3 className="font-headline-lg text-headline-lg uppercase">
              Herramientas
            </h3>
          </div>
          <ul className="flex h-full list-none flex-wrap content-start gap-2 bg-surface p-margin-edge">
            {tools.map((tool, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="font-meta-code text-meta-code uppercase text-primary">
                  {tool}
                </span>
                {i < tools.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="font-meta-code text-meta-code text-meta-text"
                  >
                    /
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
