import type React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Louies | KY Combinator",
  description:
    "The Louies - Celebrating and recognizing outstanding startups and founders in Louisville. Join us in highlighting the achievements and success stories shaping our startup ecosystem.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kycombinator.com/louies",
    siteName: "KY Combinator",
    title: "The Louies | KY Combinator",
    description:
      "The Louies - Celebrating and recognizing outstanding startups and founders in Louisville. Join us in highlighting the achievements and success stories shaping our startup ecosystem.",
    images: ["/louies/louies1.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Louies | KY Combinator",
    description:
      "The Louies - Celebrating and recognizing outstanding startups and founders in Louisville. Join us in highlighting the achievements and success stories shaping our startup ecosystem.",
    images: ["/louies/louies1.png"],
  },
};

export default function LouiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
