import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Velocity Competition Information | KYC",
  description:
    "Detailed information about the Velocity Pitch Competition - including overview, requirements, and sample roadmaps for startups.",
};

export default function VelocityInfo() {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Velocity Competition Details
            </h2>

            <div className="space-y-8">
              <div className="bg-[#6B46C1]/5 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#6B46C1] mb-4">
                  Overview
                </h3>
                <div className="space-y-4 text-gray-600">
                  <p>
                    <strong>Who:</strong> Idea or seed-stage startups ready to
                    move <strong>FAST.</strong>
                  </p>
                  <p>
                    <strong>What:</strong> Show Don&apos;t Tell.
                  </p>
                  <p>
                    <strong>How:</strong> 5 startups compete against each other
                    to see who can move the furthest from their starting point
                    in a 12-week velocity competition.
                  </p>
                  <p>
                    <strong>Entry:</strong> Pitch Day - Startups compete for one
                    of 5 spots in the Velocity competition by presenting a
                    doable 12-week roadmap to validate and accelerate their
                    business. Judges select the most promising roadmaps to move
                    forward.
                  </p>
                  <p>
                    <strong>When:</strong> April 29th is Pitch Day. Friday July
                    25th is Demo Day.
                  </p>
                  <p>
                    <strong>Support:</strong> Startups receive{" "}
                    <strong>weekly funding drops</strong> based on progress
                    toward their roadmap goals
                  </p>
                  <hr />
                  <h3 className="text-xl font-semibold text-[#6B46C1] mb-4">
                    Pitch Day
                  </h3>
                  <p>
                    <strong>12-Week Roadmap Requirements</strong>
                  </p>
                  <p>Startups should demonstrate:</p>
                  <ul>
                    <li>
                      Weekly milestones covering customer discovery,
                      prototyping, validation, growth, and revenue
                    </li>
                    <li>
                      Strategic use of resources aligned with funding and goals
                    </li>
                    <li>
                      Must have a path to both{" "}
                      <em>
                        <strong>customers</strong>
                      </em>{" "}
                      and{" "}
                      <em>
                        <strong>revenue</strong>
                      </em>{" "}
                      within 12 weeks. Be ambitious. Your competition is.
                    </li>
                  </ul>
                  <hr />

                  <h3 className="text-xl font-semibold text-[#6B46C1] mb-4">
                    Roadmap Samples
                  </h3>

                  <div className="space-y-12">
                    <div>
                      <h4>
                        1. B2B Software Company - Idea Stage (Productivity tool
                        for HR managers)
                      </h4>
                      <p>
                        <strong>12-week Customer Goal:</strong> 10 Customers
                      </p>
                      <p>
                        <strong>12-week Revenue Goal:</strong> $1000 MRR
                      </p>
                      <ul>
                        <li>
                          <strong>Week 1:</strong> Interview 25 HR managers to
                          validate pain points
                        </li>
                        <li>
                          <strong>Week 2:</strong> Build clickable prototype and
                          test with 10 users
                        </li>
                        <li>
                          <strong>Week 3:</strong> Incorporate feedback into
                          prototype and launch early access waitlist
                        </li>
                        <li>
                          <strong>Week 4:</strong> Evangelize prototype and
                          reach out to 50 new HR managers on Linkedin (continue
                          50/week each week hereafter)
                        </li>
                        <li>
                          <strong>Week 5:</strong> Build MVP with 2 core
                          features
                        </li>
                        <li>
                          <strong>Week 6:</strong> Invite 5 early testers from
                          waitlist
                        </li>
                        <li>
                          <strong>Week 7:</strong> Setup Mailmerge and reach out
                          to 1000 web scraped HR leads
                        </li>
                        <li>
                          <strong>Week 8:</strong> Iterate MVP and implement
                          user onboarding
                        </li>
                        <li>
                          <strong>Week 9:</strong> Launch pilot with 3 paying
                          businesses
                        </li>
                        <li>
                          <strong>Week 10:</strong> Reach $500 MRR
                        </li>
                        <li>
                          <strong>Week 11:</strong> Close & onboard 3 more
                          business customers
                        </li>
                        <li>
                          <strong>Week 12:</strong> Close & onboard 4 more
                          business customers
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4>
                        2. B2C Software Company - Idea Stage (Habit Tracking
                        App)
                      </h4>
                      <p>
                        <strong>12-week Customer Goal:</strong> 500 Downloads
                      </p>
                      <p>
                        <strong>12-week Revenue Goal:</strong> $50 MRR
                      </p>
                      <ul>
                        <li>
                          <strong>Week 1:</strong> Interview 50 people with
                          habit-building goals to validate demand
                        </li>
                        <li>
                          <strong>Week 2:</strong> Build clickable prototype and
                          test with 10 users
                        </li>
                        <li>
                          <strong>Week 3:</strong> Incorporate feedback and
                          build MVP with 1 habit module
                        </li>
                        <li>
                          <strong>Week 4:</strong> Launch beta sign-up landing
                          page and begin social outreach
                        </li>
                        <li>
                          <strong>Week 5:</strong> Add 2 more habit modules and
                          a leaderboard
                        </li>
                        <li>
                          <strong>Week 6:</strong> Launch beta with 25 early
                          testers
                        </li>
                        <li>
                          <strong>Week 7:</strong> Launch app on TestFlight and
                          Google Play Beta
                        </li>
                        <li>
                          <strong>Week 8:</strong> 75 new beta testers
                        </li>
                        <li>
                          <strong>Week 9:</strong> Introduce paid tier and begin
                          upsell tests in beta group
                        </li>
                        <li>
                          <strong>Week 10:</strong> Reach $500 MRR from paid
                          users
                        </li>
                        <li>
                          <strong>Week 11:</strong> Launch referral program and
                          email onboarding flows
                        </li>
                        <li>
                          <strong>Week 12:</strong> Reach 1000 total downloads
                          and $1000 MRR
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4>3. B2C Hardware Company (Ergonomic kitchen tool)</h4>
                      <p>
                        <strong>12-week Customer Goal:</strong> 50 Pre-Orders
                      </p>
                      <p>
                        <strong>12-week Revenue Goal:</strong> $2500 in
                        Pre-Order Sales
                      </p>
                      <ul>
                        <li>
                          <strong>Week 1:</strong> Interview 30 home cooks and
                          chefs to validate concept
                        </li>
                        <li>
                          <strong>Week 2:</strong> Create 3 CAD design options
                          for feedback
                        </li>
                        <li>
                          <strong>Week 3:</strong> 3D print and test first
                          prototype version
                        </li>
                        <li>
                          <strong>Week 4:</strong> Run feedback sessions and
                          revise design
                        </li>
                        <li>
                          <strong>Week 5:</strong> Finalize prototype and print
                          10 units for user testing
                        </li>
                        <li>
                          <strong>Week 6:</strong> Launch pre-order landing page
                          and start email capture
                        </li>
                        <li>
                          <strong>Week 7:</strong> Film demo video and launch
                          influencer outreach
                        </li>
                        <li>
                          <strong>Week 8:</strong> Secure 25 pre-orders via
                          Instagram + newsletter push
                        </li>
                        <li>
                          <strong>Week 9:</strong> Partner with 2 local kitchen
                          stores for limited trials
                        </li>
                        <li>
                          <strong>Week 10:</strong> Reach $1500 in pre-order
                          revenue
                        </li>
                        <li>
                          <strong>Week 11:</strong> Secure 25 more pre-orders
                          via pop-ups and email
                        </li>
                        <li>
                          <strong>Week 12:</strong> Reach 50 total pre-orders
                          and $2500 in revenue
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4>4. CPG Company (Adaptogenic wellness beverage)</h4>
                      <p>
                        <strong>12-week Customer Goal:</strong> 250 Units Sold
                      </p>
                      <p>
                        <strong>12-week Revenue Goal:</strong> $2500 in Sales
                      </p>
                      <ul>
                        <li>
                          <strong>Week 1:</strong> Interview 20 health-conscious
                          consumers to validate product idea
                        </li>
                        <li>
                          <strong>Week 2:</strong> Develop 3 test flavor
                          formulas and source sample ingredients
                        </li>
                        <li>
                          <strong>Week 3:</strong> Conduct taste test with 25
                          people and gather feedback
                        </li>
                        <li>
                          <strong>Week 4:</strong> Iterate and conduct broader
                          taste test in shelf-stable formula with 50 people
                        </li>
                        <li>
                          <strong>Week 5:</strong> Decide on flavors. Design
                          label and packaging with compliance in mind
                        </li>
                        <li>
                          <strong>Week 6:</strong> Source packaging and finalize
                          costs
                        </li>
                        <li>
                          <strong>Week 7:</strong> Launch pre-order website with
                          lifestyle content
                        </li>
                        <li>
                          <strong>Week 8:</strong> Drive first 100 pre-orders
                          via IG/influencer marketing
                        </li>
                        <li>
                          <strong>Week 9:</strong> Sell 50 more units through
                          pop-up sampling events
                        </li>
                        <li>
                          <strong>Week 10:</strong> Reach $1500 in revenue and
                          150 units sold
                        </li>
                        <li>
                          <strong>Week 11:</strong> Launch DTC ad campaign and
                          email marketing
                        </li>
                        <li>
                          <strong>Week 12:</strong> Reach 250 total units sold
                          and $2500 in revenue
                        </li>
                      </ul>
                    </div>
                  </div>

                  <hr />
                  <h3 className="text-xl font-semibold text-[#6B46C1] mb-4">
                    Winning
                  </h3>
                  <p>
                    The startup that&apos;s come the farthest from their
                    starting line wins. Be prepared to show evidence of
                    learning, traction, iteration, and momentum.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
