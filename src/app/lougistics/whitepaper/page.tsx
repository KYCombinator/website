import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "./PrintButton";

const WP_TITLE = "Lougistics — White Paper | KYX";
const WP_DESC =
  "Building on the one advantage no other city can move. A proposal to convert Louisville's fixed logistics advantage into a manufacturing-company-creation engine — and the middle-class jobs that come with it.";
const WP_URL = `${process.env.NEXT_PUBLIC_SITE_URL || "https://kycombinator.com"}/lougistics/whitepaper`;
const WP_IMAGE = `${process.env.NEXT_PUBLIC_CDN_URL}/assets/logo.png`;

export const metadata: Metadata = {
  title: WP_TITLE,
  description: WP_DESC,
  alternates: { canonical: WP_URL },
  openGraph: {
    title: WP_TITLE,
    description: WP_DESC,
    type: "article",
    siteName: "KYCombinator",
    url: WP_URL,
    images: [{ url: WP_IMAGE, alt: "Lougistics white paper — KYCombinator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: WP_TITLE,
    description: WP_DESC,
    images: [WP_IMAGE],
  },
};

const CONTENTS = [
  { id: "executive-summary", label: "Executive summary" },
  { id: "landscape", label: "1.  The landscape: the race everyone is running" },
  { id: "build-what-cant-leave", label: "2.  Build what can't leave" },
  { id: "middle-class", label: "3.  Manufacturing makes the middle class" },
  { id: "mhub", label: "4.  The proven model: mHUB" },
  { id: "what-it-is", label: "5.  What Lougistics actually is" },
  { id: "focus", label: "6.  Focus is the strategy" },
  { id: "the-ask", label: "7.  The ask and next steps" },
  { id: "figures", label: "A note on the figures" },
];

const body =
  "mt-5 text-[16px] leading-[1.8] text-[#4a443a] [text-align:justify] [hyphens:auto] [text-justify:inter-word] md:text-[17px]";
const listText =
  "mt-5 list-disc space-y-2.5 pl-7 text-[16px] leading-[1.75] text-[#4a443a] md:text-[17px] marker:text-[var(--kyx-purple)]";

const mono =
  "font-[family-name:var(--font-ibm-plex-mono)]";

function H1({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="mb-2 mt-16 scroll-mt-8 border-b border-[#d8d2c5] pb-2.5 font-[family-name:var(--font-instrument-serif)] text-[28px] leading-none tracking-[-0.02em] text-[#16130f] md:text-[34px]"
    >
      {children}
    </h2>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-9 font-[family-name:var(--font-instrument-serif)] text-[22px] leading-none tracking-[-0.02em] text-[#16130f] md:text-[26px]">
      {children}
    </h3>
  );
}

function Quote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="mx-auto my-12 max-w-[44ch] border-y border-[#d8d2c5] py-7 text-center font-[family-name:var(--font-instrument-serif)] text-[24px] leading-snug tracking-[-0.02em] text-[#16130f] md:text-[30px]">
      {children}
    </blockquote>
  );
}

export default function WhitePaperPage() {
  return (
    <div className="px-0 py-0 sm:px-6 sm:py-14 print:p-0">
      {/* Toolbar (screen only) */}
      <div className="mx-auto mb-6 flex max-w-[820px] items-center justify-between px-5 print:hidden sm:px-0">
        <Link
          href="/lougistics"
          className={`group inline-flex items-center ${mono} text-[11px] uppercase tracking-[0.08em] text-[#57503f] transition-colors hover:text-[#16130f]`}
        >
          <svg className="mr-1.5 h-4 w-4 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          Back to overview
        </Link>
        <PrintButton />
      </div>

      {/* The paper sheet */}
      <article className="mx-auto max-w-[820px] px-5 py-14 sm:px-7 sm:py-16 md:px-10 md:py-20 print:max-w-none print:px-0 print:py-0">
        {/* Cover / masthead — centered title page */}
        <header className="mb-4 text-center">
          <p className={`${mono} text-[11px] font-medium uppercase tracking-[0.24em] text-[var(--kyx-purple)]`}>
            KYCombinator
          </p>

          <div aria-hidden className="mx-auto mt-8 h-px w-16 bg-[#d8d2c5]" />

          <h1 className="mt-8 font-[family-name:var(--font-instrument-serif)] text-[60px] font-normal leading-none tracking-[-0.02em] text-[#16130f] md:text-[84px]">
            Lougistics
          </h1>
          <p className="mx-auto mt-6 max-w-md font-[family-name:var(--font-instrument-serif)] text-[22px] italic leading-snug text-[#57503f] md:text-[26px]">
            Building on the one advantage no other city can move.
          </p>

          <p className="mx-auto mt-12 max-w-lg font-[family-name:var(--font-instrument-serif)] text-[26px] leading-snug tracking-[-0.02em] text-[#16130f] md:text-[32px]">
            Manufacturing makes the middle class.
          </p>

          <p className="mx-auto mt-10 max-w-xl text-[16px] leading-relaxed text-[#4a443a] md:text-[17px]">
            A proposal to convert Louisville&apos;s fixed logistics advantage into a
            manufacturing-company-creation engine — and the middle-class jobs that come
            with it.
          </p>

          <div className={`mx-auto mt-14 flex max-w-md flex-col gap-1.5 border-t border-[#d8d2c5] pt-7 ${mono} text-[12px] uppercase tracking-[0.08em] text-[#7d766a]`}>
            <p className="font-medium tracking-[0.14em] text-[#16130f]">
              White Paper
            </p>
            <p className="normal-case tracking-normal">Prepared for economic development and public-sector partners</p>
            <p className="normal-case tracking-normal">
              Draft for discussion ·{" "}
              <Link
                href="/lougistics"
                className="border-b border-[var(--kyx-purple)] pb-0.5 text-[#16130f] transition-opacity hover:opacity-70"
              >
                kycombinator.com/lougistics
              </Link>
            </p>
          </div>
        </header>

        {/* Contents */}
        <nav
          aria-label="Contents"
          className="mt-16 border-t border-[#d8d2c5] pt-12 print:hidden"
        >
          <h2 className={`${mono} text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--kyx-purple)]`}>
            Contents
          </h2>
          <ol className="mt-5 space-y-2.5 text-[15px] text-[#4a443a]">
            {CONTENTS.map((c) => (
              <li key={c.id}>
                <a
                  href={`#${c.id}`}
                  className="underline-offset-2 transition-colors hover:text-[#16130f] hover:underline hover:decoration-[var(--kyx-purple)]"
                >
                  {c.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Executive summary */}
        <section>
          <H1 id="executive-summary">Executive summary</H1>
          <p className={body}>
            <span
              className="float-left mr-3 mt-1.5 font-[family-name:var(--font-instrument-serif)] text-[58px] leading-[0.72] text-[#16130f]"
              aria-hidden
            >
              E
            </span>
            <span className="sr-only">E</span>very mid-size American city has been handed the
            same economic development playbook: attract technology companies, train software
            engineers, build an innovation district, and wait for a breakout. Louisville is
            being encouraged to run that same race. It should not.
          </p>
          <p className={body}>
            The reason is simple. Software has no home. It can be written anywhere, by
            anyone, for anyone — which means a tech advantage is almost impossible to hold.
            Talent and capital concentrate elsewhere, and even a local success can scale to
            enormous size and then relocate its center of gravity without leaving a trace
            behind. A city can spend a decade and a fortune nurturing a tech ecosystem only
            to watch the returns walk out the door.
          </p>
          <p className={body}>
            Louisville holds a different kind of advantage — one that is physical, fixed,
            and impossible for a rival city to copy or relocate. It is the logistics center
            of North America: the UPS Worldport air hub, a convergence of three interstates,
            three Class I railroads, and the Ohio River, a Foreign-Trade Zone, and a
            workforce that already knows how to move and make physical goods at scale. You
            cannot open a Worldport in Tulsa.
          </p>
          <p className={body}>
            This paper proposes Lougistics: an incubator, micro-factory,
            logistics-integration layer, and seed fund — modeled on Chicago&apos;s proven
            mHUB hardtech incubator, but anchored to Louisville&apos;s logistics gravity
            rather than to existing manufacturing density. The goal is to convert a fixed
            advantage into companies and into the middle-class jobs that sit upstream of the
            warehouse.
          </p>
          <Quote>Compete where you have an advantage, not where you wish you did.</Quote>
        </section>

        {/* 1. Landscape */}
        <section>
          <H1 id="landscape">1.&ensp;The landscape: the race everyone is running</H1>
          <p className={body}>
            The standard innovation-economy strategy is now so widespread it has become a
            monoculture. Attract tech. Train coders. Build an &ldquo;innovation
            district.&rdquo; Hope for a unicorn. Nearly every mid-size city in America is
            running this race — against each other, and against the entrenched winners: the
            Bay Area, Austin, Seattle, Boston, and Raleigh.
          </p>
          <p className={body}>
            The problem for Louisville is structural, not a matter of effort or ambition.
            Software has no home, and that single fact undermines the whole strategy:
          </p>
          <ul className={listText}>
            <li>
              Talent is mobile and remote-friendly. The best engineers gravitate to where
              the most engineers — and the highest salaries — already are.
            </li>
            <li>
              Capital is concentrated elsewhere, and it tends to pull its winners toward
              itself.
            </li>
            <li>
              Even a genuine local success is portable. A software company can grow to a
              billion dollars in value and shift its center of gravity to another city
              without leaving a crater where it used to be.
            </li>
          </ul>
          <p className={body}>
            The result is a painful asymmetry: a city can fund the seed, and watch someone
            else harvest the tree. This is not a criticism of technology or of the talented
            people building it in Louisville today. It is a sober assessment of where the
            city&apos;s durable leverage is — and where it is not.
          </p>
          <Quote>A city can fund the seed and watch someone else harvest the tree.</Quote>
        </section>

        {/* 2. Build what can't leave */}
        <section>
          <H1 id="build-what-cant-leave">2.&ensp;Build what can&apos;t leave</H1>
          <p className={body}>
            Louisville&apos;s real advantages are the opposite of software. They are
            physical, fixed, and cannot be picked up and moved. A rival city cannot
            replicate them next year with a line in its budget. That immovability is the
            entire point of this proposal.
          </p>

          <H2>Worldport</H2>
          <p className={body}>
            The UPS Worldport at Louisville Muhammad Ali International Airport is the nerve
            center of UPS&apos;s global air network — on the order of 5.2 million square
            feet, handling roughly two million packages a day, with several hundred flights
            daily connecting more than 200 countries and territories. It is the single
            largest air-logistics node on the continent. Critically for the businesses
            around it, a Louisville-based shipper enjoys the latest drop-off cutoff in the
            country: a company here can finish, pack, and dispatch a product late in the day
            and still make next-day delivery windows. A business that designs its
            operations around that cutoff is effectively bolted to Louisville.
          </p>

          <H2>The crossroads</H2>
          <p className={body}>
            Louisville sits at the intersection of Interstates 64, 65, and 71, placing
            roughly two-thirds of the U.S. population within a single day&apos;s drive. It
            is served by three Class I railroads and sits on the Ohio River, connected to
            the Mississippi and the national barge network. River, road, rail, and runway
            converge in one place. This is bedrock geography, not a policy a competitor can
            rewrite.
          </p>

          <H2>Foreign-Trade Zone #29 and the Riverport</H2>
          <p className={body}>
            Louisville already operates Foreign-Trade Zone #29, offering duty-deferral
            advantages to importers and exporters, and the Riverport is home to more than
            100 companies already engaged in manufacturing, logistics, and distribution. The
            cluster is not hypothetical — it exists, and the ground is already broken.
          </p>

          <H2>The workforce</H2>
          <p className={body}>
            This is a metro that already knows how to move and make physical things at
            scale. The human capital of logistics and manufacturing is here — it does not
            have to be imported or invented.
          </p>

          <Quote>
            You can open a coding bootcamp anywhere. That is precisely why tech doesn&apos;t
            stick. You cannot move a river, a rail hub, an interstate crossroads, or the
            largest air hub on the continent.
          </Quote>
        </section>

        {/* 3. Middle class */}
        <section>
          <H1 id="middle-class">3.&ensp;Manufacturing makes the middle class</H1>
          <p className={body}>
            Why manufacturing — and not simply more warehouses? Because of what
            manufacturing does to a local economy.
          </p>
          <p className={body}>
            Manufacturing built the American middle class for two reasons. It pays well
            without demanding a four-year degree, and each plant seeds a web of suppliers,
            maintainers, and skilled trades around it. The wealth spreads outward.
            Technology, by contrast, concentrates enormous returns within a small,
            highly-credentialed group — a tremendous outcome for that group, and thin
            comfort for everyone else in the city.
          </p>
          <p className={body}>
            For a place like Louisville, broad-based prosperity is the entire goal. The
            right question is not &ldquo;how do we create a handful of very valuable
            companies?&rdquo; It is &ldquo;how do we create a large number of good jobs that
            don&apos;t require a computer-science degree and don&apos;t leave?&rdquo;
          </p>
          <p className={body}>
            Logistics-enabled manufacturing answers that question, and it lets Louisville
            climb the value chain. Instead of competing for one more distribution center —
            warehouse jobs that sit at the bottom of the margin stack — Louisville can
            capture the higher-wage jobs upstream of the warehouse: the people who design
            and build the products that the logistics network then moves.
          </p>
          <Quote>Manufacturing makes the middle class.</Quote>
        </section>

        {/* 4. mHUB */}
        <section>
          <H1 id="mhub">4.&ensp;The proven model: mHUB</H1>
          <p className={body}>
            This is not invented from scratch. Chicago&apos;s mHUB is the proof of concept.
          </p>
          <p className={body}>
            mHUB is a hardtech — physical-product — incubator that opened in 2017. It put
            fabrication labs, a micro-factory for small production runs, technical training,
            corporate partners, and an in-house investment fund under one roof. The results
            are not theoretical: mHUB has supported more than 500 startups that have
            collectively generated billions of dollars in economic activity, made dozens of
            direct startup investments, and built its model on demand-driven cohorts —
            corporate partners surface real problems on the front end, which become pilot
            and investment opportunities on the back end.
          </p>
          <p className={body}>
            The lesson from mHUB is that if you co-locate the tools, the talent, the
            customers, and the capital, you manufacture companies — not just products.
          </p>
          <p className={body}>
            The lesson Louisville should adapt rather than copy: mHUB anchored itself to
            Chicago&apos;s existing manufacturing density. Louisville&apos;s anchor is
            different. It is logistics gravity. Same machine, different fuel.
          </p>
        </section>

        {/* 5. What it is */}
        <section>
          <H1 id="what-it-is">5.&ensp;What Lougistics actually is</H1>
          <p className={body}>
            Lougistics is a single facility — mHUB began near 63,000 square feet and
            expanded to 80,000 — offering four integrated layers:
          </p>

          <ol className="mt-6 flex flex-col">
            {[
              {
                h: "Shared fabrication and micro-factory.",
                b: "Rapid prototyping, electronics, metals, plastics, and small-run production lines, open to any physical-product company rather than pre-sorted into favored sectors. The logistics advantage is the filter; let it attract whoever it attracts, and let the market reveal where Louisville's edge bites hardest.",
              },
              {
                h: "A logistics-integration layer — the part mHUB doesn't have.",
                b: "Embedded access to Worldport's late cutoffs, FTZ #29 benefits, customs and export support, and 3PL and fulfillment partners. Founders here learn to design products for the supply chain, not merely for manufacturability. This is the differentiator no other incubator in the country can offer.",
              },
              {
                h: "A demand-driven accelerator.",
                b: "Cohorts tied to corporate partners — a natural list includes UPS and its healthcare arm, GE Appliances, Ford, and regional 3PL and health-logistics players — who bring real problems and real pilot opportunities. Cohorts form around the founders who apply, not around a committee's guess at the right verticals.",
              },
              {
                h: "A small seed fund.",
                b: "A Louisville analog to mHUB Ventures: pre-seed checks for modest equity, capitalized by a coalition of public, corporate, and philanthropic money.",
              },
            ].map(({ h, b }, i, arr) => (
              <li
                key={h}
                className={
                  "grid grid-cols-[32px_minmax(0,1fr)] gap-4 border-t border-[#d8d2c5] py-5 " +
                  (i === arr.length - 1 ? "border-b" : "")
                }
              >
                <span className={`mt-1 ${mono} text-[11px] text-[var(--kyx-purple)]`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[16px] leading-[1.7] text-[#4a443a] md:text-[17px]">
                  <span className="font-semibold text-[#16130f]">{h}</span> {b}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-10 border-l-2 border-[var(--kyx-purple)] pl-6">
            <p className="text-[18px] leading-[1.6] text-[#16130f] md:text-[20px]">
              Build your physical product in Louisville and ship it to two-thirds of the
              country overnight, with the latest cutoff in America — an advantage built into
              your company that competitors in any other city simply cannot buy.
            </p>
          </div>
        </section>

        {/* 6. Focus */}
        <section>
          <H1 id="focus">6.&ensp;Focus is the strategy</H1>
          <p className={body}>
            The most important discipline of this proposal is what it refuses to do.
          </p>
          <ul className={listText}>
            <li>It is not a generic innovation district.</li>
            <li>It is not a tech scene Louisville cannot win.</li>
            <li>It is not an attempt to be all things to all founders.</li>
          </ul>
          <p className={body}>
            Lougistics does one thing: it turns the most durable logistics advantage in
            North America into a manufacturing-company-creation engine that produces
            middle-class jobs that cannot be relocated. Every element of the proposal serves
            that single sentence. The focus is not a limitation — it is the reason it will
            work.
          </p>
        </section>

        {/* 7. The ask */}
        <section>
          <H1 id="the-ask">7.&ensp;The ask and next steps</H1>
          <p className="mt-4 text-[14px] italic leading-relaxed text-[#7d766a] md:text-[15px]">
            This section is provisional. The figures and commitments below are placeholders
            to be confirmed before this paper is finalized; they are included to show the
            shape of the request, not its final magnitude.
          </p>

          <H2>A founding coalition</H2>
          <p className={body}>
            Louisville Metro, One Louisville, the Riverport Authority, one or more anchor
            corporate partners (UPS foremost among them), a university partner, a
            philanthropic lead, and additional partners to be confirmed.
          </p>

          <H2>Core commitments</H2>
          <ul className={`${listText} space-y-3`}>
            <li>
              A facility commitment — square footage and location, with a Riverport or
              FTZ-adjacent site the obvious candidate.{" "}
              <span className={`bg-[#eae5da] px-2 py-0.5 ${mono} text-[12px] text-[#57503f]`}>
                [To be scoped]
              </span>
            </li>
            <li>
              Seed capital for the fund and operating runway.{" "}
              <span className={`bg-[#eae5da] px-2 py-0.5 ${mono} text-[12px] text-[#57503f]`}>
                [$X over Y years — to be confirmed]
              </span>
            </li>
            <li>
              A year-three and year-five outcome target — number of startups, jobs created,
              and economic activity generated — modeled on mHUB&apos;s documented results.{" "}
              <span className={`bg-[#eae5da] px-2 py-0.5 ${mono} text-[12px] text-[#57503f]`}>
                [To be modeled from primary sources]
              </span>
            </li>
          </ul>

          <p className={body}>
            The next step is to convene the founding coalition, confirm a facility, and size
            the fund. From there, the first cohort can be recruited against the single
            promise at the heart of this paper: in Louisville, the supply chain is not an
            afterthought. It is built into your company from day one.
          </p>
        </section>

        {/* Note on figures */}
        <section>
          <H1 id="figures">A note on the figures</H1>
          <p className="mt-4 text-[14px] leading-[1.7] text-[#57503f] md:text-[15px]">
            The quantitative claims in this paper — Worldport&apos;s scale and daily
            volumes, the share of the U.S. population within a day&apos;s drive, the
            interstate, rail, and river assets, Foreign-Trade Zone #29, and mHUB&apos;s
            startup and economic-impact numbers — were assembled from public reporting and
            organizational sources. They are directionally reliable but should be verified
            against primary sources (UPS, the airport authority, the Riverport Authority,
            and mHUB directly) and given full citations before this paper is published or
            used in a formal funding request. Every figure should be read as approximate
            until confirmed.
          </p>
        </section>

        {/* Footer */}
        <footer className={`mt-16 border-t border-[#d8d2c5] pt-6 ${mono} text-[11px] uppercase tracking-[0.08em] text-[#7d766a]`}>
          <p className="font-medium tracking-[0.14em] text-[#16130f]">
            Lougistics
          </p>
          <p className="mt-1 normal-case tracking-normal text-[13px]">
            KYCombinator · Draft for discussion ·{" "}
            <Link href="/lougistics" className="border-b border-[var(--kyx-purple)] pb-0.5 text-[#16130f] transition-opacity hover:opacity-70 print:no-underline">
              kycombinator.com/lougistics
            </Link>
          </p>
        </footer>
      </article>

      <div className="mx-auto mt-8 max-w-[820px] px-5 print:hidden sm:px-0">
        <Link
          href="/lougistics"
          className={`group inline-flex items-center ${mono} text-[11px] uppercase tracking-[0.08em] text-[#57503f] transition-colors hover:text-[#16130f]`}
        >
          <svg className="mr-1.5 h-4 w-4 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          Back to the Lougistics overview
        </Link>
      </div>
    </div>
  );
}
