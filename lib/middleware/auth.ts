import { NextRequest, NextResponse } from "next/server";
import { publicRoutes, protectedRoutes } from "@/constants";
import { getServerAuthState, clearAuthCookies } from "@/lib/auth/server";
import { routing } from "@/i18n/routing";

export async function authMiddleware(
  request: NextRequest
): Promise<NextResponse | undefined> {
  let fallbackUrl = new URL("/", request.url);
  const pathname = request.nextUrl.pathname;

  // Handle path with or without locale
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

  if (
    !isAuthenticated &&
    protectedRoutes.some((route) => path.startsWith(route))
  ) {
    // Redirect unauthenticated users to login
    await clearAuthCookies();
    fallbackUrl = setResyncUserState(fallbackUrl);
    fallbackUrl = setCallbackUrl(fallbackUrl, request.url);
    return NextResponse.redirect(fallbackUrl);
  }

  // Handle logout
  if (path === "/logout") {
    await clearAuthCookies();
    fallbackUrl = setResyncUserState(fallbackUrl);
    return NextResponse.redirect(fallbackUrl);
  }
}

const setResyncUserState = (url: URL) => {
  url.searchParams.set("resyncUserState", "true");
  return url;
};

const setCallbackUrl = (url: URL, requestUrl: string) => {
  url.searchParams.set("callbackUrl", encodeURI(requestUrl));
  return url;
};
