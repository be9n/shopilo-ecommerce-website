"use client";

import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthProvider";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { usePathname } from "@/i18n/navigation";
import { ApiError } from "@/types/global";

export default function GoogleLoginButton({
  setIsSocialLoading,
  setError,
}: {
  setIsSocialLoading: (isSocialLoading: boolean) => void;
  setError: (error: string | null) => void;
}) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { signin } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPath = usePathname();
  const callbackUrl = searchParams?.get("callbackUrl") || currentPath;

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setIsAuthenticating(true);
        await signin({ type: "social", provider: "google", token: tokenResponse.access_token });

        router.push(decodeURI(callbackUrl));
      } catch (error) {
        const apiError = error as ApiError;

        setError(apiError.message || "Login failed. Please try again.");
      } finally {
        setIsSocialLoading(false);
        setIsAuthenticating(false);
      }
    },
    onError: () => {
      setIsSocialLoading(false);
      setIsAuthenticating(false);
    },
    onNonOAuthError: () => {
      setIsSocialLoading(false);
      setIsAuthenticating(false);
    },
  });

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full cursor-pointer"
      onClick={() => {
        setError(null);
        setIsSocialLoading(true);
        login();
      }}
    >
      {isAuthenticating ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        "Login with Google"
      )}
    </Button>
  );
}
