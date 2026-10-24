import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { isLocale, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import {
  getCaseStudy,
  getCaseStudySlugs,
  getNextCaseStudy,
  isFilled,
} from "@/lib/content";
import { caseMdxComponents } from "@/components/work/case-mdx";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { InView } from "@/components/ui/InView";
import { CtaBand } from "@/components/ui/CtaBand";
import { ButtonLink } from "@/components/ui/Button";

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

type Params = Promise<{ lang: string; slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const study = await getCaseStudy(lang, slug);
  if (!study) return {};
  return {
    title: study.shortTitle,
    description: study.description,
    alternates: {
      canonical: localePath(lang, `/projects/${slug}`),
      languages: {
        es: `/projects/${slug}`,
        en: `/en/projects/${slug}`,
      },
    },
    openGraph: {
      title: study.title,
      description: study.description,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Params }) {
  const { lang: raw, slug } = await params;
  const lang: Locale = isLocale(raw) ? raw : "es";
  const t = getDictionary(lang);
  const study = await getCaseStudy(lang, slug);
  if (!study) notFound();
  const next = await getNextCaseStudy(lang, slug);
  const L = t.caseStudy.labels;

  const facts = [
    [L.client, study.company],
    [L.role, study.role],
    [L.team, study.team],
    [L.duration, study.duration],
    [L.platform, study.platform],
    [L.year, study.year],
  ].filter((row): row is [string, string] => isFilled(row[1]));

  return (
    <article>
      <header className="px-edge pt-8 md:pt-12">
        <h1 className="type-h1 fade-up">{study.shortTitle}</h1>
        <div className="mt-8 grid gap-8 md:mt-12 md:grid-cols-12">
          <p
            className="type-lead fade-up md:col-span-7"
            style={{ animationDelay: "120ms" }}
          >
            {study.description}
          </p>
          <dl className="flex flex-col gap-3 md:col-span-4 md:col-start-9">
            {facts.map(([label, value], i) => (
              <div
                key={label}
                className="fade-up grid grid-cols-[110px_1fr] gap-4"
                style={{ animationDelay: `${220 + i * 70}ms` }}
              >
                <dt className="text-soft">{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
            <div>
              <Link
                href={`${localePath(lang, "/")}#trabajo`}
                className="inline-flex min-h-11 items-center underline underline-offset-[5px] hover:decoration-2"
              >
                ← {t.caseStudy.back}
              </Link>
            </div>
          </dl>
        </div>
        <div
          className="fade-up mt-10 md:mt-12"
          style={{ animationDelay: "320ms" }}
        >
          <MediaSlot
            label={study.shortTitle}
            note={t.common.imagePending}
            lottie={study.lottie}
            image={study.hero}
            ready={study.coverReady}
            priority
            className="aspect-[4/3] md:aspect-[2/1]"
          />
        </div>
        {isFilled(study.liveUrl) ? (
          <ButtonLink href={study.liveUrl} variant="link" className="mt-4">
            {t.caseStudy.live} ↗
          </ButtonLink>
        ) : null}
      </header>

      {study.results && study.results.length > 0 ? (
        <section aria-labelledby="results-title" className="px-edge pt-section">
          <InView>
            <h2 id="results-title" className="type-h2 reveal">
              {t.caseStudy.results}
            </h2>
            <ul className="mt-8 grid gap-10 md:mt-14 md:grid-cols-3 md:gap-8">
              {study.results.map((r, i) => (
                <li
                  key={r.label}
                  className="reveal"
                  style={{ "--i": i + 1 } as CSSProperties}
                >
                  <p className="type-h1 font-medium tabular-nums">{r.value}</p>
                  <p className="type-title mt-3">{r.label}</p>
                </li>
              ))}
            </ul>
          </InView>
        </section>
      ) : null}

      <div className="case-body px-edge">
        <MDXRemote source={study.content} components={caseMdxComponents} />
      </div>

      {next ? (
        <section aria-labelledby="next-title" className="px-edge pt-section">
          <InView>
            <Link
              href={localePath(lang, `/projects/${next.slug}`)}
              className="reveal group flex flex-col gap-6"
            >
              <span className="flex flex-col justify-between gap-2 md:flex-row md:items-end">
                <h2 id="next-title" className="type-h2 font-medium">
                  {next.shortTitle}{" "}
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-200 group-hover:translate-x-2"
                  >
                    →
                  </span>
                </h2>
                <span>
                  {t.caseStudy.next} · {next.kind} · {next.year}
                </span>
              </span>
              <MediaSlot
                label={next.shortTitle}
                note={t.common.imagePending}
                lottie={next.lottie}
                image={next.cover}
                ready={next.coverReady}
                className="aspect-[16/9] md:aspect-[3/1]"
              />
            </Link>
          </InView>
        </section>
      ) : null}

      <CtaBand lang={lang} t={t} title={t.caseStudy.ctaTitle} />
    </article>
  );
}
