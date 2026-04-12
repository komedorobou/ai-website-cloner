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
  const [videoEnded, setVideoEnded] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleEnded = () => setVideoEnded(true);
    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, []);

  return (
    <section ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-black">
        {/* Cinematic background video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          playsInline
          loop
          poster="/images/tsukigaku/hero-dark.png"
        >
          <source src="/videos/hero-laptop.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/30 z-[1]" />

        {/* Center text overlay */}
        <motion.div
          className="relative z-10 text-center px-6"
          style={{ y: textY, opacity: textOpacity }}
        >
          <motion.h1
            className="font-extralight tracking-[-0.04em] text-white leading-[0.95]"
            style={{ fontSize: "clamp(3.5rem, 12vw, 96px)" }}
            initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            Apple級の
            <br />
            Webサイトを。
          </motion.h1>
          <motion.p
            className="text-white/50 text-[clamp(0.9rem,1.8vw,1.2rem)] mt-6 font-light tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            月額9,800円
          </motion.p>
          <motion.a
            href="#pricing"
            className="inline-block mt-10 px-8 py-3.5 text-[14px] font-medium rounded-full bg-white text-black hover:scale-105 transition-transform"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            まずは相談する
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity: scrollOpacity }}
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
    image: "/images/tsukigaku/ramen-hero.png",
    accent: "#f97316",
  },
  {
    label: "BEAUTY SALON",
    industry: "美容室",
    heading: "美が、歩いてくる。",
    image: "/images/tsukigaku/salon-new.png",
    accent: "#ec4899",
  },
  {
    label: "CLINIC",
    industry: "クリニック",
    heading: "安心が、見える。",
    image: "/images/tsukigaku/clinic-new.png",
    accent: "#06b6d4",
  },
  {
    label: "CAFE",
    industry: "カフェ",
    heading: "香りが、漂う。",
    image: "/images/tsukigaku/cafe-new.png",
    accent: "#a16207",
  },
];

function IndustryShowcase() {
  return (
    <div>
      {industries.map((item, i) => (
        <section key={item.label} className="relative h-screen flex items-end overflow-hidden">
          {/* Full bleed image with clip-path reveal */}
          <motion.div
            className="absolute inset-0"
            initial={{ clipPath: "inset(10% 10% 10% 10%)" }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image src={item.image} alt={item.industry} fill className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </motion.div>

          {/* Minimal text overlay */}
          <div className="relative z-10 w-full px-8 md:px-20 pb-20 md:pb-28">
            <motion.div
              initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px" style={{ backgroundColor: item.accent }} />
                <span
                  className="text-[10px] font-semibold tracking-[0.3em] uppercase"
                  style={{ color: item.accent }}
                >
                  {item.industry}
                </span>
              </div>
              <h2
                className="font-extralight tracking-[-0.02em] text-white leading-[1.1]"
                style={{ fontSize: "clamp(2.5rem, 7vw, 72px)" }}
              >
                {item.heading}
              </h2>
            </motion.div>
          </div>
        </section>
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
      <Problem />
      <MockupReveal />
      <IndustryShowcase />
      <BeforeAfter />
      <Philosophy />
      <Pricing />
      <FAQ />
      <CTAFinal />
      <footer className="text-center py-10 text-[11px] text-white/20 border-t border-white/5 bg-black">
        &copy; 2026 ツキガクサイト
      </footer>
    </main>
  );
}
