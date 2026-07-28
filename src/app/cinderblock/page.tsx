import { Metadata } from 'next'
import React from 'react'
import { Container, PageHero, Eyebrow, SerifHeading, Button } from "@/app/components/fm";

export const metadata: Metadata = {
  title: "Cinderblock",
  description: "Cinderblock is our initial prototype for building toward a Brickyard-style venture studio.",
  authors: [{ name: "KYX Team", url: "https://kycombinator.com/cinderblock" }],
  openGraph: {
    images: [`${process.env.NEXT_PUBLIC_CDN_URL}/assets/Blockhead.png`],
  },
  icons: {
    icon: `${process.env.NEXT_PUBLIC_CDN_URL}/assets/Blockhead.png`,
  },
}

const APPLY_URL = "/cinderblock/apply";

const FRAMEWORK: [string, string][] = [
  [
    "Selective Environment",
    "Bringing together high-agency, ambitious builders and founders. Small group, intentionally curated.",
  ],
  [
    "Execution-Focused",
    "No panels or generic networking. The priority is on building — shipping products, acquiring customers, iterating quickly.",
  ],
  [
    "Embedded Accountability",
    "Regular checkpoints, shared workspaces, and transparent metrics. Progress is visible and measured.",
  ],
  [
    "Alignment with Venture Studio Principles",
    "Concentrated support and shared incentives. Not a wide portfolio spread thin — targeted resources for a small number of teams.",
  ],
];

const GUIDELINES: [string, React.ReactNode][] = [
  [
    "1. Own Your Work",
    "This space is a forge—not a daycare. You're here to build. Be accountable for your time, your energy, and your presence. Clean up after yourself. Show up prepared. Don't waste anyone's momentum.",
  ],
  [
    "2. Respect the Grind",
    "Everyone here is under pressure—pushing through unknowns, solving real problems. Respect the effort. Noise, distractions, and ego kill velocity. Keep calls in designated areas. Don't interrupt deep work. Don't pitch unsolicited.",
  ],
  [
    "3. Default to Contribution",
    "This isn't a services marketplace. Give before you ask. If you see someone stuck, offer help. If you've shipped something useful, share it. Your signal-to-noise ratio determines how valuable you are to the room.",
  ],
  [
    "4. No Tourists",
    "This isn't a hangout for “networkers” or “idea guys.” If you're not actively building or enabling others who are, this isn't the place for you. No clout-chasing. No empty posturing. Execution earns respect.",
  ],
  [
    "5. Zero Tolerance for Bullshit",
    "We do not tolerate harassment, discrimination, or exploitation—period.",
  ],
  [
    "6. Confidentiality is Default",
    "What happens in Cinderblock stays in Cinderblock. Don't share others' work, strategies, or data without explicit permission. We're not in the business of leaking decks or ideas.",
  ],
  [
    "7. Leave It Better",
    "Whether it's the space, the culture, or the conversation—leave it stronger than you found it. That's how we build something lasting.",
  ],
];

