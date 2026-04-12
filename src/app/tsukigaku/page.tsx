"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ScrollReveal } from "@/components/animation/scroll-reveal";
import { ParallaxLayer } from "@/components/animation/parallax-layer";
import { StaggerContainer } from "@/components/animation/stagger-container";

/* ═══════════════════ NAV ═══════════════════ */
function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-[52px] flex items-center justify-between px-6 md:px-12 bg-white/80 backdrop-blur-xl border-b border-black/5">
      <span className="font-bold text-[15px] tracking-tight">ツキガクサイト</span>
      <a href="#pricing" className="text-[13px] font-medium px-4 py-1.5 rounded-full bg-[#0071e3] text-white hover:bg-[#0077ED] transition-colors">
        お問い合わせ
      </a>
    </nav>
  );
}

/* ═══════════════════ HERO ═══════════════════ */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const ramenScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.7]);
  const ramenY = useTransform(scrollYProgress, [0, 0.6], ["0%", "-10%"]);
  const ramenOpacity = useTransform(scrollYProgress, [0.3, 0.6], [1, 0]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[200vh] bg-white">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-start">
        {/* Warm glow */}
        <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[65vw] h-[65vw] max-w-[700px] max-h-[700px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(251,146,60,0.38) 0%, rgba(245,158,11,0.22) 40%, transparent 70%)", filter: "blur(48px)" }} />

        {/* Ramen FULL SCREEN */}
        <motion.div
          className="absolute inset-0 z-10 flex items-center justify-center"
          style={{ scale: ramenScale, y: ramenY, opacity: ramenOpacity }}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image src="/images/tsukigaku/ramen2.png" alt="ラーメン" fill priority className="object-cover" sizes="100vw" />
        </motion.div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 z-[15] bg-gradient-to-b from-white/60 via-transparent to-white/90" />

        {/* Text - minimal, overlaid */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-20 px-6">
          <motion.h1 className="text-center font-extrabold tracking-[-0.04em] text-[#1d1d1f]" style={{ fontSize: "clamp(3rem, 9vw, 7rem)", lineHeight: 1 }} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1 }}>
            <span className="bg-gradient-to-r from-[#0071e3] to-[#30d158] bg-clip-text text-transparent">月9,800円</span>
          </motion.h1>
          <motion.p className="text-[#1d1d1f]/70 text-[clamp(1rem,2vw,1.3rem)] mt-3 font-medium" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }}>
            Apple級のWebサイトを。
          </motion.p>
          <motion.a href="#pricing" className="mt-8 px-10 py-4 bg-[#0071e3] text-white text-base font-semibold rounded-full hover:bg-[#0077ED] transition-all hover:scale-105 shadow-xl shadow-blue-300/40" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.8 }}>
            まずは相談する
          </motion.a>
        </div>

        {/* Scroll indicator */}
        <motion.div style={{ opacity: scrollIndicatorOpacity }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-30 text-[10px] text-[#a1a1a6] tracking-[0.2em] uppercase">
          scroll
          <motion.div className="w-px h-8 bg-[#a1a1a6]" animate={{ scaleY: [1, 0.4, 1], opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 2 }} />
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════ PROBLEM ═══════════════════ */
function Problem() {
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center bg-[#fafafa]">
      <ScrollReveal>
        <h2 className="text-[clamp(2.5rem,7vw,5rem)] font-extrabold tracking-[-0.04em] leading-[1.05] text-[#1d1d1f]">
          ホームページ、<br />ちゃんと<span className="text-[#0071e3]">「売れて」</span>ますか？
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={0.2}><p className="text-[#6e6e73] text-xl leading-relaxed mt-8 font-light max-w-[480px]">きれいなだけでは意味がない。</p></ScrollReveal>
    </section>
  );
}

/* ═══════════════════ STICKY SHOWCASE ═══════════════════ */
const scenes = [
  { label: "RESTAURANT", industry: "飲食店", heading: "湯気まで\n伝わるサイト", desc: "料理の温度感、食材の瑞々しさ、\n厨房の熱気まで届けるビジュアル体験。", image: "/images/tsukigaku/ramen2.png", accent: "#3b82f6" },
  { label: "BEAUTY SALON", industry: "美容室", heading: "モデルが\n歩いてくるサイト", desc: "洗練されたビジュアルと余白の美学で、\nブランドの世界観を余すことなく表現。", image: "/images/tsukigaku/salon2.png", accent: "#60a5fa" },
  { label: "CLINIC", industry: "クリニック", heading: "清潔感が画面から\n伝わるサイト", desc: "信頼と安心をデザインで体現。\nミニマルな構成で患者の不安を取り除く。", image: "/images/tsukigaku/clinic2.png", accent: "#93c5fd" },
];

function StickyShowcase() {
  return (
    <div className="bg-[#0a0a0a]">
      {scenes.map((scene, index) => (
        <section key={scene.label} className="relative min-h-screen flex items-center overflow-hidden">
          {/* Full bleed image */}
          <div className="absolute inset-0">
            <Image src={scene.image} alt={scene.industry} fill className="object-cover" sizes="100vw" priority={index === 0} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
          </div>
          {/* Text overlay at bottom */}
          <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 py-20 mt-auto">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-px" style={{ backgroundColor: scene.accent }} />
                <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: scene.accent }}>{scene.industry}</span>
              </div>
              <h2 className="font-extrabold tracking-tight text-white leading-[1.05] mb-4 whitespace-pre-line" style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)" }}>
                {scene.heading}
              </h2>
              <p className="text-white/50 text-base leading-relaxed font-light max-w-[400px]">
                {scene.desc}
              </p>
            </ScrollReveal>
          </div>
        </section>
      ))}
    </div>
  );
}

