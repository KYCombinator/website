import { ArrowRight, Calendar, Slack, Mail } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-purple-700">KYCombinator</h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#about" className="text-gray-700 hover:text-purple-700 font-medium">
              About
            </a>
            <a href="#is-for-you" className="text-gray-700 hover:text-purple-700 font-medium">
              Is It For You?
            </a>
            <a href="#faqs" className="text-gray-700 hover:text-purple-700 font-medium">
              FAQs
            </a>
            <a href="#events" className="text-gray-700 hover:text-purple-700 font-medium">
              Events
            </a>
            <a href="#resources" className="text-gray-700 hover:text-purple-700 font-medium">
              Resources
            </a>
          </nav>
          <button className="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800 transition">
            Join Now
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-5xl md:text-7xl font-bold text-purple-700">KYCombinator</h2>
            <div className="bg-white p-6 rounded-lg mb-6">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Community Driven Accountability</h3>
              <p className="text-gray-600 text-lg md:text-xl">
                Join a network of like-minded individuals committed to personal growth and mutual support.
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <Link 
                href="https://magic.beehiiv.com/v1/04d3dfce-b968-4cc1-8ae5-46d51d19c2b6"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-700 text-white px-8 py-4 rounded-md hover:bg-purple-800 transition flex items-center text-lg"
              >
                <Mail className="w-5 h-5 mr-2" />
                <span>Subscribe to Newsletter</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                href="https://join.slack.com/t/kycombinator/shared_invite/zt-2tneu9hc6-Dx1ttf~_75rQHOb8NHXXkQ"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#4A154B] text-white px-8 py-4 rounded-md hover:bg-[#611f64] transition flex items-center text-lg"
              >
                <Slack className="w-5 h-5 mr-2" />
                <span>Join Slack Community</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="absolute bottom-10 left-0 right-0 flex justify-center">
            <Link href="#is-for-you" className="text-purple-700 animate-bounce">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Quote Section 1 */}
      <section className="bg-purple-700 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <blockquote className="text-2xl md:text-3xl italic font-light">
            &quot;The strength of our community comes from the commitment of each individual to support and challenge one another.&quot;
          </blockquote>
          <p className="mt-4 font-semibold">— KYCombinator Founder</p>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-700 mb-4">Upcoming Events</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Join us for exciting events, workshops, and meetups. Connect with fellow entrepreneurs and creators.
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <a 
              href="https://lu.ma/kycombinator"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-700 text-white px-6 py-3 rounded-md hover:bg-purple-800 transition flex items-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              <span>View All Events</span>
            </a>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
            <iframe
              src="https://lu.ma/embed/calendar/cal-kycombinator/upcoming"
              width="100%"
              height="600"
              frameBorder="0"
              style={{ borderRadius: '8px' }}
              title="KYCombinator Events Calendar"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faqs" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-purple-700">FAQs</h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-gray-800">How does KYCombinator work?</h3>
              <p className="text-gray-600">
                we&apos;re a self-organizing community.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-gray-800">Do I need to be experienced?</h3>
              <p className="text-gray-600">
                come with a willingness to learn and grow.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-gray-800">How much does it cost?</h3>
              <p className="text-gray-600">
                just time and effort.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-gray-800">Can I create my own community?</h3>
              <p className="text-gray-600">
                yes
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <button className="bg-purple-700 text-white px-6 py-3 rounded-md hover:bg-purple-800 transition">
              View All FAQs
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-purple-400">KYCombinator</h3>
              <p className="text-gray-400">Building stronger communities through accountability and mutual support.</p>
            </div>

            <div>
              <h4 className="font-bold mb-4 uppercase text-sm tracking-wider">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-gray-400 hover:text-white transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#is-for-you" className="text-gray-400 hover:text-white transition">
                    Is It For You?
                  </a>
                </li>
                <li>
                  <a href="#faqs" className="text-gray-400 hover:text-white transition">
                    FAQs
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 uppercase text-sm tracking-wider">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#events" className="text-gray-400 hover:text-white transition">
                    Events
                  </a>
                </li>
                <li>
                  <a href="#resources" className="text-gray-400 hover:text-white transition">
                    Resources
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    Support
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 uppercase text-sm tracking-wider">Connect</h4>
              <p className="text-gray-400 mb-4">Join our newsletter to stay updated on events and resources.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 p-2 bg-gray-800 border border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-700 text-white"
                />
                <button className="bg-purple-700 text-white p-2 rounded-r-md hover:bg-purple-600 transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 KYCombinator. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

