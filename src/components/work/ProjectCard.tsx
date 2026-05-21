import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { CaseStudyMeta } from "@/lib/content";
import { LottieCover } from "@/components/work/LottieCover";

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
 * Tarjeta de proyecto brutalista — réplica de Stitch Project Gallery,
 * extendida con empresa, descripción y tags.
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
        aria-label={`Ver caso de estudio: ${meta.title} — ${meta.company}`}
        className="block focus:outline-none"
      >
        <div
          className={cn(
            "relative overflow-hidden border-2 border-primary bg-surface-container-high",
            aspectMap[aspect],
          )}
        >
          {meta.lottie ? (
            <LottieCover
              src={meta.lottie}
              fallback={meta.cover}
              sizes={sizes}
              priority={priority}
            />
          ) : (
            <Image
              src={meta.cover}
              alt=""
              fill
              sizes={sizes}
              priority={priority}
              className="object-cover opacity-80 mix-blend-multiply grayscale filter transition-none group-hover:grayscale-0 group-hover:opacity-100 group-focus-visible:grayscale-0 group-focus-visible:opacity-100"
            />
          )}
        </div>

        <div className="mt-4 flex flex-col gap-3 border-t border-accent-gray pt-4">
          {/* Title + Tags row */}
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <h3
              className={cn(
                "uppercase text-primary",
                headline,
                "group-hover:underline group-hover:decoration-2 group-hover:underline-offset-8",
              )}
            >
              {meta.title}
            </h3>
            <ul className="flex flex-shrink-0 flex-wrap gap-x-2 gap-y-1 md:max-w-[45%] md:justify-end">
              {meta.tags.map((tag, i) => (
                <li key={tag} className="flex items-center gap-2">
                  <span className="font-meta-code text-meta-code uppercase text-meta-text">
                    {tag}
                  </span>
                  {i < meta.tags.length - 1 && (
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

          {/* Company · Year */}
          <p className="font-meta-code text-meta-code uppercase text-meta-text">
            {meta.company}
            <span aria-hidden="true" className="mx-2">
              ·
            </span>
            {meta.year}
          </p>

          {/* Description */}
          <p className="font-body-md text-body-md text-secondary">
            {meta.description}
          </p>
        </div>
      </Link>
    </article>
  );
}
