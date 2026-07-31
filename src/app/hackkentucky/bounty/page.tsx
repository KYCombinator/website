import type { Metadata } from "next";
import { Container, PageHero, Eyebrow, SerifHeading, TextLink } from "@/app/components/fm";
import { INTAKES } from "../intake";
import IntakeForm from "../IntakeForm";

export const metadata: Metadata = {
  title: "Submit a bounty | KYX",
  description: "Sponsor a challenge for HackKentucky hackers — set the brief, the prize, and how to win.",
};

export default function SubmitBountyPage() {
  const c = INTAKES.bounty;
  return (
    <>
      <PageHero
        eyebrow="HackKentucky · Bounties"
        title="Submit a bounty."
        intro={c.description}
      >
        <TextLink href="https://hackkentucky.com/sponsor/bounty">Learn more about bounties →</TextLink>
        <TextLink href="/hackkentucky/get-involved" className="self-center">
          More ways to get involved →
        </TextLink>
      </PageHero>

      <section>
        <Container className="flex flex-col gap-8 py-14 lg:py-[72px]">
          <div className="flex flex-col gap-3">
            <Eyebrow>The brief</Eyebrow>
            <SerifHeading className="text-[28px] leading-none md:text-[36px]">Your bounty.</SerifHeading>
          </div>
          <IntakeForm config={c} />
        </Container>
      </section>
    </>
  );
}
