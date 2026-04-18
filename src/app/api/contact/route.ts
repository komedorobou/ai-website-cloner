import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const TO_EMAIL = "komedorobouinuzini@yahoo.co.jp";
const CC_EMAILS = ["komedorobouinuzini@gmail.com"]; // backup
const FROM_EMAIL = "ツキガク×サイト <info@tsukigaku.com>";

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Mail service not configured" },
      { status: 500 },
    );
  }
  const resend = new Resend(apiKey);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, business, email, message } = (body ?? {}) as {
    name?: string;
    business?: string;
    email?: string;
    message?: string;
  };

  if (!name || !email) {
    return NextResponse.json(
      { error: "お名前とメールアドレスは必須です" },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "メールアドレスの形式が正しくありません" },
      { status: 400 },
    );
  }

  const safeName = escapeHtml(name).slice(0, 200);
  const safeBusiness = escapeHtml(business ?? "（未入力）").slice(0, 200);
  const safeEmail = escapeHtml(email).slice(0, 200);
  const safeMessage = escapeHtml(message ?? "（未入力）").slice(0, 5000);

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Hiragino Sans', sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #111;">
      <h2 style="font-size: 18px; margin: 0 0 16px;">ツキガク×サイトに新規お問い合わせ</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding: 8px 0; color: #666; width: 110px;">お名前</td><td style="padding: 8px 0;">${safeName}</td></tr>
        <tr><td style="padding: 8px 0; color: #666;">業種・店舗名</td><td style="padding: 8px 0;">${safeBusiness}</td></tr>
        <tr><td style="padding: 8px 0; color: #666;">メール</td><td style="padding: 8px 0;"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
      </table>
      <h3 style="font-size: 14px; margin: 24px 0 8px; color: #666;">ご相談内容</h3>
      <div style="white-space: pre-wrap; padding: 16px; background: #f6f6f6; border-radius: 8px; font-size: 14px; line-height: 1.7;">${safeMessage}</div>
      <p style="margin-top: 24px; font-size: 12px; color: #999;">— ツキガク×サイト 自動配信</p>
    </div>
  `;

  const text = [
    "ツキガク×サイトに新規お問い合わせ",
    "",
    `お名前: ${name}`,
    `業種・店舗名: ${business ?? "（未入力）"}`,
    `メール: ${email}`,
    "",
    "ご相談内容:",
    message ?? "（未入力）",
  ].join("\n");

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      cc: CC_EMAILS,
      replyTo: email,
      subject: `【ツキガク×サイト】新規お問い合わせ（${name}様）`,
      html,
      text,
    });

    if (result.error) {
      console.error("Resend error:", result.error);
      return NextResponse.json(
        { error: "送信に失敗しました。時間をおいて再度お試しください。" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Mail send exception:", err);
    return NextResponse.json(
      { error: "送信に失敗しました。時間をおいて再度お試しください。" },
      { status: 500 },
    );
  }
}
