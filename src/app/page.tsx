import Image from "next/image";
import Link from "next/link";
import CTASection from "./components/CTASection";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0b0b10] text-zinc-100">
      {/* Hero Section */}
      <section className="relative flex min-h-[640px] items-center justify-center overflow-hidden border-b border-white/[0.06] bg-[#0b0b10] py-24 md:py-32">
        {/* very subtle radial wash */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_60%)]"
        />
        {/* subtle grid texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]"
        />

        <div className="container relative z-10 mx-auto px-4">
          <div className="mb-10 text-center">
            <Image
              src={`${process.env.NEXT_PUBLIC_CDN_URL}/assets/logo.svg`}
              alt="KYX"
              width={360}
              height={123}
              className="mx-auto h-auto w-auto max-h-[160px] md:max-h-[220px]"
              priority
            />
          </div>

          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <span className="mb-6 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.28em] text-zinc-400">
              <span className="h-px w-8 bg-zinc-700" />
              Louisville, KY
              <span className="h-px w-8 bg-zinc-700" />
            </span>
            <h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">
              Kentucky&apos;s startup engine.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">
              Building Kentucky into a regional startup powerhouse where ambitious founders
              can start, scale, and stay.
            </p>

            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
              <Link
                href="/vision"
                className="group inline-flex items-center justify-center rounded-md bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 transition-colors duration-200 hover:bg-zinc-200"
              >
                Our Vision
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
                Upcoming Events
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <CTASection />
    </div>
  );
}
