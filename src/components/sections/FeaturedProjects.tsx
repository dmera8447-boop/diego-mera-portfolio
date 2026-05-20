import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/work/ProjectCard";
import { getAllCaseStudies } from "@/lib/content";

/**
 * PROYECTOS DESTACADOS — sección de la home.
 * Composición asimétrica (bento brutalista) derivada del Project Gallery
 * de Stitch, adaptada a 3 casos:
 *   #1 grande (8 col, 16/9) · #2 pequeño (4 col, cuadrado) · #3 grande (6 col, offset)
 *
 * Sin titular visible (fiel al home de Stitch); la sección tiene nombre
 * accesible vía sr-only para que el scrollspy/nav la identifique como landmark.
 */
export async function FeaturedProjects() {
  const studies = await getAllCaseStudies();

  return (
    <section
      id="proyectos"
      aria-labelledby="proyectos-title"
      className="border-b border-accent-gray px-margin-edge py-section-gap"
    >
      <h2 id="proyectos-title" className="sr-only">
        Proyectos destacados
      </h2>

      <div className="grid grid-cols-1 gap-x-gutter gap-y-16 md:grid-cols-12">
        {studies[0] && (
          <Reveal className="col-span-1 md:col-span-8">
            <ProjectCard
              meta={studies[0]}
              variant="lg"
              aspect="16/9"
              sizes="(min-width:768px) 66vw, 100vw"
              priority
            />
          </Reveal>
        )}
        {studies[1] && (
          <Reveal
            delay={0.05}
            className="col-span-1 mt-16 md:col-span-4 md:mt-0"
          >
            <ProjectCard
              meta={studies[1]}
              variant="md"
              aspect="square"
              sizes="(min-width:768px) 33vw, 100vw"
            />
          </Reveal>
        )}
        {studies[2] && (
          <Reveal
            delay={0.1}
            className="col-span-1 md:col-span-6 md:col-start-4 md:-mt-16"
          >
            <ProjectCard
              meta={studies[2]}
              variant="lg"
              aspect="16/9"
              sizes="(min-width:768px) 50vw, 100vw"
            />
          </Reveal>
        )}
      </div>
    </section>
  );
}
