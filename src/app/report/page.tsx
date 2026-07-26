import Link from "next/link";
import { Container, PageHero, Eyebrow, SerifHeading } from "../components/fm";
import { reports, badges } from "./data";

export default function ReportsPage() {
  return (
    <>
      <PageHero
        eyebrow="Reports"
        title="Data on the ground."
        intro="Data-driven insights into Kentucky's tech community."
      />

      <section className="border-b border-[#16130f]">
        <Container className="flex flex-col gap-8 py-16 lg:py-[72px]">
          <p className="max-w-[720px] border-l-2 border-[var(--kyx-purple)] pl-4 font-[family-name:var(--font-ibm-plex-mono)] text-[12px] leading-[1.7] uppercase tracking-[0.06em] text-[#7d766a]">
            All information provided is for educational and research purposes
            only. Reports may contain copyrighted material used under fair use
            for educational purposes.
          </p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {reports.map((report) => {
              const inner = (
                <div className="flex h-full flex-col gap-3">
                  <div className="flex items-center justify-between gap-2">
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
                    as="h2"
                    className="text-[22px] leading-[1.1] text-[#16130f]"
                  >
                    {report.title}
                  </SerifHeading>
                  <p className="text-[15px] leading-[1.6] text-[#4a443a]">
                    {report.description}
                  </p>
                  <div className="mt-auto border-t border-[#d8d2c5] pt-4">
                    {report.status === "Coming Soon" ? (
                      <span className="border border-[#d8d2c5] px-2 py-1 font-[family-name:var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.08em] text-[#7d766a]">
                        Coming Soon
                      </span>
                    ) : (
                      <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--kyx-purple)]">
                        View Report →
                      </span>
                    )}
                  </div>
                </div>
              );

              const cardClass =
                "flex flex-col gap-3 border border-[#d8d2c5] p-6 transition-colors duration-150 hover:border-[#16130f]";

              return report.status === "Coming Soon" ? (
                <div key={report.title} className={cardClass}>
                  {inner}
                </div>
              ) : (
                <Link
                  key={report.title}
                  href={`/report/${report.slug}`}
                  className={cardClass}
                >
                  {inner}
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <section>
        <Container className="flex flex-col gap-4 py-16 lg:py-20">
          <Eyebrow>Custom work</Eyebrow>
          <SerifHeading className="text-[32px] leading-none md:text-[40px]">
            Looking for custom reports?
          </SerifHeading>
          <p className="max-w-[640px] text-[17px] leading-[1.6] text-[#4a443a] [text-wrap:pretty]">
            Need specific data or insights about Kentucky&apos;s tech ecosystem?
            We&apos;re happy to help with custom analytics and reports.
          </p>
        </Container>
      </section>
    </>
  );
}
