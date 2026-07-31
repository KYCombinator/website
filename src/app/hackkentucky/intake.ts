// Field configs for the four HackKentucky get-involved forms. Data only (safe
// to import from client + server). Name + Email (required) are rendered by the
// shared IntakeForm for every kind; these configs list the kind-specific fields.

export type HkKind = "sponsor" | "bounty" | "speak" | "volunteer";
export type FieldType = "text" | "textarea" | "select";
export type IntakeField = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  placeholder?: string;
};
export type IntakeConfig = {
  kind: HkKind;
  eyebrow: string;
  heading: string;
  description: string;
  fields: IntakeField[];
  logo?: boolean;
  submitLabel: string;
};

export const INTAKE_ORDER: HkKind[] = ["sponsor", "bounty", "speak", "volunteer"];

export const INTAKES: Record<HkKind, IntakeConfig> = {
  sponsor: {
    kind: "sponsor",
    eyebrow: "Sponsor",
    heading: "Fund the build.",
    description:
      "Back HackKentucky × HackTheTrack and put your brand in front of 300+ builders. Pick a tier or bring a custom package — cash or in-kind.",
    logo: true,
    submitLabel: "Send sponsor inquiry",
    fields: [
      { name: "organization", label: "Organization", type: "text" },
      {
        name: "tier",
        label: "Tier of interest",
        type: "select",
        options: [
          "Not sure yet",
          "Community — Free",
          "Neon — $100",
          "Chrome — $500",
          "Purple — $10,000",
          "Custom package",
        ],
      },
      { name: "budget", label: "Budget / range", type: "text" },
      { name: "notes", label: "What are you thinking?", type: "textarea" },
    ],
  },
  bounty: {
    kind: "bounty",
    eyebrow: "Bounty",
    heading: "Set the challenge.",
    description:
      "A bounty is a scoped problem with a prize. Write the challenge, set a reward — cash or in-kind, ~$200 in value is plenty — judge it, and hand it to the winning team. The problem motivates builders more than the prize does.",
    logo: true,
    submitLabel: "Send bounty idea",
    fields: [
      { name: "organization", label: "Organization", type: "text" },
      { name: "challenge", label: "The challenge", type: "textarea", required: true, placeholder: "What should hackers build?" },
      { name: "prize", label: "Prize / reward", type: "text", placeholder: "e.g. $200 + swag" },
      { name: "notes", label: "Anything else", type: "textarea" },
    ],
  },
  speak: {
    kind: "speak",
    eyebrow: "Speak",
    heading: "Teach the room.",
    description:
      "Run a 35-minute Friday Learn-a-thon session or a Saturday guest talk. Tell us the track and topic and a little about you.",
    submitLabel: "Pitch a talk",
    fields: [
      { name: "affiliation", label: "Company / affiliation", type: "text" },
      {
        name: "track",
        label: "Track",
        type: "select",
        options: [
          "Learn-a-thon: Software",
          "Learn-a-thon: Startups",
          "Learn-a-thon: Hardware",
          "Learn-a-thon: Sustainable Fashion",
          "Learn-a-thon: AI",
          "Saturday: Career track",
          "Saturday: Startup track",
        ],
      },
      { name: "topic", label: "Talk / session topic", type: "text", required: true },
      { name: "bio", label: "Short bio", type: "textarea" },
    ],
  },
  volunteer: {
    kind: "volunteer",
    eyebrow: "Volunteer",
    heading: "Run the weekend.",
    description:
      "Volunteers make the event happen — check-in, food, mentoring, and keeping the floor moving. Tell us when you're free and what you're good at.",
    submitLabel: "Sign me up",
    fields: [
      { name: "availability", label: "Availability", type: "select", options: ["Friday", "Saturday", "Both days"] },
      { name: "skills", label: "Skills / interests", type: "text" },
      { name: "help", label: "How do you want to help?", type: "textarea" },
    ],
  },
};
