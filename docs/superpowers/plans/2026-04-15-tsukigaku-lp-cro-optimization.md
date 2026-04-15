# Tsukigaku LP CRO Optimization — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement LP4.pdf CRO recommendations — add 4 new sections (ProblemAgitation, SituationPersonas, SelfProof, StickyMobileCTA), integrate 4 progressive CTAs, merge 2 redundant sections, and add pricing transparency.

**Architecture:** All new sections are React components in page.tsx (single-file pattern matching existing code). New reusable components (InlineCTA, CountUp, LighthouseGauge) go in page.tsx as local functions. StickyMobileCTA is a fixed-position overlay. Philosophy and TechChallenge sections are removed, their copy integrated into new sections.

**Tech Stack:** Next.js 16, React 19, Motion v12 (`motion/react`), Lucide React icons, Tailwind CSS v4, existing ScrollReveal component.

**Spec:** `docs/superpowers/specs/2026-04-15-tsukigaku-lp-cro-optimization-design.md`

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `src/app/tsukigaku/page.tsx` | Modify | Add new section components, reorder sections, remove Philosophy/TechChallenge |

All new components are local functions within page.tsx, following the existing pattern (Hero, Cocktail360, Comparison, etc. are all in the same file).

---

### Task 1: Add CountUp utility and InlineCTA component

**Files:**
- Modify: `src/app/tsukigaku/page.tsx` (add after `multiLerp` helper, before Nav)

- [ ] **Step 1: Add CountUp hook and InlineCTA component**

Add these after the existing `multiLerp` function (around line 20) and before the Nav component:

```tsx
/* ═══════════════════ COUNT-UP HOOK ═══════════════════ */
function useCountUp(end: number, duration = 1500) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, end, duration]);

  return { count, ref };
}

/* ═══════════════════ INLINE CTA ═══════════════════ */
function InlineCTA({ text, micro, variant = "medium" }: { text: string; micro: string; variant?: "soft" | "medium" | "hard" }) {
  const btnClass = variant === "soft"
    ? "bg-white/10 border border-white/20 text-white hover:bg-white/20"
    : "bg-white text-black hover:scale-[1.03]";
  const microClass = variant === "hard" ? "text-blue-400/60 font-medium" : "text-white/30";

  return (
    <div className="text-center py-12 md:py-16">
      <ScrollReveal>
        <a href="#contact" className={`inline-block px-8 py-3.5 rounded-full text-[14px] font-medium transition-all ${btnClass}`}>
          {text}
        </a>
        <p className={`text-[12px] mt-3 ${microClass}`}>{micro}</p>
      </ScrollReveal>
    </div>
  );
}
```

- [ ] **Step 2: Add Lucide icon imports**

Add to the existing imports at the top of the file (line 3-6 area):

```tsx
import { Monitor, Wrench, CircleDollarSign, Frown, Smartphone } from "lucide-react";
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/tsukigaku/page.tsx
git commit -m "feat(tsukigaku): add CountUp hook, InlineCTA component, lucide imports"
```

---

### Task 2: Add ProblemAgitation section

**Files:**
- Modify: `src/app/tsukigaku/page.tsx` (add new component after Cocktail360, before IndustryCard)

- [ ] **Step 1: Add ProblemAgitation component**

Add this component after the `Cocktail360` function (after line ~276) and before the `/* ═══════════════════ MOCKUP REVEAL ═══════════════════ */` comment:

