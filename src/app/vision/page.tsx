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
    <div className="relative min-h-screen bg-background-900 text-white py-12">
      <div className="container mx-auto px-4">
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