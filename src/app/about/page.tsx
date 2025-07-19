import React from 'react'

const page = () => {
  return (
      <section id="about" className="py-16 bg-background-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-500 mb-6">
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
              <h3 className="text-xl font-bold text-primary-500 mb-3">
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
                <h3 className="text-xl font-bold text-primary-500 mb-3">
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
                <h3 className="text-xl font-bold text-primary-500 mb-3">
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
  )
}

export default page