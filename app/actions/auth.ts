"use server";

import {
  loginUser as apiLoginUser,
  logoutUser as apiLogoutUser,
} from "@/lib/auth/api";
import { setAuthCookie, clearAuthCookies } from "@/lib/auth/server";
import { LoginFormValues } from "@/lib/schemas/auth";
import { ApiError, User } from "@/lib/auth/types";

// Server login response types
interface LoginSuccess {
  success: true;
  user: User;
}

interface LoginFailure {
  success: false;
  error: string;
}

type LoginResult = LoginSuccess | LoginFailure;

/**
 * Server action to authenticate a user
 */
export async function serverLogin(
  credentials: LoginFormValues
): Promise<LoginResult> {
  try {
    // Call API to authenticate user
    const data = await apiLoginUser(credentials);

    // Set HTTP-only auth cookie
    await setAuthCookie(data.access_token);

    return {
      success: true,
      user: data.user,
    };
  } catch (error) {
    console.error("Login error:", error);
    const apiError = error as ApiError;
    return {
      success: false,
      error: apiError.message || "Authentication failed",
    };
  }
}

/**
 * Server action to logout a user
 */
export async function serverLogout() {
  // Call API logout endpoint
  await apiLogoutUser();

  // Clear all auth cookies
  await clearAuthCookies();
}
