import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import AOSProvider from "./AOSProvider";
import { AuthProvider } from "@/context/AuthProvider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <NextIntlClientProvider>
      <AOSProvider>
        <AuthProvider>{children}</AuthProvider>
      </AOSProvider>
    </NextIntlClientProvider>
  );
}
