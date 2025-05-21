import type { Metadata } from "next";
import "./globals.css";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { poppins } from "@/lib/fonts";

import "@/app/[locale]/css/banners.css";
import Providers from "@/providers/providers";
import ServerSideProviders from "@/providers/serverSideProviders";

export const metadata: Metadata = {
  title: "Shopilo",
  description: "Enter the world of Shopilo",
};

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      className={`${poppins.className} antialiased`}
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <body className="flex flex-col min-h-screen relative">
        <ServerSideProviders>
          <Providers>{children}</Providers>
        </ServerSideProviders>
      </body>
    </html>
  );
}
