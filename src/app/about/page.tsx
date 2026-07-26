import { Metadata } from 'next'
import { Container, PageHero, Eyebrow, SerifHeading } from "../components/fm";

export const metadata: Metadata = {
  title: "About KYX",
  description: "Our Vision and Mission. Problem & Opportunity. Team.",
  authors: [{ name: "KYX Team", url: "https://kycombinator.com/about" }],
  openGraph: {
    images: [`${process.env.NEXT_PUBLIC_CDN_URL}/assets/logo.png`],
  },
  icons: {
    icon: `${process.env.NEXT_PUBLIC_CDN_URL}/assets/logo.png`,
  },
}

const PROBLEM: [string, string][] = [
  ["Talent leakage", "High‑agency founders leave for Austin, Nashville, SF."],
  ["Series A drought", "Less than 1 local tech companies raise a Series A every 5 years, while peer cities field x that number (need to check this stat - cant remember)."],
  ["Resource dilution", "Existing programs are spread thin across broad audiences. We're doing a great job supporting more idea and pre-seed stage companies, but few are making it through the trough of sorrow to solid traction and wins on the other side."],
  ["KYX opportunity", "Concentrate capital, connections, and peer pressure on the most dedicated founders who are most likely to move through the trough and go on to create outsized jobs, revenue, and exits."],
]

const TEAM: [string, string][] = [
  ["Dan Ross‑Li, Cofounder", "Louisville transplant, father of two, and local founder with 8 years in YC-backed startups and Bay Area high-growth tech companies; previously a high-frequency trader in Chicago, he holds an MBA from Chicago Booth and a BA in Economics from Yale. He is known amongst friends as Peter Gregory."],
  ["Rachel Edenfield, Cofounder", "Louisville transplant and founder of Swell Health; a former social worker who built and sold her first company before 23. Now channels 11 years of high-growth tech experience—half during Lyft's hyper-growth years—into scaling startups and strengthening the founder community. Her call sign at KYX is OKR."],
  ["Jack Crowdis — Cofounder", "Louisville native. Cofounder @ Honeysuckle Labs (ad‑tech automation). Head Growth @ PayFWDs ($4.5 M ARR), former sales at Reelio (acq.). He is known amongst KYX as Conky."],
  ["Zeeshan Bhatti — Operations & Community", "Operator & ecosystem connector (bio TBD)"],
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About KYX"
        title="Concentrate the ambitious few."
        intro="Louisville competes on a national stage by concentrating ambition and work ethic — attracting, retaining, and growing the builders willing to out‑work and out‑execute."
      />

      {/* Vision & Mission */}
      <section className="border-b border-[#16130f]">
        <Container className="grid grid-cols-1 gap-8 py-16 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-14 lg:py-[72px]">
          <div className="flex flex-col gap-3">
            <Eyebrow>Why we exist</Eyebrow>
            <SerifHeading className="text-[32px] leading-none md:text-[40px]">
              Vision &amp; mission.
            </SerifHeading>
          </div>
          <div className="flex flex-col gap-6">
            <p className="max-w-[640px] text-[16px] leading-[1.6] text-[#4a443a] [text-wrap:pretty]">
              <strong className="font-semibold text-[#16130f]">Vision.</strong>{" "}
              Louisville competes on a national stage by concentrating ambition and work ethic.
            </p>
            <p className="max-w-[640px] text-[16px] leading-[1.6] text-[#4a443a] [text-wrap:pretty]">
              <strong className="font-semibold text-[#16130f]">Mission.</strong>{" "}
              Attract, retain, and grow Louisville&apos;s top builders—tilting the odds for the ambitious few willing to out‑work and out‑execute—to forge a critical mass of Series A ready companies in Louisville.
            </p>
          </div>
        </Container>
      </section>

      {/* Problem & Opportunity */}
      <section className="border-b border-[#16130f] bg-[#eae5da]">
        <Container className="grid grid-cols-1 gap-8 py-16 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-14 lg:py-[72px]">
          <div className="flex flex-col gap-3">
            <Eyebrow>The gap</Eyebrow>
            <SerifHeading className="text-[32px] leading-none md:text-[40px]">
              Problem &amp; opportunity.
            </SerifHeading>
          </div>
          <div className="flex flex-col">
            {PROBLEM.map(([term, desc], i) => (
              <div
                key={term}
                className={
                  "grid gap-2 border-t border-[#d8d2c5] py-6 " +
                  (i === PROBLEM.length - 1 ? "border-b" : "")
                }
              >
                <h3 className="font-[family-name:var(--font-ibm-plex-sans)] text-[18px] font-medium text-[#16130f]">
                  {term}
                </h3>
                <p className="max-w-[640px] text-[15px] leading-[1.65] text-[#4a443a]">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="border-b border-[#16130f]">
        <Container className="grid grid-cols-1 gap-8 py-16 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-14 lg:py-[72px]">
          <div className="flex flex-col gap-3">
            <Eyebrow>Who&apos;s building it</Eyebrow>
            <SerifHeading className="text-[32px] leading-none md:text-[40px]">
              The team.
            </SerifHeading>
          </div>
          <div className="flex flex-col">
            {TEAM.map(([name, bio], i) => (
              <div
                key={name}
                className={
                  "grid gap-2 border-t border-[#d8d2c5] py-6 " +
                  (i === TEAM.length - 1 ? "border-b" : "")
                }
              >
                <h3 className="font-[family-name:var(--font-instrument-serif)] text-[24px] leading-tight tracking-[-0.02em] text-[#16130f]">
                  {name}
                </h3>
                <p className="max-w-[640px] text-[15px] leading-[1.65] text-[#4a443a]">
                  {bio}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
