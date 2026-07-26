export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { Download } from "lucide-react";
import { Container, Button, SerifHeading } from "../../components/fm";
import { reports, badges } from "../data"; // adjust path!
import { reportComponents } from "../components";
// Dynamic metadata
export async function generateMetadata({ params }) {
  const report = reports.find((r) => r.slug === params.slug);

  if (!report) {
    return {
      title: "Report Not Found | KYC",
    };
  }

  return {
    title: `${report.title} | KYC`,
    description: report.description,
  };
}

// Page
export default function ReportPage({ params }) {
  const report = reports.find((r) => r.slug === params.slug);

  if (!report) {
    notFound();
  }

  const ReportComponent = report.componentKey
    ? reportComponents[report.componentKey]
    : null;

  return (
    <Container className="py-16 lg:py-20">
      <div className="mb-10 flex flex-col gap-4 border-b border-[#d8d2c5] pb-8">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-2">
            {report.badges.map((badge) => (
              <span
                key={badge}
                className="border border-[#d8d2c5] px-2 py-1 font-[family-name:var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.08em] text-[#57503f]"
              >
                {badges[badge].label}
              </span>
            ))}
          </div>
          <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#7d766a]">
            {report.date}
          </span>
        </div>
        <SerifHeading
          as="h1"
          className="max-w-[900px] text-[36px] leading-[1.05] md:text-[48px]"
        >
          {report.title}
        </SerifHeading>
        <p className="max-w-[720px] text-[18px] leading-[1.6] text-[#4a443a] [text-wrap:pretty]">
          {report.description}
        </p>
      </div>

      {report.status === "Coming Soon" ? (
        <div className="border border-[#d8d2c5] p-8">
          <p className="text-center font-[family-name:var(--font-ibm-plex-mono)] text-[12px] uppercase tracking-[0.08em] text-[#7d766a]">
            This report is coming soon. Check back later!
          </p>
        </div>
      ) : (
        <>
          {report.file && (
            <div className="mb-10">
              <Button
                href={report.file}
                variant="dark"
                external
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Download Report
              </Button>
            </div>
          )}
          <div className="max-w-none">
            {ReportComponent ? (
              <ReportComponent />
            ) : (
              <p className="text-center font-[family-name:var(--font-ibm-plex-mono)] text-[12px] uppercase tracking-[0.08em] text-[#7d766a]">
                Static content for this report will be added soon.
              </p>
            )}
          </div>
        </>
      )}
    </Container>
  );
}
