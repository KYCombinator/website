import type React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vision | KYX - Building Kentucky's Startup Ecosystem",
  description:
    "KYX exists to turn Kentucky into a generator of venture‑backable, Series‑A‑worthy startups. Our vision: create 10 venture‑backable, Series‑A‑ready startups in Kentucky by 2030.",
  openGraph: {
    title: "Vision | KYX - Building Kentucky's Startup Ecosystem",
    description:
      "KYX exists to turn Kentucky into a generator of venture‑backable, Series‑A‑worthy startups. Our vision: create 10 venture‑backable, Series‑A‑ready startups in Kentucky by 2030.",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://kycombinator.com"}/vision`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_CDN_URL}/assets/logo.png`,
        width: 1200,
        height: 630,
        alt: "KYX Vision - Building Kentucky's Startup Ecosystem",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vision | KYX - Building Kentucky's Startup Ecosystem",
    description:
      "KYX exists to turn Kentucky into a generator of venture‑backable, Series‑A‑worthy startups. Our vision: create 10 venture‑backable, Series‑A‑ready startups in Kentucky by 2030.",
    images: [`${process.env.NEXT_PUBLIC_CDN_URL}/assets/logo.png`],
  },
};

export default function VisionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

