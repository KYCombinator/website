import Link from "next/link";
import Image from "next/image";
import { FOOTER_NAV, FOOTER_LEGAL, type FooterLink } from "../site";

const LOGO = `${process.env.NEXT_PUBLIC_CDN_URL}/assets/logo.svg`;

function FooterAnchor({ label, href, external }: FooterLink) {
  const cls =
    "transition-opacity duration-150 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)]";
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {label}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-[#16130f] bg-[#f4f1ea]">
      <div className="mx-auto max-w-[1120px] px-5 py-9 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] text-[#7d766a] md:px-7 lg:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-10">
          {/* Logo + address */}
          <div className="flex flex-col items-start gap-1.5">
            <Image
              src={LOGO}
              alt="KYCombinator"
              width={46}
              height={23}
              className="block h-[23px] w-auto self-start [filter:brightness(0)]"
            />
            <span>1205 East Washington St, Suite 111 · Louisville, KY 40206</span>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2 uppercase tracking-[0.06em]">
            {FOOTER_NAV.map((link) => (
              <FooterAnchor key={link.href} {...link} />
            ))}
          </nav>

          {/* Copyright */}
          <span className="whitespace-nowrap">© {new Date().getFullYear()} KYCombinator</span>
        </div>

        {/* Legal row */}
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#d8d2c5] pt-6 uppercase tracking-[0.06em]">
          {FOOTER_LEGAL.map((link) => (
            <FooterAnchor key={link.href} {...link} />
          ))}
        </div>
      </div>
    </footer>
  );
}