/* ═══════════════════ MOBILE ═══════════════════ */
function MobileSection() {
  return (
    <section className="overflow-hidden py-32 md:py-40">
      <div className="mx-auto max-w-[1080px] px-6 text-center">
        <ScrollReveal>
          <p className="text-[#0071e3] text-xs font-semibold tracking-[0.15em] uppercase mb-4">Mobile First</p>
          <h2 className="text-[clamp(1.8rem,4.5vw,2.8rem)] font-extrabold tracking-tight">スマホでも、この美しさ</h2>
          <p className="text-[#6e6e73] text-base mt-4 max-w-[480px] mx-auto">お客さんの8割はスマホで見ています。</p>
        </ScrollReveal>
        <div className="flex items-end justify-center gap-8 md:gap-12 mt-16">
          <ScrollReveal delay={0.1}>
            <ParallaxLayer speed={0.3}>
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}>
                <div className="relative overflow-hidden rounded-[24px]" style={{ width: "clamp(180px, 30vw, 240px)", height: "clamp(360px, 60vw, 480px)", boxShadow: "0 40px 80px -12px rgba(0,0,0,0.25)" }}>
                  <Image src="/images/tsukigaku/phone-food.png" alt="スマホ" fill className="object-cover" sizes="240px" />
                </div>
              </motion.div>
            </ParallaxLayer>
          </ScrollReveal>
          <ScrollReveal delay={0.22}>
            <ParallaxLayer speed={0.12}>
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}>
                <div className="relative overflow-hidden rounded-[16px]" style={{ width: "clamp(260px, 50vw, 420px)", height: "clamp(170px, 33vw, 280px)", boxShadow: "0 40px 80px -12px rgba(0,0,0,0.22)" }}>
                  <Image src="/images/tsukigaku/responsive.png" alt="レスポンシブ" fill className="object-cover" sizes="420px" />
                </div>
              </motion.div>
            </ParallaxLayer>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ PHILOSOPHY ═══════════════════ */
