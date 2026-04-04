"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StickySectionProps {
  children: ReactNode;
  scrollLength?: number;
  className?: string;
  onProgress?: (progress: number) => void;
}

export function StickySection({
  children,
  scrollLength = 2,
  className,
  onProgress,
}: StickySectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!triggerRef.current || !containerRef.current) return;

      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: "top top",
        end: `+=${window.innerHeight * scrollLength}`,
        pin: containerRef.current,
        scrub: true,
        onUpdate: (self) => {
          onProgress?.(self.progress);
        },
      });
    },
    { scope: triggerRef }
  );

  return (
    <div ref={triggerRef}>
      <div ref={containerRef} className={className}>
        {children}
      </div>
    </div>
  );
}
