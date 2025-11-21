"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function VelocityPage() {
  // PHASES: countdown -> liftoff -> main
  const [phase, setPhase] = useState<"countdown" | "liftoff" | "main">(
    "countdown"
  );
  const [count, setCount] = useState(5);
  const [hoveredCompany, setHoveredCompany] = useState<number | null>(null);

  const companies = [
    {
      name: "Bottle Episodes",
      description: "Brief description of what they built and their journey during the 12-week Velocity program.",
      image: "https://cdn.kycombinator.com/velocity/bottleepisodes.png",
    },
    {
      name: "DueGooder",
      description: "Brief description of what they built and their journey during the 12-week Velocity program.",
      image: "https://cdn.kycombinator.com/velocity/duegooder.png",
    },
    {
      name: "Jokester",
      description: "Brief description of what they built and their journey during the 12-week Velocity program.",
      image: "https://cdn.kycombinator.com/velocity/jokester.jpg",
    },
    {
      name: "LeapFrog",
      description: "Brief description of what they built and their journey during the 12-week Velocity program.",
      image: "https://cdn.kycombinator.com/velocity/felipe.jpg",
    },
    {
      name: "MoneyBot",
      description: "Brief description of what they built and their journey during the 12-week Velocity program.",
      image: "https://cdn.kycombinator.com/velocity/moneybot.jpg",
    },
  ];

  useEffect(() => {
    if (phase !== "countdown") return;
    if (count <= 0) {
      // brief liftoff interstitial, then reveal main
      setPhase("main");
      const t = setTimeout(() => setPhase("main"), 1100);
      return () => clearTimeout(t);
    }
    const id = setTimeout(() => setCount((c) => c - 1), 1100);
    return () => clearTimeout(id);
  }, [count, phase]);

  // Simple glow style
  const glow = "drop-shadow-[0_0_20px_rgba(168,85,247,0.75)]"; // purple glow

  return (
    <main className="relative min-h-screen bg-black text-white">
      {/* COUNTDOWN / LIFTOFF OVERLAY */}
      <AnimatePresence mode="wait">
        {(phase === "countdown") && (
          <motion.div
            key={phase}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          >
            <motion.div
              key="countdown"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
              className="relative select-none"
            >
              <div
                className={`text-[22vw] leading-none font-extrabold tracking-tight ${glow}`}
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {count}
              </div>
              {/* shimmer sweep */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_1.1s_ease-in-out_infinite] [mask-image:radial-gradient(white,transparent_70%)]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO: 6-part Accordion at top */}
      <section className="relative bg-black min-h-screen flex flex-col">
        {/* Horizontal Accordion - 6 parts, no gaps, goes to top */}
        <div className="w-full h-[70vh] flex">
          {/* First part: Title, Description, Button */}
          <motion.div
            className="relative flex flex-col bg-gradient-to-br from-purple-900/20 to-black border-r border-white/20"
            initial={false}
            animate={{
              flex: hoveredCompany === null ? 1.5 : 0.8,
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="flex-1 flex flex-col justify-center p-6 md:p-8 lg:p-12">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.6 }}
                className={`text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight ${glow} mb-4`}
              >
                Velocity Finale
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-base md:text-lg lg:text-xl text-white/80 mb-8"
              >
                Watch 5 startups present their 12‑week journey. Part of the Velocity / The LOUIES - KYX 2025 Celebration.
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.6 }}
                className="mt-auto"
              >
                <Link
                  href="https://luma.com/8rgsdubd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-2xl border border-white/20 bg-white/10 px-6 py-3 font-semibold backdrop-blur transition hover:bg-white/20 text-white"
                >
                  Register to Attend
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* 5 Company parts */}
          {companies.map((company, idx) => (
            <motion.div
              key={idx}
              className="relative flex flex-col cursor-pointer group"
              onHoverStart={() => setHoveredCompany(idx)}
              onHoverEnd={() => setHoveredCompany(null)}
              initial={false}
              animate={{
                flex: hoveredCompany === idx ? 3 : hoveredCompany === null ? 1 : 0.7,
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              style={{
                marginLeft: idx === 0 ? "-1px" : "-1px", // Overlap to remove gaps
                zIndex: hoveredCompany === idx ? 30 : 10 + idx,
              }}
            >
              {/* Image Container */}
              <div className="relative flex-1 overflow-hidden border-r border-white/20">
                <motion.img
                  src={company.image}
                  alt={company.name}
                  className="w-full h-full object-cover"
                  animate={{
                    scale: hoveredCompany === idx ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.4 }}
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent" />
                
                {/* Company Name - overlay near bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <h3 className="text-white font-bold text-lg md:text-xl lg:text-2xl mb-2">
                    {company.name}
                  </h3>
                  
                  {/* Description - appears on hover/expand */}
                  <AnimatePresence>
                    {hoveredCompany === idx && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-white/90 text-sm md:text-base leading-relaxed">
                          {company.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* subtle bottom cue */}
        <div className="pointer-events-none absolute bottom-6 left-0 right-0 z-10 flex justify-center">
          <div className="animate-bounce text-white/70">▾</div>
        </div>
      </section>

      {/* COMPANIES */}
      <section className="relative bg-black py-20">
        <div className="container mx-auto px-6">
          <h2 className={`text-3xl md:text-4xl font-bold ${glow} mb-12`}>The 5 Finalists</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {[
              {
                name: "Company Name",
                description: "Brief description of what they built and their journey.",
                website: "#",
              },
              {
                name: "Company Name",
                description: "Brief description of what they built and their journey.",
                website: "#",
              },
              {
                name: "Company Name",
                description: "Brief description of what they built and their journey.",
                website: "#",
              },
              {
                name: "Company Name",
                description: "Brief description of what they built and their journey.",
                website: "#",
              },
              {
                name: "Company Name",
                description: "Brief description of what they built and their journey.",
                website: "#",
              },
            ].map((company, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * idx, duration: 0.6 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
              >
                <h3 className="text-xl font-semibold mb-3">{company.name}</h3>
                <p className="text-white/80 mb-4">{company.description}</p>
                {company.website !== "#" && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/60 hover:text-white transition"
                  >
                    Learn more →
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="relative bg-black py-20">
        <div className="container mx-auto px-6">
          <h2 className={`text-3xl md:text-4xl font-bold ${glow}`}>About Velocity</h2>
          <div className="mt-8 grid gap-4 text-xl">
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <span className="font-semibold">12 weeks of execution.</span> Five startups worked at <span className="font-semibold">Cinderblock</span> to build real products, acquire real customers, and generate real revenue.
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <span className="font-semibold">Outcomes, not vibes.</span> Each team ends with a <em>real product</em>, <em>real customers</em>, and <em>real revenue</em>.
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <span className="font-semibold">Measured by traction.</span> Progress tracked weekly through customers and revenue.
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <span className="font-semibold">The winner.</span> The startup with the highest velocity will be eligible for a <span className="font-semibold">$10K MFN investment</span> and membership to <span className="font-semibold">The Block</span>.
            </div>
          </div>
        </div>
      </section>

      {/* EVENT DETAILS */}
      <section className="relative bg-gradient-to-b from-black to-[#0a0a0a] py-20">
        <div className="container mx-auto px-6">
          <h2 className={`text-3xl md:text-4xl font-bold ${glow}`}>Event Details</h2>

          <div className="mt-10 space-y-8">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-fuchsia-600/20 via-purple-600/20 to-violet-600/20 p-[1px]">
              <div className="rounded-2xl bg-black p-6">
                <h3 className="text-xl font-semibold mb-2">Velocity / The LOUIES - KYX 2025 Celebration</h3>
                <p className="text-white/85">
                  Join us for an unforgettable night celebrating Kentucky&apos;s boldest founders, biggest wins, and the unstoppable momentum of KYX. This evening brings together builders, dreamers, investors, and community champions.
                </p>
                <p className="mt-3 text-white/70 text-sm">
                  <em>Thank you JPMorgan for sponsoring Velocity and being a partner of KYX</em>
                </p>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-xl font-semibold mb-4">Schedule</h3>
                <p className="text-white/90 font-semibold mb-4">Thursday, December 4th, 5-8pm</p>
                <ul className="space-y-3 text-white/85">
                  <li>
                    <span className="font-semibold">5:00 PM</span> — Doors Open
                  </li>
                  <li>
                    <span className="font-semibold">5:00–5:45 PM</span> — Networking
                    <br />
                    <span className="text-sm text-white/70">Connect with founders, investors, and community leaders. Light snacks, drinks, and the best conversation in the state.</span>
                  </li>
                  <li>
                    <span className="font-semibold">5:45–6:30 PM</span> — Velocity
                    <br />
                    <span className="text-sm text-white/70">A rapid-fire showcase of Kentucky&apos;s rising startups. Fast pitches, big ideas, and a front-row look at the teams shaping the future.</span>
                  </li>
                  <li>
                    <span className="font-semibold">6:30–7:30 PM</span> — THE LOUIES
                    <br />
                    <span className="text-sm text-white/70">Our annual awards ceremony honoring the standout founders, breakout teams, and unforgettable moments of 2025.</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-6">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-xl font-semibold mb-3">Location</h3>
                  <p className="text-white/85">
                    1205 E Washington St<br />
                    Louisville, KY 40206
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-xl font-semibold mb-3">The Prize</h3>
                  <p className="text-white/85">
                    The startup with the highest velocity will be eligible for a <span className="font-semibold">$10K MFN investment</span> and membership to <span className="font-semibold">The Block</span>, Louisville&apos;s startup war room.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="https://luma.com/8rgsdubd"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-white/90"
              >
                Register to Attend
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black/90 py-8 text-center text-white/60">
        <div className="container mx-auto px-6">
          © {new Date().getFullYear()} KYX • Velocity Finale
        </div>
      </footer>

      {/* keyframes */}
      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(120%); }
        }
      `}</style>
    </main>
  );
}
