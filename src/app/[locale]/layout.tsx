import "@/styles/globals.css";

import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "@/trpc/react";
import { I18nProviderClient } from "../../../locales/client";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const pano = localFont({
  src: [
    {
      path: "../../styles/fonts/HW Pano Regular.woff",
      weight: "500",
    },
    {
      path: "../../styles/fonts/HW Pano Bold.woff",
      weight: "700",
    },
  ],
  display: "swap",
  variable: "--font-pano",
});

export const metadata = {
  title: "EasterCup",
  // description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang="en" className={`${pano.variable}`}>
      <body className={`font-pano ${GeistSans.variable} font-sans antialiased`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <I18nProviderClient locale={locale}>
            <div className="flex flex-col" id="top">
              <Navbar />
              <div className="container">{children}</div>
              <Footer />
            </div>
            <Toaster />
          </I18nProviderClient>
        </TRPCReactProvider>
      </body>
    </html>
  );
}