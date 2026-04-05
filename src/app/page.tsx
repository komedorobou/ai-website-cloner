"use client";

import { ScrollReveal } from "@/components/animation/scroll-reveal";
import { ParallaxLayer } from "@/components/animation/parallax-layer";
import { StaggerContainer } from "@/components/animation/stagger-container";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const serif = "font-[family-name:var(--font-noto-serif-jp)]";

const heroImages = [
  { src: "/ai-website-cloner/images/hero-cafe.png", alt: "海の見えるカフェ店内" },
  { src: "/ai-website-cloner/images/hero-exterior.png", alt: "崖の上の白いカフェ外観" },
  { src: "/ai-website-cloner/images/hero-barista.png", alt: "バリスタのラテアート" },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <main className="bg-white text-[#1A1A1A] overflow-hidden">
      {/* ===== NAV — Kinfolk式：左ロゴ + 右ハンバーガー ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
        <div className="max-w-[1400px] mx-auto px-8 md:px-12 h-16 flex items-center justify-between">
          <span className={`text-[20px] tracking-[0.15em] uppercase text-white ${serif}`}>
            하루海
          </span>
          <div className="hidden md:flex items-center gap-10">
            <a href="#story" className="text-[12px] tracking-[0.12em] uppercase text-white/60 hover:text-white transition-colors">Story</a>
            <a href="#menu" className="text-[12px] tracking-[0.12em] uppercase text-white/60 hover:text-white transition-colors">Menu</a>
            <a href="#space" className="text-[12px] tracking-[0.12em] uppercase text-white/60 hover:text-white transition-colors">Space</a>
            <a href="#access" className="text-[12px] tracking-[0.12em] uppercase text-white/60 hover:text-white transition-colors">Access</a>
          </div>
        </div>
      </nav>

      {/* ===== HERO — 爆でか全画面スライドショー ===== */}
      <section className="h-[100svh] relative">
        {/* スライドショー背景 */}
        {heroImages.map((img, i) => (
          <div
            key={img.src}
            className="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out"
            style={{ opacity: currentSlide === i ? 1 : 0 }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={1024}
              height={1024}
              className="w-full h-full object-cover scale-[1.02]"
              priority={i === 0}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20" />

        {/* 中央テキスト */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-8">
          <ScrollReveal duration={1.2} delay={0.3}>
            <h1 className={`text-[52px] md:text-[80px] lg:text-[110px] tracking-[0.08em] uppercase leading-[1.05] text-white text-center ${serif}`}>
              하루海
            </h1>
          </ScrollReveal>
          <ScrollReveal duration={1} delay={0.6}>
            <p className={`text-[13px] md:text-[15px] tracking-[0.3em] uppercase text-white/60 mt-6 text-center`}>
              Ocean View Korean Café
            </p>
          </ScrollReveal>
          <ScrollReveal duration={1} delay={0.8}>
            <p className={`text-[13px] text-white/40 mt-4 tracking-[0.1em] ${serif}`}>
              波の音と、一杯のコーヒーと。
            </p>
          </ScrollReveal>
        </div>

        {/* スライドインジケーター */}
        <div className="absolute bottom-8 left-0 right-0 z-10 flex justify-center gap-2">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-px transition-all duration-500 ${
                currentSlide === i ? "w-10 bg-white/80" : "w-6 bg-white/25"
              }`}
            />
          ))}
        </div>

        {/* 下部テキスト */}
        <div className="absolute bottom-8 left-8 md:left-12 z-10">
          <p className="text-[10px] tracking-[0.2em] uppercase text-white/30">Kamakura, Shichirigahama</p>
        </div>
        <div className="absolute bottom-8 right-8 md:right-12 z-10">
          <div className="flex gap-6 text-[11px] tracking-[0.1em]">
            <a href="#menu" className="text-white/40 hover:text-white/80 transition-colors">Menu</a>
            <a href="#access" className="text-white/40 hover:text-white/80 transition-colors">Visit</a>
          </div>
        </div>
      </section>

      {/* ===== STORY — セパレーター + テキスト中央 ===== */}
      <section id="story" className="py-24 md:py-36">
        <div className="max-w-[1400px] mx-auto px-8 md:px-12">
          {/* 黒線セパレーター + セクションタイトル */}
          <ScrollReveal>
            <div className="flex items-center justify-between mb-16">
              <h3 className={`text-[22px] md:text-[28px] tracking-[0.02em] ${serif}`}>Our Story</h3>
              <div className="hidden md:block flex-1 h-px bg-[#1A1A1A] ml-8" />
            </div>
          </ScrollReveal>

          <div className="max-w-[640px] mx-auto text-center">
            <ScrollReveal delay={0.1}>
              <p className={`text-[15px] md:text-[17px] text-[#1A1A1A]/60 leading-[2.2] ${serif}`}>
                하루海（ハルうみ）は、韓国のカフェ文化と日本の海辺の風景が出会う場所。窓の外に広がる水平線を眺めながら、丁寧に淹れた一杯と手作りスイーツで、あなただけの「하루（一日）」をお過ごしください。
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="w-12 h-px bg-[#1A1A1A]/15 mx-auto mt-12" />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== MENU GRID — Kinfolk式：横スクロールカード ===== */}
      <section id="menu">
        <div className="max-w-[1400px] mx-auto px-8 md:px-12">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-12">
              <h3 className={`text-[22px] md:text-[28px] tracking-[0.02em] ${serif}`}>Menu</h3>
              <div className="hidden md:block flex-1 h-px bg-[#1A1A1A] ml-8" />
            </div>
          </ScrollReveal>
        </div>

        {/* 4カラムグリッド — Kinfolk "Inside Issue" 風 */}
        <div className="max-w-[1400px] mx-auto px-8 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
            {[
              {
                img: "/ai-website-cloner/images/drinks-cafe.png",
                cat: "Drinks",
                title: "SIGNATURE DRINKS",
                desc: "抹茶ラテ、ストロベリースムージー、アイスアメリカーノ。海を眺めながらの一杯。",
              },
              {
                img: "/ai-website-cloner/images/dessert-cafe.png",
                cat: "Desserts",
                title: "PATISSERIE",
                desc: "毎朝パティシエが焼き上げるクロワッサンとティラミス。",
              },
              {
                img: "/ai-website-cloner/images/concept-cafe.png",
                cat: "Specials",
                title: "SEASONAL",
                desc: "季節のタルトとフルーツエイド。旬の素材を贅沢に。",
              },
              {
                img: "/ai-website-cloner/images/interior-cafe.png",
                cat: "Experience",
                title: "OCEAN SEAT",
                desc: "テラス席で潮風を感じながら。予約優先でご案内。",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.08}>
                <div className="group cursor-pointer">
                  <div className="aspect-[4/5] overflow-hidden mb-4">
                    <Image
                      src={item.img}
                      alt={item.title}
                      width={512}
                      height={640}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    />
                  </div>
                  <p className="text-[11px] tracking-[0.08em] text-[#1A1A1A]/35 mb-2">{item.cat}</p>
                  <h4 className={`text-[13px] md:text-[14px] tracking-[0.04em] uppercase mb-2 ${serif}`}>{item.title}</h4>
                  <p className={`text-[12px] text-[#1A1A1A]/40 leading-[1.8] ${serif}`}>{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* メニュー詳細 — 中央配置 */}
        <div className="max-w-[600px] mx-auto px-8 md:px-12 mt-20 md:mt-28">
          <ScrollReveal>
            <div className="text-center mb-10">
              <p className="text-[11px] tracking-[0.2em] uppercase text-[#1A1A1A]/35 mb-3">Price List</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 gap-x-12 gap-y-0">
            <div>
              <ScrollReveal delay={0.05}>
                <p className={`text-[11px] tracking-[0.15em] uppercase text-[#1A1A1A]/30 mb-5 ${serif}`}>Drinks</p>
              </ScrollReveal>
              <StaggerContainer stagger={0.04}>
                {[
                  { name: "抹茶ラテ", price: "¥680" },
                  { name: "ストロベリースムージー", price: "¥750" },
                  { name: "アイスアメリカーノ", price: "¥550" },
                  { name: "ハニーバニララテ", price: "¥700" },
                  { name: "柚子エイド", price: "¥620" },
                ].map((d) => (
                  <div key={d.name} className="flex justify-between py-2.5 border-b border-[#1A1A1A]/5">
                    <span className={`text-[13px] ${serif}`}>{d.name}</span>
                    <span className="text-[12px] text-[#1A1A1A]/35">{d.price}</span>
                  </div>
                ))}
              </StaggerContainer>
            </div>
            <div>
              <ScrollReveal delay={0.1}>
                <p className={`text-[11px] tracking-[0.15em] uppercase text-[#1A1A1A]/30 mb-5 ${serif}`}>Desserts</p>
              </ScrollReveal>
              <StaggerContainer stagger={0.04}>
                {[
                  { name: "バタークロワッサン", price: "¥420" },
                  { name: "ティラミス", price: "¥580" },
                  { name: "季節のタルト", price: "¥620" },
                  { name: "あんバターサンド", price: "¥480" },
                ].map((d) => (
                  <div key={d.name} className="flex justify-between py-2.5 border-b border-[#1A1A1A]/5">
                    <span className={`text-[13px] ${serif}`}>{d.name}</span>
                    <span className="text-[12px] text-[#1A1A1A]/35">{d.price}</span>
                  </div>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 巨大余白 ===== */}
      <div className="h-24 md:h-36" />

      {/* ===== SPACE — Kinfolk式フルブリード + 巨大セリフオーバーレイ ===== */}
      <section id="space" className="relative">
        <ParallaxLayer speed={0.1}>
          <Image
            src="/ai-website-cloner/images/interior-cafe.png"
            alt="カフェインテリア"
            width={1024}
            height={1024}
            className="w-full h-[50vh] md:h-[70vh] object-cover"
          />
        </ParallaxLayer>
        <div className="absolute inset-0 flex items-end">
          <div className="w-full px-4 md:px-0">
            <ScrollReveal>
              <h2 className={`text-white text-[48px] md:text-[80px] lg:text-[120px] tracking-[0.06em] uppercase leading-[0.95] text-center md:text-left md:pl-12 pb-6 md:pb-10 drop-shadow-[0_2px_20px_rgba(0,0,0,0.3)] ${serif}`}>
                Ocean<br className="md:hidden" /> Seat
              </h2>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== SPACE 詳細 — Kinfolk式 3カラムカード ===== */}
      <section className="py-20 md:py-32">
        <div className="max-w-[1400px] mx-auto px-8 md:px-12">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-12">
              <h3 className={`text-[22px] md:text-[28px] tracking-[0.02em] ${serif}`}>The Space</h3>
              <div className="hidden md:block flex-1 h-px bg-[#1A1A1A] ml-8" />
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              { title: "ARCHED WINDOWS", desc: "アーチ窓から注ぐ陽光が、店内を温かく包みます。朝と夕で全く異なる表情を見せる光の空間。" },
              { title: "RATTAN & GREEN", desc: "ラタンチェアのやわらかさ、天井から垂れるグリーン。韓国カフェの美意識を七里ヶ浜の風に乗せて。" },
              { title: "TERRACE", desc: "テラス席では潮風を感じながらお過ごしいただけます。サンセットタイムは予約がおすすめ。" },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <div>
                  <h4 className={`text-[13px] tracking-[0.08em] uppercase mb-4 ${serif}`}>{item.title}</h4>
                  <p className={`text-[13px] text-[#1A1A1A]/45 leading-[2] ${serif}`}>{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.2}>
            <div className="flex gap-3 flex-wrap mt-12 justify-center md:justify-start">
              {["Ocean View", "Free Wi-Fi", "テラス席", "ペット可", "駐車場8台"].map((tag) => (
                <span key={tag} className="px-4 py-1.5 rounded-full border border-[#1A1A1A]/10 text-[10px] tracking-[0.08em] text-[#1A1A1A]/40">
                  {tag}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== ACCESS — Kinfolk式セパレーター + 情報 ===== */}
      <section id="access" className="pb-24 md:pb-36">
        <div className="max-w-[1400px] mx-auto px-8 md:px-12">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-16">
              <h3 className={`text-[22px] md:text-[28px] tracking-[0.02em] ${serif}`}>Access</h3>
              <div className="hidden md:block flex-1 h-px bg-[#1A1A1A] ml-8" />
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            <ScrollReveal>
              <div>
                <p className="text-[11px] tracking-[0.15em] uppercase text-[#1A1A1A]/30 mb-4">Location</p>
                <p className={`text-[15px] leading-[2] ${serif}`}>
                  神奈川県鎌倉市<br />七里ガ浜 1-2-3
                </p>
                <p className={`text-[13px] text-[#1A1A1A]/40 mt-3 ${serif}`}>
                  江ノ電 七里ヶ浜駅 徒歩5分
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div>
                <p className="text-[11px] tracking-[0.15em] uppercase text-[#1A1A1A]/30 mb-4">Hours</p>
                <StaggerContainer stagger={0.06}>
                  {[
                    { day: "Mon — Fri", time: "10:00 — 20:00" },
                    { day: "Sat — Sun", time: "9:00 — 21:00" },
                    { day: "Holidays", time: "10:00 — 19:00" },
                  ].map((h) => (
                    <div key={h.day} className="flex justify-between py-3 border-b border-[#1A1A1A]/5">
                      <span className={`text-[13px] text-[#1A1A1A]/40 ${serif}`}>{h.day}</span>
                      <span className={`text-[13px] ${serif}`}>{h.time}</span>
                    </div>
                  ))}
                </StaggerContainer>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div>
                <p className="text-[11px] tracking-[0.15em] uppercase text-[#1A1A1A]/30 mb-4">Contact</p>
                <p className={`text-[15px] ${serif}`}>0467-12-3456</p>
                <p className={`text-[13px] text-[#1A1A1A]/40 mt-3 leading-[2] ${serif}`}>
                  テラス席は予約優先です。<br />
                  お電話またはInstagram DMにて<br />
                  ご予約を承っております。
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== SUBSCRIBE BANNER — Kinfolk式 ===== */}
      <section className="bg-[#F5F0EA] py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-8 md:px-12 text-center">
          <ScrollReveal>
            <h3 className={`text-[28px] md:text-[40px] tracking-[0.06em] uppercase mb-4 ${serif}`}>Follow</h3>
            <p className={`text-[13px] text-[#1A1A1A]/40 ${serif}`}>하루海の日常をInstagramでお届けしています</p>
            <a href="#" className="inline-block mt-8 text-[12px] tracking-[0.12em] uppercase border border-[#1A1A1A] px-8 py-3 hover:bg-[#1A1A1A] hover:text-white transition-all">
              @haru_umi_cafe
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== FOOTER — Kinfolk式ミニマル ===== */}
      <footer className="py-10 px-8 md:px-12">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className={`text-[11px] text-[#1A1A1A]/25 tracking-wider ${serif}`}>&copy; 하루海 2026</p>
          <div className="flex gap-8">
            <a href="#" className="text-[11px] tracking-[0.1em] text-[#1A1A1A]/25 hover:text-[#1A1A1A]/50 transition-colors uppercase">Instagram</a>
            <a href="#" className="text-[11px] tracking-[0.1em] text-[#1A1A1A]/25 hover:text-[#1A1A1A]/50 transition-colors uppercase">Line</a>
          </div>
          <p className={`text-[10px] text-[#1A1A1A]/15 tracking-wider`}>Kamakura, Japan</p>
        </div>
      </footer>
    </main>
  );
}
