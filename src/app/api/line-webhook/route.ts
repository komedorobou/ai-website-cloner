import { NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";

const CHANNEL_SECRET = process.env.LINE_CHANNEL_SECRET || "";
const ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN || "";
const OWNER_USER_ID = process.env.LINE_OWNER_USER_ID || "";

const PREFECTURES = [
  "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
  "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
  "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県",
  "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県",
  "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県",
  "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県",
  "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県",
];

const PREFECTURE_REGEX = new RegExp(PREFECTURES.join("|"));

const GREETING_MESSAGE = `ツキガク×サイトを友だち追加いただき、
ありがとうございます。

30秒で完了する無料診断のために、
1つだけ教えてください。

あなたのお店の業種に近い番号を、
そのまま返信してください。

①飲食店（カフェ・レストラン・居酒屋・バー）
②美容・エステ・サロン・ネイル
③ケーキ屋・パン屋・和菓子・洋菓子
④クリニック・整骨院・治療院
⑤士業・コンサル・教室
⑥物販・セレクトショップ
⑦その他

例）「3」と送るだけでOKです。`;

const INDUSTRY_RESPONSES: Record<string, string> = {
  "1": `ありがとうございます。
飲食店ですね。

飲食店のHPで最も重要なのは、
「予約ボタン」と「お店の世界観」です。

・Googleで「地域名＋飲食店の種類」で検索する人の76％は、24時間以内に来店します。

・ただし、HPが古い・スマホで見づらいと、その場で別の店を選びます。

ツキガクのサンプルを、1つだけお送りします。
※岸和田の架空カフェ「Kishiwada Roastery」（公開準備中）

あと2つだけ教えてください。

①お店のある都道府県・市区町村
②お店の名前

お答えいただいたら、24時間以内にあなたのお店に合わせた診断結果をお送りします。`,
  "2": `ありがとうございます。
美容・サロン系ですね。

美容系のHPで最も重要なのは、
「予約しやすさ」と「施術者の顔」です。

・美容系を探す人の88％がスマホで検索しています。

・予約ボタンが見つからないと、その場でホットペッパーに行きます。

ツキガクのサンプルを、1つだけお送りします。
※岸和田の架空サロン「SUMIRE Hair & Spa」（公開準備中）

あと2つだけ教えてください。

①お店のある都道府県・市区町村
②お店の名前

お答えいただいたら、24時間以内に診断結果をお送りします。`,
  "3": `ありがとうございます。
スイーツ・ベーカリー系ですね。

この業種のHPは、
「商品の写真の見せ方」が売上を決めます。

・スマホで画像が大きく、美しく表示されるだけで来店率が変わります。

・予約・ギフト対応・季節商品の告知ができるかで、リピーター数が倍変わります。

ツキガクのサンプルを、1つだけお送りします。
※岸和田の架空洋菓子店「Patisserie Kimura」（公開準備中）

あと2つだけ教えてください。

①お店のある都道府県・市区町村
②お店の名前

お答えいただいたら、24時間以内に診断結果をお送りします。`,
  "4": `ありがとうございます。
医療・治療院系ですね。

この業種のHPは、
「信頼感」と「症状別の説明」が全てです。

・「地域名＋症状」で検索する人は、HPの情報量で来院先を決めます。

・古いHPだと「この先生、大丈夫かな」と不安を持たれます。

ツキガクのサンプルを、1つだけお送りします。
※架空の整骨院「岸和田こころ整骨院」（公開準備中）

あと2つだけ教えてください。

①お店のある都道府県・市区町村
②お店・院の名前

お答えいただいたら、24時間以内に診断結果をお送りします。`,
  "5": `ありがとうございます。
士業・教室系ですね。

この業種のHPは、
「専門性の見せ方」と「実績」が信頼を作ります。

・税理士・行政書士・塾などは、ホームページで「先生の顔」と「得意分野」が明確なほど選ばれます。

・問い合わせフォームが重要です。

ツキガクのサンプルを、1つだけお送りします。
※架空の税理士事務所「北又税理士事務所」（公開準備中）

あと2つだけ教えてください。

①事務所のある都道府県・市区町村
②事務所・屋号の名前

お答えいただいたら、24時間以内に診断結果をお送りします。`,
  "6": `ありがとうございます。
物販系ですね。

この業種のHPは、
「世界観」と「オンラインストア導線」が鍵です。

・お店の雰囲気がHPで伝わるかで、わざわざ足を運ぶ理由が変わります。

・Instagram連携、ECへの誘導も設計次第で売上が変わります。

ツキガクのサンプルを、1つだけお送りします。
※架空のセレクトショップ「岸和田 古道具 椿」（公開準備中）

あと2つだけ教えてください。

①お店のある都道府県・市区町村
②お店の名前

お答えいただいたら、24時間以内に診断結果をお送りします。`,
  "7": `ありがとうございます。
「その他」を選ばれた方のために、少しお話を聞かせてください。

2つだけ教えてください。

①お仕事・業種（自由にお書きください）
②お店・会社・屋号の名前

いただいた内容を拝見して、24時間以内にあなたに合わせた診断結果をお送りします。`,
};

const INDUSTRY_LABELS: Record<string, string> = {
  "1": "①飲食店",
  "2": "②美容・サロン",
  "3": "③ケーキ屋・パン屋",
  "4": "④クリニック・整骨院",
  "5": "⑤士業・教室",
  "6": "⑥物販",
  "7": "⑦その他",
};

const RECEIPT_MESSAGE = `ありがとうございます。
店舗情報を受け取りました。

ただいま、あなたのお店に合わせた
診断結果を作成しています。

24時間以内にお送りしますので、
少々お待ちください。`;

const DEFAULT_RESPONSE = `メッセージありがとうございます。

▼ はじめて診断をご希望の方
①〜⑦の数字をそのまま返信してください。
①飲食店
②美容・サロン
③ケーキ屋・パン屋
④クリニック・整骨院
⑤士業・教室
⑥物販
⑦その他

▼ すでに業種を選んで店舗情報をお送りいただいた方
担当者から24時間以内に診断結果をお送りします。
今しばらくお待ちください。

▼ その他のご質問・ご相談
そのままメッセージいただければ、担当者より24時間以内にご返信いたします。`;

function normalizeNumberKey(text: string): string | null {
  const normalized = text.trim();
  const map: Record<string, string> = {
    "1": "1", "１": "1", "①": "1",
    "2": "2", "２": "2", "②": "2",
    "3": "3", "３": "3", "③": "3",
    "4": "4", "４": "4", "④": "4",
    "5": "5", "５": "5", "⑤": "5",
    "6": "6", "６": "6", "⑥": "6",
    "7": "7", "７": "7", "⑦": "7",
  };
  return map[normalized] ?? null;
}

async function lineReply(replyToken: string, text: string): Promise<void> {
  const response = await fetch("https://api.line.me/v2/bot/message/reply", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      replyToken,
      messages: [{ type: "text", text }],
    }),
  });
  if (!response.ok) {
    console.error("LINE reply failed:", response.status, await response.text());
  }
}

