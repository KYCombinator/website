import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reports | KYC",
  description:
    "Acting in the present defines the future. Defining our future contextualizes our past. Explore data and insights from KYCombinator",
  openGraph: {
    images: ["/futurelou.png"],
  },
};

export default function ReportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col container mx-auto pt-12">
      {children}
    </div>
  );
}
