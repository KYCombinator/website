import type { Metadata } from "next";
import { Container, PageHero, TextLink } from "@/app/components/fm";

export const metadata: Metadata = {
  title: "HackKentucky — Get involved | KYX",
  description:
    "Sponsor HackKentucky × HackTheTrack, post a bounty, teach a session, or help run the floor. Pick a lane and fill out the form.",
};

const SOURCE = "https://hackkentucky.com/get-involved";

export default function HackKentuckyGetInvolvedPage() {
  return (
    <>
      <PageHero
        eyebrow="HackKentucky"
        title="Get involved."
        intro="HackKentucky × HackTheTrack runs on the people who show up for it. Sponsor it, post a bounty, teach a session, or help run the floor — pick a lane and fill out the form below."
      >
        <TextLink href={SOURCE}>Open on hackkentucky.com →</TextLink>
      </PageHero>

      <section>
        <Container className="py-10 lg:py-14">
          <div className="border border-[#d8d2c5] bg-[#eae5da] p-2 md:p-3">
            <iframe
              src={SOURCE}
              title="HackKentucky — Get involved"
              className="h-[2200px] w-full max-w-full bg-[#f4f1ea]"
              loading="lazy"
            />
          </div>
          <p className="mt-4 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#7d766a]">
            Sponsor, bounty, speak, and volunteer forms — all routed to hackkentucky@kycombinator.com.
          </p>
        </Container>
      </section>
    </>
  );
}
