import Link from "next/link";

export default function LouiesHero() {
  return (
    <section
      className="relative h-[68vh] min-h-[520px] overflow-hidden border-y border-white/[0.06] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url(https://cdn.kycombinator.com/TheLouies2025.png)" }}
    >
      {/* restrained overlay — single dark wash */}
      <div className="absolute inset-0 bg-black/65" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"
      />

      <div className="container relative z-10 mx-auto flex h-full items-center justify-center px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.28em] text-zinc-300">
            Louisville Startup Awards
          </p>
          <h1 className="mb-6 text-4xl font-semibold tracking-tight text-white md:text-6xl">
            The LOUIES 2025
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-zinc-300 md:text-lg">
            The ecosystem event of Louisville. An extremely local celebration of the founders,
            operators, and enablers who keep Louisville&apos;s startup scene moving.
          </p>

          <div className="mb-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-zinc-300 md:text-base">
            <span>
              <span className="font-medium text-white">5:00 PM</span> Networking
            </span>
            <span aria-hidden className="text-zinc-500">·</span>
            <span>
              <span className="font-medium text-white">5:45 PM</span> Velocity
            </span>
            <span aria-hidden className="text-zinc-500">·</span>
            <span>
              <span className="font-medium text-white">6:30 PM</span> The LOUIES
            </span>
          </div>

          <Link
            href="/events/louies/2025"
            className="group inline-flex items-center justify-center rounded-md bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 transition-colors duration-200 hover:bg-zinc-200"
          >
            Learn more
            <svg
              className="ml-1.5 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <p className="mt-5 text-sm text-zinc-400">
            Solyco Capital · 111 West Main Street, Louisville, KY
          </p>
        </div>
      </div>
    </section>
  );
}
