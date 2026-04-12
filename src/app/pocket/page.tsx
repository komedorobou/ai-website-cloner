"use client";

import { ScrollReveal } from "@/components/animation/scroll-reveal";
import { ParallaxLayer } from "@/components/animation/parallax-layer";
import { StaggerContainer } from "@/components/animation/stagger-container";
import Image from "next/image";

const gothic = "font-[family-name:var(--font-noto-sans-jp)]";

export default function PocketPage() {
  return (
    <main className={`bg-white text-[#1d1d1f] overflow-hidden ${gothic}`}>

      {/* ===== NAV ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-black/[0.04]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 h-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="text-[12px] font-medium text-[#1d1d1f]/50 hover:text-[#1d1d1f] transition-colors">和泉出版印刷</a>
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none" className="text-[#1d1d1f]/20"><path d="M1 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5"/></svg>
            <span className="text-[12px] font-semibold text-[#1d1d1f]">POCKET</span>
          </div>
          <a href="/#contact" className="text-[11px] font-medium bg-[#0071e3] text-white px-4 py-1.5 rounded-full hover:bg-[#0077ED] transition-colors">
            お問い合わせ
          </a>
        </div>
      </nav>

      {/* ===== HERO — 画像ばーん！インパクト全振り ===== */}
      <section className="relative min-h-[100svh] flex items-end pt-12 overflow-hidden">
        <Image
          src="/images/pocket-hero-nfc.png"
          alt="NFCカードをスマホにタッチ"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-10 pb-16 md:pb-24">
          <ScrollReveal duration={1} delay={0.2}>
            <p className="text-white/60 text-[14px] md:text-[16px] font-semibold mb-3 tracking-[0.1em] uppercase">New Service</p>
          </ScrollReveal>
          <ScrollReveal duration={1.2} delay={0.4}>
            <h1 className={`text-[56px] md:text-[88px] lg:text-[112px] font-bold leading-[1.0] tracking-[-0.04em] text-white ${gothic}`}>
              POCKET
            </h1>
          </ScrollReveal>
          <ScrollReveal duration={1} delay={0.6}>
            <p className={`text-[22px] md:text-[32px] font-medium text-white/70 mt-2 tracking-[-0.01em] ${gothic}`}>
              紙が、アプリにもなる。
            </p>
          </ScrollReveal>
          <ScrollReveal duration={1} delay={0.8}>
            <p className="text-[14px] md:text-[16px] text-white/40 mt-4 max-w-[480px] leading-[1.8] font-light">
              印刷物の信頼感はそのまま。NFC/QRカードをかざすだけで<br className="hidden md:inline" />
              専用Webアプリへ。更新は何度でも無料。再印刷ゼロ。
            </p>
          </ScrollReveal>
          <ScrollReveal delay={1}>
            <div className="flex gap-4 mt-8">
              <a href="/#contact" className="text-[15px] font-medium bg-white text-[#1d1d1f] px-7 py-3.5 rounded-full hover:bg-white/90 transition-all">
                無料相談する
              </a>
              <a href="#how-it-works" className="text-[15px] font-medium text-white px-7 py-3.5 rounded-full border border-white/30 hover:bg-white/10 transition-all">
                詳しく見る
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== PROBLEMS ===== */}
      <section className="py-24 md:py-36 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <ScrollReveal>
              <p className="text-[#0A7E7E] text-[15px] font-semibold mb-3">紙だけでは、もったいない。</p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className={`text-[36px] md:text-[52px] font-bold tracking-[-0.03em] ${gothic}`}>
                こんな課題、ありませんか？
              </h2>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {[
              { img: "/images/pocket-problem-reprint.png", title: "更新のたびに再印刷", desc: "内容が変わるたびに数万円。POCKETなら更新は何度でも無料。", before: "年間数十万円の再印刷コスト", after: "更新0円。何度でも。" },
              { img: "/images/pocket-analytics.png", title: "効果測定ができない", desc: "紙を配って終わり。誰が見たのか分からない。", before: "読まれたか不明", after: "リアルタイムで分析" },
              { img: "/images/pocket-usecase-restaurant.png", title: "顧客接点が一方通行", desc: "紙には予約や問い合わせへの導線がない。", before: "配って終わり", after: "予約・問い合わせ直結" },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <div className="bg-[#fbfbfd] rounded-3xl overflow-hidden group h-full flex flex-col">
                  <div className="aspect-[4/3] overflow-hidden flex-shrink-0">
                    <Image src={item.img} alt={item.title} width={600} height={450} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
                  </div>
                  <div className="p-7 md:p-8 flex-1 flex flex-col">
                    <h3 className={`text-[20px] font-bold mb-2 ${gothic}`}>{item.title}</h3>
                    <p className="text-[14px] text-[#1d1d1f]/50 leading-[1.8] mb-5 font-light">{item.desc}</p>
                    <div className="space-y-2 mt-auto">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] bg-[#ff3b30]/10 text-[#ff3b30] px-2.5 py-1 rounded-full font-semibold">Before</span>
                        <span className="text-[12px] text-[#1d1d1f]/30 line-through">{item.before}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] bg-[#0A7E7E]/10 text-[#0A7E7E] px-2.5 py-1 rounded-full font-semibold">After</span>
                        <span className="text-[13px] text-[#0A7E7E] font-semibold">{item.after}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="py-24 md:py-36 px-6 bg-[#fbfbfd]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <ScrollReveal>
              <p className="text-[#0A7E7E] text-[15px] font-semibold mb-3">仕組み</p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className={`text-[36px] md:text-[52px] font-bold tracking-[-0.03em] ${gothic}`}>
                3つのセットで、紙がアプリに。
              </h2>
            </ScrollReveal>
          </div>

          {/* 3 Features - iPhone style left-right alternating */}
          {[
            {
              img: "/images/pocket-webapp.png",
              label: "01",
              title: "専用Webアプリ",
              subtitle: "テンプレートじゃない。完全オーダーメイド。",
              desc: "業種・用途に合わせた専用Webアプリを制作。リアルタイム更新、多言語対応、予約連携。スマホに最適化されたデザインで、いつでも最新情報を届けます。",
              features: ["オーダーメイド設計", "リアルタイム更新", "多言語ワンタップ切替", "アクセス分析付き"],
            },
            {
              img: "/images/pocket-nfcqr-card.png",
              label: "02",
              title: "NFC/QRカード",
              subtitle: "かざすだけ。スキャンするだけ。",
              desc: "NFC対応スマホならワンタッチ、非対応でもQRコードで100%アクセス可能。耐久性のある素材で、ブランドデザインも自由。カードは何度でも使えて再印刷不要。",
              features: ["NFC即アクセス", "QR 100%互換", "耐久カード素材", "ブランドデザイン"],
            },
            {
              img: "/images/pocket-analytics.png",
              label: "03",
              title: "分析ダッシュボード",
              subtitle: "紙では見えなかったものが、見える。",
              desc: "誰がいつどのページを見たか。リアルタイムでエンゲージメントを可視化。効果測定と改善のサイクルを回せます。",
              features: ["リアルタイム計測", "ユーザー行動分析", "レポート自動生成", "データエクスポート"],
            },
          ].map((item, i) => (
            <div key={item.label} className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center mb-24 md:mb-36 last:mb-0 ${i % 2 === 1 ? "md:direction-rtl" : ""}`}>
              <ScrollReveal delay={0.1} direction={i % 2 === 0 ? "left" : "right"}>
                <div className={i % 2 === 1 ? "md:order-2" : ""}>
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={600}
                    height={600}
                    className="w-full rounded-3xl shadow-[0_16px_64px_rgba(0,0,0,0.06)]"
                  />
                </div>
              </ScrollReveal>
              <div className={i % 2 === 1 ? "md:order-1" : ""}>
                <ScrollReveal delay={0.2}>
                  <span className="text-[12px] font-bold text-[#0A7E7E] tracking-[0.1em]">{item.label}</span>
                  <h3 className={`text-[28px] md:text-[36px] font-bold mt-2 mb-2 tracking-[-0.02em] ${gothic}`}>{item.title}</h3>
                  <p className="text-[17px] text-[#1d1d1f]/50 font-medium mb-4">{item.subtitle}</p>
                  <p className="text-[14px] text-[#1d1d1f]/40 leading-[2] mb-6 font-light">{item.desc}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {item.features.map((f) => (
                      <div key={f} className="flex items-center gap-2.5">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A7E7E" strokeWidth="2.5" className="flex-shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
                        <span className="text-[13px] text-[#1d1d1f]/60 font-medium">{f}</span>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== STRENGTHS — 明るいグレー背景 ===== */}
      <section className="py-24 md:py-36 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto text-center">
          <ScrollReveal>
            <p className="text-[#0A7E7E] text-[15px] font-semibold mb-3">なぜPOCKETなのか</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className={`text-[36px] md:text-[52px] font-bold tracking-[-0.03em] mb-16 md:mb-24 ${gothic}`}>
              紙 × デジタルの、いいとこ取り。
            </h2>
          </ScrollReveal>

          <StaggerContainer stagger={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: "01", title: "紙の信頼感は\nそのまま", desc: "手触り、実物の安心感。デジタル疲れの時代だからこそ紙が光る。NFCカードは紙を拡張するもの。" },
              { num: "02", title: "NFC＋QRの\n二刀流", desc: "NFC対応スマホならワンタッチ。非対応でもQRで100%アクセス。端末を選びません。" },
              { num: "03", title: "カードそのまま\n中身だけ更新", desc: "物理カードの再印刷ゼロ。Webの内容だけいつでも無料更新。コストが積み上がりません。" },
            ].map((item) => (
              <div key={item.num} className="bg-[#fbfbfd] rounded-3xl p-8 md:p-10 text-left h-full">
                <span className={`text-[48px] font-bold text-[#0A7E7E]/10 leading-none ${gothic}`}>{item.num}</span>
                <h3 className={`text-[20px] font-bold mt-3 mb-3 whitespace-pre-line leading-[1.5] ${gothic}`}>{item.title}</h3>
                <p className="text-[14px] text-[#1d1d1f]/40 leading-[2] font-light">{item.desc}</p>
              </div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== USE CASES — 写真どーんレイアウト ===== */}
      <section className="py-24 md:py-36 px-6 bg-[#fbfbfd]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <ScrollReveal>
              <p className="text-[#0A7E7E] text-[15px] font-semibold mb-3">活用事例</p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className={`text-[36px] md:text-[52px] font-bold tracking-[-0.03em] ${gothic}`}>
                あらゆる業種で活躍。
              </h2>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {[
              { img: "/images/pocket-usecase-gov.png", title: "自治体・行政", desc: "広報誌・防災マップ・ゴミ分別ガイドをNFCカードで住民に。" },
              { img: "/images/pocket-usecase-edu.png", title: "教育", desc: "オープンキャンパス・キャンパスマップ・シラバスをワンタップ。" },
              { img: "/images/pocket-usecase-medical.png", title: "医療", desc: "患者ガイド・服薬情報・問診票をいつでも手元に。" },
              { img: "/images/pocket-usecase-realestate.png", title: "不動産", desc: "1枚のカードで全物件ポートフォリオ。間取り・VRツアーまで。" },
              { img: "/images/pocket-usecase-tourism.png", title: "観光", desc: "多言語ガイド・マップ・デジタルスタンプラリーを観光スポットに。" },
              { img: "/images/pocket-usecase-restaurant.png", title: "飲食", desc: "テーブルでデジタルメニュー。多言語対応・注文効率化。" },
              { img: "/images/pocket-usecase-beauty.png", title: "美容", desc: "スタイルカタログ・メニュー・予約リンクをNFCカードから。" },
              { img: "/images/pocket-webapp.png", title: "製造業", desc: "設備マニュアル・安全手順・点検記録をNFCタグでその場で。" },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.05}>
                <div className="relative rounded-3xl overflow-hidden group cursor-pointer aspect-[4/5] md:aspect-[4/3]">
                  <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-[1.05] transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 group-hover:via-black/40 transition-all duration-500" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                    <h3 className={`text-[28px] md:text-[36px] lg:text-[42px] font-bold text-white leading-[1.1] tracking-[-0.02em] mb-3 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] [text-shadow:_0_1px_0_rgb(0_0_0_/_40%),_0_4px_20px_rgb(0_0_0_/_30%)] ${gothic}`}>{item.title}</h3>
                    <p className="text-[14px] md:text-[16px] text-white/80 leading-[1.7] font-light max-w-[90%] drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)] [text-shadow:_0_1px_4px_rgb(0_0_0_/_50%)] opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 md:py-36 px-6 bg-[#fbfbfd]">
        <div className="max-w-[680px] mx-auto text-center">
          <ScrollReveal>
            <h2 className={`text-[36px] md:text-[52px] font-bold tracking-[-0.03em] mb-4 ${gothic}`}>
              まずは、ご相談ください。
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-[15px] text-[#1d1d1f]/40 leading-[1.9] mb-8 font-light">
              POCKETの導入についてのご質問・お見積もり、<br />
              お気軽にどうぞ。無料でご相談いただけます。
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/#contact" className={`text-[15px] font-medium bg-[#0A7E7E] text-white px-8 py-3.5 rounded-full hover:bg-[#0E9E9E] transition-all ${gothic}`}>
                お問い合わせフォーム
              </a>
              <a href="tel:0725452360" className={`text-[15px] font-medium text-[#0A7E7E] px-8 py-3.5 rounded-full border border-[#0A7E7E]/20 hover:bg-[#0A7E7E]/5 transition-all ${gothic}`}>
                0725-45-2360
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-8 px-6 border-t border-black/[0.04] bg-[#fbfbfd]">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a href="/" className="text-[12px] text-[#1d1d1f]/30 hover:text-[#1d1d1f]/50 transition-colors">和泉出版印刷</a>
            <span className="text-[#1d1d1f]/10">/</span>
            <span className="text-[12px] text-[#1d1d1f]/50 font-medium">POCKET</span>
          </div>
          <p className="text-[11px] text-[#1d1d1f]/20">&copy; 2024 和泉出版印刷株式会社</p>
        </div>
      </footer>
    </main>
  );
}
