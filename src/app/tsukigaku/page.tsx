"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/animation/scroll-reveal";
import { ParallaxLayer } from "@/components/animation/parallax-layer";
import { StaggerContainer } from "@/components/animation/stagger-container";
import { StickySection } from "@/components/animation/sticky-section";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";

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

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

  return (
    <section ref={ref} className="min-h-[100vh] flex flex-col items-center justify-center bg-white relative overflow-hidden pt-[52px]">
      {/* Ramen DOOOON */}
      <motion.div
        className="relative w-[min(80vw,500px)] aspect-square mb-8"
        style={{ y, scale }}
        initial={{ opacity: 0, scale: 0.8, y: 60 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
      >
        <motion.div
          style={{ rotate }}
          className="w-full h-full"
        >
          <Image
            src="/images/tsukigaku/ramen2.png"
            alt="ラーメン"
            width={800}
            height={800}
            className="w-full h-full object-contain drop-shadow-2xl"
            priority
          />
        </motion.div>
        {/* Glow */}
        <div className="absolute inset-0 -z-10 blur-[80px] bg-gradient-to-br from-orange-300/30 via-amber-200/20 to-transparent rounded-full scale-110" />
      </motion.div>

      {/* Text */}
      <motion.p
        className="text-[#0071e3] text-sm font-medium tracking-wide mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        Apple級のWebサイトを、すべての事業者に
      </motion.p>

      <motion.h1
        className="text-[clamp(2.2rem,7vw,4.5rem)] font-extrabold tracking-[-0.04em] leading-[1.05] text-center px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        あなたのビジネスを
        <br />
        <span className="bg-gradient-to-r from-[#0071e3] to-[#30d158] bg-clip-text text-transparent">
          月9,800円
        </span>
        で変える
      </motion.h1>

      <motion.p
        className="text-[#6e6e73] text-[clamp(0.95rem,1.8vw,1.15rem)] max-w-[480px] text-center leading-relaxed mt-5 px-6 font-light"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.8 }}
      >
        初期費用0円。完全オーダーメイド。
        <br />
        感動のホームページを。
      </motion.p>

      <motion.div
        className="flex items-baseline gap-1 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8 }}
      >
        <span className="text-lg font-semibold">月額</span>
        <span className="text-[clamp(3rem,8vw,5rem)] font-black tracking-tight">9,800</span>
        <span className="text-[#6e6e73]">円（税込）</span>
      </motion.div>

      <motion.a
        href="#pricing"
        className="mt-6 px-8 py-3.5 bg-[#0071e3] text-white text-[15px] font-semibold rounded-full hover:bg-[#0077ED] transition-all hover:scale-105"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        まずは相談する
      </motion.a>

      <motion.div
        className="absolute bottom-8 text-[10px] text-[#a1a1a6] tracking-[0.2em] uppercase flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        scroll
        <motion.div
          className="w-px h-8 bg-[#a1a1a6]"
          animate={{ scaleY: [1, 0.4, 1], opacity: [1, 0.3, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      </motion.div>
    </section>
  );
}

function Problem() {
  return (
    <section className="py-[clamp(80px,15vw,160px)] px-6 max-w-[800px] mx-auto text-center">
      <ScrollReveal>
        <p className="text-[#0071e3] text-xs font-semibold tracking-[0.15em] uppercase mb-4">The Problem</p>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <h2 className="text-[clamp(1.8rem,4.5vw,3.2rem)] font-extrabold tracking-tight leading-tight">
          ホームページ、
          <br />
          ちゃんと「売れて」ますか？
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={0.2}>
        <p className="text-[#6e6e73] text-[clamp(0.95rem,1.5vw,1.1rem)] leading-relaxed mt-6 font-light max-w-[520px] mx-auto">
          きれいなだけのサイトは意味がない。お客さんが「行きたい」「買いたい」と思わなければ、それはただの名刺です。
        </p>
      </ScrollReveal>
    </section>
  );
}

function Showcase() {
  const cards = [
    { img: "/images/tsukigaku/ramen2.png", label: "飲食店", title: "湯気まで伝わるサイト", desc: "ラーメンがくるくる回る。スクロールで麺が持ち上がる。食欲をそそるサイトを。" },
    { img: "/images/tsukigaku/salon2.png", label: "美容室", title: "モデルが歩いてくるサイト", desc: "スタイリストの技術が伝わる動きのあるデザイン。「ここに行きたい」を作る。" },
    { img: "/images/tsukigaku/clinic2.png", label: "クリニック", title: "清潔感が画面から伝わるサイト", desc: "安心と信頼を視覚で伝える。院内の空気感まで再現します。" },
  ];

  return (
    <section className="py-[clamp(80px,15vw,160px)] text-center">
      <ScrollReveal>
        <p className="text-[#0071e3] text-xs font-semibold tracking-[0.15em] uppercase mb-4">What We Do</p>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <h2 className="text-[clamp(1.8rem,4.5vw,3.2rem)] font-extrabold tracking-tight leading-tight">
          写真どーん。心が動く。
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={0.2}>
        <p className="text-[#6e6e73] text-lg font-light mt-4 max-w-[520px] mx-auto">
          人間の情報の87%は視覚から。だから私たちは「感動の動線」を設計します。
        </p>
      </ScrollReveal>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16 px-6 max-w-[1100px] mx-auto" stagger={0.15}>
        {cards.map((card, i) => (
          <motion.div
            key={i}
            className="bg-white rounded-[20px] border border-black/5 overflow-hidden group cursor-pointer"
            whileHover={{ y: -8, boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}
            transition={{ duration: 0.4 }}
          >
            <div className="overflow-hidden aspect-[4/3]">
              <Image
                src={card.img}
                alt={card.label}
                width={600}
                height={450}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="p-6 text-left">
              <p className="text-[#0071e3] text-[11px] font-semibold tracking-[0.1em] uppercase mb-2">{card.label}</p>
              <h3 className="font-bold text-lg tracking-tight mb-2">{card.title}</h3>
              <p className="text-[#6e6e73] text-sm leading-relaxed font-light">{card.desc}</p>
            </div>
          </motion.div>
        ))}
      </StaggerContainer>
    </section>
  );
}

function Mobile() {
  return (
    <section className="py-[clamp(80px,15vw,160px)] text-center px-6">
      <ScrollReveal>
        <p className="text-[#0071e3] text-xs font-semibold tracking-[0.15em] uppercase mb-4">Mobile First</p>
        <h2 className="text-[clamp(1.8rem,4.5vw,3.2rem)] font-extrabold tracking-tight">
          スマホでも、この美しさ
        </h2>
        <p className="text-[#6e6e73] text-lg font-light mt-4 max-w-[480px] mx-auto">
          お客さんの8割はスマホで見ています。だからスマホで最高に美しいサイトを作ります。
        </p>
      </ScrollReveal>
      <div className="flex justify-center items-end gap-8 mt-12 flex-wrap">
        <ScrollReveal delay={0.1}>
          <ParallaxLayer speed={0.1}>
            <Image
              src="/images/tsukigaku/phone-food.png"
              alt="スマホ"
              width={240}
              height={480}
              className="w-[200px] md:w-[240px] rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
            />
          </ParallaxLayer>
        </ScrollReveal>
        <ScrollReveal delay={0.25}>
          <ParallaxLayer speed={0.15}>
            <Image
              src="/images/tsukigaku/responsive.png"
              alt="レスポンシブ"
              width={500}
              height={350}
              className="w-[320px] md:w-[420px] rounded-[16px] shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
            />
          </ParallaxLayer>
        </ScrollReveal>
      </div>
    </section>
  );
}

function Philosophy() {
  return (
    <section className="py-[clamp(80px,15vw,160px)] px-6 max-w-[1100px] mx-auto">
      <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <ScrollReveal direction="left">
          <p className="text-[#0071e3] text-xs font-semibold tracking-[0.15em] uppercase mb-4">Our Philosophy</p>
          <h2 className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-extrabold tracking-tight leading-tight">
            作るためじゃない。
            <br />
            売るために作る。
          </h2>
          <p className="text-[#6e6e73] text-base leading-relaxed mt-6 font-light">
            ホームページ会社は「作る」のが目的。でもあなたには「売りたいもの」がある。だから写真どーん。1スクロールごとに感情が動いて、最後に「行きたい」にたどり着く。それが感動の動線です。
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <ParallaxLayer speed={0.12}>
            <Image
              src="/images/tsukigaku/before-after2.png"
              alt="Before After"
              width={600}
              height={400}
              className="w-full rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
            />
          </ParallaxLayer>
        </ScrollReveal>
      </div>
    </section>
  );
}

function CafeSection() {
  return (
    <section className="py-[clamp(80px,15vw,160px)] px-6 max-w-[1100px] mx-auto">
      <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <ScrollReveal delay={0.1} className="order-2 md:order-1">
          <ParallaxLayer speed={0.12}>
            <Image
              src="/images/tsukigaku/cafe.png"
              alt="カフェ"
              width={600}
              height={400}
              className="w-full rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
            />
          </ParallaxLayer>
        </ScrollReveal>
        <ScrollReveal direction="right" className="order-1 md:order-2">
          <p className="text-[#0071e3] text-xs font-semibold tracking-[0.15em] uppercase mb-4">For Cafes</p>
          <h2 className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-extrabold tracking-tight leading-tight">
            あの空気感まで、
            <br />
            画面の中に。
          </h2>
          <p className="text-[#6e6e73] text-base leading-relaxed mt-6 font-light">
            木の温もり、コーヒーの香り、焼きたてのパン。写真1枚で「ここに行きたい」と思わせる。それがツキガクサイトの仕事です。
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

function OwnerVoice() {
  return (
    <section className="py-[clamp(80px,12vw,120px)] px-6 bg-[#f5f5f7]">
      <ScrollReveal>
        <div className="max-w-[700px] mx-auto flex items-center gap-10 flex-wrap justify-center md:justify-start">
          <Image
            src="/images/tsukigaku/owner.png"
            alt="オーナー"
            width={200}
            height={200}
            className="w-[160px] h-[160px] rounded-full object-cover shadow-lg"
          />
          <div className="flex-1 min-w-[260px]">
            <p className="text-[#0071e3] text-xs font-semibold tracking-[0.15em] uppercase mb-3">Owner&apos;s Voice</p>
            <h3 className="font-bold text-xl tracking-tight mb-3">
              「うちの店がこんなサイトを持てるなんて」
            </h3>
            <p className="text-[#6e6e73] text-sm leading-relaxed font-light">
              月9,800円でこのクオリティは信じられませんでした。お客さんから「サイト見て来ました」って言われることが増えて、本当に嬉しいです。
            </p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

function Pricing() {
  const features = [
    "Apple級プレミアムデザイン",
    "完全オーダーメイド（5ページまで）",
    "スクロールアニメーション標準搭載",
    "スマホ・タブレット完全対応",
    "月2回の修正対応込み",
    "ホスティング・SSL証明書込み",
    "初期費用0円",
  ];

  const options = [
    { price: "+500円", label: "独自ドメイン" },
    { price: "+500円", label: "ページ追加" },
    { price: "+500円", label: "アニメーション" },
    { price: "+100円", label: "挿絵（1点）" },
  ];

  return (
    <section id="pricing" className="py-[clamp(80px,15vw,160px)] px-6 text-center">
      <ScrollReveal>
        <p className="text-[#0071e3] text-xs font-semibold tracking-[0.15em] uppercase mb-4">Pricing</p>
        <h2 className="text-[clamp(1.8rem,4.5vw,3.2rem)] font-extrabold tracking-tight">シンプルな料金</h2>
        <p className="text-[#6e6e73] text-lg font-light mt-4">必要なものは全部込み。隠れた費用はありません。</p>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="max-w-[440px] mx-auto mt-12 bg-white border-2 border-[#0071e3] rounded-[24px] p-10 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#0071e3] text-white text-[11px] font-semibold px-5 py-1 rounded-b-xl tracking-wide">
            STANDARD PLAN
          </div>
          <div className="mt-4">
            <span className="text-lg font-semibold align-top">&#165;</span>
            <span className="text-[3.5rem] font-black tracking-tight">9,800</span>
            <span className="text-[#6e6e73] text-sm"> /月（税込）</span>
          </div>
          <ul className="mt-6 text-left space-y-0">
            {features.map((f, i) => (
              <li key={i} className="flex items-center gap-3 py-3 border-b border-black/5 text-sm text-[#6e6e73]">
                <span className="w-[18px] h-[18px] rounded-full bg-[#30d158] flex-shrink-0 flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-4 p-3 bg-[#f0fdf4] rounded-xl text-sm text-[#15803d] font-medium">
            修正依頼がない年は翌年10%割引。長く使うほどお得に。
          </div>
          <a href="#" className="block mt-6 py-3.5 bg-[#0071e3] text-white font-semibold rounded-2xl hover:bg-[#0077ED] transition-colors text-center">
            無料相談を予約する
          </a>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.3}>
        <p className="text-[#6e6e73] text-sm mt-10 mb-4">オプション</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-[560px] mx-auto">
          {options.map((o, i) => (
            <div key={i} className="bg-white border border-black/5 rounded-xl p-4 text-center">
              <p className="font-bold text-lg">{o.price}</p>
              <p className="text-[#6e6e73] text-xs mt-1">{o.label}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const items = [
    { q: "解約したらどうなりますか？", a: "サービスの提供が終了し、サイトは非公開になります。制作物の納品ではなく、サービスとしてのご提供となります。" },
    { q: "本当にApple級のクオリティですか？", a: "Apple.comと同じ技術スタック（Next.js、GSAP、スムーススクロール）を使用しています。スクロールアニメーション、パララックス効果、レスポンシブ対応など、すべてAppleのサイトと同等の技術で制作します。" },
    { q: "どのくらいで完成しますか？", a: "ヒアリング後、最短1週間で初稿をお見せします。修正を経て通常2〜3週間で公開となります。" },
    { q: "写真素材がなくても大丈夫ですか？", a: "はい。AI画像生成技術を活用し、あなたのビジネスに最適なビジュアルを制作します。" },
    { q: "修正は何回でもできますか？", a: "月2回までの修正が基本プランに含まれています。修正がない年は翌年10%割引となります。" },
    { q: "個人事業主でも申し込めますか？", a: "はい。法人・個人事業主の方にご利用いただけます。" },
  ];

  return (
    <section className="py-[clamp(80px,15vw,160px)] px-6">
      <ScrollReveal>
        <p className="text-[#0071e3] text-xs font-semibold tracking-[0.15em] uppercase mb-4 text-center">FAQ</p>
        <h2 className="text-[clamp(1.8rem,4.5vw,3.2rem)] font-extrabold tracking-tight text-center">よくある質問</h2>
      </ScrollReveal>
      <div className="max-w-[640px] mx-auto mt-12">
        {items.map((item, i) => (
          <ScrollReveal key={i} delay={i * 0.05}>
            <div className="border-b border-black/5">
              <button
                className="w-full flex justify-between items-center py-6 text-left text-[15px] font-semibold"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                {item.q}
                <motion.span
                  className="text-xl text-[#a1a1a6]"
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  +
                </motion.span>
              </button>
              <motion.div
                className="overflow-hidden"
                initial={false}
                animate={{ height: openIndex === i ? "auto" : 0, opacity: openIndex === i ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-[#6e6e73] text-sm leading-relaxed pb-6 font-light">{item.a}</p>
              </motion.div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

function CTAFinal() {
  return (
    <section className="relative py-[clamp(100px,15vw,160px)] px-6 bg-[#1d1d1f] text-white text-center overflow-hidden">
      <Image
        src="/images/tsukigaku/wave.png"
        alt=""
        width={1200}
        height={400}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] opacity-[0.06]"
      />
      <ScrollReveal>
        <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold tracking-tight relative z-10">
          あなたのビジネスを、
          <br />
          Apple級に。
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <p className="text-white/50 text-base mt-4 relative z-10">初期費用0円。今すぐ無料相談から。</p>
      </ScrollReveal>
      <ScrollReveal delay={0.2}>
        <a href="#" className="inline-block mt-10 px-10 py-4 bg-white text-[#1d1d1f] font-semibold rounded-full hover:scale-105 transition-transform relative z-10">
          無料相談を予約する
        </a>
      </ScrollReveal>
    </section>
  );
}

export default function TsukigakuPage() {
  return (
    <main className="bg-[#fafafa]">
      <Nav />
      <Hero />
      <Problem />
      <Showcase />
      <Mobile />
      <Philosophy />
      <CafeSection />
      <OwnerVoice />
      <Pricing />
      <FAQ />
      <CTAFinal />
      <footer className="text-center py-10 text-xs text-[#a1a1a6] border-t border-black/5">
        &copy; 2026 ツキガクサイト. All rights reserved.
      </footer>
    </main>
  );
}
