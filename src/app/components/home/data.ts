// Homepage content that should NOT be baked into markup. Editing these values
// re-derives the scoreboard caption, stat row, and calendar. Swap the flagged
// PLACEHOLDER figures for real numbers before this ships to production.

export const GOAL_TOTAL = 10; // "Ten Series A companies out of Kentucky by 2030."

export type Company = { name: string; url: string };

// Companies "on the board", mapped left-to-right onto the filled tracker blocks.
// Each filled block overlays the company name on hover/focus and links to its
// site. ⚠️ Names inferred from the domains — correct if needed. Add a company
// here and the board count + caption update automatically.
export const companies: Company[] = [
  { name: "Swell", url: "https://www.getswell.app/" },
  { name: "DueGooder", url: "https://duegooder.com" },
];

// Filled-block count is derived from the named companies, so the scoreboard can
// never claim more than it can show.
export const companiesOnBoard = companies.length;

// Shown in the tracker caption. Change when the board changes.
export const scoreboardUpdatedAt = "July 2026";

export type Stat = {
  figure: string;
  label: [string, string]; // two lines
  placeholder?: boolean;
};

// builders + companies are confirmed; event attendees still a placeholder.
export const stats: Stat[] = [
  { figure: "26", label: ["builders", "in the room"] },
  { figure: "13", label: ["companies", "started here"] },
  { figure: "1,200+", label: ["event", "attendees"], placeholder: true }, // ⚠️ cumulative HackKentucky + events — confirm
];

// Builder count, mirrored in the community band copy.
export const buildersInRoom = "26";

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
      { src: "/event-photos/louies/IMG_6972.jpg", alt: "The Louies — the room" },
      { src: "/event-photos/louies/IMG_6981.jpg", alt: "The Louies — the celebration" },
      { src: "/event-photos/louies/louies1.jpg", alt: "The Louies — awards night" },
      { src: "/event-photos/louies/louies2.jpg", alt: "The Louies — the crowd" },
    ],
  },
  {
    title: "HackKentucky",
    // ⚠️ tagline inferred — edit to taste.
    tagline: "Kentucky's flagship hackathon.",
    when: "September 11",
    href: "https://www.hackkentucky.com",
    photos: [
      { src: "/event-photos/hackkentucky/IMG_1464.jpg", alt: "HackKentucky participants" },
      { src: "/event-photos/hackkentucky/IMG_1467.jpg", alt: "HackKentucky at work" },
      { src: "/event-photos/hackkentucky/IMG_1470.jpg", alt: "HackKentucky teams" },
      { src: "/event-photos/hackkentucky/IMG_1481.jpg", alt: "HackKentucky awards" },
    ],
  },
  {
    title: "Rally Innovation Conference",
    // ⚠️ tagline/when inferred — edit to taste; set the real Rally URL on href.
    tagline: "Stay curious. Build fearlessly.",
    when: "Annual",
    href: "/events",
    photos: [
      { src: "/event-photos/rally/IMG_6460.jpg", alt: "Rally Innovation Conference" },
      { src: "/event-photos/rally/IMG_6482.jpg", alt: "Rally main stage" },
      { src: "/event-photos/rally/IMG_6483.jpg", alt: "Rally talk" },
      { src: "/event-photos/rally/IMG_6484.jpg", alt: "Rally audience" },
    ],
  },
  {
    title: "Cinderblock",
    tagline: "The working studio — heads down, in person.",
    when: "Year-round",
    href: "/cinderblock",
    photos: [
      { src: "/event-photos/cinderblock/IMG_6543.jpg", alt: "Cinderblock studio" },
      { src: "/event-photos/cinderblock/IMG_6648.jpg", alt: "Cinderblock founders at work" },
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
  { month: "APR", name: "Casino Night", tagline: "Luck is low agency.", action: "Register", href: "/events" },
  { month: "SEP", name: "HackKentucky", tagline: "Sleep is low agency.", action: "Register", href: "https://www.hackkentucky.com" },
  { month: "SEP", name: "Velocity", tagline: "Pre-revenue is low agency.", action: "Apply", href: "/events/velocity" },
  { month: "OCT", name: "Block Party", tagline: "Netflix & chill is low agency.", action: "Register", href: "/events" },
  { month: "DEC", name: "The LOUIES", tagline: "Hiding is low agency.", action: "Attend", href: "/events/louies/2025" },
];

// External destinations reused across sections.
export const APPLY_URL = "https://form.kycombinator.com/cinderblock";
export const LOGIN_URL = "https://auth.kycombinator.com?redirect=https://www.kycombinator.com";
export const SLACK_INVITE =
  "https://join.slack.com/t/kycombinator/shared_invite/zt-2viueybdu-QNv80gAKk~sJZ9paWebGVQ";
