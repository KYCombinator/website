import Image from "next/image";
import EventBanner from "./components/EventBanner";
import VelocityHero from "./components/VelocityHero";
import LouiesHero from "./components/LouiesHero";
import CTASection from "./components/CTASection";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background-900 text-white">
      <EventBanner />
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center bg-gradient-to-br from-background-800/30 to-background-900/30 backdrop-blur-md text-white py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-600/10 via-gray-600/10 to-zinc-600/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8">
            <Image
              src={`${process.env.NEXT_PUBLIC_CDN_URL}/assets/logo.svg`}
              alt="KYX"
              width={360}
              height={123}
              className="mx-auto w-auto h-auto max-h-[200px] md:max-h-[280px] drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]"
              priority
            />
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-white via-slate-100 to-gray-100 bg-clip-text text-transparent">
            Louisville, KY
          </h3>
          <p className="text-lg md:text-xl text-gray-300 text-center mt-6 leading-relaxed max-w-2xl mx-auto">
            Building Kentucky into a regional startup powerhouse where ambitious founders can
            start, scale, and stay.
          </p>
        </div>
      </section>

      {/* Events Section */}
      <section className="relative bg-background-900">
        {/* Events Header */}
        <div className="relative py-16 md:py-20">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-orange-600/10" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="relative bg-gradient-to-br from-background-800/50 to-background-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto mb-12">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-1 w-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                <span className="text-sm font-semibold text-purple-400 uppercase tracking-wider">
                  Join Us
                </span>
                <div className="h-1 w-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full" />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 text-center">
                Upcoming Events
              </h2>
              <div className="text-center space-y-3">
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  <span className="font-semibold text-white">December 4th, 2025</span>
                </p>
                <p className="text-base md:text-lg text-gray-400">
                  <span className="text-purple-400 font-semibold">5:00 PM</span> Networking •{" "}
                  <span className="text-purple-400 font-semibold">5:45 PM</span> Velocity •{" "}
                  <span className="text-purple-400 font-semibold">6:30 PM</span> The LOUIES
                </p>
                <p className="text-base md:text-lg text-gray-400">
                  @ Solyco Capital, 111 West Main Street, Louisville, KY
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Velocity Section */}
        <div className="relative">
          <VelocityHero />
        </div>

        {/* The LOUIES Section */}
        <div className="relative">
          <LouiesHero />
        </div>
      </section>

      {/* Call to Action Section */}
      <CTASection />
    </div>
  );
}