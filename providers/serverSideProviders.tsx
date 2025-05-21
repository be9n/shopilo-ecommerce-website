import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";

export default function ServerSideProviders({ children }: { children: ReactNode }) {
  return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
}
