import type { CSSProperties } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { bookHref } from "@/lib/links";
import { mailtoHref, siteConfig, whatsappHref } from "@/lib/site";
import { ActionRow } from "@/components/ui/ActionRow";
import { InView } from "@/components/ui/InView";

interface HomeContactProps {
  lang: Locale;
  t: Dictionary;
}

export function HomeContact({ lang, t }: HomeContactProps) {
  const c = t.home.contact;
  return (
    <section
      id="contacto"
      aria-labelledby="contact-title"
      className="px-edge py-section"
    >
      <InView className="grid gap-8 md:grid-cols-12">
        <div className="flex min-w-0 flex-col gap-6 md:col-span-6">
          <h2 id="contact-title" className="type-h2 reveal max-w-[600px]">
            {c.title}
          </h2>
          <p
            className="reveal max-w-[440px]"
            style={{ "--i": 1 } as CSSProperties}
          >
            {c.body}
          </p>
        </div>
        <div className="flex min-w-0 flex-col gap-3 md:col-span-6">
          <ActionRow
            primary
            href={bookHref(lang)}
            label={c.callMeta}
            value={t.common.bookCall}
            className="reveal"
            style={{ "--i": 1 } as CSSProperties}
          />
          <ActionRow
            href={mailtoHref(t.common.mailSubject)}
            label="Email"
            value={siteConfig.email}
            className="reveal"
            style={{ "--i": 2 } as CSSProperties}
          />
          <ActionRow
            href={whatsappHref(t.common.whatsappHello)}
            label="WhatsApp"
            value={siteConfig.phoneDisplay}
            className="reveal"
            style={{ "--i": 3 } as CSSProperties}
          />
          <ActionRow
            href={siteConfig.linkedin}
            label="LinkedIn"
            value={siteConfig.linkedinDisplay}
            className="reveal"
            style={{ "--i": 4 } as CSSProperties}
          />
        </div>
      </InView>
    </section>
  );
}
