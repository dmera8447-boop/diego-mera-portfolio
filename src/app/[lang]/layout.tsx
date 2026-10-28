import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Host_Grotesk } from "next/font/google";
import { isLocale, locales, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { siteConfig } from "@/lib/site";
import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MobileCallBar } from "@/components/layout/MobileCallBar";
import "../globals.css";

// Una sola familia en todo el sitio (self-hosted por next/font)
const host = Host_Grotesk({
  weight: ["400", "500"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-host",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: t.meta.title, template: `%s — ${siteConfig.name}` },
    description: t.meta.description,
    authors: [{ name: siteConfig.fullName, url: siteConfig.url }],
    creator: siteConfig.fullName,
    openGraph: {
      type: "website",
      locale: t.meta.ogLocale,
      url: localePath(lang, "/"),
      title: t.meta.title,
      description: t.meta.description,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
    },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default async function LangLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.fullName,
    jobTitle: lang === "es" ? "Diseñador UX/UI" : "UX/UI Designer",
    url: siteConfig.url,
    email: `mailto:${siteConfig.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Samborondón",
      addressRegion: "Guayas",
      addressCountry: "EC",
    },
    sameAs: [siteConfig.linkedin],
  };

  return (
    <html lang={lang} className={host.variable}>
      <body id="top" className="pb-[84px] md:pb-0">
        <a
          href="#contenido"
          className="focus:bg-ink focus:text-on-ink sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-3"
        >
          {t.nav.skip}
        </a>
        <SiteNav lang={lang} t={t.nav} common={t.common} />
        <main id="contenido">{children}</main>
        <SiteFooter lang={lang} t={t} />
        <MobileCallBar lang={lang} t={t} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
