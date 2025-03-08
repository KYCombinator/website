import Link from "next/link"
import Image from "next/image"

export default function Header() {
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image 
                src="/assets/Purple.png"
                alt="KYCombinator"
                width={240}
                height={82}
                className="h-16 w-auto"
                priority
              />
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="#about" className="text-gray-700 hover:text-purple-700 font-medium">
              About
            </Link>
            <Link href="#faqs" className="text-gray-700 hover:text-purple-700 font-medium">
              FAQs
            </Link>
            <Link href="#events" className="text-gray-700 hover:text-purple-700 font-medium">
              Events
            </Link>
          </nav>
          <Link 
            href="https://join.slack.com/t/kycombinator/shared_invite/zt-2tneu9hc6-Dx1ttf~_75rQHOb8NHXXkQ"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800 transition"
          >
            Join Now
          </Link>
        </div>
      </div>
    </header>
  )
} 