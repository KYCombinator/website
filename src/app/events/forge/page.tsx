"use client";

import React from "react";
import Image from "next/image";
import { Container, PageHero, Eyebrow, SerifHeading, Button } from "@/app/components/fm";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
  date: string;
}

// Roadmap data for The Forge.
const timelineData: TimelineEntry[] = [
  {
    title: "Velocity Start",
    content: (
      <p>
        Kick off The Forge journey with the Velocity Pitch Competition. Teams
        begin a 12-week sprint to validate their ideas, find customers, and
        generate revenue.
      </p>
    ),
    date: "Start Date",
  },
  {
    title: "Roadtrip Rally",
    content: (
      <p>
        Teams hit the road (metaphorically!) focusing on customer discovery and
        market validation. Intensive mentorship and workshops help refine
        business models.
      </p>
    ),
    date: "Date Range",
  },
  {
    title: "Hack Kentucky",
    content: (
      <>
        <p>
          A statewide hackathon where Forge teams can recruit technical talent,
          rapidly prototype solutions, and gain visibility.
        </p>
        <p className="mt-2">Focus on building MVPs and technical feasibility.</p>
      </>
    ),
    date: "Date",
  },
  {
    title: "Hell Week",
    content: (
      <>
        <p>
          An intense week of challenges, pitch practice, and investor readiness
          preparation. Teams face rigorous scrutiny and feedback.
        </p>
        <p className="mt-2">
          Pushing founders to their limits before the finals.
        </p>
      </>
    ),
    date: "Date Range",
  },
  {
    title: "Build n' Chill",
    content: (
      <>
        <p>
          A period for teams to integrate feedback, refine their
          products/services, and prepare for the final stages. Focus shifts
          towards execution and polish.
        </p>
        <p className="mt-2">Networking and community building emphasis.</p>
      </>
    ),
    date: "Date Range",
  },
  {
    title: "Velocity Finals",
    content: (
      <>
        <p>
          The culmination of the Velocity Pitch Competition. Teams present their
          progress and validated business models to judges and potential
          investors.
        </p>
        <p className="mt-2">Winners are crowned and awarded prizes/funding.</p>
      </>
    ),
    date: "Date",
  },
];

