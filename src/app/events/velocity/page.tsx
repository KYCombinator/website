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

      {/* HERO: full-screen video background */}
      <section className="relative min-h-screen">
        {/* Background video */}
        <video
          ref={(videoEl) => {
            if (videoEl) {
              videoEl.playbackRate = 0.5; // 50% speed
            }
          }}
          className="absolute inset-0 h-full w-full object-cover"
          src="https://cdn.kycombinator.com/velocity.mp4"
          autoPlay
          muted
          playsInline
          aria-hidden
        />
        {/* gradient scrim for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 pt-24 pb-32 flex min-h-screen items-center">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className={`text-4xl md:text-6xl font-extrabold tracking-tight ${glow}`}
            >
              Velocity Competition
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-4 text-lg md:text-2xl text-white/80"
            >
              A 12‑week sprint to customers, revenue, and momentum.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link
                href="https://lu.ma/velocitypitch"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/20 bg-white/10 px-6 py-3 font-semibold backdrop-blur transition hover:bg-white/20"
              >
                Register to Attend
              </Link>
              <Link
                href="https://form.kycombinator.com/velocity"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-white/90"
              >
                Apply to Pitch
              </Link>
            </motion.div>
          </div>
        </div>

        {/* subtle bottom cue */}
        <div className="pointer-events-none absolute bottom-6 left-0 right-0 z-10 flex justify-center">
          <div className="animate-bounce text-white/70">▾</div>
        </div>
      </section>

      {/* WHY */}
      <section className="relative bg-black py-20">
        <div className="container mx-auto px-6">
          <h2 className={`text-3xl md:text-4xl font-bold ${glow}`}>Why Velocity?</h2>
          <ul className="mt-8 space-y-4 text-white/85 text-xl">
            <li className="rounded-xl border border-white/10 bg-white/5 p-6">
              Surround yourself with the highest‑velocity founders in Louisville. Iron sharpens iron.
            </li>
            <li className="rounded-xl border border-white/10 bg-white/5 p-6">
              Work with ruthless focus for 12 weeks. Execution
            </li>
            <li className="rounded-xl border border-white/10 bg-white/5 p-6">
              Public accountability via weekly leaderboard and updates.
            </li>
            <li className="rounded-xl border border-white/10 bg-white/5 p-6">
              $10K MFN investment eligibility and access to Cinderblock.
            </li>
          </ul>
        </div>
      </section>

      {/* WHAT */}
      <section className="relative bg-black py-20">
        <div className="container mx-auto px-6">
          <h2 className={`text-3xl md:text-4xl font-bold ${glow}`}>What is Velocity?</h2>
          <div className="mt-8 grid gap-4 text-xl">
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <span className="font-semibold">In‑person, on‑site.</span> All teams work at <span className="font-semibold">Cinderblock</span> for the full 12 weeks.
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <span className="font-semibold">Outcomes, not vibes.</span> End with a <em>real product</em>, <em>real customers</em>, and <em>real revenue</em>.
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <span className="font-semibold">Measured by traction.</span> Traction is customers and revenue.
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <span className="font-semibold">Early‑stage only.</span> Teams are <em>&lt; 1 year old</em> and <em>≤ $25K revenue</em> at entry.
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <span className="font-semibold">Transparent progress.</span> We publish the leaderboard every Monday with current stats and updates.
            </div>
          </div>
        </div>
      </section>

      {/* IMPORTANT DETAILS */}
      <section className="relative bg-gradient-to-b from-black to-[#0a0a0a] py-20">
        <div className="container mx-auto px-6">
          <h2 className={`text-3xl md:text-4xl font-bold ${glow}`}>Important Details</h2>

          {/* Entry Criteria */}
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-semibold">Entry Criteria</h3>
              <ul className="mt-4 space-y-3 text-white/85">
                <li>• Less than 1 year old.</li>
                <li>• Less than $25K in revenue.</li>
                <li>
                  • At least 1 full‑time founder who will work in‑person full time with the
                  rest of the cohort during the 12 weeks.
                </li>
              </ul>
            </div>

            {/* 12-week Outcomes */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-semibold">Within 12 Weeks, Teams Must Have</h3>
              <ul className="mt-4 space-y-3 text-white/85">
                <li>• A real product that’s being used by customers.</li>
                <li>• 10 customers OR 3× as many customers as they started with (whichever is greater).</li>
                <li>• Some revenue OR 3× as many customers as they started with (whichever is greater).</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-r from-fuchsia-600/20 via-purple-600/20 to-violet-600/20 p-[1px]">
            <div className="rounded-2xl bg-black p-6">
              <h3 className="text-xl font-semibold">Prize & Membership</h3>
              <p className="mt-3 text-white/85">
                At the end of 12 weeks, the team with the highest velocity will be eligible for a
                <span className="font-bold"> $10K MFN investment</span> and a membership to <span className="font-bold">The Block</span>,
                Louisville’s startup war room.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="https://form.kycombinator.com/velocity"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-white/90"
            >
              Apply to Pitch
            </Link>
            <Link
              href="https://lu.ma/velocitypitch"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-semibold backdrop-blur transition hover:bg-white/20"
            >
              Register to Attend
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black/90 py-8 text-center text-white/60">
        <div className="container mx-auto px-6">
          © {new Date().getFullYear()} KYX • Velocity
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
