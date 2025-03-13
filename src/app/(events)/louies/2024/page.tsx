export default function Louies2024Page() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-[65vh] bg-[#6B46C1]">
        {/* Hero section for 2024 */}
        <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              The Louies 2024
            </h1>
            {/* Add 2024 specific content */}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Awards and Nominees</h2>
          
          {/* Founder Awards */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-purple-700 mb-8">Founder Awards</h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Louisville's Favorite Founder */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-2">Louisville&apos;s Favorite Founder</h4>
                <p className="text-sm text-gray-600 italic mb-4">Presented by Dan Ross-Li of KYCombinator</p>
                <div className="mb-4">
                  <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Winner: Steven Plappert 🏆
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-2 opacity-75">
                  <li>Steven Plappert</li>
                  <li>Rachel Edenfield (2x)</li>
                  <li>Ace McGill</li>
                  <li>Garrett French (2x)</li>
                  <li>JK McKnight</li>
                  <li>Jocari Beattie</li>
                </ul>
              </div>

              {/* Louisville's Favorite Co-Founder */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-2">Louisville&apos;s Favorite Co-Founder</h4>
                <p className="text-sm text-gray-600 italic mb-4">Presented by Kevin Gibson of Rise Marketing</p>
                <div className="mb-4">
                  <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Winner: Logan Burchett 🏆
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-2 opacity-75">
                  <li>Cherena Fox</li>
                  <li>Hannah Estes</li>
                  <li>Logan Burchett</li>
                  <li>Dan Robbins</li>
                  <li>Jim Higdon</li>
                </ul>
              </div>

              {/* Louisville's Favorite Community Supporter */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-2">Louisville&apos;s Favorite Community Supporter</h4>
                <p className="text-sm text-gray-600 italic mb-4">Presented by Justin Hogan of the Community Foundation</p>
                <div className="mb-4">
                  <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Winner: Garrett French 🏆
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-2 opacity-75">
                  <li>Keionna Baker</li>
                  <li>Garrett French</li>
                  <li>Greg Langdon</li>
                  <li>Kevin Gibson (2x)</li>
                  <li>Gill Holland</li>
                  <li>Natalia Bishop</li>
                  <li>Steve Huey</li>
                </ul>
              </div>

              {/* Most Improved Founder */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-2">Most Improved Founder</h4>
                <p className="text-sm text-gray-600 italic mb-4">Presented by Zeeshan Bhatti of Keyhorse</p>
                <div className="mb-4">
                  <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Winner: Aaron Peabody 🏆
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-2 opacity-75">
                  <li>Steven Bonhomme</li>
                  <li>Aaron Peabody</li>
                  <li>Charley Miller</li>
                  <li>Dan Ross-Li</li>
                  <li>Anora Morton</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Money Awards */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-purple-700 mb-8">Money Awards</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Louisville's Favorite Angel Investor */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-2">Louisville&apos;s Favorite Angel Investor</h4>
                <p className="text-sm text-gray-600 italic mb-4">Presented by Rachel Edenfield of Swell</p>
                <div className="mb-4">
                  <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Winner: Gill Holland 🏆
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-2 opacity-75">
                  <li>Garrett French</li>
                  <li>Brook Smith</li>
                  <li>Greg Langdon</li>
                  <li>Gill Holland</li>
                </ul>
              </div>

              {/* Best Fundraise */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-2">Best Fundraise</h4>
                <p className="text-sm text-gray-600 italic mb-4">Presented by Kelby Price</p>
                <div className="mb-4">
                  <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Winner: LullaFeed 🏆
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-2 opacity-75">
                  <li>SoFab</li>
                  <li>Swell</li>
                  <li>Brandjam</li>
                  <li>Forecastr (2x)</li>
                  <li>LullaFeed</li>
                  <li>ValuBuddy</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Company Awards */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-purple-700 mb-8">Company Awards</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Best Startup Award */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-2">Best Startup Award</h4>
                <p className="text-sm text-gray-600 italic mb-4">Presented by Natalia Bishop of Story</p>
                <div className="mb-4">
                  <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Winner: RxLightning 🏆
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-2 opacity-75">
                  <li>Swell</li>
                  <li>ValuBuddy</li>
                  <li>RxLightning</li>
                  <li>Forecastr</li>
                  <li>Elixir Kombucha</li>
                </ul>
              </div>

              {/* MVP Award */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-2">MVP Award - Best MVP</h4>
                <p className="text-sm text-gray-600 italic mb-4">Presenter TBA</p>
                <div className="mb-4">
                  <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Winner: The Nori Project 🏆
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-2 opacity-75">
                  <li>Untitled Firm</li>
                  <li>Scrub Step</li>
                  <li>The Nori Project</li>
                </ul>
              </div>

              {/* SPAM Award */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-2">SPAM Award - Best E-mail Marketing</h4>
                <p className="text-sm text-gray-600 italic mb-4">Presented by Garrett French of Citation Labs</p>
                <div className="mb-4">
                  <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Winner: Xena Intelligence 🏆
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-2 opacity-75">
                  <li>Xena Intelligence</li>
                  <li>KYCombinator</li>
                  <li>FeedCoyote</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Closing Awards */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-purple-700 mb-8">Closing Awards</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Startups that died in 2024 */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-2">Startups that died in 2024</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>Affinna</li>
                  <li>GoWild / Holler Commerce</li>
                  <li>WonderPet</li>
                </ul>
              </div>

              {/* Spouse of the Year */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-2">Spouse of the Year</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>Zach Sensing</li>
                  <li>Sana Nair</li>
                  <li>Erik Pina</li>
                  <li>Ameena Ruffin</li>
                  <li>Emily Plappert</li>
                  <li>Moriah Glady</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-6">Register & Vote</h3>
            <div className="space-y-4">
              <a 
                href="https://lu.ma/fb1728x3" 
                className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition mr-4"
              >
                Register Now
              </a>
              <a 
                href="https://kycombinator.typeform.com/votelouies" 
                className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition"
              >
                Vote Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 