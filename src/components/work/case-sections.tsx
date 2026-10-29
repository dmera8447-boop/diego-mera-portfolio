import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { InView } from "@/components/ui/InView";

/**
 * Bloques de sección para casos largos (usados desde el MDX). Ocupan todo el
 * ancho de la grilla .case-body; el texto sigue la misma columna de lectura.
 */

const step = (i: number) => ({ "--i": i }) as CSSProperties;

/** Lista de módulos: cada uno con su captura en laptop y un texto corto. */
export function Modules({ children }: { children?: ReactNode }) {
  return <div className="case-wide flex flex-col gap-16 md:gap-24">{children}</div>;
}

interface ModuleProps {
  title: string;
  /** Para quién es el módulo, p.ej. "Aseguradora" */
  audience: string;
  src: string;
  alt: string;
  children?: ReactNode;
}

export function Module({ title, audience, src, alt, children }: ModuleProps) {
  return (
    <InView className="grid gap-6 md:grid-cols-12 md:gap-8">
      <div className="flex flex-col gap-4 md:col-span-4 md:justify-end">
        <p className="text-soft reveal">{audience}</p>
        <h3 className="type-lead reveal font-medium" style={step(1)}>
          {title}
        </h3>
        <div className="reveal flex flex-col gap-4" style={step(2)}>
          {children}
        </div>
      </div>
      <figure
        className="bg-tone reveal p-4 sm:p-8 md:col-span-8 md:p-10"
        style={step(1)}
      >
        <Image
          src={src}
          alt={alt}
          width={3480}
          height={1936}
          sizes="(min-width: 768px) 60vw, 100vw"
          className="h-auto w-full"
        />
      </figure>
    </InView>
  );
}

/** Sección destacada a todo el ancho, sobre tinta. Reusa la grilla del cuerpo. */
export function Feature({ children }: { children?: ReactNode }) {
  return (
    <section className="case-bleed bg-ink text-on-ink">
      <div className="case-body px-edge pb-section">
        {children}
      </div>
    </section>
  );
}
