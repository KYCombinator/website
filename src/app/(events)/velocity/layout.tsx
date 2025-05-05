import type React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Velocity Pitch Competition | KY Combinator",
  description:
    "Join the Velocity Pitch Competition - a 12-week startup competition in Louisville showcasing high-growth potential startups. Register to attend or apply to pitch your startup.",
  openGraph: {
    title: "Velocity Pitch Competition | KY Combinator",
    description:
      "Join the Velocity Pitch Competition - a 12-week startup competition in Louisville showcasing high-growth potential startups. Register to attend or apply to pitch your startup.",
    images: ["/velocity/real1.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Velocity Pitch Competition | KY Combinator",
    description:
      "Join the Velocity Pitch Competition - a 12-week startup competition in Louisville showcasing high-growth potential startups. Register to attend or apply to pitch your startup.",
    images: ["/velocity/real1.png"],
  },
};

export default function VelocityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
