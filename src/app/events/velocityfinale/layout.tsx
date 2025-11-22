import type React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Velocity Demo Day | KYX",
  description:
    "Watch 5 startups present their 12-week journey at Velocity Demo Day. Part of the Velocity / The LOUIES - KYX 2025 Celebration on December 4th in Louisville, KY.",
  openGraph: {
    title: "Velocity Demo Day | KYX",
    description:
      "Watch 5 startups present their 12-week journey at Velocity Demo Day. Part of the Velocity / The LOUIES - KYX 2025 Celebration on December 4th in Louisville, KY.",
    images: [`${process.env.NEXT_PUBLIC_CDN_URL}/velocity/VelocityMeta.jpg`],
  },
  twitter: {
    card: "summary_large_image",
    title: "Velocity Demo Day | KYX",
    description:
      "Watch 5 startups present their 12-week journey at Velocity Demo Day. Part of the Velocity / The LOUIES - KYX 2025 Celebration on December 4th in Louisville, KY.",
    images: [`${process.env.NEXT_PUBLIC_CDN_URL}/velocity/VelocityMeta.jpg`],
  },
};

export default function VelocityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
