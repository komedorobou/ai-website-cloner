"use client";

import { type ReactNode } from "react";
import { useLenis } from "@/hooks/use-lenis";

interface SmoothScrollProps {
  children: ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  useLenis();
  return <>{children}</>;
}
