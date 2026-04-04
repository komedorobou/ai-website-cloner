# Premium Website Builder Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** ai-website-cloner-template に5つの新エージェント（MotionArchitect, TypographyRefiner, AnimationImplementer, PerformanceOptimizer, ResponsiveQA, PixelPolisher）を追加し、Apple級のWebサイトを生成できる10エージェント体制にする。

**Architecture:** 既存の5フェーズパイプライン（Reconnaissance → Foundation → Build → Assembly → QA）を拡張し、アニメーション専門フェーズとQA強化を追加。GSAP ScrollTrigger + Motion v12 + Lenis でスクロールアニメーションを実現。全アニメーション系コンポーネントは `"use client"` で動作。

**Tech Stack:** Next.js 16, React 19, TypeScript strict, Tailwind CSS v4, shadcn/ui, GSAP 3.12 + @gsap/react, Motion v12, Lenis

---

## File Structure

```
Changes to existing files:
  package.json                    — 4つの新依存追加
  src/app/layout.tsx              — SmoothScrollラッパー追加
  AGENTS.md                       — アニメーション規約・6ブレークポイント定義追加
  .claude/skills/clone-website/SKILL.md — 10エージェント体制にパイプライン拡張

New files:
  src/hooks/use-scroll-progress.ts     — スクロール進捗フック
  src/hooks/use-in-view-reveal.ts      — viewport進入アニメーションフック
  src/hooks/use-lenis.ts               — Lenisスムーススクロールフック
  src/components/animation/smooth-scroll.tsx   — Lenis providerラッパー
  src/components/animation/scroll-reveal.tsx   — スクロール表示アニメーション
  src/components/animation/parallax-layer.tsx  — パララックス効果
  src/components/animation/sticky-section.tsx  — ピン留めセクション
  src/components/animation/stagger-container.tsx — スタガーアニメーション
  docs/research/ANIMATION_EXTRACTION.md        — アニメーション抽出テンプレート
```

---

### Task 1: Install Dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install animation libraries**

```bash
cd /Users/kitamata/ai-website-cloner && npm install gsap @gsap/react motion lenis
```

- [ ] **Step 2: Verify installation**

```bash
npm ls gsap @gsap/react motion lenis
```

Expected: All 4 packages listed with versions.

- [ ] **Step 3: Verify build still works**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: add GSAP, Motion v12, Lenis animation dependencies"
```

---

### Task 2: Create Lenis Smooth Scroll Hook

**Files:**
- Create: `src/hooks/use-lenis.ts`

- [ ] **Step 1: Create the hook file**

```typescript
// src/hooks/use-lenis.ts
"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}
```

- [ ] **Step 2: Verify typecheck**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/hooks/use-lenis.ts
git commit -m "feat: add useLenis hook for smooth scrolling"
```

---

### Task 3: Create Scroll Progress Hook

**Files:**
- Create: `src/hooks/use-scroll-progress.ts`

- [ ] **Step 1: Create the hook file**

```typescript
// src/hooks/use-scroll-progress.ts
"use client";

import { useEffect, useState } from "react";

/**
 * Returns a 0-1 value representing how far the user has scrolled
 * through the page (or a specific element if ref is provided).
 */
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
```

- [ ] **Step 2: Verify typecheck**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/hooks/use-scroll-progress.ts
git commit -m "feat: add useScrollProgress hook"
```

---

### Task 4: Create In-View Reveal Hook

**Files:**
- Create: `src/hooks/use-in-view-reveal.ts`

- [ ] **Step 1: Create the hook file**

```typescript
// src/hooks/use-in-view-reveal.ts
"use client";

import { useEffect, useRef, useState } from "react";

interface UseInViewRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/**
 * Returns a ref and a boolean indicating whether the element is in view.
 * When `once` is true (default), stays true after first intersection.
 */
export function useInViewReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewRevealOptions = {}
) {
  const { threshold = 0.1, rootMargin = "0px 0px -40px 0px", once = true } = options;
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isInView };
}
```

- [ ] **Step 2: Verify typecheck**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/hooks/use-in-view-reveal.ts
git commit -m "feat: add useInViewReveal hook"
```

---

### Task 5: Create SmoothScroll Component

**Files:**
- Create: `src/components/animation/smooth-scroll.tsx`

- [ ] **Step 1: Create the component file**

