"use client";

import { ScrollReveal } from "@/components/animation/scroll-reveal";
import { ParallaxLayer } from "@/components/animation/parallax-layer";
import { StaggerContainer } from "@/components/animation/stagger-container";
import { StickySection } from "@/components/animation/sticky-section";
import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";

// ゴシック系（モダン）= Noto Sans JP — 基本情報Q108
const gothic = "font-[family-name:var(--font-noto-sans-jp)]";
// 明朝体はアクセントのみ
const serif = "font-[family-name:var(--font-noto-serif-jp)]";

function CountUpStat({ num, unit, label, desc }: { num: number; unit: string; label: string; desc: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const steps = 60;
          const increment = num / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= num) {
              setCount(num);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [num, hasAnimated]);

  return (
    <div ref={ref} className="text-center group">
      <p className={`text-[56px] md:text-[80px] lg:text-[96px] font-bold tracking-[-0.04em] text-[#14B8B8] transition-all duration-700 ${gothic}`}>
        {count}<span className="text-[#5EE6E6] font-light">{unit}</span>
      </p>
      <div className="w-12 h-[2px] bg-gradient-to-r from-[#14B8B8]/0 via-[#14B8B8]/40 to-[#14B8B8]/0 mx-auto mt-4 mb-3 group-hover:w-20 transition-all duration-700" />
      <p className={`text-[14px] md:text-[15px] text-[#1A2828] tracking-[0.04em] font-semibold ${gothic}`}>{label}</p>
      <p className="text-[12px] text-[#5A7070]/50 mt-1 font-light leading-[1.8]">{desc}</p>
    </div>
  );
}

// カラーパレット — 基本情報Q97-98: アクア / 信頼感のある青系 / 先進的・モダン
const colors = {
  bg: "#F6FAFA",        // 微アクアホワイト
  bgDark: "#061818",    // ダークアクア
  bgMid: "#0B3838",     // ミッドダーク
  aqua: "#14B8B8",      // メインアクア
  aquaLight: "#5EE6E6",
  aquaPale: "#E0F4F4",
  gold: "#C4943A",
  goldLight: "#E8C97A",
  text: "#1A2828",
  textMuted: "#5A7070",
  white: "#FFFFFF",
};

