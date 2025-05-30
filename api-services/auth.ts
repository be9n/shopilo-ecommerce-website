import api from "@/lib/api";
import { clearAuthCookies } from "@/lib/auth/server";
import { LoginFormValues } from "@/lib/schemas/auth";
import { LoginResponse } from "@/types/auth";

export async function login(
  credentials: LoginFormValues
): Promise<LoginResponse> {
  const { data: response } = await api.post("/auth/login", credentials);

  return response;
}

export async function socialLogin(
  provider: string,
  token: string
): Promise<LoginResponse> {
  const { data: response } = await api.get(`/auth/social/${provider}`, {
    params: {
      token,
    },
  });

  return response;
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
