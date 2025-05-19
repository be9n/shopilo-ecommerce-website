import Cookies from "js-cookie";
import { User } from "./types";

export const AUTH_TOKEN_KEY = "auth_token";
export const USER_DATA_KEY = "user_data";

// Cookie options for better security
const cookieOptions = {
  expires: 7, // 7 days
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
};

export function setAuthCookies(token: string, userData: User) {
  Cookies.set(AUTH_TOKEN_KEY, token, cookieOptions);
  Cookies.set(USER_DATA_KEY, JSON.stringify(userData), cookieOptions);
}

export function getAuthToken() {
  return Cookies.get(AUTH_TOKEN_KEY);
}

export function getUserData(): User | null {
  const userDataStr = Cookies.get(USER_DATA_KEY);
  if (!userDataStr) return null;

  try {
    return JSON.parse(userDataStr);
  } catch {
    clearAuthCookies();
    return null;
  }
}

export function clearAuthCookies() {
  Cookies.remove(AUTH_TOKEN_KEY, { path: "/" });
  Cookies.remove(USER_DATA_KEY, { path: "/" });
}
