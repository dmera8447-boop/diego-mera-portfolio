import Image from "next/image";
import Link from "next/link";
import type {
  ComponentType,
  ImgHTMLAttributes,
  AnchorHTMLAttributes,
  ReactNode,
} from "react";

/**
 * Mapeo de componentes MDX → tokens del design system.
 * Tipografía cuidada para lectura larga (body-lg, max-w-prose).
 * Las imágenes pasan por next/image (optimización + lazy loading).
 */

function MdxImg({ src, alt }: ImgHTMLAttributes<HTMLImageElement>) {
  if (typeof src !== "string") return null;
  return (
    <figure className="my-12 border-2 border-primary bg-surface-container-high">
      <Image
        src={src}
        alt={alt ?? ""}
        width={1600}
        height={1000}
        sizes="(min-width:768px) 720px, 100vw"
        className="h-auto w-full object-cover"
      />
      {alt ? (
        <figcaption className="border-t border-accent-gray px-4 py-2 font-meta-code text-meta-code uppercase text-meta-text">
          {alt}
        </figcaption>
      ) : null}
    </figure>
  );
}

function MdxA({ href, children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isInternal = href?.startsWith("/") || href?.startsWith("#");
  const className =
    "border-b-2 border-primary pb-0.5 font-body-lg text-primary transition-none hover:bg-primary hover:text-on-primary";
  if (isInternal && href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...rest}
    >
      {children}
    </a>
  );
}

export const mdxComponents: Record<string, ComponentType<{ children?: ReactNode } & Record<string, unknown>>> = {
  h2: ({ children }: { children?: ReactNode }) => (
    <h2 className="mt-section-gap font-headline-lg text-headline-lg uppercase leading-none">
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: ReactNode }) => (
    <h3 className="mt-16 font-headline-md text-headline-md uppercase leading-none">
      {children}
    </h3>
  ),
  p: ({ children }: { children?: ReactNode }) => (
    <p className="mt-6 font-body-lg text-body-lg text-on-surface">{children}</p>
  ),
  ul: ({ children }: { children?: ReactNode }) => (
    <ul className="mt-6 list-none space-y-3 border-l-2 border-primary pl-6">
      {children}
    </ul>
  ),
  ol: ({ children }: { children?: ReactNode }) => (
    <ol className="mt-6 list-decimal space-y-3 pl-6 font-body-lg text-body-lg marker:font-meta-code marker:text-meta-text">
      {children}
    </ol>
  ),
  li: ({ children }: { children?: ReactNode }) => (
    <li className="font-body-lg text-body-lg text-on-surface">{children}</li>
  ),
  strong: ({ children }: { children?: ReactNode }) => (
    <strong className="font-meta-code uppercase tracking-wider text-primary">
      {children}
    </strong>
  ),
  blockquote: ({ children }: { children?: ReactNode }) => (
    <blockquote className="my-12 border-l-2 border-primary py-2 pl-6 font-headline-md text-headline-md uppercase leading-none">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-16 border-t border-accent-gray" />,
  img: MdxImg,
  a: MdxA,
};
