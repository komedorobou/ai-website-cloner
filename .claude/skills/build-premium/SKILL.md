---
name: build-premium
description: Apple級のプレミアムWebサイト/LPを新規作成する。深掘りヒアリング→Webリファレンス収集→AIDesignerデザインカンプ→10エージェント実装の最強フロー。「LP最高のデザインつくるわ」「HPめっちゃええのつくるで」「プレミアムサイト作って」「Apple風のサイト」「ブアツヒャク作って」等のフレーズで発動。
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

---

### Phase H: 深掘りヒアリング（最初に必ず実行）

**絶対にコードもデザインも始めない。まずユーザーの頭の中を引き出す。**

ユーザーが「○○の○○作って」と言ってきたら、いきなり作り始めず、以下のヒアリングを行う。会話形式で自然に聞く（一問一答でも、まとめて聞いてもOK）。

#### 必須ヒアリング項目

1. **ビジネスについて**
   - どんなサイト？業種・サービス内容（カフェ、美容室、歯医者、SaaS、ポートフォリオ etc.）
   - そのビジネスの「強み」や「他との違い」は？
   - サイトの目的は？（集客、ブランディング、予約獲得、商品販売、ポートフォリオ…）

2. **デザインの好み**
   - 雰囲気・テイストは？（温かみ / クール / 高級感 / ナチュラル / ポップ / モダン / おまかせ）
   - 「こういうのは嫌」ってのある？（ゴテゴテ / 地味すぎ / よくあるテンプレ感 etc.）
   - 色味の好みは？（暖色 / 寒色 / モノトーン / ブランドカラー指定 / おまかせ）
   - 参考にしたいサイトある？（URLがあれば最高）

3. **ターゲット**
   - 誰に見てほしい？（年齢層、性別、職業、趣味…）
   - スマホメイン？PCメイン？

4. **コンテンツ**
   - 必須セクションある？（メニュー / 料金 / アクセス / お客様の声 / 問い合わせ / ギャラリー etc.）
   - 写真素材ある？それともAI生成でいく？
   - テキスト・コピーは自分で書く？おまかせ？

5. **ページ構成パターン**（以下から選んでもらう。「おまかせ」もOK）

   | # | 構成名 | 特徴 | 向いてるサイト |
   |---|--------|------|---------------|
   | A | **フルスクリーン切り替え型** | セクションごとに全画面写真+テキストが切り替わる。スクロールするたびに世界観が変わるインパクト重視。 | ブランドLP、プロダクト紹介、ポートフォリオ |
   | B | **マガジン/エディトリアル型** | 雑誌のように写真とテキストが非対称に交互配置。左右交互ではなく、大小・位置をランダムに崩してテンプレ感を排除。 | カフェ、アパレル、ライフスタイル |
   | C | **横スクロール型** | メニューやギャラリーなど一部セクションを横スクロールで見せる。縦+横のハイブリッド体験。 | ギャラリー、レストラン、ショールーム |
   | D | **ストーリーテリング型** | スクロールに合わせてストーリーが展開。StickySection多用で1つの物語として読ませる。 | コンセプト重視のブランド、SaaS、スタートアップ |
   | E | **カード/グリッド型** | Bento Grid風にカードを敷き詰める構成。情報量が多いサイトでも整理されて見える。 | SaaS、ダッシュボード、料金比較、多メニュー |
   | F | **ワンカラム縦長型** | シンプルに上から下へ。大きな余白と写真で呼吸させるミニマル構成。Apple.comの定番。 | プロダクトLP、Apple風、ミニマル系 |

   - 必ず選択肢を提示して選んでもらう
   - 「おまかせ」の場合は、業種・雰囲気・ターゲットから最適な構成を判断する
   - 選ばれた構成パターンに合わせてセクション設計・アニメーション選定を行う

#### ヒアリングのコツ

- **深掘りする** — 「カフェ」だけじゃ足りない。「どんなカフェ？自家焙煎？スペシャルティ？街のレトロ喫茶？」まで聞く
- **選択肢を出す** — 漠然と「どんな雰囲気？」より「モダンでクール？それとも温かみのあるナチュラル系？」の方が答えやすい
- **「おまかせ」もOK** — 全部おまかせでも、ヒアリング内容から最適な方向性を判断できるように
- **追加質問は2回まで** — ダラダラ聞かない。核心を突く質問を2ラウンド以内で終わらせる

ヒアリング完了後、回答内容を **ヒアリングサマリー** として整理し、ユーザーに確認してから次のフェーズへ。

---

### Phase R: リファレンス収集（3エージェント並列）

**ヒアリング結果をもとに、Webからユーザーの好みに合うデザインリファレンスを5つ収集する。**

