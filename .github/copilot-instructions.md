<!-- AUTO-GENERATED from AGENTS.md — do not edit directly.
     Run `bash scripts/sync-agent-rules.sh` to regenerate. -->

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

# Website Inspection Guide

## How to Reverse-Engineer Any Website

This guide outlines what to capture when inspecting a target website via Chrome MCP or browser DevTools.

## Phase 1: Visual Audit

### Screenshots to Capture
- [ ] Every distinct page — desktop, tablet, mobile
- [ ] Dark mode variants (if applicable)
- [ ] Light mode variants (if applicable)
- [ ] Key interaction states (hover, active, open menus, modals)
- [ ] Loading/skeleton states
- [ ] Empty states
- [ ] Error states

### Design Tokens to Extract
- [ ] **Colors** — background, text (primary/secondary/muted), accent, border, hover, error, success, warning
- [ ] **Typography** — font family, sizes (h1-h6, body, caption, label), weights, line heights, letter spacing
- [ ] **Spacing** — padding/margin patterns (look for a scale: 4px, 8px, 12px, 16px, 24px, 32px, etc.)
- [ ] **Border radius** — buttons, cards, avatars, inputs
- [ ] **Shadows/elevation** — card shadows, dropdown shadows, modal overlay
- [ ] **Breakpoints** — when does the layout shift? (inspect with DevTools responsive mode)
- [ ] **Icons** — which icon library? custom SVGs? sizes?
- [ ] **Avatars** — sizes, shapes, fallback behavior
- [ ] **Buttons** — all variants (primary, secondary, ghost, icon-only, danger)
- [ ] **Inputs** — text fields, textareas, selects, checkboxes, toggles

## Phase 2: Component Inventory

For each distinct UI component, document:
1. **Name** — what would you call this component?
2. **Structure** — what HTML elements / child components does it contain?
3. **Variants** — does it have different sizes, colors, or states?
4. **States** — default, hover, active, disabled, loading, error, empty
5. **Responsive behavior** — how does it change at different breakpoints?
6. **Interactions** — click, hover, focus, keyboard navigation
7. **Animations** — transitions, entrance/exit animations, micro-interactions

### Common Components to Look For
- Navigation (top bar, sidebar, bottom bar)
- Cards / list items
- Buttons and links
- Forms and inputs
- Modals and dialogs
- Dropdowns and menus
- Tabs and segmented controls
- Avatars and user badges
- Loading skeletons
- Toast notifications
- Tooltips and popovers

## Phase 3: Layout Architecture

- [ ] **Grid system** — CSS Grid? Flexbox? Fixed widths?
- [ ] **Column layout** — how many columns at each breakpoint?
- [ ] **Max-width** — main content area max-width
- [ ] **Sticky elements** — header, sidebar, floating buttons
- [ ] **Z-index layers** — navigation, modals, tooltips, overlays
- [ ] **Scroll behavior** — infinite scroll, pagination, virtual scrolling

## Phase 4: Technical Stack Analysis

- [ ] **Framework** — React? Vue? Angular? Check `__NEXT_DATA__`, `__NUXT__`, `ng-version`
- [ ] **CSS approach** — Tailwind (utility classes), CSS Modules, Styled Components, Emotion, vanilla CSS
- [ ] **State management** — Redux (check DevTools), React Query, Zustand, Pinia
- [ ] **API patterns** — REST, GraphQL (check network tab for `/graphql` requests)
- [ ] **Font loading** — Google Fonts, self-hosted, system fonts
- [ ] **Image strategy** — CDN, lazy loading, srcset, WebP/AVIF
- [ ] **Animation library** — Framer Motion, GSAP, CSS transitions only

## Phase 5: Documentation Output

After inspection, create these files in `docs/research/`:
1. `DESIGN_TOKENS.md` — All extracted colors, typography, spacing
2. `COMPONENT_INVENTORY.md` — Every component with structure notes
3. `LAYOUT_ARCHITECTURE.md` — Page layouts, grid system, responsive behavior
4. `INTERACTION_PATTERNS.md` — Animations, transitions, hover states
5. `TECH_STACK_ANALYSIS.md` — What the site uses and our chosen equivalents
