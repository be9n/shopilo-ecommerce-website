"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthState, User } from "@/lib/auth/types";
import { getUserData, setUserCookie } from "@/lib/auth/client";
import api from "@/lib/auth/api";
import { serverLogout } from "@/app/actions/auth";

interface AuthContextType extends AuthState {
  setUserData: (user: User) => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const initialAuthState: AuthState = {
  user: null,
  isLoading: true,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>(initialAuthState);
  const searchParams = useSearchParams();
  const resyncUserState = searchParams.get("resync_user_state");
  const router = useRouter();

  // Initialize auth state from cookies
  useEffect(() => {
    syncUserState();
  }, []);

  useEffect(() => {
    if (resyncUserState === "true") {
      syncUserState();
    }
  }, [resyncUserState]);

  const syncUserState = async () => {
    const userData = getUserData();

    if (userData) {
      setAuthState({
        user: userData,
        isLoading: false,
      });
    } else {
      setAuthState({
        ...initialAuthState,
        isLoading: false,
      });
    }
  };

  // Set user data from server login result
  const setUserData = (user: User): void => {
    // Update client state
    setAuthState({
      user,
      isLoading: false,
    });

    // Store user data in client cookie
    setUserCookie(user);
  };

  // Logout user
  const logout = async (): Promise<void> => {
    try {
      // Use server action to logout and clear HTTP-only cookies
      await serverLogout();

      // Clear client-side state and cookies
      setAuthState({
        ...initialAuthState,
        isLoading: false,
      });

      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      setAuthState({
        ...initialAuthState,
        isLoading: false,
      });
    }
  };

  // Refresh user data
  const refreshUser = async (): Promise<void> => {
    if (!authState.user) return;

    try {
      const { data } = await api.get("/auth/me");
      if (data.success && data.data.user) {
        const user = data.data.user;

        // Update state and cookies
        setAuthState((prev) => ({
          ...prev,
          user,
        }));
        setUserCookie(user);
      }
    } catch {
      // Error handling is already in the interceptor
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        setUserData,
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
