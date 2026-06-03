import type { Metadata } from "next";
import Link from "next/link";
import { Plane, Truck, TrainFront, Ship } from "lucide-react";

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

const eyebrow =
  "text-[11px] font-medium uppercase tracking-[0.28em] text-zinc-400";

function Banner({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative border-y border-white/[0.06] bg-white/[0.015] py-16 md:py-24">
      <div className="container mx-auto px-4">
        <p className="mx-auto max-w-4xl text-center text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl md:leading-[1.1]">
          {children}
        </p>
      </div>
    </section>
  );
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-10 border-l-2 border-zinc-600 pl-6 text-xl font-medium leading-snug text-zinc-200 md:text-2xl">
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

export default function LougisticsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0b0b10] text-zinc-100">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/[0.06] py-24 md:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_60%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]"
        />
        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <span className={`mb-6 inline-flex items-center gap-2 ${eyebrow}`}>
              <span className="h-px w-8 bg-zinc-700" />
              Louisville, KY · A proposal
              <span className="h-px w-8 bg-zinc-700" />
            </span>
            <h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">
              Lougistics
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-300 md:text-lg">
              Every city is being told to build a tech scene. Louisville should not.
              Louisville should build on the one set of advantages no rival city can
              copy, relocate, or out-spend: it is the logistics center of North America.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">
              Lougistics turns that fixed, physical advantage into a
              manufacturing-company-creation engine — and captures the middle-class jobs
              that sit upstream of the warehouse.
            </p>

            <div className="mt-10">
              <Link
                href="/lougistics/whitepaper"
                className="group inline-flex items-center justify-center rounded-md bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 transition-colors duration-200 hover:bg-zinc-200"
              >
                Read the white paper
                <svg
                  className="ml-1.5 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Banner>Manufacturing makes the middle class.</Banner>

      <div className="container mx-auto max-w-3xl px-4">
        {/* Section 1 — The landscape */}
        <section className="py-16 md:py-24">
          <p className={eyebrow}>The landscape</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            The innovation race everyone is running
          </h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-zinc-300 md:text-lg">
            <p>
              Every mid-size American city has the same economic development plan:
              attract tech, train coders, build an &ldquo;innovation district,&rdquo;
              hope for a unicorn. They are all running the same race — against each other
              and against the established winners: the Bay Area, Austin, Seattle, Boston,
              Raleigh.
            </p>
            <p>
              Here is the problem with that race for Louisville:{" "}
              <strong className="font-semibold text-white">software has no home.</strong>{" "}
              It can be written anywhere, by anyone, for anyone. That is exactly what
              makes a tech advantage so hard to hold:
            </p>
          </div>

          <ul className="mt-6 space-y-4">
            {[
              "Talent is mobile and remote-friendly; the best engineers go where the most engineers and the highest salaries already are.",
              "Capital is concentrated elsewhere and tends to pull its winners toward itself.",
              "Even a local success is portable: a software company can scale to a billion dollars and relocate its center of gravity without leaving a crater where it used to be.",
            ].map((item) => (
              <li
                key={item}
                className="flex gap-4 rounded-xl border border-white/[0.06] bg-white/[0.015] p-5"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" />
                <p className="text-sm leading-relaxed text-zinc-300 md:text-base">
                  {item}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-6 space-y-5 text-base leading-relaxed text-zinc-300 md:text-lg">
            <p>
              A city can spend a decade and a fortune nurturing a tech ecosystem and
              watch the returns walk out the door the moment they mature.{" "}
              <strong className="font-semibold text-white">
                You can fund the seed and someone else harvests the tree.
              </strong>
            </p>
            <p className="text-zinc-400">
              This is not a knock on technology or on the talented people building it
              here. It is a sober read of where Louisville&apos;s durable leverage is —
              and isn&apos;t.
            </p>
          </div>

          <PullQuote>
            Compete where you have an advantage, not where you wish you did.
          </PullQuote>
        </section>
      </div>

      {/* Section 2 — Build what can't leave (the heart) */}
      <section className="border-y border-white/[0.06] bg-white/[0.01] py-16 md:py-24">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="max-w-3xl">
            <p className={eyebrow}>The immovable advantages</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">
              Build what can&apos;t leave
            </h2>
            <p className="mt-6 text-base leading-relaxed text-zinc-300 md:text-lg">
              Louisville has advantages that are the opposite of software. They are
              physical, fixed, and cannot be picked up and moved. A rival city cannot
              copy them next year with a budget line item. This is the entire point.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {ADVANTAGES.map(({ icon: Icon, label, title, body, kicker }) => (
              <div
                key={title}
                className="flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.015] p-7"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02]">
                    <Icon className="h-5 w-5 text-zinc-200" aria-hidden />
                  </span>
                  <span className={eyebrow}>{label}</span>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white md:text-2xl">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400 md:text-base">
                  {body}
                </p>
                <p className="mt-4 border-t border-white/[0.06] pt-4 text-sm font-medium leading-relaxed text-zinc-200">
                  {kicker}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-white/[0.06] bg-white/[0.015] p-7">
            <p className={eyebrow}>The workforce</p>
            <p className="mt-3 text-base leading-relaxed text-zinc-300 md:text-lg">
              This is a metro that already knows how to move and make physical things at
              scale. The human capital of logistics and manufacturing is here — not
              something we have to import.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-3xl">
            <PullQuote>
              You can open a coding bootcamp anywhere. That is precisely why tech
              doesn&apos;t stick. You cannot move a river, a rail hub, an interstate
              crossroads, or the largest air hub on the continent.{" "}
              <span className="text-white">So build on those.</span>
            </PullQuote>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-3xl px-4">
        {/* Section 3 — Manufacturing makes the middle class */}
        <section className="py-16 md:py-24">
          <p className={eyebrow}>Why manufacturing</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Manufacturing makes the middle class
          </h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-zinc-300 md:text-lg">
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
              <strong className="font-semibold text-white">
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
        </section>
      </div>

      <Banner>Manufacturing makes the middle class.</Banner>

      <div className="container mx-auto max-w-3xl px-4">
        {/* Section 4 — mHUB */}
        <section className="py-16 md:py-24">
          <p className={eyebrow}>The proven model</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            mHUB
          </h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-zinc-300 md:text-lg">
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

          <div className="mt-8 rounded-2xl border border-white/[0.06] bg-white/[0.015] p-7">
            <p className="text-base leading-relaxed text-zinc-200 md:text-lg">
              The lesson from mHUB: co-locate the tools, the talent, the customers, and
              the capital, and you manufacture companies, not just products.
            </p>
          </div>

          <p className="mt-6 text-base leading-relaxed text-zinc-300 md:text-lg">
            The lesson Louisville should{" "}
            <em className="text-white">adapt, not copy</em>: mHUB anchored itself to
            Chicago&apos;s existing manufacturing density.{" "}
            <strong className="font-semibold text-white">
              Louisville&apos;s anchor is different — it&apos;s logistics gravity.
            </strong>{" "}
            Same machine, different fuel.
          </p>
        </section>
      </div>

      {/* Section 5 — What Lougistics actually is */}
      <section className="border-y border-white/[0.06] bg-white/[0.01] py-16 md:py-24">
        <div className="container mx-auto max-w-3xl px-4">
          <p className={eyebrow}>What it is</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">
            What Lougistics actually is
          </h2>
          <p className="mt-6 text-base leading-relaxed text-zinc-300 md:text-lg">
            A single facility — mHUB started near 63,000 sq ft and expanded to 80,000 —
            with four integrated layers.
          </p>

          <div className="mt-10 space-y-4">
            {LAYERS.map(({ n, title, tag, body }) => (
              <div
                key={n}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.015] p-7"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-sm font-medium text-zinc-500">
                    {n}
                  </span>
                  <h3 className="text-xl font-semibold text-white md:text-2xl">
                    {title}
                  </h3>
                </div>
                {tag && (
                  <span className="mt-3 inline-block rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-300">
                    {tag}
                  </span>
                )}
                <p className="mt-3 text-sm leading-relaxed text-zinc-400 md:text-base">
                  {body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 md:p-10">
            <p className={eyebrow}>The promise to a founder</p>
            <p className="mt-4 text-xl font-medium leading-snug text-white md:text-2xl">
              Build your physical product in Louisville and ship it to two-thirds of the
              country overnight, with the latest cutoff in America — an advantage built
              into your company that your competitors in any other city simply cannot buy.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-3xl px-4">
        {/* Section 6 — Focus is the strategy */}
        <section className="py-16 md:py-24">
          <p className={eyebrow}>The discipline</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Focus is the strategy
          </h2>
          <p className="mt-6 text-base leading-relaxed text-zinc-300 md:text-lg">
            The most important discipline of this proposal is what it refuses to do.
          </p>

          <ul className="mt-8 space-y-3">
            {REFUSALS.map((item) => (
              <li
                key={item}
                className="flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.015] p-5 text-base text-zinc-200 md:text-lg"
              >
                <span className="text-zinc-600" aria-hidden>
                  ✕
                </span>
                {item}
              </li>
            ))}
          </ul>

          <p className="mt-8 text-base leading-relaxed text-zinc-300 md:text-lg">
            We are doing one thing: turning the most durable logistics advantage in North
            America into a manufacturing-company-creation engine that produces
            middle-class jobs that can&apos;t be relocated. Everything in Lougistics
            serves that single sentence.{" "}
            <strong className="font-semibold text-white">
              The focus is not a limitation; it is the reason it will work.
            </strong>
          </p>
        </section>
      </div>

      {/* Section 7 — The ask (provisional) */}
      <section className="border-t border-white/[0.06] bg-white/[0.01] py-16 md:py-24">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="flex flex-wrap items-center gap-3">
            <p className={eyebrow}>The ask</p>
            <span className="rounded-full border border-amber-400/30 bg-amber-400/[0.06] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-amber-300/90">
              Draft — figures provisional
            </span>
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Next steps
          </h2>
          <p className="mt-6 text-base leading-relaxed text-zinc-400 md:text-lg">
            This section is provisional. The components below are candidates; specific
            dollar figures and targets are placeholders until they are scoped and
            confirmed.
          </p>

          <ul className="mt-8 space-y-4">
            <li className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-5">
              <p className="text-sm leading-relaxed text-zinc-300 md:text-base">
                <strong className="font-semibold text-white">A founding coalition:</strong>{" "}
                Louisville Metro / Louisville Forward, Greater Louisville Inc., the
                Riverport Authority, anchor corporates (UPS et al.), a university partner,
                and a philanthropic lead.
              </p>
            </li>
            <li className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-5">
              <p className="text-sm leading-relaxed text-zinc-300 md:text-base">
                <strong className="font-semibold text-white">A facility commitment:</strong>{" "}
                square footage plus location — Riverport / FTZ-adjacent is the obvious
                candidate.
              </p>
            </li>
            <li className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-5">
              <p className="text-sm leading-relaxed text-zinc-300 md:text-base">
                <strong className="font-semibold text-white">
                  Seed capital and operating runway:
                </strong>{" "}
                <span className="rounded bg-white/[0.06] px-2 py-0.5 font-mono text-xs text-zinc-400">
                  [$X over Y years — TBD]
                </span>
              </p>
            </li>
            <li className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-5">
              <p className="text-sm leading-relaxed text-zinc-300 md:text-base">
                <strong className="font-semibold text-white">
                  Year-3 / year-5 targets:
                </strong>{" "}
                <span className="rounded bg-white/[0.06] px-2 py-0.5 font-mono text-xs text-zinc-400">
                  [# startups · # jobs · $ economic activity — TBD]
                </span>{" "}
                modeled off mHUB&apos;s actuals once sourced.
              </p>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
