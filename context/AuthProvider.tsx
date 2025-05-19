"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthState } from "../lib/auth/types";
import { setAuthCookies, getAuthToken, getUserData } from "../lib/auth/client";
import api, { loginUser, logoutUser } from "../lib/auth/api";
import { LoginFormValues } from "../lib/schemas/auth";

interface AuthContextType extends AuthState {
  login: (credentials: LoginFormValues) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const initialAuthState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>(initialAuthState);
  const router = useRouter();

  // Initialize auth state from cookies
  useEffect(() => {
    const token = getAuthToken();
    const userData = getUserData();

    if (token && userData) {
      setAuthState({
        user: userData,
        accessToken: token,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setAuthState({
        ...initialAuthState,
        isLoading: false,
      });
    }
  }, []);

  // Login function
  const login = async (credentials: LoginFormValues): Promise<void> => {
    try {
      const data = await loginUser(credentials);

      const { user, access_token } = data;

      setAuthState((prev) => ({
        ...prev,
        user,
        accessToken: access_token,
        isAuthenticated: true,
      }));

      // Store in cookies
      setAuthCookies(access_token, user);
    } catch (error) {
      throw error;
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    await logoutUser();
    setAuthState({
      ...initialAuthState,
      isLoading: false,
    });
    router.push("/login");
  };

  // Refresh user data
  const refreshUser = async (): Promise<void> => {
    if (!authState.accessToken) return;

    try {
      const { data } = await api.get("/auth/me");
      if (data.success && data.data.user) {
        setAuthState((prev) => ({
          ...prev,
          user: data.data.user,
        }));

        // Update user in cookies
        setAuthCookies(authState.accessToken, data.data.user);
      }
    } catch {
      // Error handling is already in the interceptor
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
