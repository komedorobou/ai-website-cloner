"use client";

import { type ReactNode } from "react";
import { motion, type Variants } from "motion/react";
import { useInViewReveal } from "@/hooks/use-in-view-reveal";

interface StaggerContainerProps {
  children: ReactNode;
  stagger?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export function StaggerContainer({
  children,
  stagger = 0.08,
  duration = 0.6,
  className,
  once = true,
}: StaggerContainerProps) {
  const { ref, isInView } = useInViewReveal<HTMLDivElement>({ once });

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
      },
    },
  };

  const childVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={childVariants}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={childVariants}>{children}</motion.div>
      }
    </motion.div>
  );
}
