import { Instrument_Serif, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";

// Fonts for the redesigned homepage (Field Manual paper system).
// Loaded only where these modules are imported (the homepage route), so the
// rest of the site is unaffected. Each exposes a CSS variable consumed via
// Tailwind arbitrary `font-[family-name:var(--font-*)]` utilities.

export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-instrument-serif",
});

export const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-ibm-plex-sans",
});

export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-ibm-plex-mono",
});

export const homeFontVars = [
  instrumentSerif.variable,
  ibmPlexSans.variable,
  ibmPlexMono.variable,
].join(" ");
