"use client";

import { ReactNode } from "react";
import AOSProvider from "./AOSProvider";
import { AuthProvider } from "@/context/AuthProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AOSProvider>
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
      >
        <AuthProvider>{children}</AuthProvider>
      </GoogleOAuthProvider>
    </AOSProvider>
  );
}
