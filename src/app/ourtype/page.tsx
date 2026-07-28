import { Metadata } from "next";
import { Container, PageHero, Eyebrow, SerifHeading, Button, TextLink } from "../components/fm";

export const metadata: Metadata = {
  title: "Our Type",
  description: "Who we're looking for at KYX - high-agency builders and founders.",
  authors: [{ name: "KYX Team", url: "https://kycombinator.com/ourtype" }],
  openGraph: { images: [`${process.env.NEXT_PUBLIC_CDN_URL}/assets/logo.png`] },
  icons: { icon: `${process.env.NEXT_PUBLIC_CDN_URL}/assets/logo.png` },
};

const TRAITS = [
  "High agency",
  "Surplus value",
  "Work ethic",
  "In person",
  "Heads down",
  "Hungry",
  "Execution",
];

const OUR_TYPE: [string, string][] = [
  ["High agency.", "Take action. No permission needed."],
  ["Surplus value.", "You provide surplus value to the community. Give more than you take."],
  ["Trust.", "You do what you say you'll do. You keep your word."],
  ["Local commitment.", "You're committed to building in Louisville and growing the local ecosystem."],
];

const NOT_OUR_TYPE: [string, string][] = [
  ["Idea people.", "We're not looking for people who just want to talk about ideas."],
  ["Passive participants.", "This isn't a networking group."],
  ["The gallery.", "Commentary from the sidelines is not welcome."],
];

export default function OurTypePage() {
  return (
    <>
      <PageHero
        eyebrow="Our type"
        title="Not for everyone."
        intro="We're looking for high-agency builders and founders who are ready to execute at high velocity. If this sounds like you, we want to meet you."
      >
        <Button href="/cinderblock/apply" variant="primary">
          Apply to Cinderblock
        </Button>
      </PageHero>

      {/* Traits ledger */}
      <section className="border-b border-[#16130f]">
        <Container className="py-14 lg:py-16">
          <Eyebrow className="mb-6">The filter</Eyebrow>
          <div className="flex flex-wrap gap-x-3 gap-y-3 font-[family-name:var(--font-ibm-plex-mono)] text-[13px] uppercase tracking-[0.08em] text-[#57503f]">
            {TRAITS.map((t, i) => (
              <span key={t} className="flex items-center gap-3">
                {i > 0 && <span className="text-[#c6bfae]">·</span>}
                {t}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* Our type / Not our type */}
      <section className="border-b border-[#16130f] bg-[#eae5da]">
        <Container className="grid grid-cols-1 gap-12 py-16 lg:grid-cols-2 lg:gap-16 lg:py-[72px]">
          <div className="flex flex-col gap-[18px]">
            <Eyebrow>Who we&apos;re looking for</Eyebrow>
            <SerifHeading className="text-[32px] leading-none md:text-[40px]">
              Our type.
            </SerifHeading>
            <div className="mt-1 flex flex-col gap-3.5">
              {OUR_TYPE.map(([lead, rest]) => (
                <p key={lead} className="text-[16px] leading-[1.5]">
                  <strong className="font-semibold text-[#16130f]">{lead}</strong>{" "}
                  <span className="text-[#57503f]">{rest}</span>
                </p>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-[18px] text-[#7d766a] lg:border-l lg:border-[#d3ccbd] lg:pl-16">
            <Eyebrow className="text-[#7d766a]">Not our type</Eyebrow>
            <SerifHeading className="text-[32px] leading-none text-[#7d766a] md:text-[40px]">
              Say it plainly.
            </SerifHeading>
            <div className="mt-1 flex flex-col gap-3.5">
              {NOT_OUR_TYPE.map(([lead, rest]) => (
                <p key={lead} className="text-[16px] leading-[1.5]">
                  <strong className="font-semibold">{lead}</strong> {rest}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Closing */}
      <section>
        <Container className="flex flex-col items-start gap-6 py-16 lg:py-20">
          <p className="max-w-[640px] text-[19px] leading-[1.6] text-[#4a443a] [text-wrap:pretty]">
            If this sounds like you, we want to meet you. Show up to our events, build
            something impressive, and let&apos;s create the future of Louisville&apos;s startup
            ecosystem together.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/cinderblock/apply" variant="primary">
              Apply to Cinderblock
            </Button>
            <TextLink href="/events" className="self-center">
              See upcoming events
            </TextLink>
          </div>
        </Container>
      </section>
    </>
  );
}
