import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] bg-[#0b0b10] py-20 md:py-24">
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-4xl rounded-2xl border border-white/[0.06] bg-white/[0.015] p-8 md:p-12">
          <div className="mb-5 flex items-center justify-center gap-3">
            <div className="h-px w-10 bg-zinc-700" />
            <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-zinc-400">
              Stay Connected
            </span>
            <div className="h-px w-10 bg-zinc-700" />
          </div>
          <h2 className="text-center text-3xl font-semibold tracking-tight text-white md:text-5xl">
            Join our community
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-zinc-400 md:text-lg">
            Connect with founders, get updates on events, and be part of Kentucky&apos;s startup ecosystem.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Join Slack Card */}
            <Link
              href="https://join.slack.com/t/kycombinator/shared_invite/zt-2viueybdu-QNv80gAKk~sJZ9paWebGVQ"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-xl border border-white/[0.06] bg-white/[0.015] p-6 transition-colors duration-200 hover:border-white/15 hover:bg-white/[0.03]"
            >
              <h3 className="text-base font-semibold text-white">Join Slack</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Connect with founders, share resources, and stay in the loop with real-time community updates.
              </p>
              <div className="mt-5 flex items-center text-sm font-medium text-zinc-200 transition-colors group-hover:text-white">
                <span>Join now</span>
                <svg
                  className="ml-1.5 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </div>
            </Link>

            {/* Newsletter Card */}
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-6">
              <h3 className="text-base font-semibold text-white">Newsletter</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Get the latest updates on events, programs, and startup news delivered to your inbox.
              </p>
              <div className="mt-5 overflow-hidden rounded-md border border-white/[0.06] bg-black/30">
                <iframe
                  src="https://embeds.beehiiv.com/3cab38c3-d1b9-4443-bdb3-2a0de2d047a6?slim=true"
                  width="100%"
                  frameBorder="0"
                  scrolling="no"
                  style={{
                    borderRadius: "0",
                    backgroundColor: "transparent",
                  }}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
