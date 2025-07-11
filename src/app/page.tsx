import { Calendar, Slack, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-white">
        <div className="container mx-auto px-4 text-center pb-15 pt-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-6 rounded-lg">
              <Image
                src="/assets/Purple.png"
                alt="KYX"
                width={360}
                height={123}
                className="mx-auto w-auto h-[200px]"
                priority
              />
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
                Building Kentucky
              </h3>
            </div>
            <div className="bg-white p-6 rounded-lg mb-6">
              <p className="text-gray-600 text-lg md:text-xl mb-4">
                We&apos;re creating the highest density of ambitious,
                high-velocity founders and builders in Kentucky.
              </p>
              <p className="text-gray-600 text-lg md:text-xl mb-8">
                Join a community of action-takers who move fast, build things,
                and support each other&apos;s growth.
              </p>
              <Link
                href="/velocity"
                className="inline-flex items-center gap-2 bg-[#6B46C1] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#5B3AA8] transition"
              >
                Join the Velocity Pitch Competition
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="flex flex-col gap-4 justify-center items-center">
              <iframe
                src="https://embeds.beehiiv.com/618e6261-6b72-4d51-95d9-821977f9f63e?slim=true"
                data-test-id="beehiiv-embed"
                height="52"
                style={{
                  margin: 0,
                  borderRadius: 0,
                  backgroundColor: "transparent",
                }}
              />
              <div className="flex-col gap-4">
                <p className="text-lg font-semibold mb-4">Find Us Here</p>
                <div className="flex gap-4 justify-center">
                  <Link
                    href="https://join.slack.com/t/kycombinator/shared_invite/zt-2viueybdu-QNv80gAKk~sJZ9paWebGVQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary-500 text-white p-3 rounded-md hover-primary-700 transition"
                  >
                    <Slack className="w-6 h-6" />
                  </Link>
                  <Link
                    href="https://github.com/KYCombinator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#24292e] text-white p-3 rounded-md hover:bg-[#2f363d] transition"
                  >
                    <svg
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </Link>
                  <Link
                    href="https://www.linkedin.com/company/kycombinator/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#0A66C2] text-white p-3 rounded-md hover:bg-[#004182] transition"
                  >
                    <svg
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </Link>
                  <Link
                    href="https://x.com/ky_exe_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black text-white p-3 rounded-md hover:bg-gray-900 transition"
                  >
                    <svg
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-2 left-0 right-0 flex justify-center">
            <Link href="#is-for-you" className="text-[#6B46C1] animate-bounce">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Quote Section 1 */}
      <section className="bg-[#6B46C1] text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <blockquote className="text-2xl md:text-3xl italic font-light">
            We are the doers, the builders, the ones who execute with relentless
            intensity.
          </blockquote>
          <p className="mt-4 font-semibold">— KYC Principle</p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#6B46C1] mb-6">
              About
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              KYC is flat. There is no hierarchy. Anyone can drive an event.
            </p>
            <p className="text-gray-600 text-lg mb-8">
              Our Mission: Build density of high-agency high-velocity founders &
              builders in Kentucky.
            </p>
            <div className="bg-purple-50 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-bold text-[#6B46C1] mb-3">
                HAVES (High-Agency Violent Execution Stallions)
              </h3>
              <p className="text-gray-600">
                We are the doers, the builders, the ones who execute with
                relentless intensity. HAVES don&apos;t wait for permission -
                they take action, move fast, and create impact. If you&apos;re
                ready to build at high velocity and push the boundaries of
                what&apos;s possible in Kentucky, you&apos;re one of us.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-[#6B46C1] mb-3">
                  How We Do It
                </h3>
                <ul className="text-left text-gray-600 space-y-3">
                  <li>• Show up that way ourselves</li>
                  <li>
                    • Reward the right behaviors through awards, hackathons,
                    founder velocity competitions
                  </li>
                  <li>• Incentivize in-person connection & coworking</li>
                  <li>
                    • Make a spectacle of all of the above to drive money and
                    talent here to fuel the founders & builders
                  </li>
                </ul>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-[#6B46C1] mb-3">
                  What You Get
                </h3>
                <ul className="text-left text-gray-600 space-y-3">
                  <li>• A community of high-agency builders and founders</li>
                  <li>• Regular events, hackathons, and competitions</li>
                  <li>• Opportunities to showcase your work</li>
                  <li>• Access to local talent and resources</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section 1 */}
      <section className="bg-[#6B46C1] text-white py-12">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            What we do different at KYC
          </h2>
          <div className="gap-2 text-left p-6 rounded-lg">
            <div>
              <h3 className="text-2xl font-semibold mb-2">1) DO</h3>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">
                2) Improve and Repeat 1
              </h3>
            </div>
          </div>
          <div>
            <h3 className="text-xl italic mb-2">You need to be in the arena</h3>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#6B46C1] mb-4">
              Upcoming Events
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Events are open to all. We encourage you to show up. Vote with
              your feet.
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <Link
              href="https://lu.ma/kycombinator"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#6B46C1] text-white px-6 py-3 rounded-md hover:bg-[#5B3AA8] transition flex items-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              <span>View All Events</span>
            </Link>
          </div>

          <div className="bg-black rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
            <iframe
              src="https://lu.ma/embed/calendar/cal-gyukdJFBvrxa0BO/events"
              width="100%"
              height="100%"
              className="min-h-[450px] w-full"
              allowFullScreen={true}
              aria-hidden="false"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faqs" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#6B46C1]">
            FAQs
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                How does KYC work?
              </h3>
              <p className="text-gray-600">
                we&apos;re a self-organizing community.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                Do I need to be experienced?
              </h3>
              <p className="text-gray-600">
                No, come with a willingness to learn and grow.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                How much does it cost?
              </h3>
              <p className="text-gray-600">just time and effort.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                Can I create my own community?
              </h3>
              <p className="text-gray-600">yes</p>
            </div>
          </div>

          <div className="text-center mt-10">
            <button className="bg-[#6B46C1] text-white px-6 py-3 rounded-md hover:bg-[#5B3AA8] transition">
              View All FAQs
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}