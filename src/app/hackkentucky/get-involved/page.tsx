import type { Metadata } from "next";
import { Container, PageHero, Eyebrow, SerifHeading, TextLink } from "@/app/components/fm";
import { INTAKES, INTAKE_ORDER } from "../intake";
import IntakeForm from "../IntakeForm";

export const metadata: Metadata = {
  title: "HackKentucky — Get involved | KYX",
  description:
    "Sponsor HackKentucky × HackTheTrack, post a bounty, teach a session, or help run the floor. Pick a lane and fill out the form.",
};

const HK_EMAIL = "hackkentucky@kycombinator.com";

export default function HackKentuckyGetInvolvedPage() {
  return (
    <>
      <PageHero
        eyebrow="HackKentucky"
        title="Get involved."
        intro="HackKentucky × HackTheTrack runs on the people who show up for it. Sponsor it, post a bounty, teach a session, or help run the floor — pick a lane and fill out the form."
      >
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {INTAKE_ORDER.map((k) => (
            <TextLink key={k} href={`#${k}`}>
              {INTAKES[k].eyebrow}
            </TextLink>
          ))}
        </div>
      </PageHero>

      {INTAKE_ORDER.map((k, i) => {
        const c = INTAKES[k];
        return (
          <section
            key={k}
            id={k}
            className={"scroll-mt-24 border-b border-[#16130f]" + (i % 2 === 1 ? " bg-[#eae5da]" : "")}
          >
            <Container className="flex flex-col gap-8 py-16 lg:py-[72px]">
              <div className="flex flex-col gap-3">
                <Eyebrow>{c.eyebrow}</Eyebrow>
                <SerifHeading className="text-[32px] leading-none md:text-[40px]">{c.heading}</SerifHeading>
                <p className="max-w-[620px] text-[16px] leading-[1.6] text-[#4a443a] [text-wrap:pretty]">
                  {c.description}
                </p>
              </div>
              <IntakeForm config={c} />
            </Container>
          </section>
        );
      })}

      <section>
        <Container className="flex flex-col gap-3 py-16 lg:py-20">
          <Eyebrow>Rather just talk?</Eyebrow>
          <SerifHeading className="text-[28px] leading-none md:text-[36px]">Email the team.</SerifHeading>
          <TextLink href={`mailto:${HK_EMAIL}`}>{HK_EMAIL} →</TextLink>
        </Container>
      </section>
    </>
  );
}