3つのエージェントを **並列で** 起動し、それぞれ異なる切り口でリファレンスを探す：

#### Agent A: 同業種リファレンス
- ヒアリングで得た業種・サービスと同じジャンルの優れたサイトをWebSearchで探す
- 検索クエワード例: `best [業種] website design 2025`, `[業種] landing page award`
- Awwwards, CSS Design Awards, siteinspire 等のデザインアワード系も活用
- 2-3件ピックアップ

#### Agent B: スタイル・雰囲気リファレンス
- ヒアリングで得た雰囲気・テイスト（モダン、ナチュラル、高級感等）に合うサイトを探す
- 業種は問わない。デザインの方向性が合っていればOK
- 検索クエワード例: `minimalist dark website design`, `luxury brand website`, `warm natural web design`
- 2-3件ピックアップ

#### Agent C: アニメーション・UXリファレンス
- スクロールアニメーション、パララックス、インタラクションが優れたサイトを探す
- 「こういう動きをつけたい」の参考になるサイト
- 検索クエワード例: `best scroll animation website`, `GSAP website examples`, `awwwards site of the day`
- 2-3件ピックアップ

#### リファレンス提示

3エージェントの結果を集約し、**ベスト5つ** に絞ってユーザーに提示する：

```
🔍 あなたの好みに合いそうなサイトを5つ見つけてきたで！

1. [サイト名] - URL
   → 〇〇な雰囲気が合いそう。特に△△のセクションがええ感じ。

2. [サイト名] - URL
   → □□のアニメーションが参考になる。スクロール体験が◎。

...

どれが好き？「1と3の雰囲気で」「2のアニメーションを取り入れて」みたいに言ってくれたら、それベースで作るわ！
```

ユーザーのフィードバック（「これ好き」「ここのこの感じ」「全部微妙、もっと○○な感じ」）を受けて、デザインの方向性を確定する。

**「全部微妙」の場合:** 追加で3エージェント再検索（切り口を変える）。最大2ラウンドまで。

リファレンスが確定したら、選ばれたサイトのデザイン要素（配色、レイアウト、アニメーション、タイポグラフィ）をメモして次のフェーズへ。

---

### Phase C: クローン分析（clone-websiteレベルの本格解析）

**Phase Rでユーザーが「これ！」と選んだリファレンスサイト（1〜2サイト）を、ブラウザMCPで実際に見に行き、clone-websiteパイプラインの解析手法でデザインをデータレベルで徹底的に盗む。**

感覚じゃない。データで盗む。

#### 前提
- ブラウザMCPツール（Playwright MCP, Chrome MCP等）が必要。使えない場合はWebFetch + WebSearchで代替。
- 出力先: `docs/research/references/` にサイトごとのフォルダを作成

#### Step 1: 6ブレークポイントスクリーンショット

ブラウザMCPでリファレンスサイトにアクセスし、以下の6幅でフルページスクショを取得：

| Name | Width | Device |
|------|-------|--------|
| xs | 320px | iPhone SE |
| sm | 390px | iPhone |
| md | 768px | iPad portrait |
| lg | 1024px | iPad landscape |
| xl | 1280px | Small desktop |
| 2xl | 1440px | Large desktop |

- Cookie同意バナー等は `browser_evaluate` で除去
- セクションごとのビューポートスクショも3〜5箇所取得
- 保存先: `docs/design-references/ref-<hostname>/`

#### Step 2: デザイントークン抽出（getComputedStyleで正確に）

ブラウザMCPで以下のスクリプトを実行し、デザイントークンを **数値で** 抽出する：

```javascript
JSON.stringify({
  colors: (() => {
    const els = document.querySelectorAll('h1,h2,h3,h4,p,a,button,nav,header,footer,section');
    const colors = new Map();
    els.forEach(el => {
      const cs = getComputedStyle(el);
      ['color','backgroundColor','borderColor'].forEach(prop => {
        const v = cs[prop];
        if (v && v !== 'rgba(0, 0, 0, 0)') colors.set(v, (colors.get(v)||0)+1);
      });
    });
    return [...colors.entries()].sort((a,b) => b[1]-a[1]).slice(0,20);
  })(),
  typography: [...document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,a,button,span,li')]
    .slice(0,50).map(el => {
      const cs = getComputedStyle(el);
      return {
        tag: el.tagName, text: el.textContent?.trim().slice(0,30),
        fontFamily: cs.fontFamily, fontSize: cs.fontSize, fontWeight: cs.fontWeight,
        lineHeight: cs.lineHeight, letterSpacing: cs.letterSpacing, textTransform: cs.textTransform
      };
    }),
  spacing: [...document.querySelectorAll('section,div,header,main')]
    .slice(0,30).map(el => {
      const cs = getComputedStyle(el);
      return {
        tag: el.tagName, classes: el.className?.toString().slice(0,50),
        padding: cs.padding, margin: cs.margin, gap: cs.gap, maxWidth: cs.maxWidth
      };
    }),
  fonts: [...new Set([...document.querySelectorAll('*')].slice(0,200).map(el => getComputedStyle(el).fontFamily))],
  borderRadius: [...new Set([...document.querySelectorAll('button,img,div,section,a')]
    .slice(0,50).map(el => getComputedStyle(el).borderRadius).filter(v => v !== '0px'))]
});
```

