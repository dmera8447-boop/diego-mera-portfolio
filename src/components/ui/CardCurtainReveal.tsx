"use client";

import * as React from "react";
import {
  type HTMLMotionProps,
  type Variants,
  motion,
} from "framer-motion";

import { cn } from "@/lib/utils";

/**
 * CardCurtainReveal — primitivos compuestos para revelar contenido
 * con un efecto curtain (clip-path) al hacer hover.
 *
 * Uso:
 *   <CardCurtainReveal>
 *     <CardCurtainRevealBody>
 *       <Static title …/>
 *       <CardCurtainRevealDescription>
 *         (contenido oculto que aparece en hover)
 *       </CardCurtainRevealDescription>
 *     </CardCurtainRevealBody>
 *   </CardCurtainReveal>
 */

const curtainVariants: Variants = {
  visible: {
    clipPath: "polygon(0 0,100% 0,100% 100%,0 100%)",
    transition: { duration: 0.4, ease: [0.25, 1.5, 0.5, 1] },
  },
  hidden: {
    clipPath: "polygon(50% 0,50% 0,50% 100%,50% 100%)",
    transition: { duration: 0.3, ease: [0.25, 1.5, 0.5, 1] },
  },
};

interface CardCurtainRevealContextValue {
  isMouseIn: boolean;
}
const CardCurtainRevealContext = React.createContext<
  CardCurtainRevealContextValue | undefined
>(undefined);

function useCardCurtainRevealContext() {
  const context = React.useContext(CardCurtainRevealContext);
  if (!context) {
    throw new Error(
      "useCardCurtainRevealContext must be used within a CardCurtainReveal",
    );
  }
  return context;
}

export const CardCurtainReveal = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  const [isMouseIn, setIsMouseIn] = React.useState(false);
  // En dispositivos sin hover (mobile/touch) la cortina se queda siempre
  // revelada — los usuarios táctiles no podrían descubrir el contenido.
  const [hasHover, setHasHover] = React.useState(true);

  React.useEffect(() => {
    setHasHover(window.matchMedia("(hover: hover)").matches);
  }, []);

  const handleMouseEnter = React.useCallback(() => setIsMouseIn(true), []);
  const handleMouseLeave = React.useCallback(() => setIsMouseIn(false), []);

  const revealed = !hasHover || isMouseIn;

  return (
    <CardCurtainRevealContext.Provider value={{ isMouseIn: revealed }}>
      <div
        ref={ref}
        className={cn(
          "relative flex flex-col gap-2 overflow-hidden",
          className,
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
      </div>
    </CardCurtainRevealContext.Provider>
  );
});
CardCurtainReveal.displayName = "CardCurtainReveal";

export const CardCurtainRevealBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("flex-1 p-6", className)} {...props} />
  );
});
CardCurtainRevealBody.displayName = "CardCurtainRevealBody";

export const CardCurtainRevealDescription = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div">
>(({ className, ...props }, ref) => {
  const { isMouseIn } = useCardCurtainRevealContext();
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={curtainVariants}
      animate={isMouseIn ? "visible" : "hidden"}
      {...props}
    />
  );
});
CardCurtainRevealDescription.displayName = "CardCurtainRevealDescription";

export const CardCurtainRevealFooter = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div">
>(({ className, ...props }, ref) => {
  const { isMouseIn } = useCardCurtainRevealContext();
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={curtainVariants}
      animate={isMouseIn ? "visible" : "hidden"}
      {...props}
    />
  );
});
CardCurtainRevealFooter.displayName = "CardCurtainRevealFooter";

export const CardCurtainRevealTitle = React.forwardRef<
  HTMLHeadingElement,
  HTMLMotionProps<"h2">
>(({ className, ...props }, ref) => {
  const { isMouseIn } = useCardCurtainRevealContext();
  return (
    <motion.h2
      ref={ref}
      className={className}
      animate={isMouseIn ? { y: 0 } : { y: 170 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      {...props}
    />
  );
});
CardCurtainRevealTitle.displayName = "CardCurtainRevealTitle";

export const CardCurtain = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div">
>(({ className, ...props }, ref) => {
  const { isMouseIn } = useCardCurtainRevealContext();
  return (
    <motion.div
      ref={ref}
      className={cn(
        "pointer-events-none absolute inset-0 size-full mix-blend-difference",
        className,
      )}
      variants={curtainVariants}
      animate={isMouseIn ? "visible" : "hidden"}
      {...props}
    />
  );
});
CardCurtain.displayName = "CardCurtain";
