import axios from "axios";
import { clearClientCookies } from "./client";
import { ApiError, AuthResponse, LoginCredentials } from "./types";
import { redirect } from "next/navigation";
import { getAuthToken } from "./server";

const API_URL = "http://localhost:8000/api/customer";

// Create axios instance with baseURL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  // Include cookies in requests
  withCredentials: true,
});

// Handle auth token in requests
api.interceptors.request.use(
  async (config) => {
    // Token is sent automatically via HTTP-only cookie
    // Adding to header for APIs that expect it there
    const token = await getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle authentication errors
    if (error.response?.status === 401 || error.response?.status === 403) {
      redirect("/logout");
    }

    // Format API errors
    if (axios.isAxiosError(error) && error.response) {
      const apiError = error.response.data as ApiError;
      return Promise.reject(apiError);
    }

    return Promise.reject(error);
  }
);

/**
 * Authenticate user with credentials
 */
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

/**
 * Log user out
 */
export async function logoutUser(): Promise<void> {
  try {
    await api.post("/auth/logout");
  } catch (error: unknown) {
    console.error("Logout error:", error);
  } finally {
    clearClientCookies();
  }
}

/**
 * Check if user is authenticated
 */
export async function checkAuthStatus(): Promise<boolean> {
  try {
    await api.get("/auth/check");
    return true;
  } catch {
    return false;
  }
}

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
      credentials: "include", // Include cookies in the request
      ...(data && { body: JSON.stringify(data) }),
    });

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
