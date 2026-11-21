import type { Metadata } from "next";
import { Container, PageHero, Eyebrow, SerifHeading, Button } from "@/app/components/fm";
import VelocityForm from "./VelocityForm";

export const metadata: Metadata = {
  title: "Velocity 2.0 | KYX",
  description:
    "Velocity 2.0 — a 12-week, in-person sprint at Cinderblock to 3× your revenue and customers. We're gauging interest.",
};

const WHAT: [string, string][] = [
  ["In-person, on-site", "All teams work at Cinderblock for the full 12 weeks — heads down, in the same room, on the same clock."],
  ["Outcomes, not vibes", "You end with real customers and real revenue. Traction is the only scoreboard."],
  ["High-velocity company", "Surround yourself with the highest-velocity founders in Louisville. Iron sharpens iron."],
];

const REQUIREMENTS: [string, string][] = [
  ["3× in 12 weeks", "Triple both your revenue and your customers within the twelve-week sprint."],
  ["12 weeks, in person", "At least one full-time founder commits to working in person at Cinderblock for the whole sprint."],
  ["Bring a backer", "Each company lines up a backer / mentor to go the distance with them."],
];

export default function VelocityPage() {
  return (
    <>
      <PageHero
        eyebrow="Velocity 2.0 · Gauging interest"
        title="A 12-week sprint to real traction."
        intro="Velocity is a ruthless, in-person sprint at Cinderblock: twelve weeks to 3× your revenue and customers. We're gauging interest for the next cohort — tell us if you're in."
      >
        <Button href="#interest" variant="primary">
          Register interest
        </Button>
      </PageHero>

      {/* What it is */}
      <section className="border-b border-[#16130f]">
        <Container className="py-16 lg:py-[72px]">
          <Eyebrow className="mb-8">What Velocity is</Eyebrow>
          <div className="flex flex-col">
            {WHAT.map(([term, desc], i, arr) => (
              <div
                key={term}
                className={
                  "grid grid-cols-1 gap-x-5 gap-y-1 border-t border-[#d8d2c5] py-6 sm:grid-cols-[260px_minmax(0,1fr)] sm:gap-8 " +
                  (i === arr.length - 1 ? "border-b" : "")
                }
              >
                <span className="font-[family-name:var(--font-instrument-serif)] text-[26px] leading-none text-[#16130f]">
                  {term}
                </span>
                <span className="text-[15px] leading-[1.6] text-[#4a443a]">{desc}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Requirements */}
      <section className="border-b border-[#16130f] bg-[#eae5da]">
        <Container className="py-16 lg:py-[72px]">
          <div className="flex flex-col gap-3">
            <Eyebrow>To qualify</Eyebrow>
            <SerifHeading className="text-[32px] leading-none md:text-[40px]">The requirements.</SerifHeading>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {REQUIREMENTS.map(([term, desc], i) => (
              <div key={term} className="flex flex-col gap-2 border border-[#d8d2c5] bg-[#f4f1ea] p-6">
                <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] text-[var(--kyx-purple)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-[family-name:var(--font-instrument-serif)] text-[24px] leading-none text-[#16130f]">
                  {term}
                </span>
                <span className="text-[15px] leading-[1.55] text-[#4a443a]">{desc}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* The opportunity */}
      <section className="border-b border-[#16130f]">
        <Container className="grid grid-cols-1 gap-8 py-16 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-14 lg:py-[72px]">
          <div className="flex flex-col gap-3">
            <Eyebrow>The opportunity</Eyebrow>
            <SerifHeading className="text-[32px] leading-none md:text-[44px]">$25K on the line.</SerifHeading>
          </div>
          <div className="flex flex-col gap-4">
            <p className="max-w-[560px] text-[17px] leading-[1.6] text-[#4a443a] [text-wrap:pretty]">
              Teams that hit the bar become eligible for a <strong className="text-[#16130f]">$25K investment
              opportunity</strong> and a seat in the room at Cinderblock — Louisville&apos;s startup war room.
            </p>
            <div className="border border-[#d8d2c5] border-l-4 border-l-[var(--kyx-purple)] bg-[#eae5da] p-5">
              <p className="text-[14px] leading-[1.6] text-[#57503f]">
                <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#7d766a]">
                  Please note
                </span>
                <br />
                Startups must meet the revenue requirements to qualify, and it&apos;s possible that no
                companies qualify. The cohort dates are still TBD — registering interest is not an
                acceptance.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Interest form */}
      <section id="interest" className="scroll-mt-20">
        <Container className="flex flex-col gap-8 py-16 lg:py-[72px]">
          <div className="flex flex-col gap-3">
            <Eyebrow>Register interest</Eyebrow>
            <SerifHeading className="text-[32px] leading-none md:text-[40px]">Are you in?</SerifHeading>
            <p className="max-w-[560px] text-[15px] leading-[1.6] text-[#4a443a]">
              Tell us about your company and current traction, and whether you can meet the
              requirements. This gauges interest for the next cohort — we&apos;ll follow up by email.
            </p>
          </div>
          <VelocityForm />
        </Container>
      </section>
    </>
  );
}
