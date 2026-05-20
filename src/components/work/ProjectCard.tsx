import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { CaseStudyMeta } from "@/lib/content";

interface ProjectCardProps {
  meta: CaseStudyMeta;
  /** "lg" → headline-lg + aspect ancho · "md" → headline-md + aspect cuadrado */
  variant?: "lg" | "md";
  /** Relación de aspecto del medio */
  aspect?: "16/9" | "square" | "4/5";
  /** Hint de tamaño para next/image (sizes attr) */
  sizes?: string;
  /** Clases del item del grid (col-span / col-start / mt / -mt …) */
  className?: string;
  /** Carga prioritaria de la imagen (solo en la primera card above-the-fold) */
  priority?: boolean;
}

const aspectMap: Record<NonNullable<ProjectCardProps["aspect"]>, string> = {
  "16/9": "aspect-[16/9]",
  square: "aspect-square",
  "4/5": "aspect-[4/5]",
};

/**
 * Tarjeta de proyecto brutalista — réplica de Stitch Project Gallery.
 * El <article> es el item del grid; el <Link> envuelve todo para que la
 * tarjeta entera sea clickable y accesible por teclado.
 */
export function ProjectCard({
  meta,
  variant = "lg",
  aspect = "16/9",
  sizes = "(min-width:768px) 50vw, 100vw",
  className,
  priority = false,
}: ProjectCardProps) {
  const headline =
    variant === "lg"
      ? "font-headline-lg text-headline-lg"
      : "font-headline-md text-headline-md";

  return (
    <article className={cn("group relative flex flex-col", className)}>
      <Link
        href={`/projects/${meta.slug}`}
        aria-label={`Ver caso de estudio: ${meta.title}`}
        className="block focus:outline-none"
      >
        <div
          className={cn(
            "relative overflow-hidden border-2 border-primary bg-surface-container-high",
            aspectMap[aspect],
          )}
        >
          <Image
            src={meta.cover}
            alt=""
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover opacity-80 mix-blend-multiply grayscale filter transition-none group-hover:grayscale-0 group-hover:opacity-100 group-focus-visible:grayscale-0 group-focus-visible:opacity-100"
          />
        </div>
        <div className="mt-4 flex flex-col justify-between border-t border-accent-gray pt-4 md:flex-row md:items-end">
          <h3
            className={cn(
              "uppercase text-primary",
              headline,
              "group-hover:underline group-hover:decoration-2 group-hover:underline-offset-8",
            )}
          >
            {meta.title}
          </h3>
          <div className="mt-2 flex gap-2 font-meta-code text-meta-code uppercase text-meta-text md:mt-0">
            <span>{meta.role}</span>
            <span aria-hidden="true">/</span>
            <span>{meta.year}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
