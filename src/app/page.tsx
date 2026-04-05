"use client";

import { ScrollReveal } from "@/components/animation/scroll-reveal";
import { ParallaxLayer } from "@/components/animation/parallax-layer";
import { StaggerContainer } from "@/components/animation/stagger-container";
import { StickySection } from "@/components/animation/sticky-section";
import { useState, useCallback } from "react";
import Image from "next/image";

const serif = "font-[family-name:var(--font-noto-serif-jp)]";

export default function Home() {
  const [processStep, setProcessStep] = useState(0);

  const handleProgress = useCallback((progress: number) => {
    const step = Math.min(Math.floor(progress * 4), 3);
    setProcessStep(step);
  }, []);

  const processSteps = [
    { num: "01", title: "デザイン", sub: "DESIGN", desc: "お客様の想いをヒアリングし、コンセプトに合ったデザインを制作。ページレイアウトからフォント選びまで、細部にこだわります。" },
    { num: "02", title: "印刷", sub: "PRINT", desc: "最新鋭のオフセット印刷機と熟練の技術で、色彩の再現性と紙の風合いを最大限に引き出します。" },
    { num: "03", title: "製本", sub: "BINDING", desc: "無線綴じ、中綴じ、上製本。用途に合わせた製本方法で、手に取った時の質感まで設計します。" },
    { num: "04", title: "発送", sub: "DELIVERY", desc: "全国への発送代行まで一貫対応。梱包から配送まで、大切な冊子を確実にお届けします。" },
  ];

  return (
    <main className="bg-[#F4F2ED] text-[#1A1715] overflow-hidden">
      {/* ===== NAV ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <Image src="/ai-website-cloner/images/izumi/logo.svg" alt="和泉出版印刷" width={180} height={44} className="h-8 md:h-10 w-auto brightness-0 invert" />
          <div className="hidden md:flex items-center gap-10">
            {["Story", "Service", "Process", "Works", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-[11px] tracking-[0.15em] uppercase text-white/50 hover:text-white transition-colors duration-500">
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ===== HERO — フルスクリーン写真どーん ===== */}
      <section className="h-[100svh] relative">
        <div className="absolute inset-0">
          <Image
            src="/ai-website-cloner/images/hero-craftsman.png"
            alt="製本職人の手仕事"
            width={1024}
            height={1024}
            className="w-full h-full object-cover scale-[1.02]"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/30" />

        <div className="absolute inset-0 z-10 flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-12">
          <div className="max-w-[1400px] mx-auto w-full">
            <ScrollReveal duration={1.2} delay={0.3}>
              <p className="text-[11px] tracking-[0.5em] uppercase text-[#D4C4A8] mb-5 md:mb-6">
                Since 1979 — Osaka, Izumi
              </p>
            </ScrollReveal>
            <ScrollReveal duration={1.5} delay={0.5}>
              <h1 className={`text-[48px] md:text-[80px] lg:text-[110px] leading-[1.05] tracking-[-0.02em] text-white ${serif}`}>
                想いを、<br />
                カタチに。
              </h1>
            </ScrollReveal>
            <ScrollReveal duration={1} delay={0.9}>
              <p className={`text-[13px] md:text-[15px] text-white/45 mt-6 md:mt-8 max-w-[440px] leading-[2.2] ${serif}`}>
                半世紀にわたり、一冊一冊に心を込めて。<br />
                デザインから製本・発送まで、すべてを一貫体制で。
              </p>
            </ScrollReveal>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <ScrollReveal delay={1.3}>
            <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
          </ScrollReveal>
        </div>
      </section>

      {/* ===== STORY — 巨大タイポ + 右テキスト ===== */}
      <section id="story" className="py-28 md:py-44">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <ScrollReveal>
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#9C8B6E] mb-12 md:mb-16">Our Story</p>
          </ScrollReveal>

          <div className="grid md:grid-cols-[1.2fr_1fr] gap-12 md:gap-20 items-start">
            <ScrollReveal delay={0.1}>
              <h2 className={`text-[36px] md:text-[56px] lg:text-[72px] leading-[1.15] tracking-[-0.02em] ${serif}`}>
                50年の手仕事が、<br />
                ここにある。
              </h2>
            </ScrollReveal>
            <div className="flex flex-col gap-6 md:pt-4">
              <ScrollReveal delay={0.2}>
                <p className={`text-[14px] md:text-[15px] text-[#1A1715]/50 leading-[2.3] ${serif}`}>
                  1979年、大阪・和泉の地に誕生した和泉出版印刷。以来半世紀、私たちは「冊子づくり」ひとすじに歩んでまいりました。
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <p className={`text-[14px] md:text-[15px] text-[#1A1715]/50 leading-[2.3] ${serif}`}>
                  デザイン・編集から印刷・製本・発送まで、すべての工程を自社で一貫して行う体制。それは、お客様の「想い」を最も正確に「カタチ」にするための、私たちの答えです。
                </p>
              </ScrollReveal>
            </div>
          </div>

          {/* 数字 */}
          <div className="mt-20 md:mt-28 pt-12 border-t border-[#1A1715]/8">
            <StaggerContainer stagger={0.08} className="grid grid-cols-3 gap-6 md:gap-12">
              {[
                { num: "50", unit: "年", label: "の実績" },
                { num: "10,000", unit: "+", label: "冊の制作実績" },
                { num: "6", unit: "", label: "つの一貫工程" },
              ].map((stat) => (
                <div key={stat.label} className="text-center md:text-left">
                  <p className={`text-[32px] md:text-[48px] lg:text-[56px] font-extralight tracking-[-0.03em] ${serif}`}>
                    {stat.num}<span className="text-[#9C8B6E]">{stat.unit}</span>
                  </p>
                  <p className={`text-[11px] text-[#1A1715]/30 mt-2 tracking-[0.05em] ${serif}`}>{stat.label}</p>
                </div>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ===== フルスクリーン — 本棚写真 ===== */}
      <section className="h-[70vh] md:h-[90vh] relative">
        <ParallaxLayer speed={0.2} className="h-full">
          <Image
            src="/ai-website-cloner/images/bookshelf.png"
            alt="本棚に並ぶ製本された書籍"
            width={1024}
            height={1024}
            className="w-full h-[90vh] md:h-[110vh] object-cover"
          />
        </ParallaxLayer>
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute bottom-8 left-6 md:bottom-12 md:left-12 z-10">
          <ScrollReveal>
            <p className={`text-[10px] tracking-[0.3em] uppercase text-white/50`}>Crafted with care</p>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== SERVICE — 白カード ===== */}
      <section id="service" className="py-28 md:py-44">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <ScrollReveal>
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#9C8B6E] mb-4">Service</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className={`text-[36px] md:text-[56px] lg:text-[72px] leading-[1.15] tracking-[-0.02em] mb-16 md:mb-24 ${serif}`}>
              すべてを、<br />
              ひとつの場所で。
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "デザイン制作", desc: "コンセプト設計からレイアウトまで。読者の心に届くビジュアルをデザインします。", tag: "DESIGN", icon: "/ai-website-cloner/images/izumi/service_icon01.png" },
              { title: "編集・組版", desc: "文字組み、校正、DTPオペレーション。読みやすさと美しさを両立する組版技術。", tag: "EDITORIAL", icon: "/ai-website-cloner/images/izumi/service_icon02.png" },
              { title: "印刷", desc: "最新オフセット印刷機による高精細印刷。色校正から本刷りまで、色彩を忠実に再現。", tag: "PRINTING", icon: "/ai-website-cloner/images/izumi/service_icon03.png" },
              { title: "製本", desc: "無線綴じ・中綴じ・上製本。冊子の用途と予算に合わせた最適な製本方法をご提案。", tag: "BINDING", icon: "/ai-website-cloner/images/izumi/service_icon04.png" },
              { title: "発送代行", desc: "全国への発送を一括代行。個別封入から大量発送まで、確実にお届けします。", tag: "SHIPPING", icon: "/ai-website-cloner/images/izumi/service_icon05.png" },
              { title: "Web制作", desc: "冊子と連動したWebサイト・デジタルカタログの制作にも対応しています。", tag: "WEB", icon: "/ai-website-cloner/images/izumi/service_icon06.png" },
            ].map((service, i) => (
              <ScrollReveal key={service.tag} delay={i * 0.06}>
                <div className="bg-white/70 backdrop-blur-sm border border-[#1A1715]/[0.04] p-8 md:p-10 group hover:bg-white hover:shadow-[0_8px_40px_rgba(0,0,0,0.04)] transition-all duration-700">
                  <p className="text-[10px] tracking-[0.25em] uppercase text-[#9C8B6E] mb-6">{service.tag}</p>
                  <Image src={service.icon} alt={service.title} width={48} height={48} className="w-10 h-10 mb-5 opacity-70" />
                  <h3 className={`text-[20px] md:text-[22px] mb-4 leading-tight ${serif}`}>{service.title}</h3>
                  <p className={`text-[13px] text-[#1A1715]/40 leading-[2.1] ${serif}`}>{service.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== フルスクリーン — デザイナーワークスペース ===== */}
      <section className="h-[70vh] md:h-[90vh] relative">
        <ParallaxLayer speed={0.15} className="h-full">
          <Image
            src="/ai-website-cloner/images/designer-workspace.png"
            alt="デザイナーの作業台"
            width={1024}
            height={1024}
            className="w-full h-[90vh] md:h-[110vh] object-cover"
          />
        </ParallaxLayer>
      </section>

      {/* ===== PROCESS — StickySection ===== */}
      <section id="process" className="py-28 md:py-44">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-16">
          <ScrollReveal>
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#9C8B6E] mb-4">Process</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className={`text-[36px] md:text-[56px] lg:text-[72px] leading-[1.15] tracking-[-0.02em] ${serif}`}>
              一冊ができるまで。
            </h2>
          </ScrollReveal>
        </div>

        <StickySection scrollLength={3} onProgress={handleProgress} className="min-h-screen flex items-center bg-[#F4F2ED]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full">
            <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
              <div className="relative aspect-[4/3] md:aspect-square overflow-hidden">
                <Image
                  src="/ai-website-cloner/images/izumi/point03.jpg"
                  alt="印刷工程"
                  width={1024}
                  height={1024}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8">
                  <span className={`text-[72px] md:text-[120px] font-extralight text-white/20 leading-none ${serif}`}>
                    {processSteps[processStep].num}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-6 md:gap-8">
                {processSteps.map((step, i) => (
                  <div
                    key={step.num}
                    className={`border-l-[2px] pl-6 md:pl-8 py-3 transition-all duration-700 ${
                      processStep === i
                        ? "border-[#9C8B6E] opacity-100"
                        : "border-[#1A1715]/8 opacity-25"
                    }`}
                  >
                    <p className="text-[10px] tracking-[0.3em] uppercase text-[#9C8B6E] mb-2">{step.sub}</p>
                    <h3 className={`text-[22px] md:text-[28px] mb-2 ${serif}`}>{step.title}</h3>
                    <p className={`text-[13px] text-[#1A1715]/40 leading-[2.1] ${serif}`}>{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </StickySection>
      </section>

      {/* ===== 引用 — フルスクリーンテキスト ===== */}
      <section className="min-h-[80vh] md:min-h-screen flex items-center relative">
        <div className="absolute inset-0 opacity-[0.07]">
          <Image
            src="/ai-website-cloner/images/paper-texture.png"
            alt=""
            width={1024}
            height={1024}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-[900px] mx-auto px-6 md:px-12 text-center py-28">
          <ScrollReveal duration={1.2}>
            <p className={`text-[22px] md:text-[34px] lg:text-[42px] leading-[2] tracking-[-0.01em] text-[#1A1715]/55 ${serif}`}>
              「紙」には、<br className="md:hidden" />デジタルにはない<br />
              温もりがあります。<br />
              手に取り、ページをめくる。<br />
              その体験そのものが、<br />
              メッセージになる。
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== フルスクリーン — 冊子ライフスタイル ===== */}
      <section className="h-[70vh] md:h-[90vh] relative">
        <ParallaxLayer speed={0.15} className="h-full">
          <Image
            src="/ai-website-cloner/images/booklet-lifestyle.png"
            alt="上質な冊子のある暮らし"
            width={1024}
            height={1024}
            className="w-full h-[90vh] md:h-[110vh] object-cover"
          />
        </ParallaxLayer>
      </section>

      {/* ===== WORKS — 2×2グリッド ===== */}
      <section id="works" className="py-28 md:py-44">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <ScrollReveal>
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#9C8B6E] mb-4">Works</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className={`text-[36px] md:text-[56px] lg:text-[72px] leading-[1.15] tracking-[-0.02em] mb-16 md:mb-24 ${serif}`}>
              制作実績
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[
              { img: "/ai-website-cloner/images/izumi/strength01.jpg", title: "記念誌・社史", desc: "創業周年記念誌、学校記念誌など、歴史を未来へ繋ぐ一冊を。" },
              { img: "/ai-website-cloner/images/izumi/point02.jpg", title: "カタログ・パンフレット", desc: "商品の魅力を最大限に伝える、高品質なカタログ制作。" },
              { img: "/ai-website-cloner/images/works-flatlay.png", title: "学術誌・論文集", desc: "正確な組版と校正で、学術的な信頼性を支えます。" },
              { img: "/ai-website-cloner/images/book-pages.png", title: "自費出版", desc: "あなたの物語を一冊の本に。企画から販売サポートまで。" },
            ].map((work, i) => (
              <ScrollReveal key={work.title} delay={i * 0.1}>
                <div className="group cursor-pointer">
                  <div className="aspect-[16/10] overflow-hidden mb-5">
                    <Image
                      src={work.img}
                      alt={work.title}
                      width={1024}
                      height={640}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[1000ms]"
                    />
                  </div>
                  <div className="flex items-baseline justify-between">
                    <h3 className={`text-[18px] md:text-[20px] ${serif}`}>{work.title}</h3>
                    <span className="text-[11px] text-[#1A1715]/20 tracking-wider hidden md:block">View →</span>
                  </div>
                  <p className={`text-[13px] text-[#1A1715]/35 leading-[1.8] mt-2 ${serif}`}>{work.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STRENGTHS — ダーク + 右に写真どーん ===== */}
      {[
        { num: "01", title: "ワンストップ\n一貫体制", desc: "デザインから発送まで、外注なしの完全一貫体制。工程間のロスを排除し、品質とスピードを両立。お客様の窓口はひとつだけ。", img: "/ai-website-cloner/images/izumi/point01.png", imgAlt: "一貫体制の印刷工程" },
        { num: "02", title: "職人品質の\n印刷技術", desc: "最新鋭のオフセット印刷機と、50年で培った熟練の技術。色の再現性、紙との相性、インクの乗り。すべてに妥協しません。", img: "/ai-website-cloner/images/izumi/point02.jpg", imgAlt: "色校正チェック" },
        { num: "03", title: "半世紀の\n信頼と実績", desc: "1979年の創業以来、官公庁・教育機関・企業まで幅広いお客様の冊子を手がけてきました。10,000冊を超える制作実績。", img: "/ai-website-cloner/images/izumi/strength01.jpg", imgAlt: "積まれた印刷物" },
      ].map((item, i) => (
        <section key={item.num} className="min-h-screen bg-[#1A1715] flex items-center">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full py-20 md:py-0">
            <div className={`grid md:grid-cols-2 gap-12 md:gap-16 items-center ${i % 2 === 1 ? "md:direction-rtl" : ""}`}>
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                {i === 0 && (
                  <>
                    <ScrollReveal>
                      <p className="text-[11px] tracking-[0.3em] uppercase text-[#D4C4A8] mb-4">Strengths</p>
                    </ScrollReveal>
                    <ScrollReveal delay={0.05}>
                      <h2 className={`text-[36px] md:text-[56px] lg:text-[72px] leading-[1.15] tracking-[-0.02em] mb-12 md:mb-16 text-[#F4F2ED] ${serif}`}>
                        選ばれる理由。
                      </h2>
                    </ScrollReveal>
                  </>
                )}
                <ScrollReveal delay={0.1}>
                  <span className={`text-[56px] md:text-[72px] font-extralight text-[#D4C4A8]/15 ${serif}`}>{item.num}</span>
                </ScrollReveal>
                <ScrollReveal delay={0.15}>
                  <h3 className={`text-[28px] md:text-[36px] mt-2 mb-6 leading-[1.5] whitespace-pre-line text-[#F4F2ED] ${serif}`}>{item.title}</h3>
                </ScrollReveal>
                <ScrollReveal delay={0.2}>
                  <p className={`text-[14px] text-[#F4F2ED]/40 leading-[2.2] max-w-[400px] ${serif}`}>{item.desc}</p>
                </ScrollReveal>
              </div>
              <div className={i % 2 === 1 ? "md:order-1" : ""}>
                <ScrollReveal delay={0.1} direction={i % 2 === 0 ? "right" : "left"}>
                  <div className="aspect-[4/5] overflow-hidden">
                    <Image
                      src={item.img}
                      alt={item.imgAlt}
                      width={1024}
                      height={1280}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ===== フルスクリーン — ショールーム ===== */}
      <section className="h-[60vh] md:h-[80vh] relative">
        <ParallaxLayer speed={0.1} className="h-full">
          <Image
            src="/ai-website-cloner/images/showroom.png"
            alt="和泉出版印刷ショールーム"
            width={1024}
            height={1024}
            className="w-full h-[80vh] md:h-[100vh] object-cover"
          />
        </ParallaxLayer>
      </section>

      {/* ===== COMPANY ===== */}
      <section className="py-28 md:py-44">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <ScrollReveal>
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#9C8B6E] mb-4">Company</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className={`text-[36px] md:text-[56px] leading-[1.15] tracking-[-0.02em] mb-16 ${serif}`}>
              会社概要
            </h2>
          </ScrollReveal>

          <div className="max-w-[700px]">
            <StaggerContainer stagger={0.04}>
              {[
                { label: "会社名", value: "和泉出版印刷株式会社" },
                { label: "設立", value: "1979年（昭和54年）" },
                { label: "所在地", value: "大阪府和泉市" },
                { label: "事業内容", value: "冊子の企画・デザイン・編集・印刷・製本・発送" },
                { label: "対応エリア", value: "全国対応（発送代行含む）" },
              ].map((row) => (
                <div key={row.label} className="flex flex-col md:flex-row md:items-baseline py-5 border-b border-[#1A1715]/6">
                  <span className="text-[11px] tracking-[0.15em] uppercase text-[#1A1715]/25 md:w-[200px] mb-1 md:mb-0">{row.label}</span>
                  <span className={`text-[15px] text-[#1A1715]/65 ${serif}`}>{row.value}</span>
                </div>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section id="contact" className="py-28 md:py-44 bg-[#9C8B6E]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <ScrollReveal>
            <p className="text-[11px] tracking-[0.3em] uppercase text-white/40 mb-6">Contact</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className={`text-[36px] md:text-[56px] lg:text-[72px] leading-[1.15] tracking-[-0.02em] text-white mb-6 ${serif}`}>
              まずは、<br className="md:hidden" />ご相談ください。
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className={`text-[14px] text-white/50 leading-[2.2] mb-12 ${serif}`}>
              冊子づくりのこと、なんでもお気軽にお問い合わせください。<br />
              お見積り・ご相談は無料です。
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:0725-00-0000" className={`text-[14px] tracking-[0.08em] border border-white/40 text-white px-10 py-4 hover:bg-white hover:text-[#9C8B6E] transition-all duration-500 ${serif}`}>
                0725-00-0000
              </a>
              <a href="#" className={`text-[14px] tracking-[0.08em] bg-white text-[#9C8B6E] px-10 py-4 hover:bg-[#F4F2ED] transition-all duration-500 ${serif}`}>
                お問い合わせフォーム
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-14 px-6 md:px-12 bg-[#1A1715]">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <Image src="/ai-website-cloner/images/izumi/logo.svg" alt="和泉出版印刷" width={180} height={44} className="h-8 w-auto brightness-0 invert" />
          </div>
          <div className="flex gap-6 md:gap-8">
            {["Story", "Service", "Process", "Works", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] tracking-[0.1em] text-[#F4F2ED]/20 hover:text-[#F4F2ED]/50 transition-colors uppercase">
                {item}
              </a>
            ))}
          </div>
          <p className="text-[10px] text-[#F4F2ED]/12">&copy; 2026 Izumi Publishing & Printing</p>
        </div>
      </footer>
    </main>
  );
}
