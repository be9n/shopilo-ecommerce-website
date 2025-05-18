import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import AOSProvider from "./AOSProvider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <NextIntlClientProvider>
      <AOSProvider>{children}</AOSProvider>
    </NextIntlClientProvider>
  );
}
