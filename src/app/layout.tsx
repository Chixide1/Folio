import type {Metadata} from "next";
import {Geist} from "next/font/google";
import "./globals.css";
import {AppNavbar} from "@/components/layout/app-navbar";
import {Providers} from "@/providers";
import {ReactNode} from "react";
import {AppFooter} from "@/components/layout/app-footer";
import {StripesCol} from "@/components/ui/stripes";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"]
})

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
        <StripesCol/>
        {children}
        <StripesCol/>
      </main>
      <AppFooter />
    </Providers>
    </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Chikezie Onuoha's Folio",
  description: "Personal website & Blog of Chikezie Onuoha - Developer",
  keywords: ["Chikezie Onuoha", "portfolio", "blog", "developer", "web development", "personal website"],
  authors: [{ name: "Chikezie Onuoha" }],
  creator: "Chikezie Onuoha",
  publisher: "Chikezie Onuoha",

  // Open Graph metadata for social sharing
  openGraph: {
    type: "website",
    url: "https://ckdoestech.com",
    title: "Chikezie Onuoha's Folio",
    description: "Personal website & Blog of Chikezie Onuoha - Developer, Writer, and Creative Professional",
    siteName: "Chikezie Onuoha's Folio",
  },

  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "Chikezie Onuoha's Folio",
    description: "Personal website & Blog of Chikezie Onuoha - Developer",
  },

  // Additional metadata
  metadataBase: new URL("https://ckdoestech.com"), // Replace with your actual domain
  alternates: {
    canonical: "/",
  },

  // Robot instructions
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Additional structured data
  category: "technology",

  // App-specific metadata
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Chikezie Onuoha's Folio",
  },

  // Format detection
  formatDetection: {
    telephone: false,
  },
};