const page = () => {
  return (
    <>
      <PageHero
        eyebrow="Cinderblock"
        title="A forge for startups."
        intro="Cinderblock is our initial prototype for building toward a Brickyard-style venture studio, located at 1205 East Washington Street Suite 111, Louisville, KY 40206."
      >
        <Button href={APPLY_URL} variant="primary">
          Apply to Cinderblock
        </Button>
      </PageHero>

      {/* Core Framework */}
      <section className="border-b border-[#16130f]">
        <Container className="grid grid-cols-1 gap-8 py-16 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-14 lg:py-[72px]">
          <div className="flex flex-col gap-3">
            <Eyebrow>The model</Eyebrow>
            <SerifHeading className="text-[32px] leading-none md:text-[40px]">
              Core framework.
            </SerifHeading>
          </div>
          <div className="flex flex-col">
            {FRAMEWORK.map(([term, desc], i) => (
              <div
                key={term}
                className={
                  "grid gap-2 border-t border-[#d8d2c5] py-6 " +
                  (i === FRAMEWORK.length - 1 ? "border-b" : "")
                }
              >
                <h3 className="text-[18px] font-medium text-[#16130f]">{term}</h3>
                <p className="max-w-[640px] text-[15px] leading-[1.65] text-[#4a443a]">{desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Learning Ground */}
      <section className="border-b border-[#16130f] bg-[#eae5da]">
        <Container className="flex flex-col gap-6 py-16 lg:py-[72px]">
          <div className="flex flex-col gap-3">
            <Eyebrow>Why it exists</Eyebrow>
            <SerifHeading className="text-[32px] leading-none md:text-[40px]">
              Learning ground for a future studio.
            </SerifHeading>
          </div>
          <p className="max-w-[640px] text-[18px] leading-[1.6] text-[#4a443a] [text-wrap:pretty]">
            Testing what operational structures, mentorship, and investment mechanics work
            best in this market. Goal is to refine before scaling into a full venture studio
            model.
          </p>
          <p className="max-w-[640px] border-l-2 border-[var(--kyx-purple)] pl-5 text-[18px] leading-[1.6] text-[#57503f] [text-wrap:pretty]">
            Cinderblock is how we validate our thesis on concentration and aligned incentives
            — in a controlled, focused setting. It&apos;s the groundwork for systematically
            identifying and accelerating the best local founders.
          </p>
        </Container>
      </section>

      {/* Visit Us */}
      <section className="border-b border-[#16130f]">
        <Container className="flex flex-col gap-6 py-16 lg:py-[72px]">
          <div className="flex flex-col gap-3">
            <Eyebrow>Location</Eyebrow>
            <SerifHeading className="text-[32px] leading-none md:text-[40px]">
              Visit us.
            </SerifHeading>
          </div>
          <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[15px] uppercase tracking-[0.06em] text-[#16130f]">
            1205 East Washington Street Suite 111
            <br />
            Louisville, KY 40206
          </p>
        </Container>
      </section>

      {/* Community Guidelines */}
      <section id="community-guidelines" className="border-b border-[#16130f] bg-[#eae5da]">
        <Container className="grid grid-cols-1 gap-8 py-16 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-14 lg:py-[72px]">
          <div className="flex flex-col gap-3">
            <Eyebrow>House rules</Eyebrow>
            <SerifHeading className="text-[32px] leading-none md:text-[40px]">
              Community guidelines.
            </SerifHeading>
          </div>
          <div className="flex flex-col gap-6">
            <p className="max-w-[640px] text-[16px] leading-[1.65] text-[#4a443a]">
              Welcome to Cinderblock. This space exists to help you build faster, think
              sharper, and go further—with others who are doing the same. To keep the
              atmosphere focused, intense, and collaborative, we expect all members to
              operate under the following principles:
            </p>

            <div className="flex flex-col">
              {GUIDELINES.map(([term, desc], i) => (
                <div
                  key={term}
                  className={
                    "grid gap-2 border-t border-[#d8d2c5] py-6 " +
                    (i === GUIDELINES.length - 1 ? "border-b" : "")
                  }
                >
                  <h3 className="text-[18px] font-medium text-[#16130f]">{term}</h3>
                  <p className="max-w-[640px] text-[15px] leading-[1.65] text-[#4a443a]">{desc}</p>
                </div>
              ))}
            </div>

            <p className="max-w-[640px] border-l-2 border-[var(--kyx-purple)] pl-5 text-[16px] leading-[1.65] text-[#16130f]">
              <strong className="font-semibold">
                Violations of these guidelines may result in suspension or termination of
                your membership.
              </strong>{" "}
              This is a space for serious builders. If that&apos;s you—you&apos;re in the
              right place.
            </p>
          </div>
        </Container>
      </section>

      {/* Bottom Apply */}
      <section>
        <Container className="flex flex-col items-start gap-6 py-16 lg:py-20">
          <SerifHeading className="max-w-[640px] text-[32px] leading-none md:text-[40px]">
            Ready to build?
          </SerifHeading>
          <Button href={APPLY_URL} variant="primary">
            Apply to Cinderblock
          </Button>
        </Container>
      </section>
    </>
  )
}

export default page
