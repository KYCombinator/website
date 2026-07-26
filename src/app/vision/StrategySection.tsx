"use client";

import React, { useState } from "react";
import { Container, Eyebrow, SerifHeading } from "@/app/components/fm";

interface PillarDefinition {
  title: string;
  summary: string;
  content: React.ReactNode;
}

export default function StrategySection() {
  const [expandedPillar, setExpandedPillar] = useState<string | null>(null);

  const pillars: Record<string, PillarDefinition> = {
    Attract: {
      title: "Attract",
      summary: "Bring ambitious founders, operators, and builders into the fold—both locally and from elsewhere. If the talent isn't here yet, we recruit it.",
      content: (
        <div className="space-y-4">
          <p>
            Bring ambitious founders, operators, and builders into the fold—both locally and from elsewhere. If the talent isn&apos;t here yet, we recruit it.
          </p>
        </div>
      ),
    },
    Retain: {
      title: "Retain",
      summary: "Make it irrational for founders to leave by giving them what they can't easily get elsewhere. Founders stay when they feel supported, challenged, and seen.",
      content: (
        <div className="space-y-4">
          <p>
            Make it irrational for founders to leave by giving them what they can&apos;t easily get elsewhere. Founders stay when they feel supported, challenged, and seen.
          </p>
        </div>
      ),
    },
    Incubate: {
      title: "Incubate",
      summary: "Through programs like Velocity, we help founders pressure‑test ideas, tighten narratives, validate markets, and establish the earliest version of repeatable motion.",
      content: (
        <div className="space-y-4">
          <p>
            Through programs like <em>Velocity</em>, we help founders pressure‑test ideas, tighten narratives, validate markets, and establish the earliest version of repeatable motion.
          </p>
        </div>
      ),
    },
    Accelerate: {
      title: "Accelerate",
      summary: "Once a startup shows real readiness, we help them scale faster—through later‑phase programming, customer introductions, capital pathways, and operational support.",
      content: (
        <div className="space-y-4">
          <p>
            Once a startup shows real readiness, we help them scale faster—through later‑phase programming, customer introductions, capital pathways, and operational support.
          </p>
        </div>
      ),
    },
  };

  const pillarList = [
    { key: "Attract" },
    { key: "Retain" },
    { key: "Incubate" },
    { key: "Accelerate" },
  ];

  const handlePillarClick = (key: string) => {
    if (expandedPillar === key) {
      setExpandedPillar(null);
    } else {
      setExpandedPillar(key);
    }
  };

  return (
    <section className="border-b border-[#16130f]">
      <Container className="py-16 lg:py-[72px]">
        <Eyebrow className="mb-4">Our approach</Eyebrow>
        <SerifHeading className="text-[32px] leading-none md:text-[40px]">
          Strategy.
        </SerifHeading>
        <p className="mt-6 max-w-[720px] text-[18px] leading-[1.6] text-[#4a443a] [text-wrap:pretty]">
          To reach our goal, KYX executes across four interconnected pillars:
        </p>

        <div className="mt-8 flex flex-col">
          {pillarList.map((item, i, arr) => {
            const pillar = pillars[item.key];
            const isExpanded = expandedPillar === item.key;
            const n = String(i + 1).padStart(2, "0");
            return (
              <div
                key={item.key}
                className={
                  "border-t border-[#d8d2c5] " +
                  (i === arr.length - 1 ? "border-b" : "")
                }
              >
                <button
                  onClick={() => handlePillarClick(item.key)}
                  aria-expanded={isExpanded}
                  className="grid w-full grid-cols-[36px_minmax(0,1fr)_24px] items-baseline gap-x-4 gap-y-1 py-5 text-left sm:grid-cols-[44px_180px_minmax(0,1fr)_24px] sm:gap-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)]"
                >
                  <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] text-[var(--kyx-purple)]">
                    {n}
                  </span>
                  <span className="font-[family-name:var(--font-instrument-serif)] text-[26px] leading-none">
                    {pillar.title}
                  </span>
                  <span className="col-span-2 text-[15px] leading-[1.6] text-[#4a443a] sm:col-span-1">
                    {pillar.summary}
                  </span>
                  <span
                    aria-hidden
                    className="col-start-3 row-start-1 justify-self-end font-[family-name:var(--font-ibm-plex-mono)] text-[16px] text-[var(--kyx-purple)] sm:col-start-4"
                  >
                    {isExpanded ? "−" : "+"}
                  </span>
                </button>
                {isExpanded && (
                  <div className="max-w-[720px] space-y-4 pb-6 text-[15px] leading-[1.65] text-[#4a443a] [&_em]:italic sm:pl-[64px]">
                    {pillar.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
