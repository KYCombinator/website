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
                <Link href="https://kycombinator.beehiiv.com/" className="text-gray-400 hover:text-white transition">
                  Blog
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
            <iframe 
              src="https://embeds.beehiiv.com/618e6261-6b72-4d51-95d9-821977f9f63e?slim=true" 
              data-test-id="beehiiv-embed" 
              height="52" 
              style={{ margin: 0, borderRadius: 0, backgroundColor: 'transparent' }}
            />
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2025 KYCombinator. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition">
              Terms of Service
            </Link>
            <Link href="/waiver" className="text-gray-400 hover:text-white transition">
              Waiver
            </Link>
            <Link href="/rules" className="text-gray-400 hover:text-white transition">
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
} 