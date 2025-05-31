import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppNavbar } from "@/components/shared/app-navbar";

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
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} antialiased`}
      >
        <AppNavbar />
        {children}
      </body>
    </html>
  );
}