import Link from "next/link";
import type { CaseStudyNavItem } from "@/lib/content";

interface CaseStudyNavProps {
  prev: CaseStudyNavItem;
  next: CaseStudyNavItem;
}

/**
 * Navegación entre casos de estudio (anterior / siguiente).
 * Dos celdas brutalistas con inversión dura en hover (sin transición),
 * fiel al sistema de Stitch.
 */
export function CaseStudyNav({ prev, next }: CaseStudyNavProps) {
  return (
    <nav
      aria-label="Navegación entre casos de estudio"
      className="grid grid-cols-1 border-t-2 border-border-dark md:grid-cols-2"
    >
      <Link
        href={`/projects/${prev.slug}`}
        className="group cursor-pointer border-b border-accent-gray px-margin-edge py-12 transition-none hover:bg-primary hover:text-on-primary md:border-b-0 md:border-r md:border-accent-gray"
      >
        <span className="block font-meta-code text-meta-code uppercase text-meta-text transition-none group-hover:text-on-primary">
          ← Anterior
        </span>
        <span className="mt-4 block font-headline-md text-headline-md uppercase leading-none">
          {prev.title}
        </span>
      </Link>
      <Link
        href={`/projects/${next.slug}`}
        className="group cursor-pointer px-margin-edge py-12 text-right transition-none hover:bg-primary hover:text-on-primary"
      >
        <span className="block font-meta-code text-meta-code uppercase text-meta-text transition-none group-hover:text-on-primary">
          Siguiente →
        </span>
        <span className="mt-4 block font-headline-md text-headline-md uppercase leading-none">
          {next.title}
        </span>
      </Link>
    </nav>
  );
}
