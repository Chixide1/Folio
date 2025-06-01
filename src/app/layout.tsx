import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppNavbar } from "@/components/shared/app-navbar";
import {Providers} from "@/contexts/providers";
import {ReactNode} from "react";

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
    <html lang="en" className="dark scrollbar-thin scrollbar-track-slate-900 scrollbar-thumb-slate-400">
      <body className={`${inter.className} antialiased leading-relaxed`}>
        <Providers>
          <AppNavbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}