"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
  date: string;
}

// Define type for ember data
interface EmberData {
  id: number;
  x: string;
  y: string;
  scale: number;
  duration: number;
  delay: number;
  color: string;
  opacity: number;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end end"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-fullfont-sans md:px-10" ref={containerRef}>
      <div className=" mx-auto max-w-5xl">
        <h2 className="text-lg font-bold md:text-5xl mb-4 text-black max-w-4xl">
          The Crucible Roadmap
        </h2>
        <p className="text-neutral-500 text-sm md:text-base max-w-sm">
          Founders Aren&apos;t Born They&apos;re Forged.
        </p>
      </div>

      <div ref={ref} className="relative max-w-5xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-36 md:gap-10"
          >
            <div className="flex flex-col md:flex-row z-40 items-center max-w-xs lg:max-w-sm md:w-full">
              <div className="h-8 absolute left-3 md:left-3 w-8 rounded-full bg-neutral-900 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-800 border border-neutral-700 p-2" />
              </div>
              <div className="flex flex-col">
                <h3 className="hidden md:block text-xl md:pl-20 md:text-4xl font-bold text-black">
                  {item.title}
                </h3>
                <p className="hidden md:block text-md md:pl-21 pt-2 md:text-sm font-bold text-neutral-500">
                  {item.date}
                </p>
              </div>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500">
                {item.title}
              </h3>
              <div className="max-w-sm text-neutral-500">{item.content}</div>
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-7 left-8 top-0 overflow-hidden w-[4px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[4px] bg-gradient-to-t from-purple-500 via-purple-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

// Placeholder data for the timeline
const timelineData: TimelineEntry[] = [
  {
    title: "Velocity Start",
    content: (
      <div className="text-md text-neutral-400">
        <p>
          Kick off the Crucible journey with the Velocity Pitch Competition.
          Teams begin a 12-week sprint to validate their ideas, find customers,
          and generate revenue.
        </p>
      </div>
    ),
    date: "Start Date",
  },
  {
    title: "Roadtrip Rally",
    content: (
      <div className="text-md text-neutral-400">
        <p>
          Teams hit the road (metaphorically!) focusing on customer discovery
          and market validation. Intensive mentorship and workshops help refine
          business models.
        </p>
      </div>
    ),
    date: "Date Range",
  },
  {
    title: "Hack Kentucky",
    content: (
      <div className="text-sm text-neutral-400">
        <p>
          A statewide hackathon where Crucible teams can recruit technical
          talent, rapidly prototype solutions, and gain visibility.
        </p>
        <p className="mt-2">
          Focus on building MVPs and technical feasibility.
        </p>
      </div>
    ),
    date: "Date",
  },
  {
    title: "Hell Week",
    content: (
      <div className="text-sm text-neutral-400">
        <p>
          An intense week of challenges, pitch practice, and investor readiness
          preparation. Teams face rigorous scrutiny and feedback.
        </p>
        <p className="mt-2">
          Pushing founders to their limits before the finals.
        </p>
      </div>
    ),
    date: "Date Range",
  },
  {
    title: "Build n' Chill",
    content: (
      <div className="text-sm text-neutral-400">
        <p>
          A period for teams to integrate feedback, refine their
          products/services, and prepare for the final stages. Focus shifts
          towards execution and polish.
        </p>
        <p className="mt-2">Networking and community building emphasis.</p>
      </div>
    ),
    date: "Date Range",
  },
  {
    title: "Velocity Finals",
    content: (
      <div className="text-sm text-neutral-400">
        <p>
          The culmination of the Velocity Pitch Competition. Teams present their
          progress and validated business models to judges and potential
          investors.
        </p>
        <p className="mt-2">Winners are crowned and awarded prizes/funding.</p>
      </div>
    ),
    date: "Date",
  },
];

// Default export component for the page
const CruciblePage = () => {
  // Header props
  const badge = "Founders Aren't Born, They're Forged ";
  const heading = "The Crucible of Excellence";
  const imageSrc = "/crucible/cover2.png";
  const imageAlt = "Crucible event cover photo";

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Lava animation properties
  const lavaInitial = { opacity: 0, scale: 0.5 };
  const lavaAnimate = (delay: number) => ({
    opacity: [0, 1, 0.8, 0],
    scale: [0.5, 1.5, 1.2, 0.5],
    transition: {
      duration: 1.8,
      delay,
      ease: "easeInOut",
      times: [0, 0.2, 0.7, 1],
    },
  });
  const lavaStyle =
    "fixed w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full filter blur-lg z-50 pointer-events-none";

  // Ember Properties
  const numEmbers = 75;
  const emberStyle =
    "fixed rounded-full filter blur-sm z-40 pointer-events-none";

  // Use state for embers and generate them client-side to prevent hydration errors
  const [embers, setEmbers] = useState<EmberData[]>([]);

  useEffect(() => {
    const generateEmbers = (): EmberData[] => {
      return Array.from({ length: numEmbers }).map((_, i) => ({
        id: i,
        x: `${Math.random() * 100}vw`,
        y: `${-5 - Math.random() * 10}vh`,
        scale: 0.2 + Math.random() * 0.6,
        duration: 2 + Math.random() * 3,
        delay: Math.random() * 2,
        color: Math.random() > 0.5 ? "bg-purple-500" : "bg-purple-600",
        opacity: 0.6 + Math.random() * 0.4,
      }));
    };
    setEmbers(generateEmbers());
  }, []); // Empty dependency array ensures this runs only once on the client after mount

  return (
    <div className=" text-white relative overflow-hidden min-h-screen">
      {/* Lava Animations */}
      <motion.div
        className={`${lavaStyle} top-0 left-0`}
        initial={lavaInitial}
        animate={{ ...lavaAnimate(0.1), x: "50vw", y: "50vh" }}
      />
      <motion.div
        className={`${lavaStyle} top-0 right-0`}
        initial={lavaInitial}
        animate={{ ...lavaAnimate(0.3), x: "-50vw", y: "50vh" }}
      />
      <motion.div
        className={`${lavaStyle} bottom-0 left-0`}
        initial={lavaInitial}
        animate={{ ...lavaAnimate(0.5), x: "50vw", y: "-50vh" }}
      />
      <motion.div
        className={`${lavaStyle} bottom-0 right-0`}
        initial={lavaInitial}
        animate={{ ...lavaAnimate(0.7), x: "-50vw", y: "-50vh" }}
      />

      {/* Ember Animations */}
      {embers.map((ember) => (
        <motion.div
          key={ember.id}
          className={`${emberStyle} ${ember.color}`}
          style={{
            width: `${ember.scale * 20}px`,
            height: `${ember.scale * 20}px`,
          }}
          initial={{
            x: ember.x,
            y: ember.y,
            opacity: 0,
            scale: ember.scale,
          }}
          animate={{
            y: "105vh",
            x: `calc(${ember.x} + ${Math.random() * 40 - 20}px)`,
            opacity: [0, ember.opacity, ember.opacity, 0],
            scale: ember.scale * (0.8 + Math.random() * 0.4),
          }}
          transition={{
            duration: ember.duration,
            delay: ember.delay,
            ease: "linear",
            repeat: Infinity,
            repeatDelay: 1 + Math.random() * 2,
          }}
        />
      ))}

      {/* Header Section */}
      <motion.section
        className="pt-20 pb-10 lg:pt-32 lg:pb-16"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <div className="container overflow-hidden mx-auto">
          {/* Centered text content */}
          <div className="mb-10 flex flex-col items-center gap-4 text-center max-w-3xl mx-auto">
            <Badge
              variant="outline"
              className="text-lg text-black border-black mb-8"
            >
              {badge}
            </Badge>
            <h1 className="text-4xl font-semibold lg:text-6xl text-black">
              {heading}
            </h1>
            {/* Descriptive Text Placeholder */}
            <p className="text-lg text-neutral-600 mt-2 max-w-4xl">
              Step into the forge. The Crucible is a high-intensity, real-world
              simulation designed to test your limits, refine your business
              model, and build the resilience needed to lead a thriving startup.
            </p>
            {/* Newsletter Signup Section */}
            <div className="w-3/4 mt-6">
              <a
                href="https://magic.beehiiv.com/v1/04d3dfce-b968-4cc1-8ae5-46d51d19c2b6"
                target="_blank"
                className="inline-flex items-center justify-center px-6 py-4 text-base font-medium text-white transition-all duration-200 bg-black border border-transparent rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-700"
              >
                Get Event Updates
              </a>
            </div>
          </div>

          {/* Image below text content */}
          <div className="relative mx-auto max-w-5xl border-8 border-gray-200 bg-gray-100 rounded-lg shadow-lg overflow-hidden mt-12">
            <motion.img
              src={imageSrc}
              alt={imageAlt}
              className="aspect-video max-h-[800px] w-full object-cover rounded-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            />
          </div>
        </div>
      </motion.section>

      {/* Why Section */}
      <motion.section
        className=" pb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="px-4 mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold md:text-5xl mb-8 text-black text-left">
            Why The Crucible?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-12 items-center">
            {/* Text Content */}
            <div className="text-neutral-600 text-lg md:text-xl space-y-6">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-black mb-3">
                  Forging Resilient Founders
                </h3>
                <p>
                  Building a successful startup is an{" "}
                  <span className="font-semibold">
                    incredibly demanding journey
                  </span>
                  . It requires more than just a good idea; it demands{" "}
                  <span className="font-semibold">resilience</span>,{" "}
                  <span className="font-semibold">adaptability</span>, and{" "}
                  <span className="font-semibold">
                    unwavering determination
                  </span>
                  . The Crucible is meticulously designed to simulate the
                  intense pressures and challenges of the real entrepreneurial
                  world.
                </p>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-black mb-3">
                  Real-World Simulation & Growth
                </h3>
                <p>
                  We provide a structured, high-intensity environment where
                  founders can test their limits, rigorously refine their
                  business models, and ultimately{" "}
                  <span className="font-semibold">
                    forge themselves into capable, decisive leaders
                  </span>
                  . Key benefits include:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-4 pl-4">
                  <li>Intensive mentorship from seasoned entrepreneurs.</li>
                  <li>
                    Hands-on workshops focused on critical business skills.
                  </li>
                  <li>Exposure to potential investors and partners.</li>
                  <li>Opportunities for rapid prototyping and validation.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-black mb-3">
                  Community & Support
                </h3>
                <p>
                  We firmly believe that{" "}
                  <span className="font-semibold">
                    true innovation often arises from adversity
                  </span>
                  . By embracing challenges and learning from failures within a
                  supportive community of peers and mentors, participants emerge{" "}
                  <span className="font-semibold">stronger</span>,{" "}
                  <span className="font-semibold">more focused</span>, and
                  better equipped to navigate the turbulent waters of
                  entrepreneurship. Our program provides the essential
                  resources, guidance, and network needed to transform promising
                  concepts into{" "}
                  <span className="font-semibold">
                    thriving, sustainable businesses
                  </span>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Timeline Section */}
      <div className="bg-gray-200 h-[2px] w-5xl mx-auto mb-20"></div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <Timeline data={timelineData} />
      </motion.div>

      {/* Mailing List Section */}
      <motion.section
        className="py-12 sm:py-16 lg:py-20 xl:py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="px-4 mx-auto max-w-5xl">
          <div className="relative mx-auto overflow-hidden bg-gray-100 max-w-7xl rounded-lg">
            <div className="relative px-8 py-12 md:p-16 xl:p-24">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl font-semibold tracking-tight text-black sm:text-4xl lg:text-5xl">
                  Get Event Updates
                </h2>
                <p className="mt-4 text-base font-normal leading-7 text-neutral-500 lg:text-lg lg:mt-6 lg:leading-8">
                  Stay up to date with our new collections, latest deals and
                  special offers! We announce a new collection every week so be
                  sure to stay tuned.
                </p>
              </div>

              <form
                method="POST"
                className="flex flex-col max-w-3xl mx-auto mt-12 space-y-4 xl:mt-16 md:flex-row md:space-y-0 md:space-x-4"
              >
                <div className="flex-1">
                  <label htmlFor="firstName" className="sr-only">
                    {" "}
                    First name{" "}
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="First name"
                    className="block w-full px-4 py-4 text-base font-normal text-black placeholder-black bg-transparent border border-black rounded-sm focus:ring-1 focus:ring-black focus:bg-black/10 focus:outline-none"
                  />
                </div>

                <div className="flex-1">
                  <label htmlFor="emailAddress" className="sr-only">
                    {" "}
                    Email address{" "}
                  </label>
                  <input
                    type="email"
                    name="emailAddress"
                    id="emailAddress"
                    placeholder="Email address"
                    className="block w-full px-4 py-4 text-base font-normal text-black placeholder-black bg-transparent border border-black rounded-sm focus:ring-1 focus:ring-black focus:bg-black/10 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-10 py-4 text-base font-medium text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 focus:ring-offset-blue-600"
                >
                  Subscribe Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default CruciblePage;
