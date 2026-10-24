import Image from "next/image";
import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ComponentType,
  ImgHTMLAttributes,
  ReactNode,
} from "react";

/**
 * Componentes MDX del cuerpo de un caso. El layout (titular de sección a la
 * izquierda, texto a la derecha) lo resuelve la grilla .case-body en CSS.
 */

function CaseImg({ src, alt }: ImgHTMLAttributes<HTMLImageElement>) {
  if (typeof src !== "string") return null;
  return (
    <figure>
      <Image
        src={src}
        alt={alt ?? ""}
        width={1600}
        height={1000}
        sizes="(min-width: 768px) 90vw, 100vw"
        className="bg-tone h-auto w-full"
      />
      {alt ? <figcaption className="text-soft mt-3">{alt}</figcaption> : null}
    </figure>
  );
}

function CaseLink({ href, children }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const className = "underline underline-offset-[5px] hover:decoration-2";
  if (href?.startsWith("/") || href?.startsWith("#")) {
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
    >
      {children}
    </a>
  );
}

type Props = { children?: ReactNode };

export const caseMdxComponents: Record<
  string,
  ComponentType<Props & Record<string, unknown>>
> = {
  h2: ({ children }: Props) => <h2 className="type-h2">{children}</h2>,
  h3: ({ children }: Props) => (
    <h3 className="type-title font-medium">{children}</h3>
  ),
  p: ({ children }: Props) => <p>{children}</p>,
  ul: ({ children }: Props) => (
    <ul className="flex list-disc flex-col gap-2 pl-5">{children}</ul>
  ),
  ol: ({ children }: Props) => (
    <ol className="flex list-decimal flex-col gap-2 pl-5">{children}</ol>
  ),
  blockquote: ({ children }: Props) => (
    <blockquote className="type-lead">{children}</blockquote>
  ),
  strong: ({ children }: Props) => (
    <strong className="font-medium">{children}</strong>
  ),
  // Las secciones se separan por espacio, no con líneas
  hr: () => null,
  img: CaseImg,
  a: CaseLink,
};
