"use server";

import { cookies } from "next/headers";
import { USER_DATA_KEY } from "./client";

// Auth token cookie key
const AUTH_TOKEN_KEY = "auth_token";

/**
 * Get the current authentication state from server cookies
 */
export async function getServerAuthState() {
  const token = await getAuthToken();
  const userData = await getServerUserData();
  const isAuthenticated = !!token && !!userData;

  return {
    isAuthenticated,
    user: userData,
    token,
  };
}

/**
 * Set HTTP-only cookie containing the auth token
 * This is more secure as JavaScript cannot access it
 */
export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();

  cookieStore.set(AUTH_TOKEN_KEY, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
    sameSite: "lax",
  });
}

/**
 * Get the authentication token from HTTP-only cookie
 */
export async function getAuthToken() {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_TOKEN_KEY)?.value;
}

/**
 * Get all auth cookies as header string for forwarding to API
 * Used for server components to forward cookies to backend
 */
export async function getAuthCookieHeader(): Promise<string> {
  const cookieStore = await cookies();
  const authToken = cookieStore.get(AUTH_TOKEN_KEY);

  if (!authToken) return "";

  return `${AUTH_TOKEN_KEY}=${authToken.value}`;
}

/**
 * Get user data from server-side cookies
 */
async function getServerUserData() {
  const cookieStore = await cookies();
  const userDataStr = cookieStore.get(USER_DATA_KEY)?.value;

  if (!userDataStr) return null;

  try {
    return JSON.parse(userDataStr);
  } catch {
    await clearAuthCookies();
    return null;
  }
}

/**
 * Clear all authentication cookies
 */
export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_TOKEN_KEY);
  cookieStore.delete(USER_DATA_KEY);
}