```tsx
/* ═══════════════════ PROBLEM AGITATION — Loss frame ═══════════════════ */
function ProblemAgitation() {
  const { count: c1, ref: r1 } = useCountUp(53);
  const { count: c2, ref: r2 } = useCountUp(61);

  return (
    <section className="py-[120px] md:py-[180px] bg-black px-6">
      <div className="max-w-[900px] mx-auto">
        <ScrollReveal>
          <h2
            className="font-light tracking-[-0.04em] text-white leading-[1.05] text-center"
            style={{ fontSize: "clamp(2.5rem, 7vw, 72px)" }}
          >
            今のサイト、毎日いくら<br />損してるか知ってますか？
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <p className="text-white/40 text-[clamp(0.9rem,1.6vw,1.1rem)] mt-8 font-light max-w-[600px] mx-auto leading-relaxed text-center">
            きれいなだけのHPは作りません。お客さんが「行きたい」「買いたい」と思う導線がなければ、サイトは毎日チャンスを逃しています。
          </p>
        </ScrollReveal>

        <div className="mt-16 md:mt-24 space-y-12 md:space-y-16">
          {/* Point 1 */}
          <ScrollReveal>
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
              <div ref={r1} className="shrink-0">
                <span className="text-red-400 font-bold tracking-tight" style={{ fontSize: "clamp(3rem, 8vw, 64px)" }}>
                  {c1}%
                </span>
              </div>
              <p className="text-white/60 text-[15px] md:text-[17px] font-light leading-relaxed text-center md:text-left">
                表示に3秒以上かかるサイトは、<strong className="text-white/90">半分以上のお客さんが見る前に去ります。</strong>あなたのサイト、何秒かかっていますか？
              </p>
            </div>
          </ScrollReveal>

          {/* Point 2 */}
          <ScrollReveal delay={0.1}>
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
              <div ref={r2} className="shrink-0">
                <span className="text-red-400 font-bold tracking-tight" style={{ fontSize: "clamp(3rem, 8vw, 64px)" }}>
                  {c2}%
                </span>
              </div>
              <p className="text-white/60 text-[15px] md:text-[17px] font-light leading-relaxed text-center md:text-left">
                スマホ対応していないサイトは、<strong className="text-white/90">6割が二度と来ません。</strong>今の時代、お客様の7割はスマホで検索しています。
              </p>
            </div>
          </ScrollReveal>

          {/* Point 3 — Twist */}
          <ScrollReveal delay={0.2}>
            <div className="flex flex-col items-center gap-6 text-center">
              <p className="text-white/60 text-[15px] md:text-[17px] font-light leading-relaxed max-w-[600px]">
                5年前に作ったデザインのまま放置していたら、新規のお客さんは<strong className="text-white/90">「この店、大丈夫？」</strong>と思っています。
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Resolution Tease */}
        <ScrollReveal delay={0.3}>
          <motion.p
            className="text-center mt-20 font-medium text-blue-400 leading-relaxed"
            style={{ fontSize: "clamp(1.4rem, 3.5vw, 2rem)" }}
            initial={{ filter: "blur(20px)" }}
            whileInView={{ filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            でも、月9,800円で全部解決できます。
          </motion.p>
        </ScrollReveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds. ProblemAgitation is defined but not yet used in page render.

- [ ] **Step 3: Commit**

```bash
git add src/app/tsukigaku/page.tsx
git commit -m "feat(tsukigaku): add ProblemAgitation section component"
```

---

### Task 3: Add SituationPersonas section

**Files:**
- Modify: `src/app/tsukigaku/page.tsx` (add after ProblemAgitation, before IndustryCard)

- [ ] **Step 1: Add SituationPersonas component**

Add this right after the `ProblemAgitation` function:

```tsx
/* ═══════════════════ SITUATION PERSONAS ═══════════════════ */
const personas = [
  { icon: Monitor, text: "HP、5年前に作ったまま。更新したいけど制作会社に連絡するのも面倒。" },
  { icon: Wrench, text: "「自分で作れる」ツールを試したけど、途中で止まった。" },
  { icon: CircleDollarSign, text: "毎回の修正に1〜2万。年間でいくら払ってるか、考えたくもない。" },
  { icon: Frown, text: "SNSは頑張ってるのに、「ちゃんとしたHP」がないのが恥ずかしい。" },
  { icon: Smartphone, text: "新規のお客さんに「ホームページありますか？」って聞かれて、答えに詰まった。" },
];

