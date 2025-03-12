'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export const metadata = {
  title: 'Velocity Pitch Competition | KY Combinator',
  description: 'Join the Velocity Pitch Competition - a 12-week startup competition in Louisville showcasing high-growth potential startups. Register to attend or apply to pitch your startup.',
  openGraph: {
    title: 'Velocity Pitch Competition | KY Combinator',
    description: 'Join the Velocity Pitch Competition - a 12-week startup competition in Louisville showcasing high-growth potential startups. Register to attend or apply to pitch your startup.',
    images: ['/velocity/real1.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Velocity Pitch Competition | KY Combinator',
    description: 'Join the Velocity Pitch Competition - a 12-week startup competition in Louisville showcasing high-growth potential startups. Register to attend or apply to pitch your startup.',
    images: ['/velocity/real1.png'],
  }
};


const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    { src: '/velocity/real1.png', alt: 'Velocity 1' },
    { src: '/velocity/real2.png', alt: 'Velocity 2' },
    { src: '/velocity/real3.png', alt: 'Velocity 3' },
    { src: '/velocity/real4.png', alt: 'Velocity 4' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full">
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          className="absolute inset-0 w-full h-full transition-opacity duration-1000"
          style={{
            opacity: currentSlide === index ? 1 : 0,
            zIndex: currentSlide === index ? 2 : 1,
          }}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover"
            priority
          />
        </div>
      ))}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              currentSlide === index ? 'bg-white w-4' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-[#6B46C1]/60 z-10" />
    </div>
  );
};

export default function VelocityPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[65vh] bg-[#6B46C1]">
        <div className="absolute inset-0 w-full h-full">
          <Carousel />
        </div>
        <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Velocity Pitch Competition
            </h1>
            <p className="text-xl text-white/90 mb-4">
              April 29, 2025 - A 12-week sprint to unicorn speed
            </p>
            <p className="text-lg text-white/90 mb-8">
              Back a Stallion: $500-$1000 bets on Kentucky&apos;s most ambitious founders
            </p>
            <div className="space-x-4">
              <Link
                href="https://lu.ma/vr9guh5n"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#6B46C1] text-white border-2 border-white px-8 py-3 rounded-md font-semibold hover:bg-[#6B46C1]/80 transition"
              >
                Register to Attend
              </Link>
              <Link
                href="https://kycombinator.typeform.com/velocity"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-[#6B46C1] px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 transition"
              >
                Apply To Pitch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What Is It</h2>
            <div className="space-y-6 text-lg text-gray-600">
              <p>
                The Velocity Pitch Competition is a 12-week competition where every team must get to customers and revenue. On May 1st, contestants pitch their ideas and their 12-week roadmap. We select 5 teams/founders to back, prioritizing roadmap ambition over idea quality.
              </p>
              
              <div className="bg-[#6B46C1]/5 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#6B46C1] mb-4">What You Get</h3>
                <ul className="space-y-3">
                  <li>• A seat in the founders room with mentors (including Dan and others)</li>
                  <li>• Weekly accountability and mentorship to execute against your roadmap</li>
                  <li>• Starting budget of $500</li>
                  <li>• Weekly funding based on execution:
                    <ul className="ml-6 mt-2 space-y-1">
                      <li>• First 2 weeks: $50/week</li>
                      <li>• Next 3 weeks: $75/week</li>
                      <li>• Next 4 weeks: $100/week</li>
                      <li>• Last 3 weeks: $250/week</li>
                    </ul>
                  </li>
                  <li>• Weekly stack ranking based on velocity</li>
                  <li>• Winning team receives $10K MFN investment and investor intros</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-[#6B46C1] mb-3">Short-term Goal</h3>
                <p className="text-gray-600">Show early founders what unicorn speed looks like (both within the competition and the broader community of founders who are watching).</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-[#6B46C1] mb-3">Mid-term Goal</h3>
                <p className="text-gray-600">Create population density of high-performing founders.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-[#6B46C1] mb-3">Long-term Goal</h3>
                <p className="text-gray-600">Make Louisville the Bay Area of the Midwest by launching unicorn after unicorn until the short and mid-term goals are being hit on autopilot. It&apos;s a flywheel for founder innovation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Section */}
      <section id="apply" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Apply Now</h2>
            <div className="bg-white shadow-lg rounded-lg p-8 border border-gray-200">
              <p className="text-lg text-gray-600 mb-6">
                Applications are now open for the Velocity Pitch Competition. Submit your application to be considered for this exciting opportunity.
              </p>
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Key Dates:</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>April 29, 2024 - Competition Kickoff</li>
                  <li>May 1st, 2024 - Initial Pitch Day</li>
                  <li>12-week competition period</li>
                </ul>
              </div>
              <div className="space-x-4">
                <Link
                  href="https://lu.ma/vr9guh5n"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#6B46C1] text-white border-2 border-white px-8 py-3 rounded-md font-semibold hover:bg-[#6B46C1]/80 transition"
                >
                  Register to Attend
                </Link>
                <Link
                  href="https://kycombinator.typeform.com/velocity"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-[#6B46C1] px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 transition"
                >
                  Apply To Pitch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 