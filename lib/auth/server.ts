"use server";

import { cookies } from "next/headers";
import { USER_DATA_KEY } from "./client";

// Auth token cookie key

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

  cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
    sameSite: "strict",
  });
}

/**
 * Get the authentication token from HTTP-only cookie
 */
export async function getAuthToken() {
  const cookieStore = await cookies();
  return cookieStore.get("auth_token")?.value;
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
  cookieStore.delete("auth_token");
  cookieStore.delete(USER_DATA_KEY);
}
