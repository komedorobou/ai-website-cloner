"use client";

import { type ReactNode } from "react";
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

  const variants: Variants = {
    hidden: getInitialTransform(direction, distance),
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
      style={{ willChange: isInView ? "auto" : "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
}
