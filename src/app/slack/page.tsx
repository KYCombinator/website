import type { Metadata } from "next";
import type React from "react";
import { cookies } from "next/headers";
import { Container, PageHero, Eyebrow, SerifHeading, Button, TextLink } from "@/app/components/fm";
import { SESSION_COOKIE, verifySession } from "@/lib/adminAuth";
import { getUser, galleryConfigured } from "@/lib/gallery";

export const dynamic = "force-dynamic";

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
const NEWSLETTER_URL = "https://kycombinator.beehiiv.com/";
const APPLY_URL = "/cinderblock/apply";

// ⚠️ Partner-org URLs inferred — confirm/correct these.
const PARTNERS: { name: string; href: string }[] = [
  { name: "Amplify", href: "https://www.amplifystartups.com" },
  { name: "Startup Week Louisville", href: "https://www.startupweeklouisville.com" },
];

// `complete` maps a step to a completion source so a signed-in member sees
// "Done" instead of the call-to-action once they've taken that step:
//   newsletter/slack/event → the dashboard onboarding checklist
//   cinderblock            → the admin-managed Cinderblock membership flag
type CompleteKey = "newsletter" | "slack" | "event" | "cinderblock";
type JoinStep = {
  term: string;
  desc: React.ReactNode;
  action?: { label: string; href: string };
  partners?: { name: string; href: string }[];
  complete?: CompleteKey;
};

