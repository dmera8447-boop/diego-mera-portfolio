import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Loader de casos de estudio.
 * Los .mdx viven en /content/case-studies con frontmatter.
 * El render MDX se hace con next-mdx-remote/rsc en la página de detalle.
 */

const DIR = path.join(process.cwd(), "content", "case-studies");

export interface CaseStudyMeta {
  /** Derivado del nombre de archivo → ruta /projects/[slug] */
  slug: string;
  /** Título del caso (p.ej. "Dashboard interno de métricas") */
  title: string;
  /** Empresa + sector (p.ej. "Shepwashi · Desarrollo de Software") */
  company: string;
  /** Descripción corta para la tarjeta y SEO meta */
  description: string;
  /** Rol de Diego (p.ej. "Lead UX/UI Designer") — solo página de detalle */
  role: string;
  /** Duración del proyecto — solo página de detalle */
  duration: string;
  /** Equipo — solo página de detalle */
  team: string;
  year: string;
  /** Tags técnicos (meta-code, separados por · o /) */
  tags: string[];
  /** Imagen de la tarjeta en /public/case-studies/[slug] */
  cover: string;
  /** Imagen hero de la página de detalle */
  hero: string;
  liveUrl?: string;
  /** Orden de aparición (menor primero) */
  order: number;
}

export interface CaseStudy extends CaseStudyMeta {
  /** Cuerpo MDX en crudo (se compila en la página) */
  content: string;
}

export interface CaseStudyNavItem {
  slug: string;
  title: string;
}

async function readFiles(): Promise<string[]> {
  try {
    const entries = await fs.readdir(DIR);
    return entries.filter((f) => f.endsWith(".mdx"));
  } catch {
    return [];
  }
}

export async function getAllCaseStudies(): Promise<CaseStudyMeta[]> {
  const files = await readFiles();
  const studies = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = await fs.readFile(path.join(DIR, file), "utf-8");
      const { data } = matter(raw);
      return { slug, ...(data as Omit<CaseStudyMeta, "slug">) };
    }),
  );
  return studies.sort((a, b) => a.order - b.order);
}

export async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  try {
    const raw = await fs.readFile(path.join(DIR, `${slug}.mdx`), "utf-8");
    const { data, content } = matter(raw);
    return { slug, content, ...(data as Omit<CaseStudyMeta, "slug">) };
  } catch {
    return null;
  }
}

export async function getCaseStudySlugs(): Promise<string[]> {
  const files = await readFiles();
  return files.map((f) => f.replace(/\.mdx$/, ""));
}

/** Caso anterior / siguiente (orden circular) para la navegación al pie. */
export async function getAdjacentCaseStudies(slug: string): Promise<{
  prev: CaseStudyNavItem;
  next: CaseStudyNavItem;
} | null> {
  const all = await getAllCaseStudies();
  if (all.length === 0) return null;
  const idx = all.findIndex((s) => s.slug === slug);
  if (idx === -1) return null;
  const prev = all[(idx - 1 + all.length) % all.length]!;
  const next = all[(idx + 1) % all.length]!;
  return {
    prev: { slug: prev.slug, title: prev.title },
    next: { slug: next.slug, title: next.title },
  };
}
