import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { authMiddleware } from "./lib/middleware/auth";

// Create internationalization middleware
const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  // Check authentication first
  const authResponse = await authMiddleware(request);
  if (authResponse) {
    return authResponse;
  }

  // Handle internationalization if auth check passes
  const response = intlMiddleware(request);
  return response;
}

// Configure middleware to run on all non-static routes
export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
