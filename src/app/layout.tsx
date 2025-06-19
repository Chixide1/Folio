import type {Metadata} from "next";
import {Geist} from "next/font/google";
import "./globals.css";
import {AppNavbar} from "@/components/layout/app-navbar";
import {Providers} from "@/providers";
import {ReactNode} from "react";
import {AppFooter} from "@/components/layout/app-footer";
import { Stripes } from "@/components/ui/stripes";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"]
})

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
      <body className={`${geist.className} antialiased leading-relaxed max-w-screen-2xl mx-auto`}>
        <Providers>
          <AppNavbar />
          <main className="flex min-h-screen mx-auto justify-between">
            <Stripes/>
            {children}
            <Stripes/>
          </main>
          <AppFooter />
        </Providers>
      </body>
    </html>
  );
}