"use client";

import { type ReactNode, useState } from "react";
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

/**
 * iOS Safari で opacity:0 + translateY な要素がビューポートに入った瞬間に
 * レイアウト再計算 → スクロール位置が飛ぶ問題を回避するため、
 * translateX/Y は使わず opacity のみでアニメーションする。
 * direction/distance は互換性のため引数として残すが無視する。
 */
export function ScrollReveal({
  children,
  direction: _direction = "up",
  distance: _distance = 32,
  duration = 0.7,
  delay = 0,
  className,
  once = true,
  threshold = 0.1,
}: ScrollRevealProps) {
  const { ref, isInView } = useInViewReveal<HTMLDivElement>({ threshold, once });
  const [hasAnimated, setHasAnimated] = useState(false);

  const variants: Variants = {
    hidden: { opacity: 0 },
    visible: {
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
      onAnimationComplete={() => {
        if (isInView) setHasAnimated(true);
      }}
      style={{ willChange: hasAnimated ? "auto" : "opacity" }}
    >
      {children}
    </motion.div>
  );
}
