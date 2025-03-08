import Link from "next/link"

export default function Footer() {
  return (
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
                <Link href="/" className="text-gray-400 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-gray-400 hover:text-white transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="#is-for-you" className="text-gray-400 hover:text-white transition">
                  Is It For You?
                </Link>
              </li>
              <li>
                <Link href="#faqs" className="text-gray-400 hover:text-white transition">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 uppercase text-sm tracking-wider">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#events" className="text-gray-400 hover:text-white transition">
                  Events
                </Link>
              </li>
              <li>
                <Link href="#resources" className="text-gray-400 hover:text-white transition">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/assets" className="text-gray-400 hover:text-white transition">
                  Assets
                </Link>
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
          <p className="text-gray-400 text-sm">© 2025 KYCombinator. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" className="text-gray-400 hover:text-white transition">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition">
              Terms of Service
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
} 