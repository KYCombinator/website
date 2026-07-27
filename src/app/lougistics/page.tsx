import type { Metadata } from "next";
import { Plane, Truck, TrainFront, Ship } from "lucide-react";
import { Container, PageHero, Eyebrow, SerifHeading, Button } from "@/app/components/fm";

export const metadata: Metadata = {
  title: "Lougistics | KYX",
  description:
    "Louisville shouldn't build a tech scene it can't win. It should build on the one advantage no rival city can copy: the logistics center of North America. Lougistics turns that fixed advantage into a manufacturing-company-creation engine.",
  openGraph: {
    title: "Lougistics | KYX",
    description:
      "Build what can't leave. A proposal to turn Louisville's logistics gravity into a manufacturing-company-creation engine — and capture the middle-class jobs upstream of the warehouse.",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://kycombinator.com"}/lougistics`,
    images: [`${process.env.NEXT_PUBLIC_CDN_URL}/assets/logo.png`],
  },
};

function Banner({
  tone = "dark",
  children,
}: {
  tone?: "dark" | "paper";
  children: React.ReactNode;
}) {
  const dark = tone === "dark";
  return (
    <section
      className={
        "border-b border-[#16130f] " +
        (dark ? "bg-[#16130f] text-[#f4f1ea]" : "bg-[#eae5da]")
      }
    >
      <Container className="py-16 md:py-24">
        <SerifHeading className="mx-auto max-w-[900px] text-center text-[32px] leading-[1.05] md:text-[52px]">
          {children}
        </SerifHeading>
      </Container>
    </section>
  );
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-10 border-l-2 border-[var(--kyx-purple)] pl-6 text-[20px] leading-snug text-[#16130f] md:text-[24px]">
      {children}
    </blockquote>
  );
}

const ADVANTAGES = [
  {
    icon: Plane,
    label: "Runway",
    title: "Worldport",
    body: "The UPS Worldport at Louisville Muhammad Ali International Airport is the nerve center of UPS's global air network — roughly 5.2 million square feet, about 2 million packages a day, and on the order of 300–360 flights daily connecting 200+ countries. It is the single largest air-logistics node on the continent.",
    kicker:
      "A Louisville shipper gets the latest drop-off cutoff in the country — ship late and still make next-day windows. Design your operations around that cutoff and you are bolted to Louisville. You cannot open a Worldport in Tulsa.",
  },
  {
    icon: Truck,
    label: "Road",
    title: "The crossroads",
    body: "Louisville sits at the intersection of I-64, I-65, and I-71, putting roughly two-thirds of the U.S. population within a day's drive.",
    kicker:
      "This is bedrock geography, not policy a competitor can rewrite.",
  },
  {
    icon: TrainFront,
    label: "Rail",
    title: "Three Class I railroads",
    body: "Three Class I railroads serve the metro, and the Ohio River connects it to the Mississippi and the national barge network.",
    kicker: "River, road, rail, and runway converge in one place.",
  },
  {
    icon: Ship,
    label: "River",
    title: "FTZ #29 & the Riverport",
    body: "Louisville already operates Foreign-Trade Zone #29, with duty-deferral advantages for importers and exporters. The Riverport is home to 100+ companies already engaged in manufacturing, logistics, and distribution.",
    kicker: "The cluster exists. The ground is broken.",
  },
];

const LAYERS = [
  {
    n: "01",
    title: "Shared fabrication & micro-factory",
    body: "Rapid prototyping, electronics, metals, plastics, and small-run production lines. Open to any physical-product company — we do not pre-sort into favored sectors. The logistics advantage is the filter; let it attract whoever it attracts and let the market reveal where Louisville's edge bites hardest.",
  },
  {
    n: "02",
    title: "A logistics-integration layer",
    tag: "the part mHUB doesn't have",
    body: "Embedded access to Worldport's late cutoffs, FTZ #29 benefits, customs and export support, and 3PL/fulfillment partners. Founders here learn to design products for the supply chain, not just for manufacturability. This is the differentiator no other incubator in the country can offer.",
  },
  {
    n: "03",
    title: "A demand-driven accelerator",
    body: "Cohorts tied to corporate partners — the natural list: UPS and its healthcare arm, GE Appliances, Ford, regional 3PLs and health-logistics players — who bring real problems and real pilot opportunities. Cohorts form around the founders who apply, not around a committee's guess at the right verticals.",
  },
  {
    n: "04",
    title: "A small seed fund",
    body: "A Louisville analog to mHUB Ventures: pre-seed checks for modest equity, capitalized by a coalition of public, corporate, and philanthropic money.",
  },
];

