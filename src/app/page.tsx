import { Hero } from "@/components/sections/Hero";
import { ToolsMarquee } from "@/components/sections/ToolsMarquee";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

/**
 * HOME — página única con anclas de scroll.
 * Orden según el nav de Stitch:
 *   Hero → Proyectos (#proyectos) → Proceso (#proceso) → Sobre mí (#sobre-mi) → Contacto (#contacto)
 *
 * FASE 3.5: todas las secciones implementadas.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ToolsMarquee />
      <FeaturedProjects />
      <Process />
      <About />
      <Contact />
    </>
  );
}
