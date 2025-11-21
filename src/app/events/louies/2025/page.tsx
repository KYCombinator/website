import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Louies 2025 | Louisville Startup Awards | KYX | Sponsored by JPMorgan Chase",
  description:
    "The ecosystem event of Louisville. An extremely local celebration of the founders, operators, and enablers who keep Louisville's startup scene moving. Nominations open for The Louies 2025.",
  authors: [{ name: "KYX Team", url: "https://kycombinator.com/about" }],
  openGraph: {
    title: "The Louies 2025 | Louisville Startup Awards | KYX | Sponsored by JPMorgan Chase",
    description:
      "The ecosystem event of Louisville. An extremely local celebration of the founders, operators, and enablers who keep Louisville's startup scene moving.",
    type: "website",
    images: ["https://cdn.kycombinator.com/TheLouies2025.gif"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Louies 2025 | Louisville Startup Awards | KYX | Sponsored by JPMorgan Chase",
    description:
      "The ecosystem event of Louisville. An extremely local celebration of the founders, operators, and enablers who keep Louisville's startup scene moving.",
    images: ["https://cdn.kycombinator.com/TheLouies2025.gif"],
  },
};

export default function Louies2025Page() {
  const awards = [
    {
      name: "Louisville’s Favorite Founder",
      category: "Individual",
      description:
        "Louisville’s very own favorite Founder! The Founder who does it all and represents Louisville.",
      presentedBy: "",
    },
    {
      name: "Assistant to the Founder",
      category: "Individual",
      description:
        "Not Assistant Founder or Co-Founder, let’s be clear—just the cofounder doing 80% of the work with 20% of the credit. The Dwight Schrute of the startup world.",
      presentedBy: "",
    },
    {
      name: "Idea Encore Award",
      category: "Individual",
      description:
        "Why stop at one company when you can start four? This award celebrates the founder who lives in permanent \"New Venture Mode,\" generating ideas faster than the rest of us can buy domains.",
      presentedBy: "",
    },
    {
      name: "Relentless Grit and Hustle Award (RGHA)",
      category: "Individual",
      description:
        "For the founder who is absolutely, definitely building the next decacorn — by force of sheer stubbornness, caffeine, and delusional confidence alone.",
      presentedBy: "",
    },
    {
      name: "Insomnia Award",
      category: "Individual",
      description:
        "For the founder who seems to operate on pure adrenaline, bad coffee, and zero hours of sleep. This award honors the unstoppable night owl who’s always online, always building, and somehow always responding to Slack at 3:14 AM.",
      presentedBy: "",
    },
    {
      name: "Gift of Gab Award",
      category: "Individual",
      description:
        "For the founder who always has something to say—whether it's a pitch, a rant, a story, a tangent, or a motivational sidebar nobody asked for. This award honors the unstoppable conversationalist whose words fill every room… and occasionally the entire Slack channel.",
      presentedBy: "",
    },
    {
      name: "Founder Therapist Award",
      category: "Ecosystem Award",
      description:
        "For the ecosystem hero who has heard every meltdown, panic spiral, and existential startup crisis in Louisville. They provide therapy disguised as \"founder office hours.\"",
      presentedBy: "",
    },
    {
      name: "Warm Intro Award",
      category: "Ecosystem Award",
      description:
        "For the person who knows everyone and makes intros faster than LinkedIn can suggest them. The connector who keeps Louisville's startup scene glued together.",
      presentedBy: "",
    },
    {
      name: "Best Community Operator",
      category: "Ecosystem Award",
      description:
        "For the person who does the invisible work that keeps the ecosystem alive: events, logistics, onboarding, DMs, spreadsheets, chaos control, and founder cat-herding.",
      presentedBy: "",
    },
    {
      name: "Louisville's Favorite Angel Investor",
      category: "Ecosystem Award",
      description:
        "For the investor who believes early, invests early, and relentlessly supports founders — with money, advice, memes, or all three.",
      presentedBy: "",
    },
    {
      name: "Best Fundraise",
      category: "Startup Award",
      description:
        "For the startup that did the impossible: raised meaningful money in Kentucky without selling a kidney, sacrificing a cofounder, or moving to SF.",
      presentedBy: "",
    },
    {
      name: "Highest Velocity Startup",
      category: "Startup Award",
      description:
        "For the team moving at Mach 10 — shipping fast, iterating faster, breaking things responsibly, and permanently living in \"just one more sprint\" mode.",
      presentedBy: "",
    },
    {
      name: "MVP Award",
      category: "Startup Award",
      description:
        "For the early-stage team that emphasized the \"M\" (minimum) in MVP (minimum viable product). Celebrating the team that executed in an hour rather than building perfection over a year.",
      presentedBy: "",
    },
    {
      name: "SPAM Award",
      category: "Startup Award",
      description:
        "For the startup whose growth strategy is \"send it to everyone.\" Cold emails, DMs, outreach, guerrilla tactics — if there's a channel, they've hit it.",
      presentedBy: "",
    },
    {
      name: "Exits in 2025",
      category: "Recognition",
      description:
        "A salute to the startups that actually made it out. Whether IPO, acquisition, acqui-hire, or \"strategic liquidation,\" you still beat the odds.",
      presentedBy: "",
    },
    {
      name: "Startups that died in 2025",
      category: "Recognition",
      description:
        "Honoring the fallen. They tried. They built. They learned. Fail fast and try again.",
      presentedBy: "",
    },
    {
      name: "Future Founders",
      category: "Recognition",
      description:
        "For those born in 2025, honoring the next generation! You're the future we're building for!",
      presentedBy: "",
    },
    {
      name: "Spouse of the Year Award",
      category: "Recognition",
      description:
        "For the partners who tolerated the late nights, the stress rants, the pitch decks on the kitchen table, and the \"one more meeting\" that was actually three.",
      presentedBy: "",
    },
  ];

  const categories = Array.from(
    new Set(awards.map((award) => award.category))
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section 
        className="relative h-[65vh] text-primary-foreground bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(https://cdn.kycombinator.com/TheLouies2025.png)' }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="uppercase tracking-[0.25em] text-xs md:text-sm mb-4 text-white">
              Louisville Startup Awards
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
              The LOUIES 2025
            </h1>
            <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto mb-6">
              The ecosystem event of Louisville. An extremely local celebration of the founders,
              operators, and enablers who keep Louisville&apos;s startup scene
              moving.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-6 text-white/90">
              <div className="text-sm md:text-base">
                <span className="font-semibold">5:00 PM</span> Networking
              </div>
              <div className="text-sm md:text-base">
                <span className="font-semibold">5:45 PM</span> Velocity
              </div>
              <div className="text-sm md:text-base">
                <span className="font-semibold">6:30 PM</span> The LOUIES
              </div>
            </div>
            <a
              href="https://luma.com/8rgsdubd"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm md:text-base font-semibold bg-white text-primary shadow-sm hover:bg-white/90 transition"
            >
              Register for The LOUIES
            </a>
          </div>
        </div>
      </section>

      <Nominations />

      {/* Awards by Category */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                2025 Award Categories
              </h2>
              <p className="mt-2 text-sm md:text-base text-foreground/80 max-w-xl">
                These are the Louies. Some serious, some chaotic, all very
                Louisville.
              </p>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground max-w-xs">
              Each award can be paired with a presenting sponsor. As partners
              confirm, you&apos;ll see &quot;Presented by&quot; filled in below.
            </p>
          </div>
          <div className="space-y-10 md:space-y-12">
            {categories.map((category) => {
              const categoryAwards = awards.filter(
                (award) => award.category === category
              );
              return (
                <div key={category} className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xl md:text-2xl font-semibold text-foreground">
                      {category}
                    </h3>
                  </div>
                  <div className="overflow-hidden rounded-2xl border border-border shadow-sm bg-background">
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-left text-sm">
                        <thead className="bg-muted border-b border-border">
                          <tr>
                            <th className="px-4 py-3 md:px-6 md:py-4 font-semibold text-foreground/90 text-xs md:text-sm">
                              Award
                            </th>
                            <th className="px-4 py-3 md:px-6 md:py-4 font-semibold text-foreground/90 text-xs md:text-sm">
                              Description
                            </th>
                            <th className="px-4 py-3 md:px-6 md:py-4 font-semibold text-foreground/90 text-xs md:text-sm whitespace-nowrap">
                              Presented By
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {categoryAwards.map((award) => (
                            <tr key={award.name} className="align-top">
                              <td className="px-4 py-4 md:px-6 md:py-5 text-sm font-medium text-foreground">
                                {award.name}
                              </td>
                              <td className="px-4 py-4 md:px-6 md:py-5 text-xs md:text-sm text-foreground/90">
                                {award.description ? (
                                  award.description
                                ) : (
                                  <span className="italic text-muted-foreground">
                                    Description coming soon.
                                  </span>
                                )}
                              </td>
                              <td className="px-4 py-4 md:px-6 md:py-5 text-xs md:text-sm text-foreground/80 whitespace-nowrap">
                                {award.presentedBy ? (
                                  <span>{award.presentedBy}</span>
                                ) : (
                                  <span className="italic text-muted-foreground">
                                    To be announced
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <Nominations />
        </div>
      </section>

    </div>
  );
}

function Nominations() {
  return (
    <section className="py-10 md:py-16 bg-muted border-t border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl">
          <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
            Nominations & Voting
          </h3>
          <p className="text-sm md:text-base text-foreground/80 mb-4">
            Nominations for The Louies 2025 are open. Tell us who&apos;s out
            here building, operating, enabling, and generally doing the most
            for Louisville&apos;s startup ecosystem.
          </p>
          <ul className="list-disc list-inside text-sm md:text-base text-foreground/80 space-y-1 mb-4">
            <li>Nominate founders, operators, and ecosystem builders</li>
            <li>Tell us why they deserve a Louie</li>
            <li>Help shape the slate for public voting</li>
          </ul>
          <a
            href="https://form.kycombinator.com/to/b706b984-80b9-4247-bd1d-740cda1b8038"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold bg-primary text-foreground-900 shadow-sm hover:bg-primary/90 transition"
          >
            Submit a Nomination
          </a>
          <p className="mt-4 text-xs md:text-sm text-muted-foreground">
            Once nominations close, we&apos;ll publish finalists and open up
            community voting for select categories.
          </p>
        </div>
      </div>
    </section>
  );
}
