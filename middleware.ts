import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { clearServerAuthState, getServerAuthState } from "./lib/auth/server";

const intlMiddleware = createMiddleware(routing);

// Public routes that don't require authentication
const publicRoutes = ["/login", "/register", "/forgot-password"];

// Protected routes that require authentication
const protectedRoutes = ["/account", "/orders", "/checkout"];

export async function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  // Get path without locale
  const pathname = request.nextUrl.pathname;

  const pathnameHasLocale = routing.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Extract path without locale prefix
  const path = pathnameHasLocale ? pathname.replace(/^\/[^/]+/, "") : pathname;

  // Check if token exists
  // const token = request.cookies.get("auth_token");
  const { isAuthenticated } = await getServerAuthState();

  // Handle auth redirection
  if (isAuthenticated && publicRoutes.some((route) => path.startsWith(route))) {
    // Redirect authenticated users away from login/register pages
    const url = new URL("/", request.url);
    return NextResponse.redirect(url);
  }

  if (
    !isAuthenticated &&
    protectedRoutes.some((route) => path.startsWith(route))
  ) {
    await clearServerAuthState();
    // Redirect unauthenticated users to login
    const url = new URL("/login", request.url);
    // url.searchParams.set("callbackUrl", encodeURI(request.url));
    return NextResponse.redirect(url);
  }

  if (path === "/logout") {
    await clearServerAuthState();
    const url = new URL("/login", request.url);
    return NextResponse.redirect(url);
  }
  return response;
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