#### Step 3: インタラクション・アニメーション分析

clone-websiteのMandatory Interaction Sweepと同じ手法で分析する：

**スクロールスイープ:**
- ページ上部から下部までゆっくりスクロール
- ヘッダーの変化（縮小、背景変化、影追加）→ トリガーのスクロール位置を記録
- ビューポート進入アニメーション → 種類と方向を記録
- スクロールスナップの有無
- スムーススクロールライブラリ（Lenis, Locomotive等）の検出

**ホバースイープ:**
- ボタン、カード、リンク、画像のホバー状態を確認
- 変化するプロパティ（color, scale, shadow, opacity等）と transition を記録

**レスポンシブスイープ:**
- 6ブレークポイントで確認
- レイアウトが切り替わるポイントを特定（カラム→スタック等）

**アニメーション詳細パラメータ:**
各アニメーション要素について以下を記録：
- トリガー（スクロール位置、IntersectionObserver閾値、hover、click）
- 開始・終了のCSSステート（getComputedStyleの実値）
- duration, easing, delay
- スクロール連動（スクラブ）かどうか
- ピン留めの有無
- スタガータイミング

#### Step 4: アセット発見（画像・動画・SVG）

```javascript
JSON.stringify({
  images: [...document.querySelectorAll('img')].map(img => ({
    src: img.src || img.currentSrc, alt: img.alt,
    width: img.naturalWidth, height: img.naturalHeight,
    position: getComputedStyle(img).position,
    zIndex: getComputedStyle(img).zIndex
  })),
  videos: [...document.querySelectorAll('video')].map(v => ({
    src: v.src || v.querySelector('source')?.src,
    poster: v.poster, autoplay: v.autoplay, loop: v.loop
  })),
  backgroundImages: [...document.querySelectorAll('*')].filter(el => {
    const bg = getComputedStyle(el).backgroundImage;
    return bg && bg !== 'none';
  }).map(el => ({
    url: getComputedStyle(el).backgroundImage,
    element: el.tagName + '.' + el.className?.toString().split(' ')[0]
  })),
  svgCount: document.querySelectorAll('svg').length
});
```

- **参考素材として使いたい画像はDL** → `docs/design-references/ref-<hostname>/assets/` に保存
- build-premiumでは最終的にnano-banana MCPでオリジナル画像を生成するが、参考画像があると生成プロンプトの精度が上がる

#### Step 5: クローン分析レポート作成

抽出データを以下のフォーマットで整理し、`docs/research/references/<hostname>/CLONE_ANALYSIS.md` に保存：

```markdown
# クローン分析レポート: [サイト名]

## デザイントークン
### カラーパレット
- Primary: #○○○○○○ (rgb値)
- Secondary: #○○○○○○
- Background: #○○○○○○
- Text Primary: #○○○○○○
- Text Muted: #○○○○○○
- Accent: #○○○○○○

### タイポグラフィ
- 見出しフォント: ○○○, weight: ○○○
- 本文フォント: ○○○, weight: ○○○
- H1: ○○px / line-height: ○○ / letter-spacing: ○○
- H2: ○○px / line-height: ○○ / letter-spacing: ○○
- Body: ○○px / line-height: ○○

### スペーシングスケール
- セクション間: ○○px
- コンテンツ内余白: ○○px
- max-width: ○○px
- border-radius: ○○px（ボタン）, ○○px（カード）

## レイアウト構成
- ヒーロー: ○○式（全画面写真 / 中央テキスト / 左寄せ等）
- セクション数: ○○
- グリッド: ○カラム / gap: ○○px
- ナビ: 固定/非固定, 背景: ○○

## アニメーション仕様
### ヒーロー
- 種類: ○○ / duration: ○○s / easing: ○○

### セクション進入
- 種類: fade-up / slide-in / etc.
- duration: ○○s / delay: ○○s / stagger: ○○s

### ホバー
- ボタン: ○○ → ○○ / transition: ○○
- カード: ○○ → ○○ / transition: ○○

### スクロール連動
- パララックス: あり/なし / speed: ○○
- ピン留め: あり/なし
- スムーススクロール: Lenis / なし

## レスポンシブ
- ブレークポイント: ○○px でカラム変更
- モバイルナビ: ハンバーガー / ドロワー / etc.

## 盗むべき要素TOP5
1. ○○（具体的な要素と、うちのサイトでどう活かすか）
2. ○○
3. ○○
4. ○○
5. ○○
```