```typescript
// src/components/animation/smooth-scroll.tsx
"use client";

import { type ReactNode } from "react";
import { useLenis } from "@/hooks/use-lenis";

interface SmoothScrollProps {
  children: ReactNode;
}

/**
 * Client boundary wrapper for Lenis smooth scrolling.
 * Wrap {children} in layout.tsx with this component.
 * layout.tsx itself stays a Server Component.
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  useLenis();
  return <>{children}</>;
}
```

- [ ] **Step 2: Verify typecheck**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/animation/smooth-scroll.tsx
git commit -m "feat: add SmoothScroll client boundary component"
```

---

### Task 6: Create ScrollReveal Component

**Files:**
- Create: `src/components/animation/scroll-reveal.tsx`

- [ ] **Step 1: Create the component file**

```typescript
// src/components/animation/scroll-reveal.tsx
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

/**
 * Wraps children with a fade/slide animation triggered on viewport entry.
 * Respects prefers-reduced-motion by disabling transform animations.
 */
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
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Verify typecheck**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/animation/scroll-reveal.tsx
git commit -m "feat: add ScrollReveal animation component"
```

---

### Task 7: Create ParallaxLayer Component

**Files:**
- Create: `src/components/animation/parallax-layer.tsx`

- [ ] **Step 1: Create the component file**

```typescript
// src/components/animation/parallax-layer.tsx
"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

/**
 * Moves children at a different rate than scroll speed.
 * speed > 0: moves slower (background feel)
 * speed < 0: moves faster (foreground feel)
 */
