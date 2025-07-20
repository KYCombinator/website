import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: "Our Type",
  description: "Who we're looking for at KYX - high-agency builders and founders.",
  authors: [{ name: "KYX Team", url: "https://kycombinator.com/ourtype" }],
  openGraph: {
    images: [`${process.env.NEXT_PUBLIC_CDN_URL}/assets/logo.png`],
  },
  icons: {
    icon: `${process.env.NEXT_PUBLIC_CDN_URL}/assets/logo.png`,
  },
}

const page = () => {
  return (
    <section id="ourtype" className="py-16 bg-background-900 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-500 mb-6">
            Our Type
          </h2>
          <p className="text-foreground-800 text-lg mb-8">
            We&apos;re looking for high-agency builders and founders who are ready to execute at high velocity.
          </p>
          <p className="text-foreground-800 italic">
            High Agency
          </p>
          <p className="text-foreground-800 italic">
            Surplus Value
          </p>
          <p className="text-foreground-800 italic">
            Work Ethic
          </p>
          <p className="text-foreground-800 italic">
            In-Person
          </p>
          <p className="text-foreground-800 italic">
            Heads Down
          </p>
          <p className="text-foreground-800 italic">
            Hungry
          </p>
          <p className="text-foreground-800 italic">
            Execution
          </p>
        </div>

        <div className="max-w-3xl mx-auto text-center mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-500 mb-6">
            Who We&apos;re Looking For
          </h2>
          <div className="text-left space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-primary-500 mb-2">High-Agency</h3>
              <p className="text-foreground-800">
                Take action. No permission needed.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary-500 mb-2">Surplus Value</h3>
              <p className="text-foreground-800">
                You provide surplus value to the community. Give more than you take.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary-500 mb-2">Trust</h3>
              <p className="text-foreground-800">
                You do what you say you'll do. You keep your word.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary-500 mb-2">Local Commitment</h3>
              <p className="text-foreground-800">
                You&apos;re committed to building in Louisville and growing the local ecosystem.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto text-center mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-500 mb-6">
            What We&apos;re Not Looking For
          </h2>
          <div className="text-left space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-primary-500 mb-2">Ideas</h3>
              <p className="text-foreground-800">
                We&apos;re not looking for people who just want to talk about ideas.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary-500 mb-2">Passive Participants</h3>
              <p className="text-foreground-800">
                This isn&apos;t a networking group. 
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary-500 mb-2">The Gallery</h3>
              <p className="text-foreground-800">
                Comments from the gallery are not welcome.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto text-center mt-16">
          <div className="bg-background-800 p-6 rounded-lg mb-8">
            <p className="text-foreground-800 text-lg">
              If this sounds like you, we want to meet you. Show up to our events, build something impressive, and let&apos;s create the future of Louisville&apos;s startup ecosystem together.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default page