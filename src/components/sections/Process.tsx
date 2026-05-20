"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Search,
  Route,
  Target,
  LayoutGrid,
  MousePointerClick,
  FlaskConical,
  Boxes,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * PROCESO DE DISEÑO — réplica del patrón "The Process" de Stitch
 * (pantalla About & Process), adaptado a 7 fases:
 *   1 Investigación · 2 User Journeys · 3 Benchmarking · 4 Wireframes
 *   5 Prototipos · 6 Pruebas de usabilidad · 7 Design System
 *
 * Disposición: grid brutalista 3-col (mobile: 1-col). Filas 1-2 contienen
 * 3 fases; la 7ª (Design System) ocupa toda la fila (col-span-3) como
 * "monumento" final — asimetría coherente con el design system "Structural
 * Monolith".
 *
 * Semántica: <ol>/<li> (orden importa).
 * Animación: stagger fade-in + slide-up al entrar en viewport (Framer Motion),
 * respetando prefers-reduced-motion.
 */

interface Step {
  title: string;
  description: string;
  icon: LucideIcon;
}

const steps: Step[] = [
  {
    title: "Investigación",
    description:
      "Entrevistas, encuestas y análisis de comportamiento para entender al usuario real, no al usuario imaginado.",
    icon: Search,
  },
  {
    title: "User Journeys",
    description:
      "Mapeo del recorrido completo del usuario para identificar fricciones, oportunidades y momentos críticos.",
    icon: Route,
  },
  {
    title: "Benchmarking",
    description:
      "Análisis de soluciones líderes del mercado para encontrar patrones consolidados y oportunidades de diferenciación.",
    icon: Target,
  },
  {
    title: "Wireframes",
    description:
      "Exploración rápida de estructuras y flujos antes de invertir tiempo en el detalle visual.",
    icon: LayoutGrid,
  },
  {
    title: "Prototipos",
    description:
      "Alta fidelidad en Figma para validar interacciones, microinteracciones y decisiones de diseño con el equipo.",
    icon: MousePointerClick,
  },
  {
    title: "Pruebas de usabilidad",
    description:
      "Validación con usuarios reales en cada iteración. Un problema detectado aquí cuesta minutos; en producción, sprints.",
    icon: FlaskConical,
  },
  {
    title: "Design System",
    description:
      "Construcción de la base de componentes, tokens y patrones que garantizan coherencia, accesibilidad y escalabilidad.",
    icon: Boxes,
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Process() {
  const reduce = useReducedMotion();
  const lastIdx = steps.length - 1;

  return (
    <section id="proceso" aria-labelledby="proceso-title">
      <div className="border-b border-accent-gray px-margin-edge py-12">
        <p className="mb-4 font-meta-code text-meta-code uppercase text-meta-text">
          {"// PROCESO_DE_DISENO"}
        </p>
        <h2
          id="proceso-title"
          className="font-headline-lg text-headline-lg uppercase"
        >
          Proceso de diseño
        </h2>
      </div>

      <motion.ol
        variants={reduce ? undefined : containerVariants}
        initial={reduce ? false : "hidden"}
        whileInView={reduce ? undefined : "visible"}
        viewport={{ once: true, amount: 0.1 }}
        className="grid list-none grid-cols-1 border-b border-accent-gray md:grid-cols-3"
      >
        {steps.map((step, i) => {
          const Icon = step.icon;
          const isLast = i === lastIdx;
          const isRightCol = i % 3 === 2;
          return (
            <motion.li
              key={step.title}
              variants={reduce ? undefined : itemVariants}
              className={cn(
                "flex min-h-[400px] flex-col p-margin-edge",
                !isLast && "border-b border-accent-gray",
                !isLast && !isRightCol && "md:border-r md:border-accent-gray",
                isLast && "md:col-span-3",
              )}
            >
              <div className="flex items-center justify-between">
                <Icon aria-hidden="true" size={32} strokeWidth={1.5} />
                <span className="font-meta-code text-meta-code uppercase text-meta-text">
                  {`FASE_${String(i + 1).padStart(2, "0")}`}
                </span>
              </div>
              <div className="mt-auto">
                <h3 className="mb-4 mt-12 font-headline-md text-headline-md uppercase leading-none">
                  {step.title}
                </h3>
                <p className="font-body-md text-body-md text-secondary">
                  {step.description}
                </p>
              </div>
            </motion.li>
          );
        })}
      </motion.ol>
    </section>
  );
}