export function ParallaxLayer({
  children,
  speed = 0.3,
  className,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);

  return (
    <div ref={ref} className={className} style={{ position: "relative", overflow: "hidden" }}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 2: Verify typecheck**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/animation/parallax-layer.tsx
git commit -m "feat: add ParallaxLayer animation component"
```

---

### Task 8: Create StickySection Component

**Files:**
- Create: `src/components/animation/sticky-section.tsx`

- [ ] **Step 1: Create the component file**

```typescript
// src/components/animation/sticky-section.tsx
"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StickySectionProps {
  children: ReactNode;
  /** Height multiplier for the scroll area (e.g. 2 = 200vh of scroll distance) */
  scrollLength?: number;
  className?: string;
  /** Called with scroll progress 0-1 during the pinned phase */
  onProgress?: (progress: number) => void;
}

/**
 * Pins children in place while the user scrolls through `scrollLength` viewports.
 * Use onProgress to drive scroll-linked animations within the pinned section.
 */
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
```

- [ ] **Step 2: Verify typecheck**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/animation/sticky-section.tsx
git commit -m "feat: add StickySection GSAP ScrollTrigger component"
```

---

### Task 9: Create StaggerContainer Component

**Files:**
- Create: `src/components/animation/stagger-container.tsx`

- [ ] **Step 1: Create the component file**

```typescript
// src/components/animation/stagger-container.tsx
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

/**
 * Animates direct children in sequence with a stagger delay.
 * Each child fades up when the container enters the viewport.
 */
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
```

- [ ] **Step 2: Verify typecheck**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/animation/stagger-container.tsx
git commit -m "feat: add StaggerContainer animation component"
```

---

### Task 10: Wire SmoothScroll into Layout

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Add SmoothScroll wrapper to layout.tsx**

Update `src/app/layout.tsx` — add the import and wrap `{children}` with `<SmoothScroll>`:

```typescript
// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/animation/smooth-scroll";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Website Clone",
  description: "Pixel-perfect website clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

Expected: Build succeeds. `layout.tsx` remains a Server Component (only `SmoothScroll` is `"use client"`).

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: wire SmoothScroll into root layout as client boundary"
```

---

### Task 11: Create Animation Extraction Template

**Files:**
- Create: `docs/research/ANIMATION_EXTRACTION.md`

- [ ] **Step 1: Create the template**

```markdown
# Animation Extraction Template

Use this template to document every animation on the target site.
Fill out one entry per animated element or element group.

---

## [要素名 / セクション名]

- **トリガー:** scroll / hover / click / viewport-enter / time
- **トリガー詳細:** (例: IntersectionObserver threshold: 0.3 / scroll position: 500px / hover on parent)
- **アニメーションタイプ:** fade-in / slide-up / slide-down / slide-left / slide-right / scale / rotate / parallax / pin / frame-sequence / color-shift / clip-path-reveal
- **開始状態:** (例: opacity: 0, translateY: 40px, scale: 0.95)
- **終了状態:** (例: opacity: 1, translateY: 0, scale: 1)
- **duration:** (例: 0.8s)
- **easing:** (例: cubic-bezier(0.22, 1, 0.36, 1) / ease-out / spring)
- **delay:** (例: 0s)
- **stagger:** (例: 0.1s per child / none)
- **scrub:** true / false (スクロール位置に連動するか)
- **pin:** true / false (セクションがピン留めされるか)
- **prefers-reduced-motion fallback:** (例: instant opacity transition / no animation)
- **実装方針:** GSAP ScrollTrigger / Motion useInView / Motion useScroll+useTransform / CSS animation / CSS transition
- **対象コンポーネント:** (例: ScrollReveal / ParallaxLayer / StickySection / StaggerContainer / custom)
- **備考:** (特殊な挙動、依存関係、注意点)

---

## 記入例: ヒーローテキスト フェードイン

- **トリガー:** viewport-enter
- **トリガー詳細:** IntersectionObserver threshold: 0.1
- **アニメーションタイプ:** fade-in + slide-up
- **開始状態:** opacity: 0, translateY: 32px
- **終了状態:** opacity: 1, translateY: 0
- **duration:** 0.7s
- **easing:** cubic-bezier(0.22, 1, 0.36, 1)
- **delay:** 0s
- **stagger:** 0.08s per child (h1, p, button)
- **scrub:** false
- **pin:** false
- **prefers-reduced-motion fallback:** instant opacity: 1, no transform
- **実装方針:** Motion useInView + StaggerContainer
- **対象コンポーネント:** StaggerContainer + ScrollReveal
- **備考:** なし
```

- [ ] **Step 2: Commit**

```bash
git add docs/research/ANIMATION_EXTRACTION.md
git commit -m "feat: add animation extraction template for MotionArchitect agent"
```

---

### Task 12: Update AGENTS.md

**Files:**
- Modify: `AGENTS.md`

- [ ] **Step 1: Add animation coding standards and breakpoint definitions to AGENTS.md**

Append the following section to the end of `AGENTS.md` (before any `@file` import directives):

```markdown

## Animation Coding Standards

### Libraries
- **Scroll-linked animations:** GSAP ScrollTrigger via `useGSAP()` from `@gsap/react`
- **Viewport-triggered animations:** Motion v12 via `motion/react`
- **Smooth scrolling:** Lenis via `useLenis()` hook
- **Do NOT use:** framer-motion (incompatible with React 19), manual requestAnimationFrame loops for scroll handling

### Rules
1. **Every file using GSAP, Motion, or Lenis MUST have `"use client"` at the top.**
2. **GSAP cleanup:** `useGSAP` automatically calls `context.revert()` on unmount. Do NOT manually call `ScrollTrigger.kill()` — it destroys all instances globally.
3. **GSAP registration:** Call `gsap.registerPlugin(ScrollTrigger)` once at module scope in each file that uses ScrollTrigger.
4. **Reduced motion:** All animated components MUST respect `prefers-reduced-motion`. Use `@media (prefers-reduced-motion: reduce)` in CSS or check `window.matchMedia('(prefers-reduced-motion: reduce)').matches` in JS.
5. **Component modification:** When adding animations to existing components, use targeted edits (add wrappers, imports, props). Never rewrite the entire component.

### Reusable Animation Components
Located in `src/components/animation/`:
- `ScrollReveal` — viewport-enter fade/slide (Motion v12)
- `ParallaxLayer` — depth-based parallax (Motion v12)
- `StickySection` — GSAP ScrollTrigger pin with progress callback
- `StaggerContainer` — sequential child reveal (Motion v12)
- `SmoothScroll` — Lenis provider (wraps children in layout.tsx)

### Reusable Hooks
Located in `src/hooks/`:
- `useScrollProgress` — 0-1 scroll progress value
- `useInViewReveal` — IntersectionObserver-based visibility
- `useLenis` — Lenis initialization and lifecycle

## Responsive Breakpoints

Six breakpoints for extraction and QA:
| Name | Width | Device |
|------|-------|--------|
| xs | 320px | iPhone SE |
| sm | 390px | iPhone |
| md | 768px | iPad portrait |
| lg | 1024px | iPad landscape |
| xl | 1280px | Small desktop |
| 2xl | 1440px | Large desktop |

All screenshots, responsive sweeps, and visual QA diffs use these 6 breakpoints.

## Agent Roles (Extended Pipeline)

| # | Agent | Phase | Role |
|---|-------|-------|------|
| 1 | SiteAnalyzer | 1 | Reconnaissance + 6-breakpoint screenshots |
| 2 | DesignTokenExtractor | 2 | Design tokens (orchestrator-direct) |
| 3 | MotionArchitect | 2 | Animation analysis → MOTION_SPEC.md (worktree) |
| 4 | AssetCurator | 2 | Asset download + optimization (worktree) |
| 5 | LayoutEngineer | 3 | Component build (existing builder dispatch) |
| 6 | TypographyRefiner | 3 | Typography precision pass |
| 7 | AnimationImplementer | 4 | Apply animations from MOTION_SPEC.md |
| 8 | PerformanceOptimizer | 5 | Lighthouse 90+, code splitting, lazy loading |
| 9 | ResponsiveQA | 5 | 6-breakpoint visual diff + auto-fix |
| 10 | PixelPolisher | 5 | Final refinement pass |
```

- [ ] **Step 2: Run sync script**

```bash
bash scripts/sync-agent-rules.sh
```

Expected: Platform-specific instruction files regenerated.

- [ ] **Step 3: Verify the generated files**

```bash
git diff --stat
```

Expected: Multiple platform-specific files updated (`.github/copilot-instructions.md`, etc.)

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: update AGENTS.md with animation standards and 6-breakpoint definitions"
```

---

### Task 13: Update SKILL.md — Phase 1 (6 Breakpoints)

**Files:**
- Modify: `.claude/skills/clone-website/SKILL.md`

- [ ] **Step 1: Find and update the screenshot breakpoints in Phase 1**

In `.claude/skills/clone-website/SKILL.md`, find the line that reads:

```
Take full-page screenshots at desktop (1440px) and mobile (390px)
```

Replace with:

```
Take full-page screenshots at 6 breakpoints: 320px (iPhone SE), 390px (iPhone), 768px (iPad portrait), 1024px (iPad landscape), 1280px (small desktop), 1440px (large desktop)
```

- [ ] **Step 2: Find and update the responsive sweep breakpoints**

Find the responsive sweep section that lists 3 widths (1440px, 768px, 390px). Replace with the 6 breakpoints: 320px, 390px, 768px, 1024px, 1280px, 1440px.

- [ ] **Step 3: Add animation parameter extraction to the Interaction Sweep**

After the existing Interaction Sweep section, add:

```markdown
#### Animation Parameter Extraction

For every animated element detected during the interaction sweep, record detailed parameters using the template in `docs/research/ANIMATION_EXTRACTION.md`:
- Trigger mechanism (scroll position, IntersectionObserver threshold, hover, click, time)
- Start and end CSS states (exact computed values via getComputedStyle)
- Transition duration, easing curve, delay
- Whether the animation is scroll-scrubbed (progress linked to scroll position)
- Whether the section is pinned during the animation
- Stagger timing for grouped elements
- The recommended implementation approach (GSAP ScrollTrigger, Motion v12, or CSS)

Output these findings to `docs/research/MOTION_SPEC.md` alongside the existing `BEHAVIORS.md`.
```

- [ ] **Step 4: Commit**

```bash
git add .claude/skills/clone-website/SKILL.md
git commit -m "feat: SKILL.md Phase 1 — expand to 6 breakpoints + animation extraction"
```

---

### Task 14: Update SKILL.md — Phase 2 (MotionArchitect Dispatch)

**Files:**
- Modify: `.claude/skills/clone-website/SKILL.md`

- [ ] **Step 1: Update Phase 2 to allow MotionArchitect dispatch**

Find the Phase 2 section that begins with "This is sequential. Do it yourself (not delegated to an agent)". Replace the opening instruction with:

```markdown
This phase builds the foundation. The orchestrator handles design tokens and TypeScript types directly (these touch shared files). Two additional agents can be dispatched in parallel worktrees:

**Orchestrator-direct (sequential):**
1. Update `layout.tsx` fonts
2. Update `globals.css` color tokens and keyframes
3. Create TypeScript interfaces in `src/types/`
4. Extract SVG icons to `src/components/icons.tsx`

**Parallel worktree dispatch:**
- **MotionArchitect agent:** Analyze all animations on the target site using browser MCP. Scroll through the entire page, observe every scroll-triggered, hover, and click animation. Record findings using the `docs/research/ANIMATION_EXTRACTION.md` template. Output: `docs/research/MOTION_SPEC.md`. This agent reads only — it does NOT modify any source files.
- **AssetCurator agent:** Download all binary assets (images, videos, fonts, favicons). Output: `public/images/`, `public/videos/`, `public/seo/`, `scripts/download-assets.mjs`. This agent writes only to `public/` and `scripts/`.

Wait for all three tracks to complete before proceeding to Phase 3.
```

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/clone-website/SKILL.md
git commit -m "feat: SKILL.md Phase 2 — add MotionArchitect + AssetCurator parallel dispatch"
```

---

### Task 15: Update SKILL.md — Phase 3 (TypographyRefiner)

**Files:**
- Modify: `.claude/skills/clone-website/SKILL.md`

- [ ] **Step 1: Add TypographyRefiner step after builder merge**

After the builder merge loop in Phase 3 (after all builder branches are merged and build passes), add:

```markdown
#### Typography Refinement Pass

After all builders have merged and the build passes, run a TypographyRefiner pass:

1. Implement fluid type scaling using `clamp()` for all heading sizes
2. Fine-tune `letter-spacing` and `line-height` per heading level to match the target
3. Apply `font-display: swap` to all custom fonts
4. Add `text-wrap: balance` to headings and `text-wrap: pretty` to body text where appropriate
5. Verify the build passes after typography changes: `npm run build`
```

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/clone-website/SKILL.md
git commit -m "feat: SKILL.md Phase 3 — add TypographyRefiner pass after builder merge"
```

---

### Task 16: Update SKILL.md — Phase 4 (Animation Implementation)

**Files:**
- Modify: `.claude/skills/clone-website/SKILL.md`

- [ ] **Step 1: Insert new Phase 4 between existing Phase 3 (Build) and Phase 4 (Page Assembly)**

Renumber existing Phase 4 (Page Assembly) → Phase 5, and existing Phase 5 (Visual QA) → Phase 6. Insert new Phase 4:

```markdown
## Phase 4: Animation Implementation

Using the `docs/research/MOTION_SPEC.md` produced by MotionArchitect in Phase 2, apply animations to all built components.

### Setup
1. Verify `SmoothScroll` wrapper is in `layout.tsx` (it should already be wired from the template)
2. Verify GSAP ScrollTrigger is available: `import gsap from "gsap"; import { ScrollTrigger } from "gsap/ScrollTrigger"; gsap.registerPlugin(ScrollTrigger);`

### For Each Animated Element in MOTION_SPEC.md

1. Read the element's spec entry (trigger, states, timing, implementation approach)
2. Choose the appropriate animation primitive:
   - **Viewport-enter fade/slide:** Wrap with `<ScrollReveal>` from `src/components/animation/scroll-reveal.tsx`
   - **Staggered group:** Wrap children with `<StaggerContainer>` from `src/components/animation/stagger-container.tsx`
   - **Parallax depth:** Wrap with `<ParallaxLayer>` from `src/components/animation/parallax-layer.tsx`
   - **Pinned section with scroll-scrub:** Use `<StickySection>` from `src/components/animation/sticky-section.tsx`
   - **Custom/complex:** Write inline `useGSAP` with the exact parameters from the spec
3. Add `"use client"` to the component file if not already present
4. Do NOT rewrite the entire component. Add animation wrappers around existing JSX, add imports, add refs where needed.

### Reduced Motion Fallback
Every animated component must work with `prefers-reduced-motion: reduce`. At minimum, set `opacity: 1` with no transform delay so content is immediately visible.

### Verification
1. Run `npm run build` — must pass
2. Run `npx tsc --noEmit` — must pass
3. Visually verify in browser: scroll through the page and confirm animations trigger correctly
```

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/clone-website/SKILL.md
git commit -m "feat: SKILL.md Phase 4 — add Animation Implementation phase"
```

---

### Task 17: Update SKILL.md — Phase 6 (Enhanced QA + Polish)

**Files:**
- Modify: `.claude/skills/clone-website/SKILL.md`

- [ ] **Step 1: Expand the Visual QA phase (now Phase 6) with PerformanceOptimizer, ResponsiveQA, and PixelPolisher**

Replace the existing Visual QA Diff section with:

```markdown
## Phase 6: QA & Polish

### Step 1: Performance Optimization

Before visual QA, optimize for performance:
1. Check all `<img>` tags use `next/image` with proper `width`, `height`, and `sizes`
2. Add `dynamic(() => import(...), { ssr: false })` to below-fold animation-heavy sections
3. Remove unnecessary `will-change` properties (only keep on elements actively animating)
4. Verify fonts use `font-display: swap` and appropriate subsets
5. Run `npm run build` and check the build output for oversized chunks
6. Target: Lighthouse Performance score 90+

### Step 2: Responsive QA (6 Breakpoints)

For each of the 6 breakpoints (320px, 390px, 768px, 1024px, 1280px, 1440px):
1. Take a full-page screenshot of the cloned site at this width
2. Compare against the original site screenshot from Phase 1
3. For each discrepancy, classify:
   - **Critical (auto-fix):** Layout collapse, element overflow, element disappearance, obvious spacing/font mismatch
   - **Minor (report only):** 1-2px alignment differences, subtle color variations
4. Fix all critical issues immediately
5. Document all findings in `docs/research/QA_REPORT.md`

### Step 3: Pixel Polish

Final refinement pass using `docs/research/QA_REPORT.md`:
1. Fix all remaining minor QA issues
2. Add micro-details: `backdrop-blur` on nav, `::selection` color, smooth focus rings
3. Fine-tune animation easing curves by comparing side-by-side with the target
4. Verify OGP meta tags, favicon, and page title
5. Final `npm run build` — must pass clean
6. Final `npx tsc --noEmit` — must pass with zero errors
```

- [ ] **Step 2: Commit**

```bash
git add .claude/skills/clone-website/SKILL.md
git commit -m "feat: SKILL.md Phase 6 — enhanced QA with 6-breakpoint responsive + polish"
```

---

### Task 18: Sync Skills to All Platforms

**Files:**
- Modified by script: Multiple platform-specific skill files

- [ ] **Step 1: Run skill sync script**

```bash
node scripts/sync-skills.mjs
```

Expected: Skill files regenerated for all 9 platforms.

- [ ] **Step 2: Verify generated files**

```bash
git diff --stat
```

Expected: Files updated in `.codex/`, `.github/`, `.cursor/`, `.windsurf/`, `.gemini/`, `.opencode/`, `.augment/`, `.continue/`, `.amazonq/`.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: sync updated skill to all AI platforms"
```

---

### Task 19: Full Build Verification

**Files:**
- No file changes (verification only)

- [ ] **Step 1: Run full check suite**

```bash
npm run check
```

This runs: `npm run lint && npm run typecheck && npm run build`

Expected: All 3 checks pass.

- [ ] **Step 2: Start dev server and verify**

```bash
npm run dev
```

Expected: Dev server starts at `localhost:3000`. The placeholder page renders. No console errors.

- [ ] **Step 3: Verify smooth scroll**

Open `localhost:3000` in browser. Scroll the page — Lenis smooth scroll should be active (scroll should feel smoother/inertial vs. native).

- [ ] **Step 4: Final commit (if any fixes needed)**

```bash
git add -A
git commit -m "fix: resolve any build/lint issues from full verification"
```

---

## Summary

| Task | Description | New Files | Modified Files |
|------|-------------|-----------|----------------|
| 1 | Install deps | — | package.json |
| 2 | useLenis hook | use-lenis.ts | — |
| 3 | useScrollProgress hook | use-scroll-progress.ts | — |
| 4 | useInViewReveal hook | use-in-view-reveal.ts | — |
| 5 | SmoothScroll component | smooth-scroll.tsx | — |
| 6 | ScrollReveal component | scroll-reveal.tsx | — |
| 7 | ParallaxLayer component | parallax-layer.tsx | — |
| 8 | StickySection component | sticky-section.tsx | — |
| 9 | StaggerContainer component | stagger-container.tsx | — |
| 10 | Wire SmoothScroll into layout | — | layout.tsx |
| 11 | Animation extraction template | ANIMATION_EXTRACTION.md | — |
| 12 | Update AGENTS.md | — | AGENTS.md + synced files |
| 13 | SKILL.md Phase 1 (6 breakpoints) | — | SKILL.md |
| 14 | SKILL.md Phase 2 (MotionArchitect) | — | SKILL.md |
| 15 | SKILL.md Phase 3 (TypographyRefiner) | — | SKILL.md |
| 16 | SKILL.md Phase 4 (Animation) | — | SKILL.md |
| 17 | SKILL.md Phase 6 (QA + Polish) | — | SKILL.md |
| 18 | Sync skills to platforms | — | 9 platform files |
| 19 | Full build verification | — | — |
