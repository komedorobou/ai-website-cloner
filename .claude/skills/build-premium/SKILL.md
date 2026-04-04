---
name: build-premium
description: Apple級のプレミアムWebサイト/LPを新規作成する。10エージェント体制でスクロールアニメーション、パララックス、レスポンシブQAまで全部入り。「LP最高のデザインつくるわ」「HPめっちゃええのつくるで」「プレミアムサイト作って」「Apple風のサイト」等のフレーズで発動。
argument-hint: "<サイトの説明やテーマ>"
user-invocable: true
---

# Build Premium Website

あなたは今から **Apple.com レベルのプレミアムWebサイト** を新規作成します。

対象: **$ARGUMENTS**

## あなたの武器（使えるアニメーションコンポーネント）

すべて `src/components/animation/` にあります：

| コンポーネント | 用途 | import |
|---|---|---|
| `ScrollReveal` | viewport進入時のフェード/スライド | `@/components/animation/scroll-reveal` |
| `ParallaxLayer` | 深度のあるパララックス効果 | `@/components/animation/parallax-layer` |
| `StickySection` | ピン留め + スクロール連動 | `@/components/animation/sticky-section` |
| `StaggerContainer` | 子要素の順次フェードイン | `@/components/animation/stagger-container` |
| `SmoothScroll` | Lenisスムーススクロール（layout.tsxに設置済み） | — |

フック（`src/hooks/`）：
- `useScrollProgress` — スクロール進捗 0-1
- `useInViewReveal` — viewport進入検出
- `useLenis` — Lenis初期化（SmoothScrollが使用済み）

## デザイン原則

1. **写真どーん！** — ヒーローは画面いっぱいにビジュアルをどーんと表示。テキストは重ねる。
2. **1セクション1メッセージ** — 100vh以上のセクションに情報は最小限。
3. **巨大タイポグラフィ** — 見出しは64px-120px。`tracking-tight` で文字間を詰める。
4. **極端な余白** — セクション間は `py-32` 以上。呼吸させる。
5. **ダーク推奨** — `bg-black text-white` がベース。Apple感が出る。
6. **スクロールアニメーション必須** — 全セクションに `ScrollReveal` を適用。重要セクションは `StickySection` や `ParallaxLayer` を使う。
7. **モバイルファースト** — レスポンシブ必須。320px-1440pxで崩れないこと。

## 作業フロー

### Phase 1: 設計（コードを書く前に）

1. ユーザーの要望を確認（何のサイト？ターゲットは？雰囲気は？）
2. セクション構成を決める（ヒーロー、フィーチャー×3-5、CTA、フッター等）
3. 画像が必要な箇所をリストアップ

### Phase 2: 画像生成

nano-banana MCPで各セクション用の画像を生成：
- ヒーロー用（メインビジュアル、画面いっぱい）
- フィーチャー用（各セクションのイメージ）
- 必要に応じて追加

画像は `public/images/` に保存。

### Phase 3: コーディング

1. `src/app/page.tsx` に `"use client"` で全体を書く
2. 全セクションに `ScrollReveal` を適用
3. ヒーローは画像どーん + テキスト重ね
4. フィーチャーは左右交互レイアウト + `ParallaxLayer`
5. 重要セクションは `StickySection` でピン留め
6. リストや数値は `StaggerContainer` でスタガー表示
7. `next/image` で画像最適化

### Phase 4: 検証

1. `npm run build` パス
2. `npx tsc --noEmit` パス
3. モバイル/デスクトップで表示確認

## コーディングルール

- **`"use client"` 必須** — page.tsx の先頭に書く
- **Motion v12** — `motion/react` からimport（`framer-motion` は使わない）
- **GSAP** — `useGSAP` フック使用、`ScrollTrigger.kill()` 禁止
- **画像** — `next/image` の `Image` コンポーネント使用、`basePath` を考慮したパス
- **Tailwind** — ユーティリティクラスのみ、インラインスタイルは最小限
- **レスポンシブ** — `text-[56px] md:text-[80px] lg:text-[96px]` のようにブレークポイント指定

## テンプレート

ヒーローセクションの基本パターン：

```tsx
<section className="min-h-[100vh] relative overflow-hidden">
  {/* 背景画像どーん */}
  <div className="absolute inset-0 flex items-center justify-center">
    <ScrollReveal duration={1.5} direction="none">
      <Image src="..." alt="..." width={1024} height={1024}
        className="w-[90vw] md:w-[70vw] lg:w-[55vw] max-w-[700px] h-auto" priority />
    </ScrollReveal>
  </div>
  {/* オーバーレイ */}
  <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black" />
  {/* テキスト */}
  <div className="relative z-10 pt-32 text-center px-6">
    <ScrollReveal>
      <h1 className="text-[64px] md:text-[96px] lg:text-[120px] font-bold tracking-[-0.04em]">
        タイトル
      </h1>
    </ScrollReveal>
  </div>
</section>
```

フィーチャーセクションの基本パターン：

```tsx
<section className="min-h-screen flex items-center">
  <div className="max-w-[1024px] mx-auto px-6 py-32">
    <div className="grid md:grid-cols-2 gap-16 items-center">
      <ScrollReveal direction="left">
        <h2 className="text-[40px] md:text-[56px] font-bold tracking-tight">見出し</h2>
        <p className="text-white/50">説明文</p>
      </ScrollReveal>
      <ParallaxLayer speed={0.15}>
        <ScrollReveal delay={0.2}>
          <Image src="..." alt="..." width={1024} height={1024} className="rounded-[32px]" />
        </ScrollReveal>
      </ParallaxLayer>
    </div>
  </div>
</section>
```
