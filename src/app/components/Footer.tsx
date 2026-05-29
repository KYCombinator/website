import Link from "next/link";
import Image from "next/image";

type FooterLink = { href: string; label: string; external?: boolean };

const QUICK_LINKS: FooterLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/vision", label: "Vision" },
  { href: "/ourtype", label: "Is It For You?" },
  { href: "/faqs", label: "FAQs" },
];

const RESOURCE_LINKS: FooterLink[] = [
  { href: "/events", label: "Events" },
  { href: "/slack", label: "Slack" },
  { href: "https://www.hackkentucky.com", label: "HackKentucky", external: true },
  { href: "https://kycombinator.beehiiv.com/", label: "Blog", external: true },
  { href: "/assets", label: "Assets" },
  { href: "/report", label: "Reports" },
];

const LEGAL_LINKS: FooterLink[] = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/waiver", label: "Waiver" },
];

function FooterLinkItem({ href, label, external }: FooterLink) {
  return (
    <li>
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="text-zinc-400 transition-colors duration-200 hover:text-white"
      >
        {label}
      </Link>
    </li>
  );
}

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-[#0b0b10] text-zinc-400">
      <div className="container mx-auto px-4 py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-4">
            <Image
              src={`${process.env.NEXT_PUBLIC_CDN_URL}/assets/logo.svg`}
              alt="KYC Logo"
              width={180}
              height={40}
            />
            <p className="max-w-xs text-sm leading-relaxed text-zinc-500">
              Attract, retain, and grow Louisville&apos;s top builders.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-300">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {QUICK_LINKS.map((link) => (
                <FooterLinkItem key={link.href} {...link} />
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-300">
              Resources
            </h4>
            <ul className="space-y-2.5 text-sm">
              {RESOURCE_LINKS.map((link) => (
                <FooterLinkItem key={link.href} {...link} />
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-300">
              Connect
            </h4>
            <p className="mb-4 text-sm leading-relaxed text-zinc-500">
              Join our newsletter to stay updated on events and resources.
            </p>
            <div className="overflow-hidden rounded-md border border-white/[0.06] bg-black/30">
              <iframe
                src="https://embeds.beehiiv.com/3cab38c3-d1b9-4443-bdb3-2a0de2d047a6?slim=true"
                data-test-id="beehiiv-embed"
                height="52"
                style={{
                  margin: 0,
                  borderRadius: 0,
                  backgroundColor: "transparent",
                }}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-6 md:flex-row">
          <p className="text-xs text-zinc-500">
            © {new Date().getFullYear()} KYCombinator. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-zinc-500 transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
