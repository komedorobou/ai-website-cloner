# Tsukigaku LP CRO Optimization — Design Spec

**Date:** 2026-04-15
**Based on:** LP4.pdf (4大セクション徹底リサーチ)
**Approach:** C — Full Orchestration (LP4全実装 + セクション統合 + Apple品質UX)

---

## Overview

LP4.pdfのCROリサーチに基づき、ツキガクサイトLPを最適化する。挑発的コピーはCVR 40〜127%改善効果あり（LP4データ）。既存のApple級アニメーションUXを維持しつつ、心理学ベースの構成に再編する。

### Design Decisions (User Confirmed)
- Founding Member制度: **なし**
- 課題提起: **新規追加**（IndustryShowcaseの前）
- 状況型ペルソナ: **新規追加**（IndustryShowcaseも残す）
- モバイルスティッキーCTA: **常時表示**
- 自己参照型証明: **フル**（Lighthouse + 速度 + インタラクティブデモ）
- 中間CTA: **ソフト→ハードのプログレッション4箇所**
- セクション順: **おまかせ最適配置**

---

## Section Architecture (16 sections)

### Optimal Section Order

心理学的フロー: 注意 → 問題認識 → 自分ごと化 → 信頼構築 → 解決策 → 証明 → 行動

```
1.  Nav                       (既存・微修正)
2.  Hero                      (既存)
3.  Cocktail360               (既存)
4.  ProblemAgitation [NEW]     ← 課題提起セクション
5.  SituationPersonas [NEW]   ← 状況型ペルソナ5枚
    --- CTA #1 (Soft) ---
6.  IndustryShowcase          (既存)
7.  Comparison                (既存)
    --- CTA #2 (Medium) ---
8.  SelfProof [NEW]           ← 自己参照型証明 + インタラクティブデモ
9.  TechStack                 (既存・微修正)
    --- CTA #3 (Medium-Hard) ---
10. Pricing                   (既存・価格内訳追加)
11. Flow                      (既存)
12. FAQ                       (既存)
13. Founder                   (既存・微修正)
14. CTAFinal                  (既存・コピー強化)
    --- CTA #4 (Hard + Urgency) ---
15. Footer/Contact            (既存)
16. StickyMobileCTA [NEW]     ← 常時表示フローティングバー
```

**削除セクション:**
- `Philosophy` — 「サイトは営業マン。24時間働く。」→ ProblemAgitation内のコピーに統合
- `TechChallenge` — 「他のHP業者に聞いてみてください」→ SelfProof内に統合

**結果:** 既存14 - 2削除 + 4新規 = **16セクション**

---

## New Section Details

### 4. ProblemAgitation (課題提起セクション)

**目的:** 損失フレームで訪問者の現状課題を意識させる。LP4のパターンインタラプト効果（CVR+127%）を活用。

**コピー戦略:** 「こんなお悩みありませんか？」定型は使わない。挑発的な問いかけで注意を引く。

**構成:**
```
背景: bg-black
ヘッドライン: 「今のサイト、毎日いくら損してるか知ってますか？」
  fontSize: clamp(2.5rem, 7vw, 72px)
  font-light, tracking-[-0.04em], text-white

サブコピー:
  「もっと良いサイトが持てます」ではなく
  「今のサイト、毎日見込み客を逃してしませんか？」
  text-white/50, font-light

3つの損失ポイント（Short-Short-Short+Twist パターン）:
  1. 「表示に3秒以上かかるサイト → 53%が離脱」
  2. 「スマホ対応していないサイト → 61%が二度と来ない」
  3. 「5年前のデザイン → 『この店、大丈夫？』と思われてる」

各ポイント: カウンター風アニメーション（ScrollRevealでフェードイン）
  数字部分: text-red-400, font-bold, text-[48px]
  テキスト: text-white/60, font-light

最後のTwist（Resolution Tease）:
  「でも、月9,800円で全部解決できます。」
  text-blue-400, font-medium
```

**アニメーション:**
- 各ポイントがスクロールで順次フェードイン（ScrollReveal, stagger 0.15s）
- 数字はカウントアップアニメーション（0 → 53, 0 → 61）
- 最後のTwistはblur(20px) → blur(0px)のモーションリビール

---

### 5. SituationPersonas (状況型ペルソナ)

**目的:** デモグラフィック型ではなく、JTBDアプローチの状況型でターゲットの自分ごと化を促す。

**コピー戦略:** 業種ラベルを使わず、感情的トリガーが内包された状況描写。

**レイアウト:** カード型、モバイル1列スタック / PC 2+3グリッド

**5つの状況型ペルソナカード:**

