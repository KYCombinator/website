import type React from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import { fontVariables } from "./fonts";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { SESSION_COOKIE, verifySession } from "@/lib/adminAuth";
import { getUser, galleryConfigured } from "@/lib/gallery";
import type { Account } from "./components/AccountMenu";

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Resolve the header's auth state once per request. The Apply button is
  // hidden for signed-in Cinderblock members (they're already in the room).
  const store = await cookies();
  const session = verifySession(store.get(SESSION_COOKIE)?.value);
  let account: Account | null = null;
  let showApply = true;
  if (session) {
    const user = galleryConfigured() ? await getUser(session.email) : null;
    account = {
      name: user?.name || session.email.split("@")[0],
      email: session.email,
      photoUrl: user?.photoUrl || "",
      isAdmin: session.role === "admin",
    };
    showApply = !user?.cinderblock;
  }

  return (
    <html lang="en" className={fontVariables}>
      <head>
        <link
          rel="stylesheet"
          href={`${process.env.NEXT_PUBLIC_CDN_URL}/globals.css`}
        />
      </head>
      <body className="min-h-screen bg-[#f4f1ea] font-[family-name:var(--font-ibm-plex-sans)] text-[#16130f] antialiased">
        <Header account={account} showApply={showApply} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
