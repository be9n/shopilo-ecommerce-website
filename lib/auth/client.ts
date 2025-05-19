import Cookies from "js-cookie";
import { User } from "./types";

export const USER_DATA_KEY = "user_data";

// Cookie options for better security
const cookieOptions = {
  expires: 7, // 7 days
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
};

/**
 * Store user data in client-accessible cookies
 * Auth token is stored in HTTP-only cookies via server actions
 */
export function setUserCookie(userData: User): void {
  Cookies.set(USER_DATA_KEY, JSON.stringify(userData), cookieOptions);
}

/**
 * Get user data from client-side cookies
 */
export function getUserData(): User | null {
  const userDataStr = Cookies.get(USER_DATA_KEY);
  if (!userDataStr) return null;

  try {
    return JSON.parse(userDataStr);
  } catch {
    clearClientCookies();
    return null;
  }
}

/**
 * Clear client-side auth cookies
 */
export function clearClientCookies(): void {
  Cookies.remove(USER_DATA_KEY, { path: "/" });
}
