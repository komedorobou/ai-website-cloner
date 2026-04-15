"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ScrollReveal } from "@/components/animation/scroll-reveal";
import { Monitor, Wrench, CircleDollarSign, Frown, Smartphone } from "lucide-react";
/* ParallaxLayer removed — unused */

/* Motion v12 multi-keyframe useTransform workaround */
function multiLerp(bp: number[], vals: number[], v: number): number {
  if (v <= bp[0]) return vals[0];
  if (v >= bp[bp.length - 1]) return vals[vals.length - 1];
  for (let i = 0; i < bp.length - 1; i++) {
    if (v <= bp[i + 1]) {
      const t = (v - bp[i]) / (bp[i + 1] - bp[i]);
      return vals[i] + t * (vals[i + 1] - vals[i]);
    }
  }
  return vals[vals.length - 1];
}

/* ═══════════════════ SCROLL INDICATOR ═══════════════════ */
function ScrollIndicator({ scrollProgress }: { scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const opacity = useTransform(scrollProgress, [0, 0.25], [1, 0]);

  return (
    <motion.div
      className="absolute bottom-20 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      style={{ opacity }}
    >
      <motion.svg
        width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        animate={{ y: [0, -8, 0], opacity: [0, 0.6, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        <polyline points="6 15 12 9 18 15" />
      </motion.svg>
      <span className="text-[12px] text-white/40 tracking-[0.3em] uppercase font-light">scroll</span>
      <motion.svg
        width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        animate={{ y: [0, 8, 0], opacity: [0, 0.6, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        <polyline points="6 9 12 15 18 9" />
      </motion.svg>
    </motion.div>
  );
}

/* ═══════════════════ COUNT-UP HOOK ═══════════════════ */
function useCountUp<T extends HTMLElement = HTMLDivElement>(end: number, duration = 1500) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<T>(null);

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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(end);
      return;
    }
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
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

/* ═══════════════════ NAV ═══════════════════ */
function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-[48px] flex items-center justify-between px-8 md:px-16 bg-black/60 backdrop-blur-2xl border-b border-white/5">
      <span className="font-light text-[14px] tracking-[0.02em] text-white/90">ツキガクサイト</span>
      <div className="flex items-center gap-3">
        <a
          href="#contact"
          className="text-[12px] font-medium px-5 py-1.5 rounded-full bg-white text-black hover:bg-white/90 transition-colors"
        >
          まずは相談する
        </a>
        <a
          href="https://line.me/R/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] font-medium px-4 py-1.5 rounded-full bg-[#06C755] text-white hover:bg-[#05b34c] transition-colors"
        >
          LINE
        </a>
      </div>
    </nav>
  );
}

/* ═══════════════════ HERO — Cinematic Video ═══════════════════ */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // State-driven: which phase are we in?
  const [phase, setPhase] = useState<"loading" | "text1" | "text2" | "scroll">("loading");
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  // After 2s, show text1 (h1)
  useEffect(() => {
    const t = setTimeout(() => setPhase("text1"), 2000);
    return () => clearTimeout(t);
  }, []);

  // 3s after text1, show text2 (h2)
  useEffect(() => {
    if (phase !== "text1") return;
    const t = setTimeout(() => setPhase("text2"), 3000);
    return () => clearTimeout(t);
  }, [phase]);

  // Once user scrolls past 3%, switch to scroll mode — only after text2 has appeared
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      if (v > 0.03 && phaseRef.current === "text2") setPhase("scroll");
    });
    return unsub;
  }, [scrollYProgress]);

  // All scroll transforms — MUST be at top level (React hooks rule)
  const t1Opacity = useTransform(scrollYProgress, [0.02, 0.2], [1, 0]);
  const t1Blur = useTransform(scrollYProgress, [0.02, 0.2], [0, 30]);
  const t1Filter = useTransform(t1Blur, (v) => `blur(${v}px)`);
  const ctaOpacity = useTransform(scrollYProgress, (v) => multiLerp([0.4, 0.5, 0.65, 0.8], [0, 1, 1, 0], v));
  const ctaY = useTransform(scrollYProgress, [0.4, 0.5], [30, 0]);
  const scrollIndOp = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  return (
    <section ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-black">
        {/* Video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay muted playsInline
        >
          <source src="/videos/hero-laptop.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50 z-[1]" />

        {/* --- Text 1: always rendered, CSS handles appear, Motion handles scroll fadeout --- */}
        <motion.div
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
          style={{ opacity: phase === "scroll" ? t1Opacity : 1, filter: phase === "scroll" ? t1Filter : "none" }}
        >
          <h1
            className="font-light tracking-[-0.04em] text-white leading-[0.95] text-center px-6 transition-all duration-[2000ms] ease-out"
            style={{
              fontSize: "clamp(2.8rem, 10vw, 96px)",
              opacity: phase === "text1" ? 1 : 0,
              transform: phase === "text1" ? "scale(1)" : "scale(0.7)",
              filter: phase === "text1" ? "blur(0px)" : "blur(30px)",
            }}
          >
            このサイト、<br />月9,800円で<br className="md:hidden" />作れます。
          </h1>
        </motion.div>

        {/* --- Text 2: phase-driven (same as h1) --- */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <h2
            className="font-light tracking-[-0.04em] text-white leading-[0.95] text-center px-6 transition-all duration-[2000ms] ease-out"
            style={{
              fontSize: "clamp(2.8rem, 10vw, 96px)",
              opacity: phase === "text2" ? 1 : 0,
              transform: phase === "text2" ? "scale(1)" : "scale(0.7)",
              filter: phase === "text2" ? "blur(0px)" : "blur(30px)",
            }}
          >
            あなたのお店でも。
          </h2>
        </div>

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

  // Text animations tied to scroll — heading appears after some rotation
  const headingOpacity = useTransform(scrollYProgress, (v) => multiLerp([0.25, 0.35, 0.50, 0.58], [0, 1, 1, 0], v));
  const headingBlur = useTransform(scrollYProgress, [0.25, 0.35], [20, 0]);
  const headingFilter = useTransform(headingBlur, (v) => `blur(${v}px)`);
  const subOpacity = useTransform(scrollYProgress, (v) => multiLerp([0.56, 0.64, 0.82, 0.92], [0, 1, 1, 0], v));
  const subBlur = useTransform(scrollYProgress, [0.56, 0.64], [20, 0]);
  const subFilter = useTransform(subBlur, (v) => `blur(${v}px)`);

  return (
    <section ref={sectionRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-black flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40 z-[1]" />
        {/* Heading — center */}
        <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
          <motion.h2
            className="font-light tracking-[-0.04em] text-white leading-[0.95] text-center"
            style={{ fontSize: "clamp(2rem, 7vw, 88px)", opacity: headingOpacity, filter: headingFilter, textShadow: "0 2px 20px rgba(0,0,0,0.8), 0 4px 40px rgba(0,0,0,0.6)" }}
          >
            3秒、<br className="md:hidden" />目が離せなかった<br className="md:hidden" />でしょ？
          </motion.h2>
        </div>
        {/* Sub — bottom area */}
        <motion.div
          className="absolute inset-x-0 bottom-[15%] z-10 px-6 text-center"
          style={{ opacity: subOpacity, filter: subFilter }}
        >
          <p
            className="font-light tracking-[-0.04em] text-white leading-[1.1]"
            style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", textShadow: "0 2px 20px rgba(0,0,0,0.8), 0 4px 40px rgba(0,0,0,0.6)" }}
          >
            あなたのお客様も同じ。<br />この動き、月額に全部込み。
          </p>
        </motion.div>
        <ScrollIndicator scrollProgress={scrollYProgress} />
      </div>
    </section>
  );
}

/* ═══════════════════ PROBLEM AGITATION — 3 Patterns ═══════════════════ */
function ProblemAgitation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });

  // Each step: fade in → hold → fade out, centered in viewport
  const step1Op = useTransform(scrollYProgress, (v) => multiLerp([0, 0.06, 0.14, 0.18], [0, 1, 1, 0], v));
  const step2Op = useTransform(scrollYProgress, (v) => multiLerp([0.16, 0.22, 0.30, 0.34], [0, 1, 1, 0], v));
  const step3Op = useTransform(scrollYProgress, (v) => multiLerp([0.32, 0.38, 0.46, 0.50], [0, 1, 1, 0], v));
  const step4Op = useTransform(scrollYProgress, (v) => multiLerp([0.48, 0.54, 0.62, 0.66], [0, 1, 1, 0], v));
  const step5Op = useTransform(scrollYProgress, (v) => multiLerp([0.64, 0.70, 0.78, 0.82], [0, 1, 1, 0], v));
  const step6Op = useTransform(scrollYProgress, (v) => multiLerp([0.80, 0.86, 0.95, 1], [0, 1, 1, 0], v));

  return (
    <section ref={sectionRef} className="relative h-[500vh]">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-black flex items-center justify-center px-6">
        {/* Step 1: Headline */}
        <motion.div className="absolute inset-0 flex items-center justify-center px-6" style={{ opacity: step1Op }}>
          <h2
            className="font-light tracking-[-0.04em] text-white leading-[1.1] text-center"
            style={{ fontSize: "clamp(2rem, 6vw, 72px)" }}
          >
            ホームページで<br className="md:hidden" />損してる店は、<br />3パターンしかない。
          </h2>
        </motion.div>

        {/* Step 2: Sub */}
        <motion.div className="absolute inset-0 flex items-center justify-center px-6" style={{ opacity: step2Op }}>
          <p
            className="text-white/60 font-light text-center"
            style={{ fontSize: "clamp(1.4rem, 4vw, 2.4rem)" }}
          >
            あなたは、どれですか。
          </p>
        </motion.div>

        {/* Step 3: Pattern 1 */}
        <motion.div className="absolute inset-0 flex items-center justify-center px-8" style={{ opacity: step3Op }}>
          <div className="text-center">
            <p className="text-white text-[24px] md:text-[36px] font-medium mb-4">持っていない。</p>
            <p className="text-white/50 text-[16px] md:text-[20px] font-light">Googleで見つからない店は、<br />存在しないのと同じ。</p>
          </div>
        </motion.div>

        {/* Step 4: Pattern 2 */}
        <motion.div className="absolute inset-0 flex items-center justify-center px-8" style={{ opacity: step4Op }}>
          <div className="text-center">
            <p className="text-white text-[24px] md:text-[36px] font-medium mb-4">持ってるけど、古い。</p>
            <p className="text-white/50 text-[16px] md:text-[20px] font-light">不安になるサイトは、<br />ないほうがマシ。</p>
          </div>
        </motion.div>

        {/* Step 5: Pattern 3 */}
        <motion.div className="absolute inset-0 flex items-center justify-center px-8" style={{ opacity: step5Op }}>
          <div className="text-center">
            <p className="text-white text-[24px] md:text-[36px] font-medium mb-4">持ってるけど、高い。</p>
            <p className="text-white/50 text-[16px] md:text-[20px] font-light">年間数十万払って、放置。</p>
          </div>
        </motion.div>

        {/* Step 6: Resolution */}
        <motion.div className="absolute inset-0 flex items-center justify-center px-8" style={{ opacity: step6Op }}>
          <p
            className="font-medium text-blue-400 text-center"
            style={{ fontSize: "clamp(1.6rem, 5vw, 2.5rem)" }}
          >
            全部、月9,800円で<br className="md:hidden" />解決できる。
          </p>
        </motion.div>

        <ScrollIndicator scrollProgress={scrollYProgress} />
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
  const imgScale = useTransform(scrollYProgress, (v) => multiLerp([0, 0.5, 1], [1.3, 1, 1.1], v));
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
  const glowOpacity = useTransform(scrollYProgress, (v) => multiLerp([0.4, 0.55, 0.75, 0.9], [0, 0.8, 0.8, 0], v));

  return (
    <section ref={ref} className="relative h-[150vh]">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-black">
        <motion.div
          className="absolute inset-0"
          style={{ opacity: exitOpacity, clipPath, willChange: "clip-path, opacity", transform: "translateZ(0)" }}
        >
          <motion.div
            className="absolute inset-[-15%] w-[130%] h-[130%]"
            style={{ scale: imgScale, y: imgY }}
          >
            <Image src={item.image} alt={item.industry} fill className="object-cover" sizes="100vw" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40" />
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
              style={{ fontSize: "clamp(2.2rem, 7vw, 72px)", opacity: headingOpacity, y: headingY, filter: headingFilter }}
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

function Comparison() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });

  const headOp = useTransform(scrollYProgress, (v) => multiLerp([0, 0.05, 0.12, 0.16], [0, 1, 1, 0], v));
  const card1Op = useTransform(scrollYProgress, (v) => multiLerp([0.14, 0.2, 0.32, 0.36], [0, 1, 1, 0], v));
  const card2Op = useTransform(scrollYProgress, (v) => multiLerp([0.34, 0.4, 0.52, 0.56], [0, 1, 1, 0], v));
  const card3Op = useTransform(scrollYProgress, (v) => multiLerp([0.54, 0.6, 0.85, 0.95], [0, 1, 1, 0], v));
  const card3Scale = useTransform(scrollYProgress, [0.54, 0.65], [0.9, 1]);

  return (
    <section ref={sectionRef} className="relative h-[500vh]">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-black flex items-center justify-center px-6">
        {/* Headline */}
        <motion.div className="absolute inset-0 flex flex-col items-center justify-center px-6" style={{ opacity: headOp }}>
          <p className="text-blue-400 text-[11px] font-semibold tracking-[0.25em] uppercase mb-5">他社比較</p>
          <h2
            className="font-light tracking-[-0.04em] text-white leading-[1.05] text-center"
            style={{ fontSize: "clamp(2.2rem, 7vw, 72px)" }}
          >
            同じ品質。<br />50分の1の値段。
          </h2>
        </motion.div>

        {/* Card 1: A社 */}
        <motion.div className="absolute inset-0 flex items-center justify-center px-8" style={{ opacity: card1Op }}>
          <div className="max-w-[500px] w-full rounded-3xl bg-gradient-to-b from-[#111] to-[#000] border border-white/[0.08] overflow-hidden">
            <div className="relative w-full aspect-[3/2] overflow-hidden">
              <Image src="/images/tsukigaku/comparison-a.png" alt="A社" fill className="object-cover opacity-70 saturate-[0.6]" sizes="500px" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>
            <div className="p-8 md:p-10">
              <p className="text-white/50 text-[12px] font-semibold tracking-[0.15em] uppercase mb-4">A社</p>
              <h3 className="text-white font-semibold tracking-[-0.03em] leading-tight" style={{ fontSize: "clamp(1.8rem, 5vw, 2.4rem)" }}>
                最高のクオリティ。<br />最高の価格。
              </h3>
              <p className="mt-5 text-[15px] font-medium text-white/50">初期 500万円〜 / 月額 10万円〜</p>
              <div className="mt-5 space-y-2">
                {["完全オーダーメイド", "アニメーション対応", "制作期間 2〜3ヶ月"].map((s) => (
                  <p key={s} className="text-white/30 text-[14px] font-light">{s}</p>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Card 2: B社 */}
        <motion.div className="absolute inset-0 flex items-center justify-center px-8" style={{ opacity: card2Op }}>
          <div className="max-w-[500px] w-full rounded-3xl bg-gradient-to-b from-[#1a120a] to-[#000] border border-white/[0.08] overflow-hidden">
            <div className="relative w-full aspect-[3/2] overflow-hidden">
              <Image src="/images/tsukigaku/comparison-b.png" alt="B社" fill className="object-cover opacity-70 saturate-[0.6]" sizes="500px" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>
            <div className="p-8 md:p-10">
              <p className="text-orange-400/70 text-[12px] font-semibold tracking-[0.15em] uppercase mb-4">B社</p>
              <h3 className="text-white font-semibold tracking-[-0.03em] leading-tight" style={{ fontSize: "clamp(1.8rem, 5vw, 2.4rem)" }}>
                安い。<br />でも、テンプレート。
              </h3>
              <p className="mt-5 text-[15px] font-medium text-white/50">初期 0円 / 月額 9,800円</p>
              <div className="mt-5 space-y-2">
                {["WordPressテンプレ", "アニメーション ✗", "制作期間 1〜2週間"].map((s) => (
                  <p key={s} className="text-white/30 text-[14px] font-light">{s}</p>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Card 3: ツキガクサイト — winner */}
        <motion.div className="absolute inset-0 flex items-center justify-center px-8" style={{ opacity: card3Op, scale: card3Scale }}>
          <div className="max-w-[500px] w-full rounded-3xl bg-gradient-to-b from-[#0a0a1a] to-[#000] border-2 border-blue-500/30 overflow-hidden" style={{ boxShadow: "0 0 80px -10px rgba(59,130,246,0.3)" }}>
            <div className="relative w-full aspect-[3/2] overflow-hidden">
              <Image src="/images/tsukigaku/comparison-tsukigaku.png" alt="ツキガクサイト" fill className="object-cover" sizes="500px" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-transparent to-transparent" />
            </div>
            <div className="p-8 md:p-10">
              <p className="text-blue-400 text-[12px] font-semibold tracking-[0.15em] uppercase mb-4">ツキガクサイト</p>
              <h3 className="text-white font-semibold tracking-[-0.03em] leading-tight" style={{ fontSize: "clamp(1.8rem, 5vw, 2.4rem)" }}>
                A社の品質を。<br />B社の価格で。
              </h3>
              <p className="mt-5 text-[15px] font-medium text-blue-400">初期 0円 / 月額 9,800円</p>
              <div className="mt-5 space-y-2">
                {["完全オーダーメイド", "アニメーション標準搭載 ✓", "最短1週間"].map((s) => (
                  <p key={s} className="text-white/50 text-[14px] font-light">{s}</p>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <ScrollIndicator scrollProgress={scrollYProgress} />
      </div>
    </section>
  );
}

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

/* ═══════════════════ SELF PROOF — Dogfooding ═══════════════════ */
function SelfProof() {
  const { count: speedCount, ref: speedRef } = useCountUp<HTMLParagraphElement>(8, 1500);

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
          <p ref={speedRef} className="text-white/40 text-[clamp(0.9rem,1.6vw,1.1rem)] mt-6 font-light max-w-[600px] mx-auto leading-relaxed text-center">
            このページの表示速度：0.{speedCount}秒。あなたのサイトも。
          </p>
        </ScrollReveal>

        {/* Metrics */}
        <ScrollReveal delay={0.2}>
          <div className="flex justify-center gap-8 md:gap-16 mt-14">
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
      </div>
    </section>
  );
}

/* ═══════════════════ INTERACTIVE DEMO — Scroll-driven site assembly ═══════════════════ */
function InteractiveDemo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });

  // Phone frame
  const phoneScale = useTransform(scrollYProgress, (v) => multiLerp([0, 0.15, 0.8, 1], [0.6, 1, 1, 0.9], v));
  const phoneOpacity = useTransform(scrollYProgress, (v) => multiLerp([0, 0.1], [0, 1], v));

  // Site elements appear sequentially
  const headerOp = useTransform(scrollYProgress, (v) => multiLerp([0.12, 0.2], [0, 1], v));
  const heroImgOp = useTransform(scrollYProgress, (v) => multiLerp([0.18, 0.28], [0, 1], v));
  const heroImgScale = useTransform(scrollYProgress, [0.18, 0.28], [1.3, 1]);
  const titleOp = useTransform(scrollYProgress, (v) => multiLerp([0.26, 0.34], [0, 1], v));
  const titleY = useTransform(scrollYProgress, [0.26, 0.34], [30, 0]);
  const cardsOp = useTransform(scrollYProgress, (v) => multiLerp([0.34, 0.44], [0, 1], v));
  const cardsY = useTransform(scrollYProgress, [0.34, 0.44], [40, 0]);
  const ctaBtnOp = useTransform(scrollYProgress, (v) => multiLerp([0.44, 0.52], [0, 1], v));
  const ctaBtnScale = useTransform(scrollYProgress, [0.44, 0.52], [0.8, 1]);

  // Heading text
  const heading2Op = useTransform(scrollYProgress, (v) => multiLerp([0.55, 0.65, 0.85, 0.95], [0, 1, 1, 0], v));

  // Glow effect behind phone
  const glowOp = useTransform(scrollYProgress, (v) => multiLerp([0.3, 0.5, 0.8, 0.95], [0, 0.6, 0.6, 0], v));

  return (
    <section ref={sectionRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-black flex items-center justify-center">
        {/* Glow */}
        <motion.div
          className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)",
            opacity: glowOp,
            filter: "blur(60px)",
          }}
        />


        {/* Heading 2 — below phone */}
        <motion.div
          className="absolute inset-x-0 bottom-[15%] md:bottom-[12%] z-20 pointer-events-none px-6"
          style={{ opacity: heading2Op }}
        >
          <h2
            className="font-light tracking-[-0.04em] text-white leading-[1.1] text-center"
            style={{ fontSize: "clamp(1.4rem, 4vw, 40px)", textShadow: "0 4px 40px rgba(0,0,0,0.8)" }}
          >
            このアニメーション、<br />あなたのサイトにも。
          </h2>
        </motion.div>

        {/* iPhone Frame — Realistic */}
        <motion.div
          className="relative z-10 w-[300px] md:w-[380px]"
          style={{ scale: phoneScale, opacity: phoneOpacity, aspectRatio: "9/19.5" }}
        >
          {/* Outer frame — titanium/stainless look */}
          <div
            className="absolute inset-0 rounded-[48px] md:rounded-[56px]"
            style={{
              background: "linear-gradient(145deg, #4a4a4a 0%, #2a2a2a 30%, #1a1a1a 50%, #2a2a2a 70%, #3a3a3a 100%)",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 20px 60px -10px rgba(0,0,0,0.8), 0 0 120px -20px rgba(59,130,246,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
          />
          {/* Screen area */}
          <div className="absolute inset-[4px] md:inset-[5px] rounded-[44px] md:rounded-[51px] overflow-hidden bg-black">
            {/* Dynamic Island */}
            <div className="relative h-10 md:h-12 flex items-center justify-center">
              <div className="w-[90px] md:w-[110px] h-[28px] md:h-[32px] rounded-full bg-black border border-white/[0.03] mt-1" style={{ boxShadow: "inset 0 1px 3px rgba(0,0,0,0.8)" }} />
            </div>

            {/* Site content assembling */}
            <div className="bg-[#0a0a0a] overflow-hidden mx-1 rounded-b-[6px]">
              {/* Site header */}
              <motion.div
                className="h-10 md:h-12 bg-white/5 flex items-center justify-between px-3 md:px-4"
                style={{ opacity: headerOp }}
              >
                <div className="w-16 md:w-20 h-2.5 md:h-3 rounded bg-white/30" />
                <div className="flex gap-1.5 md:gap-2">
                  <div className="w-8 md:w-10 h-2 md:h-2.5 rounded bg-white/15" />
                  <div className="w-8 md:w-10 h-2 md:h-2.5 rounded bg-white/15" />
                </div>
              </motion.div>

              {/* Hero image */}
              <motion.div
                className="relative h-36 md:h-48 overflow-hidden"
                style={{ opacity: heroImgOp }}
              >
                <motion.div className="absolute inset-0" style={{ scale: heroImgScale }}>
                  <Image src="/images/tsukigaku/ramen-hero.jpg" alt="" fill className="object-cover" sizes="380px" />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
              </motion.div>

              {/* Title */}
              <motion.div className="px-4 md:px-5 -mt-6 relative" style={{ opacity: titleOp, y: titleY }}>
                <div className="w-24 md:w-28 h-1.5 md:h-2 rounded bg-blue-500/50 mb-2" />
                <div className="w-full h-3 md:h-3.5 rounded bg-white/60 mb-1.5" />
                <div className="w-3/4 h-3 md:h-3.5 rounded bg-white/40" />
                <div className="w-full h-2 md:h-2.5 rounded bg-white/15 mt-3" />
                <div className="w-5/6 h-2 md:h-2.5 rounded bg-white/15 mt-1" />
              </motion.div>

              {/* Feature cards */}
              <motion.div className="px-4 md:px-5 mt-5 md:mt-6 flex gap-2 md:gap-3" style={{ opacity: cardsOp, y: cardsY }}>
                {["#f97316", "#ec4899", "#06b6d4"].map((c) => (
                  <div key={c} className="flex-1 rounded-lg bg-white/[0.04] border border-white/[0.06] p-2 md:p-3">
                    <div className="w-5 md:w-6 h-5 md:h-6 rounded-full mb-1.5 md:mb-2" style={{ backgroundColor: c, opacity: 0.6 }} />
                    <div className="w-full h-1.5 md:h-2 rounded bg-white/20 mb-1" />
                    <div className="w-2/3 h-1.5 md:h-2 rounded bg-white/10" />
                  </div>
                ))}
              </motion.div>

              {/* CTA button */}
              <motion.div className="px-4 md:px-5 mt-5 md:mt-6 pb-4" style={{ opacity: ctaBtnOp, scale: ctaBtnScale }}>
                <div className="w-full h-10 md:h-11 rounded-full bg-white flex items-center justify-center">
                  <div className="w-20 md:w-24 h-2 md:h-2.5 rounded bg-black/60" />
                </div>
              </motion.div>
            </div>

            {/* Home indicator bar */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[100px] md:w-[120px] h-[4px] rounded-full bg-white/20" />
          </div>

          {/* Side buttons */}
          <div className="absolute -left-[2px] top-[25%] w-[3px] h-[30px] rounded-l-sm bg-[#333]" />
          <div className="absolute -left-[2px] top-[35%] w-[3px] h-[50px] rounded-l-sm bg-[#333]" />
          <div className="absolute -left-[2px] top-[45%] w-[3px] h-[50px] rounded-l-sm bg-[#333]" />
          <div className="absolute -right-[2px] top-[30%] w-[3px] h-[60px] rounded-r-sm bg-[#333]" />
        </motion.div>
        <ScrollIndicator scrollProgress={scrollYProgress} />
      </div>
    </section>
  );
}



/* ═══════════════════ PRICING ═══════════════════ */
function Pricing() {
  const features = [
    "あなたのお店専用デザイン",
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

      </div>
    </section>
  );
}

/* ═══════════════════ FAQ ═══════════════════ */
const faqItems = [
  { q: "解約したらサイトはどうなりますか？", a: "サイトは非公開になります。ただし契約期間に縛りはなく、いつでも解約可能です。再開したい場合は、以前のデザインをそのまま復元できます。" },
  { q: "本当に制作会社と同じ品質ですか？", a: "はい。Netflix、Airbnbなど世界のトップ企業と同じ技術スタック（Next.js、React、GSAP）を使用しています。テンプレートではなく、完全オーダーメイドで制作します。" },
  { q: "完成までどのくらいかかりますか？", a: "最短1週間、通常2〜3週間で公開可能です。素材（写真・テキスト）をご用意いただければ、さらに早くなります。" },
  { q: "写真素材がなくても大丈夫ですか？", a: "はい。AI画像生成やフリー素材で対応可能です。プロカメラマンの手配も別途ご相談いただけます。" },
  { q: "公開後の修正はできますか？", a: "月2回まで修正対応込みです。修正依頼がない年は翌年10%割引が積み重なり、最大60%OFF（月3,920円）まで下がります。長く使うほどお得です。" },
  { q: "初期費用は本当に0円ですか？", a: "はい。デザイン費・開発費・サーバー費・SSL証明書、すべて月額9,800円に含まれています。追加料金は一切ありません。" },
];

/* ═══════════════════ FLOW ═══════════════════ */
const flowSteps = [
  {
    num: "01",
    title: "お問い合わせ",
    desc: "フォームまたはメールでご連絡ください。30分の無料相談で、ご要望やイメージをお伺いします。",
    image: "/images/tsukigaku/flow-01-contact.jpg",
  },
  {
    num: "02",
    title: "ヒアリング",
    desc: "業種・ターゲット・掲載内容を詳しくお聞きします。写真やテキストなどの素材もこの段階でご準備いただきます。",
    image: "/images/tsukigaku/flow-02-hearing.jpg",
  },
  {
    num: "03",
    title: "制作開始",
    desc: "ヒアリング内容をもとに制作を開始。最短1週間で初稿をお見せします。",
    image: "/images/tsukigaku/flow-03-build.jpg",
  },
  {
    num: "04",
    title: "確認・修正",
    desc: "仮サイトでご確認いただき、フィードバックをもとに修正。ご納得いくまで調整します。",
    image: "/images/tsukigaku/flow-04-review.jpg",
  },
  {
    num: "05",
    title: "公開・運用開始",
    desc: "本番公開。公開後も月2回まで修正対応込み。サイトを常に最新の状態に保ちます。",
    image: "/images/tsukigaku/flow-05-launch.jpg",
  },
];

function Flow() {
  return (
    <section className="py-[120px] md:py-[180px] px-6 bg-black">
      <div className="max-w-[1100px] mx-auto">
        <p className="text-blue-400 text-[11px] font-semibold tracking-[0.25em] uppercase mb-5 text-center">
          導入の流れ
        </p>
        <h2
          className="font-light tracking-[-0.03em] text-white text-center"
          style={{ fontSize: "clamp(2rem, 5vw, 48px)" }}
        >
          公開まで、最短1週間。
        </h2>

        <div className="mt-16 md:mt-24 space-y-16 md:space-y-24">
          {flowSteps.map((step, i) => (
            <ScrollReveal key={step.num}>
              <div className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8 md:gap-14`}>
                {/* Image */}
                <div className="relative w-full md:w-1/2 aspect-[16/10] rounded-2xl overflow-hidden">
                  <Image src={step.image} alt={step.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 550px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 flex items-center justify-center">
                    <span className="text-blue-400 text-[13px] font-semibold">{step.num}</span>
                  </div>
                </div>
                {/* Text */}
                <div className="w-full md:w-1/2">
                  <h3 className="text-white font-medium text-[22px] md:text-[28px] tracking-[-0.02em]">{step.title}</h3>
                  <p className="text-white/60 text-[15px] md:text-[16px] font-light leading-[1.8] mt-4">{step.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section className="py-[120px] md:py-[160px] px-6 bg-black">
      <ScrollReveal>
        <h2
          className="font-light tracking-[-0.03em] text-center text-white"
          style={{ fontSize: "clamp(1.8rem, 4vw, 48px)" }}
        >
          よくある質問
        </h2>
      </ScrollReveal>
      <div className="max-w-[600px] mx-auto mt-14">
        {faqItems.map((item, i) => (
          <div key={i} className="border-b border-white/10">
            <button
              className="w-full flex justify-between items-center py-6 text-left text-[15px] font-medium text-white"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              {item.q}
              <motion.span
                className="text-xl text-white/40"
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
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                  style={{ willChange: "height, opacity" }}
                >
                  <p className="text-white/50 text-sm leading-relaxed pb-6">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════ TECH STACK ═══════════════════ */
const techCards = [
  {
    name: "Next.js 16",
    headline: "3秒待てず、客は去る。",
    desc: "表示が遅いだけで売上は落ちます。Appleも使う最新技術で、タップした瞬間もう表示されている。その速さが予約率を変えます。",
    gradient: "from-[#111] to-[#000]",
    accent: "text-white",
    image: "/images/tsukigaku/tech/nextjs.png",
  },
  {
    name: "React 19",
    headline: "Apple、Netflix。同じ土俵。",
    desc: "世界のトップ企業が採用する技術で、あなたのお店のサイトを作ります。お客様が「このお店、ちゃんとしてる」と感じる操作感。",
    gradient: "from-[#0a1628] to-[#000]",
    accent: "text-blue-400",
    image: "/images/tsukigaku/tech/react.png",
  },
  {
    name: "TypeScript 5",
    headline: "「繋がらない」が起きない。",
    desc: "予約フォームが動かない、画像が出ない。そんなトラブルを設計段階から防ぐ技術。営業中に壊れないサイトを保証します。",
    gradient: "from-[#0a1420] to-[#000]",
    accent: "text-blue-300",
    image: "/images/tsukigaku/tech/typescript.png",
  },
  {
    name: "Tailwind CSS 4",
    headline: "スマホでも、PCでも美しい。",
    desc: "お客様の7割はスマホで見ています。どの画面サイズでもレイアウトが崩れない。それだけで離脱率は下がります。",
    gradient: "from-[#061418] to-[#000]",
    accent: "text-cyan-400",
    image: "/images/tsukigaku/tech/tailwind.png",
  },
  {
    name: "GSAP + Motion",
    headline: "iPhoneの商品ページ、見たことありますか？",
    desc: "スクロールするたびに商品が動き出す、あのワクワク感。同じ技術で、お店の魅力を「体験」に変えます。",
    gradient: "from-[#0a1a0a] to-[#000]",
    accent: "text-green-400",
    image: "/images/tsukigaku/tech/gsap.png",
  },
  {
    name: "Lenis",
    headline: "「なんか気持ちいい」の正体。",
    desc: "高級サイトを触ったとき、なぜか長く見てしまう。その秘密がスクロールの滑らかさ。滞在時間が伸びれば、予約も増えます。",
    gradient: "from-[#1a120a] to-[#000]",
    accent: "text-orange-300",
    image: "/images/tsukigaku/tech/lenis.png",
  },
  {
    name: "shadcn/ui",
    headline: "迷わせない、だから押す。",
    desc: "ボタン、フォーム、メニュー。すべてが直感的で、年配のお客様でも迷わず予約完了まで辿り着けます。",
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

function TechCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("div")?.offsetWidth ?? 500;
    el.scrollBy({ left: dir === "left" ? -cardWidth - 20 : cardWidth + 20, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Arrow buttons — PC only */}
      <button
        onClick={() => scroll("left")}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
        aria-label="前へ"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
      </button>
      <button
        onClick={() => scroll("right")}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors"
        aria-label="次へ"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
      </button>

      <div
        ref={scrollRef}
        className="flex gap-5 md:gap-8 overflow-x-scroll px-[8vw] pb-6"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {techCards.map((tech) => (
          <div
            key={tech.name}
            className={`relative w-[85vw] md:w-[60vw] md:max-w-[700px] shrink-0 rounded-3xl bg-gradient-to-b ${tech.gradient} border border-white/[0.08] overflow-hidden`}
            style={{ scrollSnapAlign: "center" }}
          >
            {/* Big image */}
            <div className="relative w-full aspect-[4/3] overflow-hidden">
              <Image src={tech.image} alt={tech.name} fill className="object-cover" sizes="(max-width:768px) 85vw, 700px" />
              <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/90 to-transparent" />
              <div className="absolute bottom-6 left-7 right-7">
                <p className={`${tech.accent} text-[12px] font-semibold tracking-[0.15em] uppercase mb-1`}>{tech.name}</p>
                <h3 className="text-white font-medium text-[28px] md:text-[36px] tracking-[-0.02em] leading-tight">{tech.headline}</h3>
              </div>
            </div>
            {/* Description */}
            <div className="px-7 py-6">
              <p className="text-white/40 text-[14px] md:text-[16px] font-light leading-[1.7]">{tech.desc}</p>
            </div>
          </div>
        ))}
        <div className="shrink-0 w-[8vw]" />
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
            style={{ fontSize: "clamp(2.2rem, 7vw, 72px)" }}
          >
            iPhoneの商品ページ、
            <br />
            見たことありますか。
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <p className="text-white/50 text-[clamp(0.9rem,1.6vw,1.1rem)] mt-6 font-light max-w-[600px] mx-auto leading-relaxed text-center">
            あのスクロールした時のワクワク。画面が動き出す滑らかさ。あなたのお店のサイトでも、同じことができます。
          </p>
        </ScrollReveal>
      </div>

      {/* Carousel with arrow nav for PC */}
      <TechCarousel />
    </section>
  );
}

/* ═══════════════════ FOUNDER ═══════════════════ */
function Founder() {
  return (
    <section className="py-[120px] md:py-[160px] px-6 bg-[#0a0a0a]">
      <div className="max-w-[700px] mx-auto text-center">
        <ScrollReveal>
          <p className="text-blue-400 text-[11px] font-semibold tracking-[0.25em] uppercase mb-5">
            代表より
          </p>
          <h2
            className="font-light tracking-[-0.03em] text-white leading-[1.2]"
            style={{ fontSize: "clamp(1.8rem, 4vw, 36px)" }}
          >
            なぜ、月額9,800円で<br />
            できるのか。
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <div className="mt-12 text-white/60 text-[15px] md:text-[16px] font-light leading-[2] text-left space-y-6">
            <p>
              HP制作会社に勤めていた頃、いつも疑問でした。なぜ50万円もかかるのか。なぜ営業マンと下請けの中間マージンがこんなに高いのか。
            </p>
            <p>
              お客さんが本当に欲しいのは「おしゃれなHP」じゃない。お客さんが来ること。予約が入ること。それだけなんです。
            </p>
            <p>
              AIと最新技術を使えば、大手と同じ品質のサイトを、中間マージンなしで作れる。だから月額9,800円。
            </p>
            <p>
              「安かろう悪かろう」ではありません。使っている技術は全て公開しています。品質は、このサイト自体が証明です。
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

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
            style={{ fontSize: "clamp(2.2rem, 7vw, 80px)" }}
            initial={{ filter: "blur(16px)", scale: 0.95 }}
            whileInView={{ filter: "blur(0px)", scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            あなたのお店の<br className="md:hidden" />サイト、
            <br className="hidden md:block" />
            一緒に作りませんか。
          </motion.h2>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <p className="text-white/30 text-[clamp(0.9rem,1.6vw,1.1rem)] mt-6 font-light">
            初期費用0円。30分の無料相談で、あなたの業種に合ったサイトをご提案します。
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.25}>
          <a
            href="#contact"
            className="inline-block mt-12 px-10 py-4 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform text-[15px]"
          >
            今すぐ無料相談する
          </a>
          <p className="text-white/30 text-[12px] mt-4">初期費用0円・クレジットカード不要</p>
        </ScrollReveal>
      </div>
    </section>
  );
}

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

/* ═══════════════════ STORY BRIDGE ═══════════════════ */
function StoryBridge({ text }: { text: string }) {
  return (
    <div className="py-16 md:py-24 bg-black px-6">
      <ScrollReveal>
        <motion.p
          className="text-center font-light text-white/40 leading-relaxed max-w-[600px] mx-auto"
          style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)" }}
          initial={{ filter: "blur(10px)" }}
          whileInView={{ filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          {text}
        </motion.p>
      </ScrollReveal>
    </div>
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
      <InteractiveDemo />
      <ProblemAgitation />
      <Comparison />
      <TechStack />
      <Pricing />
      <Flow />
      <Founder />
      <FAQ />
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
              <input type="text" id="name" name="name" required className="w-full px-4 py-3.5 rounded-xl bg-white/[0.06] border border-white/10 text-white text-[15px] placeholder-white/30 focus:outline-none focus:border-blue-500/50 transition-colors" placeholder="山田 太郎" />
            </div>
            <div>
              <label htmlFor="business" className="block text-white/60 text-[13px] mb-2">業種・店舗名</label>
              <input type="text" id="business" name="business" className="w-full px-4 py-3.5 rounded-xl bg-white/[0.06] border border-white/10 text-white text-[15px] placeholder-white/30 focus:outline-none focus:border-blue-500/50 transition-colors" placeholder="飲食店「〇〇」" />
            </div>
            <div>
              <label htmlFor="email" className="block text-white/60 text-[13px] mb-2">メールアドレス</label>
              <input type="email" id="email" name="email" required className="w-full px-4 py-3.5 rounded-xl bg-white/[0.06] border border-white/10 text-white text-[15px] placeholder-white/30 focus:outline-none focus:border-blue-500/50 transition-colors" placeholder="info@example.com" />
            </div>
            <div>
              <label htmlFor="message" className="block text-white/60 text-[13px] mb-2">ご相談内容（任意）</label>
              <textarea id="message" name="message" rows={4} className="w-full px-4 py-3.5 rounded-xl bg-white/[0.06] border border-white/10 text-white text-[15px] placeholder-white/30 focus:outline-none focus:border-blue-500/50 transition-colors resize-none" placeholder="どんなサイトにしたいか、お気軽にお書きください" />
            </div>
            <button type="submit" className="w-full py-4 bg-white text-black font-semibold rounded-full hover:scale-[1.02] transition-transform text-[16px]">
              送信する
            </button>
          </form>
          <div className="mt-10 text-center">
            <a href="https://line.me/R/" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-3 rounded-full bg-[#06C755] text-white font-medium text-[15px] hover:bg-[#05b34c] transition-colors">
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
