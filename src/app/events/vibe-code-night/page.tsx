import type { Metadata } from "next";
import { Container, PageHero, Eyebrow, SerifHeading, TextLink } from "@/app/components/fm";
import IdeaForm from "./IdeaForm";

export const metadata: Metadata = {
  title: "Vibe Code Night — Submit a challenge idea | KYX",
  description:
    "Submit an idea for a challenge that everyone could work on during a future Vibe Code Night.",
};

export default function VibeCodeNightPage() {
  return (
    <>
      <PageHero
        eyebrow="Vibe Code Night"
        title="Submit a challenge idea."
        intro="Pitch a challenge that everyone could build during a future Vibe Code Night. We review every submission — the best ones become the night's prompt."
      >
        <TextLink href="/events">← All events</TextLink>
      </PageHero>

      <section>
        <Container className="flex flex-col gap-8 py-14 lg:py-[72px]">
          <div className="flex flex-col gap-3">
            <Eyebrow>Your idea</Eyebrow>
            <SerifHeading className="text-[28px] leading-none md:text-[36px]">
              The prompt.
            </SerifHeading>
            <p className="max-w-[560px] text-[15px] leading-[1.6] text-[#4a443a]">
              Keep it buildable in one sitting. A twist or constraint is optional but often
              makes the night better.
            </p>
          </div>
          <IdeaForm />
        </Container>
      </section>
    </>
  );
}
