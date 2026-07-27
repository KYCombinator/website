import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "./components/home/NewsletterForm";
import EventShowcase from "./components/home/EventShowcase";
import {
  APPLY_URL,
  SLACK_INVITE,
  GOAL_TOTAL,
  companiesOnBoard,
  companies,
  scoreboardUpdatedAt,
  stats,
  buildersInRoom,
  calendar,
} from "./components/home/data";

export const metadata: Metadata = {
  title: "KYX — Kentucky's startup engine",
  description:
    "Ten Series A companies out of Kentucky by 2030. Everything KYX does serves that number. Apply to Cinderblock.",
};

const remaining = Math.max(0, GOAL_TOTAL - companiesOnBoard);
const hasPlaceholderStats = stats.some((s) => s.placeholder);

export default function Home() {
  return (
    <main className="mx-auto max-w-[1120px]">
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="flex flex-col gap-7 px-5 pb-11 pt-14 md:px-7 md:pt-16 lg:gap-[30px] lg:px-10 lg:pt-[76px]">
          <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.14em] text-[var(--kyx-purple)]">
            Louisville, KY · Kentucky&apos;s startup engine
          </p>
          <h1 className="max-w-[940px] font-[family-name:var(--font-instrument-serif)] text-[44px] leading-[0.98] tracking-[-0.03em] md:text-[64px] md:leading-[0.95] lg:text-[92px] lg:leading-[0.93]">
            Ten Series A companies out of Kentucky by 2030.
          </h1>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end lg:gap-14">
            <p className="max-w-[560px] text-[19px] leading-[1.6] text-[#4a443a] [text-wrap:pretty]">
              Everything KYX does serves that number. Programs, the studio, the
              room — all pointed at getting Kentucky founders to a real Series A.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={APPLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[var(--kyx-purple)] px-6 py-4 font-[family-name:var(--font-ibm-plex-mono)] text-[12px] uppercase tracking-[0.08em] text-[#f9f7f2] transition-colors duration-150 hover:bg-[#4f29a6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)]"
              >
                Apply to Cinderblock
              </a>
              <Link
                href="/vision"
                className="inline-flex items-center justify-center border border-[#cec7b8] px-6 py-4 font-[family-name:var(--font-ibm-plex-mono)] text-[12px] uppercase tracking-[0.08em] text-[#16130f] transition-colors duration-150 hover:border-[#16130f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)]"
              >
                The plan
              </Link>
            </div>
          </div>
        </section>

        {/* ── Progress tracker ─────────────────────────────────── */}
        <section className="flex flex-col gap-3 px-5 pb-11 md:px-7 lg:px-10">
          <div className="grid grid-cols-5 gap-2 md:grid-cols-10">
            {Array.from({ length: GOAL_TOTAL }).map((_, i) => {
              const filled = i < companiesOnBoard;
              const company = filled ? companies[i] : undefined;
              if (company) {
                // Filled block with a named company: hover/focus overlays the
                // company name on the block and links to the company site.
                return (
                  <a
                    key={i}
                    href={company.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={company.name}
                    title={company.name}
                    className="group relative h-11 bg-[var(--kyx-purple)] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)] md:h-14"
                  >
                    <span className="absolute inset-0 flex items-center justify-center bg-[#16130f]/85 px-1 text-center font-[family-name:var(--font-ibm-plex-mono)] text-[10px] font-medium uppercase leading-tight tracking-[0.04em] text-[#f4f1ea] opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
                      {company.name}
                    </span>
                  </a>
                );
              }
              return (
                <div
                  key={i}
                  className={
                    "h-11 md:h-14 " +
                    (filled
                      ? "bg-[var(--kyx-purple)]"
                      : "border border-dashed border-[#c6bfae]")
                  }
                  aria-hidden
                />
              );
            })}
          </div>
          <div className="flex flex-col gap-2 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#7d766a] sm:flex-row sm:justify-between">
            <span>
              <span className="text-[var(--kyx-purple)]">
                {companiesOnBoard} on the board
              </span>{" "}
              · {remaining} to go
            </span>
            <span>
              Updated {scoreboardUpdatedAt} ·{" "}
              <Link
                href="/report"
                className="border-b border-[#c6bfae] transition-colors duration-150 hover:border-[var(--kyx-purple)]"
              >
                read the report
              </Link>
            </span>
          </div>
        </section>

        {/* ── Stat row ─────────────────────────────────────────── */}
        <section className="grid grid-cols-1 border-y border-[#16130f] font-[family-name:var(--font-ibm-plex-mono)] md:grid-cols-3">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={
                "flex items-baseline gap-3 px-5 py-[22px] md:px-7 lg:px-10 " +
                (i < stats.length - 1
                  ? "border-b border-[#d8d2c5] md:border-b-0 md:border-r"
                  : "")
              }
            >
              <span
                className={
                  "font-[family-name:var(--font-instrument-serif)] text-[40px] leading-none " +
                  (stat.placeholder
                    ? "border-b border-dashed border-[var(--kyx-purple)]/40"
                    : "")
                }
                title={
                  stat.placeholder
                    ? "Placeholder — replace with the real figure before launch"
                    : undefined
                }
              >
                {stat.figure}
              </span>
              <span className="text-[10px] uppercase leading-[1.3] tracking-[0.1em] text-[#7d766a]">
                {stat.label[0]}
                <br />
                {stat.label[1]}
              </span>
            </div>
          ))}
        </section>
        {hasPlaceholderStats && (
          <p className="px-5 pt-2 font-[family-name:var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.08em] text-[var(--kyx-purple)] md:px-7 lg:px-10">
            Figures pending confirmation
          </p>
        )}

        {/* ── Event showcase (carousel of events; photo collages) ── */}
        <EventShowcase />

        {/* ── Cinderblock: what you actually get ───────────────── */}
        <section className="grid grid-cols-1 gap-10 border-b border-[#16130f] px-5 py-16 md:px-7 lg:grid-cols-[380px_minmax(0,1fr)] lg:gap-14 lg:px-10 lg:py-[72px]">
          <div className="flex flex-col gap-3.5">
            <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.12em] text-[var(--kyx-purple)]">
              Cinderblock
            </p>
            <h2 className="font-[family-name:var(--font-instrument-serif)] text-[36px] leading-none tracking-[-0.02em] lg:text-[48px]">
              What you actually get.
            </h2>
            <p className="text-[15px] leading-[1.65] text-[#57503f] [text-wrap:pretty]">
              A working studio at 1205 East Washington — a small, selective room
              of founders shipping in the same place at the same time. Execution
              over panels.
            </p>
            <a
              href={APPLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1.5 inline-flex items-center self-start bg-[#16130f] px-[22px] py-[15px] font-[family-name:var(--font-ibm-plex-mono)] text-[12px] uppercase tracking-[0.08em] text-[#f4f1ea] transition-colors duration-150 hover:bg-[#2c2820] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)]"
            >
              Apply →
            </a>
          </div>
          <div className="flex flex-col">
            {[
              { n: "01", term: "A desk", desc: "A seat in the Block. Show up, plug in, ship beside people doing the same." },
              { n: "02", term: "A cohort", desc: "A handful of founders on the same clock, holding each other to weekly proof." },
              { n: "03", term: "Capital", desc: "A path to first checks and the investors who write them, local and national." },
              { n: "04", term: "Forever", desc: "Membership doesn't expire. Once you're in the room, you're in the room." },
            ].map((row, i, arr) => (
              <div
                key={row.n}
                className={
                  "grid grid-cols-[36px_minmax(0,1fr)] items-baseline gap-x-4 gap-y-1 border-t border-[#d8d2c5] py-5 sm:grid-cols-[44px_190px_minmax(0,1fr)] sm:gap-5 " +
                  (i === arr.length - 1 ? "border-b" : "")
                }
              >
                <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] text-[var(--kyx-purple)]">
                  {row.n}
                </span>
                <span className="font-[family-name:var(--font-instrument-serif)] text-[28px]">
                  {row.term}
                </span>
                <span className="col-span-2 text-[15px] leading-[1.6] text-[#4a443a] sm:col-span-1">
                  {row.desc}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Our Type / Not Our Type ──────────────────────────── */}
        <section className="grid grid-cols-1 gap-12 border-b border-[#16130f] bg-[#eae5da] px-5 py-16 md:px-7 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-[72px]">
          <div className="flex flex-col gap-[18px]">
            <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.12em] text-[var(--kyx-purple)]">
              Our type
            </p>
            <h2 className="font-[family-name:var(--font-instrument-serif)] text-[36px] leading-none tracking-[-0.02em] lg:text-[44px]">
              Not for everyone.
            </h2>
            <div className="mt-1 flex flex-col gap-3.5">
              {[
                ["High agency.", "You take action without asking permission."],
                ["Surplus value.", "You give the community more than you take."],
                ["Trust.", "You do what you said, on the day you said it."],
                ["Here, in person.", "You're building in Louisville and staying."],
              ].map(([lead, rest]) => (
                <p key={lead} className="text-[16px] leading-[1.5]">
                  <strong className="font-semibold text-[#16130f]">{lead}</strong>{" "}
                  <span className="text-[#57503f]">{rest}</span>
                </p>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-[18px] text-[#7d766a] lg:border-l lg:border-[#d3ccbd] lg:pl-10">
            <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.12em] text-[#7d766a]">
              Not our type
            </p>
            <h2 className="font-[family-name:var(--font-instrument-serif)] text-[36px] leading-none tracking-[-0.02em] text-[#7d766a] lg:text-[44px]">
              Say it plainly.
            </h2>
            <div className="mt-1 flex flex-col gap-3.5">
              {[
                ["Idea people.", "Talking about it isn't building it."],
                ["Passive participants.", "This is not a networking group."],
                ["The gallery.", "Commentary from the sidelines, no thanks."],
              ].map(([lead, rest]) => (
                <p key={lead} className="text-[16px] leading-[1.5]">
                  <strong className="font-semibold">{lead}</strong> {rest}
                </p>
              ))}
            </div>
            <Link
              href="/ourtype"
              className="mt-1.5 inline-flex self-start border-b border-[var(--kyx-purple)] pb-0.5 text-[15px] text-[#16130f] transition-opacity duration-150 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)]"
            >
              Is it for you?
            </Link>
          </div>
        </section>

        {/* ── 2026 calendar ────────────────────────────────────── */}
        <section className="flex flex-col gap-7 border-b border-[#16130f] px-5 py-16 md:px-7 lg:gap-7 lg:px-10 lg:py-[72px]">
          <div className="flex items-end justify-between gap-8">
            <h2 className="font-[family-name:var(--font-instrument-serif)] text-[36px] leading-none tracking-[-0.02em] lg:text-[44px]">
              The 2026 calendar
            </h2>
            <Link
              href="/events"
              className="shrink-0 border-b border-[var(--kyx-purple)] pb-[3px] font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] transition-opacity duration-150 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)]"
            >
              All events
            </Link>
          </div>
          <div className="flex flex-col font-[family-name:var(--font-ibm-plex-mono)]">
            {calendar.map((ev, i, arr) => {
              const external = ev.href.startsWith("http");
              return (
                <div
                  key={ev.name}
                  className={
                    "grid grid-cols-[56px_1fr_auto] items-baseline gap-x-4 gap-y-1 border-t border-[#d8d2c5] py-[15px] md:grid-cols-[70px_minmax(0,1fr)_260px_90px] md:gap-5 " +
                    (i === arr.length - 1 ? "border-b" : "")
                  }
                >
                  <span className="text-[11px] tracking-[0.1em] text-[var(--kyx-purple)]">
                    {ev.month}
                  </span>
                  <span className="font-[family-name:var(--font-ibm-plex-sans)] text-[18px] font-medium">
                    {ev.name}
                  </span>
                  <span className="col-span-2 font-[family-name:var(--font-ibm-plex-sans)] text-[14px] text-[#7d766a] md:col-span-1 md:col-start-3">
                    {ev.tagline}
                  </span>
                  {external ? (
                    <a
                      href={ev.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="col-start-3 row-start-1 text-right text-[11px] uppercase tracking-[0.06em] transition-opacity duration-150 hover:opacity-70 md:col-start-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)]"
                    >
                      {ev.action}
                    </a>
                  ) : (
                    <Link
                      href={ev.href}
                      className="col-start-3 row-start-1 text-right text-[11px] uppercase tracking-[0.06em] transition-opacity duration-150 hover:opacity-70 md:col-start-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)]"
                    >
                      {ev.action}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Community CTA band ───────────────────────────────── */}
        <section className="grid grid-cols-1 gap-8 bg-[#16130f] px-5 py-14 text-[#f4f1ea] md:px-7 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-center lg:gap-14 lg:px-10 lg:py-16">
          <div className="flex flex-col gap-3">
            <h2 className="font-[family-name:var(--font-instrument-serif)] text-[38px] leading-none tracking-[-0.02em] lg:text-[46px]">
              Not ready to apply? Start in Slack.
            </h2>
            <p className="max-w-[480px] text-[16px] leading-[1.6] text-[#a5a094]">
              {buildersInRoom} builders, real-time. Or take the weekly letter —
              events, programs, and who&apos;s shipping what.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href={SLACK_INVITE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[var(--kyx-purple)] px-6 py-4 text-center font-[family-name:var(--font-ibm-plex-mono)] text-[12px] uppercase tracking-[0.08em] text-[#f9f7f2] transition-colors duration-150 hover:bg-[#4f29a6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)]"
            >
              Join the Slack
            </a>
            <NewsletterForm />
          </div>
        </section>
    </main>
  );
}
