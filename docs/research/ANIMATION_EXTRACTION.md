# Animation Extraction Template

Use this template to document every animation on the target site.
Fill out one entry per animated element or element group.

---

## [要素名 / セクション名]

- **トリガー:** scroll / hover / click / viewport-enter / time
- **トリガー詳細:** (例: IntersectionObserver threshold: 0.3 / scroll position: 500px / hover on parent)
- **アニメーションタイプ:** fade-in / slide-up / slide-down / slide-left / slide-right / scale / rotate / parallax / pin / frame-sequence / color-shift / clip-path-reveal
- **開始状態:** (例: opacity: 0, translateY: 40px, scale: 0.95)
- **終了状態:** (例: opacity: 1, translateY: 0, scale: 1)
- **duration:** (例: 0.8s)
- **easing:** (例: cubic-bezier(0.22, 1, 0.36, 1) / ease-out / spring)
- **delay:** (例: 0s)
- **stagger:** (例: 0.1s per child / none)
- **scrub:** true / false (スクロール位置に連動するか)
- **pin:** true / false (セクションがピン留めされるか)
- **prefers-reduced-motion fallback:** (例: instant opacity transition / no animation)
- **実装方針:** GSAP ScrollTrigger / Motion useInView / Motion useScroll+useTransform / CSS animation / CSS transition
- **対象コンポーネント:** (例: ScrollReveal / ParallaxLayer / StickySection / StaggerContainer / custom)
- **備考:** (特殊な挙動、依存関係、注意点)

---

## 記入例: ヒーローテキスト フェードイン

- **トリガー:** viewport-enter
- **トリガー詳細:** IntersectionObserver threshold: 0.1
- **アニメーションタイプ:** fade-in + slide-up
- **開始状態:** opacity: 0, translateY: 32px
- **終了状態:** opacity: 1, translateY: 0
- **duration:** 0.7s
- **easing:** cubic-bezier(0.22, 1, 0.36, 1)
- **delay:** 0s
- **stagger:** 0.08s per child (h1, p, button)
- **scrub:** false
- **pin:** false
- **prefers-reduced-motion fallback:** instant opacity: 1, no transform
- **実装方針:** Motion useInView + StaggerContainer
- **対象コンポーネント:** StaggerContainer + ScrollReveal
- **備考:** なし
