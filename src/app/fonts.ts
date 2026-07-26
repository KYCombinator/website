import { Instrument_Serif, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";

// Site-wide fonts for the Field Manual paper system. Loaded once at the layout
// level and exposed as CSS variables, consumed via Tailwind arbitrary
// `font-[family-name:var(--font-*)]` utilities.

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

export const fontVariables = [
  instrumentSerif.variable,
  ibmPlexSans.variable,
  ibmPlexMono.variable,
].join(" ");
