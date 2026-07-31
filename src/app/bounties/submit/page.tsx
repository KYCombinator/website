import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Container, PageHero, Eyebrow, SerifHeading, Button, TextLink } from "@/app/components/fm";
import { SESSION_COOKIE, verifySession } from "@/lib/adminAuth";
import BountyForm from "./BountyForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Submit a bounty | KYX",
  description: "Sponsor a challenge for KYX hackers. Sign in to submit a bounty.",
};

export default async function SubmitBountyPage() {
  const store = await cookies();
  const session = verifySession(store.get(SESSION_COOKIE)?.value);

  return (
    <>
      <PageHero
        eyebrow="Bounties"
        title="Submit a bounty."
        intro="Sponsor a challenge for KYX hackers to take on — set the brief, the prize, and how to win. We review every bounty before it goes live."
      >
        <TextLink href="/events">← All events</TextLink>
      </PageHero>

      <section>
        <Container className="flex flex-col gap-8 py-14 lg:py-[72px]">
          {session ? (
            <>
              <div className="flex flex-col gap-3">
                <Eyebrow>The brief</Eyebrow>
                <SerifHeading className="text-[28px] leading-none md:text-[36px]">
                  Your bounty.
                </SerifHeading>
                <p className="max-w-[560px] text-[15px] leading-[1.6] text-[#4a443a]">
                  You&apos;re signed in as{" "}
                  <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[#16130f]">
                    {session.email}
                  </span>
                  . Your submission is credited to your account.
                </p>
              </div>
              <BountyForm />
            </>
          ) : (
            <div className="flex max-w-[560px] flex-col gap-5 border border-[#d8d2c5] bg-[#eae5da] p-8">
              <SerifHeading className="text-[26px] leading-none md:text-[30px]">
                Sign in to submit a bounty.
              </SerifHeading>
              <p className="text-[15px] leading-[1.6] text-[#4a443a]">
                Creating a bounty takes an account — we&apos;ll email you a 6-digit code, no
                password. New here? Signing in creates your account.
              </p>
              <Button href="/login?redirect=/bounties/submit" variant="primary">
                Log in to continue
              </Button>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
