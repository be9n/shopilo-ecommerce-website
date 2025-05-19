"use server";

import { cookies } from "next/headers";
import { User } from "./types";
import { AUTH_TOKEN_KEY, USER_DATA_KEY } from "./client";

/**
 * Server-side function to get the current authentication state
 */
export async function getServerAuthState() {
  const { token, userData } = await getServerSideCookies();
  const isAuthenticated = !!token && !!userData;

  return {
    isAuthenticated,
    user: userData,
    token,
  };
}

// Server-side cookie helpers
export async function getServerSideCookies(): Promise<{
  token: string | null;
  userData: User | null;
}> {
  const token = await getAccessToken();
  const userData = await getUserData();

  return {
    token: token || null,
    userData: userData || null,
  };
}

export const getAccessToken = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_TOKEN_KEY)?.value;

  return token;
};

const getUserData = async () => {
  const cookieStore = await cookies();
  const userDataStr = cookieStore.get(USER_DATA_KEY)?.value || null;

  try {
    const userData = userDataStr ? JSON.parse(userDataStr) : null;

    return userData;
  } catch {
    await clearServerAuthState();
  }
};

export async function clearServerAuthState() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
  cookieStore.delete("user_data");
}