const Page = () => {
  return (
    <>
      <PageHero
        eyebrow="Founders Aren't Born, They're Forged"
        title="The Forge of Excellence."
        intro="Step into the forge. The Forge is a high-intensity, real-world simulation designed to test your limits, refine your business model, and build the resilience needed to lead a thriving startup."
      >
        <Button
          href="https://magic.beehiiv.com/v1/04d3dfce-b968-4cc1-8ae5-46d51d19c2b6"
          external
          variant="primary"
        >
          Get Event Updates
        </Button>
      </PageHero>

      {/* Cover image band */}
      <section className="border-b border-[#16130f]">
        <div className="relative aspect-video max-h-[560px] w-full bg-[#eae5da]">
          <Image
            src="/crucible/cover2.png"
            alt="Forge event cover photo"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Why Section */}
      <section className="border-b border-[#16130f]">
        <Container className="grid grid-cols-1 gap-8 py-16 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-14 lg:py-[72px]">
          <div className="flex flex-col gap-3">
            <Eyebrow>Why The Forge?</Eyebrow>
            <SerifHeading className="text-[32px] leading-none md:text-[40px]">
              Forged, not born.
            </SerifHeading>
          </div>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-3">
              <h3 className="font-[family-name:var(--font-ibm-plex-sans)] text-[18px] font-medium text-[#16130f]">
                Forging Resilient Founders
              </h3>
              <p className="max-w-[640px] text-[16px] leading-[1.65] text-[#4a443a]">
                Building a successful startup is an{" "}
                <strong className="font-semibold text-[#16130f]">
                  incredibly demanding journey
                </strong>
                . It requires more than just a good idea; it demands{" "}
                <strong className="font-semibold text-[#16130f]">
                  resilience
                </strong>
                ,{" "}
                <strong className="font-semibold text-[#16130f]">
                  adaptability
                </strong>
                , and{" "}
                <strong className="font-semibold text-[#16130f]">
                  unwavering determination
                </strong>
                . The Forge is meticulously designed to simulate the intense
                pressures and challenges of the real entrepreneurial world.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-[family-name:var(--font-ibm-plex-sans)] text-[18px] font-medium text-[#16130f]">
                Real-World Simulation &amp; Growth
              </h3>
              <p className="max-w-[640px] text-[16px] leading-[1.65] text-[#4a443a]">
                We provide a structured, high-intensity environment where
                founders can test their limits, rigorously refine their business
                models, and ultimately{" "}
                <strong className="font-semibold text-[#16130f]">
                  forge themselves into capable, decisive leaders
                </strong>
                . Key benefits include:
              </p>
              <ul className="flex max-w-[640px] flex-col gap-1.5">
                {[
                  "Intensive mentorship from seasoned entrepreneurs.",
                  "Hands-on workshops focused on critical business skills.",
                  "Exposure to potential investors and partners.",
                  "Opportunities for rapid prototyping and validation.",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-[16px] leading-[1.5] text-[#4a443a]"
                  >
                    <span className="mt-0.5 text-[var(--kyx-purple)]">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-[family-name:var(--font-ibm-plex-sans)] text-[18px] font-medium text-[#16130f]">
                Community &amp; Support
              </h3>
              <p className="max-w-[640px] text-[16px] leading-[1.65] text-[#4a443a]">
                We firmly believe that{" "}
                <strong className="font-semibold text-[#16130f]">
                  true innovation often arises from adversity
                </strong>
                . By embracing challenges and learning from failures within a
                supportive community of peers and mentors, participants emerge{" "}
                <strong className="font-semibold text-[#16130f]">stronger</strong>
                ,{" "}
                <strong className="font-semibold text-[#16130f]">
                  more focused
                </strong>
                , and better equipped to navigate the turbulent waters of
                entrepreneurship. Our program provides the essential resources,
                guidance, and network needed to transform promising concepts into{" "}
                <strong className="font-semibold text-[#16130f]">
                  thriving, sustainable businesses
                </strong>
                .
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Roadmap */}
      <section className="border-b border-[#16130f] bg-[#eae5da]">
        <Container className="py-16 lg:py-[72px]">
          <div className="flex flex-col gap-3">
            <Eyebrow>The roadmap</Eyebrow>
            <SerifHeading className="text-[32px] leading-none md:text-[40px]">
              The Forge Roadmap
            </SerifHeading>
            <p className="text-[15px] leading-[1.65] text-[#57503f]">
              Founders Aren&apos;t Born They&apos;re Forged.
            </p>
          </div>
          <div className="mt-10 flex flex-col">
            {timelineData.map((item, i) => (
              <div
                key={item.title}
                className={
                  "grid grid-cols-[36px_minmax(0,1fr)] items-baseline gap-x-4 gap-y-2 border-t border-[#d8d2c5] py-6 md:grid-cols-[44px_220px_minmax(0,1fr)] md:gap-x-8 " +
                  (i === timelineData.length - 1 ? "border-b" : "")
                }
              >
                <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] text-[var(--kyx-purple)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col">
                  <h3 className="font-[family-name:var(--font-instrument-serif)] text-[26px] leading-tight tracking-[-0.02em] text-[#16130f]">
                    {item.title}
                  </h3>
                  <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#7d766a]">
                    {item.date}
                  </p>
                </div>
                <div className="col-span-2 max-w-[560px] text-[15px] leading-[1.6] text-[#4a443a] md:col-span-1">
                  {item.content}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Mailing List — community band */}
      <section className="grid grid-cols-1 gap-8 bg-[#16130f] px-5 py-14 text-[#f4f1ea] md:px-7 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center lg:gap-14 lg:px-10 lg:py-16">
        <div className="flex flex-col gap-3">
          <h2 className="font-[family-name:var(--font-instrument-serif)] text-[38px] leading-none tracking-[-0.02em] lg:text-[46px]">
            Get Event Updates
          </h2>
          <p className="max-w-[480px] text-[16px] leading-[1.6] text-[#a5a094]">
            Stay up to date with our new collections, latest deals and special
            offers! We announce a new collection every week so be sure to stay
            tuned.
          </p>
        </div>
        <form method="POST" className="flex flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="firstName"
              className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#7d766a]"
            >
              First name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First name"
              className="w-full border-0 border-b border-[#565044] bg-transparent py-2.5 font-[family-name:var(--font-ibm-plex-mono)] text-[13px] text-[#f4f1ea] placeholder:text-[#7d766a] outline-none focus-visible:outline-none focus-visible:border-[#f4f1ea]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="emailAddress"
              className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#7d766a]"
            >
              Email address
            </label>
            <input
              type="email"
              name="emailAddress"
              id="emailAddress"
              placeholder="Email address"
              className="w-full border-0 border-b border-[#565044] bg-transparent py-2.5 font-[family-name:var(--font-ibm-plex-mono)] text-[13px] text-[#f4f1ea] placeholder:text-[#7d766a] outline-none focus-visible:outline-none focus-visible:border-[#f4f1ea]"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center bg-[var(--kyx-purple)] px-6 py-4 font-[family-name:var(--font-ibm-plex-mono)] text-[12px] uppercase tracking-[0.08em] text-[#f9f7f2] transition-colors duration-150 hover:bg-[#4f29a6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)]"
          >
            Subscribe Now
          </button>
        </form>
      </section>
    </>
  );
};

export default Page;
