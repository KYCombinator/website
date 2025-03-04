import Image from "next/image"
import { ArrowRight, Calendar, FileText, MapPin, Users } from "lucide-react"

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
            <div className="bg-white p-6 rounded-lg shadow-md mb-6 border-l-4 border-purple-700">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Community Driven Accountability</h3>
              <p className="text-gray-600 text-lg md:text-xl">
                Join a network of like-minded individuals committed to personal growth and mutual support.
              </p>
            </div>
            <button className="bg-purple-700 text-white px-8 py-4 rounded-md hover:bg-purple-800 transition flex items-center mx-auto text-lg">
              <span>Call to Action</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>

          <div className="absolute bottom-10 left-0 right-0 flex justify-center">
            <a href="#is-for-you" className="text-purple-700 animate-bounce">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Quote Section 1 */}
      <section className="bg-purple-700 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <blockquote className="text-2xl md:text-3xl italic font-light">
            "The strength of our community comes from the commitment of each individual to support and challenge one
            another."
          </blockquote>
          <p className="mt-4 font-semibold">— KYCombinator Founder</p>
        </div>
      </section>

      {/* Is KYCombinator for you? */}
      <section id="is-for-you" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-purple-700">Is KYCombinator for you?</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md transition hover:shadow-lg">
              <Image
                src="/placeholder.svg?height=300&width=400"
                alt="Beginners welcome"
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">New to fitness?</h3>
                <p className="text-gray-600">
                  Our community welcomes beginners with open arms. Start your journey with supportive guidance.
                </p>
                <a href="#" className="mt-4 inline-block text-purple-700 font-medium hover:underline">
                  Learn more →
                </a>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md transition hover:shadow-lg">
              <Image
                src="/placeholder.svg?height=300&width=400"
                alt="Experienced athletes"
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">Experienced athlete?</h3>
                <p className="text-gray-600">
                  Push your limits with advanced programs and connect with others at your level.
                </p>
                <a href="#" className="mt-4 inline-block text-purple-700 font-medium hover:underline">
                  Learn more →
                </a>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md transition hover:shadow-lg">
              <Image
                src="/placeholder.svg?height=300&width=400"
                alt="Community focused"
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">Looking for community?</h3>
                <p className="text-gray-600">
                  Find your tribe of accountability partners who share your values and goals.
                </p>
                <a href="#" className="mt-4 inline-block text-purple-700 font-medium hover:underline">
                  Learn more →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-purple-700">About</h2>

          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Our Mission</h3>
              <p className="text-gray-600 mb-4">
                KYCombinator was founded on the principle that accountability through community creates lasting change.
                We believe that when people come together with shared goals, they can achieve more than they ever could
                alone.
              </p>
              <p className="text-gray-600 mb-4">
                Our platform connects individuals seeking personal growth with communities that provide support,
                challenge, and accountability.
              </p>
              <div className="flex items-center space-x-4 mt-6">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-purple-700 mr-2" />
                  <span className="font-medium">5,000+ Members</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-purple-700 mr-2" />
                  <span className="font-medium">200+ Locations</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section 2 */}
      <section className="bg-purple-700 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <blockquote className="text-2xl md:text-3xl italic font-light">
            "Joining KYCombinator changed my life. The accountability and support from my community helped me achieve
            goals I never thought possible."
          </blockquote>
          <p className="mt-4 font-semibold">— Sarah K., Member since 2022</p>
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
                We connect you with a community of like-minded individuals who share your goals. Through regular
                check-ins, group activities, and shared metrics, you'll stay accountable to your commitments.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-gray-800">Do I need to be experienced?</h3>
              <p className="text-gray-600">
                Not at all! We welcome members at all levels. Our communities are designed to support everyone from
                beginners to advanced practitioners.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-gray-800">How much does it cost?</h3>
              <p className="text-gray-600">
                We offer various membership tiers starting at $29/month. Each tier provides different levels of access
                to communities, resources, and coaching.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-gray-800">Can I create my own community?</h3>
              <p className="text-gray-600">
                After being an active member for 3 months, you can apply to become a community leader and create your
                own accountability group.
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

      {/* Events Section */}
      <section id="events" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-purple-700">Events</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-md transition hover:shadow-lg">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Calendar className="h-5 w-5 text-purple-700 mr-2" />
                  <span className="text-gray-500">June 15, 2024</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Community Challenge Kickoff</h3>
                <p className="text-gray-600 mb-4">
                  Join us for the launch of our summer fitness challenge. Set goals, meet your accountability partners,
                  and prepare for transformation.
                </p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-gray-500">Virtual & In-Person</span>
                  <button className="text-purple-700 font-medium hover:underline">Register →</button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md transition hover:shadow-lg">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Calendar className="h-5 w-5 text-purple-700 mr-2" />
                  <span className="text-gray-500">July 8, 2024</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Leadership Workshop</h3>
                <p className="text-gray-600 mb-4">
                  Learn how to effectively lead an accountability group and help others achieve their goals through
                  community support.
                </p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-gray-500">Virtual Only</span>
                  <button className="text-purple-700 font-medium hover:underline">Register →</button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md transition hover:shadow-lg">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Calendar className="h-5 w-5 text-purple-700 mr-2" />
                  <span className="text-gray-500">August 22, 2024</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Annual KYCombinator Summit</h3>
                <p className="text-gray-600 mb-4">
                  Our flagship event bringing together community leaders and members from around the world for learning,
                  networking, and celebration.
                </p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-gray-500">San Francisco, CA</span>
                  <button className="text-purple-700 font-medium hover:underline">Register →</button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <button className="bg-purple-700 text-white px-6 py-3 rounded-md hover:bg-purple-800 transition">
              View All Events
            </button>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-purple-700">Resources</h2>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <FileText className="h-10 w-10 text-purple-700 mb-4" />
              <h3 className="text-lg font-bold mb-2 text-gray-800">Getting Started Guide</h3>
              <p className="text-gray-600 text-sm mb-4">
                Everything you need to know to begin your KYCombinator journey.
              </p>
              <a href="#" className="mt-auto text-purple-700 font-medium hover:underline">
                Download PDF
              </a>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <FileText className="h-10 w-10 text-purple-700 mb-4" />
              <h3 className="text-lg font-bold mb-2 text-gray-800">Community Leader Handbook</h3>
              <p className="text-gray-600 text-sm mb-4">
                Learn how to effectively lead and grow your accountability community.
              </p>
              <a href="#" className="mt-auto text-purple-700 font-medium hover:underline">
                Download PDF
              </a>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <FileText className="h-10 w-10 text-purple-700 mb-4" />
              <h3 className="text-lg font-bold mb-2 text-gray-800">Goal Setting Workbook</h3>
              <p className="text-gray-600 text-sm mb-4">
                Templates and exercises to help you set meaningful, achievable goals.
              </p>
              <a href="#" className="mt-auto text-purple-700 font-medium hover:underline">
                Download PDF
              </a>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <FileText className="h-10 w-10 text-purple-700 mb-4" />
              <h3 className="text-lg font-bold mb-2 text-gray-800">Accountability Tracker</h3>
              <p className="text-gray-600 text-sm mb-4">
                Tools to measure your progress and stay committed to your goals.
              </p>
              <a href="#" className="mt-auto text-purple-700 font-medium hover:underline">
                Download PDF
              </a>
            </div>
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

