# Premium Website Builder — Design Spec

## Overview

ai-website-cloner-template を改造し、Apple iPhone サイトレベルのクオリティを指示だけで生成できる **10エージェント体制のプレミアムWebサイトビルダー** に進化させる。

### Goals

1. `/clone-website <URL>` のパイプラインにアニメーション専門フェーズを追加
2. GSAP ScrollTrigger / Framer Motion / Lenis によるApple級スクロールアニメーション
3. 6ブレークポイントの自動レスポンシブQA
4. 自分用ツールとしてHP制作に使う

### Non-Goals

- 一般公開用テンプレートとしての汎用化
- EC/認証/バックエンド機能
- WebGL/Three.js 3D（将来的に検討、初期スコープ外）

---

## Architecture

### 10-Agent Pipeline

既存の5フェーズパイプラインを拡張し、10エージェント体制にする。

```
Phase 1: Reconnaissance（既存改造）
  [1] SiteAnalyzer — サイト解析 + 6ブレークポイントスクショ

Phase 2: Foundation（既存改造）
  [2] DesignTokenExtractor — デザイントークン抽出（既存ロジック流用）
  [3] MotionArchitect — アニメーション設計図作成 ★NEW
  [4] AssetCurator — アセット最適化（既存ロジック流用）

Phase 3: Build（既存改造）
  [5] LayoutEngineer — コンポーネント構築（既存builder流用）
  [6] TypographyRefiner — タイポグラフィ調整 ★NEW

Phase 4: Animation（★NEW フェーズ）
  [7] AnimationImplementer — GSAP/Framer Motionでアニメーション実装

Phase 5: QA & Polish（既存改造 + 新規）
  [8] PerformanceOptimizer — パフォーマンス最適化 ★NEW
  [9] ResponsiveQA — 6ブレークポイント自動QA ★NEW（既存QA強化）
  [10] PixelPolisher — 最終仕上げ ★NEW
```

### Execution Flow

```
[1 SiteAnalyzer]
    ↓
[2 DesignToken] [3 MotionArchitect] [4 AssetCurator]  ← 並列
    ↓                ↓                    ↓
[5 LayoutEngineer]
    ↓
[6 TypographyRefiner]
    ↓
[7 AnimationImplementer]
    ↓
[8 PerformanceOptimizer]
    ↓
[9 ResponsiveQA]
    ↓
[10 PixelPolisher]
```

Phase 2 の3体は並列（git worktree）。Phase 3以降は順次実行。

---

## New Dependencies (package.json)

```json
{
  "gsap": "^3.12",
  "framer-motion": "^11",
  "lenis": "^1.1"
}
```

GSAP ScrollTrigger はGSAPに含まれる（プラグイン登録が必要）。
Three.js は初期スコープ外。必要になったら追加。

---

## New/Modified Files

### 1. SKILL.md 改造

既存の `.claude/skills/clone-website/SKILL.md` を以下の点で改造：

**Phase 1 (Reconnaissance) 変更点:**
- スクリーンショットを6ブレークポイントに拡張
  - 320px (iPhone SE)
  - 390px (iPhone)
  - 768px (iPad portrait)
  - 1024px (iPad landscape)
  - 1280px (small desktop)
  - 1440px (large desktop)
- Interaction Sweep にアニメーションパラメータ詳細抽出を追加

**Phase 2 (Foundation) 変更点:**
- MotionArchitect エージェントの dispatch を追加（DesignToken/AssetCuratorと並列）

**Phase 3 (Build) 変更点:**
- TypographyRefiner パスを追加（LayoutEngineer完了後）

**Phase 4 (Animation) 新規追加:**
- AnimationImplementer が全コンポーネントにアニメーション適用
- GSAP ScrollTrigger / Framer Motion / Lenis の初期化
- `prefers-reduced-motion` フォールバック必須

