"use client";

import React, { useState } from "react";

interface TermDefinition {
  term: string;
  content: React.ReactNode;
}

const MetricSection = () => {
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);

  const definitions: Record<string, TermDefinition> = {
    "10": {
      term: "10",
      content: (
        <div className="space-y-4">
          <p>
            A specific, ambitious target. That&apos;s 10x our current average.
          </p>
          <p>
            Only 10 companies raised a Series A round in Louisville in the last 5 years compared to 48
            in Nashville.
          </p>
        </div>
      ),
    },
    "Series A": {
      term: "Series A",
      content: (
        <div className="space-y-4">
          <p>
            A Series A round is the first significant institutional venture capital raise—typically $3M–$15M. 
            More importantly, a Series A is a readiness milestone. A Series‑A‑ready startup generally has:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-2">
            <li>
              <strong>Repeatable Go‑To‑Market</strong>: early customers aren&apos;t random; there is a
              predictable way to attract, convert, and retain customers.
            </li>
            <li>
              <strong>Meaningful Traction</strong>: SaaS with $1M–$2M ARR, consumer products with
              fast and cost‑effective user growth, marketplaces with clear liquidity,
              deep tech with validated milestones plus commercial interest.
            </li>
            <li>
              <strong>Validated Problem + Solution</strong>: clear customer pain and a product
              that actually solves it and is used repeatedly.
            </li>
            <li>
              <strong>A Team Beyond Just the Founder</strong>: typically 3–10 people with
              complementary skills in product, engineering, GTM, and operations.
            </li>
            <li>
              <strong>A Vision That Justifies Institutional Capital</strong>: a credible plan to
              become a large company in a market big enough to support venture returns.
            </li>
          </ul>
          <p>
            We focus on Series A because it&apos;s the inflection point where ecosystems
            actually change: it&apos;s the first time a company has a truly validated business;
            founders hire teams and build infrastructure; the startup becomes too big and
            too real to leave. If KYX can produce 10 companies that reach Series A, it
            means we have real founders, real companies, and real capital formation.
          </p>
        </div>
      ),
    },
    "Venture-Backable": {
      term: "Venture-Backable",
      content: (
        <div className="space-y-4">
          <p>
            Venture‑backable is a selection criterion. The choice to take venture capital is a
            personal and strategic one. Many great companies never raise a dollar of VC, and we
            celebrate that. KYX isn&apos;t here to push founders toward any particular funding
            path—we exist to support ambitious builders, not prescribe their financing.
          </p>
          <p>
            When we talk about venture‑backable startups, we&apos;re not talking about who <em>must</em>
            raise money. We&apos;re talking about <strong>ambition, scalability, and impact</strong>. A
            venture‑backable startup is one that <em>could</em> raise institutional capital if the
            founder chooses to—because the company demonstrates the characteristics investors
            look for:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-2">
            <li>Solves a meaningful problem in a large market</li>
            <li>Has the potential to scale fast without linear increases in cost</li>
            <li>Shows strong margins and sound unit economics</li>
            <li>Has defensible differentiation (tech, IP, data, networks)</li>
            <li>Is led by founders who intend to build category‑defining companies</li>
          </ul>
          <p>
            These qualities matter because they signal something bigger: <strong>the capacity
            for outsized regional impact</strong>. Startups with venture‑level potential—whether
            they raise capital or not—are the ones most likely to create high‑quality jobs,
            generate substantial wealth, establish a culture of innovation, anchor talent and
            investment, and inspire the next generation of builders.
          </p>
          <p>
            In other words, <strong>venture‑backability is about potential, not funding</strong>.
            Some KYX founders will raise venture capital. Some will bootstrap to
            profitability. Some will blend different financing models. All of these paths
            are valid. What we&apos;re filtering for is ambition, scalability, and the ability to
            become a meaningful company—because those are the companies that move ecosystems.
          </p>
        </div>
      ),
    },
    "Startups": {
      term: "Startups",
      content: (
        <div className="space-y-4">
          <p>
            KYX focuses on startups, not small businesses or lifestyle companies. A startup
            is defined by intent, ambition, and scalability. It is built from day one with
            the goal of becoming a large, defensible business capable of serving national
            or global markets. Startups target big markets, can scale exponentially,
            prioritize defensibility (technology, data, brand, network effects), and build
            repeatable growth engines.
          </p>
        </div>
      ),
    },
  };

  const handleTermClick = (term: string) => {
    if (expandedTerm === term) {
      setExpandedTerm(null);
    } else {
      setExpandedTerm(term);
    }
  };

  const renderTextWithClickableTerms = (text: string) => {
    const parts: (string | React.ReactNode)[] = [];
    let lastIndex = 0;
    
    // Define term patterns with their normalized keys
    const termPatterns: Array<{ pattern: RegExp; key: string }> = [
      { pattern: /\b10\b/gi, key: "10" },
      { pattern: /series[‑\s-]?a/gi, key: "Series A" },
      { pattern: /venture[‑\s-]?backable/gi, key: "Venture-Backable" },
      { pattern: /\bstartups?\b/gi, key: "Startups" },
    ];

    // Find all clickable terms and their positions
    const matches: Array<{ term: string; index: number; length: number; key: string }> = [];
    termPatterns.forEach(({ pattern, key }) => {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        matches.push({
          term: match[0],
          index: match.index,
          length: match[0].length,
          key: key,
        });
      }
    });

    // Sort matches by index
    matches.sort((a, b) => a.index - b.index);

    // Remove overlapping matches (keep the first one)
    const filteredMatches: Array<{ term: string; index: number; length: number; key: string }> = [];
    let currentEnd = 0;
    matches.forEach((match) => {
      if (match.index >= currentEnd) {
        filteredMatches.push(match);
        currentEnd = match.index + match.length;
      }
    });

    // Build the parts array
    filteredMatches.forEach((match) => {
      // Add text before the match
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }

      // Add the clickable term
      parts.push(
        <button
          key={`term-${match.index}`}
          onClick={() => handleTermClick(match.key)}
          className={`inline-block px-1.5 py-0.5 rounded transition-all duration-200 ${
            expandedTerm === match.key
              ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/50"
              : "bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-400 hover:from-cyan-500/20 hover:to-blue-500/20 hover:text-cyan-300 border border-cyan-500/30 hover:border-cyan-500/50"
          } font-semibold underline decoration-2 underline-offset-2 cursor-pointer`}
        >
          {match.term}
        </button>
      );

      lastIndex = match.index + match.length;
    });

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  return (
    <div className="relative mb-16">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 via-blue-600/10 to-indigo-600/10 rounded-2xl blur-3xl" />
      <div className="relative bg-gradient-to-br from-background-800/50 to-background-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-1 w-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
          <span className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">
            Our Metric
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
          Metric
        </h2>
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
          {renderTextWithClickableTerms(
            "We're focused deliberately and unapologetically on 10 series‑A venture‑backable startups."
          )}
        </p>

        {expandedTerm && definitions[expandedTerm] && (
          <div className="mt-6 pt-6 border-t border-white/10 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-white">
                {definitions[expandedTerm].term}
              </h3>
              <button
                onClick={() => setExpandedTerm(null)}
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
              {definitions[expandedTerm].content}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricSection;

