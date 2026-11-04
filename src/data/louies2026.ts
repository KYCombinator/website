// Slate confirmed by Rachel: carry forward 2025, replace GRIT, add Bench Builder and Early Adopter.
// Rachel explicitly approved publication and public nominations on November 4, 2026.
export const nominationsOpen = true;
export type LouieAward = { id: string; name: string; description: string };
export const awards2026: LouieAward[] = [
  {
    "id": "favorite-founder",
    "name": "Louisville’s Favorite Founder",
    "description": "Louisville’s very own favorite Founder! The Founder who does it all and represents Louisville."
  },
  {
    "id": "assistant-to-founder",
    "name": "Assistant to the Founder",
    "description": "For the co-founder or early-stage employee doing 80% of the work with 20% of the credit. Either can be nominated—it’s about the work, not the title. The Dwight Schrute of the startup world."
  },
  {
    "id": "hey-check-this-out",
    "name": "Hey Check This Out Award",
    "description": "Why stop at one company when you can start four? This award celebrates the founder who lives in permanent \"New Venture Mode,\" generating ideas faster than the rest of us can buy domains."
  },
  {
    "id": "comeback-kid",
    "name": "Comeback Kid",
    "description": "For the founder who faced a setback and came back building. Recognizing resilience, a fresh start, and the determination to keep going."
  },
  {
    "id": "up-all-night",
    "name": "Up all Night Award",
    "description": "For the founder who seems to operate on pure adrenaline, bad coffee, and zero hours of sleep. This award honors the unstoppable night owl who’s always online, always building, and somehow always responding to Slack at 3:14 AM."
  },
  {
    "id": "gift-of-gab",
    "name": "Gift of Gab Award",
    "description": "For the founder who always has something to say—whether it's a pitch, a rant, a story, a tangent, or a motivational sidebar nobody asked for. This award honors the unstoppable conversationalist whose words fill every room… and occasionally the entire Slack channel."
  },
  {
    "id": "founder-therapist",
    "name": "Founder Therapist Award",
    "description": "For the ecosystem hero who has heard every meltdown, panic spiral, and existential startup crisis in Louisville. They provide therapy disguised as \"founder office hours.\""
  },
  {
    "id": "warm-intro",
    "name": "Warm Intro Award",
    "description": "For the person who knows everyone and makes intros faster than LinkedIn can suggest them. The connector who keeps Louisville's startup scene glued together."
  },
  {
    "id": "favorite-angel",
    "name": "Louisville's Favorite Angel Investor",
    "description": "For the investor who believes early, invests early, and relentlessly supports founders — with money, advice, memes, or all three."
  },
  {
    "id": "show-me-the-money",
    "name": "Show me the Money Award",
    "description": "For the startup that did the impossible: raised meaningful money in Kentucky without selling a kidney, sacrificing a cofounder, or moving to SF."
  },
  {
    "id": "highest-velocity",
    "name": "Highest Velocity Startup",
    "description": "For the team moving at Mach 10 — shipping fast, iterating faster, breaking things responsibly, and permanently living in \"just one more sprint\" mode."
  },
  {
    "id": "mvp",
    "name": "MVP Award",
    "description": "For the early-stage team that emphasized the \"M\" (minimum) in MVP (minimum viable product). Celebrating the team that executed in an hour rather than building perfection over a year."
  },
  {
    "id": "spam",
    "name": "SPAM Award",
    "description": "For the startup whose growth strategy is \"send it to everyone.\" Cold emails, DMs, outreach, guerrilla tactics — if there's a channel, they've hit it."
  },
  {
    "id": "bench-builder",
    "name": "Bench Builder",
    "description": "For the person building Louisville’s bench and doing the invisible work that keeps the ecosystem alive: events, logistics, onboarding, introductions, and helping founders and operators grow."
  },
  {
    "id": "early-adopter",
    "name": "Early Adopter",
    "description": "For the person or organization willing to be an early customer, try something new, and give a startup its first real chance."
  },
  {
    id: "most-school-spirit",
    name: "Most School Spirit",
    description: "For the founder or team member repping their company’s swag everywhere. Every day is spirit day when you believe in the team."
  },
  {
    id: "middle-out",
    name: "The Middle-Out",
    description: "For the cleverest solution to a problem nobody else could crack."
  },
  {
    id: "dinesh-gilfoyle",
    name: "The Dinesh & Gilfoyle",
    description: "For the most enduring bromance of 2026."
  },
  {
    id: "drip-loma",
    name: "The Kelly Kapoor Fashion Show at Lunch Award",
    description: "For the best-dressed founder or team member. Turning every startup event into a runway."
  }
];

// Retired awards remain identifiable in historical submissions, but are not offered on the form.
export const retiredLouieNames: Record<string, string> = {
  "exits-2026": "Exits in 2026 (retired)",
  "rip-2026": "RIP Award - Startups that died in 2026 (retired)",
  "future-founders": "Future Founders (retired)",
  "spouse-of-year": "Spouse of the Year Award (retired)",
  "community-operator": "Best Community Operator (retired)"
};
