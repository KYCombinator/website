"use client";

import React, { useState } from "react";
import { Container, Eyebrow, SerifHeading } from "@/app/components/fm";

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
          className={`cursor-pointer border-b transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)] ${
            expandedTerm === match.key
              ? "border-[var(--kyx-purple)] text-[#16130f]"
              : "border-[var(--kyx-purple)] text-[var(--kyx-purple)] hover:text-[#16130f]"
          }`}
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
    <section className="border-b border-[#16130f] bg-[#eae5da]">
      <Container className="py-16 lg:py-[72px]">
        <Eyebrow className="mb-4">Our metric</Eyebrow>
        <SerifHeading className="text-[32px] leading-none md:text-[40px]">
          Metric.
        </SerifHeading>
        <p className="mt-6 max-w-[720px] text-[20px] leading-[1.5] text-[#4a443a] md:text-[22px] [text-wrap:pretty]">
          {renderTextWithClickableTerms(
            "We're focused deliberately and unapologetically on 10 series‑A venture‑backable startups."
          )}
        </p>
        <p className="mt-3 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.1em] text-[#7d766a]">
          Select a term for the definition
        </p>

        {expandedTerm && definitions[expandedTerm] && (
          <div className="mt-8 border-t border-[#d8d2c5] pt-6">
            <div className="mb-4 flex items-center justify-between gap-4">
              <SerifHeading as="h3" className="text-[26px] leading-none">
                {definitions[expandedTerm].term}
              </SerifHeading>
              <button
                onClick={() => setExpandedTerm(null)}
                className="text-[#7d766a] transition-colors duration-150 hover:text-[#16130f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)]"
                aria-label="Close"
              >
                <svg
                  className="h-6 w-6"
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
            <div className="max-w-[720px] space-y-4 text-[15px] leading-[1.65] text-[#4a443a] [&_li]:leading-[1.6] [&_strong]:font-semibold [&_strong]:text-[#16130f] [&_ul]:ml-4 [&_ul]:list-inside [&_ul]:list-disc [&_ul]:space-y-2">
              {definitions[expandedTerm].content}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

export default MetricSection;

