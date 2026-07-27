// Shared site-chrome constants (nav, external links) used by the Header and
// Footer. Kept separate so the chrome doesn't reach into feature folders.

export const APPLY_URL = "https://form.kycombinator.com/cinderblock";
export const LOGIN_URL =
  "https://auth.kycombinator.com?redirect=https://www.kycombinator.com";
export const SLACK_INVITE =
  "https://join.slack.com/t/kycombinator/shared_invite/zt-2viueybdu-QNv80gAKk~sJZ9paWebGVQ";

export const HEADER_NAV: { label: string; href: string }[] = [
  { label: "Vision", href: "/vision" },
  { label: "Cinderblock", href: "/cinderblock" },
  { label: "Events", href: "/events" },
  { label: "Community", href: "/slack" },
  { label: "FAQs", href: "/faqs" },
];

export type FooterLink = { label: string; href: string; external?: boolean };

export const FOOTER_NAV: FooterLink[] = [
  { label: "Vision", href: "/vision" },
  { label: "Events", href: "/events" },
  { label: "Report", href: "/report" },
  { label: "Lougistics", href: "/lougistics" },
  { label: "HackKentucky", href: "https://www.hackkentucky.com", external: true },
  { label: "Blog", href: "https://kycombinator.beehiiv.com/", external: true },
  { label: "Assets", href: "/assets" },
];

export const FOOTER_LEGAL: FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Waiver", href: "/waiver" },
];
