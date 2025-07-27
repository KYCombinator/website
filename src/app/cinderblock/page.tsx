import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: "Cinderblock",
  description: "Cinderblock is our initial prototype for building toward a Brickyard-style venture studio.",
  authors: [{ name: "KYX Team", url: "https://kycombinator.com/cinderblock" }],
  openGraph: {
    images: [`${process.env.NEXT_PUBLIC_CDN_URL}/assets/Blockhead.png`],
  },
  icons: {
    icon: `${process.env.NEXT_PUBLIC_CDN_URL}/assets/Blockhead.png`,
  },
}

const page = () => {
  return (
    <section id="cinderblock" className="py-16 bg-background-900 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-500 mb-6">
            Cinderblock
          </h2>
          <p className="text-foreground-800 text-lg mb-8">
            Cinderblock is our initial prototype for building toward a Brickyard-style venture studio.
          </p>
        </div>

        <div className="max-w-3xl mx-auto text-center mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-500 mb-6">
            Core Framework
          </h2>
          <div className="text-left space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-primary-500 mb-2">Selective Environment</h3>
              <p className="text-foreground-800">
                Bringing together high-agency, ambitious builders and founders. Small group, intentionally curated.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary-500 mb-2">Execution-Focused</h3>
              <p className="text-foreground-800">
                No panels or generic networking. The priority is on building — shipping products, acquiring customers, iterating quickly.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary-500 mb-2">Embedded Accountability</h3>
              <p className="text-foreground-800">
                Regular checkpoints, shared workspaces, and transparent metrics. Progress is visible and measured.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary-500 mb-2">Alignment with Venture Studio Principles</h3>
              <p className="text-foreground-800">
                Concentrated support and shared incentives. Not a wide portfolio spread thin — targeted resources for a small number of teams.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto text-center mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-500 mb-6">
            Learning Ground for a Future Studio
          </h2>
          <p className="text-foreground-800 text-lg mb-8">
            Testing what operational structures, mentorship, and investment mechanics work best in this market. Goal is to refine before scaling into a full venture studio model.
          </p>
        </div>

        <div className="max-w-3xl mx-auto text-center mt-16">
          <div className="bg-background-800 p-6 rounded-lg mb-8">
            <p className="text-foreground-800 text-lg">
              Cinderblock is how we validate our thesis on concentration and aligned incentives — in a controlled, focused setting. It&apos;s the groundwork for systematically identifying and accelerating the best local founders.
            </p>
          </div>
        </div>

        <section id="community-guidelines" className="max-w-3xl mx-auto mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-500 mb-6 text-center">
            Community Guidelines
          </h2>
          <div className="text-left space-y-6">
            <p className="text-foreground-800 text-lg">
              Welcome to Cinderblock. This space exists to help you build faster, think sharper, and go further—with others who are doing the same. To keep the atmosphere focused, intense, and collaborative, we expect all members to operate under the following principles:
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-primary-500 mb-2">1. Own Your Work</h3>
                <p className="text-foreground-800">
                  This space is a forge—not a daycare. You&apos;re here to build. Be accountable for your time, your energy, and your presence. Clean up after yourself. Show up prepared. Don&apos;t waste anyone&apos;s momentum.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary-500 mb-2">2. Respect the Grind</h3>
                <p className="text-foreground-800">
                  Everyone here is under pressure—pushing through unknowns, solving real problems. Respect the effort. Noise, distractions, and ego kill velocity. Keep calls in designated areas. Don&apos;t interrupt deep work. Don&apos;t pitch unsolicited.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary-500 mb-2">3. Default to Contribution</h3>
                <p className="text-foreground-800">
                  This isn&apos;t a services marketplace. Give before you ask. If you see someone stuck, offer help. If you&apos;ve shipped something useful, share it. Your signal-to-noise ratio determines how valuable you are to the room.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary-500 mb-2">4. No Tourists</h3>
                <p className="text-foreground-800">
                  This isn&apos;t a hangout for &quot;networkers&quot; or &quot;idea guys.&quot; If you&apos;re not actively building or enabling others who are, this isn&apos;t the place for you. No clout-chasing. No empty posturing. Execution earns respect.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary-500 mb-2">5. Zero Tolerance for Bullshit</h3>
                <p className="text-foreground-800">
                  We do not tolerate harassment, discrimination, or exploitation—period.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary-500 mb-2">6. Confidentiality is Default</h3>
                <p className="text-foreground-800">
                  What happens in Cinderblock stays in Cinderblock. Don&apos;t share others&apos; work, strategies, or data without explicit permission. We&apos;re not in the business of leaking decks or ideas.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary-500 mb-2">7. Leave It Better</h3>
                <p className="text-foreground-800">
                  Whether it&apos;s the space, the culture, or the conversation—leave it stronger than you found it. That&apos;s how we build something lasting.
                </p>
              </div>
            </div>

            <div className="bg-background-800 p-6 rounded-lg mt-8">
              <p className="text-foreground-800 font-semibold">
                <strong>Violations of these guidelines may result in suspension or termination of your membership.</strong> This is a space for serious builders. If that&apos;s you—you&apos;re in the right place.
              </p>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}

export default page