// Homepage content that should NOT be baked into markup. Editing these values
// re-derives the scoreboard caption, stat row, and calendar. Swap the flagged
// PLACEHOLDER figures for real numbers before this ships to production.

export const GOAL_TOTAL = 10; // "Ten Series A companies out of Kentucky by 2030."

// ⚠️ Confirm the real count before launch. The scoreboard's credibility depends
// on this being true — if the honest number today is 0 or 1, show that.
export const companiesOnBoard = 3;

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
