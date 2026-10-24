import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { bookHref } from "@/lib/links";
import { whatsappHref } from "@/lib/site";
import { ButtonLink } from "./Button";
import { InView } from "./InView";

interface CtaBandProps {
  lang: Locale;
  t: Dictionary;
  title: string;
}

/** Cierre de página en el acento: una pregunta y la acción de agendar. */
export function CtaBand({ lang, t, title }: CtaBandProps) {
  return (
    <section aria-label={title} className="px-edge py-section">
      <InView>
        <div className="reveal bg-accent flex flex-col gap-8 p-6 md:flex-row md:items-end md:justify-between md:p-12">
          <p className="max-w-[760px] text-[24px] leading-[1.2] font-medium tracking-[-0.01em] md:text-[clamp(40px,4.45vw,64px)] md:leading-none md:tracking-[-0.03em]">
            {title}
          </p>
          <div className="flex flex-col items-start gap-2 md:items-end">
            <ButtonLink
              href={bookHref(lang)}
              variant="ink"
              className="w-full md:w-auto"
            >
              {t.common.bookCall}
            </ButtonLink>
            <ButtonLink
              href={whatsappHref(t.common.whatsappHello)}
              variant="link"
            >
              {t.common.orWhatsapp}
            </ButtonLink>
          </div>
        </div>
      </InView>
    </section>
  );
}
