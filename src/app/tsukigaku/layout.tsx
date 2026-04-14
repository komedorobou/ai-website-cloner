import type { Metadata } from "next";

const siteUrl = "https://ai-website-cloner-flax.vercel.app/tsukigaku";

export const metadata: Metadata = {
  title: "ツキガクサイト | 月額9,800円のWeb制作",
  description:
    "初期費用0円・月額9,800円で完全オーダーメイドのWebサイトを制作。アニメーション標準搭載、スマホ完全対応、ホスティング・SSL込み。飲食店・美容室・クリニック・カフェなど店舗向け。",
  keywords: [
    "ツキガクサイト",
    "月額 ホームページ制作",
    "サブスク Web制作",
    "店舗 ホームページ",
    "飲食店 HP",
    "美容室 HP",
    "クリニック HP",
    "初期費用0円 HP",
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    siteName: "ツキガクサイト",
    title: "ツキガクサイト | 月額9,800円のWeb制作",
    description:
      "初期費用0円・月額9,800円で完全オーダーメイドのWebサイトを制作。アニメーション標準搭載、スマホ完全対応。",
    images: [
      {
        url: "https://ai-website-cloner-flax.vercel.app/images/tsukigaku/macbook-mockup.png",
        width: 1200,
        height: 630,
        alt: "ツキガクサイト - 月額9,800円のWeb制作",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ツキガクサイト | 月額9,800円のWeb制作",
    description:
      "初期費用0円・月額9,800円で完全オーダーメイドのWebサイトを制作。",
    images: [
      "https://ai-website-cloner-flax.vercel.app/images/tsukigaku/macbook-mockup.png",
    ],
  },
};

export default function TsukigakuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
