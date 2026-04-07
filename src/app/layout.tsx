import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Serif_JP, Noto_Sans_JP } from "next/font/google";
import { SmoothScroll } from "@/components/animation/smooth-scroll";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const siteUrl = "https://ai-website-cloner-flax.vercel.app";
const siteTitle = "和泉出版印刷株式会社 | 想いを整理整頓しませんか";
const siteDescription =
  "大阪府和泉市の印刷会社。冊子制作・自分史・終活整理のための印刷物を、デザインから製本まで一貫対応。1979年創業。";
const ogImage = `${siteUrl}/images/bookshelf.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "和泉出版印刷",
    "和泉市 印刷",
    "大阪 印刷会社",
    "自分史",
    "終活",
    "冊子制作",
    "自費出版",
    "印刷",
  ],
  authors: [{ name: "和泉出版印刷株式会社" }],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    siteName: "和泉出版印刷株式会社",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: ogImage,
        width: 1024,
        height: 1024,
        alt: "和泉出版印刷株式会社 - 想いを整理整頓しませんか",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${notoSerifJP.variable} ${notoSansJP.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