async function linePush(toUserId: string, text: string): Promise<void> {
  if (!toUserId) return;
  const response = await fetch("https://api.line.me/v2/bot/message/push", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: toUserId,
      messages: [{ type: "text", text }],
    }),
  });
  if (!response.ok) {
    console.error("LINE push failed:", response.status, await response.text());
  }
}

async function getProfile(userId: string): Promise<{ displayName?: string } | null> {
  try {
    const response = await fetch(`https://api.line.me/v2/bot/profile/${userId}`, {
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
    });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

function verifySignature(rawBody: string, signature: string): boolean {
  if (!CHANNEL_SECRET || !signature) return false;
  const hmac = crypto.createHmac("SHA256", CHANNEL_SECRET);
  hmac.update(rawBody);
  const expected = hmac.digest("base64");
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}

interface LineEvent {
  type: string;
  replyToken?: string;
  source?: { userId?: string };
  message?: { type?: string; text?: string };
  timestamp?: number;
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-line-signature") || "";

  if (!verifySignature(rawBody, signature)) {
    console.warn("Invalid LINE signature");
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let body: { events?: LineEvent[] };
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const events = body.events ?? [];

  for (const event of events) {
    try {
      if (event.type === "follow" && event.replyToken) {
        await lineReply(event.replyToken, GREETING_MESSAGE);
        continue;
      }

      if (event.type === "message" && event.message?.type === "text" && event.replyToken) {
        const text = event.message.text ?? "";
        const userId = event.source?.userId ?? "";

        const numberKey = normalizeNumberKey(text);
        if (numberKey) {
          await lineReply(event.replyToken, INDUSTRY_RESPONSES[numberKey]);
          continue;
        }

        const prefMatch = text.match(PREFECTURE_REGEX);
        if (prefMatch) {
          await lineReply(event.replyToken, RECEIPT_MESSAGE);

          if (OWNER_USER_ID && userId !== OWNER_USER_ID) {
            const profile = await getProfile(userId);
            const displayName = profile?.displayName ?? "（取得失敗）";
            const notification = `🔔 新しい店舗情報届きました

ユーザー名: ${displayName}
都道府県: ${prefMatch[0]}
本文:
${text}

userId: ${userId}

→ 24時間以内に診断結果を返信してください
管理画面: https://chat.line.biz/account/@569rxqzb`;
            await linePush(OWNER_USER_ID, notification);
          }
          continue;
        }

        await lineReply(event.replyToken, DEFAULT_RESPONSE);
        continue;
      }
    } catch (error) {
      console.error("Event processing error:", error);
    }
  }

  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ ok: true, service: "tsukigaku-line-webhook" });
}