**Phase 5 (QA) 変更点:**
- 既存の2ブレークポイント比較 → 6ブレークポイント自動比較
- PerformanceOptimizer パスを追加
- PixelPolisher パスを追加

### 2. 新規テンプレート: docs/research/ANIMATION_EXTRACTION.md

アニメーション抽出用のテンプレート。各アニメーション要素について以下を記録：

```markdown
## [要素名]
- **トリガー:** scroll / hover / click / viewport-enter / time
- **トリガー詳細:** IntersectionObserver threshold: 0.3 / scroll position: 500px
- **アニメーションタイプ:** fade-in / slide-up / scale / parallax / pin / frame-sequence
- **開始状態:** opacity: 0, translateY: 40px
- **終了状態:** opacity: 1, translateY: 0
- **duration:** 0.8s
- **easing:** cubic-bezier(0.22, 1, 0.36, 1)
- **delay:** 0s
- **stagger:** 0.1s (children)
- **scrub:** true/false (scroll-linked)
- **pin:** true/false
- **実装方針:** GSAP ScrollTrigger / Framer Motion useInView / CSS animation
```

### 3. 新規フック: src/hooks/

- `useScrollProgress.ts` — スクロール位置を0-1の進捗値で返す
- `useInViewReveal.ts` — viewport に入ったら表示するアニメーション
- `useLenis.ts` — Lenis スムーススクロールの初期化

### 4. 新規コンポーネント: src/components/animation/

- `ScrollReveal.tsx` — viewport 進入時のフェード/スライドアニメーション（Framer Motion）
- `ParallaxLayer.tsx` — 深度のあるパララックス効果
- `StickySection.tsx` — ピン留めセクション + スクロール連動コンテンツ
- `StaggerContainer.tsx` — 子要素のスタガーアニメーション
- `SmoothScroll.tsx` — Lenis provider コンポーネント

### 5. AGENTS.md 更新

以下を追記：
- アニメーション実装のコーディング規約（GSAP登録、cleanup、reduced-motion）
- 6ブレークポイントの定義
- 新エージェントの役割説明

更新後 `bash scripts/sync-agent-rules.sh` を実行。

---

## Agent Specifications

### Agent 1: SiteAnalyzer（既存改造）

**変更点:** スクリーンショット撮影を6ブレークポイントに拡張。
**出力:** `site-analysis.json`, 6サイズのスクリーンショット群

### Agent 2: DesignTokenExtractor（既存流用）

**変更なし。** 既存のPhase 2 Foundation ロジックをそのまま使用。
**出力:** `globals.css` のデザイントークン更新

### Agent 3: MotionArchitect ★NEW

**役割:** サイトの全アニメーションを分析し、再現用の設計図を作成。
**入力:** SiteAnalyzer の出力 + ブラウザMCPでの実行時解析
**処理:**
1. ブラウザMCPでターゲットサイトをスクロールしながら、各要素のアニメーションを観察
2. `ANIMATION_EXTRACTION.md` テンプレートに従って全アニメーションを記録
3. GSAP ScrollTrigger / Framer Motion のどちらで実装するかを判断
4. `docs/research/MOTION_SPEC.md` を出力
**出力:** `docs/research/MOTION_SPEC.md`

### Agent 4: AssetCurator（既存流用）

**変更なし。** 既存のアセットダウンロード＋最適化ロジック。
**出力:** `public/images/`, `public/videos/`, `scripts/download-assets.mjs`

### Agent 5: LayoutEngineer（既存流用）

**変更なし。** 既存のbuilder dispatch ロジック。各セクションのspec作成→worktreeでbuilder dispatch。
**出力:** `src/components/` のセクションコンポーネント群

### Agent 6: TypographyRefiner ★NEW

**役割:** タイポグラフィの精密調整。
**入力:** DesignTokenExtractor の出力 + LayoutEngineer のコンポーネント
**処理:**
1. フルイドタイプスケール実装（`clamp()` ベース）
2. 見出しのletter-spacing / line-height 微調整
3. `font-display: swap` + サブセット設定
4. `text-wrap: balance` / `text-wrap: pretty` 適用
**出力:** `globals.css` 更新 + コンポーネントのタイポグラフィ修正

