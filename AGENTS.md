<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Website Reverse-Engineer Template

## What This Is
A reusable template for reverse-engineering any website into a clean, modern Next.js codebase using AI coding agents. The Next.js + shadcn/ui + Tailwind v4 base is pre-scaffolded — just run `/clone-website <url1> [<url2> ...]`.

## Tech Stack
- **Framework:** Next.js 16 (App Router, React 19, TypeScript strict)
- **UI:** shadcn/ui (Radix primitives, Tailwind CSS v4, `cn()` utility)
- **Icons:** Lucide React (default — will be replaced/supplemented by extracted SVGs)
- **Styling:** Tailwind CSS v4 with oklch design tokens
- **Deployment:** Vercel

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — ESLint check
- `npm run typecheck` — TypeScript check
- `npm run check` — Run lint + typecheck + build

## Code Style
- TypeScript strict mode, no `any`
- Named exports, PascalCase components, camelCase utils
- Tailwind utility classes, no inline styles
- 2-space indentation
- Responsive: mobile-first

## Design Principles
- **Pixel-perfect emulation** — match the target's spacing, colors, typography exactly
- **No personal aesthetic changes during emulation phase** — match 1:1 first, customize later
- **Real content** — use actual text and assets from the target site, not placeholders
- **Beauty-first** — every pixel matters

## Project Structure
```
src/
  app/              # Next.js routes
  components/       # React components
    ui/             # shadcn/ui primitives
    icons.tsx       # Extracted SVG icons as React components
  lib/
    utils.ts        # cn() utility (shadcn)
  types/            # TypeScript interfaces
  hooks/            # Custom React hooks
public/
  images/           # Downloaded images from target site
  videos/           # Downloaded videos from target site
  seo/              # Favicons, OG images, webmanifest
docs/
  research/         # Inspection output (design tokens, components, layout)
  design-references/ # Screenshots and visual references
scripts/            # Asset download scripts
```

## MOST IMPORTANT NOTES
- When launching Claude Code agent teams, ALWAYS have each teammate work in their own worktree branch and merge everyone's work at the end, resolving any merge conflicts smartly since you are basically serving the orchestrator role and have full context to our goals, work given, work achieved, and desired outcomes.
- After editing `AGENTS.md`, run `bash scripts/sync-agent-rules.sh` to regenerate platform-specific instruction files.
- After editing `.claude/skills/clone-website/SKILL.md`, run `node scripts/sync-skills.mjs` to regenerate the skill for all platforms.

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
| 0 | AIDesigner | 0 | デザインカンプ生成・リファイン（AIDesigner MCP、build-premium時のみ） |
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

@docs/research/INSPECTION_GUIDE.md
