import type React from "react";
import type { Metadata } from "next";
import { Cabin } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Avatar from "./components/Avatar";

const cabin = Cabin({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "This is KYX",
  description:
    "Attract, retain, and grow Louisville's top builders—tilting the odds for the ambitious few willing to out‑work and out‑execute—to forge a critical mass of Series A ready companies in Louisville.",
  openGraph: {
    images: ["werise1.png"],
  },
  icons: {
    icon: `${process.env.NEXT_PUBLIC_CDN_URL}/assets/logo.png`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href={`${process.env.NEXT_PUBLIC_CDN_URL}/globals.css`}
        />
      </head>
      <body className={cabin.className}>
        <Header>
          <Avatar />
        </Header>
        {children}
        <Footer />
      </body>
    </html>
  );
}
