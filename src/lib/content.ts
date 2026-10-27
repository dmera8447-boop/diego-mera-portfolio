import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Locale } from "@/i18n/config";

/**
 * Loader de casos de estudio.
 * Los .mdx en español viven en /content/case-studies; las versiones en inglés
 * en /content/case-studies/en con el mismo nombre. En inglés, los campos que
 * falten o vengan vacíos caen al valor en español, y el cuerpo también si no
 * existe el archivo en inglés.
 */

const DIR = path.join(process.cwd(), "content", "case-studies");

export interface CaseStudyResult {
  value: string;
  label: string;
}

export interface CaseStudyMeta {
  /** Derivado del nombre de archivo → ruta /projects/[slug] */
  slug: string;
  /** Título descriptivo (SEO) */
  title: string;
  /** Nombre corto del caso: lista de trabajo y h1 */
  shortTitle: string;
  /** Empresa + tipo de trabajo, p.ej. "Insurtech · Dashboard multirol" */
  kind: string;
  /** Cliente + sector */
  company: string;
  /** Resumen de una frase */
  description: string;
  role: string;
  duration: string;
  team: string;
  platform?: string;
  year: string;
  tags: string[];
  /** Capturas en /public/case-studies/[slug]; solo se muestran con coverReady */
  cover: string;
  hero: string;
  /** true cuando cover/hero ya son capturas reales (no placeholders) */
  coverReady?: boolean;
  /** Lottie JSON opcional (loop, lazy-loaded) */
  lottie?: string;
  liveUrl?: string;
  /** Resultados medibles; la sección se oculta si no hay */
  results?: CaseStudyResult[];
  /** Caso destacado en el hero de la home */
  featured?: boolean;
  /** Orden de aparición (menor primero) */
  order: number;
  /** Fuera de la lista y del sitemap; la página sigue existiendo */
  hidden?: boolean;
}

export interface CaseStudy extends CaseStudyMeta {
  /** Cuerpo MDX en crudo (se compila en la página) */
  content: string;
}

/** Un valor de frontmatter cuenta si existe y no es un "[pendiente]". */
export function isFilled(value?: string): value is string {
  return !!value && !value.trim().startsWith("[");
}

async function readFiles(): Promise<string[]> {
  try {
    const entries = await fs.readdir(DIR);
    return entries.filter((f) => f.endsWith(".mdx"));
  } catch {
    return [];
  }
}

async function readOptional(file: string): Promise<string | null> {
  try {
    return await fs.readFile(file, "utf-8");
  } catch {
    return null;
  }
}

async function load(lang: Locale, slug: string): Promise<CaseStudy | null> {
  const raw = await readOptional(path.join(DIR, `${slug}.mdx`));
  if (!raw) return null;
  const base = matter(raw);
  let data = base.data as Omit<CaseStudyMeta, "slug">;
  let content = base.content;

  if (lang !== "es") {
    const translated = await readOptional(path.join(DIR, lang, `${slug}.mdx`));
    if (translated) {
      const t = matter(translated);
      const overrides = Object.fromEntries(
        Object.entries(t.data).filter(([, v]) => v !== "" && v != null),
      );
      data = { ...data, ...overrides };
      content = t.content;
    }
  }

  return { slug, content, ...data };
}

export async function getCaseStudySlugs(): Promise<string[]> {
  const files = await readFiles();
  return files.map((f) => f.replace(/\.mdx$/, ""));
}

export async function getAllCaseStudies(
  lang: Locale,
): Promise<CaseStudyMeta[]> {
  const slugs = await getCaseStudySlugs();
  const studies = await Promise.all(slugs.map((slug) => load(lang, slug)));
  return studies
    .filter((s): s is CaseStudy => s !== null && !s.hidden)
    .map(({ content: _content, ...meta }) => meta)
    .sort((a, b) => a.order - b.order);
}

export async function getCaseStudy(
  lang: Locale,
  slug: string,
): Promise<CaseStudy | null> {
  return load(lang, slug);
}

/** Caso siguiente (orden circular) para el cierre de cada caso. */
export async function getNextCaseStudy(
  lang: Locale,
  slug: string,
): Promise<CaseStudyMeta | null> {
  const all = await getAllCaseStudies(lang);
  const idx = all.findIndex((s) => s.slug === slug);
  if (idx === -1 || all.length < 2) return null;
  return all[(idx + 1) % all.length] ?? null;
}
