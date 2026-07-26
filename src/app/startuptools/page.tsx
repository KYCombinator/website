import { Container, PageHero, Eyebrow, SerifHeading, TextLink } from "../components/fm";

const tools = [
  {
    name: "Mercury",
    description: "Mercury is a platform for online banking. It's the #1 bank for startups.",
    url: "https://mercury.com/r/kycombinator",
    youGet: "Get a $250 bonus when you sign up and deposit $10,000 in the first 90 days.",
    weGet: "We receive $250",
  },
  {
    name: "PayFwd",
    description: "PayFwd is a payroll platform for startups.",
    url: "https://payfwd.com/",
    youGet: "Get a $250 bonus when you sign up and deposit $10,000 in the first 90 days.",
    weGet: "We receive $250",
  }
];

export default function StartupToolsPage() {
  return (
    <>
      <PageHero
        eyebrow="Startup tools"
        title="Tools we use and love."
        intro="Some links may be affiliate or partner links, which means we might get a small benefit if you sign up — at no extra cost to you."
      />

      <section className="border-b border-[#16130f]">
        <Container className="grid grid-cols-1 gap-6 py-16 sm:grid-cols-2 lg:py-[72px]">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="flex flex-col gap-4 border border-[#d8d2c5] p-6"
            >
              <div className="flex flex-col gap-2">
                <Eyebrow>Recommended</Eyebrow>
                <SerifHeading as="h2" className="text-[28px] leading-none">
                  {tool.name}
                </SerifHeading>
              </div>
              <p className="text-[15px] leading-[1.6] text-[#4a443a]">{tool.description}</p>
              <dl className="flex flex-col gap-3 border-t border-[#d8d2c5] pt-4">
                <div className="grid gap-1">
                  <dt className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#7d766a]">
                    What you get
                  </dt>
                  <dd className="text-[15px] leading-[1.6] text-[#4a443a]">{tool.youGet}</dd>
                </div>
                <div className="grid gap-1">
                  <dt className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#7d766a]">
                    What KYX gets
                  </dt>
                  <dd className="text-[15px] leading-[1.6] text-[#4a443a]">{tool.weGet}</dd>
                </div>
              </dl>
              <TextLink href={tool.url} external className="mt-1 self-start">
                Visit {tool.name}
              </TextLink>
            </div>
          ))}
        </Container>
      </section>
    </>
  );
}
