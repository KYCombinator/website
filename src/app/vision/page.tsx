// This file defines the Vision page for the KYX website.
// It lays out the mission, goals, metrics, and underlying philosophy
// behind KYX and its focus on creating a vibrant startup ecosystem in Kentucky.

import VisionHero from "./VisionHero";
import MetricSection from "./MetricSection";
import WhyStartupsSection from "./WhyStartupsSection";
import OutcomeSection from "./OutcomeSection";
import StrategySection from "./StrategySection";
import NeedsSection from "./NeedsSection";
import ProgrammingSection from "./ProgrammingSection";
import InvolvementSection from "./InvolvementSection";
import SummarySection from "./SummarySection";

export default function VisionPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0b0b10] py-12 text-zinc-100 md:py-16">
      {/* very subtle top wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_55%)]"
      />
      {/* subtle grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]"
      />

      <div className="container relative z-10 mx-auto max-w-5xl px-4">
        <VisionHero />
        <MetricSection />
        <WhyStartupsSection />
        <OutcomeSection />
        <StrategySection />
        <NeedsSection />
        <ProgrammingSection />
        <InvolvementSection />
        <SummarySection />
      </div>
    </div>
  );
}
