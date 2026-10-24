import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { CaseStudyMeta } from "@/lib/content";
import { bookHref } from "@/lib/links";
import { whatsappHref } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { MediaSlot } from "@/components/ui/MediaSlot";

interface HeroProps {
  lang: Locale;
  t: Dictionary;
  featured?: CaseStudyMeta;
}

/**
 * Primer pantallazo: el nombre a todo el ancho (sube desde su línea base al
 * cargar), quién soy en una frase, la acción principal y el caso destacado.
 */
export function Hero({ lang, t, featured }: HeroProps) {
  return (
    <section aria-labelledby="hero-title" className="px-edge pt-6 md:pt-10">
      <div className="name-fit">
        <h1 id="hero-title" className="type-name">
          <span className="mask-line">
            <span>Diego Mera</span>
          </span>
          <span className="sr-only">
            {lang === "es" ? ", diseñador UX/UI" : ", UX/UI designer"}
          </span>
        </h1>
      </div>

      <div className="mt-6 grid gap-6 md:mt-14 md:grid-cols-12 md:items-end md:gap-8">
        <p
          className="type-lead fade-up max-w-[760px] md:col-span-7"
          style={{ animationDelay: "250ms" }}
        >
          {t.home.statement}
        </p>
        <div
          className="fade-up flex flex-col gap-5 md:col-span-4 md:col-start-9"
          style={{ animationDelay: "380ms" }}
        >
          <p>{t.common.availability}</p>
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-6">
            <ButtonLink href={bookHref(lang)} className="w-full sm:w-auto">
              {t.common.bookCall}
            </ButtonLink>
            <ButtonLink
              href={whatsappHref(t.common.whatsappHello)}
              variant="link"
            >
              {t.common.whatsapp}
            </ButtonLink>
          </div>
        </div>
      </div>

      {featured ? (
        <figure
          className="fade-up mt-9 md:mt-12"
          style={{ animationDelay: "500ms" }}
        >
          <Link
            href={localePath(lang, `/projects/${featured.slug}`)}
            className="block"
            aria-label={`${t.common.viewCase}: ${featured.shortTitle}`}
          >
            <MediaSlot
              label={featured.shortTitle}
              note={t.common.imagePending}
              lottie={featured.lottie}
              image={featured.hero}
              ready={featured.coverReady}
              priority
              className="hover:bg-tone-2 aspect-[4/3] transition-colors duration-200 md:aspect-[2/1]"
            />
          </Link>
          <figcaption className="mt-3 flex flex-col justify-between gap-1 sm:flex-row">
            <span className="text-soft">
              {featured.shortTitle} · {featured.kind} · {featured.year}
            </span>
            <Link
              href={localePath(lang, `/projects/${featured.slug}`)}
              className="underline underline-offset-[5px] hover:decoration-2"
            >
              {t.common.viewCase} →
            </Link>
          </figcaption>
        </figure>
      ) : null}
    </section>
  );
}
