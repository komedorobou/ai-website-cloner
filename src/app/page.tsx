"use client";

import { ScrollReveal } from "@/components/animation/scroll-reveal";
import { ParallaxLayer } from "@/components/animation/parallax-layer";
import { StaggerContainer } from "@/components/animation/stagger-container";
import { StickySection } from "@/components/animation/sticky-section";
import { useState } from "react";
import Image from "next/image";

const drinks = [
  {
    name: "抹茶ラテ",
    nameKo: "말차 라떼",
    desc: "京都産の石臼挽き抹茶を贅沢に使用。ほんのり甘いオーツミルクと合わせた、海を眺めながら味わう特別な一杯。",
    price: "¥680",
  },
  {
    name: "ストロベリースムージー",
    nameKo: "딸기 스무디",
    desc: "朝摘みいちごをたっぷり使った、ピンクが映えるフォトジェニックスムージー。",
    price: "¥750",
  },
  {
    name: "アイスアメリカーノ",
    nameKo: "아이스 아메리카노",
    desc: "自家焙煎のシングルオリジンを氷でキリッと。韓国カフェの定番を、潮風とともに。",
    price: "¥550",
  },
];

const hours = [
  { day: "月 - 金", time: "10:00 - 20:00" },
  { day: "土 - 日", time: "9:00 - 21:00" },
  { day: "祝日", time: "10:00 - 19:00" },
];

const serif = "font-[family-name:var(--font-noto-serif-jp)]";

