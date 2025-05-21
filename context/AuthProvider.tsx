"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthState, LoginResponse } from "@/types/auth";
import { login, logout, socialLogin } from "@/api-services/auth";
import { getServerUserData, setAuthCookies } from "@/lib/auth/server";
import { LoginFormValues } from "@/lib/schemas/auth";

type SignInParams =
  | { type: "credentials"; credentials: LoginFormValues }
  | { type: "social"; provider: string; token: string };

interface AuthContextType extends AuthState {
  signout: () => Promise<void>;
  signin: (params: SignInParams) => Promise<void>;
}

const initialAuthState: AuthState = {
  user: null,
  isLoading: true,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>(initialAuthState);
  const searchParams = useSearchParams();
  const resyncUserState = searchParams?.get("resyncUserState");
  const router = useRouter();

  useEffect(() => {
    syncUserState();
  }, []);

  useEffect(() => {
    if (resyncUserState === "true") {
      syncUserState();
    }
  }, [resyncUserState]);

  const syncUserState = async () => {
    const userData = await getServerUserData();

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

  const loginStrategies = {
    credentials: async (
      credentials: LoginFormValues
    ): Promise<LoginResponse> => {
      return await login(credentials);
    },
    social: async (provider: string, token: string): Promise<LoginResponse> => {
      return await socialLogin(provider, token);
    },
  };

  const signin = async (params: SignInParams): Promise<void> => {
    let response: LoginResponse;

    if (params.type === "credentials") {
      response = await loginStrategies.credentials(params.credentials);
    } else {
      response = await loginStrategies.social(params.provider, params.token);
    }

    await setAuthCookies(response.data.access_token, response.data.user);

    setAuthState({
      user: response.data.user,
      isLoading: false,
    });
  };

  const signout = async (): Promise<void> => {
    try {
      await logout();

      setAuthState({
        ...initialAuthState,
        isLoading: false,
      });

      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
      setAuthState({
        ...initialAuthState,
        isLoading: false,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        signout,
        signin,
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
