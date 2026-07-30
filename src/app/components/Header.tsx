"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { APPLY_URL, HEADER_NAV } from "../site";
import AccountMenu, { type Account } from "./AccountMenu";

const LOGO = `${process.env.NEXT_PUBLIC_CDN_URL}/assets/logo.svg`;

function ApplyButton() {
  return (
    <Link
      href={APPLY_URL}
      className="inline-flex items-center bg-[#16130f] px-4 py-2.5 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#f4f1ea] transition-colors duration-150 hover:bg-[#2c2820] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)]"
    >
      Apply
    </Link>
  );
}

function LoginLink({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/login"
      onClick={onClick}
      className="font-[family-name:var(--font-ibm-plex-sans)] text-[13px] text-[#7d766a] transition-opacity duration-150 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)]"
    >
      Login
    </Link>
  );
}

export default function Header({
  account,
  showApply,
}: {
  account: Account | null;
  showApply: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#16130f] bg-[#f4f1ea]">
      <div className="mx-auto flex max-w-[1120px] items-center justify-between px-5 py-4 md:px-7 md:py-5 lg:px-10">
        {/* Logo + wordmark */}
        <Link href="/" className="flex items-baseline gap-2.5" aria-label="KYCombinator home">
          <Image
            src={LOGO}
            alt="KYCombinator"
            width={54}
            height={27}
            priority
            className="block h-[27px] w-auto self-start [filter:brightness(0)]"
          />
          <span className="hidden font-[family-name:var(--font-ibm-plex-mono)] text-[10px] tracking-[0.1em] text-[#7d766a] sm:inline">
            EST. LOUISVILLE
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 font-[family-name:var(--font-ibm-plex-sans)] text-[14px] text-[#3e3930] lg:flex">
          {HEADER_NAV.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="transition-opacity duration-150 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)]"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop right cluster: account (menu / login) + Apply */}
        <div className="hidden items-center gap-5 lg:flex">
          {account ? <AccountMenu account={account} /> : <LoginLink />}
          {showApply && <ApplyButton />}
        </div>

        {/* Mobile cluster */}
        <div className="flex items-center gap-3 lg:hidden">
          {account && <AccountMenu account={account} />}
          {showApply && <ApplyButton />}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-11 w-11 items-center justify-center text-[#16130f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)]"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="mx-auto max-w-[1120px] border-t border-[#d8d2c5] bg-[#f4f1ea] px-5 py-2 md:px-7 lg:hidden">
          {HEADER_NAV.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="flex min-h-[44px] items-center font-[family-name:var(--font-ibm-plex-sans)] text-[15px] text-[#3e3930] transition-opacity duration-150 hover:opacity-70"
            >
              {label}
            </Link>
          ))}
          {!account && (
            <div className="flex min-h-[44px] items-center">
              <LoginLink onClick={() => setOpen(false)} />
            </div>
          )}
        </nav>
      )}
    </header>
  );
}
