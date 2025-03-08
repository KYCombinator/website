import Link from "next/link"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-purple-700">KYCombinator</h1>
        </div>
        <nav className="hidden md:flex space-x-8">
          <Link href="#about" className="text-gray-700 hover:text-purple-700 font-medium">
            About
          </Link>
          <Link href="#is-for-you" className="text-gray-700 hover:text-purple-700 font-medium">
            Is It For You?
          </Link>
          <Link href="#faqs" className="text-gray-700 hover:text-purple-700 font-medium">
            FAQs
          </Link>
          <Link href="#events" className="text-gray-700 hover:text-purple-700 font-medium">
            Events
          </Link>
          <Link href="#resources" className="text-gray-700 hover:text-purple-700 font-medium">
            Resources
          </Link>
        </nav>
        <button className="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800 transition">
          Join Now
        </button>
      </div>
    </header>
  )
} 