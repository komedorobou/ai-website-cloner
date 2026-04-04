"use client";

import { useEffect, useState } from "react";

export function useScrollProgress(elementRef?: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      if (elementRef?.current) {
        const el = elementRef.current;
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elHeight = el.offsetHeight;
        const scrolled = windowHeight - rect.top;
        const total = windowHeight + elHeight;
        setProgress(Math.max(0, Math.min(1, scrolled / total)));
      } else {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(docHeight > 0 ? Math.max(0, Math.min(1, scrollTop / docHeight)) : 0);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [elementRef]);

  return progress;
}
