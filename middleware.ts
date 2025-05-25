import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

let locales = ["en-US", "zh-TW"];

function getLocale(request: NextRequest) {
  let headers = { "accept-language": "en-US,en;q=0.5" };
  let languages = new Negotiator({ headers }).languages();
  let locales = ["en-US", "zh-TW"];
  let defaultLocale = "en-US";

  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if this is an image request and not already in /blog/ path
  if (
    !pathname.startsWith("/blog/") &&
    !pathname.startsWith("/_next/") &&
    !pathname.startsWith("/api/") &&
    !pathname.startsWith("/projects/") &&
    pathname.match(/\.(png|jpg|jpeg|gif|webp)$/i)
  ) {
    // Create the new path with /blog/ prefix
    const newPath = `/blogs${pathname}`;
    console.log(`Redirecting ${pathname} to ${newPath}`);

    // Redirect to the /blog/ prefixed path
    return NextResponse.redirect(new URL(newPath, request.url));
  }

  // Check if the request is for an image or other asset
  if (
    pathname.match(/\.(png|jpg|JPG|jpeg|gif|svg|webp|mp3|wav)$/) ||
    pathname.startsWith("/_next")
  ) {
    return NextResponse.next();
  }

  // Check if there is any supported locale in the pathname
  // const pathnameHasLocale = locales.some(
  //   (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  // );

  // if (pathnameHasLocale) return;

  // Redirect if there is no locale
  // const locale = getLocale(request);
  // request.nextUrl.pathname = `/${locale}${pathname}`;
  // return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Match all paths except for the ones starting with:
    // - api (API routes)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    // - blog (blog paths)
    "/((?!api|_next/static|_next/image|favicon.ico|blog).*)",
  ],
};