export default function Home() {
  const [stickyProgress, setStickyProgress] = useState(0);

  return (
    <main className="bg-[#F7F3ED] text-[#3D3425] overflow-hidden">
      {/* ===== NAV ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F7F3ED]/85 backdrop-blur-xl border-b border-[#3D3425]/5">
        <div className="max-w-[1024px] mx-auto px-6 h-14 flex items-center justify-between">
          <span className={`text-[17px] font-bold tracking-[0.06em] ${serif}`}>
            하루<span className="text-[#8EAEBF] ml-1">海</span>
          </span>
          <div className="hidden md:flex items-center gap-8">
            <a href="#concept" className="text-[13px] text-[#3D3425]/40 hover:text-[#3D3425] transition-colors">Concept</a>
            <a href="#menu" className="text-[13px] text-[#3D3425]/40 hover:text-[#3D3425] transition-colors">Menu</a>
            <a href="#gallery" className="text-[13px] text-[#3D3425]/40 hover:text-[#3D3425] transition-colors">Gallery</a>
            <a href="#access" className="text-[13px] text-[#3D3425]/40 hover:text-[#3D3425] transition-colors">Access</a>
          </div>
          <a href="#access" className="text-[12px] bg-[#3D3425] hover:bg-[#5A4D3A] text-[#F7F3ED] px-5 py-1.5 rounded-full transition-colors font-medium tracking-wider">
            VISIT
          </a>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="min-h-[100vh] relative overflow-hidden">
        <div className="absolute inset-0">
          <ScrollReveal duration={1.5} direction="none" className="w-full h-full">
            <Image
              src="/ai-website-cloner/images/hero-cafe.png"
              alt="海の見える韓国風カフェ"
              width={1024}
              height={1024}
              className="w-full h-full object-cover scale-105"
              priority
            />
          </ScrollReveal>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#3D3425]/30 via-transparent to-[#F7F3ED]" />
        <div className="relative z-10 pt-44 md:pt-56 text-center px-6">
          <ScrollReveal duration={1} delay={0.3}>
            <p className={`text-[11px] md:text-[13px] tracking-[0.5em] uppercase text-[#F7F3ED]/80 font-light mb-6`}>
              Ocean View Korean Café
            </p>
          </ScrollReveal>
          <ScrollReveal duration={1.2} delay={0.5}>
            <h1 className={`text-[72px] md:text-[104px] lg:text-[130px] font-light tracking-[0.04em] leading-[0.9] mb-6 text-[#F7F3ED] ${serif}`}>
              하루海
            </h1>
          </ScrollReveal>
          <ScrollReveal duration={1} delay={0.7}>
            <p className={`text-[15px] md:text-[18px] font-light text-[#F7F3ED]/70 tracking-[0.15em] ${serif}`}>
              波の音と、一杯のコーヒーと。
            </p>
          </ScrollReveal>
        </div>
        <div className="absolute bottom-12 md:bottom-20 left-0 right-0 z-10 text-center">
          <ScrollReveal duration={0.8} delay={1}>
            <div className="w-px h-20 bg-gradient-to-b from-transparent to-[#3D3425]/15 mx-auto" />
          </ScrollReveal>
        </div>
      </section>

      {/* ===== CONCEPT ===== */}
      <section id="concept" className="py-32 md:py-44">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 md:gap-20 items-center">
            <div>
              <ScrollReveal>
                <p className="text-[10px] tracking-[0.4em] uppercase text-[#8EAEBF] font-medium mb-8">Our Story</p>
              </ScrollReveal>
              <ScrollReveal delay={0.15}>
                <h2 className={`text-[30px] md:text-[40px] lg:text-[48px] font-light tracking-[0.02em] leading-[1.35] mb-8 ${serif}`}>
                  海と暮らす、<br />
                  カフェのある日常。
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <div className="w-10 h-px bg-[#8EAEBF]/40 mb-8" />
              </ScrollReveal>
              <ScrollReveal delay={0.4}>
                <p className={`text-[14px] md:text-[15px] text-[#3D3425]/50 leading-[2.1] ${serif}`}>
                  하루海（ハルうみ）は、韓国のカフェ文化と<br className="hidden lg:block" />
                  日本の海辺の風景が出会う場所。<br className="hidden lg:block" />
                  窓の外に広がる水平線を眺めながら、<br className="hidden lg:block" />
                  丁寧に淹れた一杯と手作りスイーツで<br className="hidden lg:block" />
                  あなただけの「하루（一日）」をお過ごしください。
                </p>
              </ScrollReveal>
            </div>
            <div>
              <ParallaxLayer speed={0.12}>
                <ScrollReveal direction="right" delay={0.2}>
                  <div className="rounded-[24px] overflow-hidden shadow-xl shadow-[#3D3425]/8">
                    <Image
                      src="/ai-website-cloner/images/concept-cafe.png"
                      alt="アーチ窓から見える海とコーヒー"
                      width={1024}
                      height={1024}
                      className="w-full h-auto hover:scale-[1.02] transition-transform duration-700"
                    />
                  </div>
                </ScrollReveal>
              </ParallaxLayer>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MENU ===== */}
      <section id="menu" className="bg-[#EDE7DD]">
        <div className="max-w-[1024px] mx-auto px-6 py-32 md:py-40">
          <ScrollReveal>
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#8EAEBF] font-medium mb-4 text-center">Menu</p>
            <h2 className={`text-[34px] md:text-[46px] font-light tracking-[0.04em] text-center mb-6 ${serif}`}>
              Signature Drinks
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className={`text-[14px] text-[#3D3425]/40 text-center mb-20 ${serif}`}>
              すべてのドリンクは、海を眺めるあなたのために。
            </p>
          </ScrollReveal>

          {/* Drinks Photo */}
          <ScrollReveal delay={0.15}>
            <div className="rounded-[28px] overflow-hidden shadow-lg shadow-[#3D3425]/8 mb-24 max-w-[640px] mx-auto">
              <Image
                src="/ai-website-cloner/images/drinks-cafe.png"
                alt="シグネチャードリンク3種"
                width={1024}
                height={1024}
                className="w-full h-auto"
              />
            </div>
          </ScrollReveal>

          {/* Drink List */}
          <StaggerContainer stagger={0.12} className="max-w-[640px] mx-auto">
            {drinks.map((item) => (
              <div key={item.name} className="flex items-start justify-between py-8 border-b border-[#3D3425]/8 last:border-b-0">
                <div className="flex-1 pr-6">
                  <div className="flex items-baseline gap-3 mb-2">
                    <h3 className={`text-[18px] md:text-[22px] font-light tracking-[0.02em] ${serif}`}>{item.name}</h3>
                    <span className="text-[12px] text-[#8EAEBF] tracking-wider">{item.nameKo}</span>
                  </div>
                  <p className={`text-[13px] text-[#3D3425]/40 leading-[1.8] ${serif}`}>{item.desc}</p>
                </div>
                <span className={`text-[14px] text-[#8EAEBF] font-medium tracking-wider whitespace-nowrap pt-1`}>{item.price}</span>
              </div>
            ))}
          </StaggerContainer>

          {/* Dessert */}
          <div className="mt-28">
            <ScrollReveal>
              <h3 className={`text-[28px] md:text-[36px] font-light tracking-[0.04em] text-center mb-6 ${serif}`}>
                Desserts
              </h3>
              <p className={`text-[14px] text-[#3D3425]/40 text-center mb-16 ${serif}`}>
                パティシエ手作り、毎日焼きたて。
              </p>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center max-w-[800px] mx-auto">
              <ParallaxLayer speed={0.1}>
                <ScrollReveal>
                  <div className="rounded-[20px] overflow-hidden shadow-lg shadow-[#3D3425]/8">
                    <Image
                      src="/ai-website-cloner/images/dessert-cafe.png"
                      alt="クロワッサンとティラミス"
                      width={1024}
                      height={1024}
                      className="w-full h-auto hover:scale-[1.02] transition-transform duration-700"
                    />
                  </div>
                </ScrollReveal>
              </ParallaxLayer>
              <ScrollReveal direction="right" delay={0.15}>
                <div className="space-y-6">
                  {[
                    { name: "バタークロワッサン", nameKo: "버터 크루아상", price: "¥420" },
                    { name: "ティラミス", nameKo: "티라미수", price: "¥580" },
                    { name: "季節のタルト", nameKo: "계절 타르트", price: "¥620" },
                    { name: "あんバターサンド", nameKo: "앙버터 샌드", price: "¥480" },
                  ].map((d) => (
                    <div key={d.name} className="flex items-center justify-between py-3 border-b border-[#3D3425]/6 last:border-b-0">
                      <div className="flex items-baseline gap-2">
                        <span className={`text-[15px] ${serif}`}>{d.name}</span>
                        <span className="text-[11px] text-[#8EAEBF]">{d.nameKo}</span>
                      </div>
                      <span className="text-[13px] text-[#8EAEBF]">{d.price}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== GALLERY (Sticky Scroll) ===== */}
      <section id="gallery">
        <StickySection scrollLength={2.5} onProgress={setStickyProgress} className="min-h-screen relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/ai-website-cloner/images/interior-cafe.png"
              alt="カフェインテリア"
              width={1024}
              height={1024}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#3D3425]/40" />
          </div>
          <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
            <div className="text-center max-w-2xl">
              <p
                className="text-[10px] tracking-[0.4em] uppercase text-[#D4C8B0] font-medium mb-10 transition-all duration-500"
                style={{
                  opacity: Math.min(1, stickyProgress * 4),
                  transform: `translateY(${Math.max(0, 20 - stickyProgress * 80)}px)`,
                }}
              >
                Gallery
              </p>
              <h2
                className={`text-[34px] md:text-[50px] lg:text-[62px] font-light tracking-[0.04em] leading-[1.25] mb-10 text-[#F7F3ED] transition-all duration-500 ${serif}`}
                style={{
                  opacity: Math.min(1, stickyProgress * 3),
                  transform: `translateY(${Math.max(0, 40 - stickyProgress * 120)}px)`,
                }}
              >
                海と、光と、<br />
                あなたの席。
              </h2>
              <p
                className={`text-[14px] md:text-[16px] text-[#F7F3ED]/60 leading-[2] max-w-md mx-auto transition-all duration-500 ${serif}`}
                style={{
                  opacity: Math.max(0, Math.min(1, (stickyProgress - 0.3) * 3)),
                  transform: `translateY(${Math.max(0, 30 - (stickyProgress - 0.3) * 100)}px)`,
                }}
              >
                アーチ窓から注ぐ陽光、<br />
                ラタンチェアのやわらかさ、<br />
                天井から垂れるグリーンの息吹。<br />
                ここは、海辺のあなたのリビング。
              </p>
              <div
                className="mt-14 flex justify-center gap-4 flex-wrap transition-all duration-500"
                style={{
                  opacity: Math.max(0, Math.min(1, (stickyProgress - 0.5) * 3)),
                  transform: `translateY(${Math.max(0, 30 - (stickyProgress - 0.5) * 100)}px)`,
                }}
              >
                {["Ocean View", "Free Wi-Fi", "テラス席", "ペット可", "韓国インテリア"].map((tag) => (
                  <span key={tag} className={`px-5 py-2.5 rounded-full border border-[#F7F3ED]/15 bg-[#F7F3ED]/5 text-[11px] md:text-[12px] tracking-[0.1em] text-[#F7F3ED]/60 ${serif}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </StickySection>
      </section>

      {/* ===== ACCESS ===== */}
      <section id="access" className="py-32 md:py-40 bg-[#F7F3ED]">
        <div className="max-w-[1024px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
            <div>
              <ScrollReveal>
                <p className="text-[10px] tracking-[0.4em] uppercase text-[#8EAEBF] font-medium mb-4">Access</p>
                <h2 className={`text-[34px] md:text-[46px] font-light tracking-[0.02em] mb-12 leading-[1.3] ${serif}`}>
                  会いに来て。
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.15}>
                <div className="space-y-8">
                  <div>
                    <p className="text-[10px] tracking-[0.3em] uppercase text-[#8EAEBF]/60 mb-2">Address</p>
                    <p className={`text-[#3D3425]/70 text-[15px] ${serif}`}>神奈川県鎌倉市七里ガ浜 1-2-3</p>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.3em] uppercase text-[#8EAEBF]/60 mb-2">Tel</p>
                    <p className={`text-[#3D3425]/70 text-[15px] ${serif}`}>0467-12-3456</p>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.3em] uppercase text-[#8EAEBF]/60 mb-2">Access</p>
                    <p className={`text-[#3D3425]/70 text-[15px] ${serif}`}>江ノ電 七里ヶ浜駅 徒歩5分</p>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.3em] uppercase text-[#8EAEBF]/60 mb-2">Parking</p>
                    <p className={`text-[#3D3425]/70 text-[15px] ${serif}`}>専用駐車場 8台</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
            <div>
              <ScrollReveal delay={0.2}>
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#8EAEBF]/60 mb-8">Hours</p>
                <StaggerContainer stagger={0.1} className="space-y-0">
                  {hours.map((h) => (
                    <div key={h.day} className="flex items-center justify-between py-6 border-b border-[#3D3425]/8">
                      <span className={`text-[#3D3425]/40 text-[14px] ${serif}`}>{h.day}</span>
                      <span className={`text-[22px] md:text-[26px] font-light tracking-[0.05em] ${serif}`}>{h.time}</span>
                    </div>
                  ))}
                </StaggerContainer>
              </ScrollReveal>
              <ScrollReveal delay={0.4}>
                <div className="mt-12 p-6 rounded-[16px] bg-[#8EAEBF]/8 border border-[#8EAEBF]/15">
                  <p className={`text-[13px] text-[#3D3425]/50 leading-[1.9] ${serif}`}>
                    🌊 テラス席は予約優先です。<br />
                    お電話またはInstagram DMにて<br />
                    ご予約を承っております。
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-[#3D3425]/5 py-12 bg-[#F7F3ED]">
        <div className="max-w-[1024px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <span className={`text-[15px] tracking-[0.06em] text-[#3D3425]/25 ${serif}`}>
            하루海
          </span>
          <div className="flex items-center gap-8">
            <a href="#" className="text-[12px] tracking-[0.15em] text-[#3D3425]/25 hover:text-[#3D3425]/50 transition-colors">Instagram</a>
            <a href="#" className="text-[12px] tracking-[0.15em] text-[#3D3425]/25 hover:text-[#3D3425]/50 transition-colors">X</a>
            <a href="#" className="text-[12px] tracking-[0.15em] text-[#3D3425]/25 hover:text-[#3D3425]/50 transition-colors">LINE</a>
          </div>
          <p className="text-[10px] text-[#3D3425]/15 tracking-wider">&copy; 2026 하루海 Café. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
