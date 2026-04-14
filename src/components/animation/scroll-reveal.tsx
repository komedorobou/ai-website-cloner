"use client";

import { type ReactNode, useState, useEffect } from "react";
import { motion, type Variants } from "motion/react";
import { useInViewReveal } from "@/hooks/use-in-view-reveal";

type Direction = "up" | "down" | "left" | "right" | "none";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: Direction;
  distance?: number;
  duration?: number;
  delay?: number;
  className?: string;
  once?: boolean;
  threshold?: number;
}

const getInitialTransform = (direction: Direction, distance: number) => {
  switch (direction) {
    case "up": return { y: distance, opacity: 0 };
    case "down": return { y: -distance, opacity: 0 };
    case "left": return { x: distance, opacity: 0 };
    case "right": return { x: -distance, opacity: 0 };
    case "none": return { opacity: 0 };
  }
};

export function ScrollReveal({
  children,
  direction = "up",
  distance = 32,
  duration = 0.7,
  delay = 0,
  className,
  once = true,
  threshold = 0.1,
}: ScrollRevealProps) {
  const { ref, isInView } = useInViewReveal<HTMLDivElement>({ threshold, once });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
  }, []);

  // Mobile: opacity only (prevents iOS Safari scroll warp)
  // PC: full translateY + opacity + blur for premium feel
  const variants: Variants = isMobile
    ? {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
        },
      }
    : {
        hidden: {
          ...getInitialTransform(direction, distance),
          filter: "blur(4px)",
        },
        visible: {
          x: 0,
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          transition: { duration: duration * 1.2, delay, ease: [0.16, 1, 0.3, 1] },
        },
      };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
      onAnimationComplete={() => {
        if (isInView) setHasAnimated(true);
      }}
      style={{ willChange: hasAnimated ? "auto" : "opacity, transform, filter" }}
    >
      {children}
    </motion.div>
  );
}
