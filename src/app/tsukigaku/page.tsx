"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ScrollReveal } from "@/components/animation/scroll-reveal";
import { ParallaxLayer } from "@/components/animation/parallax-layer";

/* ═══════════════════ NAV ═══════════════════ */
function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-[48px] flex items-center justify-between px-8 md:px-16 bg-black/60 backdrop-blur-2xl border-b border-white/5">
      <span className="font-light text-[14px] tracking-[0.02em] text-white/90">ツキガクサイト</span>
      <a
        href="#pricing"
        className="text-[12px] font-medium px-5 py-1.5 rounded-full bg-white text-black hover:bg-white/90 transition-colors"
      >
        無料相談
      </a>
    </nav>
  );
}

/* ═══════════════════ HERO — Cinematic Video ═══════════════════ */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // State-driven: which phase are we in?
  const [phase, setPhase] = useState<"loading" | "text1" | "scroll">("loading");

  // After 2s, show text1
  useEffect(() => {
    const t = setTimeout(() => setPhase("text1"), 2000);
    return () => clearTimeout(t);
  }, []);

  // Once user scrolls past 3%, switch to scroll mode
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      if (v > 0.03) setPhase("scroll");
    });
    return unsub;
  }, [scrollYProgress]);

  // All scroll transforms — MUST be at top level (React hooks rule)
  const t1Opacity = useTransform(scrollYProgress, [0.03, 0.15], [1, 0]);
  const t1Blur = useTransform(scrollYProgress, [0.03, 0.15], [0, 30]);
  const t1Filter = useTransform(t1Blur, (v) => `blur(${v}px)`);
  const t2Opacity = useTransform(scrollYProgress, [0.15, 0.3, 0.5, 0.65], [0, 1, 1, 0]);
  const t2Scale = useTransform(scrollYProgress, [0.15, 0.3], [0.7, 1]);
  const t2Blur = useTransform(scrollYProgress, [0.15, 0.3], [30, 0]);
  const t2Filter = useTransform(t2Blur, (v) => `blur(${v}px)`);
  const ctaOpacity = useTransform(scrollYProgress, [0.35, 0.45, 0.55, 0.7], [0, 1, 1, 0]);
  const ctaY = useTransform(scrollYProgress, [0.35, 0.45], [30, 0]);
  const scrollIndOp = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  return (
    <section ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {/* Video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay muted playsInline
        >
          <source src="/videos/hero-laptop.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/30 z-[1]" />

        {/* --- Text 1: always rendered, CSS handles appear, Motion handles scroll fadeout --- */}
        <motion.div
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
          style={{ opacity: phase === "scroll" ? t1Opacity : 1, filter: phase === "scroll" ? t1Filter : "none" }}
        >
          <h1
            className="font-extralight tracking-[-0.04em] text-white leading-[0.95] text-center px-6 transition-all duration-[2000ms] ease-out"
            style={{
              fontSize: "clamp(3.5rem, 12vw, 96px)",
              opacity: phase !== "loading" ? 1 : 0,
              transform: phase !== "loading" ? "scale(1)" : "scale(0.7)",
              filter: phase !== "loading" ? "blur(0px)" : "blur(30px)",
            }}
          >
            Apple級の<br />Webサイトを。
          </h1>
        </motion.div>

        {/* --- Text 2: centered absolutely, scroll-driven --- */}
        <motion.div
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
          style={{
            opacity: t2Opacity,
            scale: t2Scale,
            filter: t2Filter,
          }}
        >
          <h2
            className="font-extralight tracking-[-0.04em] text-white leading-[0.95] text-center px-6"
            style={{ fontSize: "clamp(3.5rem, 12vw, 96px)" }}
          >
            月額9,800円で
          </h2>
        </motion.div>

        {/* --- CTA --- */}
        <motion.div
          className="absolute inset-x-0 bottom-[25%] z-10 flex justify-center"
          style={{ opacity: ctaOpacity, y: ctaY }}
        >
          <a
            href="#pricing"
            className="px-8 py-3.5 text-[14px] font-medium rounded-full bg-white text-black hover:scale-105 transition-transform"
          >
            まずは相談する
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity: scrollIndOp }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        >
          <span className="text-[10px] text-white/30 tracking-[0.3em] uppercase">scroll</span>
          <motion.div
            className="w-px h-10 bg-white/20"
            animate={{ scaleY: [1, 0.3, 1], opacity: [0.5, 0.15, 0.5] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════ COCKTAIL 360 — Scroll-driven frame animation ═══════════════════ */
const COCKTAIL_FRAMES = 19;
const cocktailFrames = Array.from({ length: COCKTAIL_FRAMES }, (_, i) =>
  `/images/tsukigaku/cocktail/frame-${String(i + 1).padStart(2, "0")}.jpg`
);

function Cocktail360() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });

  // Preload all frames into memory
  useEffect(() => {
    let mounted = true;
    const images: HTMLImageElement[] = [];
    let count = 0;
    cocktailFrames.forEach((src, i) => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        count++;
        if (count === COCKTAIL_FRAMES && mounted) {
          imagesRef.current = images;
          setLoaded(true);
          // Draw first frame
          const canvas = canvasRef.current;
          if (canvas && images[0]) {
            canvas.width = images[0].naturalWidth;
            canvas.height = images[0].naturalHeight;
            const ctx = canvas.getContext("2d");
            ctx?.drawImage(images[0], 0, 0);
          }
        }
      };
      images[i] = img;
    });
    return () => { mounted = false; };
  }, []);

  // Draw frame on scroll
  useEffect(() => {
    if (!loaded) return;
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const idx = Math.min(COCKTAIL_FRAMES - 1, Math.floor(v * COCKTAIL_FRAMES));
      const canvas = canvasRef.current;
      const img = imagesRef.current[idx];
      if (canvas && img) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
        }
      }
    });
    return unsubscribe;
  }, [loaded, scrollYProgress]);

  // Text animations tied to scroll
  const headingOpacity = useTransform(scrollYProgress, [0, 0.08, 0.4, 0.55], [0, 1, 1, 0]);
  const headingBlur = useTransform(scrollYProgress, [0, 0.08], [20, 0]);
  const headingFilter = useTransform(headingBlur, (v) => `blur(${v}px)`);
  const subOpacity = useTransform(scrollYProgress, [0.55, 0.7, 0.85, 0.95], [0, 1, 1, 0]);
  const subBlur = useTransform(scrollYProgress, [0.55, 0.7], [20, 0]);
  const subFilter = useTransform(subBlur, (v) => `blur(${v}px)`);

  return (
    <section ref={sectionRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-contain"
          style={{ objectFit: "contain" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 z-[1]" />
        <div className="relative z-10 text-center px-6">
          <motion.h2
            className="font-extralight tracking-[-0.04em] text-white leading-[0.95]"
            style={{ fontSize: "clamp(3rem, 10vw, 88px)", opacity: headingOpacity, filter: headingFilter }}
          >
            動くサイト。
          </motion.h2>
          <motion.p
            className="font-extralight tracking-[-0.04em] text-white leading-[0.95]"
            style={{ fontSize: "clamp(1.2rem, 3vw, 1.8rem)", opacity: subOpacity, filter: subFilter }}
          >
            この体験を、月9,800円で。
          </motion.p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ PROBLEM ═══════════════════ */
function Problem() {
  return (
    <section className="py-[160px] md:py-[200px] flex flex-col items-center justify-center px-6 text-center bg-[#fafafa]">
      <ScrollReveal>
        <h2
          className="font-extrabold tracking-[-0.04em] leading-[1.05] text-[#1d1d1f]"
          style={{ fontSize: "clamp(2.8rem, 8vw, 80px)" }}
        >
          売れてますか？
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={0.15}>
        <p className="text-[#86868b] text-[clamp(1rem,2vw,1.25rem)] mt-8 font-light max-w-[400px]">
          きれいなだけじゃ、意味がない。
        </p>
      </ScrollReveal>
    </section>
  );
}

/* ═══════════════════ MOCKUP REVEAL ═══════════════════ */
function MockupReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={ref} className="py-[120px] md:py-[180px] bg-black overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-6 text-center">
        <ScrollReveal>
          <p className="text-blue-400 text-[11px] font-semibold tracking-[0.25em] uppercase mb-5">
            What We Build
          </p>
          <h2
            className="font-extralight tracking-[-0.03em] text-white leading-[1.05]"
            style={{ fontSize: "clamp(2rem, 5vw, 56px)" }}
          >
            この品質を、月額で。
          </h2>
        </ScrollReveal>
        <motion.div className="mt-16" style={{ scale, opacity }}>
          <div className="relative w-full aspect-[16/10] max-w-[900px] mx-auto rounded-[16px] overflow-hidden shadow-2xl shadow-blue-500/10">
            <Image
              src="/images/tsukigaku/macbook-mockup.png"
              alt="MacBook モックアップ"
              fill
              className="object-cover"
              sizes="900px"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════ INDUSTRY SHOWCASE ═══════════════════ */
const industries = [
  {
    label: "RESTAURANT",
    industry: "飲食店",
    heading: "湯気まで届く。",
    image: "/images/tsukigaku/ramen-hero.jpg",
    accent: "#f97316",
  },
  {
    label: "BEAUTY SALON",
    industry: "美容室",
    heading: "美が、歩いてくる。",
    image: "/images/tsukigaku/salon-new.jpg",
    accent: "#ec4899",
  },
  {
    label: "CLINIC",
    industry: "クリニック",
    heading: "安心が、見える。",
    image: "/images/tsukigaku/clinic-new.jpg",
    accent: "#06b6d4",
  },
  {
    label: "CAFE",
    industry: "カフェ",
    heading: "香りが、漂う。",
    image: "/images/tsukigaku/cafe-new.jpg",
    accent: "#a16207",
  },
];

/* Single industry card with scroll-driven effects */
function IndustryCard({ item, index }: { item: typeof industries[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Image: Ken Burns zoom + parallax
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.3, 1, 1.1]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  // Circular clip-path reveal from center
  const clipRadius = useTransform(scrollYProgress, [0.1, 0.4], [0, 150]);

  // Text stagger
  const labelOpacity = useTransform(scrollYProgress, [0.25, 0.35], [0, 1]);
  const labelY = useTransform(scrollYProgress, [0.25, 0.35], [30, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0.3, 0.45], [0, 1]);
  const headingY = useTransform(scrollYProgress, [0.3, 0.45], [60, 0]);
  const headingBlur = useTransform(scrollYProgress, [0.3, 0.45], [20, 0]);

  // Fade out on exit
  const exitOpacity = useTransform(scrollYProgress, [0.75, 0.9], [1, 0]);

  // Pre-compute all derived transforms at top level (React hooks rule)
  const clipPath = useTransform(clipRadius, (r) =>
    r >= 149 ? "inset(0%)" : `circle(${r}% at 50% 50%)`
  );
  const labelLineWidth = useTransform(scrollYProgress, [0.25, 0.4], [0, 40]);
  const headingFilter = useTransform(headingBlur, (v) => `blur(${v}px)`);
  const glowWidth = useTransform(scrollYProgress, [0.4, 0.6], ["0%", "30%"]);
  const glowOpacity = useTransform(scrollYProgress, [0.4, 0.55, 0.75, 0.9], [0, 0.8, 0.8, 0]);

  return (
    <section ref={ref} className="relative h-[180vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <motion.div
          className="absolute inset-0"
          style={{ opacity: exitOpacity, clipPath }}
        >
          <motion.div
            className="absolute inset-[-15%] w-[130%] h-[130%]"
            style={{ scale: imgScale, y: imgY }}
          >
            <Image src={item.image} alt={item.industry} fill className="object-cover" sizes="100vw" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30" />
        </motion.div>

        <div className="absolute inset-0 z-10 flex items-end">
          <div className="w-full px-8 md:px-20 pb-20 md:pb-28">
            <motion.div className="flex items-center gap-3 mb-5" style={{ opacity: labelOpacity, y: labelY }}>
              <motion.div className="h-px origin-left" style={{ backgroundColor: item.accent, width: labelLineWidth }} />
              <span className="text-[10px] font-semibold tracking-[0.3em] uppercase" style={{ color: item.accent }}>
                {item.industry}
              </span>
            </motion.div>

            <motion.h2
              className="font-extralight tracking-[-0.02em] text-white leading-[1.1]"
              style={{ fontSize: "clamp(2.5rem, 7vw, 72px)", opacity: headingOpacity, y: headingY, filter: headingFilter }}
            >
              {item.heading}
            </motion.h2>

            <motion.div
              className="mt-6 h-[2px] rounded-full origin-left"
              style={{ backgroundColor: item.accent, width: glowWidth, opacity: glowOpacity, boxShadow: `0 0 20px ${item.accent}` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function IndustryShowcase() {
  return (
    <div>
      {industries.map((item, i) => (
        <IndustryCard key={item.label} item={item} index={i} />
      ))}
    </div>
  );
}

/* ═══════════════════ BEFORE / AFTER ═══════════════════ */
function BeforeAfter() {
  return (
    <section className="py-[160px] md:py-[200px] bg-[#0a0a0a] overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-6">
        <ScrollReveal>
          <h2
            className="text-white font-extralight text-center leading-[1] tracking-[-0.04em] mb-20"
            style={{ fontSize: "clamp(3rem, 9vw, 80px)" }}
          >
            この差。
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {/* Before */}
          <motion.div
            className="rounded-[20px] overflow-hidden bg-[#1a1a1a] border border-white/5"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-5 pt-5 pb-3">
              <span className="text-[#666] text-[10px] font-bold uppercase tracking-[0.25em]">
                Before
              </span>
            </div>
            <div className="relative w-full aspect-[3/2] overflow-hidden">
              <Image
                src="/images/tsukigaku/before.png"
                alt="Before"
                fill
                className="object-cover opacity-70 grayscale"
              />
            </div>
          </motion.div>

          {/* After */}
          <motion.div
            className="rounded-[20px] overflow-hidden bg-[#0d1b2a] border border-blue-500/20"
            style={{ boxShadow: "0 0 80px -20px rgba(59,130,246,0.15)" }}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            <div className="px-5 pt-5 pb-3">
              <span className="text-blue-400 text-[10px] font-bold uppercase tracking-[0.25em]">
                After
              </span>
            </div>
            <div className="relative w-full aspect-[3/2] overflow-hidden">
              <Image
                src="/images/tsukigaku/after.png"
                alt="After"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
        <ScrollReveal delay={0.3}>
          <p className="text-center text-white/30 text-sm mt-16 font-light">
            月額9,800円 — 初期費用0円
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ═══════════════════ PHILOSOPHY ═══════════════════ */
function Philosophy() {
  return (
    <section className="py-[160px] md:py-[240px] flex items-center justify-center bg-white text-center px-6">
      <div className="max-w-[700px]">
        <ScrollReveal>
          <motion.h2
            className="font-extralight tracking-[-0.04em] leading-[1.1] text-[#1d1d1f]"
            style={{ fontSize: "clamp(2.5rem, 7vw, 72px)" }}
            initial={{ filter: "blur(12px)" }}
            whileInView={{ filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            売るために、
            <br />
            作る。
          </motion.h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="text-[#86868b] text-[clamp(0.95rem,1.8vw,1.15rem)] leading-relaxed mt-10 font-light">
            写真どーん。感情が動いて、
            <br className="hidden md:block" />
            「行きたい」にたどり着く。
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ═══════════════════ PRICING ═══════════════════ */
function Pricing() {
  const features = [
    "Apple級デザイン",
    "完全オーダーメイド 5P",
    "アニメーション標準搭載",
    "スマホ完全対応",
    "月2回修正込み",
    "ホスティング・SSL込み",
    "初期費用0円",
  ];
  const options = [
    { p: "+500", l: "独自ドメイン" },
    { p: "+500", l: "ページ追加" },
    { p: "+500", l: "アニメーション" },
    { p: "+100", l: "挿絵" },
  ];

  return (
    <section id="pricing" className="relative py-[160px] md:py-[200px] px-6 text-center overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0">
        <Image src="/images/tsukigaku/pricing-bg.png" alt="" fill className="object-cover opacity-30" />
        <div className="absolute inset-0 bg-[#0a0a0a]/90" />
      </div>

      <div className="relative z-10">
        <ScrollReveal>
          <p className="text-blue-400 text-[11px] font-semibold tracking-[0.25em] uppercase mb-5">
            Pricing
          </p>
          <h2
            className="font-extralight tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(2rem, 5vw, 56px)" }}
          >
            シンプルな料金
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="max-w-[440px] mx-auto mt-14 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[24px] overflow-hidden"
          >
            <div className="p-10 md:p-12">
              <div className="text-center mb-10">
                <span className="text-white/50 text-lg align-top">&#165;</span>
                <span className="text-[5rem] font-extralight tracking-tight leading-none text-white">
                  9,800
                </span>
                <p className="text-white/30 text-sm mt-2">/月（税込）</p>
              </div>
              <ul className="space-y-0">
                {features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-3 py-3.5 border-b border-white/5 text-sm text-white/60"
                  >
                    <span className="w-4 h-4 rounded-full bg-blue-500/20 flex-shrink-0 flex items-center justify-center">
                      <svg
                        width="8"
                        height="8"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-3 bg-white/[0.03] rounded-xl text-sm text-white/40 font-light">
                修正なしの年は翌年10%割引
              </div>
              <a
                href="#"
                className="block mt-8 py-4 bg-white text-black font-semibold rounded-full hover:scale-[1.03] transition-transform text-center text-[15px]"
              >
                無料相談を予約する
              </a>
            </div>
          </motion.div>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-[500px] mx-auto mt-12">
            {options.map((o) => (
              <div
                key={o.l}
                className="bg-white/[0.03] border border-white/5 rounded-xl p-4 text-center"
              >
                <p className="font-light text-lg text-white">+{o.p}</p>
                <p className="text-white/30 text-xs mt-1">{o.l}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ═══════════════════ FAQ ═══════════════════ */
const faqItems = [
  { q: "解約したらどうなりますか？", a: "サイトは非公開になります。" },
  { q: "本当にApple級？", a: "Apple.comと同じ技術スタック（Next.js、GSAP、スムーススクロール）を使用。" },
  { q: "完成までどのくらい？", a: "最短1週間、通常2〜3週間で公開。" },
  { q: "写真素材がなくても？", a: "AI画像生成で対応します。" },
  { q: "修正回数は？", a: "月2回まで。修正なしの年は翌年10%割引。" },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section className="py-[120px] md:py-[160px] px-6 bg-[#fafafa]">
      <ScrollReveal>
        <h2
          className="font-extralight tracking-[-0.03em] text-center text-[#1d1d1f]"
          style={{ fontSize: "clamp(1.8rem, 4vw, 48px)" }}
        >
          よくある質問
        </h2>
      </ScrollReveal>
      <div className="max-w-[600px] mx-auto mt-14">
        {faqItems.map((item, i) => (
          <ScrollReveal key={i} delay={i * 0.04}>
            <div className="border-b border-black/5">
              <button
                className="w-full flex justify-between items-center py-6 text-left text-[15px] font-medium text-[#1d1d1f]"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                {item.q}
                <motion.span
                  className="text-xl text-[#86868b]"
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-[#86868b] text-sm leading-relaxed pb-6">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════ TECH STACK ═══════════════════ */
const techCards = [
  {
    name: "Next.js 16",
    headline: "0.1秒の世界。",
    desc: "Vercel製の最新フレームワーク。サーバー・エッジ・静的生成を自動で最適化し、圧倒的な表示速度を実現。",
    gradient: "from-[#111] to-[#000]",
    accent: "text-white",
    image: "/images/tsukigaku/tech/nextjs.png",
  },
  {
    name: "React 19",
    headline: "世界が選んだUI。",
    desc: "Meta社開発。Apple、Netflix、Airbnbも採用するグローバルスタンダード。滑らかで一貫した操作体験。",
    gradient: "from-[#0a1628] to-[#000]",
    accent: "text-blue-400",
    image: "/images/tsukigaku/tech/react.png",
  },
  {
    name: "TypeScript 5",
    headline: "バグは、生まれない。",
    desc: "型安全な設計思想。コードの品質を根本から保証し、どんな規模でも安定動作するサイトを構築。",
    gradient: "from-[#0a1420] to-[#000]",
    accent: "text-blue-300",
    image: "/images/tsukigaku/tech/typescript.png",
  },
  {
    name: "Tailwind CSS 4",
    headline: "1pxの妥協もない。",
    desc: "ピクセル単位の緻密なデザインシステム。レスポンシブ対応も完璧。すべてのデバイスで美しく。",
    gradient: "from-[#061418] to-[#000]",
    accent: "text-cyan-400",
    image: "/images/tsukigaku/tech/tailwind.png",
  },
  {
    name: "GSAP + Motion",
    headline: "画面が、呼吸する。",
    desc: "Appleも採用するGSAPと、60fpsのMotionを組み合わせ。スクロール連動の没入感あるアニメーション体験。",
    gradient: "from-[#0a1a0a] to-[#000]",
    accent: "text-green-400",
    image: "/images/tsukigaku/tech/gsap.png",
  },
  {
    name: "Lenis",
    headline: "絹のスクロール。",
    desc: "指先に吸い付くようなスムーススクロール。微細な慣性計算で、心地よさが格段に違う。",
    gradient: "from-[#1a120a] to-[#000]",
    accent: "text-orange-300",
    image: "/images/tsukigaku/tech/lenis.png",
  },
  {
    name: "shadcn/ui",
    headline: "美と機能の両立。",
    desc: "Radixベースの洗練されたコンポーネント群。アクセシビリティ完全準拠。デザインと使いやすさを同時に。",
    gradient: "from-[#111] to-[#000]",
    accent: "text-white/80",
    image: "/images/tsukigaku/tech/shadcn.png",
  },
];

function TechCard({ tech }: { tech: typeof techCards[number] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting && entry.intersectionRatio > 0.5),
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative w-[78vw] max-w-[380px] shrink-0 rounded-3xl bg-gradient-to-b ${tech.gradient} border border-white/[0.08] overflow-hidden`}
      style={{ scrollSnapAlign: "center" }}
    >
      {/* Image */}
      <div className="relative w-full aspect-[3/4] overflow-hidden">
        <Image
          src={tech.image}
          alt={tech.name}
          fill
          className="object-cover"
          sizes="380px"
        />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/90 to-transparent" />
        {/* Text with Apple-style reveal */}
        <div className="absolute bottom-5 left-6 right-6">
          <p
            className={`${tech.accent} text-[11px] font-semibold tracking-[0.15em] uppercase transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-4 blur-sm"
            }`}
          >
            {tech.name}
          </p>
          <h3
            className={`text-white font-semibold text-[24px] md:text-[28px] tracking-[-0.03em] leading-tight mt-1 transition-all duration-700 ease-out delay-150 ${
              isVisible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-6 blur-sm"
            }`}
          >
            {tech.headline}
          </h3>
        </div>
      </div>
      {/* Description */}
      <div className="px-6 py-5">
        <p
          className={`text-white/40 text-[13px] font-light leading-[1.7] transition-all duration-700 ease-out delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {tech.desc}
        </p>
      </div>
    </div>
  );
}

function TechStack() {
  return (
    <section className="relative py-[120px] md:py-[180px] overflow-hidden bg-black">
      <div className="px-6 mb-14 md:mb-20">
        <ScrollReveal>
          <p className="text-blue-400 text-[11px] font-semibold tracking-[0.25em] uppercase mb-5 text-center">
            Technology
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2
            className="font-extralight tracking-[-0.04em] text-white leading-[1.05] text-center"
            style={{ fontSize: "clamp(2.5rem, 7vw, 72px)" }}
          >
            なぜ、この品質が
            <br />
            出せるのか。
          </h2>
        </ScrollReveal>
      </div>

      {/* Apple-style CSS scroll-snap carousel */}
      <div
        className="flex gap-4 overflow-x-scroll px-[8vw] pb-6"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {techCards.map((tech) => (
          <TechCard key={tech.name} tech={tech} />
        ))}
        {/* End spacer */}
        <div className="shrink-0 w-[8vw]" />
      </div>
      {/* Hide scrollbar globally via style tag */}
      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}

/* ═══════════════════ CTA FINAL ═══════════════════ */
function CTAFinal() {
  return (
    <section className="relative py-[160px] md:py-[200px] px-6 text-center overflow-hidden">
      {/* Dark particle background */}
      <div className="absolute inset-0">
        <Image src="/images/tsukigaku/cta-bg.png" alt="" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10">
        <ScrollReveal>
          <motion.h2
            className="font-extralight tracking-[-0.04em] text-white leading-[1.05]"
            style={{ fontSize: "clamp(2.5rem, 8vw, 80px)" }}
            initial={{ filter: "blur(16px)", scale: 0.95 }}
            whileInView={{ filter: "blur(0px)", scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            あなたのビジネスを、
            <br />
            Apple級に。
          </motion.h2>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <p className="text-white/30 text-[clamp(0.9rem,1.6vw,1.1rem)] mt-6 font-light">
            初期費用0円。今すぐ無料相談。
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.25}>
          <a
            href="#"
            className="inline-block mt-12 px-10 py-4 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform text-[15px]"
          >
            無料相談を予約する
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ═══════════════════ PAGE ═══════════════════ */
export default function TsukigakuPage() {
  return (
    <main className="bg-black">
      <Nav />
      <Hero />
      <Cocktail360 />
      <IndustryShowcase />
      <BeforeAfter />
      <Philosophy />
      <TechStack />
      <Pricing />
      <FAQ />
      <CTAFinal />
      <footer className="text-center py-10 text-[11px] text-white/20 border-t border-white/5 bg-black">
        &copy; 2026 ツキガクサイト
      </footer>
    </main>
  );
}
