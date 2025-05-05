import type React from "react";
import type { Metadata } from "next";
import { Cabin } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const cabin = Cabin({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KYCombinator - Building the Kentucky of Tomorrow",
  description:
    "We're creating the highest density of ambitious, high-velocity founders and builders in Kentucky.",
  openGraph: {
    images: ["werise1.png"],
  },
  icons: {
    icon: `${process.env.NEXT_PUBLIC_CDN_URL}/favicon.ico`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cabin.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
