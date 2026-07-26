"use client";

import React, { useState } from "react";
import { Container, Eyebrow, SerifHeading } from "@/app/components/fm";

interface OutcomeDefinition {
  title: string;
  summary: string;
  content: React.ReactNode;
}

export default function OutcomeSection() {
  const [expandedOutcome, setExpandedOutcome] = useState<string | null>(null);

  const outcomes: Record<string, OutcomeDefinition> = {
    Jobs: {
      title: "Jobs",
      summary: "High‑wage, future‑facing roles that retain local talent. A venture‑scale startup doesn't create one job at a time—it creates job engines.",
      content: (
        <div className="space-y-4">
          <p>
            High‑wage, future‑facing roles that retain local talent. A venture‑scale startup doesn&apos;t create one job at a time—it creates job engines, hiring 5–20 people immediately post‑raise and scaling to 50–150+ within a few years.
          </p>
          <p>
            These are engineers, designers, operators, salespeople, product and data scientists. These jobs are sticky: once a team is built locally, uprooting is costly and unlikely.
          </p>
          <p>
            This creates demand that pulls talent back into the region, strengthens universities and pipelines, and recycles skills as employees eventually spin out to start or join new companies.
          </p>
        </div>
      ),
    },
    Wealth: {
      title: "Wealth",
      summary: "Founder, employee, and investor wealth creation recycles into the ecosystem. Venture‑backable startups are one of the only ways regions create new net worth at scale.",
      content: (
        <div className="space-y-4">
          <p>
            Founder, employee, and investor wealth creation recycles into the ecosystem. Venture‑backable startups are one of the only ways regions create new net worth at scale.
          </p>
          <p>
            Wealth generated locally tends to stay local; it seeds the next generation of angels, creates a culture of reinvestment, and reduces dependence on coastal capital.
          </p>
          <p>
            Regions with strong entrepreneurship don&apos;t import wealth— they manufacture it.
          </p>
        </div>
      ),
    },
    Dynamism: {
      title: "Dynamism",
      summary: "The difference between a place that feels alive and one that feels stagnant. Dynamism means a constant sense that something is happening.",
      content: (
        <div className="space-y-4">
          <p>
            The difference between a place that feels alive and one that feels stagnant. Dynamism means a constant sense that something is happening—new ideas, new experiments, new companies.
          </p>
          <p>
            It increases talent density, serendipity, and momentum. High‑dynamism regions attract outsiders; ambitious people want to be around other ambitious people.
          </p>
        </div>
      ),
    },
    Topophilia: {
      title: "Topophilia",
      summary: "A place people love to stay in, return to, or move to because opportunity is real. It's the X‑factor that keeps founders rooted even when they could leave.",
      content: (
        <div className="space-y-4">
          <p>
            A place people love to stay in, return to, or move to because opportunity is real. It&apos;s the X‑factor that keeps founders rooted even when they could leave.
          </p>
          <p>
            It manifests as pride in belonging to a real community, cultural and lifestyle advantages, a rhythm of life that supports both ambition and quality of life, and traditions and identity that make founders proud to claim the city as home.
          </p>
        </div>
      ),
    },
  };

  const outcomeList = [
    { key: "Jobs" },
    { key: "Wealth" },
    { key: "Dynamism" },
    { key: "Topophilia" },
  ];

  const handleOutcomeClick = (key: string) => {
    if (expandedOutcome === key) {
      setExpandedOutcome(null);
    } else {
      setExpandedOutcome(key);
    }
  };

  return (
    <section className="border-b border-[#16130f] bg-[#eae5da]">
      <Container className="py-16 lg:py-[72px]">
        <Eyebrow className="mb-4">The impact</Eyebrow>
        <SerifHeading className="text-[32px] leading-none md:text-[40px]">
          Outcome.
        </SerifHeading>
        <p className="mt-6 max-w-[720px] text-[18px] leading-[1.6] text-[#4a443a] [text-wrap:pretty]">
          When we produce 10 real Series‑A startups, the downstream impact compounds:
        </p>

        <div className="mt-8 flex flex-col">
          {outcomeList.map((item, i, arr) => {
            const outcome = outcomes[item.key];
            const isExpanded = expandedOutcome === item.key;
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
                  onClick={() => handleOutcomeClick(item.key)}
                  aria-expanded={isExpanded}
                  className="grid w-full grid-cols-[36px_minmax(0,1fr)_24px] items-baseline gap-x-4 gap-y-1 py-5 text-left sm:grid-cols-[44px_180px_minmax(0,1fr)_24px] sm:gap-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)]"
                >
                  <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] text-[var(--kyx-purple)]">
                    {n}
                  </span>
                  <span className="font-[family-name:var(--font-instrument-serif)] text-[26px] leading-none">
                    {outcome.title}
                  </span>
                  <span className="col-span-2 text-[15px] leading-[1.6] text-[#4a443a] sm:col-span-1">
                    {outcome.summary}
                  </span>
                  <span
                    aria-hidden
                    className="col-start-3 row-start-1 justify-self-end font-[family-name:var(--font-ibm-plex-mono)] text-[16px] text-[var(--kyx-purple)] sm:col-start-4"
                  >
                    {isExpanded ? "−" : "+"}
                  </span>
                </button>
                {isExpanded && (
                  <div className="max-w-[720px] space-y-4 pb-6 text-[15px] leading-[1.65] text-[#4a443a] sm:pl-[64px]">
                    {outcome.content}
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
