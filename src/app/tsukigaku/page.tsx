"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ScrollReveal } from "@/components/animation/scroll-reveal";
/* ParallaxLayer removed — unused */

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
            className="font-light tracking-[-0.04em] text-white leading-[0.95] text-center px-6 transition-all duration-[2000ms] ease-out"
            style={{
              fontSize: "clamp(3.5rem, 12vw, 96px)",
              opacity: phase !== "loading" ? 1 : 0,
              transform: phase !== "loading" ? "scale(1)" : "scale(0.7)",
              filter: phase !== "loading" ? "blur(0px)" : "blur(30px)",
            }}
          >
            HP制作費、<br />0円の時代。
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
            className="font-light tracking-[-0.04em] text-white leading-[0.95] text-center px-6"
            style={{ fontSize: "clamp(3.5rem, 12vw, 96px)" }}
          >
            月9,800円で全部やる
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
            無料相談する
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

  // Draw image to canvas with "cover" behavior
  const drawCover = (canvas: HTMLCanvasElement, img: HTMLImageElement) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;
    const sh = ih * scale;
    const sx = (cw - sw) / 2;
    const sy = (ch - sh) / 2;
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh);
  };

  // Resize canvas to match viewport
  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (loaded && imagesRef.current[0]) {
        drawCover(canvas, imagesRef.current[0]);
      }
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [loaded]);

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
          const canvas = canvasRef.current;
          if (canvas && images[0]) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            drawCover(canvas, images[0]);
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
        drawCover(canvas, img);
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
          className="absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 z-[1]" />
        <div className="relative z-10 text-center px-6">
          <motion.h2
            className="font-light tracking-[-0.04em] text-white leading-[0.95]"
            style={{ fontSize: "clamp(3rem, 10vw, 88px)", opacity: headingOpacity, filter: headingFilter }}
          >
            動くから、売れる。
          </motion.h2>
          <motion.p
            className="font-light tracking-[-0.04em] text-white leading-[0.95]"
            style={{ fontSize: "clamp(1.2rem, 3vw, 1.8rem)", opacity: subOpacity, filter: subFilter }}
          >
            アニメーション・動画・写真、全部込み。追加料金なし。
          </motion.p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ PROBLEM — removed ═══════════════════ */

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
            制作実績
          </p>
          <h2
            className="font-light tracking-[-0.03em] text-white leading-[1.05]"
            style={{ fontSize: "clamp(2rem, 5vw, 56px)" }}
          >
            この品質が、月9,800円。
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <p className="text-white/50 text-[clamp(0.9rem,1.6vw,1.1rem)] mt-6 font-light max-w-[600px] mx-auto leading-relaxed">
            完全オーダーメイドのデザイン。スマホ対応、アニメーション、ホスティング、SSL、すべて月額に含まれています。テンプレートではありません。
          </p>
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
    heading: "ネットで予約が入るHP。",
    image: "/images/tsukigaku/ramen-hero.jpg",
    accent: "#f97316",
  },
  {
    label: "BEAUTY SALON",
    industry: "美容室",
    heading: "指名予約が止まらないHP。",
    image: "/images/tsukigaku/salon-new.jpg",
    accent: "#ec4899",
  },
  {
    label: "CLINIC",
    industry: "クリニック",
    heading: "初めての患者が安心するHP。",
    image: "/images/tsukigaku/clinic-new.jpg",
    accent: "#06b6d4",
  },
  {
    label: "CAFE",
    industry: "カフェ",
    heading: "Googleで見つかるHP。",
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
              className="font-light tracking-[-0.02em] text-white leading-[1.1]"
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

/* ═══════════════════ COMPARISON — Apple-style carousel ═══════════════════ */
const companyCards = [
  {
    label: "A社",
    headline: "最高のクオリティ。\n最高の価格。",
    price: "初期 500万円〜 / 月額 10万円〜",
    specs: ["完全オーダーメイド", "アニメーション対応", "制作期間 2〜3ヶ月"],
    accent: "text-white/50",
    gradient: "from-[#111] to-[#000]",
    image: "/images/tsukigaku/comparison-a.png",
    winner: false,
  },
  {
    label: "B社",
    headline: "安い。\nでも、テンプレート。",
    price: "初期 0円 / 月額 9,800円",
    specs: ["WordPressテンプレ", "アニメーション ✗", "制作期間 1〜2週間"],
    accent: "text-orange-400/70",
    gradient: "from-[#1a120a] to-[#000]",
    image: "/images/tsukigaku/comparison-b.png",
    winner: false,
  },
  {
    label: "ツキガクサイト",
    headline: "A社の品質を。\nB社の価格で。",
    price: "初期 0円 / 月額 9,800円",
    specs: ["完全オーダーメイド", "アニメーション標準搭載 ✓", "最短1週間"],
    accent: "text-blue-400",
    gradient: "from-[#0a0a1a] to-[#000]",
    image: "/images/tsukigaku/comparison-tsukigaku.png",
    winner: true,
  },
];

function ComparisonCard({ card }: { card: typeof companyCards[number] }) {
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
      className={`relative w-[85vw] md:w-full max-w-[400px] shrink-0 md:shrink md:flex-1 rounded-3xl bg-gradient-to-b ${card.gradient} overflow-hidden ${card.winner ? "border-2 border-blue-500/30 shadow-[0_0_60px_-10px_rgba(59,130,246,0.25)]" : "border border-white/[0.08]"}`}
      style={{ scrollSnapAlign: "center" }}
    >
      {/* Image */}
      <div className="relative w-full aspect-[3/2] overflow-hidden">
        <Image
          src={card.image}
          alt={card.label}
          fill
          className={`object-cover ${!card.winner ? "opacity-70 saturate-[0.6]" : ""}`}
          sizes="400px"
        />
        <div className={`absolute inset-0 ${card.winner ? "bg-gradient-to-t from-[#0a0a1a] via-transparent to-transparent" : "bg-gradient-to-t from-black/80 via-black/20 to-transparent"}`} />
      </div>

      {/* Content */}
      <div className="p-7 md:p-9">
        <p className={`${card.accent} text-[11px] font-semibold tracking-[0.15em] uppercase mb-4 transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          {card.label}
        </p>

        {/* Big headline */}
        <h3
          className={`text-white font-semibold tracking-[-0.03em] leading-tight whitespace-pre-line transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-6 blur-sm"}`}
          style={{ fontSize: "clamp(1.6rem, 5vw, 2rem)" }}
        >
          {card.headline}
        </h3>

        {/* Price */}
        <p className={`mt-5 text-[14px] font-medium transition-all duration-700 delay-200 ${card.winner ? "text-blue-400" : "text-white/50"} ${isVisible ? "opacity-100" : "opacity-0"}`}>
          {card.price}
        </p>

        {/* Specs as simple list */}
        <div className={`mt-5 space-y-2 transition-all duration-700 delay-300 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          {card.specs.map((spec) => (
            <p key={spec} className="text-white/35 text-[13px] font-light">
              {spec}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function Comparison() {
  return (
    <section className="relative py-[120px] md:py-[180px] overflow-hidden bg-black">
      <div className="px-6 mb-14 md:mb-20">
        <ScrollReveal>
          <p className="text-blue-400 text-[11px] font-semibold tracking-[0.25em] uppercase mb-5 text-center">
            他社比較
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2
            className="font-light tracking-[-0.04em] text-white leading-[1.05] text-center"
            style={{ fontSize: "clamp(2.5rem, 7vw, 72px)" }}
          >
            同じ品質。
            <br />
            50分の1の値段。
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <p className="text-white/50 text-[clamp(0.9rem,1.6vw,1.1rem)] mt-6 font-light max-w-[600px] mx-auto leading-relaxed text-center">
            大手制作会社と同じ技術スタック（Next.js、GSAP、Vercel）を使用。違うのは中間マージンがないこと。だから初期費用0円、月額9,800円で提供できます。
          </p>
        </ScrollReveal>
      </div>

      {/* Mobile: horizontal scroll / PC: flex row */}
      <div
        className="flex gap-4 overflow-x-scroll px-[8vw] pb-6 md:hidden"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {companyCards.map((card) => (
          <ComparisonCard key={card.label} card={card} />
        ))}
        <div className="shrink-0 w-[8vw]" />
      </div>
      <div className="hidden md:flex gap-6 justify-center max-w-[1200px] mx-auto px-8">
        {companyCards.map((card) => (
          <ComparisonCard key={card.label} card={card} />
        ))}
      </div>
      <style>{`div::-webkit-scrollbar { display: none; }`}</style>
    </section>
  );
}

/* ═══════════════════ BEFORE / AFTER ═══════════════════ */
function BeforeAfter() {
  return (
    <section className="py-[160px] md:py-[200px] bg-[#0a0a0a] overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-6">
        <ScrollReveal>
          <h2
            className="text-white font-light text-center leading-[1] tracking-[-0.04em] mb-20"
            style={{ fontSize: "clamp(3rem, 9vw, 80px)" }}
          >
            放置したHP。<br />売れるHP。
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <p className="text-white/40 text-[clamp(0.9rem,1.6vw,1.1rem)] mt-6 mb-16 font-light max-w-[600px] mx-auto leading-relaxed text-center">
            作って終わりのHPは、誰にも見られません。ツキガクサイトは公開後も月2回の更新対応込み。常に最新の状態を維持します。
          </p>
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
                変更前
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
                変更後
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
            初期費用0円 — サイト公開まで最短1週間
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
            className="font-light tracking-[-0.04em] leading-[1.1] text-[#1d1d1f]"
            style={{ fontSize: "clamp(2.5rem, 7vw, 72px)" }}
            initial={{ filter: "blur(12px)" }}
            whileInView={{ filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            サイトは営業マン。<br />
            24時間働く。
          </motion.h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="text-[#86868b] text-[clamp(0.95rem,1.8vw,1.15rem)] leading-relaxed mt-10 font-light">
            写真で惹きつけて、予約まで一直線。集客できるサイトだけを作ります。
            <br className="hidden md:block" />
            きれいなだけのHPは作りません。お客さんが「行きたい」「買いたい」と思う導線を設計します。
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
            料金プラン
          </p>
          <h2
            className="font-light tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(2rem, 5vw, 56px)" }}
          >
            料金
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
                <span className="text-[5rem] font-light tracking-tight leading-none text-white">
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
              <a
                href="#contact"
                className="block mt-8 py-4 bg-white text-black font-semibold rounded-full hover:scale-[1.03] transition-transform text-center text-[15px]"
              >
                今すぐ無料相談する
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

        {/* Discount line chart — full width, big */}
        <ScrollReveal delay={0.3}>
          <div className="max-w-[800px] mx-auto mt-20 md:mt-28 px-4">
            <h3
              className="font-light tracking-[-0.03em] text-white text-center leading-[1.1] mb-4"
              style={{ fontSize: "clamp(1.8rem, 4vw, 40px)" }}
            >
              長く使うほど安くなる
            </h3>
            <p className="text-white/40 text-[clamp(0.85rem,1.4vw,1rem)] font-light text-center mb-10">
              修正依頼がない年ごとに10%ずつ割引。最大60%OFF。
            </p>
            <svg viewBox="0 0 420 200" className="w-full h-auto" fill="none">
              {/* Grid lines */}
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <line key={i} x1="55" y1={25 + i * 28} x2="400" y2={25 + i * 28} stroke="white" strokeOpacity="0.05" />
              ))}
              {/* Y-axis labels */}
              <text x="48" y="30" textAnchor="end" fill="white" fillOpacity="0.3" fontSize="11">¥10,000</text>
              <text x="48" y="58" textAnchor="end" fill="white" fillOpacity="0.3" fontSize="11">¥8,000</text>
              <text x="48" y="86" textAnchor="end" fill="white" fillOpacity="0.3" fontSize="11">¥6,000</text>
              <text x="48" y="114" textAnchor="end" fill="white" fillOpacity="0.3" fontSize="11">¥4,000</text>
              {/* Gradient fill */}
              <defs>
                <linearGradient id="discountGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.02" />
                </linearGradient>
              </defs>
              <polygon
                points="65,25 120,39 177,53 234,67 291,82 348,97 400,114 400,165 65,165"
                fill="url(#discountGrad)"
              />
              {/* Line */}
              <polyline
                points="65,25 120,39 177,53 234,67 291,82 348,97 400,114"
                stroke="#3b82f6"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Dots + price labels */}
              {[
                { x: 65, y: 25, t: "¥9,800", yr: "1年目" },
                { x: 120, y: 39, t: "¥8,820", yr: "2年目" },
                { x: 177, y: 53, t: "¥7,840", yr: "3年目" },
                { x: 234, y: 67, t: "¥6,860", yr: "4年目" },
                { x: 291, y: 82, t: "¥5,880", yr: "5年目" },
                { x: 348, y: 97, t: "¥4,900", yr: "6年目" },
                { x: 400, y: 114, t: "¥3,920", yr: "7年目〜" },
              ].map((p) => (
                <g key={p.yr}>
                  <circle cx={p.x} cy={p.y} r="5" fill="#3b82f6" stroke="#0a0a0a" strokeWidth="2.5" />
                  <text x={p.x} y={p.y - 12} textAnchor="middle" fill="white" fillOpacity="0.7" fontSize="11" fontWeight="600">{p.t}</text>
                  <text x={p.x} y="182" textAnchor="middle" fill="white" fillOpacity="0.35" fontSize="11">{p.yr}</text>
                </g>
              ))}
            </svg>
            <p className="text-[12px] text-white/20 mt-6 text-center">※修正依頼があった年はリセットされます</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ═══════════════════ FAQ ═══════════════════ */
const faqItems = [
  { q: "解約したらどうなりますか？", a: "サイトは非公開になります。データのお渡しは行っておりません。月額サービスのため、契約期間中のみサイトが公開されます。" },
  { q: "本当に制作会社と同じ品質ですか？", a: "はい。Netflix、Airbnbなど世界のトップ企業と同じ技術スタック（Next.js、React、GSAP）を使用しています。テンプレートではなく、完全オーダーメイドで制作します。" },
  { q: "完成までどのくらいかかりますか？", a: "最短1週間、通常2〜3週間で公開可能です。素材（写真・テキスト）をご用意いただければ、さらに早くなります。" },
  { q: "写真素材がなくても大丈夫ですか？", a: "はい。AI画像生成やフリー素材で対応可能です。プロカメラマンの手配も別途ご相談いただけます。" },
  { q: "公開後の修正はできますか？", a: "月2回まで修正対応込みです。修正依頼がない年は翌年10%割引が積み重なり、最大60%OFF（月3,920円）まで下がります。長く使うほどお得です。" },
  { q: "初期費用は本当に0円ですか？", a: "はい。デザイン費・開発費・サーバー費・SSL証明書、すべて月額9,800円に含まれています。追加料金は一切ありません。" },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section className="py-[120px] md:py-[160px] px-6 bg-[#fafafa]">
      <ScrollReveal>
        <h2
          className="font-light tracking-[-0.03em] text-center text-[#1d1d1f]"
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
      className={`relative w-[78vw] md:w-full max-w-[380px] md:max-w-none shrink-0 md:shrink rounded-3xl bg-gradient-to-b ${tech.gradient} border border-white/[0.08] overflow-hidden`}
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
            使用技術
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2
            className="font-light tracking-[-0.04em] text-white leading-[1.05] text-center"
            style={{ fontSize: "clamp(2.5rem, 7vw, 72px)" }}
          >
            世界基準の技術で
            <br />
            作ってます。
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <p className="text-white/50 text-[clamp(0.9rem,1.6vw,1.1rem)] mt-6 font-light max-w-[600px] mx-auto leading-relaxed text-center">
            Netflix、Airbnbなど世界のトップ企業が採用する技術をそのまま使用。表示速度・SEO・セキュリティすべてが最高水準。だからGoogleに強く、お客さんに選ばれるサイトになります。
          </p>
        </ScrollReveal>
      </div>

      {/* Mobile: horizontal scroll carousel / PC: grid */}
      <div
        className="flex gap-4 overflow-x-scroll px-[8vw] pb-6 md:hidden"
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
        <div className="shrink-0 w-[8vw]" />
      </div>
      {/* PC: zigzag layout — image left/text right, then swap */}
      <div className="hidden md:flex flex-col gap-20 max-w-[1000px] mx-auto px-8">
        {techCards.map((tech, i) => (
          <ScrollReveal key={tech.name}>
            <div className={`flex items-center gap-12 ${i % 2 === 1 ? "flex-row-reverse" : ""}`}>
              <div className="relative w-[280px] h-[280px] shrink-0 rounded-2xl overflow-hidden">
                <Image src={tech.image} alt={tech.name} fill className="object-cover" sizes="280px" />
              </div>
              <div className="flex-1">
                <p className={`${tech.accent} text-[11px] font-semibold tracking-[0.15em] uppercase mb-2`}>{tech.name}</p>
                <h3 className="text-white font-medium text-[28px] tracking-[-0.02em] leading-tight mb-4">{tech.headline}</h3>
                <p className="text-white/40 text-[15px] font-light leading-[1.7]">{tech.desc}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
      <style>{`div::-webkit-scrollbar { display: none; }`}</style>
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
            className="font-light tracking-[-0.04em] text-white leading-[1.05]"
            style={{ fontSize: "clamp(2.5rem, 8vw, 80px)" }}
            initial={{ filter: "blur(16px)", scale: 0.95 }}
            whileInView={{ filter: "blur(0px)", scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            初期費用0円。
            <br />
            まず相談してください。
          </motion.h2>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <p className="text-white/30 text-[clamp(0.9rem,1.6vw,1.1rem)] mt-6 font-light">
            30分の無料相談で、あなたの業種に合ったサイトをご提案します。営業電話は一切しません。
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.25}>
          <a
            href="#"
            className="inline-block mt-12 px-10 py-4 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform text-[15px]"
          >
            今すぐ無料相談する
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
      <Comparison />
      <BeforeAfter />
      <Philosophy />
      <TechStack />
      <Pricing />
      <FAQ />
      <CTAFinal />
      <footer id="contact" className="border-t border-white/5 bg-black py-16 px-6">
        <div className="max-w-[600px] mx-auto text-center">
          <h3 className="text-white text-lg font-medium mb-2">ツキガクサイト</h3>
          <p className="text-white/40 text-sm mb-8">月額9,800円のWeb制作サービス</p>
          <div className="space-y-3 text-sm text-white/50">
            <p>お問い合わせ・無料相談</p>
            <a href="mailto:info@tsukigaku.site" className="block text-blue-400 hover:text-blue-300 transition-colors">info@tsukigaku.site</a>
          </div>
          <p className="text-[11px] text-white/20 mt-12">&copy; 2026 ツキガクサイト</p>
        </div>
      </footer>
    </main>
  );
}