#### Step 6: ユーザーに確認

レポートのサマリーをユーザーに提示：
- 盗むべき要素TOP5を見せる
- 「これらを取り入れて作るで！」
- OKが出たらPhase 0（またはPhase 1）へ

#### 注意
- **2サイトまで** — 3サイト以上分析するとデザインがブレる。最大2サイト。
- **コピーじゃない、参考** — 抽出したトークンは「そのまま使う」のではなく「方向性の指針」として使う。業種・ターゲットに合わせてアレンジする。
- **数値は正確に** — 「なんかでかい」ではなく「96px, weight 700, letter-spacing -0.04em」まで出す。
- **ブラウザMCPが使えない場合** — WebFetchでHTML取得 + WebSearchでスクリーンショット探索で代替。精度は落ちるがやらないよりマシ。

---

### Phase 0: デザインカンプ生成（AIDesigner MCP）

ヒアリング＋リファレンス収集で方向性が固まったら、AIDesigner MCPで完成イメージを視覚化する。設計図があれば精度が爆上がりする。

**AIDesigner MCPが使えない場合（未接続・認証切れ・クレジット不足）:** Phase 0をスキップしてPhase 1へ進む。Phase 1で手動設計を行う。

1. **デザインブリーフ作成** — ユーザーの要望を以下の観点で整理：
   - サイトの目的・ターゲット
   - 雰囲気（Apple風、ミニマル、ダーク、華やか等）
   - 必須セクション（ヒーロー、フィーチャー、CTA等）
   - ブランドカラーやイメージがあれば

2. **AIDesigner MCP で `generate_design` を実行** — デザインブリーフをもとにプロンプトを作成：
   - プロンプトはアートディレクション寄りで短くまとめる（PRDにしない）
   - `viewport: "desktop"` でまず生成
   - プロジェクトの repo_context は自動検出される（Next.js + Tailwind v4 + shadcn/ui）

3. **プレビュー確認** — 生成されたHTMLをキャプチャしてPNGプレビューを作成：
   ```bash
   npx -y @aidesigner/agent-skills capture --html-file .aidesigner/mcp-latest.html --prompt "<prompt>" --transport mcp --remote-run-id "<run-id>"
   npx -y @aidesigner/agent-skills preview --id <run-id>
   ```

4. **ユーザーに確認** — プレビューを見せて：
   - 「これでOK」→ Phase 1 へ進む
   - 「ここ変えて」→ `refine_design` で修正してから再確認

5. **デザインカンプ保存** — 確定したデザインを `.aidesigner/runs/<run-id>/` に保持。以降のフェーズでデザインの参照元として使う。

6. **adoption ガイド取得**（任意）:
   ```bash
   npx -y @aidesigner/agent-skills adopt --id <run-id>
   ```
   → フレームワーク固有のポーティングガイダンスが得られる

**重要:** AIDesignerの出力はあくまで「設計図」として使う。HTML をそのまま貼り付けるのではなく、デザインの方向性（レイアウト、配色、タイポグラフィ、セクション構成）を参照しながら、Phase 3 で本プロジェクトのアニメーションコンポーネント（ScrollReveal, ParallaxLayer, StickySection等）を使って実装する。

### Phase 1: 設計（ヒアリング + クローン分析 + デザインカンプをもとに）

1. **Phase H のヒアリングサマリー** + **Phase R のリファレンス選定結果** + **Phase C のクローン分析レポート** + **Phase 0 のデザインカンプ（あれば）** を総合して、セクション構成を決める（ヒーロー、フィーチャー×3-5、CTA、フッター等）
2. **Phase Cの抽出データを活用** — 配色はカラーパレットを参考にアレンジ、タイポグラフィはサイズ感・ウェイトの緩急を参考に、スペーシングはスケール感を参考にする
3. **Phase Cのアニメーション仕様を参考** — どのセクションにどのアニメーション（ScrollReveal, ParallaxLayer, StickySection等）を適用するかを決める
4. Phase 0 を実施した場合はデザインカンプとの差分を確認（アニメーション、インタラクション等はこちらで追加）
5. 画像が必要な箇所をリストアップ（Phase Cの参考画像を元にnano-banana MCPで生成するプロンプトも検討）

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
