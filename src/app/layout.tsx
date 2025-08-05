import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next"

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/utils/ReduxProvider";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import ServerHealthWrapper from "@/components/ServerHealthWrapper";
import Script from "next/script";
// import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",

  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();
  const locale = await getLocale();
  const direction = ["ar", "he"].includes(locale) ? "rtl" : "ltr";
  return (
    <html lang={locale} dir={direction}>
      {/* <Head> */}
      {/* Main favicon */}
      {/* <link rel="icon" href="/favicon.png" type="image/png" /> */}

      {/* Fallback for older browsers */}
      {/* <link rel="shortcut icon" href="/favicon.ico" /> */}

      {/* Completely disable Next.js default icon */}
      {/* <link rel="icon" href="data:," /> */}
      {/* </Head> */}
      <Script
        src="https://cdn.paddle.com/paddle/v2/paddle.js"
        strategy="afterInteractive"
      />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <ReduxProvider>
            <ServerHealthWrapper>{children}</ServerHealthWrapper>
            <Analytics />
            <SpeedInsights />
          </ReduxProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
