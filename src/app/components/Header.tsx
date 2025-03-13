"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b fixed w-full top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image 
                src="/assets/Purple.png"
                alt="KYCombinator"
                width={220}
                height={82}
                className="h-14 w-auto"
                priority
              />
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:justify-end flex-1 pl-8">
            <nav className="flex items-center space-x-6">
              <Link href="/#about" className="text-gray-700 hover:text-purple-700 font-medium text-base">
                About
              </Link>
              <Link href="/#faqs" className="text-gray-700 hover:text-purple-700 font-medium text-base">
                FAQs
              </Link>
              <Link href="/#events" className="text-gray-700 hover:text-purple-700 font-medium text-base">
                Events
              </Link>
              <Link href="https://www.hackkentucky.com" className="text-gray-700 hover:text-purple-700 font-medium text-base">
                HackKentucky
              </Link>
              <Link href="/reports" className="text-gray-700 hover:text-purple-700 font-medium text-base">
                Reports
              </Link>
              <Link 
                href="https://join.slack.com/t/kycombinator/shared_invite/zt-2viueybdu-QNv80gAKk~sJZ9paWebGVQ"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#6B46C1] text-white px-7 py-1.5 rounded text-base font-medium hover:bg-[#5B3AA8] transition"
              >
                Join Now
              </Link>
            </nav>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b z-50">
            <div className="px-4 py-3 space-y-2">
              <Link href="/#about" className="block px-3 py-2 text-gray-700 hover:text-purple-700 font-medium text-base">
                About
              </Link>
              <Link href="/#faqs" className="block px-3 py-2 text-gray-700 hover:text-purple-700 font-medium text-base">
                FAQs
              </Link>
              <Link href="/#events" className="block px-3 py-2 text-gray-700 hover:text-purple-700 font-medium text-base">
                Events
              </Link>
              <Link href="https://www.hackkentucky.com" className="block px-3 py-2 text-gray-700 hover:text-purple-700 font-medium text-base">
                HackKentucky
              </Link>
              <Link href="/reports" className="block px-3 py-2 text-gray-700 hover:text-purple-700 font-medium text-base">
                Reports
              </Link>
              <Link 
                href="https://join.slack.com/t/kycombinator/shared_invite/zt-2tneu9hc6-Dx1ttf~_75rQHOb8NHXXkQ"
                target="_blank"
                rel="noopener noreferrer"
                className="block mx-3 mt-3 bg-[#6B46C1] text-white py-2 rounded text-base font-medium text-center hover:bg-[#5B3AA8] transition"
              >
                Join Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
} 