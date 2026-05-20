import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * SOBRE MÍ — pantalla "About & Process" de Stitch adaptada.
 * Layout: arriba 8/4 con quote (h2) + primera frase de bio.
 * Abajo: 8/4 con bio extendida (mi historia) + skills agrupados.
 */

const skills: { label: string; items: string[] }[] = [
  {
    label: "UX/UI",
    items: [
      "Figma",
      "FigJam",
      "Miro",
      "Wireframing",
      "Prototipado",
      "Design Systems",
      "User Research",
      "User Journeys",
      "Pruebas de usabilidad",
      "Benchmarking",
      "Arquitectura de información",
    ],
  },
  {
    label: "IA",
    items: ["Claude Design", "Stitch de Google"],
  },
  {
    label: "Soft skills",
    items: [
      "Colaboración con devs y PMs",
      "Empatía con el usuario",
      "Pensamiento de negocio",
      "Comunicación de decisiones de diseño",
    ],
  },
];

export function About() {
  return (
    <section id="sobre-mi" aria-labelledby="about-title">
      {/* Statement (quote) + primera frase de bio */}
      <div className="grid grid-cols-4 items-end gap-gutter border-b border-accent-gray px-margin-edge py-section-gap md:grid-cols-12">
        <Reveal className="col-span-4 md:col-span-8">
          <p className="mb-4 font-meta-code text-meta-code uppercase text-meta-text">
            {"// 01_PERFIL"}
          </p>
          <h2
            id="about-title"
            className="m-0 font-display-xl-mobile text-display-xl-mobile uppercase leading-none md:font-display-xl md:text-display-xl"
          >
            “El buen diseño no elige entre el usuario y el negocio — los hace
            avanzar juntos.”
          </h2>
        </Reveal>
        <Reveal
          delay={0.1}
          className="col-span-4 flex flex-col justify-end pb-2 md:col-span-4"
        >
          <p className="font-body-lg text-body-lg text-secondary">
            Soy Diego, Diseñador UX/UI con sede en Samborondón, Ecuador. Me
            especializo en traducir problemas complejos en experiencias
            digitales claras, funcionales y escalables.
          </p>
        </Reveal>
      </div>

      {/* Mi historia (8 col) + Skills (4 col) */}
      <div className="grid w-full grid-cols-1 md:grid-cols-12">
        {/* Historia */}
        <div className="col-span-1 border-b border-accent-gray md:col-span-8 md:border-b-0 md:border-r">
          <div className="border-b border-accent-gray px-margin-edge py-12">
            <h3 className="font-headline-lg text-headline-lg uppercase">
              Mi historia
            </h3>
          </div>
          <div className="flex flex-col gap-8 px-margin-edge py-12">
            <p className="font-body-md text-body-md text-secondary">
              Mi background en asesoría comercial me dio algo que no se aprende
              en un curso: entender cómo piensan las personas cuando toman
              decisiones bajo presión. Hoy aplico esa perspectiva en cada
              entrevista de usuario, cada flujo y cada pantalla que diseño.
            </p>
            <p className="font-body-md text-body-md text-secondary">
              He trabajado en productos de sectores tan distintos como
              tecnología, delivery y acuicultura industrial — lo que me enseñó
              que el proceso importa más que la industria. Si entiendes al
              usuario y al negocio, puedes diseñar para cualquier contexto.
            </p>
          </div>
        </div>

        {/* Skills agrupados */}
        <div className="col-span-1 flex flex-col md:col-span-4">
          <div className="border-b border-accent-gray px-margin-edge py-12">
            <h3 className="font-headline-lg text-headline-lg uppercase">
              Skills
            </h3>
          </div>
          {skills.map((category, idx) => (
            <div
              key={category.label}
              className={cn(
                "px-margin-edge py-6",
                idx < skills.length - 1 && "border-b border-accent-gray",
              )}
            >
              <p className="mb-3 font-meta-code text-meta-code uppercase text-meta-text">
                {category.label}
              </p>
              <ul className="flex flex-wrap gap-x-2 gap-y-1">
                {category.items.map((item, i) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="font-meta-code text-meta-code uppercase text-primary">
                      {item}
                    </span>
                    {i < category.items.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="font-meta-code text-meta-code text-meta-text"
                      >
                        ·
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
