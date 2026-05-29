import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Slack | KYX",
  description:
    "Join the KYX Slack — Louisville's founder community. Channel conventions, how to follow companies, and how to find event channels.",
  openGraph: {
    title: "Slack | KYX",
    description:
      "Join the KYX Slack — Louisville's founder community. Channel conventions, how to follow companies, and how to find event channels.",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://kycombinator.com"}/slack`,
    images: [`${process.env.NEXT_PUBLIC_CDN_URL}/assets/logo.png`],
  },
};

const SLACK_INVITE =
  "https://join.slack.com/t/kycombinator/shared_invite/zt-2viueybdu-QNv80gAKk~sJZ9paWebGVQ";

type Channel = {
  name: string;
  description: string;
};

const CORE_CHANNELS: Channel[] = [
  { name: "#general", description: "Site-wide announcements and the front door of the community." },
  { name: "#introductions", description: "Post a short intro when you join — who you are, what you're building, what you need." },
  { name: "#help", description: "Ask for intros, hiring leads, vendors, lawyers, accountants, or anything else you need." },
  { name: "#wins", description: "Funding, launches, customers, hires, milestones — celebrate the small ones too." },
  { name: "#jobs", description: "Open roles at Louisville startups. Hiring or looking — both welcome." },
];

const COMPANY_EXAMPLES: Channel[] = [
  { name: "#v-jokester", description: "Updates from Jokester — product, hires, asks." },
  { name: "#v-duegooder", description: "Updates from DueGooder." },
  { name: "#v-leapfrog", description: "Updates from LeapFrog." },
];

const EVENT_EXAMPLES: Channel[] = [
  { name: "#event-golf", description: "Coordination, tee times, scoring." },
  { name: "#event-louies", description: "The LOUIES Awards — nominations, RSVPs, logistics." },
  { name: "#event-velocity", description: "Velocity cohort — schedule, prep, demo day." },
];

function ChannelRow({ name, description }: Channel) {
  return (
    <li className="flex flex-col gap-1 border-b border-white/[0.06] py-4 last:border-b-0 md:flex-row md:items-baseline md:gap-6">
      <code className="shrink-0 font-mono text-sm font-medium text-white md:w-48">{name}</code>
      <p className="text-sm leading-relaxed text-zinc-400">{description}</p>
    </li>
  );
}

