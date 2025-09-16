import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

// Define language mappings
const languageMappings: Record<string, string> = {
  "en-US": "en",
  "zh-TW": "zh",
  // jp remains as jp
};

// Define locale codes as used in the URL paths
const locales = ["en", "zh", "jp"];

// Define locale codes for negotiator (browser preferences)
const negotiatorLocales = ["en-US", "zh-TW", "jp"];

function getLocale(request: NextRequest) {
  let headers = {
    "accept-language":
      request.headers.get("accept-language") || "en-US,en;q=0.5",
  };
  let languages = new Negotiator({ headers }).languages();
  let defaultLocale = "en-US";

  // Match using negotiator locales
  const matchedLocale = match(languages, negotiatorLocales, defaultLocale);

  // Convert to URL path locale if needed
  return languageMappings[matchedLocale] || matchedLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // If the request is for the root landing page, redirect to the locale landing page
  if (pathname === "/") {
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}`;
    return NextResponse.redirect(request.nextUrl);
  }

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

  // Check if the request is for an image, video, or other asset
  if (
    pathname.match(/\.(png|jpg|JPG|jpeg|gif|svg|webp|glb|gltf|hdr|ttf|mp4|webm|avi|mov)$/) ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
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
