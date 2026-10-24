import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { isLocale, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { bookHref } from "@/lib/links";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { InView } from "@/components/ui/InView";
import { MediaSlot } from "@/components/ui/MediaSlot";

type Params = Promise<{ lang: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    title: t.about.metaTitle,
    description: t.about.metaDescription,
    alternates: {
      canonical: localePath(lang, "/about"),
      languages: { es: "/about", en: "/en/about" },
    },
  };
}

const step = (i: number) => ({ "--i": i }) as CSSProperties;

export default async function AboutPage({ params }: { params: Params }) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : "es";
  const t = getDictionary(lang);
  const a = t.about;

  return (
    <>
      <section aria-labelledby="about-h1" className="px-edge pt-8 md:pt-12">
        <h1 id="about-h1" className="type-h1 fade-up">
          {a.h1}
        </h1>
        <div className="mt-8 grid gap-8 md:mt-12 md:grid-cols-12">
          <div
            className="fade-up md:col-span-5"
            style={{ animationDelay: "120ms" }}
          >
            <MediaSlot
              label={t.home.about.portrait}
              note={t.common.imagePending}
              className="aspect-[4/5]"
              sizes="(min-width: 768px) 40vw, 100vw"
              priority
            />
          </div>
          <div
            className="fade-up flex flex-col items-start gap-7 md:col-span-7 md:pl-8"
            style={{ animationDelay: "220ms" }}
          >
            <p className="type-lead">{a.statement}</p>
            {a.story.map((p) => (
              <p key={p.slice(0, 24)} className="max-w-measure">
                {p}
              </p>
            ))}
            <div className="flex w-full flex-col items-center gap-2 sm:w-auto sm:flex-row sm:gap-6">
              <ButtonLink href={bookHref(lang)} className="w-full sm:w-auto">
                {t.common.bookCall}
              </ButtonLink>
              <ButtonLink
                href={`${localePath(lang, "/")}#trabajo`}
                variant="link"
              >
                {a.seeWork} →
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="exp-title" className="px-edge pt-section">
        <InView>
          <h2 id="exp-title" className="type-h2 reveal">
            {a.experience.title}
          </h2>
          <ol className="mt-8 flex flex-col gap-8 md:mt-12 md:gap-0">
            {a.experience.items.map((e, i) => (
              <li
                key={`${e.role}-${e.years}`}
                className="reveal grid gap-1 md:grid-cols-12 md:gap-8 md:py-7"
                style={step(Math.min(i + 1, 4))}
              >
                <p className="text-soft md:text-ink md:col-span-2">{e.years}</p>
                <div className="md:col-span-7">
                  <h3 className="type-lead font-medium">{e.role}</h3>
                  {e.desc ? (
                    <p className="max-w-measure text-soft mt-2">{e.desc}</p>
                  ) : null}
                </div>
                <p className="text-soft md:text-ink md:col-span-3 md:text-right">
                  {e.place}
                </p>
              </li>
            ))}
          </ol>
        </InView>
      </section>

      <section
        aria-labelledby="principles-title"
        className="px-edge pt-section"
      >
        <InView>
          <h2 id="principles-title" className="type-h2 reveal">
            {a.principles.title}
          </h2>
          <ul className="mt-8 flex flex-col gap-10 md:mt-14 md:gap-14">
            {a.principles.items.map((p, i) => (
              <li
                key={p.head}
                className="reveal grid gap-3 md:grid-cols-12 md:gap-8"
                style={step(i + 1)}
              >
                <p className="type-lead md:col-span-7">{p.head}</p>
                <p className="max-w-measure md:col-span-5">{p.body}</p>
              </li>
            ))}
          </ul>
        </InView>
      </section>

      <section aria-labelledby="skills-title" className="px-edge pt-section">
        <InView>
          <h2 id="skills-title" className="type-h2 reveal">
            {a.skills.title}
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 md:mt-14 md:grid-cols-4 md:gap-8">
            {a.skills.groups.map((g, i) => (
              <div key={g.name} className="reveal" style={step(i + 1)}>
                <h3 className="type-title font-medium">{g.name}</h3>
                <ul className="mt-4 flex flex-col gap-1.5">
                  {g.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </InView>
      </section>

      <section aria-labelledby="certs-title" className="px-edge pt-section">
        <InView>
          <h2 id="certs-title" className="type-h2 reveal">
            {a.certs.title}
          </h2>
          <ul className="mt-8 grid gap-3 md:mt-12 md:grid-cols-3">
            {a.certs.items.map((c, i) => (
              <li
                key={c}
                className="reveal bg-tone flex min-h-[140px] items-end p-5 md:min-h-[220px] md:p-7"
                style={step(i + 1)}
              >
                <p className="type-title font-medium">{c}</p>
              </li>
            ))}
          </ul>
        </InView>
      </section>

      <CtaBand lang={lang} t={t} title={a.ctaTitle} />
    </>
  );
}
