import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lougistics — White Paper | KYX",
  description:
    "A proposal to convert Louisville's fixed logistics advantage into a manufacturing-company-creation engine — and the middle-class jobs that come with it.",
  openGraph: {
    title: "Lougistics — White Paper | KYX",
    description:
      "Building on the one advantage no other city can move. A proposal to convert Louisville's fixed logistics advantage into a manufacturing-company-creation engine.",
    type: "article",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://kycombinator.com"}/lougistics/whitepaper`,
    images: [`${process.env.NEXT_PUBLIC_CDN_URL}/assets/logo.png`],
  },
};

const eyebrow =
  "text-[11px] font-medium uppercase tracking-[0.28em] text-zinc-400";

const CONTENTS = [
  { id: "executive-summary", label: "Executive summary" },
  { id: "landscape", label: "1. The landscape" },
  { id: "build-what-cant-leave", label: "2. Build what can't leave" },
  { id: "middle-class", label: "3. Manufacturing makes the middle class" },
  { id: "mhub", label: "4. The proven model: mHUB" },
  { id: "what-it-is", label: "5. What Lougistics actually is" },
  { id: "focus", label: "6. Focus is the strategy" },
  { id: "the-ask", label: "7. The ask and next steps" },
  { id: "figures", label: "A note on the figures" },
];

function SectionHeading({ id, n, children }: { id: string; n?: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="scroll-mt-24 text-2xl font-semibold tracking-tight text-white md:text-3xl"
    >
      {n && <span className="mr-3 text-zinc-500">{n}</span>}
      {children}
    </h2>
  );
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-10 border-l-2 border-zinc-600 pl-6 text-xl font-medium leading-snug text-zinc-100 md:text-2xl">
      {children}
    </blockquote>
  );
}

const proseP =
  "text-base leading-relaxed text-zinc-300 md:text-[17px] md:leading-[1.75]";

