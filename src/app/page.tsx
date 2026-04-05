"use client";

import { ScrollReveal } from "@/components/animation/scroll-reveal";
import { ParallaxLayer } from "@/components/animation/parallax-layer";
import { StaggerContainer } from "@/components/animation/stagger-container";
import Image from "next/image";

const serif = "font-[family-name:var(--font-noto-serif-jp)]";

export default function Home() {
  return (
    <main className="bg-[#F7F3ED] text-[#3D3425] overflow-hidden">
      {/* ===== NAV ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F7F3ED]/85 backdrop-blur-xl border-b border-[#3D3425]/5">
        <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center justify-between">
          <span className={`text-[17px] font-bold tracking-[0.06em] ${serif}`}>
            하루<span className="text-[#8EAEBF] ml-1">海</span>
          </span>
          <div className="hidden md:flex items-center gap-8">
            <a href="#story" className="text-[13px] text-[#3D3425]/40 hover:text-[#3D3425] transition-colors">Story</a>
            <a href="#menu" className="text-[13px] text-[#3D3425]/40 hover:text-[#3D3425] transition-colors">Menu</a>
            <a href="#space" className="text-[13px] text-[#3D3425]/40 hover:text-[#3D3425] transition-colors">Space</a>
            <a href="#access" className="text-[13px] text-[#3D3425]/40 hover:text-[#3D3425] transition-colors">Access</a>
          </div>
          <a href="#access" className="text-[12px] bg-[#3D3425] hover:bg-[#5A4D3A] text-[#F7F3ED] px-5 py-1.5 rounded-full transition-colors font-medium tracking-wider">
            VISIT
          </a>
        </div>
      </nav>

      {/* ===== HERO — 全画面写真 + 下部にテキスト ===== */}
      <section className="h-[100svh] relative">
        <div className="absolute inset-0">
          <ScrollReveal duration={1.8} direction="none" className="w-full h-full">
            <Image
              src="/ai-website-cloner/images/hero-cafe.png"
              alt="海の見える韓国風カフェ"
              width={1024}
              height={1024}
              className="w-full h-full object-cover"
              priority
            />
          </ScrollReveal>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#F7F3ED] via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-12 md:pb-20">
          <div className="max-w-[1200px] mx-auto">
            <ScrollReveal duration={1} delay={0.4}>
              <p className="text-[10px] md:text-[12px] tracking-[0.5em] uppercase text-[#3D3425]/40 mb-4">
                Ocean View Korean Café
              </p>
            </ScrollReveal>
            <ScrollReveal duration={1.2} delay={0.6}>
              <h1 className={`text-[56px] md:text-[88px] lg:text-[120px] font-light tracking-[0.02em] leading-[0.9] mb-4 ${serif}`}>
                하루海
              </h1>
            </ScrollReveal>
            <ScrollReveal duration={1} delay={0.8}>
              <p className={`text-[14px] md:text-[17px] font-light text-[#3D3425]/50 tracking-[0.1em] ${serif}`}>
                波の音と、一杯のコーヒーと。
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== EDITORIAL 1 — コンセプト（テキスト左・写真右、非対称） ===== */}
      <section id="story" className="py-24 md:py-40">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* 非対称グリッド：テキスト狭め・写真広め */}
          <div className="grid md:grid-cols-[5fr_7fr] gap-8 md:gap-6 items-end">
            <div className="md:pb-16">
              <ScrollReveal>
                <p className="text-[10px] tracking-[0.4em] uppercase text-[#8EAEBF] font-medium mb-6">Our Story</p>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h2 className={`text-[28px] md:text-[36px] lg:text-[44px] font-light tracking-[0.01em] leading-[1.4] mb-8 ${serif}`}>
                  海と暮らす、<br />
                  カフェのある日常。
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <div className="w-10 h-px bg-[#8EAEBF]/40 mb-8" />
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <p className={`text-[13px] md:text-[14px] text-[#3D3425]/45 leading-[2.2] ${serif}`}>
                  하루海（ハルうみ）は、<br className="hidden md:block" />
                  韓国のカフェ文化と日本の海辺の風景が出会う場所。<br className="hidden md:block" />
                  窓の外に広がる水平線を眺めながら、<br className="hidden md:block" />
                  丁寧に淹れた一杯と手作りスイーツで<br className="hidden md:block" />
                  あなただけの「하루（一日）」をお過ごしください。
                </p>
              </ScrollReveal>
            </div>
            <div>
              <ParallaxLayer speed={0.08}>
                <ScrollReveal direction="right" delay={0.15}>
                  <div className="rounded-[20px] overflow-hidden">
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

      {/* ===== EDITORIAL 2 — 引用帯（フルワイド） ===== */}
      <section className="bg-[#3D3425] py-20 md:py-28">
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <ScrollReveal>
            <p className={`text-[24px] md:text-[34px] lg:text-[42px] font-light text-[#F7F3ED] leading-[1.6] tracking-[0.03em] ${serif}`}>
              &ldquo;海が見える席で飲むアメリカーノは、<br className="hidden md:block" />
              いつもより少しだけ、特別な味がする。&rdquo;
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== EDITORIAL 3 — メニュー（大写真+右下にリスト、マガジン風） ===== */}
      <section id="menu" className="py-24 md:py-40">
        <div className="max-w-[1200px] mx-auto px-6">
          <ScrollReveal>
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#8EAEBF] font-medium mb-4">Menu</p>
            <h2 className={`text-[32px] md:text-[44px] font-light tracking-[0.02em] mb-16 md:mb-24 ${serif}`}>
              Signature
            </h2>
          </ScrollReveal>

          {/* ドリンク — 大きい写真を左上、テキストを右下にオフセット */}
          <div className="grid md:grid-cols-12 gap-6 md:gap-0 mb-20 md:mb-32">
            <div className="md:col-span-7 md:row-span-2">
              <ParallaxLayer speed={0.06}>
                <ScrollReveal>
                  <div className="rounded-[16px] overflow-hidden">
                    <Image
                      src="/ai-website-cloner/images/drinks-cafe.png"
                      alt="シグネチャードリンク3種"
                      width={1024}
                      height={1024}
                      className="w-full h-auto"
                    />
                  </div>
                </ScrollReveal>
              </ParallaxLayer>
            </div>
            <div className="md:col-span-5 md:pl-10 flex flex-col justify-end">
              <ScrollReveal direction="right" delay={0.2}>
                <p className={`text-[12px] tracking-[0.3em] uppercase text-[#8EAEBF]/60 mb-6`}>Drinks</p>
                <StaggerContainer stagger={0.08}>
                  {[
                    { name: "抹茶ラテ", ko: "말차 라떼", price: "¥680" },
                    { name: "ストロベリースムージー", ko: "딸기 스무디", price: "¥750" },
                    { name: "アイスアメリカーノ", ko: "아이스 아메리카노", price: "¥550" },
                    { name: "ハニーバニララテ", ko: "허니 바닐라 라떼", price: "¥700" },
                    { name: "柚子エイド", ko: "유자 에이드", price: "¥620" },
                  ].map((d) => (
                    <div key={d.name} className="flex items-baseline justify-between py-4 border-b border-[#3D3425]/6">
                      <div>
                        <span className={`text-[15px] md:text-[16px] ${serif}`}>{d.name}</span>
                        <span className="text-[11px] text-[#8EAEBF] ml-2">{d.ko}</span>
                      </div>
                      <span className="text-[13px] text-[#8EAEBF] ml-4">{d.price}</span>
                    </div>
                  ))}
                </StaggerContainer>
              </ScrollReveal>
            </div>
          </div>

          {/* デザート — 逆レイアウト：テキスト左上、写真右下 */}
          <div className="grid md:grid-cols-12 gap-6 md:gap-0">
            <div className="md:col-span-5 md:pr-10 flex flex-col justify-start order-2 md:order-1">
              <ScrollReveal direction="left" delay={0.2}>
                <p className={`text-[12px] tracking-[0.3em] uppercase text-[#8EAEBF]/60 mb-6`}>Desserts</p>
                <p className={`text-[13px] text-[#3D3425]/45 leading-[2] mb-8 ${serif}`}>
                  毎朝パティシエが焼き上げる<br />
                  クロワッサンとスイーツ。<br />
                  海風の中で食べるとまた格別。
                </p>
                <StaggerContainer stagger={0.08}>
                  {[
                    { name: "バタークロワッサン", ko: "버터 크루아상", price: "¥420" },
                    { name: "ティラミス", ko: "티라미수", price: "¥580" },
                    { name: "季節のタルト", ko: "계절 타르트", price: "¥620" },
                    { name: "あんバターサンド", ko: "앙버터 샌드", price: "¥480" },
                  ].map((d) => (
                    <div key={d.name} className="flex items-baseline justify-between py-4 border-b border-[#3D3425]/6">
                      <div>
                        <span className={`text-[15px] md:text-[16px] ${serif}`}>{d.name}</span>
                        <span className="text-[11px] text-[#8EAEBF] ml-2">{d.ko}</span>
                      </div>
                      <span className="text-[13px] text-[#8EAEBF] ml-4">{d.price}</span>
                    </div>
                  ))}
                </StaggerContainer>
              </ScrollReveal>
            </div>
            <div className="md:col-span-7 md:pl-6 order-1 md:order-2">
              <ParallaxLayer speed={0.06}>
                <ScrollReveal delay={0.1}>
                  <div className="rounded-[16px] overflow-hidden">
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

      {/* ===== EDITORIAL 4 — Space（フルブリード写真 + オーバーレイテキスト） ===== */}
      <section id="space" className="relative min-h-[80vh] md:min-h-screen flex items-end">
        <div className="absolute inset-0">
          <ParallaxLayer speed={0.15} className="w-full h-full">
            <Image
              src="/ai-website-cloner/images/interior-cafe.png"
              alt="カフェインテリア"
              width={1024}
              height={1024}
              className="w-full h-full object-cover"
            />
          </ParallaxLayer>
          <div className="absolute inset-0 bg-gradient-to-t from-[#3D3425]/80 via-[#3D3425]/20 to-transparent" />
        </div>
        <div className="relative z-10 px-6 pb-16 md:pb-24 pt-40 w-full">
          <div className="max-w-[1200px] mx-auto">
            <div className="max-w-[560px]">
              <ScrollReveal>
                <p className="text-[10px] tracking-[0.4em] uppercase text-[#D4C8B0] font-medium mb-6">Space</p>
              </ScrollReveal>
              <ScrollReveal delay={0.15}>
                <h2 className={`text-[30px] md:text-[42px] lg:text-[52px] font-light tracking-[0.02em] leading-[1.3] mb-8 text-[#F7F3ED] ${serif}`}>
                  海と、光と、<br />
                  あなたの席。
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <p className={`text-[13px] md:text-[15px] text-[#F7F3ED]/60 leading-[2.1] mb-10 ${serif}`}>
                  アーチ窓から注ぐ陽光、ラタンチェアのやわらかさ、<br className="hidden md:block" />
                  天井から垂れるグリーンの息吹。<br className="hidden md:block" />
                  ここは、海辺のあなたのリビング。
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.4}>
                <div className="flex gap-3 flex-wrap">
                  {["Ocean View", "Free Wi-Fi", "テラス席", "ペット可"].map((tag) => (
                    <span key={tag} className={`px-4 py-2 rounded-full border border-[#F7F3ED]/15 bg-[#F7F3ED]/5 text-[11px] tracking-[0.08em] text-[#F7F3ED]/60`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== EDITORIAL 5 — アクセス（非対称2カラム） ===== */}
      <section id="access" className="py-24 md:py-40">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-[7fr_5fr] gap-12 md:gap-20">
            {/* 左：大きな見出し + 地図代わりの情報 */}
            <div>
              <ScrollReveal>
                <p className="text-[10px] tracking-[0.4em] uppercase text-[#8EAEBF] font-medium mb-4">Access</p>
                <h2 className={`text-[40px] md:text-[56px] lg:text-[72px] font-light tracking-[0.01em] mb-16 leading-[1.15] ${serif}`}>
                  会いに<br />来て。
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.15}>
                <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                  <div>
                    <p className="text-[10px] tracking-[0.3em] uppercase text-[#8EAEBF]/60 mb-2">Address</p>
                    <p className={`text-[#3D3425]/65 text-[14px] leading-[1.8] ${serif}`}>神奈川県鎌倉市<br />七里ガ浜 1-2-3</p>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.3em] uppercase text-[#8EAEBF]/60 mb-2">Access</p>
                    <p className={`text-[#3D3425]/65 text-[14px] leading-[1.8] ${serif}`}>江ノ電<br />七里ヶ浜駅 徒歩5分</p>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.3em] uppercase text-[#8EAEBF]/60 mb-2">Tel</p>
                    <p className={`text-[#3D3425]/65 text-[14px] ${serif}`}>0467-12-3456</p>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.3em] uppercase text-[#8EAEBF]/60 mb-2">Parking</p>
                    <p className={`text-[#3D3425]/65 text-[14px] ${serif}`}>専用駐車場 8台</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
            {/* 右：営業時間 + 予約情報 */}
            <div className="md:pt-12">
              <ScrollReveal delay={0.2}>
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#8EAEBF]/60 mb-8">Hours</p>
                <StaggerContainer stagger={0.1} className="space-y-0">
                  {[
                    { day: "月 - 金", time: "10:00 - 20:00" },
                    { day: "土 - 日", time: "9:00 - 21:00" },
                    { day: "祝日", time: "10:00 - 19:00" },
                  ].map((h) => (
                    <div key={h.day} className="flex items-center justify-between py-6 border-b border-[#3D3425]/8">
                      <span className={`text-[#3D3425]/40 text-[13px] ${serif}`}>{h.day}</span>
                      <span className={`text-[20px] md:text-[24px] font-light tracking-[0.05em] ${serif}`}>{h.time}</span>
                    </div>
                  ))}
                </StaggerContainer>
              </ScrollReveal>
              <ScrollReveal delay={0.4}>
                <div className="mt-12 p-6 rounded-[16px] bg-[#8EAEBF]/8 border border-[#8EAEBF]/12">
                  <p className={`text-[13px] text-[#3D3425]/45 leading-[2] ${serif}`}>
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

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-[#3D3425]/5 py-12 bg-[#F7F3ED]">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <span className={`text-[15px] tracking-[0.06em] text-[#3D3425]/25 ${serif}`}>하루海</span>
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
