"use client";

import { ScrollReveal } from "@/components/animation/scroll-reveal";
import { ParallaxLayer } from "@/components/animation/parallax-layer";
import { StaggerContainer } from "@/components/animation/stagger-container";
import { StickySection } from "@/components/animation/sticky-section";
import { useState } from "react";
import Image from "next/image";

const colors = [
  { name: "Midnight Titanium", hex: "#2C2C2E", bg: "bg-[#2C2C2E]" },
  { name: "Natural Titanium", hex: "#B5B0A8", bg: "bg-[#B5B0A8]" },
  { name: "Desert Titanium", hex: "#C4A882", bg: "bg-[#C4A882]" },
  { name: "Ocean Titanium", hex: "#4A6B8A", bg: "bg-[#4A6B8A]" },
  { name: "Rose Titanium", hex: "#C4898A", bg: "bg-[#C4898A]" },
];

const specs = [
  { label: "Display", value: '8.4"', desc: "Neural Retina 16K" },
  { label: "Chip", value: "A24 Ultra", desc: "2048-core Neural Engine" },
  { label: "Camera", value: "1.2GP", desc: "1.2 Gigapixel Quantum Array" },
  { label: "Battery", value: "∞", desc: "Nuclear Micro Cell" },
  { label: "Storage", value: "128PB", desc: "Petabyte SSD" },
  { label: "RAM", value: "8TB", desc: "Unified Memory" },
  { label: "Speed", value: "900TF", desc: "900 Teraflops" },
];

const features = [
  {
    tag: "Camera System",
    title: "1.2 Gigapixel.\nReality is not\nenough.",
    desc: "1,200,000,000ピクセル。量子光学レンズアレイが光子レベルで光を捕捉。月面のクレーターを地球から撮影可能。暗闇でも昼間のように。もはやカメラではなく、光の再構築エンジン。",
    gradient: "from-purple-500/20 via-transparent to-blue-500/10",
    image: "/ai-website-cloner/images/camera.png",
  },
  {
    tag: "Performance",
    title: "A24 Ultra.\nスパコンを\nポケットに。",
    desc: "900テラフロップス。世界最速のスーパーコンピュータ「富岳」の2倍の演算能力を0.3mmのチップに凝縮。2048コアのニューラルエンジンが、あなたの思考より先に答えを出す。",
    gradient: "from-orange-500/15 via-transparent to-red-500/10",
    image: "/ai-website-cloner/images/chip.png",
  },
  {
    tag: "Design",
    title: "Titanium.\n0.8mm.\n不可能を形に。",
    desc: "NASAの火星探査機と同じGrade 23チタン合金。厚さ0.8mm。重さ98g。それでいて戦車の装甲より硬い。落としても、踏んでも、車で轢いても。壊れない、という設計思想。",
    gradient: "from-amber-500/10 via-transparent to-stone-500/10",
    image: "/ai-website-cloner/images/titanium.png",
  },
  {
    tag: "Battery",
    title: "充電という\n概念を\n終わらせた。",
    desc: "核マイクロセルテクノロジー。半減期100年のベータ崩壊エネルギーを電力に変換。充電不要。永久稼働。あなたが生きている間、バッテリーは切れない。128ペタバイトSSDと8TBユニファイドメモリが、人類の全知識を手のひらに収める。",
    gradient: "from-green-500/15 via-transparent to-emerald-500/10",
    image: "/ai-website-cloner/images/battery.png",
  },
];

