// Homepage content that should NOT be baked into markup. Editing these values
// re-derives the scoreboard caption, stat row, and calendar. Swap the flagged
// PLACEHOLDER figures for real numbers before this ships to production.

export const GOAL_TOTAL = 10; // "Ten Series A companies out of Kentucky by 2030."

// ⚠️ Confirm the real count before launch. The scoreboard's credibility depends
// on this being true — if the honest number today is 0 or 1, show that.
export const companiesOnBoard = 3;

export type Company = { name: string; url: string };

// Companies "on the board", mapped left-to-right onto the filled tracker blocks.
// Hovering (or focusing) a filled block reveals the name and links to the company.
// ⚠️ Names inferred from the domains — correct if needed. A 3rd company is on the
// board (companiesOnBoard = 3) but not yet named here; add it to light up block 3.
export const companies: Company[] = [
  { name: "Swell", url: "https://www.getswell.app/" },
  { name: "DueGooder", url: "https://duegooder.com" },
];

// Shown in the tracker caption. Change when the board changes.
export const scoreboardUpdatedAt = "July 2026";

export type Stat = {
  figure: string;
  label: [string, string]; // two lines
  placeholder?: boolean;
};

// ⚠️ All three figures are PLACEHOLDERS — replace with real numbers before deploy.
export const stats: Stat[] = [
  { figure: "600+", label: ["builders", "in the room"], placeholder: true }, // Slack roster
  { figure: "18", label: ["companies", "started here"], placeholder: true },
  { figure: "1,200+", label: ["event", "attendees"], placeholder: true }, // cumulative HackKentucky + events
];

// ⚠️ PLACEHOLDER — Slack member count, mirrored in the community band copy.
export const buildersInRoom = "600+";

export type EventPhoto = { src: string; alt: string };
export type FeaturedEvent = {
  title: string;
  tagline: string; // one-line description
  when: string; // when it usually happens
  href: string;
  photos: EventPhoto[];
};

// Events showcased in the homepage photo carousel. Each event's photos become
// slides sharing that event's caption. Add more events (or more photos per
// event) here — the carousel adapts. Drop new photos in /public/<event>/.
export const featuredEvents: FeaturedEvent[] = [
  {
    title: "The Louies",
    tagline: "The annual Louisville startup award show.",
    when: "First Thursday of December",
    href: "/events/louies/2025",
    photos: [
      { src: "/events/louies/IMG_6972.jpg", alt: "The Louies — the room" },
      { src: "/events/louies/IMG_6981.jpg", alt: "The Louies — the celebration" },
      { src: "/events/louies/louies1.jpg", alt: "The Louies — awards night" },
      { src: "/events/louies/louies2.jpg", alt: "The Louies — the crowd" },
    ],
  },
  {
    title: "HackKentucky",
    // ⚠️ tagline inferred — edit to taste.
    tagline: "Kentucky's flagship hackathon.",
    when: "September 11",
    href: "https://www.hackkentucky.com",
    photos: [
      { src: "/events/hackkentucky/IMG_1464.jpg", alt: "HackKentucky participants" },
      { src: "/events/hackkentucky/IMG_1467.jpg", alt: "HackKentucky at work" },
      { src: "/events/hackkentucky/IMG_1470.jpg", alt: "HackKentucky teams" },
      { src: "/events/hackkentucky/IMG_1481.jpg", alt: "HackKentucky awards" },
    ],
  },
  {
    title: "Rally Innovation Conference",
    // ⚠️ tagline/when inferred — edit to taste; set the real Rally URL on href.
    tagline: "Stay curious. Build fearlessly.",
    when: "Annual",
    href: "/events",
    photos: [
      { src: "/events/rally/IMG_6460.jpg", alt: "Rally Innovation Conference" },
      { src: "/events/rally/IMG_6482.jpg", alt: "Rally main stage" },
      { src: "/events/rally/IMG_6483.jpg", alt: "Rally talk" },
      { src: "/events/rally/IMG_6484.jpg", alt: "Rally audience" },
    ],
  },
  {
    title: "Cinderblock",
    tagline: "The working studio — heads down, in person.",
    when: "Year-round",
    href: "/cinderblock",
    photos: [
      { src: "/events/cinderblock/IMG_6543.jpg", alt: "Cinderblock studio" },
      { src: "/events/cinderblock/IMG_6648.jpg", alt: "Cinderblock founders at work" },
    ],
  },
];

export type CalendarEvent = {
  month: string;
  name: string;
  tagline: string;
  action: string;
  href: string;
};

// Source these from the events CMS when one exists; hard-coded here to the 2026
// program calendar. Discontinued programs are intentionally omitted.
export const calendar: CalendarEvent[] = [
  { month: "JAN", name: "Internship Program", tagline: "Working at one company is low agency.", action: "Apply", href: "/events" },
  { month: "FEB", name: "HackKentucky", tagline: "Sleep is low agency.", action: "Register", href: "https://www.hackkentucky.com" },
  { month: "APR", name: "Casino Night", tagline: "Luck is low agency.", action: "Register", href: "/events" },
  { month: "MAY", name: "Relocate", tagline: "SF is low agency.", action: "Details", href: "/events" },
  { month: "SEP", name: "Velocity", tagline: "Pre-revenue is low agency.", action: "Apply", href: "/events/velocity" },
  { month: "OCT", name: "Block Party", tagline: "Netflix & chill is low agency.", action: "Register", href: "/events" },
  { month: "DEC", name: "Demo Day / The LOUIES", tagline: "Hiding is low agency.", action: "Attend", href: "/events/louies/2025" },
];

// External destinations reused across sections.
export const APPLY_URL = "https://form.kycombinator.com/cinderblock";
export const LOGIN_URL = "https://auth.kycombinator.com?redirect=https://www.kycombinator.com";
export const SLACK_INVITE =
  "https://join.slack.com/t/kycombinator/shared_invite/zt-2viueybdu-QNv80gAKk~sJZ9paWebGVQ";
