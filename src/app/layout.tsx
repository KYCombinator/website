import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { fontVariables } from "./fonts";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Avatar from "./components/Avatar";

export const metadata: Metadata = {
  title: "This is KYX",
  description:
    "Attract, retain, and grow Louisville's top builders—tilting the odds for the ambitious few willing to out‑work and out‑execute—to forge a critical mass of Series A ready companies in Louisville.",
  authors: [{ name: "KYX Team", url: "https://kycombinator.com/about" }],
  openGraph: {
    images: [`${process.env.NEXT_PUBLIC_CDN_URL}/assets/logo.png`],
  },
  icons: {
    icon: `${process.env.NEXT_PUBLIC_CDN_URL}/assets/logo.png`,
  },
  twitter: {
    card: "summary_large_image",
    title: "This is KYX",
    description:
      "Attract, retain, and grow Louisville's top builders—tilting the odds for the ambitious few willing to out‑work and out‑execute—to forge a critical mass of Series A ready companies in Louisville.",
    images: [`${process.env.NEXT_PUBLIC_CDN_URL}/assets/logo.png`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontVariables}>
      <head>
        <link
          rel="stylesheet"
          href={`${process.env.NEXT_PUBLIC_CDN_URL}/globals.css`}
        />
      </head>
      <body className="min-h-screen bg-[#f4f1ea] font-[family-name:var(--font-ibm-plex-sans)] text-[#16130f] antialiased">
        <Header>
          <Avatar />
        </Header>
        {children}
        <Footer />
      </body>
    </html>
  );
}
