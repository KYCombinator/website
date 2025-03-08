import { ArrowRight, Calendar, Slack, Mail } from "lucide-react"
import Link from "next/link"
import Header from "./components/Header"
import Footer from "./components/Footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-6 rounded-lg">
              <h2 className="text-5xl md:text-7xl font-bold text-purple-700">KYCombinator</h2>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800">Building Kentucky</h3>
            </div>
            <div className="bg-white p-6 rounded-lg mb-6">
              <p className="text-gray-600 text-lg md:text-xl mb-4">
                We&apos;re creating the highest density of ambitious, high-velocity founders and builders in Kentucky.
              </p>
              <p className="text-gray-600 text-lg md:text-xl">
                Join a community of action-takers who move fast, build things, and support each other&apos;s growth.
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
            <Link
              href="https://lu.ma/kycombinator"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-700 text-white px-6 py-3 rounded-md hover:bg-purple-800 transition flex items-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              <span>View All Events</span>
            </Link>
          </div>

          <div className="bg-black rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
            <iframe
              src="https://lu.ma/embed/calendar/cal-gyukdJFBvrxa0BO/events"
              width="100%"
              height="100%"
              className="min-h-[450px] w-full"
              allowFullScreen={true}
              aria-hidden="false"
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

      <Footer />
    </div>
  )
}

