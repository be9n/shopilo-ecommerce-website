import type { Metadata } from "next";
import "./globals.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { poppins } from "@/app/utils/fonts";
import Header from "@/components/layout/Header";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/autoplay";

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
      <body className="flex flex-col min-h-screen">
        <NextIntlClientProvider>
          <Header />
          <main className="flex-grow">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