### Agent 7: AnimationImplementer ★NEW

**役割:** MotionArchitect の設計図に基づき、全コンポーネントにアニメーションを実装。
**入力:** `MOTION_SPEC.md` + LayoutEngineer のコンポーネント
**処理:**
1. Lenis スムーススクロール初期化（`SmoothScroll.tsx` を `layout.tsx` に追加）
2. GSAP ScrollTrigger プラグイン登録
3. 各コンポーネントに `ScrollReveal`, `ParallaxLayer`, `StickySection` 等を適用
4. スタガーアニメーションの実装
5. `prefers-reduced-motion` のフォールバック（アニメーション無効化）
6. クリーンアップ（useEffect return で GSAP kill）
**出力:** アニメーション適用済みコンポーネント群

### Agent 8: PerformanceOptimizer ★NEW

**役割:** パフォーマンス最適化。Lighthouse 90+ を目指す。
**入力:** AnimationImplementer 完了後のコードベース
**処理:**
1. `next/image` の適用漏れチェック
2. below-fold コンポーネントの `dynamic(() => import(...), { ssr: false })` 対応
3. `will-change` の適切な使用（過剰使用防止）
4. フォントサブセット最適化
5. アニメーションライブラリのコード分割
6. LCP / CLS / INP の計測と改善
**出力:** 最適化済みコードベース + パフォーマンスレポート

### Agent 9: ResponsiveQA ★NEW（既存QA強化）

**役割:** 6ブレークポイントでの自動ビジュアルQA。
**入力:** PerformanceOptimizer 完了後のコードベース + SiteAnalyzer の元スクリーンショット
**処理:**
1. ブラウザMCPで6ブレークポイントのスクリーンショット撮影
2. 元サイトのスクリーンショットと比較
3. 差異レポート作成（セクション単位でどこがズレているか）
4. 重大な差異は自動修正
**出力:** `docs/research/QA_REPORT.md` + 修正済みコンポーネント

### Agent 10: PixelPolisher ★NEW

**役割:** 最終仕上げ。「良い」を「Apple級」に引き上げる。
**入力:** ResponsiveQA 完了後のコードベース + QAレポート
**処理:**
1. QAレポートの残課題を修正
2. backdrop-blur、selection color 等の細部追加
3. アニメーションのイージングカーブ微調整
4. ダークモード対応（必要な場合）
5. OGP / favicon / メタデータ最終チェック
6. 全体の統一感チェック
**出力:** 最終プロダクションコード

---

## Testing Strategy

- `npm run build` が全フェーズ完了後にパスすること
- `npm run typecheck` がエラー0であること
- Lighthouse Performance スコア 90+
- 6ブレークポイントでレイアウト崩れなし
- `prefers-reduced-motion` でアニメーションが無効化されること

---

## Migration Path

1. `package.json` に依存追加 → `npm install`
2. `src/hooks/` にアニメーションフック追加
3. `src/components/animation/` にアニメーションプリミティブ追加
4. `docs/research/ANIMATION_EXTRACTION.md` テンプレート追加
5. `SKILL.md` を改造（フェーズ追加）
6. `AGENTS.md` を更新
7. `bash scripts/sync-agent-rules.sh` 実行
8. `node scripts/sync-skills.mjs` 実行

---

## Risks and Mitigations

| リスク | 対策 |
|--------|------|
| GSAPライセンス（商用利用） | GSAPは商用無料。ScrollTriggerも無料プラグイン |
| アニメーションでパフォーマンス劣化 | PerformanceOptimizerが専任で対処 |
| ブラウザMCPがアニメーション取得できない | フォールバックとして手動パラメータ入力を許容 |
| 10エージェント体制の複雑さ | 既存のworktree並列実行モデルをそのまま活用 |
