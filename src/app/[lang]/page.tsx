import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getAllCaseStudies } from "@/lib/content";
import { Hero } from "@/components/home/Hero";
import { Numbers } from "@/components/home/Numbers";
import { WorkLedger } from "@/components/home/WorkLedger";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { ProcessBar } from "@/components/home/ProcessBar";
import { Testimonials } from "@/components/home/Testimonials";
import { HomeContact } from "@/components/home/HomeContact";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    alternates: {
      canonical: lang === "en" ? "/en" : "/",
      languages: { es: "/", en: "/en" },
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : "es";
  const t = getDictionary(lang);
  const studies = await getAllCaseStudies(lang);
  const featured = studies.find((s) => s.featured) ?? studies[0];

  return (
    <>
      <Hero lang={lang} t={t} featured={featured} />
      <Numbers t={t.home.numbers} />
      <WorkLedger
        lang={lang}
        t={t}
        studies={studies.map((s) => ({
          slug: s.slug,
          shortTitle: s.shortTitle,
          kind: s.kind,
          year: s.year,
          description: s.description,
          lottie: s.lottie,
          cover: s.cover,
          coverReady: s.coverReady,
        }))}
      />
      <AboutTeaser lang={lang} t={t} />
      <ProcessBar t={t.home.process} />
      {t.home.testimonials.items.length > 0 ? (
        <Testimonials t={t.home.testimonials} />
      ) : null}
      <HomeContact lang={lang} t={t} />
    </>
  );
}
