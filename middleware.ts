import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { clearAuthCookies, getServerAuthState } from "./lib/auth/server";

// Create internationalization middleware
const intlMiddleware = createMiddleware(routing);

// Routes that don't require authentication
const publicRoutes = ["/login", "/register", "/forgot-password"];

// Routes that require authentication
const protectedRoutes = ["/account", "/orders", "/checkout"];

export async function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  // Handle path with or without locale
  const pathname = request.nextUrl.pathname;
  const hasLocale = routing.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  const path = hasLocale ? pathname.replace(/^\/[^/]+/, "") : pathname;

  // Check authentication status
  const { isAuthenticated } = await getServerAuthState();

  // Handle authentication redirects
  if (isAuthenticated && publicRoutes.some((route) => path.startsWith(route))) {
    // Redirect authenticated users away from login pages
    return NextResponse.redirect(new URL("/", request.url));
  }

  const homeUrl = new URL("/", request.url);

  if (
    !isAuthenticated &&
    protectedRoutes.some((route) => path.startsWith(route))
  ) {
    // Redirect unauthenticated users to login
    await clearAuthCookies();
    homeUrl.searchParams.set("resync_user_state", "true");
    homeUrl.searchParams.set("callbackUrl", encodeURI(request.url));
    return NextResponse.redirect(homeUrl);
  }

  // Handle logout
  if (path === "/logout") {
    await clearAuthCookies();
    homeUrl.searchParams.set("resync_user_state", "true");
    return NextResponse.redirect(homeUrl);
  }

  return response;
}

// Configure middleware to run on all non-static routes
export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
