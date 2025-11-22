import type React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Velocity Gauntlet | KY Combinator",
  description:
    "Join the Velocity Gauntlet - a 12-week startup incubation for the best in Louisville. Register to attend or apply to pitch your startup.",
  openGraph: {
    title: "Velocity Gauntlet | KY Combinator",
    description:
      "Join the Velocity Gauntlet - a 12-week startup incubation for the best in Louisville. Register to attend or apply to pitch your startup.",
    images: [`${process.env.NEXT_PUBLIC_CDN_URL}/velocity/VelocityMeta.jpg`],
  },
  twitter: {
    card: "summary_large_image",
    title: "Velocity Gauntlet | KY Combinator",
    description:
      "Join the Velocity Gauntlet - a 12-week startup incubation for the best in Louisville. Register to attend or apply to pitch your startup.",
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
