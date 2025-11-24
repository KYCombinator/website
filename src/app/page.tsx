import Image from "next/image";
import EventBanner from "./components/EventBanner";
import VelocityHero from "./components/VelocityHero";
import LouiesHero from "./components/LouiesHero";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background-900 text-white">
      <EventBanner />
      {/* Hero Section */}
      <section className="relative min-h-[500px] flex items-center justify-center bg-background-900 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 text-center flex flex-col items-center justify-center">
          <div className="mb-6">
            <Image
              src={`${process.env.NEXT_PUBLIC_CDN_URL}/assets/logo.svg`}
              alt="KYX"
              width={360}
              height={123}
              className="mx-auto w-auto h-auto max-h-[200px] md:max-h-[250px]"
              priority
            />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground-900">
            Louisville, KY
          </h3>
        </div>
      </section>

      {/* Upcoming Events Section Header */}
      <section className="relative bg-background-900 py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
            Upcoming Events
          </h2>
          <p className="text-lg md:text-xl text-white/80">
            December 4th @ Solyco Capital 5pm - 7:30pm
          </p>
        </div>
      </section>

      {/* Velocity Section */}
      <VelocityHero />

      {/* The LOUIES Section */}
      <LouiesHero />
    </div>
  );
}