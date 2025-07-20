import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: "About KYX",
  description: "Our Vision and Mission. Problem & Opportunity. Team.",
  authors: [{ name: "KYX Team", url: "https://kycombinator.com/about" }],
  openGraph: {
    images: [`${process.env.NEXT_PUBLIC_CDN_URL}/assets/logo.png`],
  },
  icons: {
    icon: `${process.env.NEXT_PUBLIC_CDN_URL}/assets/logo.png`,
  },
}

const page = () => {
  return (
      <section id="about" className="py-16 bg-background-900 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-500 mb-6">
              About
            </h2>
            <p className="text-foreground-800 text-lg mb-8">
              Vision: Louisville competes on a national stage by concentrating ambition and work ethic.
            </p>
            <p className="text-foreground-800 text-lg mb-8">
              Mission: Attract, retain, and grow Louisville&apos;s top builders—tilting the odds for the ambitious few willing to out‑work and out‑execute—to forge a critical mass of Series A ready companies in Louisville.
            </p>
          </div>

          <div className="max-w-3xl mx-auto text-center mt-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-500 mb-6">
              Problem & Opportunity
            </h2>
            <div className="text-left space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-primary-500 mb-2">Talent leakage</h3>
                <p className="text-foreground-800">
                  High‑agency founders leave for Austin, Nashville, SF.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-500 mb-2">Series A drought</h3>
                <p className="text-foreground-800">
                  Less than 1 local tech companies raise a Series A every 5 years, while peer cities field x that number (need to check this stat - cant remember).
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-500 mb-2">Resource dilution</h3>
                <p className="text-foreground-800">
                  Existing programs are spread thin across broad audiences. We&apos;re doing a great job supporting more idea and pre-seed stage companies, but few are making it through the trough of sorrow to solid traction and wins on the other side.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-500 mb-2">KYX opportunity</h3>
                <p className="text-foreground-800">
                  Concentrate capital, connections, and peer pressure on the most dedicated founders who are most likely to move through the trough and go on to create outsized jobs, revenue, and exits.
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto text-center mt-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-500 mb-6">
              Team
            </h2>
            <div className="text-left space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-primary-500 mb-2">Dan Ross‑Li, Cofounder</h3>
                <p className="text-foreground-800">
                  Louisville transplant, father of two, and local founder with 8 years in YC-backed startups and Bay Area high-growth tech companies; previously a high-frequency trader in Chicago, he holds an MBA from Chicago Booth and a BA in Economics from Yale. He is known amongst friends as Erlich.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-500 mb-2">Rachel Edenfield, Cofounder</h3>
                <p className="text-foreground-800">
                  Louisville transplant and founder of Swell Health; a former social worker who built and sold her first company before 23. Now channels 11 years of high-growth tech experience—half during Lyft&apos;s hyper-growth years—into scaling startups and strengthening the founder community. Her call sign at KYX is OKR.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-500 mb-2">Jack Crowdis — Cofounder</h3>
                <p className="text-foreground-800">
                  Louisville native. Cofounder @ Honeysuckle Labs (ad‑tech automation). Head Growth @ PayFWDs ($4.5 M ARR), former sales at Reelio (acq.). He is known amongst KYX as Conky.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-500 mb-2">Zeeshan Bhatti — Operations & Community</h3>
                <p className="text-foreground-800">
                  Operator & ecosystem connector (bio TBD)
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
  )
}

export default page