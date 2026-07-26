"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Container, PageHero, Eyebrow, SerifHeading, Button } from "@/app/components/fm";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { src: "/louies/louies1.jpg", alt: "The Louies 2023 Event" },
    { src: "/louies/louies2.jpg", alt: "The Louies 2023 Celebration" },
    { src: "/louies/louies3.jpg", alt: "The Louies 2023 Awards" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
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
    </div>
  );
};

type Award = {
  name: string;
  presentedBy?: string;
  winner?: string;
  nominees: string[];
};

type AwardGroup = {
  eyebrow: string;
  heading: string;
  awards: Award[];
};

const GROUPS: AwardGroup[] = [
  {
    eyebrow: "Founder Awards",
    heading: "The founders.",
    awards: [
      {
        name: "Louisville's Favorite Founder",
        presentedBy: "Dan Ross-Li of KYCombinator",
        winner: "Steven Plappert 🏆",
        nominees: [
          "Steven Plappert",
          "Rachel Edenfield (2x)",
          "Ace McGill",
          "Garrett French (2x)",
          "JK McKnight",
          "Jocari Beattie",
        ],
      },
      {
        name: "Louisville's Favorite Co-Founder",
        presentedBy: "Kevin Gibson of Rise Marketing",
        winner: "Logan Burchett 🏆",
        nominees: [
          "Cherena Fox",
          "Hannah Estes",
          "Logan Burchett",
          "Dan Robbins",
          "Jim Higdon",
        ],
      },
      {
        name: "Louisville's Favorite Community Supporter",
        presentedBy: "Justin Hogan of the Community Foundation",
        winner: "Garrett French 🏆",
        nominees: [
          "Keionna Baker",
          "Garrett French",
          "Greg Langdon",
          "Kevin Gibson (2x)",
          "Gill Holland",
          "Natalia Bishop",
          "Steve Huey",
        ],
      },
      {
        name: "Most Improved Founder",
        presentedBy: "Zeeshan Bhatti of Keyhorse",
        winner: "Aaron Peabody 🏆",
        nominees: [
          "Steven Bonhomme",
          "Aaron Peabody",
          "Charley Miller",
          "Dan Ross-Li",
          "Anora Morton",
        ],
      },
    ],
  },
  {
    eyebrow: "Money Awards",
    heading: "The money.",
    awards: [
      {
        name: "Louisville's Favorite Angel Investor",
        presentedBy: "Rachel Edenfield of Swell",
        winner: "Gill Holland 🏆",
        nominees: ["Garrett French", "Brook Smith", "Greg Langdon", "Gill Holland"],
      },
      {
        name: "Best Fundraise",
        presentedBy: "Kelby Price",
        winner: "LullaFeed 🏆",
        nominees: [
          "SoFab",
          "Swell",
          "Brandjam",
          "Forecastr (2x)",
          "LullaFeed",
          "ValuBuddy",
        ],
      },
    ],
  },
  {
    eyebrow: "Company Awards",
    heading: "The companies.",
    awards: [
      {
        name: "Best Startup Award",
        presentedBy: "Natalia Bishop of Story",
        winner: "RxLightning 🏆",
        nominees: [
          "Swell",
          "ValuBuddy",
          "RxLightning",
          "Forecastr",
          "Elixir Kombucha",
        ],
      },
      {
        name: "MVP Award - Best MVP",
        presentedBy: "Presenter TBA",
        winner: "The Nori Project 🏆",
        nominees: ["Untitled Firm", "Scrub Step", "The Nori Project"],
      },
      {
        name: "SPAM Award - Best E-mail Marketing",
        presentedBy: "Garrett French of Citation Labs",
        winner: "Xena Intelligence 🏆",
        nominees: ["Xena Intelligence", "KYCombinator", "FeedCoyote"],
      },
    ],
  },
  {
    eyebrow: "Closing Awards",
    heading: "The rest.",
    awards: [
      {
        name: "Startups that died in 2024",
        nominees: ["Affinna", "GoWild / Holler Commerce", "WonderPet"],
      },
      {
        name: "Spouse of the Year",
        nominees: [
          "Zach Sensing",
          "Sana Nair",
          "Erik Pina",
          "Ameena Ruffin",
          "Emily Plappert",
          "Moriah Glady",
        ],
      },
    ],
  },
];

export default function Louies2024Page() {
  return (
    <>
      <PageHero
        eyebrow="Louisville Startup Awards"
        title="The Louies 2024."
        intro="Celebrating Louisville's most innovative founders & startups."
      />

      {/* Photo band */}
      <section className="border-b border-[#16130f]">
        <div className="relative h-[240px] w-full bg-[#eae5da] md:h-[340px] lg:h-[420px]">
          <Carousel />
        </div>
      </section>

      {GROUPS.map((group, gi) => (
        <section
          key={group.heading}
          className={"border-b border-[#16130f]" + (gi % 2 === 1 ? " bg-[#eae5da]" : "")}
        >
          <Container className="grid grid-cols-1 gap-8 py-16 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-14 lg:py-[72px]">
            <div className="flex flex-col gap-3">
              <Eyebrow>{group.eyebrow}</Eyebrow>
              <SerifHeading className="text-[32px] leading-none md:text-[40px]">
                {group.heading}
              </SerifHeading>
            </div>
            <div className="flex flex-col">
              {group.awards.map((award, i) => (
                <div
                  key={award.name}
                  className={
                    "grid gap-x-8 gap-y-3 border-t border-[#d8d2c5] py-6 md:grid-cols-[minmax(0,1fr)_240px] " +
                    (i === group.awards.length - 1 ? "border-b" : "")
                  }
                >
                  <div className="flex flex-col gap-2">
                    <h3 className="font-[family-name:var(--font-ibm-plex-sans)] text-[18px] font-medium text-[#16130f]">
                      {award.name}
                    </h3>
                    {award.presentedBy && (
                      <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#7d766a]">
                        Presented by {award.presentedBy}
                      </p>
                    )}
                    {award.winner && (
                      <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--kyx-purple)]">
                        Winner — {award.winner}
                      </p>
                    )}
                  </div>
                  <ul className="flex flex-col gap-1.5">
                    {award.nominees.map((nominee) => (
                      <li
                        key={nominee}
                        className="flex items-start gap-2 text-[14px] leading-[1.5] text-[#57503f]"
                      >
                        <span className="mt-0.5 text-[var(--kyx-purple)]">·</span>
                        <span>{nominee}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Container>
        </section>
      ))}

      {/* Call to Action */}
      <section>
        <Container className="flex flex-col items-start gap-6 py-16 lg:py-20">
          <Eyebrow>Register &amp; vote</Eyebrow>
          <SerifHeading className="text-[32px] leading-none md:text-[40px]">
            Be there.
          </SerifHeading>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="https://lu.ma/fb1728x3" external variant="primary">
              Register now
            </Button>
            <Button
              href="https://kycombinator.typeform.com/votelouies"
              external
              variant="outline"
            >
              Vote now
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
