import type { MetadataRoute } from "next";
import { localePath, locales } from "@/i18n/config";
import { getCaseStudySlugs } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, "");
  const slugs = await getCaseStudySlugs();
  const now = new Date();
  const paths = [
    { path: "/", priority: 1 },
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.8 },
    ...slugs.map((slug) => ({ path: `/projects/${slug}`, priority: 0.8 })),
  ];

  return paths.flatMap(({ path, priority }) =>
    locales.map((lang) => ({
      url: `${base}${localePath(lang, path)}`,
      lastModified: now,
      priority,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${base}${localePath(l, path)}`]),
        ),
      },
    })),
  );
}