export default function WhitePaperPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0b0b10] text-zinc-100">
      {/* Title page */}
      <section className="relative overflow-hidden border-b border-white/[0.06] py-20 md:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.045),transparent_60%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]"
        />
        <div className="container relative z-10 mx-auto max-w-3xl px-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className={eyebrow}>KY Combinator · White Paper</span>
            <span className="rounded-full border border-amber-400/30 bg-amber-400/[0.06] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-amber-300/90">
              Draft for discussion
            </span>
          </div>

          <h1 className="mt-6 text-5xl font-semibold tracking-tight text-white md:text-7xl">
            Lougistics
          </h1>
          <p className="mt-5 text-xl font-medium text-zinc-200 md:text-2xl">
            Building on the one advantage no other city can move.
          </p>
          <p className="mt-2 text-xl font-medium text-zinc-400 md:text-2xl">
            Manufacturing makes the middle class.
          </p>

          <p className={`mt-8 max-w-2xl ${proseP}`}>
            A proposal to convert Louisville&apos;s fixed logistics advantage into a
            manufacturing-company-creation engine — and the middle-class jobs that come
            with it.
          </p>

          <dl className="mt-10 grid gap-x-8 gap-y-4 border-t border-white/[0.06] pt-8 sm:grid-cols-2">
            <div>
              <dt className={eyebrow}>Prepared for</dt>
              <dd className="mt-1.5 text-sm text-zinc-300">
                Economic development and public-sector partners
              </dd>
            </div>
            <div>
              <dt className={eyebrow}>Status</dt>
              <dd className="mt-1.5 text-sm text-zinc-300">
                Draft for discussion ·{" "}
                <Link href="/lougistics" className="underline decoration-zinc-600 underline-offset-4 hover:text-white">
                  kycombinator.com/lougistics
                </Link>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <div className="container mx-auto max-w-3xl px-4">
        {/* Contents */}
        <nav aria-label="Contents" className="border-b border-white/[0.06] py-10 md:py-12">
          <p className={eyebrow}>Contents</p>
          <ol className="mt-5 space-y-2.5">
            {CONTENTS.map((c) => (
              <li key={c.id}>
                <a
                  href={`#${c.id}`}
                  className="text-base text-zinc-400 transition-colors hover:text-white"
                >
                  {c.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="divide-y divide-white/[0.06]">
          {/* Executive summary */}
          <section className="py-12 md:py-16">
            <SectionHeading id="executive-summary">Executive summary</SectionHeading>
            <div className="mt-6 space-y-5">
              <p className={proseP}>
                Every mid-size American city has been handed the same economic development
                playbook: attract technology companies, train software engineers, build an
                innovation district, and wait for a breakout. Louisville is being
                encouraged to run that same race. It should not.
              </p>
              <p className={proseP}>
                The reason is simple. Software has no home. It can be written anywhere, by
                anyone, for anyone — which means a tech advantage is almost impossible to
                hold. Talent and capital concentrate elsewhere, and even a local success
                can scale to enormous size and then relocate its center of gravity without
                leaving a trace behind. A city can spend a decade and a fortune nurturing a
                tech ecosystem only to watch the returns walk out the door.
              </p>
              <p className={proseP}>
                Louisville holds a different kind of advantage — one that is physical,
                fixed, and impossible for a rival city to copy or relocate. It is the
                logistics center of North America: the UPS Worldport air hub, a convergence
                of three interstates, three Class I railroads, and the Ohio River, a
                Foreign-Trade Zone, and a workforce that already knows how to move and make
                physical goods at scale. You cannot open a Worldport in Tulsa.
              </p>
              <p className={proseP}>
                This paper proposes Lougistics: an incubator, micro-factory,
                logistics-integration layer, and seed fund — modeled on Chicago&apos;s
                proven mHUB hardtech incubator, but anchored to Louisville&apos;s logistics
                gravity rather than to existing manufacturing density. The goal is to
                convert a fixed advantage into companies and into the middle-class jobs that
                sit upstream of the warehouse.
              </p>
            </div>
            <PullQuote>
              Compete where you have an advantage, not where you wish you did.
            </PullQuote>
          </section>

          {/* 1. Landscape */}
          <section className="py-12 md:py-16">
            <SectionHeading id="landscape" n="1.">The landscape: the race everyone is running</SectionHeading>
            <div className="mt-6 space-y-5">
              <p className={proseP}>
                The standard innovation-economy strategy is now so widespread it has become
                a monoculture. Attract tech. Train coders. Build an &ldquo;innovation
                district.&rdquo; Hope for a unicorn. Nearly every mid-size city in America
                is running this race — against each other, and against the entrenched
                winners: the Bay Area, Austin, Seattle, Boston, and Raleigh.
              </p>
              <p className={proseP}>
                The problem for Louisville is structural, not a matter of effort or
                ambition. Software has no home, and that single fact undermines the whole
                strategy:
              </p>
            </div>
            <ul className="mt-6 space-y-4">
              {[
                "Talent is mobile and remote-friendly. The best engineers gravitate to where the most engineers — and the highest salaries — already are.",
                "Capital is concentrated elsewhere, and it tends to pull its winners toward itself.",
                "Even a genuine local success is portable. A software company can grow to a billion dollars in value and shift its center of gravity to another city without leaving a crater where it used to be.",
              ].map((item) => (
                <li key={item} className="flex gap-4 rounded-xl border border-white/[0.06] bg-white/[0.015] p-5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" />
                  <p className="text-sm leading-relaxed text-zinc-300 md:text-base">{item}</p>
                </li>
              ))}
            </ul>
            <p className={`mt-6 ${proseP}`}>
              The result is a painful asymmetry: a city can fund the seed, and watch
              someone else harvest the tree. This is not a criticism of technology or of
              the talented people building it in Louisville today. It is a sober assessment
              of where the city&apos;s durable leverage is — and where it is not.
            </p>
            <PullQuote>
              A city can fund the seed and watch someone else harvest the tree.
            </PullQuote>
          </section>

          {/* 2. Build what can't leave */}
          <section className="py-12 md:py-16">
            <SectionHeading id="build-what-cant-leave" n="2.">Build what can&apos;t leave</SectionHeading>
            <p className={`mt-6 ${proseP}`}>
              Louisville&apos;s real advantages are the opposite of software. They are
              physical, fixed, and cannot be picked up and moved. A rival city cannot
              replicate them next year with a line in its budget. That immovability is the
              entire point of this proposal.
            </p>

            <div className="mt-8 space-y-6">
              {[
                {
                  h: "Worldport",
                  b: "The UPS Worldport at Louisville Muhammad Ali International Airport is the nerve center of UPS's global air network — on the order of 5.2 million square feet, handling roughly two million packages a day, with several hundred flights daily connecting more than 200 countries and territories. It is the single largest air-logistics node on the continent. Critically for the businesses around it, a Louisville-based shipper enjoys the latest drop-off cutoff in the country: a company here can finish, pack, and dispatch a product late in the day and still make next-day delivery windows. A business that designs its operations around that cutoff is effectively bolted to Louisville.",
                },
                {
                  h: "The crossroads",
                  b: "Louisville sits at the intersection of Interstates 64, 65, and 71, placing roughly two-thirds of the U.S. population within a single day's drive. It is served by three Class I railroads and sits on the Ohio River, connected to the Mississippi and the national barge network. River, road, rail, and runway converge in one place. This is bedrock geography, not a policy a competitor can rewrite.",
                },
                {
                  h: "Foreign-Trade Zone #29 and the Riverport",
                  b: "Louisville already operates Foreign-Trade Zone #29, offering duty-deferral advantages to importers and exporters, and the Riverport is home to more than 100 companies already engaged in manufacturing, logistics, and distribution. The cluster is not hypothetical — it exists, and the ground is already broken.",
                },
                {
                  h: "The workforce",
                  b: "This is a metro that already knows how to move and make physical things at scale. The human capital of logistics and manufacturing is here — it does not have to be imported or invented.",
                },
              ].map(({ h, b }) => (
                <div key={h}>
                  <h3 className="text-lg font-semibold text-white md:text-xl">{h}</h3>
                  <p className={`mt-3 ${proseP}`}>{b}</p>
                </div>
              ))}
            </div>

            <PullQuote>
              You can open a coding bootcamp anywhere. That is precisely why tech
              doesn&apos;t stick. You cannot move a river, a rail hub, an interstate
              crossroads, or the largest air hub on the continent.
            </PullQuote>
          </section>

          {/* 3. Middle class */}
          <section className="py-12 md:py-16">
            <SectionHeading id="middle-class" n="3.">Manufacturing makes the middle class</SectionHeading>
            <div className="mt-6 space-y-5">
              <p className={proseP}>
                Why manufacturing — and not simply more warehouses? Because of what
                manufacturing does to a local economy.
              </p>
              <p className={proseP}>
                Manufacturing built the American middle class for two reasons. It pays well
                without demanding a four-year degree, and each plant seeds a web of
                suppliers, maintainers, and skilled trades around it. The wealth spreads
                outward. Technology, by contrast, concentrates enormous returns within a
                small, highly-credentialed group — a tremendous outcome for that group, and
                thin comfort for everyone else in the city.
              </p>
              <p className={proseP}>
                For a place like Louisville, broad-based prosperity is the entire goal. The
                right question is not &ldquo;how do we create a handful of very valuable
                companies?&rdquo; It is &ldquo;how do we create a large number of good jobs
                that don&apos;t require a computer-science degree and don&apos;t
                leave?&rdquo;
              </p>
              <p className={proseP}>
                Logistics-enabled manufacturing answers that question, and it lets
                Louisville climb the value chain. Instead of competing for one more
                distribution center — warehouse jobs that sit at the bottom of the margin
                stack — Louisville can capture the higher-wage jobs upstream of the
                warehouse: the people who design and build the products that the logistics
                network then moves.
              </p>
            </div>
            <PullQuote>Manufacturing makes the middle class.</PullQuote>
          </section>

          {/* 4. mHUB */}
          <section className="py-12 md:py-16">
            <SectionHeading id="mhub" n="4.">The proven model: mHUB</SectionHeading>
            <div className="mt-6 space-y-5">
              <p className={proseP}>
                This is not invented from scratch. Chicago&apos;s mHUB is the proof of
                concept.
              </p>
              <p className={proseP}>
                mHUB is a hardtech — physical-product — incubator that opened in 2017. It
                put fabrication labs, a micro-factory for small production runs, technical
                training, corporate partners, and an in-house investment fund under one
                roof. The results are not theoretical: mHUB has supported more than 500
                startups that have collectively generated billions of dollars in economic
                activity, made dozens of direct startup investments, and built its model on
                demand-driven cohorts — corporate partners surface real problems on the
                front end, which become pilot and investment opportunities on the back end.
              </p>
              <p className={proseP}>
                The lesson from mHUB is that if you co-locate the tools, the talent, the
                customers, and the capital, you manufacture companies — not just products.
              </p>
              <p className={proseP}>
                The lesson Louisville should adapt rather than copy: mHUB anchored itself to
                Chicago&apos;s existing manufacturing density. Louisville&apos;s anchor is
                different. It is logistics gravity.{" "}
                <strong className="font-semibold text-white">
                  Same machine, different fuel.
                </strong>
              </p>
            </div>
          </section>

          {/* 5. What it is */}
          <section className="py-12 md:py-16">
            <SectionHeading id="what-it-is" n="5.">What Lougistics actually is</SectionHeading>
            <p className={`mt-6 ${proseP}`}>
              Lougistics is a single facility — mHUB began near 63,000 square feet and
              expanded to 80,000 — offering four integrated layers:
            </p>

            <div className="mt-8 space-y-4">
              {[
                {
                  n: "01",
                  h: "Shared fabrication and micro-factory",
                  b: "Rapid prototyping, electronics, metals, plastics, and small-run production lines, open to any physical-product company rather than pre-sorted into favored sectors. The logistics advantage is the filter; let it attract whoever it attracts, and let the market reveal where Louisville's edge bites hardest.",
                },
                {
                  n: "02",
                  h: "A logistics-integration layer",
                  tag: "the part mHUB doesn't have",
                  b: "Embedded access to Worldport's late cutoffs, FTZ #29 benefits, customs and export support, and 3PL and fulfillment partners. Founders here learn to design products for the supply chain, not merely for manufacturability. This is the differentiator no other incubator in the country can offer.",
                },
                {
                  n: "03",
                  h: "A demand-driven accelerator",
                  b: "Cohorts tied to corporate partners — a natural list includes UPS and its healthcare arm, GE Appliances, Ford, and regional 3PL and health-logistics players — who bring real problems and real pilot opportunities. Cohorts form around the founders who apply, not around a committee's guess at the right verticals.",
                },
                {
                  n: "04",
                  h: "A small seed fund",
                  b: "A Louisville analog to mHUB Ventures: pre-seed checks for modest equity, capitalized by a coalition of public, corporate, and philanthropic money.",
                },
              ].map(({ n, h, tag, b }) => (
                <div key={n} className="rounded-2xl border border-white/[0.06] bg-white/[0.015] p-7">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-sm font-medium text-zinc-500">{n}</span>
                    <h3 className="text-lg font-semibold text-white md:text-xl">{h}</h3>
                  </div>
                  {tag && (
                    <span className="mt-3 inline-block rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-300">
                      {tag}
                    </span>
                  )}
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400 md:text-base">{b}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 md:p-10">
              <p className={eyebrow}>The promise to a founder</p>
              <p className="mt-4 text-xl font-medium leading-snug text-white md:text-2xl">
                Build your physical product in Louisville and ship it to two-thirds of the
                country overnight, with the latest cutoff in America — an advantage built
                into your company that competitors in any other city simply cannot buy.
              </p>
            </div>
          </section>

          {/* 6. Focus */}
          <section className="py-12 md:py-16">
            <SectionHeading id="focus" n="6.">Focus is the strategy</SectionHeading>
            <p className={`mt-6 ${proseP}`}>
              The most important discipline of this proposal is what it refuses to do.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "It is not a generic innovation district.",
                "It is not a tech scene Louisville cannot win.",
                "It is not an attempt to be all things to all founders.",
              ].map((item) => (
                <li key={item} className="flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.015] p-5 text-base text-zinc-200 md:text-lg">
                  <span className="text-zinc-600" aria-hidden>✕</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className={`mt-8 ${proseP}`}>
              Lougistics does one thing: it turns the most durable logistics advantage in
              North America into a manufacturing-company-creation engine that produces
              middle-class jobs that cannot be relocated. Every element of the proposal
              serves that single sentence.{" "}
              <strong className="font-semibold text-white">
                The focus is not a limitation — it is the reason it will work.
              </strong>
            </p>
          </section>

          {/* 7. The ask */}
          <section className="py-12 md:py-16">
            <div className="flex flex-wrap items-center gap-3">
              <SectionHeading id="the-ask" n="7.">The ask and next steps</SectionHeading>
            </div>
            <div className="mt-4">
              <span className="rounded-full border border-amber-400/30 bg-amber-400/[0.06] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-amber-300/90">
                Provisional — figures to be confirmed
              </span>
            </div>
            <p className={`mt-6 ${proseP}`}>
              This section is provisional. The figures and commitments below are
              placeholders to be confirmed before this paper is finalized; they are
              included to show the shape of the request, not its final magnitude.
            </p>

            <h3 className="mt-8 text-lg font-semibold text-white md:text-xl">
              A founding coalition
            </h3>
            <p className={`mt-3 ${proseP}`}>
              Louisville Metro and Louisville Forward, Greater Louisville Inc., the
              Riverport Authority, one or more anchor corporate partners (UPS foremost among
              them), a university partner, and a philanthropic lead.
            </p>

            <h3 className="mt-8 text-lg font-semibold text-white md:text-xl">
              Core commitments
            </h3>
            <ul className="mt-4 space-y-4">
              <li className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-5">
                <p className="text-sm leading-relaxed text-zinc-300 md:text-base">
                  A facility commitment — square footage and location, with a Riverport or
                  FTZ-adjacent site the obvious candidate.{" "}
                  <span className="rounded bg-white/[0.06] px-2 py-0.5 font-mono text-xs text-zinc-400">
                    [To be scoped]
                  </span>
                </p>
              </li>
              <li className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-5">
                <p className="text-sm leading-relaxed text-zinc-300 md:text-base">
                  Seed capital for the fund and operating runway.{" "}
                  <span className="rounded bg-white/[0.06] px-2 py-0.5 font-mono text-xs text-zinc-400">
                    [$X over Y years — to be confirmed]
                  </span>
                </p>
              </li>
              <li className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-5">
                <p className="text-sm leading-relaxed text-zinc-300 md:text-base">
                  A year-three and year-five outcome target — number of startups, jobs
                  created, and economic activity generated — modeled on mHUB&apos;s
                  documented results.{" "}
                  <span className="rounded bg-white/[0.06] px-2 py-0.5 font-mono text-xs text-zinc-400">
                    [To be modeled from primary sources]
                  </span>
                </p>
              </li>
            </ul>

            <p className={`mt-8 ${proseP}`}>
              The next step is to convene the founding coalition, confirm a facility, and
              size the fund. From there, the first cohort can be recruited against the
              single promise at the heart of this paper: in Louisville, the supply chain is
              not an afterthought. It is built into your company from day one.
            </p>
          </section>

          {/* Note on figures */}
          <section className="py-12 md:py-16">
            <SectionHeading id="figures">A note on the figures</SectionHeading>
            <div className="mt-6 rounded-2xl border border-white/[0.06] bg-white/[0.015] p-7 md:p-8">
              <p className="text-sm leading-relaxed text-zinc-400 md:text-base">
                The quantitative claims in this paper — Worldport&apos;s scale and daily
                volumes, the share of the U.S. population within a day&apos;s drive, the
                interstate, rail, and river assets, Foreign-Trade Zone #29, and
                mHUB&apos;s startup and economic-impact numbers — were assembled from public
                reporting and organizational sources. They are directionally reliable but
                should be verified against primary sources (UPS, the airport authority, the
                Riverport Authority, and mHUB directly) and given full citations before this
                paper is published or used in a formal funding request. Every figure should
                be read as approximate until confirmed.
              </p>
            </div>
          </section>
        </article>

        {/* Footer nav */}
        <div className="flex flex-col gap-3 border-t border-white/[0.06] py-12 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/lougistics"
            className="group inline-flex items-center text-sm font-medium text-zinc-300 transition-colors hover:text-white"
          >
            <svg className="mr-1.5 h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
            </svg>
            Back to the Lougistics overview
          </Link>
          <a
            href="#"
            className="inline-flex items-center text-sm font-medium text-zinc-500 transition-colors hover:text-white"
          >
            Back to top
          </a>
        </div>
      </div>
    </div>
  );
}