function SituationPersonas() {
  return (
    <section className="py-[100px] md:py-[140px] bg-black px-6">
      <div className="max-w-[900px] mx-auto">
        <ScrollReveal>
          <p className="text-blue-400 text-[11px] font-semibold tracking-[0.25em] uppercase mb-5 text-center">
            こんな状況、ありませんか？
          </p>
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {personas.map((p, i) => {
            const Icon = p.icon;
            return (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 md:p-8 h-full">
                  <Icon className="w-7 h-7 text-blue-400/70 mb-4" strokeWidth={1.5} />
                  <p className="text-white/70 text-[15px] md:text-[16px] font-light leading-relaxed border-l-2 border-blue-500/30 pl-4">
                    {p.text}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/app/tsukigaku/page.tsx
git commit -m "feat(tsukigaku): add SituationPersonas section with 5 JTBD cards"
```

---

### Task 4: Add SelfProof section (self-referential proof + interactive demos)

**Files:**
- Modify: `src/app/tsukigaku/page.tsx` (add after Comparison, before TechStack)

- [ ] **Step 1: Add LighthouseGauge helper component**

Add this before the SelfProof component:

```tsx
/* ═══════════════════ LIGHTHOUSE GAUGE ═══════════════════ */
function LighthouseGauge({ score, label }: { score: number; label: string }) {
  const { count, ref } = useCountUp(score, 2000);
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (count / 100) * circumference;
  const color = count >= 90 ? "#22c55e" : count >= 50 ? "#f59e0b" : "#ef4444";

  return (
    <div ref={ref} className="flex flex-col items-center">
      <svg width="130" height="130" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="54" fill="none" stroke="white" strokeOpacity="0.05" strokeWidth="8" />
        <circle
          cx="60" cy="60" r="54" fill="none"
          stroke={color} strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 60 60)"
          style={{ transition: "stroke-dashoffset 0.1s linear" }}
        />
        <text x="60" y="60" textAnchor="middle" dominantBaseline="central" fill="white" fontSize="32" fontWeight="300">
          {count}
        </text>
      </svg>
      <p className="text-white/40 text-[13px] mt-2 font-light">{label}</p>
    </div>
  );
}
```

- [ ] **Step 2: Add SelfProof component**

Add this after LighthouseGauge:

```tsx
/* ═══════════════════ SELF PROOF — Dogfooding ═══════════════════ */
function SelfProof() {
  const { count: speedCount, ref: speedRef } = useCountUp(8, 1500);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: parallaxRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const [hovered, setHovered] = useState(false);

  return (
    <section className="py-[120px] md:py-[180px] bg-black px-6 overflow-hidden">
      <div className="max-w-[1000px] mx-auto">
        {/* Headline */}
        <ScrollReveal>
          <h2
            className="font-light tracking-[-0.04em] text-white leading-[1.05] text-center"
            style={{ fontSize: "clamp(2rem, 5vw, 56px)" }}
          >
            このサイトの制作コスト：¥0。<br />
            初期費用：¥0。月額：¥9,800。
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="text-white/40 text-[clamp(0.9rem,1.6vw,1.1rem)] mt-6 font-light max-w-[600px] mx-auto leading-relaxed text-center">
            このページの表示速度：0.{speedCount}秒。あなたのサイトも。
          </p>
        </ScrollReveal>

        {/* Metrics */}
        <ScrollReveal delay={0.2}>
          <div ref={speedRef} className="flex justify-center gap-8 md:gap-16 mt-14">
            <LighthouseGauge score={98} label="Performance" />
            <LighthouseGauge score={100} label="Accessibility" />
            <LighthouseGauge score={100} label="SEO" />
          </div>
        </ScrollReveal>

        {/* TechChallenge integrated */}
        <div className="mt-24 md:mt-32 text-center max-w-[800px] mx-auto">
          <ScrollReveal>
            <h2
              className="font-medium tracking-[-0.03em] text-white leading-[1.1]"
              style={{ fontSize: "clamp(1.8rem, 5vw, 48px)" }}
            >
              他のHP業者に聞いてみてください。<br />
              「何の技術で作ってますか？」と。
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-white mt-10 font-medium" style={{ fontSize: "clamp(1.2rem, 3vw, 2rem)" }}>
              答えられないはずです。
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.25}>
            <p className="text-white/60 mt-4 font-light" style={{ fontSize: "clamp(1rem, 2.5vw, 1.5rem)" }}>
              テンプレートを貼り替えてるだけだから。
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.35}>
            <div className="mt-14 pt-12 border-t border-white/10">
              <p className="text-white/80 font-medium leading-[1.4]" style={{ fontSize: "clamp(1rem, 2.5vw, 1.4rem)" }}>
                ツキガクサイトは、使っている技術を<br className="hidden md:block" />堂々と公開しています。
              </p>
              <p className="text-white mt-3 font-bold" style={{ fontSize: "clamp(1.2rem, 3vw, 1.8rem)" }}>
                同じ月額9,800円。中身が違います。
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Interactive Demos */}
        <div className="mt-24 md:mt-32">
          <ScrollReveal>
            <h3 className="font-medium tracking-[-0.03em] text-white text-center" style={{ fontSize: "clamp(1.6rem, 4vw, 36px)" }}>
              触ってみてください。
            </h3>
            <p className="text-white/40 text-[clamp(0.85rem,1.4vw,1rem)] mt-3 font-light text-center">
              このアニメーション、あなたのサイトにも入ります。
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
            {/* Demo 1: Parallax */}
            <ScrollReveal delay={0.05}>
              <div ref={parallaxRef} className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden aspect-[4/3] relative">
                <motion.div className="absolute inset-[-20%] w-[140%] h-[140%]" style={{ y: parallaxY }}>
                  <Image src="/images/tsukigaku/ramen-hero.jpg" alt="パララックスデモ" fill className="object-cover" sizes="400px" />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5">
                  <p className="text-blue-400 text-[10px] font-semibold tracking-[0.2em] uppercase">パララックス効果</p>
                  <p className="text-white/50 text-[12px] mt-1 font-light">スクロールで画像が動く</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Demo 2: Hover Reveal */}
            <ScrollReveal delay={0.15}>
              <motion.div
                className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden aspect-[4/3] relative cursor-pointer"
                onHoverStart={() => setHovered(true)}
                onHoverEnd={() => setHovered(false)}
                onTapStart={() => setHovered(true)}
                onTap={() => setHovered(false)}
              >
                <motion.div
                  className="absolute inset-0"
                  animate={{ scale: hovered ? 1.08 : 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image src="/images/tsukigaku/salon-new.jpg" alt="ホバーデモ" fill className="object-cover" sizes="400px" />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <motion.div
                  className="absolute bottom-4 left-5 right-5"
                  animate={{ y: hovered ? 0 : 10, opacity: hovered ? 1 : 0.6 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="text-blue-400 text-[10px] font-semibold tracking-[0.2em] uppercase">ホバーアニメーション</p>
                  <p className="text-white/50 text-[12px] mt-1 font-light">タッチ/ホバーで拡大</p>
                </motion.div>
              </motion.div>
            </ScrollReveal>

            {/* Demo 3: Scroll Counter */}
            <ScrollReveal delay={0.25}>
              <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden aspect-[4/3] relative flex items-center justify-center">
                <div className="text-center">
                  <div className="text-white font-light tracking-tight" style={{ fontSize: "clamp(3rem, 8vw, 56px)" }}>
                    ¥9,800
                  </div>
                  <p className="text-white/30 text-sm mt-1">/月</p>
                </div>
                <div className="absolute bottom-4 left-5 right-5">
                  <p className="text-blue-400 text-[10px] font-semibold tracking-[0.2em] uppercase">スクロール連動</p>
                  <p className="text-white/50 text-[12px] mt-1 font-light">数字が動き出す</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/app/tsukigaku/page.tsx
git commit -m "feat(tsukigaku): add SelfProof section with Lighthouse gauges, TechChallenge integration, interactive demos"
```

---

### Task 5: Add StickyMobileCTA component

**Files:**
- Modify: `src/app/tsukigaku/page.tsx` (add before the page export)

- [ ] **Step 1: Add StickyMobileCTA component**

Add this before `export default function TsukigakuPage()`:

```tsx
/* ═══════════════════ STICKY MOBILE CTA ═══════════════════ */
function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("stickyDismissed")) {
      setDismissed(true);
      return;
    }
    const onScroll = () => setVisible(window.scrollY > window.innerHeight);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (dismissed || !visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden">
      <div className="h-[60px] bg-black/90 backdrop-blur-xl border-t border-white/10 flex items-center justify-between px-4">
        <span className="text-white/50 text-[11px]">初期費用0円</span>
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="bg-white text-black font-semibold text-[13px] rounded-full px-5 py-2.5 hover:bg-white/90 transition-colors"
          >
            今すぐ相談する
          </a>
          <button
            onClick={() => { setDismissed(true); sessionStorage.setItem("stickyDismissed", "1"); }}
            className="text-white/30 text-[18px] px-1 hover:text-white/60"
            aria-label="閉じる"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/app/tsukigaku/page.tsx
git commit -m "feat(tsukigaku): add StickyMobileCTA with scroll detection and dismiss"
```

---

### Task 6: Add pricing breakdown to Pricing section

**Files:**
- Modify: `src/app/tsukigaku/page.tsx` (modify Pricing function)

- [ ] **Step 1: Add pricing breakdown after the discount chart**

In the `Pricing` function, find the closing `</p>` of `※修正依頼があった年はリセットされます` (around line 864). Add the following right after it, still inside the `<div className="relative z-10">`:

```tsx
        {/* Price Breakdown — Radical Transparency */}
        <ScrollReveal delay={0.3}>
          <div className="max-w-[700px] mx-auto mt-20 md:mt-28">
            <h3
              className="font-light tracking-[-0.03em] text-white text-center leading-[1.1] mb-10"
              style={{ fontSize: "clamp(1.6rem, 3.5vw, 32px)" }}
            >
              月額9,800円の内訳
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { amount: "¥5,000", label: "デザイン・開発", desc: "完全オーダーメイド" },
                { amount: "¥2,800", label: "ホスティング・SSL", desc: "Vercel CDN、稼働率99.99%" },
                { amount: "¥2,000", label: "サポート・修正", desc: "月2回まで修正対応" },
              ].map((item) => (
                <div key={item.label} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 text-center">
                  <p className="text-white font-medium text-[24px]">{item.amount}</p>
                  <p className="text-white/60 text-[13px] mt-2 font-medium">{item.label}</p>
                  <p className="text-white/30 text-[12px] mt-1 font-light">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-blue-400/60 text-[13px] mt-6 text-center font-light">
              中間マージン：¥0。営業コスト：¥0。だからこの価格。
            </p>
          </div>
        </ScrollReveal>
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/app/tsukigaku/page.tsx
git commit -m "feat(tsukigaku): add pricing breakdown for radical transparency"
```

---

### Task 7: Rewire page — remove Philosophy/TechChallenge, add new sections, insert CTAs

**Files:**
- Modify: `src/app/tsukigaku/page.tsx` (modify TsukigakuPage export, delete unused components)

- [ ] **Step 1: Update the page render order**

Replace the `TsukigakuPage` export (the `return` block inside `export default function TsukigakuPage()`) with:

```tsx
export default function TsukigakuPage() {
  return (
    <main className="bg-black">
      <Nav />
      <Hero />
      <Cocktail360 />
      <ProblemAgitation />
      <SituationPersonas />
      <InlineCTA text="サービス詳細を見る" micro="ホームページの悩みを解決" variant="soft" />
      <IndustryShowcase />
      <Comparison />
      <InlineCTA text="無料で始める" micro="月額9,800円ですべてお任せ" variant="medium" />
      <SelfProof />
      <TechStack />
      <InlineCTA text="今すぐ申し込む" micro="初期費用0円・いつでも解約OK" variant="hard" />
      <Pricing />
      <Flow />
      <FAQ />
      <Founder />
      <CTAFinal />
      <footer id="contact" className="border-t border-white/5 bg-black py-20 px-6">
        <div className="max-w-[500px] mx-auto">
          <h3 className="text-white text-center text-[24px] md:text-[28px] font-medium mb-3">無料相談フォーム</h3>
          <p className="text-white/40 text-sm text-center mb-10">お気軽にお問い合わせください。</p>
          <form
            action="https://formspree.io/f/placeholder"
            method="POST"
            className="space-y-5"
          >
            <div>
              <label htmlFor="name" className="block text-white/60 text-[13px] mb-2">お名前</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3.5 rounded-xl bg-white/[0.06] border border-white/10 text-white text-[15px] placeholder-white/30 focus:outline-none focus:border-blue-500/50 transition-colors"
                placeholder="山田 太郎"
              />
            </div>
            <div>
              <label htmlFor="business" className="block text-white/60 text-[13px] mb-2">業種・店舗名</label>
              <input
                type="text"
                id="business"
                name="business"
                className="w-full px-4 py-3.5 rounded-xl bg-white/[0.06] border border-white/10 text-white text-[15px] placeholder-white/30 focus:outline-none focus:border-blue-500/50 transition-colors"
                placeholder="飲食店「〇〇」"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-white/60 text-[13px] mb-2">メールアドレス</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3.5 rounded-xl bg-white/[0.06] border border-white/10 text-white text-[15px] placeholder-white/30 focus:outline-none focus:border-blue-500/50 transition-colors"
                placeholder="info@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-white/60 text-[13px] mb-2">ご相談内容（任意）</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-4 py-3.5 rounded-xl bg-white/[0.06] border border-white/10 text-white text-[15px] placeholder-white/30 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                placeholder="どんなサイトにしたいか、お気軽にお書きください"
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-white text-black font-semibold rounded-full hover:scale-[1.02] transition-transform text-[16px]"
            >
              送信する
            </button>
          </form>
          <div className="mt-10 text-center">
            <a
              href="https://line.me/R/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 rounded-full bg-[#06C755] text-white font-medium text-[15px] hover:bg-[#05b34c] transition-colors"
            >
              LINEで相談する
            </a>
          </div>
          <p className="text-[11px] text-white/20 mt-12 text-center">&copy; 2026 ツキガクサイト</p>
        </div>
      </footer>
      <StickyMobileCTA />
    </main>
  );
}
```

- [ ] **Step 2: Delete the Philosophy component**

Delete the entire `Philosophy` function (the `function Philosophy() { ... }` block). It's no longer used — its copy is integrated into ProblemAgitation.

- [ ] **Step 3: Delete the TechChallenge component**

Delete the entire `TechChallenge` function (the `function TechChallenge() { ... }` block). It's no longer used — its copy is integrated into SelfProof.

- [ ] **Step 4: Delete the BeforeAfter component**

Delete the entire `BeforeAfter` function if it's still in the file (it was already commented out in the page render). Remove dead code.

- [ ] **Step 5: Update CTAFinal micro-copy**

In the `CTAFinal` function, after the existing `今すぐ無料相談する` link, add a micro-copy line:

Find:
```tsx
          <a
            href="#"
            className="inline-block mt-12 px-10 py-4 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform text-[15px]"
          >
            今すぐ無料相談する
          </a>
```

Replace with:
```tsx
          <a
            href="#contact"
            className="inline-block mt-12 px-10 py-4 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform text-[15px]"
          >
            今すぐ無料相談する
          </a>
          <p className="text-white/30 text-[12px] mt-4">初期費用0円・クレジットカード不要</p>
```

- [ ] **Step 6: Verify build**

Run: `npm run build`
Expected: Build succeeds with no errors or unused variable warnings.

- [ ] **Step 7: Commit**

```bash
git add src/app/tsukigaku/page.tsx
git commit -m "feat(tsukigaku): rewire page with new section order, remove Philosophy/TechChallenge, add 4 progressive CTAs"
```

---

### Task 8: Visual QA and deploy

**Files:**
- No file changes — testing and deployment only

- [ ] **Step 1: Run full check**

Run: `npm run check`
Expected: lint + typecheck + build all pass.

- [ ] **Step 2: Test locally on mobile viewport**

Run: `npm run dev`
Open in browser at 390px width. Verify:
- ProblemAgitation: CountUp numbers animate on scroll
- SituationPersonas: 5 cards render, stagger animation
- InlineCTA: 3 instances visible at correct positions
- SelfProof: Lighthouse gauges animate, demos interactive
- StickyMobileCTA: appears after scrolling past hero, dismiss works
- Pricing: breakdown cards visible below discount chart

- [ ] **Step 3: Deploy to production**

Run: `npx vercel --prod`
Expected: Deployment succeeds.

- [ ] **Step 4: Verify live site**

Open: `https://ai-website-cloner-flax.vercel.app/tsukigaku`
Check on mobile and desktop.

- [ ] **Step 5: Final commit with version tag**

```bash
git push
```
