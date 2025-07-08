import React from "react";
import type { Metadata } from "next";
import { twMerge } from "tailwind-merge";
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import "@/styles/globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export const metadata: Metadata = {
  title: "AmbigramGen.com - Free Ambigram Generator | Different Length Words Supported",
  description: "The most powerful free ambigram generator supporting different length word combinations, optimized for tattoo design. No watermark, unlimited use, high-quality SVG/PNG export.",
  keywords: "ambigram generator, free ambigram generator, ambigram maker, tattoo design, different length words, rotational ambigram, flip text generator, ambigram creator online",
  openGraph: {
    title: "AmbigramGen.com - Free Ambigram Generator",
    description: "Create stunning ambigrams with different length words - perfect for tattoos, logos, and artistic designs",
    type: "website",
    locale: "zh_CN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={twMerge("font-sans", "bg-black text-white antialiased")}
        suppressHydrationWarning
      >
        <Header />
        <main className="min-h-screen">
          {children}
          {process.env.NODE_ENV === "production" && <GoogleAnalytics />}

        </main>
        <Footer />
      </body>
    </html>
  );
}