const JOIN_STEPS: JoinStep[] = [
  {
    term: "Start with the letter",
    desc: "The weekly newsletter — events, programs, and who's shipping what. The lowest-commitment way to plug in and see what's happening.",
    action: { label: "Subscribe", href: NEWSLETTER_URL },
    complete: "newsletter",
  },
  {
    term: "Join the Slack",
    desc: "Louisville's founder community — a working channel for builders, operators, and the people who back them. Real-time intros, asks, wins, and the day-to-day of building in Kentucky.",
    action: { label: "Join Slack", href: SLACK_INVITE },
    complete: "slack",
  },
  {
    term: "Show up to events",
    desc: "HackKentucky, Velocity, Casino Night, the LOUIES. Vote with your feet — the fastest way to meet the room in person.",
    action: { label: "See events", href: "/events" },
    complete: "event",
  },
  {
    term: "Apply to Cinderblock",
    desc: "When you're building in earnest, apply for a desk in the room — a small, selective studio of founders shipping side by side.",
    action: { label: "Apply", href: APPLY_URL },
    complete: "cinderblock",
  },
  {
    term: "Volunteer",
    desc: (
      <>
        Our events run on the people who show up to run them. Help put on
        HackKentucky, the LOUIES, and more — say the word in{" "}
        <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[#16130f]">
          #volunteer
        </span>{" "}
        on Slack.
      </>
    ),
    action: { label: "Get involved", href: SLACK_INVITE },
  },
  {
    term: "Spread the word",
    desc: "Support the wider Louisville ecosystem — the organizations building alongside us. Show up to their things too.",
    partners: PARTNERS,
  },
];

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

const WHAT_YOULL_FIND: [string, string][] = [
  [
    "Founders, building in public",
    "Operators sharing the actual day-to-day — what's working, what's breaking, what they need next.",
  ],
  [
    "A working network",
    "Warm intros, hiring leads, customer references, and a low-friction way to ask for help.",
  ],
  [
    "Signal on the ecosystem",
    "Funding rounds, launches, events, and the people moving the Louisville scene forward.",
  ],
];

const NORMS: [string, React.ReactNode][] = [
  [
    "Default to specific",
    <>
      Ask the concrete question. &ldquo;Anyone use Stripe Atlas for a Delaware
      flip?&rdquo; beats &ldquo;Has anyone done this?&rdquo;
    </>,
  ],
  [
    "No drive-by sales",
    <>Don&apos;t pitch the community to sell to it. Contribute first; ask later.</>,
  ],
  [
    "Threads, not channel spam",
    <>Reply in thread. Use the channel for the headline, not the back-and-forth.</>,
  ],
  [
    "Start a channel when you need one",
    <>
      Building something? Spin up{" "}
      <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[#16130f]">#v-yourcompany</span>.
      Running an event?{" "}
      <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[#16130f]">#event-yourevent</span>.
    </>,
  ],
];

function ChannelRow({ name, description }: Channel) {
  return (
    <li className="flex flex-col gap-1 border-t border-[#d8d2c5] py-4 last:border-b md:flex-row md:items-baseline md:gap-6">
      <code className="shrink-0 font-[family-name:var(--font-ibm-plex-mono)] text-[14px] font-medium text-[#16130f] md:w-48">
        {name}
      </code>
      <p className="text-[15px] leading-relaxed text-[#4a443a]">{description}</p>
    </li>
  );
}

export default async function SlackPage() {
  // Reflect the signed-in member's progress on each step.
  const store = await cookies();
  const session = verifySession(store.get(SESSION_COOKIE)?.value);
  const signedIn = !!session;
  let done: Record<CompleteKey, boolean> = {
    newsletter: false,
    slack: false,
    event: false,
    cinderblock: false,
  };
  if (session && galleryConfigured()) {
    const user = await getUser(session.email);
    const o = user?.onboarding || {};
    done = {
      newsletter: !!o.newsletter,
      slack: !!o.slack,
      event: !!o.event,
      cinderblock: !!user?.cinderblock,
    };
  }

  return (
    <>
      <PageHero
        eyebrow="Community"
        title="Join the community."
        intro="There's no single door. Start with the weekly letter, jump into Slack, show up to an event — then go as deep as you want. Here's how, step by step."
      >
        {signedIn && done.slack && done.newsletter ? (
          <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[12px] uppercase tracking-[0.08em] text-[var(--kyx-purple)]">
            ✓ You&apos;re all set — you&apos;re in Slack and on the list.
          </p>
        ) : (
          <>
            {!(signedIn && done.slack) && (
              <Button href={SLACK_INVITE} variant="primary">
                Join the Slack
              </Button>
            )}
            {!(signedIn && done.newsletter) && (
              <TextLink href={NEWSLETTER_URL} className="self-center">
                Subscribe to the newsletter
              </TextLink>
            )}
          </>
        )}
      </PageHero>

      {/* How to join — the ladder */}
      <section className="border-b border-[#16130f]">
        <Container className="py-16 lg:py-[72px]">
          <div className="flex flex-col gap-3">
            <Eyebrow>Ways in</Eyebrow>
            <SerifHeading className="text-[32px] leading-none md:text-[40px]">
              How to join.
            </SerifHeading>
            <p className="mt-1 max-w-2xl text-[15px] leading-relaxed text-[#4a443a] md:text-[16px]">
              Start at the top and go as deep as you want — from the weekly letter to a
              desk in the room.
            </p>
          </div>
          <div className="mt-10 flex flex-col">
            {JOIN_STEPS.map((step, i) => (
              <div
                key={step.term}
                className="grid grid-cols-1 gap-x-5 gap-y-2 border-t border-[#d8d2c5] py-6 last:border-b sm:grid-cols-[44px_220px_minmax(0,1fr)_auto] sm:items-baseline sm:gap-6"
              >
                <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] text-[var(--kyx-purple)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-[family-name:var(--font-instrument-serif)] text-[24px] leading-none md:text-[26px]">
                  {step.term}
                </span>
                <p className="text-[15px] leading-[1.6] text-[#4a443a]">{step.desc}</p>
                <div className="flex flex-col gap-1.5 sm:items-end">
                  {signedIn && step.complete && done[step.complete] ? (
                    <span className="inline-flex items-center gap-1.5 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--kyx-purple)]">
                      ✓ {step.complete === "cinderblock" ? "Member" : "Done"}
                    </span>
                  ) : (
                    <>
                      {step.action && (
                        <TextLink href={step.action.href}>{step.action.label} →</TextLink>
                      )}
                    </>
                  )}
                  {step.partners?.map((p) => (
                    <TextLink key={p.name} href={p.href}>
                      {p.name} →
                    </TextLink>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* What you'll find */}
      <section className="border-b border-[#16130f] bg-[#eae5da]">
        <Container className="py-16 lg:py-[72px]">
          <div className="flex flex-col gap-3">
            <Eyebrow>Inside</Eyebrow>
            <SerifHeading className="text-[32px] leading-none md:text-[40px]">
              What you&apos;ll find inside.
            </SerifHeading>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {WHAT_YOULL_FIND.map(([title, body]) => (
              <div key={title} className="flex flex-col gap-2 border-t border-[#d8d2c5] pt-5">
                <h3 className="text-[16px] font-medium text-[#16130f]">{title}</h3>
                <p className="text-[15px] leading-relaxed text-[#4a443a]">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Channel conventions */}
      <section className="border-b border-[#16130f]">
        <Container className="py-16 lg:py-[72px]">
          <div className="flex flex-col gap-3">
            <Eyebrow>Conventions</Eyebrow>
            <SerifHeading className="text-[32px] leading-none md:text-[40px]">
              Channel conventions.
            </SerifHeading>
            <p className="mt-1 max-w-2xl text-[15px] leading-relaxed text-[#4a443a] md:text-[16px]">
              Channels follow a few simple prefixes so it&apos;s easy to skim the sidebar and
              find what you care about.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="border border-[#d8d2c5] p-6">
              <code className="font-[family-name:var(--font-ibm-plex-mono)] text-[16px] font-semibold text-[#16130f]">
                #v-{`{company}`}
              </code>
              <p className="mt-3 text-[15px] leading-relaxed text-[#4a443a]">
                Follow any company in the community. One channel per company, prefixed
                with{" "}
                <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[#16130f]">#v-</span>. Join the ones
                you want updates from — leave the rest. Founders post product updates,
                hires, asks, and the occasional win.
              </p>
              <p className="mt-3 text-[12px] text-[#7d766a]">
                Examples:{" "}
                <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[#57503f]">#v-jokester</span>,{" "}
                <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[#57503f]">#v-duegooder</span>,{" "}
                <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[#57503f]">#v-leapfrog</span>
              </p>
            </div>

            <div className="border border-[#d8d2c5] p-6">
              <code className="font-[family-name:var(--font-ibm-plex-mono)] text-[16px] font-semibold text-[#16130f]">
                #event-{`{name}`}
              </code>
              <p className="mt-3 text-[15px] leading-relaxed text-[#4a443a]">
                Coordination channels for KYX events. Logistics, RSVPs, day-of
                announcements. Channels open ahead of an event and quiet down after.
              </p>
              <p className="mt-3 text-[12px] text-[#7d766a]">
                Examples:{" "}
                <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[#57503f]">#event-golf</span>,{" "}
                <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[#57503f]">#event-louies</span>,{" "}
                <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[#57503f]">#event-velocity</span>
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Channel lists */}
      <section className="border-b border-[#16130f] bg-[#eae5da]">
        <Container className="py-16 lg:py-[72px]">
          <div className="flex flex-col gap-3">
            <Eyebrow>Where to start</Eyebrow>
            <SerifHeading className="text-[32px] leading-none md:text-[40px]">
              Where to start.
            </SerifHeading>
            <p className="mt-1 text-[15px] leading-relaxed text-[#4a443a] md:text-[16px]">
              A few core channels everyone joins by default.
            </p>
          </div>
          <ul className="mt-8">
            {CORE_CHANNELS.map((c) => (
              <ChannelRow key={c.name} {...c} />
            ))}
          </ul>

          <div className="mt-12 grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="text-[16px] font-semibold text-[#16130f]">Follow a company</h3>
              <ul className="mt-4">
                {COMPANY_EXAMPLES.map((c) => (
                  <ChannelRow key={c.name} {...c} />
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[16px] font-semibold text-[#16130f]">Event channels</h3>
              <ul className="mt-4">
                {EVENT_EXAMPLES.map((c) => (
                  <ChannelRow key={c.name} {...c} />
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Etiquette */}
      <section className="border-b border-[#16130f]">
        <Container className="py-16 lg:py-[72px]">
          <div className="flex flex-col gap-3">
            <Eyebrow>Norms</Eyebrow>
            <SerifHeading className="text-[32px] leading-none md:text-[40px]">
              A few norms.
            </SerifHeading>
          </div>
          <ul className="mt-8 flex flex-col">
            {NORMS.map(([title, body], i) => (
              <li
                key={title}
                className={
                  "grid gap-2 border-t border-[#d8d2c5] py-6 " +
                  (i === NORMS.length - 1 ? "border-b" : "")
                }
              >
                <h3 className="text-[16px] font-medium text-[#16130f]">{title}</h3>
                <p className="max-w-[640px] text-[15px] leading-relaxed text-[#4a443a]">{body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="bg-[#16130f] text-[#f4f1ea]">
        <Container className="flex flex-col gap-6 py-16 lg:py-20">
          <div className="flex flex-col gap-3">
            <SerifHeading className="text-[32px] leading-none md:text-[40px]">
              Ready to join?
            </SerifHeading>
            <p className="max-w-xl text-[16px] leading-relaxed text-[#a5a094]">
              Post an intro in{" "}
              <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[#f4f1ea]">#introductions</span>{" "}
              when you land, and follow a few company channels you&apos;re curious about.
            </p>
          </div>
          <div>
            <Button href={SLACK_INVITE} variant="primary">
              Join the Slack
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
