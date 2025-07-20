"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Header({children}: {children: React.ReactNode}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-background-900 border-b border-background-800 sticky w-full top-0 z-50 text-foreground-700">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src={`${process.env.NEXT_PUBLIC_CDN_URL}/assets/logo.png`}
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
          <div className="hidden md:flex md:items-center md:justify-start flex-1 pl-8">
            <nav className="flex items-center gap-8 text-foreground-700 font-medium text-base whitespace-nowrap">
              <Link
                href="/"
                className="hover:text-white"
              >
                home
              </Link>
              <Link
                href="/about"
                className="hover:text-white"
              >
                about
              </Link>
              <Link
                href="/faqs"
                className="hover:text-white"
              >
                faqs
              </Link>
              <Link
                href="/ourtype"
                className="hover:text-white"
              >
                our type
              </Link>
              <Link
                href="/events"
                className="hover:text-white"
              >
                events
              </Link>
              <Link
                href="/cinderblock"
                className="hover:text-white"
              >
                the block
              </Link>
              <Link
                href="/report"
                className="hover:text-white"
              >
                report
              </Link>
              
            </nav>
          </div>
          <div className="hidden md:flex md:items-center md:justify-end flex-1 pl-8">
            {children}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b z-50">
            <div className="px-4 py-3 space-y-2 font-medium text-base text-foreground-700">
              <Link
                href="/"
                className="block px-3 py-2  hover:text-purple-700"
              >
                home
              </Link>
              <Link
                href="/#about"
                className="block px-3 py-2  hover:text-purple-700"
              >
                about
              </Link>
              <Link
                href="/#faqs"
                className="block px-3 py-2 hover:text-purple-700"
              >
                faqs
              </Link>
              <Link
                href="/type"
                className="block px-3 py-2 hover:text-purple-700"
              >
                our type
              </Link>
              <Link
                href="/#events"
                className="block px-3 py-2 hover:text-purple-700"
              >
                events
              </Link>
              <Link
                href="/cinderblock"
                className="block px-3 py-2 hover:text-purple-700"
              >
                the block
              </Link>
              <Link
                href="/report"
                className="block px-3 py-2 hover:text-purple-700"
              >
                report
              </Link>
              {children}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
