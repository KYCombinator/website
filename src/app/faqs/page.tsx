import { Metadata } from "next";
import { Container, PageHero, Eyebrow, SerifHeading, Button } from "../components/fm";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Frequently asked questions about KYX and our approach.",
  authors: [{ name: "KYX Team", url: "https://kycombinator.com/faqs" }],
  openGraph: { images: [`${process.env.NEXT_PUBLIC_CDN_URL}/assets/logo.png`] },
  icons: { icon: `${process.env.NEXT_PUBLIC_CDN_URL}/assets/logo.png` },
};

type QA = { q: string; a: string };
type Group = { eyebrow: string; heading: string; items: QA[] };

const GROUPS: Group[] = [
  {
    eyebrow: "Basics",
    heading: "How KYX works.",
    items: [
      { q: "What is KYX?", a: "KYX is a concentrated effort to build Louisville's startup ecosystem by focusing on high-agency founders and builders. We're not a traditional accelerator — we're building toward a venture studio model." },
      { q: "How do I get involved?", a: "Show up to our events, build something impressive, and demonstrate high-agency execution. We're looking for people who are already shipping products and acquiring customers." },
      { q: "What's Cinderblock?", a: "Cinderblock is our initial prototype for building toward a Brickyard-style venture studio. It's a selective, execution-focused program for the most dedicated founders." },
      { q: "Do I need funding to participate?", a: "No. We're focused on execution and traction, not funding stage. Whether you're bootstrapped or funded, what matters is that you're building and growing." },
    ],
  },
  {
    eyebrow: "Approach",
    heading: "Our approach.",
    items: [
      { q: "Why focus on concentration?", a: "Louisville has limited resources and talent. By concentrating our efforts on the most promising founders, we can create outsized impact and build a critical mass of successful companies." },
      { q: "What makes KYX different?", a: "We're execution-focused, not networking-focused. No panels or generic events — just building, shipping, and growing. We're building toward a venture studio model with aligned incentives." },
      { q: "How do you measure success?", a: "We measure success by the number of revenue-generating startups created in Louisville. Our goal is to systematically identify and accelerate the best local founders." },
    ],
  },
  {
    eyebrow: "Organization",
    heading: "The org.",
    items: [
      { q: "Legal status", a: "We're an all-volunteer 501(c)(3) nonprofit organization — no paid staff, no dues — focused on building Louisville's startup ecosystem through education, community building, and direct support for founders." },
      { q: "Location", a: "Based in Louisville, Kentucky. We're committed to building the local ecosystem and creating opportunities for founders and builders in our community." },
      { q: "Mission alignment", a: "As a 501(c)(3), our focus is on founders learning, growing, and building successful companies." },
    ],
  },
];

const SUPPORT = [
  { label: "Sponsor a slice of pizza", cta: "Slice Sponsor ($2)", href: "https://buy.stripe.com/dRm4gz8jwfrk7Dx02oc7u00" },
  { label: "Sponsor a whole pizza", cta: "Pizza Sponsor ($5)", href: "https://buy.stripe.com/28E14n8jwa708HB8yUc7u01" },
  { label: "Sponsor a Cinderblock", cta: "Cinderblock Sponsor ($25)", href: "https://buy.stripe.com/aFa9ATdDQ7YScXRaH2c7u02" },
];

export default function FaqsPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQs"
        title="Questions."
        intro="KYX is an all-volunteer 501(c)(3) nonprofit building Louisville's startup ecosystem. Common questions below."
      />

      {GROUPS.map((group, gi) => (
        <section
          key={group.heading}
          className={"border-b border-[#16130f]" + (gi % 2 === 1 ? " bg-[#eae5da]" : "")}
        >
          <Container className="grid grid-cols-1 gap-8 py-16 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-14 lg:py-[72px]">
            <div className="flex flex-col gap-3">
              <Eyebrow>{group.eyebrow}</Eyebrow>
              <SerifHeading className="text-[32px] leading-none md:text-[40px]">
                {group.heading}
              </SerifHeading>
            </div>
            <div className="flex flex-col">
              {group.items.map((item, i) => (
                <div
                  key={item.q}
                  className={
                    "grid gap-2 border-t border-[#d8d2c5] py-6 " +
                    (i === group.items.length - 1 ? "border-b" : "")
                  }
                >
                  <h3 className="font-[family-name:var(--font-ibm-plex-sans)] text-[18px] font-medium text-[#16130f]">
                    {item.q}
                  </h3>
                  <p className="max-w-[640px] text-[15px] leading-[1.65] text-[#4a443a]">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      ))}

      {/* Support */}
      <section id="support" className="border-b border-[#16130f]">
        <Container className="flex flex-col gap-8 py-16 lg:py-[72px]">
          <div className="flex flex-col gap-3">
            <Eyebrow>Chip in</Eyebrow>
            <SerifHeading className="text-[32px] leading-none md:text-[40px]">
              How you can support.
            </SerifHeading>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {SUPPORT.map((s) => (
              <div
                key={s.cta}
                className="flex flex-col items-start justify-between gap-5 border border-[#d8d2c5] p-6"
              >
                <p className="text-[16px] font-medium text-[#16130f]">{s.label}</p>
                <Button href={s.href} variant="dark" className="w-full">
                  {s.cta}
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Closing */}
      <section>
        <Container className="py-16 lg:py-20">
          <p className="max-w-[640px] text-[19px] leading-[1.6] text-[#4a443a] [text-wrap:pretty]">
            Have more questions? Show up to our events and ask them in person. We&apos;re
            building this together.
          </p>
        </Container>
      </section>
    </>
  );
}
