"use client";

import { ScrollReveal } from "@/components/animation/scroll-reveal";
import { ParallaxLayer } from "@/components/animation/parallax-layer";
import { StaggerContainer } from "@/components/animation/stagger-container";
import Image from "next/image";

const serif = "font-[family-name:var(--font-noto-serif-jp)]";

export default function Home() {
  return (
    <main className="bg-[#F7F3ED] text-[#3D3425] overflow-hidden">
      {/* ===== NAV — 左ロゴのみ、ミニマル ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <span className={`text-[15px] font-bold tracking-[0.08em] text-white ${serif}`}>
            하루海
          </span>
          <a href="#access" className="text-[11px] text-white/60 hover:text-white tracking-[0.2em] uppercase transition-colors">
            Visit Us
          </a>
        </div>
      </nav>

      {/* ===== 01 — HERO：左寄せテキスト + 右に写真がはみ出し ===== */}
      <section className="min-h-[100svh] relative flex items-end pb-16 md:pb-0 md:items-center">
        {/* 右側にオフセットした大写真 */}
        <div className="absolute top-0 right-0 w-[75%] md:w-[58%] h-full">
          <ScrollReveal duration={1.6} direction="none" className="w-full h-full">
            <Image
              src="/ai-website-cloner/images/hero-cafe.png"
              alt="海の見える韓国風カフェ"
              width={1024}
              height={1024}
              className="w-full h-full object-cover"
              priority
            />
          </ScrollReveal>
          <div className="absolute inset-0 bg-gradient-to-r from-[#F7F3ED] via-[#F7F3ED]/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F7F3ED] via-transparent to-transparent md:bg-none" />
        </div>
        {/* 左寄せテキスト */}
        <div className="relative z-10 px-6 md:px-10 max-w-[1400px] mx-auto w-full">
          <div className="max-w-[480px]">
            <ScrollReveal delay={0.3}>
              <p className="text-[10px] tracking-[0.5em] uppercase text-[#8EAEBF] mb-5">
                Ocean View Korean Café
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.5}>
              <h1 className={`text-[64px] md:text-[96px] lg:text-[128px] font-extralight tracking-[-0.02em] leading-[0.85] mb-6 ${serif}`}>
                하루<br />海
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.7}>
              <p className={`text-[13px] md:text-[15px] text-[#3D3425]/45 leading-[2] max-w-[320px] ${serif}`}>
                波の音と、一杯のコーヒーと。<br />
                海辺の韓国カフェで過ごす、<br />
                あなただけの하루（一日）。
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.9}>
              <div className="mt-10 flex items-center gap-4">
                <div className="w-12 h-px bg-[#3D3425]/20" />
                <span className="text-[10px] tracking-[0.3em] text-[#3D3425]/30 uppercase">Scroll</span>
              </div>
            </ScrollReveal>
          </div>
        </div>
        {/* 右下に小さく番号 */}
        <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-10">
          <span className={`text-[120px] md:text-[200px] font-extralight leading-none text-[#3D3425]/[0.03] ${serif}`}>01</span>
        </div>
      </section>

      {/* ===== 02 — STORY：ナローテキスト + オフセット画像（重なり） ===== */}
      <section id="story" className="relative py-20 md:py-0 md:min-h-screen flex items-center">
        {/* 背景に薄く番号 */}
        <div className="absolute top-10 left-6 md:left-10">
          <span className={`text-[140px] md:text-[220px] font-extralight leading-none text-[#3D3425]/[0.03] ${serif}`}>02</span>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-10 w-full">
          <div className="grid md:grid-cols-12 items-center">
            {/* テキスト：4カラム分、左に寄せる */}
            <div className="md:col-span-4 md:col-start-1 relative z-10">
              <ScrollReveal>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-8 h-px bg-[#8EAEBF]" />
                  <p className="text-[10px] tracking-[0.4em] uppercase text-[#8EAEBF]">Our Story</p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h2 className={`text-[28px] md:text-[36px] font-light leading-[1.5] mb-8 ${serif}`}>
                  海と暮らす、<br />
                  カフェのある<br />
                  日常。
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className={`text-[13px] text-[#3D3425]/40 leading-[2.3] ${serif}`}>
                  하루海（ハルうみ）は、韓国のカフェ文化と日本の海辺の風景が出会う場所。窓の外に広がる水平線を眺めながら、丁寧に淹れた一杯と手作りスイーツで、あなただけの「하루（一日）」をお過ごしください。
                </p>
              </ScrollReveal>
            </div>
            {/* 画像：7カラム分、右に大きく。テキストと少し重なる */}
            <div className="md:col-span-7 md:col-start-5 mt-10 md:mt-0 md:-ml-10">
              <ParallaxLayer speed={0.1}>
                <ScrollReveal direction="right" delay={0.15}>
                  <div className="rounded-[12px] overflow-hidden">
                    <Image
                      src="/ai-website-cloner/images/concept-cafe.png"
                      alt="アーチ窓から見える海とコーヒー"
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

      {/* ===== 引用（ナロー幅、左寄せ） ===== */}
      <section className="py-20 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <ScrollReveal>
            <div className="max-w-[600px] md:ml-[8%]">
              <div className="w-8 h-px bg-[#8EAEBF]/40 mb-8" />
              <p className={`text-[20px] md:text-[28px] lg:text-[34px] font-light text-[#3D3425]/70 leading-[1.8] tracking-[0.01em] ${serif}`}>
                海が見える席で飲む<br />
                アメリカーノは、<br />
                いつもより少しだけ、<br />
                特別な味がする。
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== 03 — MENU：マソンリー風ドリンク + デザート ===== */}
      <section id="menu" className="relative pb-20 md:pb-40">
        <div className="absolute top-0 right-6 md:right-10">
          <span className={`text-[140px] md:text-[220px] font-extralight leading-none text-[#3D3425]/[0.03] ${serif}`}>03</span>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-16">
              <div className="w-8 h-px bg-[#8EAEBF]" />
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#8EAEBF]">Menu</p>
            </div>
          </ScrollReveal>

          {/* マソンリー風：大写真+メニューが不規則に配置 */}
          <div className="grid md:grid-cols-12 gap-6 md:gap-8">
            {/* 左：ドリンク写真（大） */}
            <div className="md:col-span-6">
              <ParallaxLayer speed={0.05}>
                <ScrollReveal>
                  <div className="rounded-[12px] overflow-hidden">
                    <Image
                      src="/ai-website-cloner/images/drinks-cafe.png"
                      alt="シグネチャードリンク"
                      width={1024}
                      height={1024}
                      className="w-full h-auto"
                    />
                  </div>
                </ScrollReveal>
              </ParallaxLayer>
            </div>

            {/* 右上：ドリンクメニュー（上にオフセット） */}
            <div className="md:col-span-5 md:col-start-8 md:-mt-0 flex flex-col justify-center">
              <ScrollReveal delay={0.15}>
                <h3 className={`text-[24px] md:text-[30px] font-light mb-2 ${serif}`}>Drinks</h3>
                <p className={`text-[12px] text-[#3D3425]/30 tracking-[0.15em] mb-8 ${serif}`}>ドリンク</p>
              </ScrollReveal>
              <StaggerContainer stagger={0.06}>
                {[
                  { name: "抹茶ラテ", ko: "말차 라떼", price: "¥680" },
                  { name: "ストロベリースムージー", ko: "딸기 스무디", price: "¥750" },
                  { name: "アイスアメリカーノ", ko: "아이스 아메리카노", price: "¥550" },
                  { name: "ハニーバニララテ", ko: "허니 바닐라 라떼", price: "¥700" },
                  { name: "柚子エイド", ko: "유자 에이드", price: "¥620" },
                ].map((d) => (
                  <div key={d.name} className="flex items-baseline justify-between py-3 border-b border-[#3D3425]/5">
                    <div className="flex items-baseline gap-2">
                      <span className={`text-[14px] ${serif}`}>{d.name}</span>
                      <span className="text-[10px] text-[#8EAEBF]/80">{d.ko}</span>
                    </div>
                    <span className="text-[12px] text-[#8EAEBF]">{d.price}</span>
                  </div>
                ))}
              </StaggerContainer>
            </div>

            {/* 下段：デザート（左にオフセット、右に写真） */}
            <div className="md:col-span-4 md:col-start-2 mt-8 md:mt-16 flex flex-col justify-center">
              <ScrollReveal delay={0.1}>
                <h3 className={`text-[24px] md:text-[30px] font-light mb-2 ${serif}`}>Desserts</h3>
                <p className={`text-[12px] text-[#3D3425]/30 tracking-[0.15em] mb-8 ${serif}`}>デザート</p>
              </ScrollReveal>
              <StaggerContainer stagger={0.06}>
                {[
                  { name: "バタークロワッサン", ko: "버터 크루아상", price: "¥420" },
                  { name: "ティラミス", ko: "티라미수", price: "¥580" },
                  { name: "季節のタルト", ko: "계절 타르트", price: "¥620" },
                  { name: "あんバターサンド", ko: "앙버터 샌드", price: "¥480" },
                ].map((d) => (
                  <div key={d.name} className="flex items-baseline justify-between py-3 border-b border-[#3D3425]/5">
                    <div className="flex items-baseline gap-2">
                      <span className={`text-[14px] ${serif}`}>{d.name}</span>
                      <span className="text-[10px] text-[#8EAEBF]/80">{d.ko}</span>
                    </div>
                    <span className="text-[12px] text-[#8EAEBF]">{d.price}</span>
                  </div>
                ))}
              </StaggerContainer>
            </div>

            <div className="md:col-span-6 md:col-start-7 mt-4 md:mt-8">
              <ParallaxLayer speed={0.08}>
                <ScrollReveal direction="right" delay={0.2}>
                  <div className="rounded-[12px] overflow-hidden">
                    <Image
                      src="/ai-website-cloner/images/dessert-cafe.png"
                      alt="クロワッサンとティラミス"
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

      {/* ===== 04 — SPACE：全幅写真、テキストは写真の上に重ねて左下 ===== */}
      <section id="space" className="relative">
        <div className="absolute top-6 left-6 md:top-10 md:left-10 z-20">
          <span className={`text-[140px] md:text-[220px] font-extralight leading-none text-white/[0.05] ${serif}`}>04</span>
        </div>

        {/* フルブリード写真 — パディングなし */}
        <div className="relative">
          <ParallaxLayer speed={0.12}>
            <Image
              src="/ai-website-cloner/images/interior-cafe.png"
              alt="カフェインテリア"
              width={1024}
              height={1024}
              className="w-full h-[70vh] md:h-[85vh] object-cover"
            />
          </ParallaxLayer>
          <div className="absolute inset-0 bg-gradient-to-t from-[#2A1F14]/70 via-[#2A1F14]/15 to-transparent" />

          {/* テキストは写真内の左下に */}
          <div className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-10 pb-10 md:pb-16">
            <div className="max-w-[1400px] mx-auto">
              <div className="max-w-[500px]">
                <ScrollReveal>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-8 h-px bg-[#D4C8B0]/60" />
                    <p className="text-[10px] tracking-[0.4em] uppercase text-[#D4C8B0]">Space</p>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={0.15}>
                  <h2 className={`text-[28px] md:text-[40px] lg:text-[50px] font-light leading-[1.35] mb-6 text-[#F7F3ED] ${serif}`}>
                    海と、光と、<br />
                    あなたの席。
                  </h2>
                </ScrollReveal>
                <ScrollReveal delay={0.3}>
                  <p className={`text-[13px] text-[#F7F3ED]/50 leading-[2.1] ${serif}`}>
                    アーチ窓から注ぐ陽光、ラタンチェアのやわらかさ、天井から垂れるグリーンの息吹。ここは、海辺のあなたのリビング。
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={0.4}>
                  <div className="mt-8 flex gap-3 flex-wrap">
                    {["Ocean View", "Free Wi-Fi", "テラス席", "ペット可"].map((tag) => (
                      <span key={tag} className="px-4 py-1.5 rounded-full border border-[#F7F3ED]/15 text-[10px] tracking-[0.08em] text-[#F7F3ED]/50">
                        {tag}
                      </span>
                    ))}
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 05 — ACCESS：超大見出し + 情報散らし ===== */}
      <section id="access" className="relative py-24 md:py-40">
        <div className="absolute top-10 right-6 md:right-10">
          <span className={`text-[140px] md:text-[220px] font-extralight leading-none text-[#3D3425]/[0.03] ${serif}`}>05</span>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          {/* 超大見出し */}
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-[#8EAEBF]" />
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#8EAEBF]">Access</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className={`text-[48px] md:text-[80px] lg:text-[110px] font-extralight tracking-[-0.02em] leading-[1] mb-16 md:mb-24 ${serif}`}>
              会いに来て。
            </h2>
          </ScrollReveal>

          {/* 情報を不規則に散らす */}
          <div className="grid md:grid-cols-12 gap-y-12 md:gap-y-16">
            {/* 住所 — 左寄り */}
            <div className="md:col-span-4 md:col-start-1">
              <ScrollReveal>
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#8EAEBF]/50 mb-3">Address</p>
                <p className={`text-[15px] text-[#3D3425]/60 leading-[2] ${serif}`}>
                  神奈川県鎌倉市<br />七里ガ浜 1-2-3
                </p>
              </ScrollReveal>
            </div>

            {/* アクセス — 中央 */}
            <div className="md:col-span-3 md:col-start-6">
              <ScrollReveal delay={0.1}>
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#8EAEBF]/50 mb-3">Station</p>
                <p className={`text-[15px] text-[#3D3425]/60 leading-[2] ${serif}`}>
                  江ノ電<br />七里ヶ浜駅 徒歩5分
                </p>
              </ScrollReveal>
            </div>

            {/* 電話 — 右寄り */}
            <div className="md:col-span-3 md:col-start-10">
              <ScrollReveal delay={0.2}>
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#8EAEBF]/50 mb-3">Tel</p>
                <p className={`text-[15px] text-[#3D3425]/60 ${serif}`}>0467-12-3456</p>
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#8EAEBF]/50 mt-6 mb-3">Parking</p>
                <p className={`text-[15px] text-[#3D3425]/60 ${serif}`}>専用駐車場 8台</p>
              </ScrollReveal>
            </div>

            {/* 営業時間 — 中央やや左、幅広 */}
            <div className="md:col-span-6 md:col-start-1 mt-4">
              <ScrollReveal delay={0.15}>
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#8EAEBF]/50 mb-6">Hours</p>
                <StaggerContainer stagger={0.08}>
                  {[
                    { day: "月 - 金", time: "10:00 - 20:00" },
                    { day: "土 - 日", time: "9:00 - 21:00" },
                    { day: "祝日", time: "10:00 - 19:00" },
                  ].map((h) => (
                    <div key={h.day} className="flex items-baseline justify-between py-5 border-b border-[#3D3425]/6">
                      <span className={`text-[12px] text-[#3D3425]/35 ${serif}`}>{h.day}</span>
                      <span className={`text-[20px] md:text-[26px] font-extralight tracking-[0.05em] ${serif}`}>{h.time}</span>
                    </div>
                  ))}
                </StaggerContainer>
              </ScrollReveal>
            </div>

            {/* 予約情報 — 右寄り */}
            <div className="md:col-span-4 md:col-start-8 mt-4 flex items-end">
              <ScrollReveal delay={0.3}>
                <div className="p-6 rounded-[12px] bg-[#8EAEBF]/6 border border-[#8EAEBF]/10">
                  <p className={`text-[12px] text-[#3D3425]/40 leading-[2.2] ${serif}`}>
                    テラス席は予約優先です。<br />
                    お電話またはInstagram DMにて<br />
                    ご予約を承っております。
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER — ミニマル ===== */}
      <footer className="border-t border-[#3D3425]/5 py-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className={`text-[14px] tracking-[0.06em] text-[#3D3425]/20 ${serif}`}>하루海</span>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[11px] tracking-[0.15em] text-[#3D3425]/20 hover:text-[#3D3425]/40 transition-colors">Instagram</a>
            <a href="#" className="text-[11px] tracking-[0.15em] text-[#3D3425]/20 hover:text-[#3D3425]/40 transition-colors">X</a>
            <a href="#" className="text-[11px] tracking-[0.15em] text-[#3D3425]/20 hover:text-[#3D3425]/40 transition-colors">LINE</a>
          </div>
          <p className="text-[10px] text-[#3D3425]/12 tracking-wider">&copy; 2026 하루海 Café</p>
        </div>
      </footer>
    </main>
  );
}
