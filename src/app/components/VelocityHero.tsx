"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function VelocityHero() {
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
        "A streaming platform built exclusively for comedians.",
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

  return (
    <section className="relative bg-[#0b0b10] min-h-[70vh] flex flex-col">
      {/* Horizontal Accordion - 6 parts */}
      <div className="w-full h-[70vh] flex">
        {/* First part: Title, Description, Button */}
        <motion.div
          className="relative flex flex-col bg-[#0b0b10]"
          initial={false}
          animate={{
            flex: hoveredCompany === null ? 1.5 : 0.8,
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {/* hairline border on the right */}
          <div className="absolute right-0 top-0 bottom-0 w-px bg-white/[0.06] z-20" />

          <div className="flex-1 flex flex-col justify-center p-6 md:p-8 lg:p-12">
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-[11px] font-medium uppercase tracking-[0.28em] text-zinc-400 mb-4"
            >
              Velocity Finale
            </motion.p>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-4"
            >
              Five startups. Twelve weeks.
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-base md:text-lg text-zinc-400 mb-8 leading-relaxed"
            >
              Watch five startups present their 12‑week journey. Part of the Velocity / The LOUIES — KYX 2025 Celebration.
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.6 }}
            >
              <Link
                href="/events/velocityfinale"
                className="group inline-flex items-center rounded-md bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 transition-colors duration-200 hover:bg-zinc-200"
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
              marginLeft: idx === 0 ? "-1px" : "-1px",
              zIndex: hoveredCompany === idx ? 30 : 10 + idx,
            }}
          >
            {/* hairline border on the right */}
            <div className="absolute right-0 top-0 bottom-0 w-px bg-white/[0.06] z-20" />


            {/* Image Container */}
            <div className="relative flex-1 overflow-hidden">
              <motion.img
                src={company.image}
                alt={company.name}
                className="w-full h-full object-cover"
                style={{ transformOrigin: "center center" }}
                animate={{
                  scale: hoveredCompany === idx ? 1.1 : 1,
                  filter: hoveredCompany === idx ? "brightness(1.15)" : "brightness(1)",
                }}
                transition={{ 
                  duration: 0.5,
                  ease: "easeOut"
                }}
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent" />
              
              {/* neutral dim overlay */}
              <motion.div
                className="absolute inset-0 bg-black"
                initial={false}
                animate={{
                  opacity: hoveredCompany === idx ? 0.05 : 0.4,
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
              
              {/* Company Name */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 pointer-events-none">
                <div className="mb-2 pointer-events-auto">
                  <h3 className="text-white font-bold text-lg md:text-xl lg:text-2xl">
                    {company.name}
                  </h3>
                </div>
                
                {/* Description */}
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
                          duration: 0,
                        }
                      }}
                      transition={{
                        duration: 0.4,
                        delay: 0.3,
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
    </section>
  );
}

