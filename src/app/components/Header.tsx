"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const NAV_LINKS: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/vision", label: "Vision" },
  { href: "/ourtype", label: "Our Type" },
  { href: "/events", label: "Events" },
  { href: "/slack", label: "Slack" },
  { href: "/cinderblock", label: "The Block" },
  { href: "/report", label: "Report" },
  { href: "/faqs", label: "FAQs" },
];

export default function Header({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#0b0b10] text-zinc-300">
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src={`${process.env.NEXT_PUBLIC_CDN_URL}/assets/logo.svg`}
                alt="KYCombinator"
                width={220}
                height={82}
                className="h-12 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-md p-2 text-zinc-300 transition hover:bg-white/[0.04] hover:text-white md:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden flex-1 pl-10 md:flex md:items-center md:justify-start">
            <nav className="flex items-center gap-8 whitespace-nowrap text-[13px] font-medium tracking-wide text-zinc-400">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="relative py-1 transition-colors duration-200 hover:text-white"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="hidden flex-1 justify-end pl-8 md:flex md:items-center">
            {children}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute left-0 right-0 top-16 z-50 border-b border-white/[0.06] bg-[#0b0b10] md:hidden">
            <div className="space-y-0.5 px-4 py-3 text-sm font-medium text-zinc-300">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-md px-3 py-2.5 transition hover:bg-white/[0.04] hover:text-white"
                >
                  {label}
                </Link>
              ))}
              <div className="px-3 pt-2">{children}</div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
