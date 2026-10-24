import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { isLocale, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { mailtoHref, siteConfig, whatsappHref } from "@/lib/site";
import { ActionRow } from "@/components/ui/ActionRow";
import { ButtonLink } from "@/components/ui/Button";
import { InView } from "@/components/ui/InView";
import { CallPlanner } from "@/components/contact/CallPlanner";
import { ContactForm } from "@/components/contact/ContactForm";
import { LocalTime } from "@/components/contact/LocalTime";

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
    title: t.contact.metaTitle,
    description: t.contact.metaDescription,
    alternates: {
      canonical: localePath(lang, "/contact"),
      languages: { es: "/contact", en: "/en/contact" },
    },
  };
}

export default async function ContactPage({ params }: { params: Params }) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : "es";
  const t = getDictionary(lang);
  const c = t.contact;

  return (
    <>
      <section aria-labelledby="contact-h1" className="px-edge pt-8 md:pt-12">
        <h1 id="contact-h1" className="type-h1 fade-up">
          {c.h1}
        </h1>
        <div
          className="fade-up mt-8 flex flex-col justify-between gap-6 md:mt-12 md:flex-row md:items-end"
          style={{ animationDelay: "120ms" }}
        >
          <div className="flex flex-col gap-6">
            <p className="type-lead max-w-[880px]">{c.intro}</p>
            <ButtonLink href="#agenda" className="w-full md:hidden">
              {c.planner.pickDay} ↓
            </ButtonLink>
          </div>
          <p className="shrink-0 md:text-right">
            {siteConfig.location}
            <br />
            <span className="text-soft">
              {c.localTime}: <LocalTime /> · GMT−5
            </span>
          </p>
        </div>
      </section>

      <section className="px-edge pt-12 md:pt-24">
        <div className="grid gap-16 md:grid-cols-12 md:gap-8">
          <div
            id="agenda"
            className="fade-up scroll-mt-[calc(var(--nav-h)+16px)] md:col-span-7"
            style={{ animationDelay: "220ms" }}
          >
            <CallPlanner lang={lang} t={c.planner} />
          </div>

          <div className="flex min-w-0 flex-col gap-16 md:col-span-5">
            <InView className="flex flex-col gap-3">
              <h2 className="type-title reveal font-medium">
                {c.channelsTitle}
              </h2>
              <ActionRow
                href={whatsappHref(t.common.whatsappHello)}
                label={c.channels.whatsapp}
                value={siteConfig.phoneDisplay}
                className="reveal"
                style={{ "--i": 1 } as CSSProperties}
              />
              <ActionRow
                href={mailtoHref(t.common.mailSubject)}
                label={c.channels.email}
                value={siteConfig.email}
                className="reveal"
                style={{ "--i": 2 } as CSSProperties}
              />
              <ActionRow
                href={siteConfig.linkedin}
                label={c.channels.linkedin}
                value={siteConfig.linkedinDisplay}
                className="reveal"
                style={{ "--i": 3 } as CSSProperties}
              />
            </InView>

            <div className="flex flex-col gap-5">
              <h2 className="type-title font-medium">{c.form.title}</h2>
              <ContactForm t={c.form} />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="faq-title" className="px-edge py-section">
        <InView className="grid gap-8 md:grid-cols-12">
          <h2 id="faq-title" className="type-h2 reveal md:col-span-4">
            {c.faq.title}
          </h2>
          <div className="flex flex-col gap-2 md:col-span-8">
            {c.faq.items.map((item, i) => (
              <details
                key={item.q}
                open={i === 0}
                className="reveal group bg-tone open:bg-tone"
                style={{ "--i": i + 1 } as CSSProperties}
              >
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 p-5 md:p-6 [&::-webkit-details-marker]:hidden">
                  <span className="font-medium md:text-[24px] md:leading-[1.25]">
                    {item.q}
                  </span>
                  <span
                    aria-hidden="true"
                    className="type-title transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-measure px-5 pb-6 md:px-6">{item.a}</p>
              </details>
            ))}
          </div>
        </InView>
      </section>
    </>
  );
}
