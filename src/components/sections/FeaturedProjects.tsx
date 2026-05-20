import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/work/ProjectCard";
import { getAllCaseStudies } from "@/lib/content";

/**
 * PROYECTOS DESTACADOS — bento grid 2×2 de 4 casos de estudio.
 * Cada card ocupa 6 columnas en desktop, full width en mobile.
 * Mantiene el estilo brutalista: bordes 2px, sharp, grayscale → color
 * en hover, meta-code labels, sin sombras.
 *
 * Sin titular visible en pantalla (fiel al home de Stitch). La sección
 * tiene nombre accesible vía sr-only para el scrollspy / lectores.
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
        {studies.slice(0, 4).map((study, i) => (
          <Reveal
            key={study.slug}
            delay={i * 0.05}
            className="col-span-1 md:col-span-6"
          >
            <ProjectCard
              meta={study}
              variant="lg"
              aspect="16/9"
              sizes="(min-width:768px) 50vw, 100vw"
              priority={i === 0}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