| # | 状況コピー | アイコン | 暗示されるジョブ |
|---|-----------|---------|----------------|
| 1 | 「HP、5年前に作ったまま。更新したいけど制作会社に連絡するのも面倒」 | 🖥 | Web制作の手間を排除したい |
| 2 | 「自分で作れるツールを試したけど、途中で止まった」 | 🔧 | プロ品質を手間なく得たい |
| 3 | 「毎回の修正に1〜2万。年間でいくら払ってるか、考えたくもない」 | 💸 | コストを予測可能にしたい |
| 4 | 「SNSは頑張ってるのに、ちゃんとしたHPがないのが恥ずかしい」 | 😓 | 信頼性・ブランディングを担保したい |
| 5 | 「新規のお客さんに『ホームページありますか？』って聞かれて、答えに詰まった」 | 📱 | 機会損失を止めたい |

**カードデザイン:**
```
各カード:
  bg-white/[0.03], border border-white/[0.08], rounded-2xl
  padding: p-6 md:p-8
  
  アイコン: text-[32px] mb-4, Lucide React アイコン使用
    1: Monitor (モニター)
    2: Wrench (工具)
    3: CircleDollarSign (ドル)
    4: Frown (困り顔)
    5: Smartphone (スマホ)
  状況テキスト: text-white/80, text-[15px] md:text-[16px], font-light, leading-relaxed
  引用符スタイル: 左端にブルーの縦線 border-l-2 border-blue-500/30 pl-4
```

**アニメーション:** ScrollRevealでstagger表示、各カード0.1s間隔

---

### 8. SelfProof (自己参照型証明)

**目的:** 「このサイトが実績です」のドッグフーディング戦略。LP自体の品質で信頼を構築。

**構成（3段構成）:**

**段1: メトリクス表示**
```
ヘッドライン: 「このサイトの制作コスト：¥0。初期費用：¥0。月額：¥9,800。」
  text-white, font-light, clamp(2rem, 5vw, 48px)

サブ: 「このページの表示速度：0.8秒。あなたのサイトも。」
  text-white/50

3つのメトリクスカード（横並び）:
  1. Lighthouseスコア: 「98+」 Performance
     - 円形プログレスバー（SVG）、緑色、アニメーションで0→98
  2. ページ速度: 「0.8秒」 表示完了
     - 数字カウントアップ
  3. 技術スタック: 「Next.js + GSAP + Vercel」
     - テックロゴ3つ並び
```

**段2: 「他のHP業者に聞いてみてください」（TechChallenge統合）**
```
「他のHP業者に聞いてみてください。『何の技術で作ってますか？』と。」
  → 「答えられないはずです。テンプレートを貼り替えてるだけだから。」
  → 「ツキガクサイトは、使っている技術を堂々と公開しています。」

既存のTechChallengeコピーをそのまま移植。段1のメトリクスの直下に配置。
```

**段3: インタラクティブデモ**
```
ヘッドライン: 「触ってみてください。」
  text-white, font-medium, clamp(1.8rem, 4vw, 36px)

サブ: 「このアニメーション、あなたのサイトにも入ります。」
  text-white/50

デモ要素（2〜3個、横スクロールカード）:
  1. パララックスデモ: ドラッグ/スクロールで画像がパララックス移動
     - 小さなカード内にミニチュアパララックスを実装
     - useScroll + useTransform でカード内完結
  2. ホバーリビールデモ: マウスオーバーで画像が拡大 + テキストが浮き上がる
     - whileHover={{ scale: 1.05 }} + テキストfade
  3. スクロールカウンターデモ: スクロールで数字がカウントアップ
     - useScroll + useTransform でカード内のカウンターが動く

各デモカード:
  bg-white/[0.03], border border-white/[0.08], rounded-2xl
  aspect-[4/3], overflow-hidden
  ラベル: 「パララックス効果」「ホバーアニメーション」「スクロール連動」
  下部: 「この効果を使う →」リンク風テキスト（実際のリンクではない）
```

**アニメーション:**
- メトリクスは IntersectionObserver で表示時にカウントアップ
- Lighthouseスコアは SVG circle の stroke-dashoffset アニメーション
- デモ要素は実際にインタラクティブに動く（ユーザー操作可能）

---

### 16. StickyMobileCTA (モバイルスティッキーCTA)

**目的:** モバイルで常時表示されるCTAバー。CVR+27〜252%（LP4データ）。

**デザイン:**
```
位置: fixed bottom-0, w-full, z-50
表示: モバイルのみ (md:hidden)
高さ: h-[60px]
背景: bg-black/90 backdrop-blur-xl border-t border-white/10

レイアウト（横並び）:
  左: マイクロコピー「初期費用0円」 text-white/50, text-[11px]
  右: ボタン「今すぐ相談する」
    bg-white, text-black, font-semibold, text-[13px]
    rounded-full, px-5 py-2.5

非表示オプション: ✕ボタンで閉じれる（sessionStorage記憶）
スクロールで隠す: ヒーロー表示中は非表示（scrollY > 100vh で表示開始）
```

---

## Modified Existing Sections

