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
        "Not Assistant Founder or Co-Founder, let’s be clear—just the cofounder doing 80% of the work with 20% of the credit. Together, unstoppable.",
      presentedBy: "",
    },
    {
      name: "Idea Encore Award",
      category: "Individual",
      description:
        "For the founder who never stops at one idea—because why build one company when you can build four at the same time? This award celebrates the unstoppable idea machine whose brain is always on “encore mode,” generating new ventures faster than the rest of us can write them down.",
      presentedBy: "",
    },
    {
      name: "Relentless Grit and Hustle Award (RGHA)",
      category: "Individual",
      description: "The Founder who will create the next decacorn.",
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
        "For the founder who always has something to say—whether it’s a pitch, a rant, a story, a tangent, or a motivational sidebar nobody asked for. This award honors the unstoppable conversationalist whose words fill every room… and occasionally the entire Slack channel.",
      presentedBy: "",
    },
    {
      name: "Founder Therapist Award",
      category: "Ecosystem Award",
      description: "",
      presentedBy: "",
    },
    {
      name: "Warm Intro Award",
      category: "Ecosystem Award",
      description: "",
      presentedBy: "",
    },
    {
      name: "Best Community Operator",
      category: "Ecosystem Award",
      description: "",
      presentedBy: "",
    },
    {
      name: "Louisville’s Favorite Angel Investor",
      category: "Ecosystem Award",
      description: "",
      presentedBy: "",
    },
    {
      name: "Best Fundraise",
      category: "Startup Award",
      description: "",
      presentedBy: "",
    },
    {
      name: "Highest Velocity Startup",
      category: "Startup Award",
      description: "",
      presentedBy: "",
    },
    {
      name: "MVP Award",
      category: "Startup Award",
      description: "",
      presentedBy: "",
    },
    {
      name: "SPAM Award",
      category: "Startup Award",
      description: "",
      presentedBy: "",
    },
    {
      name: "Exits in 2025",
      category: "Recognition",
      description: "",
      presentedBy: "",
    },
    {
      name: "Startups that died in 2025",
      category: "Recognition",
      description: "",
      presentedBy: "",
    },
    {
      name: "Future Founders",
      category: "Recognition",
      description: "",
      presentedBy: "",
    },
    {
      name: "Spouse of the Year Award",
      category: "Recognition",
      description: "",
      presentedBy: "",
    },
  ];

  const categories = Array.from(
    new Set(awards.map((award) => award.category))
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative h-[65vh] bg-primary text-primary-foreground">
        <div className="absolute inset-0 opacity-20 bg-primary/30" />
        <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="uppercase tracking-[0.25em] text-xs md:text-sm mb-4 text-foreground-900">
              Louisville Startup Awards
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-foreground-900">
              The Louies 2025
            </h1>
            <p className="text-base md:text-lg text-foreground-700 max-w-2xl mx-auto">
              The ecosystem event of Louisville. An extremely local celebration of the founders,
              operators, and enablers who keep Louisville&apos;s startup scene
              moving.
            </p>  
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
