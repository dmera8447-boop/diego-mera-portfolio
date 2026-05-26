import type { Metadata, Viewport } from "next";
import { Anton, Inter, JetBrains_Mono } from "next/font/google";
import { siteConfig } from "@/lib/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GridOverlay } from "@/components/layout/GridOverlay";
import { Preloader } from "@/components/layout/Preloader";
import { Cursor } from "@/components/ui/Cursor";
import "./globals.css";

// Titulares brutalistas — Anton (un solo peso)
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

// Cuerpo — Inter
const inter = Inter({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Metadatos técnicos — JetBrains Mono
const jetbrainsMono = JetBrains_Mono({
  weight: "500",
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.role}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "UX/UI Designer",
    "Diseño de producto",
    "Design Systems",
    "Dashboards B2B",
    "SaaS",
    "Diego Mera",
    "Ecuador",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "es_EC",
    url: siteConfig.url,
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f9f9f9",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${anton.variable} ${inter.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="grid-bg relative flex min-h-full flex-col bg-background text-on-surface antialiased">
        <Preloader />
        <Cursor />
        {/* JSON-LD Person — perfil estructurado para Google Knowledge Graph */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: siteConfig.fullName,
              alternateName: siteConfig.name,
              url: siteConfig.url,
              jobTitle: siteConfig.role,
              email: `mailto:${siteConfig.email}`,
              sameAs: ["https://linkedin.com/in/diegomerarojas"],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Samborondón",
                addressRegion: "Guayas",
                addressCountry: "EC",
              },
              knowsAbout: [
                "UX/UI Design",
                "Design Systems",
                "Dashboards B2B",
                "SaaS",
                "Product Design",
              ],
            }),
          }}
        />
        <a
          href="#main"
          className="sr-only z-[60] border-2 border-border-dark bg-background px-4 py-2 font-meta-code text-meta-code uppercase text-primary focus:not-sr-only focus:fixed focus:left-margin-edge focus:top-base"
        >
          Saltar al contenido
        </a>
        <GridOverlay />
        <Navbar />
        <main id="main" tabIndex={-1} className="relative z-10 flex-1 outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
