import { siteConfig, socialLinks } from "@/lib/site";

/**
 * Footer — réplica del diseño de Stitch ("Contact & Connect" / Home).
 * Borde superior 2px, logotipo Anton, enlaces sociales reales, copyright.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 flex w-full flex-col items-start justify-between border-t-2 border-border-dark bg-background px-margin-edge py-section-gap md:flex-row md:items-center">
      <p className="mb-8 font-headline-lg text-headline-lg text-primary md:mb-0">
        DIEGO_MERA
      </p>

      <div className="flex flex-col gap-8 md:w-1/2 md:gap-4">
        <ul className="grid grid-cols-2 gap-4">
          {socialLinks.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  social.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="-ml-2 inline-block border border-transparent px-2 py-1 font-meta-code text-meta-code uppercase text-secondary transition-none hover:border-border-dark hover:text-primary"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-8 w-full border-t border-accent-gray pt-4 font-meta-code text-meta-code uppercase text-meta-text md:mt-4">
          © {year} {siteConfig.name}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