function Philosophy() {
  return (
    <section className="relative min-h-screen flex items-center bg-white overflow-hidden">
      {/* Full bleed image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image src="/images/tsukigaku/before-after2.png" alt="Philosophy" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/40" />
      </div>
      {/* Text overlay */}
      <div className="relative z-10 px-6 md:px-16 lg:px-24 py-32 max-w-[600px]">
        <ScrollReveal direction="left">
          <p className="text-[#0071e3] text-xs font-semibold tracking-[0.15em] uppercase mb-6">Our Philosophy</p>
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-extrabold tracking-[-0.03em] leading-[1.05]">作るためじゃない。<br />売るために作る。</h2>
          <p className="text-[#6e6e73] text-lg leading-relaxed mt-8 font-light">写真どーん。1スクロールごとに感情が動いて、最後に「行きたい」にたどり着く。それが感動の動線。</p>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ═══════════════════ BEFORE/AFTER ═══════════════════ */
function BeforeAfter() {
  return (
    <section className="py-32 md:py-40 bg-[#1d1d1f] overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-6">
        <ScrollReveal><h2 className="text-white font-extrabold text-center leading-[1.1] mb-16" style={{ fontSize: "clamp(3rem, 8vw, 5rem)" }}>この差、月9,800円</h2></ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ScrollReveal direction="left" delay={0.15}>
            <div className="rounded-[24px] overflow-hidden bg-[#2c2c2e] border border-[#3a3a3c]">
              <div className="px-5 pt-5 pb-3"><span className="text-[#8e8e93] text-xs font-bold uppercase tracking-[0.2em] bg-[#3a3a3c] px-3 py-1 rounded-full">BEFORE</span></div>
              <div className="relative w-full aspect-[3/2] overflow-hidden"><Image src="/images/tsukigaku/before-after2.png" alt="Before" fill className="object-cover opacity-60 grayscale" /></div>
              <div className="px-5 py-4"><p className="text-[#636366] text-sm">情報が散漫で、見る人の心が動かない。</p></div>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.3}>
            <div className="rounded-[24px] overflow-hidden bg-[#1c2a3a] border border-blue-500/60" style={{ boxShadow: "0 0 0 1px rgba(59,130,246,0.3), 0 20px 60px -12px rgba(59,130,246,0.25)" }}>
              <div className="px-5 pt-5 pb-3"><span className="text-blue-400 text-xs font-bold uppercase tracking-[0.2em] bg-blue-500/15 px-3 py-1 rounded-full">AFTER</span></div>
              <div className="relative w-full aspect-[3/2] overflow-hidden"><Image src="/images/tsukigaku/responsive.png" alt="After" fill className="object-cover" /></div>
              <div className="px-5 py-4"><p className="text-[#aeaeb2] text-sm">1スクロールごとに感情が動き、「行きたい」が自然に生まれる。</p></div>
            </div>
          </ScrollReveal>
        </div>
        <ScrollReveal delay={0.45}><p className="text-center text-[#636366] text-sm mt-12">初期費用ゼロ・月額9,800円〜 — いつでも解約可能</p></ScrollReveal>
      </div>
    </section>
  );
}

/* ═══════════════════ CAFE ═══════════════════ */
function CafeSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Full bleed cafe image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image src="/images/tsukigaku/cafe.png" alt="カフェ" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/50 to-transparent" />
      </div>
      {/* Text overlay - right side */}
      <div className="relative z-10 ml-auto px-6 md:px-16 lg:px-24 py-32 max-w-[500px]">
        <ScrollReveal direction="right">
          <p className="text-blue-400 text-xs font-semibold tracking-[0.15em] uppercase mb-6">For Cafes</p>
          <h2 className="text-[clamp(2.5rem,5vw,3.5rem)] font-extrabold tracking-[-0.03em] leading-[1.05] text-white">あの空気感まで、<br />画面の中に。</h2>
          <p className="text-white/60 text-lg leading-relaxed mt-8 font-light">木の温もり、コーヒーの香り、焼きたてのパン。</p>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ═══════════════════ OWNER VOICE ═══════════════════ */
function OwnerVoice() {
  return (
    <section className="py-24 md:py-32 bg-[#f5f5f7]">
      <ScrollReveal>
        <div className="mx-auto max-w-[700px] px-6 flex flex-col md:flex-row items-center gap-10">
          <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-2xl ring-4 ring-white flex-shrink-0">
            <Image src="/images/tsukigaku/owner.png" alt="オーナー" fill className="object-cover" sizes="160px" />
          </div>
          <div className="text-center md:text-left">
            <p className="text-[#0071e3] text-xs font-semibold tracking-[0.15em] uppercase mb-3">Owner&apos;s Voice</p>
            <h3 className="font-bold text-xl tracking-tight mb-3">「うちの店がこんなサイトを持てるなんて」</h3>
            <p className="text-[#6e6e73] text-sm leading-relaxed">月9,800円でこのクオリティは信じられませんでした。お客さんから「サイト見て来ました」って言われることが増えて。</p>
            <div className="mt-4 flex justify-center md:justify-start gap-1">
              {Array.from({ length: 5 }).map((_, i) => (<svg key={i} className="h-4 w-4 text-[#f5a623]" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>))}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

/* ═══════════════════ PRICING ═══════════════════ */
function Pricing() {
  const features = ["Apple級プレミアムデザイン", "完全オーダーメイド（5ページまで）", "スクロールアニメーション標準搭載", "スマホ・タブレット完全対応", "月2回の修正対応込み", "ホスティング・SSL証明書込み", "初期費用0円"];
  const options = [{ p: "+500円", l: "独自ドメイン" }, { p: "+500円", l: "ページ追加" }, { p: "+500円", l: "アニメーション" }, { p: "+100円", l: "挿絵（1点）" }];

  return (
    <section id="pricing" className="py-32 md:py-40 px-6 text-center bg-white">
      <ScrollReveal>
        <p className="text-[#0071e3] text-xs font-semibold tracking-[0.15em] uppercase mb-4">Pricing</p>
        <h2 className="text-[clamp(1.8rem,4.5vw,3.2rem)] font-extrabold tracking-tight">シンプルな料金</h2>
      </ScrollReveal>
      <ScrollReveal delay={0.2}>
        <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="max-w-[480px] mx-auto mt-12 bg-white border-2 border-[#0071e3] rounded-[28px] overflow-hidden shadow-xl">
          <div className="bg-[#0071e3] text-white text-xs font-bold tracking-widest uppercase py-2 text-center">STANDARD PLAN</div>
          <div className="p-10">
            <div className="text-center mb-8">
              <span className="text-lg font-semibold align-top">&#165;</span>
              <span className="text-[4.5rem] font-black tracking-tight leading-none">9,800</span>
              <p className="text-[#6e6e73] text-sm mt-1">/月（税込）</p>
            </div>
            <ul className="space-y-0 mb-6">
              {features.map((f) => (<li key={f} className="flex items-center gap-3 py-3 border-b border-black/5 text-sm text-[#6e6e73]"><span className="w-5 h-5 rounded-full bg-[#30d158] flex-shrink-0 flex items-center justify-center"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></span>{f}</li>))}
            </ul>
            <div className="p-3 bg-[#f0fdf4] rounded-xl text-sm text-[#15803d] font-medium">修正依頼がない年は翌年10%割引。</div>
            <a href="#" className="block mt-6 py-3.5 bg-[#0071e3] text-white font-semibold rounded-2xl hover:bg-[#0077ED] transition-colors text-center shadow-lg shadow-blue-200/50">無料相談を予約する</a>
          </div>
        </motion.div>
      </ScrollReveal>
      <ScrollReveal delay={0.3}>
        <p className="text-[#6e6e73] text-sm mt-10 mb-4">オプション</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-[560px] mx-auto">
          {options.map((o) => (<div key={o.l} className="bg-[#f5f5f7] border border-black/5 rounded-xl p-4 text-center"><p className="font-bold text-lg">{o.p}</p><p className="text-[#6e6e73] text-xs mt-1">{o.l}</p></div>))}
        </div>
      </ScrollReveal>
    </section>
  );
}

/* ═══════════════════ FAQ ═══════════════════ */
const faqItems = [
  { q: "解約したらどうなりますか？", a: "サービスの提供が終了し、サイトは非公開になります。" },
  { q: "本当にApple級のクオリティですか？", a: "Apple.comと同じ技術スタック（Next.js、GSAP、スムーススクロール）を使用しています。" },
  { q: "どのくらいで完成しますか？", a: "最短1週間で初稿、通常2〜3週間で公開。" },
  { q: "写真素材がなくても？", a: "AI画像生成技術を活用します。" },
  { q: "修正は何回でも？", a: "月2回まで。修正ない年は翌年10%割引。" },
  { q: "個人事業主でも？", a: "法人・個人事業主OK。" },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section className="py-32 md:py-40 px-6">
      <ScrollReveal><p className="text-[#0071e3] text-xs font-semibold tracking-[0.15em] uppercase mb-4 text-center">FAQ</p><h2 className="text-[clamp(1.8rem,4.5vw,3.2rem)] font-extrabold tracking-tight text-center">よくある質問</h2></ScrollReveal>
      <div className="max-w-[640px] mx-auto mt-12">
        {faqItems.map((item, i) => (
          <ScrollReveal key={i} delay={i * 0.05}>
            <div className="border-b border-black/5">
              <button className="w-full flex justify-between items-center py-6 text-left text-[15px] font-semibold" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                {item.q}
                <motion.span className="text-xl text-[#a1a1a6]" animate={{ rotate: openIndex === i ? 45 : 0 }} transition={{ duration: 0.3 }}>+</motion.span>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <p className="text-[#6e6e73] text-sm leading-relaxed pb-6">{item.a}</p>
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
    <section className="relative py-36 md:py-44 px-6 bg-[#1d1d1f] text-white text-center overflow-hidden">
      <Image src="/images/tsukigaku/wave.png" alt="" width={1600} height={900} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] opacity-[0.06] pointer-events-none" />
      <ScrollReveal><h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold tracking-tight relative z-10">あなたのビジネスを、<br />Apple級に。</h2></ScrollReveal>
      <ScrollReveal delay={0.1}><p className="text-white/50 text-lg mt-4 relative z-10">初期費用0円。今すぐ無料相談から。</p></ScrollReveal>
      <ScrollReveal delay={0.2}><a href="#" className="inline-block mt-10 px-10 py-4 bg-white text-[#1d1d1f] font-semibold rounded-full hover:scale-105 transition-transform relative z-10 shadow-2xl">無料相談を予約する</a></ScrollReveal>
    </section>
  );
}

/* ═══════════════════ PAGE ═══════════════════ */
export default function TsukigakuPage() {
  return (
    <main className="bg-[#fafafa]">
      <Nav />
      <Hero />
      <Problem />
      <StickyShowcase />
      <MobileSection />
      <Philosophy />
      <BeforeAfter />
      <CafeSection />
      <OwnerVoice />
      <Pricing />
      <FAQ />
      <CTAFinal />
      <footer className="text-center py-10 text-xs text-[#a1a1a6] border-t border-black/5">&copy; 2026 ツキガクサイト. All rights reserved.</footer>
    </main>
  );
}
