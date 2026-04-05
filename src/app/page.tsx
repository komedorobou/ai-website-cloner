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
    <main className="bg-[#0A0A08] text-[#F5F0E8] overflow-hidden">
      {/* ===== NAV ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <span className={`text-[18px] tracking-[0.2em] uppercase text-[#F5F0E8] ${serif}`}>
            和泉出版印刷
          </span>
          <div className="hidden md:flex items-center gap-10">
            {["Story", "Service", "Process", "Works", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-[11px] tracking-[0.15em] uppercase text-[#F5F0E8]/40 hover:text-[#F5F0E8] transition-colors duration-500">
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ===== HERO — 全画面クラフトマン写真 ===== */}
      <section className="h-[100svh] relative">
        <div className="absolute inset-0">
          <Image
            src="/ai-website-cloner/images/hero-craftsman.png"
            alt="製本職人の手仕事"
            width={1024}
            height={1024}
            className="w-full h-full object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A08] via-[#0A0A08]/40 to-[#0A0A08]/60" />

        <div className="absolute inset-0 z-10 flex flex-col justify-end pb-20 md:pb-28 px-6 md:px-12">
          <div className="max-w-[1400px] mx-auto w-full">
            <ScrollReveal duration={1.2} delay={0.2}>
              <p className="text-[11px] md:text-[12px] tracking-[0.4em] uppercase text-[#C8A87C] mb-6">
                Since 1979 — Osaka, Izumi
              </p>
            </ScrollReveal>
            <ScrollReveal duration={1.4} delay={0.4}>
              <h1 className={`text-[48px] md:text-[80px] lg:text-[110px] leading-[1.05] tracking-[-0.02em] ${serif}`}>
                想いを、<br />
                カタチに。
              </h1>
            </ScrollReveal>
            <ScrollReveal duration={1} delay={0.8}>
              <p className={`text-[14px] md:text-[16px] text-[#F5F0E8]/40 mt-8 max-w-[480px] leading-[2] ${serif}`}>
                半世紀にわたり、一冊一冊に心を込めて。<br />
                デザインから製本・発送まで、すべてを一貫体制で。
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* スクロールインジケーター */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <ScrollReveal delay={1.2}>
            <div className="flex flex-col items-center gap-2">
              <span className="text-[9px] tracking-[0.3em] uppercase text-[#F5F0E8]/20">Scroll</span>
              <div className="w-px h-8 bg-gradient-to-b from-[#F5F0E8]/30 to-transparent" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== STORY ===== */}
      <section id="story" className="py-32 md:py-48">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <ScrollReveal>
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#C8A87C] mb-4">Our Story</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
            <ScrollReveal delay={0.1}>
              <h2 className={`text-[36px] md:text-[52px] lg:text-[64px] leading-[1.15] tracking-[-0.01em] ${serif}`}>
                50年の<br />
                手仕事が、<br />
                ここにある。
              </h2>
            </ScrollReveal>
            <div className="flex flex-col gap-8">
              <ScrollReveal delay={0.2}>
                <p className={`text-[15px] md:text-[16px] text-[#F5F0E8]/50 leading-[2.2] ${serif}`}>
                  1979年、大阪・和泉の地に誕生した和泉出版印刷。以来半世紀、私たちは「冊子づくり」ひとすじに歩んでまいりました。
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <p className={`text-[15px] md:text-[16px] text-[#F5F0E8]/50 leading-[2.2] ${serif}`}>
                  デザイン・編集から印刷・製本・発送まで、すべての工程を自社で一貫して行う体制。それは、お客様の「想い」を最も正確に「カタチ」にするための、私たちの答えです。
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.4}>
                <div className="flex gap-12 mt-4">
                  {[
                    { num: "50", unit: "年", label: "の実績" },
                    { num: "10,000", unit: "+", label: "冊の制作実績" },
                    { num: "6", unit: "", label: "つの一貫工程" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <p className="text-[32px] md:text-[40px] font-light tracking-tight">
                        {stat.num}<span className="text-[#C8A87C]">{stat.unit}</span>
                      </p>
                      <p className={`text-[11px] text-[#F5F0E8]/30 mt-1 ${serif}`}>{stat.label}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== フルブリード画像 — 印刷物フラットレイ ===== */}
      <section>
        <ParallaxLayer speed={0.15}>
          <Image
            src="/ai-website-cloner/images/works-flatlay.png"
            alt="和泉出版印刷の制作実績"
            width={1024}
            height={1024}
            className="w-full h-[60vh] md:h-[80vh] object-cover"
          />
        </ParallaxLayer>
      </section>

      {/* ===== SERVICE ===== */}
      <section id="service" className="py-32 md:py-48">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <ScrollReveal>
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#C8A87C] mb-4">Service</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className={`text-[36px] md:text-[52px] lg:text-[64px] leading-[1.15] tracking-[-0.01em] mb-20 md:mb-28 ${serif}`}>
              すべてを、<br />
              ひとつの場所で。
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#F5F0E8]/5">
            <StaggerContainer stagger={0.06} className="contents">
              {[
                { icon: "✦", title: "デザイン制作", desc: "コンセプト設計からレイアウトまで。読者の心に届くビジュアルをデザインします。", tag: "DESIGN" },
                { icon: "✦", title: "編集・組版", desc: "文字組み、校正、DTPオペレーション。読みやすさと美しさを両立する組版技術。", tag: "EDITORIAL" },
                { icon: "✦", title: "印刷", desc: "最新オフセット印刷機による高精細印刷。色校正から本刷りまで、色彩を忠実に再現。", tag: "PRINTING" },
                { icon: "✦", title: "製本", desc: "無線綴じ・中綴じ・上製本。冊子の用途と予算に合わせた最適な製本方法をご提案。", tag: "BINDING" },
                { icon: "✦", title: "発送代行", desc: "全国への発送を一括代行。個別封入から大量発送まで、確実にお届けします。", tag: "SHIPPING" },
                { icon: "✦", title: "Web制作", desc: "冊子と連動したWebサイト・デジタルカタログの制作にも対応しています。", tag: "WEB" },
              ].map((service) => (
                <div key={service.tag} className="bg-[#0A0A08] p-8 md:p-10 group hover:bg-[#12120F] transition-colors duration-500">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#C8A87C]/50 mb-6">{service.tag}</p>
                  <p className="text-[#C8A87C] text-[20px] mb-4">{service.icon}</p>
                  <h3 className={`text-[20px] md:text-[22px] mb-4 ${serif}`}>{service.title}</h3>
                  <p className={`text-[13px] text-[#F5F0E8]/35 leading-[2] ${serif}`}>{service.desc}</p>
                </div>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ===== PROCESS — StickySection ===== */}
      <section id="process" className="py-32 md:py-48">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-16">
          <ScrollReveal>
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#C8A87C] mb-4">Process</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className={`text-[36px] md:text-[52px] lg:text-[64px] leading-[1.15] tracking-[-0.01em] ${serif}`}>
              一冊ができるまで。
            </h2>
          </ScrollReveal>
        </div>

        <StickySection scrollLength={3} onProgress={handleProgress} className="min-h-screen flex items-center bg-[#0A0A08]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* 左: 印刷機画像 */}
              <div className="relative aspect-square overflow-hidden rounded-[8px]">
                <Image
                  src="/ai-website-cloner/images/printing-press.png"
                  alt="印刷工程"
                  width={1024}
                  height={1024}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#0A0A08]/30" />
                <div className="absolute bottom-6 left-6">
                  <span className={`text-[80px] md:text-[120px] font-light text-[#F5F0E8]/10 leading-none ${serif}`}>
                    {processSteps[processStep].num}
                  </span>
                </div>
              </div>

              {/* 右: ステップ */}
              <div className="flex flex-col gap-8">
                {processSteps.map((step, i) => (
                  <div
                    key={step.num}
                    className={`border-l-[2px] pl-8 py-4 transition-all duration-700 ${
                      processStep === i
                        ? "border-[#C8A87C] opacity-100"
                        : "border-[#F5F0E8]/5 opacity-30"
                    }`}
                  >
                    <p className="text-[10px] tracking-[0.3em] uppercase text-[#C8A87C] mb-2">{step.sub}</p>
                    <h3 className={`text-[24px] md:text-[28px] mb-3 ${serif}`}>{step.title}</h3>
                    <p className={`text-[13px] text-[#F5F0E8]/40 leading-[2] ${serif}`}>{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </StickySection>
      </section>

      {/* ===== 紙テクスチャ中間セクション ===== */}
      <section className="relative py-32 md:py-48">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/ai-website-cloner/images/paper-texture.png"
            alt=""
            width={1024}
            height={1024}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-[800px] mx-auto px-6 md:px-12 text-center">
          <ScrollReveal>
            <p className={`text-[24px] md:text-[36px] lg:text-[44px] leading-[1.8] tracking-[-0.01em] text-[#F5F0E8]/70 ${serif}`}>
              「紙」には、デジタルにはない<br />
              温もりがあります。<br />
              手に取り、ページをめくる。<br />
              その体験そのものが、<br />
              メッセージになる。
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== WORKS ===== */}
      <section id="works" className="py-32 md:py-48">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <ScrollReveal>
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#C8A87C] mb-4">Works</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className={`text-[36px] md:text-[52px] lg:text-[64px] leading-[1.15] tracking-[-0.01em] mb-20 ${serif}`}>
              制作実績
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { img: "/ai-website-cloner/images/works-flatlay.png", title: "記念誌・社史", desc: "創業50周年記念誌、学校記念誌など、歴史を未来へ繋ぐ一冊を。" },
              { img: "/ai-website-cloner/images/showroom.png", title: "カタログ・パンフレット", desc: "商品の魅力を最大限に伝える、高品質なカタログ制作。" },
              { img: "/ai-website-cloner/images/printing-press.png", title: "学術誌・論文集", desc: "正確な組版と校正で、学術的な信頼性を支えます。" },
              { img: "/ai-website-cloner/images/hero-craftsman.png", title: "自費出版", desc: "あなたの物語を一冊の本に。企画から販売サポートまで。" },
            ].map((work, i) => (
              <ScrollReveal key={work.title} delay={i * 0.1}>
                <div className="group cursor-pointer">
                  <div className="aspect-[16/10] overflow-hidden rounded-[4px] mb-5">
                    <Image
                      src={work.img}
                      alt={work.title}
                      width={1024}
                      height={640}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    />
                  </div>
                  <h3 className={`text-[18px] md:text-[20px] mb-2 ${serif}`}>{work.title}</h3>
                  <p className={`text-[13px] text-[#F5F0E8]/35 leading-[1.8] ${serif}`}>{work.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STRENGTHS ===== */}
      <section className="py-32 md:py-48 bg-[#12120F]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <ScrollReveal>
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#C8A87C] mb-4">Strengths</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className={`text-[36px] md:text-[52px] lg:text-[64px] leading-[1.15] tracking-[-0.01em] mb-20 md:mb-28 ${serif}`}>
              選ばれる理由。
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-16 md:gap-12">
            <StaggerContainer stagger={0.1}>
              {[
                { num: "01", title: "ワンストップ\n一貫体制", desc: "デザインから発送まで、外注なしの完全一貫体制。工程間のロスを排除し、品質とスピードを両立。お客様の窓口はひとつだけ。" },
                { num: "02", title: "職人品質の\n印刷技術", desc: "最新鋭のオフセット印刷機と、50年で培った熟練の技術。色の再現性、紙との相性、インクの乗り。すべてに妥協しません。" },
                { num: "03", title: "半世紀の\n信頼と実績", desc: "1979年の創業以来、官公庁・教育機関・企業まで幅広いお客様の冊子を手がけてきました。10,000冊を超える制作実績。" },
              ].map((item) => (
                <div key={item.num}>
                  <span className="text-[48px] md:text-[56px] font-extralight text-[#C8A87C]/20">{item.num}</span>
                  <h3 className={`text-[22px] md:text-[26px] mt-4 mb-6 leading-[1.5] whitespace-pre-line ${serif}`}>{item.title}</h3>
                  <p className={`text-[13px] text-[#F5F0E8]/35 leading-[2.2] ${serif}`}>{item.desc}</p>
                </div>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ===== ショールーム画像 ===== */}
      <section>
        <ParallaxLayer speed={0.1}>
          <Image
            src="/ai-website-cloner/images/showroom.png"
            alt="和泉出版印刷ショールーム"
            width={1024}
            height={1024}
            className="w-full h-[50vh] md:h-[70vh] object-cover"
          />
        </ParallaxLayer>
      </section>

      {/* ===== COMPANY ===== */}
      <section className="py-32 md:py-48">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <ScrollReveal>
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#C8A87C] mb-4">Company</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className={`text-[36px] md:text-[52px] leading-[1.15] tracking-[-0.01em] mb-16 ${serif}`}>
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
                <div key={row.label} className="flex flex-col md:flex-row md:items-baseline py-5 border-b border-[#F5F0E8]/5">
                  <span className={`text-[11px] tracking-[0.15em] uppercase text-[#F5F0E8]/25 md:w-[200px] mb-1 md:mb-0 ${serif}`}>{row.label}</span>
                  <span className={`text-[15px] text-[#F5F0E8]/70 ${serif}`}>{row.value}</span>
                </div>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ===== CTA / CONTACT ===== */}
      <section id="contact" className="py-32 md:py-48 bg-[#C8A87C]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <ScrollReveal>
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#0A0A08]/40 mb-6">Contact</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className={`text-[36px] md:text-[52px] lg:text-[64px] leading-[1.15] tracking-[-0.01em] text-[#0A0A08] mb-8 ${serif}`}>
              まずは、ご相談ください。
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className={`text-[15px] text-[#0A0A08]/50 leading-[2] mb-12 ${serif}`}>
              冊子づくりのこと、なんでもお気軽にお問い合わせください。<br />
              お見積り・ご相談は無料です。
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:0725-00-0000" className={`inline-block text-[14px] tracking-[0.1em] border-2 border-[#0A0A08] text-[#0A0A08] px-10 py-4 hover:bg-[#0A0A08] hover:text-[#C8A87C] transition-all duration-500 ${serif}`}>
                0725-00-0000
              </a>
              <a href="#" className={`inline-block text-[14px] tracking-[0.1em] bg-[#0A0A08] text-[#C8A87C] px-10 py-4 hover:bg-[#1A1A18] transition-all duration-500 ${serif}`}>
                お問い合わせフォーム
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-16 px-6 md:px-12 border-t border-[#F5F0E8]/5">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className={`text-[16px] tracking-[0.15em] uppercase ${serif}`}>和泉出版印刷</p>
            <p className={`text-[11px] text-[#F5F0E8]/20 mt-2 ${serif}`}>Izumi Publishing & Printing Co., Ltd.</p>
          </div>
          <div className="flex gap-8">
            {["Story", "Service", "Process", "Works", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] tracking-[0.1em] text-[#F5F0E8]/20 hover:text-[#F5F0E8]/50 transition-colors uppercase">
                {item}
              </a>
            ))}
          </div>
          <p className={`text-[10px] text-[#F5F0E8]/15`}>&copy; 2026 Izumi Publishing & Printing</p>
        </div>
      </footer>
    </main>
  );
}