const REFUSALS = [
  "We are not building a generic innovation district.",
  "We are not chasing a tech scene we cannot win.",
  "We are not trying to be all things to all founders.",
];

const bodyText =
  "text-[16px] leading-[1.7] text-[#4a443a] md:text-[17px]";

export default function LougisticsPage() {
  return (
    <>
      {/* Hero */}
      <PageHero
        eyebrow="Louisville, KY · A proposal"
        title="Lougistics."
        intro="Every city is being told to build a tech scene. Louisville should not. Louisville should build on the one set of advantages no rival city can copy, relocate, or out-spend: it is the logistics center of North America. Lougistics turns that fixed, physical advantage into a manufacturing-company-creation engine — and captures the middle-class jobs that sit upstream of the warehouse."
      >
        <Button href="/lougistics/whitepaper">Read the white paper</Button>
      </PageHero>

      <Banner tone="dark">Manufacturing makes the middle class.</Banner>

      {/* Section 1 — The landscape */}
      <section className="border-b border-[#16130f]">
        <Container className="py-16 lg:py-[72px]">
          <div className="max-w-[720px]">
            <Eyebrow className="mb-4">The landscape</Eyebrow>
            <SerifHeading className="text-[32px] leading-none md:text-[40px]">
              The innovation race everyone is running
            </SerifHeading>
            <div className={`mt-6 space-y-5 ${bodyText}`}>
              <p>
                Every mid-size American city has the same economic development plan:
                attract tech, train coders, build an &ldquo;innovation district,&rdquo;
                hope for a unicorn. They are all running the same race — against each other
                and against the established winners: the Bay Area, Austin, Seattle, Boston,
                Raleigh.
              </p>
              <p>
                Here is the problem with that race for Louisville:{" "}
                <strong className="font-semibold text-[#16130f]">
                  software has no home.
                </strong>{" "}
                It can be written anywhere, by anyone, for anyone. That is exactly what
                makes a tech advantage so hard to hold:
              </p>
            </div>

            <ul className="mt-6 flex flex-col">
              {[
                "Talent is mobile and remote-friendly; the best engineers go where the most engineers and the highest salaries already are.",
                "Capital is concentrated elsewhere and tends to pull its winners toward itself.",
                "Even a local success is portable: a software company can scale to a billion dollars and relocate its center of gravity without leaving a crater where it used to be.",
              ].map((item, i, arr) => (
                <li
                  key={item}
                  className={
                    "flex gap-4 border-t border-[#d8d2c5] py-4 text-[16px] leading-[1.7] text-[#4a443a] " +
                    (i === arr.length - 1 ? "border-b" : "")
                  }
                >
                  <span
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-[var(--kyx-purple)]"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className={`mt-6 space-y-5 ${bodyText}`}>
              <p>
                A city can spend a decade and a fortune nurturing a tech ecosystem and
                watch the returns walk out the door the moment they mature.{" "}
                <strong className="font-semibold text-[#16130f]">
                  You can fund the seed and someone else harvests the tree.
                </strong>
              </p>
              <p className="text-[#57503f]">
                This is not a knock on technology or on the talented people building it
                here. It is a sober read of where Louisville&apos;s durable leverage is —
                and isn&apos;t.
              </p>
            </div>

            <PullQuote>
              Compete where you have an advantage, not where you wish you did.
            </PullQuote>
          </div>
        </Container>
      </section>

      {/* Section 2 — Build what can't leave (the heart) */}
      <section className="border-b border-[#16130f] bg-[#eae5da]">
        <Container className="py-16 lg:py-[72px]">
          <div className="max-w-[720px]">
            <Eyebrow className="mb-4">The immovable advantages</Eyebrow>
            <SerifHeading className="text-[32px] leading-none md:text-[40px]">
              Build what can&apos;t leave
            </SerifHeading>
            <p className={`mt-6 ${bodyText}`}>
              Louisville has advantages that are the opposite of software. They are
              physical, fixed, and cannot be picked up and moved. A rival city cannot
              copy them next year with a budget line item. This is the entire point.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {ADVANTAGES.map(({ icon: Icon, label, title, body, kicker }) => (
              <div
                key={title}
                className="flex flex-col border border-[#d8d2c5] p-6 md:p-7"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center border border-[#d8d2c5]">
                    <Icon className="h-5 w-5 text-[#16130f]" aria-hidden />
                  </span>
                  <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.14em] text-[var(--kyx-purple)]">
                    {label}
                  </span>
                </div>
                <SerifHeading as="h3" className="mt-5 text-[24px] leading-none md:text-[28px]">
                  {title}
                </SerifHeading>
                <p className="mt-3 text-[15px] leading-[1.7] text-[#4a443a] md:text-[16px]">
                  {body}
                </p>
                <p className="mt-4 border-t border-[#d8d2c5] pt-4 text-[15px] leading-[1.7] text-[#16130f]">
                  {kicker}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 border border-[#d8d2c5] p-6 md:p-7">
            <Eyebrow className="mb-3">The workforce</Eyebrow>
            <p className={bodyText}>
              This is a metro that already knows how to move and make physical things at
              scale. The human capital of logistics and manufacturing is here — not
              something we have to import.
            </p>
          </div>

          <div className="mt-12 max-w-[720px]">
            <PullQuote>
              You can open a coding bootcamp anywhere. That is precisely why tech
              doesn&apos;t stick. You cannot move a river, a rail hub, an interstate
              crossroads, or the largest air hub on the continent.{" "}
              <strong className="font-medium text-[#16130f]">So build on those.</strong>
            </PullQuote>
          </div>
        </Container>
      </section>

      {/* Section 3 — Manufacturing makes the middle class */}
      <section className="border-b border-[#16130f]">
        <Container className="py-16 lg:py-[72px]">
          <div className="max-w-[720px]">
            <Eyebrow className="mb-4">Why manufacturing</Eyebrow>
            <SerifHeading className="text-[32px] leading-none md:text-[40px]">
              Manufacturing makes the middle class
            </SerifHeading>
            <div className={`mt-6 space-y-5 ${bodyText}`}>
              <p>
                Why manufacturing, and not just more warehouses? Manufacturing built the
                American middle class because it pays well without demanding a four-year
                degree, and because each plant seeds a web of suppliers, maintainers, and
                skilled trades around it. The wealth spreads.
              </p>
              <p>
                Tech, by contrast, concentrates enormous returns in a small,
                highly-credentialed group — wonderful for that group, thin comfort for
                everyone else in the city.
              </p>
              <p>
                For a place like Louisville,{" "}
                <strong className="font-semibold text-[#16130f]">
                  broad-based prosperity is the entire goal.
                </strong>{" "}
                The right question is not &ldquo;how do we create a few very rich
                companies?&rdquo; but &ldquo;how do we create a lot of good jobs that
                don&apos;t require a CS degree and don&apos;t leave?&rdquo;
              </p>
              <p>
                Logistics-enabled manufacturing answers that. And it lets Louisville climb
                the value chain: instead of competing for one more distribution center —
                warehouse jobs at the bottom of the margin stack — Louisville can capture
                the higher-wage jobs upstream of the warehouse: the people who design and
                build the products that the logistics network then moves.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Banner tone="paper">Manufacturing makes the middle class.</Banner>

      {/* Section 4 — mHUB */}
      <section className="border-b border-[#16130f]">
        <Container className="py-16 lg:py-[72px]">
          <div className="max-w-[720px]">
            <Eyebrow className="mb-4">The proven model</Eyebrow>
            <SerifHeading className="text-[32px] leading-none md:text-[40px]">
              mHUB
            </SerifHeading>
            <div className={`mt-6 space-y-5 ${bodyText}`}>
              <p>
                We are not inventing this from scratch. Chicago&apos;s mHUB is the proof of
                concept.
              </p>
              <p>
                mHUB is a hardtech (physical-product) incubator that opened in 2017. It put
                fabrication labs, a micro-factory for small production runs, technical
                training, corporate partners, and an in-house investment fund under one
                roof. The results are not theoretical: mHUB has supported 500+ startups that
                have collectively generated billions in economic activity, made dozens of
                direct startup investments, and built its model on demand-driven cohorts —
                corporate partners surface real problems on the front end, which become
                pilot and investment opportunities on the back end.
              </p>
            </div>

            <div className="mt-8 border border-[#d8d2c5] p-6 md:p-7">
              <p className="text-[18px] leading-[1.6] text-[#16130f] md:text-[19px]">
                The lesson from mHUB: co-locate the tools, the talent, the customers, and
                the capital, and you manufacture companies, not just products.
              </p>
            </div>

            <p className={`mt-6 ${bodyText}`}>
              The lesson Louisville should{" "}
              <em className="text-[#16130f]">adapt, not copy</em>: mHUB anchored itself to
              Chicago&apos;s existing manufacturing density.{" "}
              <strong className="font-semibold text-[#16130f]">
                Louisville&apos;s anchor is different — it&apos;s logistics gravity.
              </strong>{" "}
              Same machine, different fuel.
            </p>
          </div>
        </Container>
      </section>

      {/* Section 5 — What Lougistics actually is */}
      <section className="border-b border-[#16130f] bg-[#eae5da]">
        <Container className="py-16 lg:py-[72px]">
          <div className="max-w-[760px]">
            <Eyebrow className="mb-4">What it is</Eyebrow>
            <SerifHeading className="text-[32px] leading-none md:text-[40px]">
              What Lougistics actually is
            </SerifHeading>
            <p className={`mt-6 ${bodyText}`}>
              A single facility — mHUB started near 63,000 sq ft and expanded to 80,000 —
              with four integrated layers.
            </p>
          </div>

          <div className="mt-10 flex flex-col">
            {LAYERS.map(({ n, title, tag, body }, i, arr) => (
              <div
                key={n}
                className={
                  "grid grid-cols-[36px_minmax(0,1fr)] gap-x-4 gap-y-3 border-t border-[#d8d2c5] py-6 sm:grid-cols-[44px_minmax(0,1fr)] sm:gap-x-5 " +
                  (i === arr.length - 1 ? "border-b" : "")
                }
              >
                <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] leading-[2] text-[var(--kyx-purple)]">
                  {n}
                </span>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                    <SerifHeading as="h3" className="text-[24px] leading-none md:text-[28px]">
                      {title}
                    </SerifHeading>
                    {tag && (
                      <span className="border border-[#d8d2c5] px-2.5 py-1 font-[family-name:var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.14em] text-[var(--kyx-purple)]">
                        {tag}
                      </span>
                    )}
                  </div>
                  <p className="text-[15px] leading-[1.7] text-[#4a443a] md:text-[16px]">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 border border-[#16130f] p-8 md:p-10">
            <Eyebrow className="mb-4">The promise to a founder</Eyebrow>
            <p className="font-[family-name:var(--font-instrument-serif)] text-[24px] leading-snug tracking-[-0.02em] text-[#16130f] md:text-[30px]">
              Build your physical product in Louisville and ship it to two-thirds of the
              country overnight, with the latest cutoff in America — an advantage built
              into your company that your competitors in any other city simply cannot buy.
            </p>
          </div>
        </Container>
      </section>

      {/* Section 6 — Focus is the strategy */}
      <section className="border-b border-[#16130f]">
        <Container className="py-16 lg:py-[72px]">
          <div className="max-w-[720px]">
            <Eyebrow className="mb-4">The discipline</Eyebrow>
            <SerifHeading className="text-[32px] leading-none md:text-[40px]">
              Focus is the strategy
            </SerifHeading>
            <p className={`mt-6 ${bodyText}`}>
              The most important discipline of this proposal is what it refuses to do.
            </p>

            <ul className="mt-8 flex flex-col">
              {REFUSALS.map((item, i, arr) => (
                <li
                  key={item}
                  className={
                    "flex items-baseline gap-4 border-t border-[#d8d2c5] py-4 text-[16px] leading-[1.6] text-[#16130f] md:text-[17px] " +
                    (i === arr.length - 1 ? "border-b" : "")
                  }
                >
                  <span
                    className="font-[family-name:var(--font-ibm-plex-mono)] text-[13px] text-[var(--kyx-purple)]"
                    aria-hidden
                  >
                    ✕
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className={`mt-8 ${bodyText}`}>
              We are doing one thing: turning the most durable logistics advantage in North
              America into a manufacturing-company-creation engine that produces
              middle-class jobs that can&apos;t be relocated. Everything in Lougistics
              serves that single sentence.{" "}
              <strong className="font-semibold text-[#16130f]">
                The focus is not a limitation; it is the reason it will work.
              </strong>
            </p>
          </div>
        </Container>
      </section>

      {/* Section 7 — The ask (provisional) */}
      <section className="border-b border-[#16130f]">
        <Container className="py-16 lg:py-[72px]">
          <div className="max-w-[720px]">
            <div className="flex flex-wrap items-center gap-3">
              <Eyebrow>The ask</Eyebrow>
              <span className="border border-[var(--kyx-purple)]/40 px-3 py-1 font-[family-name:var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.14em] text-[var(--kyx-purple)]">
                Draft — figures provisional
              </span>
            </div>
            <SerifHeading className="mt-4 text-[32px] leading-none md:text-[40px]">
              Next steps
            </SerifHeading>
            <p className={`mt-6 ${bodyText} text-[#57503f]`}>
              This section is provisional. The components below are candidates; specific
              dollar figures and targets are placeholders until they are scoped and
              confirmed.
            </p>

            <ul className="mt-8 flex flex-col gap-4">
              <li className="border border-[#d8d2c5] p-5">
                <p className="text-[15px] leading-[1.7] text-[#4a443a] md:text-[16px]">
                  <strong className="font-semibold text-[#16130f]">A founding coalition:</strong>{" "}
                  Louisville Metro, One Louisville, the Riverport Authority, anchor
                  corporates (UPS et al.), a university partner, a philanthropic lead, and
                  additional partners to be confirmed.
                </p>
              </li>
              <li className="border border-[#d8d2c5] p-5">
                <p className="text-[15px] leading-[1.7] text-[#4a443a] md:text-[16px]">
                  <strong className="font-semibold text-[#16130f]">A facility commitment:</strong>{" "}
                  square footage plus location — Riverport / FTZ-adjacent is the obvious
                  candidate.
                </p>
              </li>
              <li className="border border-[#d8d2c5] p-5">
                <p className="text-[15px] leading-[1.7] text-[#4a443a] md:text-[16px]">
                  <strong className="font-semibold text-[#16130f]">
                    Seed capital and operating runway:
                  </strong>{" "}
                  <span className="bg-[#eae5da] px-2 py-0.5 font-[family-name:var(--font-ibm-plex-mono)] text-[12px] text-[#57503f]">
                    [$X over Y years — TBD]
                  </span>
                </p>
              </li>
              <li className="border border-[#d8d2c5] p-5">
                <p className="text-[15px] leading-[1.7] text-[#4a443a] md:text-[16px]">
                  <strong className="font-semibold text-[#16130f]">
                    Year-3 / year-5 targets:
                  </strong>{" "}
                  <span className="bg-[#eae5da] px-2 py-0.5 font-[family-name:var(--font-ibm-plex-mono)] text-[12px] text-[#57503f]">
                    [# startups · # jobs · $ economic activity — TBD]
                  </span>{" "}
                  modeled off mHUB&apos;s actuals once sourced.
                </p>
              </li>
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}
