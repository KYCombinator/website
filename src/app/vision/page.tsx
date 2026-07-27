// This file defines the Vision page for the KYX website.
// It lays out the mission, goals, metrics, and underlying philosophy
// behind KYX and its focus on creating a vibrant startup ecosystem in Kentucky.

import VisionHero from "./VisionHero";
import MetricSection from "./MetricSection";
import WhyStartupsSection from "./WhyStartupsSection";
import OutcomeSection from "./OutcomeSection";
import StrategySection from "./StrategySection";
import NeedsSection from "./NeedsSection";
import InvolvementSection from "./InvolvementSection";
import SummarySection from "./SummarySection";

export default function VisionPage() {
  return (
    <>
      <VisionHero />
      <MetricSection />
      <WhyStartupsSection />
      <OutcomeSection />
      <StrategySection />
      <NeedsSection />
      <InvolvementSection />
      <SummarySection />
    </>
  );
}
