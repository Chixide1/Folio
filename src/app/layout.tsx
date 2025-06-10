import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {AppNavbar} from "@/components/layout/app-navbar";
import {Providers} from "@/contexts/providers";
import {ReactNode} from "react";
import {AppFooter} from "@/components/layout/app-footer";
import { Stripes } from "@/components/ui/stripes";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chikezie Onuoha's Folio",
  description: "Personal website & Blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="scrollbar-thin" suppressHydrationWarning={true}>
      <body className={`${inter.className} antialiased leading-relaxed`}>
        <Providers>
          <AppNavbar />
          <main className="flex min-h-screen gap-5">
            <Stripes className="mr-auto"/>
            {children}
            <Stripes className="ml-auto"/>
          </main>
          <AppFooter />
        </Providers>
      </body>
    </html>
  );
}