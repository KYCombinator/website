import { Container, Eyebrow, SerifHeading } from "@/app/components/fm";

export default function WhyStartupsSection() {
  const outOfScope: [string, string][] = [
    ["Not Venture‑Backable", "Great businesses, but not aligned with our mission."],
    ["Funding Goldilocks", 'We avoid "just enough money to survive but not enough to grow."'],
    ["Committees / Initiatives", "We're not building economic development theater."],
  ];

  return (
    <section className="border-b border-[#16130f]">
      <Container className="py-16 lg:py-[72px]">
        <Eyebrow className="mb-4">Our focus</Eyebrow>
        <SerifHeading className="text-[32px] leading-none md:text-[40px]">
          Why focus on startups?
        </SerifHeading>

        <div className="mt-6 max-w-[720px] space-y-6">
          <p className="text-[18px] leading-[1.6] text-[#4a443a] [text-wrap:pretty]">
            Startups are the only type of company capable of generating the scale of impact
            KYX is designed to create. They drive job creation, wealth generation, a culture
            of innovation, increased capital flows into the region, and founder alumni who
            reinvest in the ecosystem. Small businesses and consultancies enrich the region
            but do not meaningfully shift the economic trajectory of a city or state. Startups
            do.
          </p>
          <p className="border-l-2 border-[var(--kyx-purple)] pl-6 text-[18px] leading-[1.6] text-[#16130f] [text-wrap:pretty]">
            In summary: a startup is built for scale, speed and outsized impact. It&apos;s not
            defined by funding or headcount; it&apos;s defined by the founder&apos;s ambition
            and the company&apos;s ability to become something much bigger than it is today.
            That&apos;s why KYX focuses on startups—because those are the companies that create
            momentum, gravity, and long‑term transformation for Kentucky.
          </p>
        </div>

        {/* Out of scope */}
        <div className="mt-14">
          <Eyebrow className="mb-4">Our boundaries</Eyebrow>
          <SerifHeading as="h3" className="text-[26px] leading-none md:text-[30px]">
            What&apos;s out of scope.
          </SerifHeading>
          <p className="mt-4 max-w-[720px] text-[16px] leading-[1.6] text-[#4a443a]">
            To stay disciplined, we explicitly exclude:
          </p>
          <div className="mt-6 flex flex-col">
            {outOfScope.map(([term, desc], i, arr) => (
              <div
                key={term}
                className={
                  "grid grid-cols-[36px_minmax(0,1fr)] items-baseline gap-x-4 gap-y-1 border-t border-[#d8d2c5] py-5 sm:grid-cols-[44px_240px_minmax(0,1fr)] sm:gap-5 " +
                  (i === arr.length - 1 ? "border-b" : "")
                }
              >
                <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] text-[var(--kyx-purple)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-[family-name:var(--font-instrument-serif)] text-[24px] leading-none">
                  {term}
                </span>
                <span className="col-span-2 text-[15px] leading-[1.6] text-[#4a443a] sm:col-span-1">
                  {desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
