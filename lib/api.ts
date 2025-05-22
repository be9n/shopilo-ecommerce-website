import axios from "axios";
import { redirect } from "next/navigation";
import { getAuthToken } from "./auth/server";
import { ApiError } from "@/types/global";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/customer";

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
    const token = await getAuthToken();
    console.log(API_URL);

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
    if (error.response?.status === 401) {
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

export default api;
