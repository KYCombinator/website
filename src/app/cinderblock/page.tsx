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
      </div>
    </section>
  )
}

export default page