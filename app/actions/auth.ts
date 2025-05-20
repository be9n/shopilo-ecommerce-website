import api from "@/lib/api";
import { setAuthCookie, clearAuthCookies } from "@/lib/auth/server";
import { LoginFormValues } from "@/lib/schemas/auth";
import { User } from "@/lib/auth/types";

export async function login(credentials: LoginFormValues): Promise<User> {
  const { data: response } = await api.post(
    "/auth/login",
    credentials
  );

  // Set HTTP-only auth cookie
  await setAuthCookie(response.data.access_token);

  return response.data.user;
}

export async function logout() {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    await clearAuthCookies();
  }
}

export async function getUser() {
  const { data: response } = await api.get("/auth/me");
  return response.data.user;
}
