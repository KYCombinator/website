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
    description:
    "A platform for gamers to create and share their own custom games.",
    image: "https://cdn.kycombinator.com/velocity/bottleepisodes.png",
    },
    {
    name: "DueGooder",
    description:
    "Students's accountability partner that helps them stay on track with their goals.",
    image: "https://cdn.kycombinator.com/velocity/duegooder.png",
    },
    {
    name: "Jokester",
    description:
    "Livestreaming comedy platform built exclusively for comedians.",
    image: "https://cdn.kycombinator.com/velocity/jokester.jpg",
    },
    {
    name: "LeapFrog",
    description:
    "Remote work platform for companies to hire Brazilian remote workers.",
    image: "https://cdn.kycombinator.com/velocity/felipe.jpg",
    },
    {
    name: "MoneyBot",
    description:
    "Financial literacy platform for kids to learn about money and investing.",
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
      {/* HERO: 6-part Accordion at top */}
      <section className="relative bg-black min-h-screen flex flex-col">
        {/* Horizontal Accordion - 6 parts, no gaps, goes to top */}
        <div className="w-full h-[70vh] flex">
          {/* First part: Title, Description, Button */}
          <motion.div
            className="relative flex flex-col bg-gradient-to-br from-purple-900/20 to-black"
            initial={false}
            animate={{
              flex: hoveredCompany === null ? 1.5 : 0.8,
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {/* Shimmer border on the right */}
            <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-purple-500 to-transparent animate-[shimmer-border_3s_ease-in-out_infinite] z-20" />
            
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
                className="text-base md:text-lg lg:text-xl text-white/80 mb-6"
              >
                Watch 5 startups present their 12‑week journey. Part of the Velocity / The LOUIES - KYX 2025 Celebration.
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.6 }}
              >
                <Link
                  href="https://luma.com/8rgsdubd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-2xl border border-white/20 bg-primary-500 px-6 py-3 font-semibold backdrop-blur transition hover:bg-primary-700 text-white"
                >
                  Register to Attend
                </Link>
                <p className="text-white/70 text-sm md:text-base mt-4">
                  Thursday, December 4th, 5pm at Solyco Capital 111 West Main Street, LOUIESville, KY
                </p>
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
              {/* Shimmer border on the right */}
              <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-purple-500 to-transparent animate-[shimmer-border_3s_ease-in-out_infinite] z-20" 
                   style={{ animationDelay: `${idx * 0.2}s` }} />
              
              {/* Image Container */}
              <div className="relative flex-1 overflow-hidden">
                <motion.img
                  src={company.image}
                  alt={company.name}
                  className="w-full h-full object-cover"
                  style={{ transformOrigin: "center center" }}
                  animate={{
                    scale: hoveredCompany === idx ? 1.1 : 1,
                  }}
                  transition={{ 
                    duration: 0.5,
                    ease: "easeOut"
                  }}
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent" />
                
                {/* Company Name - overlay near bottom, fixed position */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 pointer-events-none">
                  {/* Title - always visible, fixed position */}
                  <div className="mb-2 pointer-events-auto">
                    <h3 className="text-white font-bold text-lg md:text-xl lg:text-2xl">
                      {company.name}
                    </h3>
                  </div>
                  
                  {/* Description - appears on hover/expand with delay, positioned below title */}
                  <AnimatePresence mode="wait">
                    {hoveredCompany === idx && (
                      <motion.div
                        key="description"
                        initial={{ opacity: 0, maxHeight: 0, marginTop: 0 }}
                        animate={{ 
                          opacity: 1, 
                          maxHeight: 200,
                          marginTop: 8
                        }}
                        exit={{ 
                          opacity: 0, 
                          maxHeight: 0,
                          marginTop: 0,
                          transition: {
                            duration: 0, // Exit immediately
                          }
                        }}
                        transition={{
                          duration: 0.4,
                          delay: 0.3, // Delay so accordion expands first
                          ease: "easeInOut"
                        }}
                        className="overflow-hidden pointer-events-auto"
                        style={{ willChange: "max-height, opacity" }}
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
            {companies.map((company, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * idx, duration: 0.6 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
              >
                <h3 className="text-xl font-semibold mb-3 text-white">{company.name}</h3>
                <p className="text-white/80 mb-4">{company.description}</p>
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
                    Solyco Capital<br />
                    101 West Main Street<br />
                    LOUIESville, KY 40206
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-xl font-semibold mb-3">The Prize</h3>
                  <p className="text-white/85">
                    The startup with the highest velocity will be eligible for a <span className="font-semibold">$25K MFN investment</span> and membership to <span className="font-semibold">Cinderblock</span>, Louisville&apos;s startup war room.
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
                className="rounded-xl bg-primary-500 hover:bg-primary-700 text-white px-6 py-3 font-semibold transition"
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
        @keyframes shimmer-border {
          0%, 100% {
            opacity: 0.3;
            box-shadow: 0 0 10px rgba(168, 85, 247, 0.3);
          }
          50% {
            opacity: 1;
            box-shadow: 0 0 20px rgba(168, 85, 247, 0.8), 0 0 30px rgba(168, 85, 247, 0.5);
          }
        }
      `}</style>
    </main>
  );
}
