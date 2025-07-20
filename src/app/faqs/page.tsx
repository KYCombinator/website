import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: "FAQs",
  description: "Frequently asked questions about KYX and our approach.",
  authors: [{ name: "KYX Team", url: "https://kycombinator.com/faqs" }],
  openGraph: {
    images: [`${process.env.NEXT_PUBLIC_CDN_URL}/assets/logo.png`],
  },
  icons: {
    icon: `${process.env.NEXT_PUBLIC_CDN_URL}/assets/logo.png`,
  },
}

const page = () => {
  return (
    <section id="faqs" className="py-16 bg-background-900 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-500 mb-6">
            FAQs
          </h2>
          <p className="text-foreground-800 text-lg mb-8">
            Common questions about KYX and how we&apos;re building Louisville&apos;s startup ecosystem.
          </p>
        </div>

        <div className="max-w-3xl mx-auto text-center mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-500 mb-6">
            How KYX Works
          </h2>
          <div className="text-left space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-primary-500 mb-2">What is KYX?</h3>
              <p className="text-foreground-800">
                KYX is a concentrated effort to build Louisville&apos;s startup ecosystem by focusing on high-agency founders and builders. We&apos;re not a traditional accelerator—we&apos;re building toward a venture studio model.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary-500 mb-2">How do I get involved?</h3>
              <p className="text-foreground-800">
                Show up to our events, build something impressive, and demonstrate high-agency execution. We&apos;re looking for people who are already shipping products and acquiring customers.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary-500 mb-2">What&apos;s Cinderblock?</h3>
              <p className="text-foreground-800">
                Cinderblock is our initial prototype for building toward a Brickyard-style venture studio. It&apos;s a selective, execution-focused program for the most dedicated founders.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary-500 mb-2">Do I need funding to participate?</h3>
              <p className="text-foreground-800">
                No. We&apos;re focused on execution and traction, not funding stage. Whether you&apos;re bootstrapped or funded, what matters is that you&apos;re building and growing.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto text-center mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-500 mb-6">
            Our Approach
          </h2>
          <div className="text-left space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-primary-500 mb-2">Why focus on concentration?</h3>
              <p className="text-foreground-800">
                Louisville has limited resources and talent. By concentrating our efforts on the most promising founders, we can create outsized impact and build a critical mass of successful companies.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary-500 mb-2">What makes KYX different?</h3>
              <p className="text-foreground-800">
                We&apos;re execution-focused, not networking-focused. No panels or generic events—just building, shipping, and growing. We&apos;re building toward a venture studio model with aligned incentives.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary-500 mb-2">How do you measure success?</h3>
              <p className="text-foreground-800">
                We measure success by the number of Series A ready companies created in Louisville. Our goal is to systematically identify and accelerate the best local founders.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto text-center mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-500 mb-6">
            Organization
          </h2>
          <div className="text-left space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-primary-500 mb-2">Legal Status</h3>
              <p className="text-foreground-800">
                We&apos;re a pending 501c3 nonprofit organization, focused on building Louisville&apos;s startup ecosystem through education, community building, and direct support for founders.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary-500 mb-2">Location</h3>
              <p className="text-foreground-800">
                Based in Louisville, Kentucky. We&apos;re committed to building the local ecosystem and creating opportunities for founders and builders in our community.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary-500 mb-2">Mission Alignment</h3>
              <p className="text-foreground-800">
                As a 501c3, our focus is on founders learning, growing, and building successful companies.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto text-center mt-16">
          <div className="bg-background-800 p-6 rounded-lg mb-8">
            <p className="text-foreground-800 text-lg">
              Have more questions? Show up to our events and ask them in person. We&apos;re building this together.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default page