import Link from "next/link";

export default function LouiesHero() {
  return (
    <section 
      className="relative h-[65vh] text-primary-foreground bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url(https://cdn.kycombinator.com/TheLouies2025.png)' }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="uppercase tracking-[0.25em] text-xs md:text-sm mb-4 text-white">
            Louisville Startup Awards
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
            The LOUIES 2025
          </h1>
          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto mb-6">
            The ecosystem event of Louisville. An extremely local celebration of the founders,
            operators, and enablers who keep Louisville&apos;s startup scene
            moving.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-6 text-white/90">
            <div className="text-sm md:text-base">
              <span className="font-semibold">5:00 PM</span> Networking
            </div>
            <div className="text-sm md:text-base">
              <span className="font-semibold">5:45 PM</span> Velocity
            </div>
            <div className="text-sm md:text-base">
              <span className="font-semibold">6:30 PM</span> The LOUIES
            </div>
          </div>
          <Link
            href="/events/louies/2025"
            className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm md:text-base font-semibold bg-white text-primary shadow-sm hover:bg-white/90 transition"
          >
            Learn More
          </Link>
          <p className="text-white/70 text-sm md:text-base mt-4">
            Solyco Capital, 111 West Main Street, LOUIESville, KY
          </p>
        </div>
      </div>
    </section>
  );
}

