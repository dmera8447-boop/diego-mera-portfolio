import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getAdjacentCaseStudies,
  getCaseStudy,
  getCaseStudySlugs,
} from "@/lib/content";
import { mdxComponents } from "@/components/work/mdx-components";
import { CaseStudyNav } from "@/components/work/CaseStudyNav";

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.description,
    openGraph: {
      title: study.title,
      description: study.description,
      images: [{ url: study.hero }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: study.title,
      description: study.description,
      images: [study.hero],
    },
  };
}

const META_LABELS: ReadonlyArray<readonly [string, keyof MetaRow]> = [
  ["Rol", "role"],
  ["Duración", "duration"],
  ["Equipo", "team"],
  ["Año", "year"],
];

type MetaRow = { role: string; duration: string; team: string; year: string };

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) notFound();

  const adjacent = await getAdjacentCaseStudies(slug);
  const metaRow: MetaRow = {
    role: study.role,
    duration: study.duration,
    team: study.team,
    year: study.year,
  };

  return (
    <article>
      {/* Header */}
      <header className="grid grid-cols-4 items-end gap-gutter border-b border-accent-gray px-margin-edge pb-12 pt-section-gap md:grid-cols-12">
        <div className="col-span-4 md:col-span-8">
          <p className="mb-4 font-meta-code text-meta-code uppercase text-meta-text">
            {"// CASO_DE_ESTUDIO"}
          </p>
          <h1 className="m-0 break-words font-display-xl-mobile text-display-xl-mobile uppercase leading-none text-primary md:font-display-xl md:text-display-xl">
            {study.title}
          </h1>
        </div>
        <dl className="col-span-4 grid grid-cols-2 gap-x-gutter gap-y-6 md:col-span-4">
          {META_LABELS.map(([label, key]) => (
            <div key={label}>
              <dt className="font-meta-code text-meta-code uppercase text-meta-text">
                {label}
              </dt>
              <dd className="mt-1 font-meta-code text-meta-code uppercase text-primary">
                {metaRow[key]}
              </dd>
            </div>
          ))}
        </dl>
      </header>

      {/* Hero image */}
      <section
        aria-hidden={!study.hero}
        className="relative aspect-video w-full overflow-hidden border-b border-accent-gray bg-surface-container-high md:aspect-[21/9]"
      >
        <Image
          src={study.hero}
          alt={`Imagen principal del caso de estudio ${study.title}`}
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-80 mix-blend-multiply grayscale filter"
        />
        <div className="pointer-events-none absolute inset-0 m-margin-edge hidden border border-primary md:block" />
      </section>

      {/* Body (MDX) — medida cómoda para lectura larga */}
      <div className="mx-auto max-w-[760px] px-margin-edge pb-section-gap pt-24">
        {study.liveUrl ? (
          <p className="mb-12">
            <Link
              href={study.liveUrl}
              className="inline-block border-2 border-primary px-4 py-2 font-meta-code text-meta-code uppercase text-primary transition-none hover:bg-primary hover:text-on-primary"
            >
              Ver proyecto en vivo ↗
            </Link>
          </p>
        ) : null}

        <MDXRemote source={study.content} components={mdxComponents} />

        <div className="mt-section-gap border-t border-accent-gray pt-8">
          <Link
            href="/#proyectos"
            className="font-meta-code text-meta-code uppercase text-secondary transition-none hover:text-primary"
          >
            ← Volver a proyectos
          </Link>
        </div>
      </div>

      {adjacent ? (
        <CaseStudyNav prev={adjacent.prev} next={adjacent.next} />
      ) : null}
    </article>
  );
}