export default function Home() {
  const [selectedColor, setSelectedColor] = useState(0);
  const [stickyProgress, setStickyProgress] = useState(0);

  return (
    <main className="bg-black text-white overflow-hidden">
      {/* ===== NAV ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-[1024px] mx-auto px-6 h-12 flex items-center justify-between">
          <svg width="18" height="22" viewBox="0 0 18 22" fill="white" className="opacity-80">
            <path d="M14.94 5.19A4.38 4.38 0 0 0 12 3.7a4.53 4.53 0 0 0-3 1.49A4.38 4.38 0 0 0 12 0a4.53 4.53 0 0 0 2.94 5.19ZM12 7.09c-2.25 0-3.44 1.5-5.12 1.5C5.31 8.59 3.56 7 1.5 7 .35 8.81 0 11 0 13.5c0 4.41 3 8.5 5.31 8.5 1.5 0 2.44-1 4.19-1s2.44 1 4.19 1C16 22 18 17.91 18 13.5c0-2.5-.35-4.69-1.5-6.5-1.31.09-2.81 1.59-4.5.09Z"/>
          </svg>
          <span className="text-[13px] font-medium tracking-tight opacity-80">iPhone 21 Shirouto</span>
          <a href="#buy" className="text-[13px] bg-blue-500 hover:bg-blue-400 text-white px-4 py-1.5 rounded-full transition-colors font-medium">
            Buy
          </a>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="min-h-[100vh] relative overflow-hidden">
        {/* 背景にiPhoneをどーんと表示 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <ScrollReveal duration={1.5} delay={0.3} direction="none">
            <Image
              src="/ai-website-cloner/images/hero-phone.png"
              alt="iPhone 21 Shirouto"
              width={1024}
              height={1024}
              className="w-[90vw] md:w-[70vw] lg:w-[55vw] max-w-[700px] h-auto drop-shadow-[0_0_120px_rgba(120,120,255,0.2)]"
              priority
            />
          </ScrollReveal>
        </div>
        {/* グラデーションオーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black pointer-events-none" />
        {/* テキスト（上部） */}
        <div className="relative z-10 pt-32 md:pt-40 text-center px-6">
          <ScrollReveal duration={1} delay={0.2}>
            <p className="text-[13px] md:text-sm tracking-[0.2em] uppercase text-orange-400 font-medium mb-4">
              Introducing
            </p>
          </ScrollReveal>
          <ScrollReveal duration={1.2} delay={0.4}>
            <h1 className="text-[64px] md:text-[96px] lg:text-[120px] font-bold tracking-[-0.04em] leading-[0.9] mb-6">
              iPhone 21 Shirouto
            </h1>
          </ScrollReveal>
          <ScrollReveal duration={1} delay={0.6}>
            <p className="text-xl md:text-3xl font-medium text-white/70 tracking-tight mb-2">
              Beyond everything. Beyond imagination.
            </p>
          </ScrollReveal>
        </div>
        {/* テキスト（下部） */}
        <div className="absolute bottom-16 md:bottom-24 left-0 right-0 z-10 text-center px-6">
          <ScrollReveal duration={0.8} delay={0.8}>
            <p className="text-lg md:text-xl text-white/50 tracking-tight mb-6">
              From ----
            </p>
            <div className="flex items-center justify-center gap-4">
              <a href="#buy" className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-3 rounded-full text-[15px] font-semibold transition-all hover:scale-105">
                Buy
              </a>
              <a href="#features" className="text-blue-400 hover:text-blue-300 text-[15px] font-semibold transition-colors">
                Learn more &rarr;
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== SPECS STRIP ===== */}
      <section className="py-24 border-t border-white/5 bg-black">
        <div className="max-w-[1024px] mx-auto px-6">
          <StaggerContainer stagger={0.08} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 md:gap-4">
            {specs.map((spec) => (
              <div key={spec.label} className="text-center">
                <p className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-2 font-medium">{spec.label}</p>
                <p className="text-3xl md:text-4xl font-bold tracking-tight">{spec.value}</p>
                <p className="text-[13px] text-white/40 mt-1">{spec.desc}</p>
              </div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== FEATURE SECTIONS ===== */}
      {features.map((feature, i) => (
        <section key={feature.tag} className="min-h-screen flex items-center relative overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient}`} />
          <div className="max-w-[1024px] mx-auto px-6 py-32 relative z-10">
            <div className={`grid md:grid-cols-2 gap-16 items-center ${i % 2 === 1 ? "md:grid-flow-dense" : ""}`}>
              <div className={i % 2 === 1 ? "md:col-start-2" : ""}>
                <ScrollReveal direction={i % 2 === 0 ? "left" : "right"} distance={48}>
                  <p className="text-[11px] tracking-[0.25em] uppercase text-blue-400 font-semibold mb-6">{feature.tag}</p>
                  <h2 className="text-[40px] md:text-[56px] lg:text-[64px] font-bold tracking-[-0.03em] leading-[1.05] mb-8 whitespace-pre-line">
                    {feature.title}
                  </h2>
                  <p className="text-[17px] md:text-lg text-white/50 leading-relaxed max-w-md">
                    {feature.desc}
                  </p>
                </ScrollReveal>
              </div>
              <div className={i % 2 === 1 ? "md:col-start-1" : ""}>
                <ParallaxLayer speed={0.15}>
                  <ScrollReveal delay={0.2}>
                    <div className="rounded-[32px] overflow-hidden">
                      <Image
                        src={feature.image}
                        alt={feature.tag}
                        width={1024}
                        height={1024}
                        className="w-full h-auto"
                      />
                    </div>
                  </ScrollReveal>
                </ParallaxLayer>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ===== COLOR PICKER ===== */}
      <section className="py-32 bg-black">
        <div className="max-w-[1024px] mx-auto px-6 text-center">
          <ScrollReveal>
            <p className="text-[11px] tracking-[0.25em] uppercase text-white/30 font-semibold mb-4">Finish</p>
            <h2 className="text-[40px] md:text-[56px] font-bold tracking-[-0.03em] mb-4">
              Pick your perfect finish.
            </h2>
            <p className="text-lg text-white/40 mb-16 max-w-lg mx-auto">
              Five new titanium finishes, each with a micro-blasted texture that feels as good as it looks.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="w-[240px] md:w-[300px] h-[480px] md:h-[600px] mx-auto rounded-[44px] border border-white/10 mb-12 transition-colors duration-700 relative overflow-hidden"
              style={{ backgroundColor: colors[selectedColor].hex }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black/40 rounded-b-xl" />
              <div className="absolute inset-3 rounded-[36px] bg-black/30 backdrop-blur-sm flex items-center justify-center">
                <p className="text-[56px] md:text-[72px] font-thin text-white/30 tracking-tighter">21</p>
              </div>
            </div>
          </ScrollReveal>

          <StaggerContainer stagger={0.05}>
            <div className="flex items-center justify-center gap-4 mb-4">
              {colors.map((color, i) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(i)}
                  className={`w-8 h-8 rounded-full transition-all duration-300 border-2 ${
                    selectedColor === i
                      ? "border-blue-400 scale-125"
                      : "border-white/20 hover:border-white/40"
                  }`}
                  style={{ backgroundColor: color.hex }}
                  aria-label={color.name}
                />
              ))}
            </div>
            <p className="text-[15px] text-white/50 font-medium transition-all duration-500">
              {colors[selectedColor].name}
            </p>
          </StaggerContainer>
        </div>
      </section>

      {/* ===== STICKY SCROLL EXPERIENCE ===== */}
      <section className="border-t border-white/5">
        <StickySection scrollLength={3} onProgress={setStickyProgress} className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
          <div className="text-center px-6 relative z-10">
            <p className="text-[11px] tracking-[0.25em] uppercase text-blue-400 font-semibold mb-6">
              Apple Intelligence
            </p>
            <h2 className="text-[40px] md:text-[56px] lg:text-[72px] font-bold tracking-[-0.03em] leading-[1.05] mb-8 transition-all duration-300"
              style={{
                opacity: Math.min(1, stickyProgress * 3),
                transform: `translateY(${Math.max(0, 40 - stickyProgress * 120)}px) scale(${0.9 + stickyProgress * 0.1})`,
              }}
            >
              Intelligence that<br />
              understands<br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                you.
              </span>
            </h2>
            <p className="text-[17px] md:text-lg text-white/40 max-w-lg mx-auto transition-all duration-300"
              style={{
                opacity: Math.max(0, Math.min(1, (stickyProgress - 0.3) * 3)),
                transform: `translateY(${Math.max(0, 30 - (stickyProgress - 0.3) * 100)}px)`,
              }}
            >
              汎用人工超知能を搭載。あなたが考える前に答えを出し、あなたが話す前に相手の感情を読み、あなたが動く前に最適な行動を実行する。もはやツールではない。パートナーだ。
            </p>
            <div className="mt-12 flex justify-center gap-8 flex-wrap"
              style={{
                opacity: Math.max(0, Math.min(1, (stickyProgress - 0.5) * 3)),
                transform: `translateY(${Math.max(0, 30 - (stickyProgress - 0.5) * 100)}px)`,
              }}
            >
              {["Quantum AI", "Mind Link", "Time Predict", "Reality Render", "DNA Scan", "Teleport Draft"].map((item) => (
                <div key={item} className="px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-[13px] font-medium text-white/60">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </StickySection>
      </section>

      {/* ===== CTA ===== */}
      <section id="buy" className="py-32 bg-black border-t border-white/5">
        <div className="max-w-[1024px] mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="text-[40px] md:text-[56px] lg:text-[64px] font-bold tracking-[-0.03em] leading-tight mb-6">
              The future is in<br />your hands.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lg text-white/40 mb-10 max-w-md mx-auto">
              iPhone 21 Shirouto. Starting from ----
            </p>
          </ScrollReveal>
          <StaggerContainer stagger={0.1}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#" className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-3.5 rounded-full text-[15px] font-semibold transition-all hover:scale-105 hover:shadow-[0_0_32px_rgba(59,130,246,0.3)]">
                Buy iPhone 21 Shirouto
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-300 px-8 py-3.5 text-[15px] font-semibold transition-colors">
                Learn more &rarr;
              </a>
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-[1024px] mx-auto px-6">
          <p className="text-[11px] text-white/20 leading-relaxed">
            iPhone 21 Shirouto is a concept design. Features and specifications are fictional and for demonstration purposes only. Apple, iPhone, and the Apple logo are trademarks of Apple Inc. This page was built to demonstrate scroll animation capabilities.
          </p>
        </div>
      </footer>
    </main>
  );
}