export default function Home() {
  const [workflowStep, setWorkflowStep] = useState(0);
  const [formTab, setFormTab] = useState<"inquiry" | "quote">("inquiry");
  const [formSent, setFormSent] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const company = (fd.get("company") as string) || "";
    const name = (fd.get("name") as string) || "";
    const email = (fd.get("email") as string) || "";
    const message = (fd.get("message") as string) || "";
    const isQuote = formTab === "quote";
    const printType = (fd.get("printType") as string) || "";
    const quantity = (fd.get("quantity") as string) || "";
    const deadline = (fd.get("deadline") as string) || "";

    const subject = isQuote
      ? "【お見積もり依頼】和泉出版印刷HPより"
      : "【お問い合わせ】和泉出版印刷HPより";

    const lines = [
      `■ 種別: ${isQuote ? "お見積もり" : "お問い合わせ"}`,
      `■ 会社名: ${company || "（未記入）"}`,
      `■ お名前: ${name}`,
      `■ メールアドレス: ${email}`,
    ];
    if (isQuote) {
      lines.push(
        `■ 印刷物の種類: ${printType || "（未選択）"}`,
        `■ 数量: ${quantity || "（未記入）"}`,
        `■ 希望納期: ${deadline || "（未記入）"}`,
      );
    }
    lines.push("", "■ お問い合わせ内容:", message);

    const body = lines.join("\n");
    const mailto = `mailto:info@izumi-syuppan.co.jp?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setFormSent(true);
    setTimeout(() => setFormSent(false), 6000);
  };

  const handleProgress = useCallback((progress: number) => {
    const step = Math.min(Math.floor(progress * 5), 4);
    setWorkflowStep(step);
  }, []);

  const workflowSteps = [
    { num: "01", title: "お問い合わせ", sub: "CONTACT", desc: "お電話・メール・フォームからお気軽にご相談ください。ご要望を大まかにお伺いします。", img: "/images/workflow-01-contact.png", imgAlt: "お問い合わせ・ご相談の様子" },
    { num: "02", title: "ヒアリング・お見積もり", sub: "HEARING", desc: "ご要望を詳しくお伺いし、仕様・部数・納期に合わせた最適なプランとお見積もりをご提示します。", img: "/images/workflow-02-hearing.png", imgAlt: "ヒアリングとサンプル確認" },
    { num: "03", title: "デザイン・校正", sub: "DESIGN", desc: "デザイン案をご提出し、ご確認・修正を経て仕上げます。納得いくまで丁寧に対応します。", img: "/images/workflow-03-design.png", imgAlt: "デザイン・レイアウト作業" },
    { num: "04", title: "印刷・製本", sub: "PRINTING", desc: "最適な印刷方式で高品質に仕上げ、丁寧に製本。色の再現性と紙の質感にこだわります。", img: "/images/workflow-04-printing.png", imgAlt: "印刷機による印刷工程" },
    { num: "05", title: "納品", sub: "DELIVERY", desc: "検品後、ご指定の方法でお届けいたします。全国対応可能です。", img: "/images/workflow-05-delivery.png", imgAlt: "梱包・納品作業" },
  ];

  return (
    <main className={`bg-[${colors.bg}] text-[${colors.text}] overflow-hidden ${gothic}`}>

      {/* ===== NAV ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#14B8B8] backdrop-blur-md border-b border-white/20 shadow-[0_1px_0_rgba(255,255,255,0.1)]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <a href="#" className={`text-[13px] md:text-[17px] font-bold tracking-[0.06em] text-white ${gothic}`}>
            和泉出版印刷株式会社
          </a>
          <div className="hidden md:flex items-center gap-9">
            {[
              { label: "会社概要", id: "about" },
              { label: "事業内容", id: "services" },
              { label: "ご利用の流れ", id: "workflow" },
              { label: "参考価格", id: "pricing" },
              { label: "アクセス", id: "access" },
            ].map((item) => (
              <a key={item.id} href={`#${item.id}`} className="text-[12px] font-semibold tracking-[0.1em] text-white hover:text-white/70 transition-colors duration-300">
                {item.label}
              </a>
            ))}
            <a href="#contact" className="inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.08em] bg-white text-[#14B8B8] px-5 py-2.5 hover:bg-white/90 hover:scale-[1.03] transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
              お問い合わせ
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>

          {/* モバイル右側: 問い合わせボタン + ハンバーガー */}
          <div className="flex md:hidden items-center gap-2">
            <a href="#contact" className="text-[11px] font-bold tracking-[0.04em] bg-white text-[#14B8B8] px-3.5 py-2 shadow-[0_2px_6px_rgba(0,0,0,0.15)]">
              お問い合わせ
            </a>

          {/* ハンバーガーボタン (mobile only) */}
          <button
            type="button"
            aria-label={mobileMenuOpen ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="relative w-10 h-10 flex items-center justify-center text-white"
          >
            <span
              className={`absolute block h-px w-6 bg-white transition-all duration-300 ${
                mobileMenuOpen ? "rotate-45" : "-translate-y-[6px]"
              }`}
            />
            <span
              className={`absolute block h-px w-6 bg-white transition-opacity duration-300 ${
                mobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute block h-px w-6 bg-white transition-all duration-300 ${
                mobileMenuOpen ? "-rotate-45" : "translate-y-[6px]"
              }`}
            />
          </button>
          </div>
        </div>
      </nav>

      {/* ===== モバイルメニュー オーバーレイ ===== */}
      <div
        className={`fixed inset-0 z-40 md:hidden bg-[#061818] transition-all duration-500 ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="h-full flex flex-col justify-center px-8">
          <ul className="flex flex-col gap-7">
            {[
              { label: "会社概要", id: "about" },
              { label: "事業内容", id: "services" },
              { label: "ご利用の流れ", id: "workflow" },
              { label: "参考価格", id: "pricing" },
              { label: "アクセス", id: "access" },
            ].map((item, i) => (
              <li
                key={item.id}
                className={`transition-all duration-500 ${
                  mobileMenuOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: mobileMenuOpen ? `${i * 60 + 100}ms` : "0ms" }}
              >
                <a
                  href={`#${item.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-[28px] font-bold tracking-[0.02em] text-white ${gothic}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className={`mt-12 inline-flex items-center justify-center gap-3 text-[13px] font-semibold tracking-[0.06em] bg-[#14B8B8] text-white px-8 py-5 transition-all duration-500 ${
              mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: mobileMenuOpen ? "460ms" : "0ms" }}
          >
            お問い合わせ
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <p className="mt-16 text-[10px] tracking-[0.2em] text-white/30 uppercase">Since 1979 — Osaka, Izumi</p>
        </div>
      </div>

      {/* ===== HERO ===== */}
      {/* 基本情報Q84: キャッチコピー「想いを整理整頓しませんか」 */}
      {/* 基本情報Q76: 信頼性向上・ブランディング・問い合わせ増加 */}
      <section className="h-[100svh] relative">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-craftsman.png"
            alt="製本職人の手仕事"
            width={1024}
            height={1024}
            className="w-full h-full object-cover scale-[1.02]"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#061818]/90 via-[#061818]/30 to-[#061818]/50" />

        <div className="absolute inset-0 z-10 flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-12">
          <div className="max-w-[1400px] mx-auto w-full">
            <ScrollReveal duration={1.2} delay={0.3}>
              <p className="text-[11px] tracking-[0.5em] uppercase text-[#5EE6E6] mb-5 md:mb-6 font-medium">
                Since 1979 &mdash; Osaka, Izumi
              </p>
            </ScrollReveal>
            <ScrollReveal duration={1.5} delay={0.5}>
              <h1 className={`text-[42px] md:text-[72px] lg:text-[96px] leading-[1.1] tracking-[-0.02em] text-white font-bold ${gothic}`}>
                想いを、<br />
                整理整頓<br className="md:hidden" />
                しませんか。
              </h1>
            </ScrollReveal>
            <ScrollReveal duration={1} delay={0.9}>
              <p className={`text-[13px] md:text-[15px] text-white/45 mt-6 md:mt-8 max-w-[480px] leading-[2.2] font-light`}>
                自分史・終活整理から企業の冊子制作まで。<br />
                デザインから印刷・製本まで一貫対応。<br />
                あなたの大切な想いを、一冊のカタチに。
              </p>
            </ScrollReveal>
            <ScrollReveal delay={1.1}>
              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <a href="#contact" className={`inline-flex items-center gap-3 text-[13px] font-semibold tracking-[0.06em] bg-[${colors.aqua}] text-white px-8 py-4 hover:bg-[${colors.aquaLight}] transition-all duration-500`}>
                  お問い合わせ
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
                <a href="#services" className="inline-flex items-center gap-3 text-[13px] tracking-[0.06em] border border-white/25 text-white/70 px-8 py-4 hover:border-white/50 hover:text-white transition-all duration-500">
                  サービスを見る
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <ScrollReveal delay={1.5}>
            <div className="w-px h-12 bg-gradient-to-b from-[#5EE6E6]/50 to-transparent" />
          </ScrollReveal>
        </div>
      </section>

      {/* ===== STORY / ABOUT INTRO ===== */}
      <section id="about" className="py-28 md:py-44 bg-[#F6FAFA]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <ScrollReveal>
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#14B8B8] mb-12 md:mb-16 font-semibold">About Us</p>
          </ScrollReveal>

          <div className="grid md:grid-cols-[1.2fr_1fr] gap-12 md:gap-20 items-start">
            <ScrollReveal delay={0.1}>
              <h2 className={`text-[32px] md:text-[48px] lg:text-[64px] leading-[1.2] tracking-[-0.02em] font-bold ${gothic}`}>
                言葉と想いを、<br />
                カタチにする会社。
              </h2>
            </ScrollReveal>
            <div className="flex flex-col gap-6 md:pt-4">
              <ScrollReveal delay={0.2}>
                <p className="text-[14px] md:text-[15px] text-[#5A7070] leading-[2.3] font-light">
                  1979年、大阪・和泉の地で創業した和泉出版印刷株式会社。デザイン・出版・印刷製本・デジタル化・ソフトウェア販売の5つの事業を展開し、お客様の「伝えたい想い」をカタチにしてきました。
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <p className="text-[14px] md:text-[15px] text-[#5A7070] leading-[2.3] font-light">
                  近年は<strong className="text-[#14B8B8] font-semibold">自分史</strong>や<strong className="text-[#14B8B8] font-semibold">終活整理</strong>のための冊子制作に力を入れ、人生の記憶を美しい一冊にまとめるお手伝いをしています。デザインから印刷・製本まで、プロフェッショナルが一貫体制でお届けします。
                </p>
              </ScrollReveal>
            </div>
          </div>

          {/* 数字 */}
          <div className="mt-20 md:mt-28 pt-12 border-t border-[#14B8B8]/10">
            <StaggerContainer stagger={0.2} className="grid grid-cols-2 gap-8 md:gap-24 max-w-[800px] mx-auto">
              {[
                { num: 45, unit: "年+", label: "の実績", desc: "1979年の創業から培った印刷・製本の技術" },
                { num: 90, unit: "%", label: "リピート率", desc: "お客様に選ばれ続ける確かな品質と対応力" },
              ].map((stat) => (
                <CountUpStat key={stat.label} num={stat.num} unit={stat.unit} label={stat.label} desc={stat.desc} />
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ===== パララックス — 本棚 ===== */}
      <section className="h-[70vh] md:h-[90vh] relative">
        <ParallaxLayer speed={0.2} className="h-full">
          <Image
            src="/images/bookshelf.png"
            alt="本棚に並ぶ製本された書籍"
            width={1024}
            height={1024}
            className="w-full h-[90vh] md:h-[110vh] object-cover"
          />
        </ParallaxLayer>
        <div className="absolute inset-0 bg-[#061818]/20" />
        <div className="absolute bottom-8 left-6 md:bottom-12 md:left-12 z-10">
          <ScrollReveal>
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 font-medium">Crafted with care</p>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      {/* 基本情報Q16: デザイン事業/出版事業/印刷機製本事業/デジタル化事業/ソフトウェア販売事業 */}
      {/* 基本情報Q17: 主力 = 冊子制作 */}
      <section id="services" className="py-28 md:py-44 bg-[#F6FAFA]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <ScrollReveal>
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#14B8B8] mb-4 font-semibold">Services</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className={`text-[32px] md:text-[48px] lg:text-[64px] leading-[1.2] tracking-[-0.02em] mb-6 font-bold ${gothic}`}>
              5つの事業領域で、<br />
              想いを支える。
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-[14px] text-[#5A7070] leading-[2] mb-16 md:mb-24 max-w-[560px] font-light">
              デザインから印刷・製本、デジタル化まで。ワンストップでお客様のご要望にお応えします。小ロット1部から対応可能です。
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: "デザイン事業",
                tag: "DESIGN",
                desc: "チラシ・パンフレット・名刺・冊子表紙まで、プロのデザイナーがお客様のイメージをカタチに。DTP・データ作成もお任せください。",
                items: ["チラシ・フライヤー", "パンフレット", "名刺", "ポスター"],
              },
              {
                title: "出版事業",
                tag: "PUBLISHING",
                desc: "書籍・冊子の企画から編集・出版までトータルサポート。自費出版・記念誌・社内報など、あらゆる出版物に対応します。",
                items: ["自分史", "記念誌", "社内報", "自費出版"],
              },
              {
                title: "印刷・製本事業",
                tag: "PRINT & BIND",
                desc: "オフセット・オンデマンド・大判印刷に対応。無線綴じ・中綴じ・上製本など、用途に合わせた製本方法をご提案。",
                items: ["オフセット印刷", "オンデマンド", "大判印刷", "各種製本"],
              },
              {
                title: "デジタル化事業",
                tag: "DIGITAL",
                desc: "紙資料のスキャン・電子書籍化を通じて、大切な情報資産を次世代へ。効率的なデータ管理をサポートします。",
                items: ["スキャン", "電子化", "アーカイブ", "データ管理"],
              },
              {
                title: "ソフトウェア販売",
                tag: "SOFTWARE",
                desc: "印刷・デザイン業務に役立つソフトウェアの販売・導入サポート。お客様の業務効率化をお手伝いします。",
                items: ["業務効率化", "導入支援", "トレーニング"],
              },
              {
                title: "各種印刷物",
                tag: "PRINT WORKS",
                desc: "封筒・はがき・シール・ラベル・ノベルティなど、あらゆる印刷物を高品質にお届けします。箔押し・エンボスも一部対応。",
                items: ["封筒・はがき", "シール・ラベル", "ノベルティ", "箔押し"],
                img: "/images/print-works.png",
              },
            ].map((service, i) => (
              <ScrollReveal key={service.tag} delay={i * 0.06}>
                <div className="bg-white border border-[#14B8B8]/[0.06] p-8 md:p-10 group hover:border-[#14B8B8]/15 hover:shadow-[0_8px_40px_rgba(20,184,184,0.06)] transition-all duration-700 h-full flex flex-col">
                  {"img" in service && service.img ? (
                    <div className="-m-8 md:-m-10 overflow-hidden h-full">
                      <Image
                        src={service.img}
                        alt={service.title}
                        width={800}
                        height={800}
                        className="w-full h-full min-h-[280px] object-cover group-hover:scale-[1.03] transition-transform duration-700"
                      />
                    </div>
                  ) : (
                    <>
                      <p className="text-[10px] tracking-[0.25em] uppercase text-[#14B8B8] mb-6 font-semibold">{service.tag}</p>
                      <h3 className={`text-[20px] md:text-[22px] mb-4 leading-tight font-bold ${gothic}`}>{service.title}</h3>
                      <p className="text-[13px] text-[#5A7070] leading-[2.1] mb-5 font-light">{service.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {service.items.map((item) => (
                          <span key={item} className="text-[10px] bg-[#E0F4F4] text-[#14B8B8] px-3 py-1 font-medium tracking-[0.02em]">
                            {item}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* ===== FEATURED: POCKET ===== */}
      <section className="py-28 md:py-44 bg-[#061818]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <ScrollReveal delay={0.15}>
              <a href="/pocket" className="block group">
                <div className="aspect-[4/5] overflow-hidden relative">
                  <Image
                    src="/images/pocket-featured.png"
                    alt="POCKET — NFC/QRカードとWebアプリ"
                    width={1024}
                    height={1280}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061818]/30 to-transparent" />
                </div>
              </a>
            </ScrollReveal>
            <div>
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-4">
                  <p className="text-[11px] tracking-[0.3em] uppercase text-[#5EE6E6] font-semibold">New Service</p>
                  <span className="text-[10px] bg-[#14B8B8] text-white px-3 py-1 font-semibold tracking-[0.1em] uppercase">New</span>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h2 className={`text-[32px] md:text-[48px] lg:text-[56px] leading-[1.2] tracking-[-0.02em] text-white font-bold mb-2 ${gothic}`}>
                  POCKET
                </h2>
                <p className={`text-[18px] md:text-[22px] text-white/50 mb-6 font-light ${gothic}`}>
                  紙が、アプリにもなる。
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="text-[14px] text-white/45 leading-[2.3] mb-8 max-w-[440px] font-light">
                  印刷物の信頼感はそのまま。NFC/QRカードをかざすだけで専用Webアプリへ。コンテンツの更新は何度でも無料。再印刷の必要はもうありません。
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <div className="flex flex-col gap-4">
                  {[
                    "NFC/QRカード1枚で紙とデジタルを接続",
                    "Webアプリのコンテンツは何度でも更新無料",
                    "閲覧データをリアルタイムで分析・可視化",
                    "再印刷ゼロでコスト削減＆環境にやさしい",
                  ].map((point) => (
                    <div key={point} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-[#5EE6E6] rounded-full flex-shrink-0" />
                      <span className="text-[13px] text-white/60 font-light">{point}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.4}>
                <a href="/pocket" className={`inline-flex items-center gap-3 text-[13px] font-semibold tracking-[0.06em] bg-[#14B8B8] text-white px-8 py-4 mt-10 hover:bg-[#5EE6E6] transition-all duration-500`}>
                  POCKETについて詳しく見る
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED: 自分史・終活整理 ===== */}
      {/* 基本情報Q46: キーワード = 終活整理, 自分史 */}
      <section className="py-28 md:py-44 bg-[#061818]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <ScrollReveal>
                <p className="text-[11px] tracking-[0.3em] uppercase text-[#5EE6E6] mb-4 font-semibold">Featured</p>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h2 className={`text-[32px] md:text-[48px] lg:text-[56px] leading-[1.2] tracking-[-0.02em] text-white font-bold mb-6 ${gothic}`}>
                  自分史・終活整理。<br />
                  あなたの物語を<br />
                  一冊に。
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="text-[14px] text-white/45 leading-[2.3] mb-8 max-w-[440px] font-light">
                  人生の記憶や想いを美しい一冊の本にまとめます。ご家族への贈り物として、自身の歩みの記録として。丁寧なヒアリングから始まり、プロの手で世界にひとつだけの本をお作りします。
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <div className="flex flex-col gap-4">
                  {[
                    "丁寧なヒアリングで想いを引き出します",
                    "プロのデザイナーが構成・レイアウト",
                    "小ロット1冊からでも対応可能",
                    "上質な紙と製本で永く残る品質",
                    "写真・手書き原稿もデジタル化して収録",
                  ].map((point) => (
                    <div key={point} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-[#C4943A] rounded-full flex-shrink-0" />
                      <span className="text-[13px] text-white/60 font-light">{point}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.4}>
                <a href="#contact" className={`inline-flex items-center gap-3 text-[13px] font-semibold tracking-[0.06em] bg-[#C4943A] text-white px-8 py-4 mt-10 hover:bg-[#D4A44A] transition-all duration-500`}>
                  自分史について相談する
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </ScrollReveal>
            </div>
            <ScrollReveal delay={0.15} direction="right">
              <div className="aspect-[4/5] overflow-hidden relative">
                <Image
                  src="/images/book-pages.png"
                  alt="自分史の製本"
                  width={1024}
                  height={1280}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061818]/30 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center -translate-y-4">
                    <p className={`text-[28px] md:text-[36px] tracking-[0.15em] text-[#8B7A5E]/80 font-light ${serif}`}>自分史</p>
                    <div className="w-6 h-px bg-[#8B7A5E]/40 mx-auto mt-3" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== パララックス — デザイナーワークスペース ===== */}
      <section className="h-[70vh] md:h-[90vh] relative">
        <ParallaxLayer speed={0.15} className="h-full">
          <Image
            src="/images/designer-workspace.png"
            alt="デザイナーの作業台"
            width={1024}
            height={1024}
            className="w-full h-[90vh] md:h-[110vh] object-cover"
          />
        </ParallaxLayer>
      </section>

      {/* ===== WORKFLOW ===== */}
      {/* 基本情報Q115: 工程・ワークフロー紹介を掲載する */}
      <section id="workflow" className="py-28 md:py-44 bg-[#F6FAFA]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-16">
          <ScrollReveal>
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#14B8B8] mb-4 font-semibold">Workflow</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className={`text-[32px] md:text-[48px] lg:text-[64px] leading-[1.2] tracking-[-0.02em] font-bold ${gothic}`}>
              ご利用の流れ。
            </h2>
          </ScrollReveal>
        </div>

        <StickySection scrollLength={4} onProgress={handleProgress} className="min-h-screen flex items-center bg-[#F6FAFA]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full">
            <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
              <div className="relative aspect-[4/3] md:aspect-square overflow-hidden bg-[#0B3838]">
                {workflowSteps.map((step, i) => (
                  <Image
                    key={step.num}
                    src={step.img}
                    alt={step.imgAlt}
                    width={1024}
                    height={1024}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                      workflowStep === i ? "opacity-80" : "opacity-0"
                    }`}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-[#061818]/60 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-[96px] md:text-[160px] font-bold text-white/10 leading-none transition-all duration-500 ${gothic}`}>
                    {workflowSteps[workflowStep].num}
                  </span>
                </div>
                <div className="absolute bottom-6 left-6">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-[#5EE6E6] font-semibold">
                    {workflowSteps[workflowStep].sub}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-5 md:gap-6">
                {workflowSteps.map((step, i) => (
                  <div
                    key={step.num}
                    className={`border-l-[2px] pl-6 md:pl-8 py-3 transition-all duration-700 cursor-pointer ${
                      workflowStep === i
                        ? "border-[#14B8B8] opacity-100"
                        : "border-[#14B8B8]/10 opacity-25"
                    }`}
                  >
                    <div className="flex items-baseline gap-3 mb-1">
                      <span className="text-[10px] tracking-[0.15em] text-[#14B8B8] font-bold">{step.num}</span>
                      <span className="text-[10px] tracking-[0.2em] uppercase text-[#5A7070]/50">{step.sub}</span>
                    </div>
                    <h3 className={`text-[20px] md:text-[24px] mb-2 font-bold ${gothic}`}>{step.title}</h3>
                    <p className="text-[13px] text-[#5A7070] leading-[2.1] font-light">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </StickySection>
      </section>

      {/* ===== 引用セクション ===== */}
      <section className="min-h-[70vh] md:min-h-[80vh] flex items-center relative bg-[#F6FAFA]">
        <div className="absolute inset-0 opacity-[0.04]">
          <Image
            src="/images/paper-texture.png"
            alt=""
            width={1024}
            height={1024}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-[900px] mx-auto px-6 md:px-12 text-center py-28">
          <ScrollReveal duration={1.2}>
            <p className={`text-[20px] md:text-[30px] lg:text-[38px] leading-[2] tracking-[-0.01em] text-[#1A2828]/40 font-light ${serif}`}>
              「紙」には、<br className="md:hidden" />デジタルにはない<br />
              温もりがあります。<br />
              手に取り、ページをめくる。<br />
              その体験そのものが、<br />
              メッセージになる。
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== パララックス — 冊子ライフスタイル ===== */}
      <section className="h-[70vh] md:h-[90vh] relative">
        <ParallaxLayer speed={0.15} className="h-full">
          <Image
            src="/images/booklet-lifestyle.png"
            alt="上質な冊子のある暮らし"
            width={1024}
            height={1024}
            className="w-full h-[90vh] md:h-[110vh] object-cover"
          />
        </ParallaxLayer>
      </section>

      {/* ===== PRICING ===== */}
      {/* 基本情報Q52: 参考価格のみ */}
      <section id="pricing" className="py-28 md:py-44 bg-[#F6FAFA]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <ScrollReveal>
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#14B8B8] mb-4 font-semibold">Pricing</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className={`text-[32px] md:text-[48px] lg:text-[64px] leading-[1.2] tracking-[-0.02em] mb-6 font-bold ${gothic}`}>
              参考価格
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-[14px] text-[#5A7070] leading-[2] mb-16 md:mb-24 max-w-[560px] font-light">
              仕様・数量によって変動します。詳しくはお見積もりフォームよりお問い合わせください。
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "名刺印刷", price: "100枚 ¥2,000〜", desc: "片面・両面、特殊紙対応可。デザインからの制作もお任せください。" },
              { title: "チラシ・フライヤー", price: "A4 100枚 ¥5,000〜", desc: "カラー・モノクロ対応。用紙の種類や加工もご相談ください。" },
              { title: "冊子・自分史", price: "要お見積もり", desc: "ページ数・仕様に応じてお見積もり。1冊からの小ロットも対応可能です。" },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.08}>
                <div className="bg-white border border-[#14B8B8]/[0.06] p-10 text-center hover:border-[#14B8B8]/15 hover:shadow-[0_8px_40px_rgba(20,184,184,0.06)] transition-all duration-700">
                  <h3 className={`text-[18px] font-bold mb-3 ${gothic}`}>{item.title}</h3>
                  <p className="text-[20px] md:text-[24px] font-bold text-[#14B8B8] mb-4">{item.price}</p>
                  <p className="text-[13px] text-[#5A7070] leading-[2] font-light">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <p className="text-[12px] text-[#5A7070]/60 mt-8 text-center font-light">
              ※ 上記は参考価格です。サンプル・見本の提供も可能です。お気軽にお問い合わせください。
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== COMPANY ===== */}
      {/* 基本情報Q1-Q14の全項目 */}
      <section className="py-28 md:py-44 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <ScrollReveal>
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#14B8B8] mb-4 font-semibold">Company</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className={`text-[32px] md:text-[48px] leading-[1.2] tracking-[-0.02em] mb-16 font-bold ${gothic}`}>
              会社概要
            </h2>
          </ScrollReveal>

          <div className="max-w-[800px]">
            <StaggerContainer stagger={0.04}>
              {[
                { label: "会社名", value: "和泉出版印刷株式会社（イズミシュッパンインサツカブシキガイシャ）" },
                { label: "代表者", value: "鳴瀬 和正" },
                { label: "設立", value: "1979年" },
                { label: "資本金", value: "10,000千円" },
                { label: "従業員数", value: "7名" },
                { label: "所在地", value: "〒594-0083 大阪府和泉市池上町4丁目2-21" },
                { label: "電話番号", value: "0725-45-2360" },
                { label: "FAX", value: "0725-45-7684" },
                { label: "メール", value: "info@izumi-syuppan.co.jp" },
                { label: "営業時間", value: "9:00〜17:00" },
                { label: "定休日", value: "土日祝" },
                { label: "事業内容", value: "デザイン事業 / 出版事業 / 印刷製本事業 / デジタル化事業 / ソフトウェア販売事業" },
                { label: "主力サービス", value: "冊子制作（自分史・終活整理・記念誌・カタログ等）" },
                { label: "Webサイト", value: "https://izumi-syuppan.co.jp" },
              ].map((row) => (
                <div key={row.label} className="flex flex-col md:flex-row md:items-baseline py-5 border-b border-[#14B8B8]/6">
                  <span className="text-[11px] tracking-[0.12em] text-[#14B8B8] md:w-[160px] mb-1 md:mb-0 font-semibold flex-shrink-0">{row.label}</span>
                  <span className="text-[14px] text-[#5A7070] font-light">{row.value}</span>
                </div>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ===== ACCESS ===== */}
      {/* 基本情報Q174: Googleマップ埋め込み必要 */}
      <section id="access" className="py-28 md:py-44 bg-[#F6FAFA]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <ScrollReveal>
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#14B8B8] mb-4 font-semibold">Access</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className={`text-[32px] md:text-[48px] leading-[1.2] tracking-[-0.02em] mb-16 font-bold ${gothic}`}>
              アクセス
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-[1.3fr_1fr] gap-8 md:gap-16">
            <ScrollReveal delay={0.15}>
              <div className="aspect-[4/3] overflow-hidden bg-[#E0F4F4]">
                <iframe
                  src="https://www.google.com/maps?q=%E5%A4%A7%E9%98%AA%E5%BA%9C%E5%92%8C%E6%B3%89%E5%B8%82%E6%B1%A0%E4%B8%8A%E7%94%BA4%E4%B8%81%E7%9B%AE2-21&output=embed&hl=ja&z=17"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="和泉出版印刷 所在地"
                />
              </div>
            </ScrollReveal>
            <div className="flex flex-col gap-6">
              <ScrollReveal delay={0.2}>
                <div className="bg-white border border-[#14B8B8]/[0.06] p-8">
                  <p className="text-[11px] tracking-[0.15em] text-[#14B8B8] mb-3 font-semibold">所在地</p>
                  <p className="text-[14px] text-[#5A7070] leading-[2] font-light">
                    〒594-0083<br />
                    大阪府和泉市池上町4丁目2-21
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.25}>
                <div className="bg-white border border-[#14B8B8]/[0.06] p-8">
                  <p className="text-[11px] tracking-[0.15em] text-[#14B8B8] mb-3 font-semibold">お電話でのお問い合わせ</p>
                  <p className="text-[14px] text-[#5A7070] leading-[2] font-light">
                    TEL: <a href="tel:0725452360" className="text-[#14B8B8] font-semibold hover:underline">0725-45-2360</a><br />
                    FAX: 0725-45-7684
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <div className="bg-white border border-[#14B8B8]/[0.06] p-8">
                  <p className="text-[11px] tracking-[0.15em] text-[#14B8B8] mb-3 font-semibold">営業時間</p>
                  <p className="text-[14px] text-[#5A7070] leading-[2] font-light">
                    9:00〜17:00（土日祝休）
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.35}>
                <div className="bg-white border border-[#14B8B8]/[0.06] p-8">
                  <p className="text-[11px] tracking-[0.15em] text-[#14B8B8] mb-3 font-semibold">データ入稿</p>
                  <p className="text-[14px] text-[#5A7070] leading-[2] font-light">
                    印刷データの入稿はメールまたはオンラインで承っております。お気軽にお問い合わせください。
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      {/* 基本情報Q167: フォーム項目 = 会社名, お名前, メールアドレス, お問い合わせ内容, 数量, 希望納期 */}
      {/* 基本情報Q78: メールで問い合わせ */}
      <section id="contact" className="py-28 md:py-44 bg-[#061818]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-[1fr_1.3fr] gap-12 md:gap-20">
            <div>
              <ScrollReveal>
                <p className="text-[11px] tracking-[0.3em] uppercase text-[#5EE6E6] mb-4 font-semibold">Contact</p>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h2 className={`text-[32px] md:text-[48px] leading-[1.2] tracking-[-0.02em] text-white mb-6 font-bold ${gothic}`}>
                  お問い合わせ・<br />お見積もり
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="text-[14px] text-white/40 leading-[2.2] mb-10 font-light">
                  印刷物のご相談やお見積もりなど、<br />
                  お気軽にお問い合わせください。<br />
                  お見積り・ご相談は無料です。
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div className="flex flex-col gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#14B8B8]/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5EE6E6" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.1em] text-white/30 mb-1 font-semibold uppercase">電話番号</p>
                      <a href="tel:0725452360" className="text-[15px] text-[#5EE6E6] font-medium">0725-45-2360</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#14B8B8]/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5EE6E6" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.1em] text-white/30 mb-1 font-semibold uppercase">メール</p>
                      <a href="mailto:info@izumi-syuppan.co.jp" className="text-[15px] text-[#5EE6E6] font-medium">info@izumi-syuppan.co.jp</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#14B8B8]/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5EE6E6" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[0.1em] text-white/30 mb-1 font-semibold uppercase">営業時間</p>
                      <p className="text-[15px] text-white/60 font-light">9:00〜17:00（土日祝休）</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Form */}
            <ScrollReveal delay={0.2}>
              <div className="bg-white/[0.04] border border-white/[0.08] p-8 md:p-10 backdrop-blur-sm">
                {/* Tabs */}
                <div className="flex gap-1 mb-8 bg-white/[0.05] p-1">
                  {[
                    { id: "inquiry" as const, label: "お問い合わせ" },
                    { id: "quote" as const, label: "お見積もり" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setFormTab(tab.id)}
                      className={`flex-1 py-3 text-[12px] font-semibold tracking-[0.04em] transition-all duration-300 ${
                        formTab === tab.id
                          ? "bg-[#14B8B8] text-white"
                          : "text-white/40 hover:text-white/60"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleContactSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-[11px] text-white/50 mb-2 block font-medium">会社名</label>
                      <input name="company" type="text" placeholder="株式会社○○" className="w-full bg-white/[0.06] border border-white/[0.1] px-4 py-3 text-[14px] text-white placeholder:text-white/20 outline-none focus:border-[#14B8B8] transition-colors font-light" />
                    </div>
                    <div>
                      <label className="text-[11px] text-white/50 mb-2 block font-medium">お名前 <span className="text-[#C4943A]">*</span></label>
                      <input name="name" type="text" placeholder="山田 太郎" required className="w-full bg-white/[0.06] border border-white/[0.1] px-4 py-3 text-[14px] text-white placeholder:text-white/20 outline-none focus:border-[#14B8B8] transition-colors font-light" />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="text-[11px] text-white/50 mb-2 block font-medium">メールアドレス <span className="text-[#C4943A]">*</span></label>
                    <input name="email" type="email" placeholder="info@example.com" required className="w-full bg-white/[0.06] border border-white/[0.1] px-4 py-3 text-[14px] text-white placeholder:text-white/20 outline-none focus:border-[#14B8B8] transition-colors font-light" />
                  </div>

                  {formTab === "quote" && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="text-[11px] text-white/50 mb-2 block font-medium">印刷物の種類</label>
                          <select name="printType" className="w-full bg-white/[0.06] border border-white/[0.1] px-4 py-3 text-[14px] text-white/60 outline-none focus:border-[#14B8B8] transition-colors appearance-none font-light">
                            <option value="">選択してください</option>
                            <option value="名刺">名刺</option>
                            <option value="チラシ">チラシ・フライヤー</option>
                            <option value="パンフレット">パンフレット</option>
                            <option value="冊子">冊子・書籍</option>
                            <option value="自分史">自分史</option>
                            <option value="封筒">封筒・はがき</option>
                            <option value="シール">シール・ラベル</option>
                            <option value="ポスター">ポスター・大判</option>
                            <option value="その他">その他</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[11px] text-white/50 mb-2 block font-medium">数量</label>
                          <input name="quantity" type="text" placeholder="例：100部" className="w-full bg-white/[0.06] border border-white/[0.1] px-4 py-3 text-[14px] text-white placeholder:text-white/20 outline-none focus:border-[#14B8B8] transition-colors font-light" />
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="text-[11px] text-white/50 mb-2 block font-medium">希望納期</label>
                        <input name="deadline" type="text" placeholder="例：2週間後、○月○日まで" className="w-full bg-white/[0.06] border border-white/[0.1] px-4 py-3 text-[14px] text-white placeholder:text-white/20 outline-none focus:border-[#14B8B8] transition-colors font-light" />
                      </div>
                    </>
                  )}

                  <div className="mb-6">
                    <label className="text-[11px] text-white/50 mb-2 block font-medium">お問い合わせ内容 <span className="text-[#C4943A]">*</span></label>
                    <textarea name="message" placeholder="ご相談内容やご質問をご記入ください" required rows={5} className="w-full bg-white/[0.06] border border-white/[0.1] px-4 py-3 text-[14px] text-white placeholder:text-white/20 outline-none focus:border-[#14B8B8] transition-colors resize-y font-light" />
                  </div>

                  <button type="submit" className="w-full bg-[#14B8B8] text-white py-4 text-[14px] font-semibold tracking-[0.06em] hover:bg-[#5EE6E6] transition-all duration-500 flex items-center justify-center gap-3">
                    送信する
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                  </button>
                  {formSent && (
                    <p className="mt-4 text-center text-[12px] text-[#5EE6E6] font-medium">
                      ✓ メールアプリを起動しました。そのまま送信してください。
                    </p>
                  )}
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-14 px-6 md:px-12 bg-[#041010]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-[1.5fr_1fr_1fr] gap-10 mb-12">
            <div>
              <p className={`text-[17px] font-bold text-white mb-1 ${gothic}`}>和泉出版印刷</p>
              <p className="text-[10px] tracking-[0.12em] text-white/20 uppercase mb-6">Izumi Publishing & Printing Co., Ltd.</p>
              <p className="text-[12px] text-white/25 leading-[2] font-light">
                想いを整理整頓しませんか。<br />
                1979年の創業以来、大阪・和泉の地から<br />
                印刷を通じて想いをカタチにしています。
              </p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.15em] text-white/20 uppercase mb-5 font-semibold">ページ</p>
              <div className="flex flex-col gap-3">
                {[
                  { label: "トップ", id: "#" },
                  { label: "会社概要", id: "#about" },
                  { label: "事業内容", id: "#services" },
                  { label: "ご利用の流れ", id: "#workflow" },
                  { label: "参考価格", id: "#pricing" },
                  { label: "アクセス", id: "#access" },
                ].map((link) => (
                  <a key={link.label} href={link.id} className="text-[12px] text-white/30 hover:text-white/60 transition-colors font-light">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.15em] text-white/20 uppercase mb-5 font-semibold">お問い合わせ</p>
              <div className="flex flex-col gap-3">
                <a href="#contact" className="text-[12px] text-white/30 hover:text-white/60 transition-colors font-light">お問い合わせフォーム</a>
                <a href="#contact" className="text-[12px] text-white/30 hover:text-white/60 transition-colors font-light">お見積もり依頼</a>
                <a href="tel:0725452360" className="text-[12px] text-white/30 hover:text-white/60 transition-colors font-light">TEL: 0725-45-2360</a>
                <a href="mailto:info@izumi-syuppan.co.jp" className="text-[12px] text-white/30 hover:text-white/60 transition-colors font-light">info@izumi-syuppan.co.jp</a>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.04]">
            <p className="text-[10px] text-white/15">&copy; 2024 和泉出版印刷株式会社 All Rights Reserved.</p>
            <a href="#" className="text-[10px] text-white/15 hover:text-white/30 transition-colors">プライバシーポリシー</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
