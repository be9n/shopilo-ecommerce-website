import axios from "axios";
import { clearAuthCookies } from "./client";
import { ApiError, AuthResponse, LoginCredentials } from "./types";
import { redirect } from "next/navigation";
import { getAccessToken } from "./server";

const API_URL = "http://localhost:8000/api/customer";

// Create axios instance with baseURL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add interceptor to handle auth token
api.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status == 401 || error.response?.status == 403) {
      if (typeof window !== "undefined") {
        window.location.href = "/logout";
      } else {
        redirect("/logout");
      }
    }

    if (axios.isAxiosError(error) && error.response) {
      const apiError = error.response.data as ApiError;
      return Promise.reject(apiError);
    }

    return Promise.reject(error);
  }
);

// Auth API functions
export async function loginUser(
  credentials: LoginCredentials
): Promise<AuthResponse["data"]> {
  try {
    const { data: response } = await api.post<AuthResponse>(
      "/auth/login",
      credentials
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function logoutUser(): Promise<void> {
  try {
    await api.post("/auth/logout");
  } catch (error: unknown) {
    console.error("Logout error:", error);
  } finally {
    clearAuthCookies();
  }
}

// Function to check if user is authenticated on the server side
export async function checkAuthStatus(): Promise<boolean> {
  try {
    await api.get("/auth/check");
    return true;
  } catch {
    return false;
  }
}

// Create a function that can be used for authenticated API calls
export default api;

// Export a wrapper for server-side API calls
export async function serverSideApiCall(
  endpoint: string,
  token: string | null,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  data?: Record<string, unknown>
) {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers,
      ...(data && { body: JSON.stringify(data) }),
    });
    console.log(response);

    // Handle 401 errors
    if (response.status === 401) {
      return {
        success: false,
        message: "Unauthorized",
        code: 401,
      };
    }

    return await response.json();
  } catch (error) {
    console.error("Server side API call failed", error);
    return {
      success: false,
      message: "Network error",
    };
  }
}
