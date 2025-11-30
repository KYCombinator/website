"use client";

import React, { useState } from "react";

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
    { 
      key: "Jobs", 
      colorClasses: {
        bgExpanded: "bg-gradient-to-r from-blue-500/20 to-cyan-500/20",
        bgNormal: "bg-gradient-to-r from-blue-500/10 to-cyan-500/10",
        bgHover: "hover:from-blue-500/20 hover:to-cyan-500/20",
        textExpanded: "text-blue-300",
        textNormal: "text-blue-400",
        textHover: "hover:text-blue-300",
        borderExpanded: "border-blue-500/50",
        borderNormal: "border-blue-500/30",
        borderHover: "hover:border-blue-500/50",
      }
    },
    { 
      key: "Wealth", 
      colorClasses: {
        bgExpanded: "bg-gradient-to-r from-purple-500/20 to-pink-500/20",
        bgNormal: "bg-gradient-to-r from-purple-500/10 to-pink-500/10",
        bgHover: "hover:from-purple-500/20 hover:to-pink-500/20",
        textExpanded: "text-purple-300",
        textNormal: "text-purple-400",
        textHover: "hover:text-purple-300",
        borderExpanded: "border-purple-500/50",
        borderNormal: "border-purple-500/30",
        borderHover: "hover:border-purple-500/50",
      }
    },
    { 
      key: "Dynamism", 
      colorClasses: {
        bgExpanded: "bg-gradient-to-r from-indigo-500/20 to-violet-500/20",
        bgNormal: "bg-gradient-to-r from-indigo-500/10 to-violet-500/10",
        bgHover: "hover:from-indigo-500/20 hover:to-violet-500/20",
        textExpanded: "text-indigo-300",
        textNormal: "text-indigo-400",
        textHover: "hover:text-indigo-300",
        borderExpanded: "border-indigo-500/50",
        borderNormal: "border-indigo-500/30",
        borderHover: "hover:border-indigo-500/50",
      }
    },
    { 
      key: "Topophilia", 
      colorClasses: {
        bgExpanded: "bg-gradient-to-r from-violet-500/20 to-purple-500/20",
        bgNormal: "bg-gradient-to-r from-violet-500/10 to-purple-500/10",
        bgHover: "hover:from-violet-500/20 hover:to-purple-500/20",
        textExpanded: "text-violet-300",
        textNormal: "text-violet-400",
        textHover: "hover:text-violet-300",
        borderExpanded: "border-violet-500/50",
        borderNormal: "border-violet-500/30",
        borderHover: "hover:border-violet-500/50",
      }
    },
  ];

  const handleOutcomeClick = (key: string) => {
    if (expandedOutcome === key) {
      setExpandedOutcome(null);
    } else {
      setExpandedOutcome(key);
    }
  };

  return (
    <div className="relative mb-16">
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-indigo-600/10 to-purple-600/10 rounded-2xl blur-3xl" />
      <div className="relative bg-gradient-to-br from-background-800/50 to-background-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-1 w-12 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full" />
          <span className="text-sm font-semibold text-violet-400 uppercase tracking-wider">
            The Impact
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
          Outcome
        </h2>
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
          When we produce 10 real Series‑A startups, the downstream impact compounds:
        </p>

        <div className="space-y-3 mb-8">
          {outcomeList.map((item) => {
            const outcome = outcomes[item.key];
            const isExpanded = expandedOutcome === item.key;
            const colors = item.colorClasses;
            return (
              <button
                key={item.key}
                onClick={() => handleOutcomeClick(item.key)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                  isExpanded
                    ? `${colors.bgExpanded} ${colors.textExpanded} border ${colors.borderExpanded}`
                    : `${colors.bgNormal} ${colors.textNormal} ${colors.bgHover} ${colors.textHover} border ${colors.borderNormal} ${colors.borderHover}`
                } font-semibold`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className={`text-lg font-bold mb-1 ${isExpanded ? colors.textExpanded : colors.textNormal}`}>
                      {outcome.title}
                    </div>
                    <div className="text-sm text-gray-400 leading-relaxed">
                      {outcome.summary}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {expandedOutcome && outcomes[expandedOutcome] && (
          <div className="mt-6 pt-6 border-t border-white/10 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-white">
                {outcomes[expandedOutcome].title}
              </h3>
              <button
                onClick={() => setExpandedOutcome(null)}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="text-gray-300 leading-relaxed space-y-4">
              {outcomes[expandedOutcome].content}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