export default function SlackPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0b0b10] text-zinc-100">
      {/* very subtle top wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]"
      />

      <div className="container relative z-10 mx-auto max-w-4xl px-4 py-16 md:py-24">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.28em] text-zinc-400">
            Community
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">
            KYX on Slack
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">
            The KYX Slack is Louisville&apos;s founder community — a working channel for
            builders, operators, and the people who back them. Real-time intros, asks,
            wins, and the day-to-day of building in Kentucky.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={SLACK_INVITE}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center rounded-md bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 transition-colors duration-200 hover:bg-zinc-200"
            >
              Join the Slack
              <svg
                className="ml-1.5 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/events"
              className="inline-flex items-center justify-center rounded-md border border-white/10 px-5 py-2.5 text-sm font-medium text-zinc-200 transition-colors duration-200 hover:border-white/25 hover:bg-white/[0.03]"
            >
              See upcoming events
            </Link>
          </div>
        </div>

        {/* What you'll find */}
        <section className="mb-14 rounded-2xl border border-white/[0.06] bg-white/[0.015] p-8 md:p-10">
          <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
            What you&apos;ll find inside
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="text-sm font-medium text-white">Founders, building in public</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Operators sharing the actual day-to-day — what&apos;s working, what&apos;s
                breaking, what they need next.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-white">A working network</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Warm intros, hiring leads, customer references, and a low-friction way to
                ask for help.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-white">Signal on the ecosystem</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Funding rounds, launches, events, and the people moving the Louisville
                scene forward.
              </p>
            </div>
          </div>
        </section>

        {/* Channel conventions */}
        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Channel conventions
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
            Channels follow a few simple prefixes so it&apos;s easy to skim the sidebar and
            find what you care about.
          </p>

          {/* Prefix table */}
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-6">
              <code className="font-mono text-base font-semibold text-white">#v-{`{company}`}</code>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Follow any company in the community. One channel per company, prefixed
                with <span className="font-mono text-zinc-200">#v-</span>. Join the ones
                you want updates from — leave the rest. Founders post product updates,
                hires, asks, and the occasional win.
              </p>
              <p className="mt-3 text-xs text-zinc-500">
                Examples:{" "}
                <span className="font-mono text-zinc-300">#v-jokester</span>,{" "}
                <span className="font-mono text-zinc-300">#v-duegooder</span>,{" "}
                <span className="font-mono text-zinc-300">#v-leapfrog</span>
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-6">
              <code className="font-mono text-base font-semibold text-white">#event-{`{name}`}</code>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Coordination channels for KYX events. Logistics, RSVPs, day-of
                announcements. Channels open ahead of an event and quiet down after.
              </p>
              <p className="mt-3 text-xs text-zinc-500">
                Examples:{" "}
                <span className="font-mono text-zinc-300">#event-golf</span>,{" "}
                <span className="font-mono text-zinc-300">#event-louies</span>,{" "}
                <span className="font-mono text-zinc-300">#event-velocity</span>
              </p>
            </div>
          </div>
        </section>

        {/* Channel lists */}
        <section className="mb-14 rounded-2xl border border-white/[0.06] bg-white/[0.015] p-8 md:p-10">
          <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Where to start
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400 md:text-base">
            A few core channels everyone joins by default.
          </p>
          <ul className="mt-6">
            {CORE_CHANNELS.map((c) => (
              <ChannelRow key={c.name} {...c} />
            ))}
          </ul>

          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="text-base font-semibold text-white">Follow a company</h3>
              <ul className="mt-4">
                {COMPANY_EXAMPLES.map((c) => (
                  <ChannelRow key={c.name} {...c} />
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Event channels</h3>
              <ul className="mt-4">
                {EVENT_EXAMPLES.map((c) => (
                  <ChannelRow key={c.name} {...c} />
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Etiquette */}
        <section className="mb-14">
          <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
            A few norms
          </h2>
          <ul className="mt-6 space-y-4">
            <li className="flex gap-4 rounded-xl border border-white/[0.06] bg-white/[0.015] p-5">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" />
              <div>
                <h3 className="text-sm font-medium text-white">Default to specific</h3>
                <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                  Ask the concrete question. &ldquo;Anyone use Stripe Atlas for a Delaware
                  flip?&rdquo; beats &ldquo;Has anyone done this?&rdquo;
                </p>
              </div>
            </li>
            <li className="flex gap-4 rounded-xl border border-white/[0.06] bg-white/[0.015] p-5">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" />
              <div>
                <h3 className="text-sm font-medium text-white">No drive-by sales</h3>
                <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                  Don&apos;t pitch the community to sell to it. Contribute first; ask later.
                </p>
              </div>
            </li>
            <li className="flex gap-4 rounded-xl border border-white/[0.06] bg-white/[0.015] p-5">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" />
              <div>
                <h3 className="text-sm font-medium text-white">Threads, not channel spam</h3>
                <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                  Reply in thread. Use the channel for the headline, not the back-and-forth.
                </p>
              </div>
            </li>
            <li className="flex gap-4 rounded-xl border border-white/[0.06] bg-white/[0.015] p-5">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" />
              <div>
                <h3 className="text-sm font-medium text-white">Start a channel when you need one</h3>
                <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                  Building something? Spin up <span className="font-mono text-zinc-200">#v-yourcompany</span>.
                  Running an event? <span className="font-mono text-zinc-200">#event-yourevent</span>.
                </p>
              </div>
            </li>
          </ul>
        </section>

        {/* Final CTA */}
        <section className="rounded-2xl border border-white/[0.06] bg-white/[0.015] p-8 text-center md:p-12">
          <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Ready to join?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-400 md:text-base">
            Post an intro in <span className="font-mono text-zinc-200">#introductions</span>{" "}
            when you land, and follow a few company channels you&apos;re curious about.
          </p>
          <Link
            href={SLACK_INVITE}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex items-center justify-center rounded-md bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 transition-colors duration-200 hover:bg-zinc-200"
          >
            Join the Slack
            <svg
              className="ml-1.5 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </section>
      </div>
    </div>
  );
}
