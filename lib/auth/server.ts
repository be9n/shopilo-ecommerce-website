"use server";

import { AUTH_TOKEN_KEY, USER_DATA_KEY } from "@/constants";
import { User } from "@/types/auth";
import { cookies } from "next/headers";

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

export async function setAuthCookies(token: string, userData: User) {
  const cookieStore = await cookies();
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  cookieStore.set(AUTH_TOKEN_KEY, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
    expires,
  });

  cookieStore.set(USER_DATA_KEY, JSON.stringify(userData), {
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
    expires,
  });
}

export async function getAuthToken() {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_TOKEN_KEY)?.value;
}

export async function getServerUserData(): Promise<User | null> {
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

export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_TOKEN_KEY);
  cookieStore.delete(USER_DATA_KEY);
}
