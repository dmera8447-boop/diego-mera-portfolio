import type { CSSProperties } from "react";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { ButtonLink } from "@/components/ui/Button";
import { Highlighted } from "@/components/ui/Highlighted";
import { InView } from "@/components/ui/InView";
import { MediaSlot } from "@/components/ui/MediaSlot";

interface AboutTeaserProps {
  lang: Locale;
  t: Dictionary;
}

/** Retrato a la izquierda; la historia en tinta suave con los datos clave resaltados. */
export function AboutTeaser({ lang, t }: AboutTeaserProps) {
  const a = t.home.about;
  return (
    <section aria-labelledby="about-title" className="px-edge pt-section">
      <InView className="grid gap-6 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <h2 id="about-title" className="type-h2 reveal">
            {a.title}
          </h2>
          <div
            className="reveal mt-6 md:mt-8"
            style={{ "--i": 2 } as CSSProperties}
          >
            <MediaSlot
              label={a.portrait}
              image="/about/retrato.jpg"
              ready
              className="aspect-[4/5]"
              sizes="(min-width: 768px) 33vw, 100vw"
            />
          </div>
        </div>
        <div className="flex flex-col items-start gap-8 md:col-span-8 md:pt-24">
          <p
            className="reveal text-soft text-[20px] leading-[1.4] tracking-[-0.01em] md:text-[24px]"
            style={{ "--i": 1 } as CSSProperties}
          >
            <Highlighted text={a.story} phrases={a.highlights} />
          </p>
          <p className="reveal" style={{ "--i": 2 } as CSSProperties}>
            {a.skills}
          </p>
          <div className="reveal" style={{ "--i": 3 } as CSSProperties}>
            <ButtonLink href={localePath(lang, "/about")} variant="link">
              {a.more} →
            </ButtonLink>
          </div>
        </div>
      </InView>
    </section>
  );
}
