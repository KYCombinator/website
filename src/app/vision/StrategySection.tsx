"use client";

import React, { useState } from "react";

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
    { 
      key: "Attract", 
      colorClasses: {
        bgExpanded: "bg-gradient-to-r from-rose-500/20 to-pink-500/20",
        bgNormal: "bg-gradient-to-r from-rose-500/10 to-pink-500/10",
        bgHover: "hover:from-rose-500/20 hover:to-pink-500/20",
        textExpanded: "text-rose-300",
        textNormal: "text-rose-400",
        textHover: "hover:text-rose-300",
        borderExpanded: "border-rose-500/50",
        borderNormal: "border-rose-500/30",
        borderHover: "hover:border-rose-500/50",
      }
    },
    { 
      key: "Retain", 
      colorClasses: {
        bgExpanded: "bg-gradient-to-r from-pink-500/20 to-fuchsia-500/20",
        bgNormal: "bg-gradient-to-r from-pink-500/10 to-fuchsia-500/10",
        bgHover: "hover:from-pink-500/20 hover:to-fuchsia-500/20",
        textExpanded: "text-pink-300",
        textNormal: "text-pink-400",
        textHover: "hover:text-pink-300",
        borderExpanded: "border-pink-500/50",
        borderNormal: "border-pink-500/30",
        borderHover: "hover:border-pink-500/50",
      }
    },
    { 
      key: "Incubate", 
      colorClasses: {
        bgExpanded: "bg-gradient-to-r from-fuchsia-500/20 to-purple-500/20",
        bgNormal: "bg-gradient-to-r from-fuchsia-500/10 to-purple-500/10",
        bgHover: "hover:from-fuchsia-500/20 hover:to-purple-500/20",
        textExpanded: "text-fuchsia-300",
        textNormal: "text-fuchsia-400",
        textHover: "hover:text-fuchsia-300",
        borderExpanded: "border-fuchsia-500/50",
        borderNormal: "border-fuchsia-500/30",
        borderHover: "hover:border-fuchsia-500/50",
      }
    },
    { 
      key: "Accelerate", 
      colorClasses: {
        bgExpanded: "bg-gradient-to-r from-purple-500/20 to-violet-500/20",
        bgNormal: "bg-gradient-to-r from-purple-500/10 to-violet-500/10",
        bgHover: "hover:from-purple-500/20 hover:to-violet-500/20",
        textExpanded: "text-purple-300",
        textNormal: "text-purple-400",
        textHover: "hover:text-purple-300",
        borderExpanded: "border-purple-500/50",
        borderNormal: "border-purple-500/30",
        borderHover: "hover:border-purple-500/50",
      }
    },
  ];

  const handlePillarClick = (key: string) => {
    if (expandedPillar === key) {
      setExpandedPillar(null);
    } else {
      setExpandedPillar(key);
    }
  };

  return (
    <div className="relative mb-16">
      <div className="absolute inset-0 bg-gradient-to-r from-rose-600/10 via-pink-600/10 to-fuchsia-600/10 rounded-2xl blur-3xl" />
      <div className="relative bg-gradient-to-br from-background-800/50 to-background-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-1 w-12 bg-gradient-to-r from-rose-500 to-fuchsia-500 rounded-full" />
          <span className="text-sm font-semibold text-rose-400 uppercase tracking-wider">
            Our Approach
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
          Strategy
        </h2>
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
          To reach our goal, KYX executes across four interconnected pillars:
        </p>

        <div className="space-y-3 mb-8">
          {pillarList.map((item) => {
            const pillar = pillars[item.key];
            const isExpanded = expandedPillar === item.key;
            const colors = item.colorClasses;
            return (
              <button
                key={item.key}
                onClick={() => handlePillarClick(item.key)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                  isExpanded
                    ? `${colors.bgExpanded} ${colors.textExpanded} border ${colors.borderExpanded}`
                    : `${colors.bgNormal} ${colors.textNormal} ${colors.bgHover} ${colors.textHover} border ${colors.borderNormal} ${colors.borderHover}`
                } font-semibold`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className={`text-lg font-bold mb-1 ${isExpanded ? colors.textExpanded : colors.textNormal}`}>
                      {pillar.title}
                    </div>
                    <div className="text-sm text-gray-400 leading-relaxed">
                      {pillar.summary}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {expandedPillar && pillars[expandedPillar] && (
          <div className="mt-6 pt-6 border-t border-white/10 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-white">
                {pillars[expandedPillar].title}
              </h3>
              <button
                onClick={() => setExpandedPillar(null)}
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
              {pillars[expandedPillar].content}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

