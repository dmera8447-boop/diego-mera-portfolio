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
import {
  CardCurtainReveal,
  CardCurtainRevealBody,
  CardCurtainRevealDescription,
} from "@/components/ui/CardCurtainReveal";

/**
 * PROCESO DE DISEÑO — 7 fases en grid 3-col (mobile: 1-col).
 * Estado por defecto: solo el nombre de la fase centrado.
 * Hover (desktop): cortina negra desde el centro revela el detalle
 * completo (icono + fase_NN + título + descripción).
 * Touch/mobile: la cortina queda siempre abierta (sin posibilidad de hover).
 *
 * Stagger fade-in al entrar al viewport (Framer Motion), respeta
 * prefers-reduced-motion.
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
          const faseLabel = `FASE_${String(i + 1).padStart(2, "0")}`;

          return (
            <motion.li
              key={step.title}
              variants={reduce ? undefined : itemVariants}
              className={cn(
                "min-h-[400px]",
                !isLast && "border-b border-accent-gray",
                !isLast && !isRightCol && "md:border-r md:border-accent-gray",
                isLast && "md:col-span-3",
              )}
            >
              <CardCurtainReveal className="h-full" data-cursor-hover>
                <CardCurtainRevealBody className="relative flex h-full items-center justify-center p-margin-edge text-center">
                  {/* Estado por defecto: solo el nombre de la fase, centrado.
                      aria-hidden porque el h3 semántico vive en la cortina
                      (siempre presente en el DOM, lo leen los screen readers). */}
                  <span
                    aria-hidden="true"
                    className="block break-words font-headline-lg text-headline-lg uppercase leading-none text-primary"
                  >
                    {step.title}
                  </span>

                  {/* Cortina: cubre toda la cell con el detalle al hacer hover */}
                  <CardCurtainRevealDescription className="absolute inset-0 flex flex-col justify-between bg-primary p-margin-edge text-left text-on-primary">
                    <div className="flex items-center justify-between">
                      <Icon
                        size={32}
                        strokeWidth={1.5}
                        aria-hidden="true"
                        className="text-on-primary"
                      />
                      <span className="font-meta-code text-meta-code uppercase text-on-primary-container">
                        {faseLabel}
                      </span>
                    </div>
                    <div>
                      <h3 className="mb-4 font-headline-md text-headline-md uppercase leading-none text-on-primary">
                        {step.title}
                      </h3>
                      <p className="font-body-md text-body-md text-on-primary-container">
                        {step.description}
                      </p>
                    </div>
                  </CardCurtainRevealDescription>
                </CardCurtainRevealBody>
              </CardCurtainReveal>
            </motion.li>
          );
        })}
      </motion.ol>
    </section>
  );
}