### 中間CTA (4箇所のプログレッション)

**CTA設計:**

| 配置 | CTA強度 | ボタンテキスト | マイクロコピー |
|------|---------|--------------|-------------|
| CTA#1: ペルソナ後 | Soft | 「サービス詳細を見る」 | 「ホームページの悩みを解決」 |
| CTA#2: 比較後 | Medium | 「無料で始める」 | 「月額9,800円ですべてお任せ」 |
| CTA#3: TechStack後 | Medium-Hard | 「今すぐ申し込む」 | 「初期費用0円・いつでも解約OK」 |
| CTA#4: CTAFinal | Hard+Urgency | 「今すぐ申し込む」 | 「初期費用0円・クレジットカード不要」 |

**中間CTAコンポーネントデザイン:**
```
InlineCTA component:
  props: { text: string, micro: string, href: string, variant: 'soft' | 'medium' | 'hard' }
  
  soft:
    ボタン: bg-white/10 border border-white/20, text-white, hover:bg-white/20
    マイクロコピー: text-white/30
  
  medium:
    ボタン: bg-white text-black, hover:scale-[1.03]
    マイクロコピー: text-white/40
  
  hard:
    ボタン: bg-white text-black, hover:scale-[1.03], shadow-lg
    マイクロコピー: text-blue-400/60, font-medium

  共通レイアウト:
    text-center, py-12 md:py-16
    ボタン: px-8 py-3.5, rounded-full, text-[14px], font-medium
    マイクロコピー: text-[12px], mt-3
```

### Pricing (価格内訳追加)

既存の料金セクションに以下を追加:

```
価格内訳セクション（料金カードの下）:
  ヘッドライン: 「月額9,800円の内訳」
  
  内訳カード（3列グリッド）:
  1. デザイン・開発: ¥5,000
     「完全オーダーメイド」
  2. ホスティング・SSL: ¥2,800
     「Vercel CDN、稼働率99.99%」
  3. サポート・修正: ¥2,000
     「月2回まで修正対応」
  
  テキスト: text-white/40, font-light
  金額: text-white, font-medium
  
  下部注釈:
  「中間マージン：¥0。営業コスト：¥0。だからこの価格。」
  text-blue-400/60
```

### Founder (微修正)

```
追加要素:
- 「品質は、このサイト自体が証明です。」を太字で強調
- 自己参照型キャッチ追加:
  「このサイトの制作コスト：¥0。初期費用：¥0。月額：¥9,800。」
  → SelfProofと呼応させる
```

### CTAFinal (コピー強化)

```
ヘッドライン変更:
  既存: 「あなたのお店のサイト、一緒に作りませんか。」
  変更: 「あなたのお店のサイト、一緒に作りませんか。」（維持）

マイクロコピー追加:
  ボタン下: 「初期費用0円・クレジットカード不要」
  text-white/30, text-[12px]
```

---

## Technical Implementation Notes

### New Components to Create

1. **ProblemAgitation** — 課題提起セクション
   - CountUpアニメーション（IntersectionObserver + requestAnimationFrame）
   - ScrollReveal stagger
   
2. **SituationPersonas** — 状況型ペルソナカード5枚
   - ScrollReveal stagger
   - カード型レイアウト（モバイル1列 / PC 2+3グリッド）

3. **SelfProof** — 自己参照型証明
   - SVG円形プログレスバー（Lighthouseスコア）
   - 3つのインタラクティブデモ（各カード内で完結するアニメーション）
   - useScroll / useTransform / whileHover

4. **InlineCTA** — 中間CTAコンポーネント
   - 3バリアント（soft / medium / hard）

5. **StickyMobileCTA** — モバイルスティッキーバー
   - fixed positioning, scroll detection, dismiss機能

### Sections to Remove

1. **Philosophy** — コピーをProblemAgitationに統合
2. **TechChallenge** — コピーをSelfProofに統合

### Animation Libraries Used
- Motion v12 (`motion/react`): viewport-triggered, scroll-linked
- ScrollReveal (既存コンポーネント): フェードイン
- CSS transitions: カウントアップ、プログレスバー
- GSAP不要（既存のMotionベースで実装可能）

### Performance Considerations
- インタラクティブデモはIntersectionObserverでビューポート内のみ動作
- StickyMobileCTAは軽量（DOM要素最小限）
- CountUpアニメーションはrAF使用、GPU非負荷
- 画像追加なし（既存アセット + SVG / CSS のみ）

---

## Success Metrics

LP4データに基づく期待値:
- 課題提起の挑発的コピー: CVR +40〜127%
- 中間CTA 4箇所: CVR +25〜68%
- スティッキーCTA: CVR +27〜252%
- 自己参照型証明: 信頼度向上（定量測定困難だがLP4は必須と明言）
- 状況型ペルソナ: スクロール深度 +15〜30%（推定）
