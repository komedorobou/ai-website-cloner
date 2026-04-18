import { NextResponse, type NextRequest } from "next/server";

// tsukigaku.com (and www.tsukigaku.com) → internally serve /tsukigaku
// All other hosts (vercel preview URLs, ai-website-cloner-flax.vercel.app, etc.) keep default routing.
export function middleware(req: NextRequest) {
  const host = (req.headers.get("host") ?? "").toLowerCase();
  const isTsukigakuHost =
    host === "tsukigaku.com" || host === "www.tsukigaku.com";

  if (!isTsukigakuHost) return NextResponse.next();

  const { pathname } = req.nextUrl;

  // Allow Next internals, API, static assets, and the existing /tsukigaku tree.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/videos") ||
    pathname.startsWith("/seo") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname.startsWith("/tsukigaku")
  ) {
    return NextResponse.next();
  }

  // Rewrite root (and any other path under tsukigaku.com) to the /tsukigaku tree.
  const url = req.nextUrl.clone();
  url.pathname = pathname === "/" ? "/tsukigaku" : `/tsukigaku${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
