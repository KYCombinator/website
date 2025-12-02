import type { Metadata } from "next";
import { awards } from "@/data/louies";

export const metadata: Metadata = {
  title: "The Louies 2025 | Louisville Startup Awards | KYX | Sponsored by JPMorganChase",
  description:
    "The ecosystem event of Louisville. An extremely local celebration of the founders, operators, and enablers who keep Louisville's startup scene moving. Nominations open for The Louies 2025.",
  authors: [{ name: "KYX Team", url: "https://kycombinator.com/about" }],
  openGraph: {
    title: "The Louies 2025 | Louisville Startup Awards | KYX | Sponsored by JPMorganChase",
    description:
      "The ecosystem event of Louisville. An extremely local celebration of the founders, operators, and enablers who keep Louisville's startup scene moving.",
    type: "website",
    images: ["https://cdn.kycombinator.com/TheLouies2025.gif"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Louies 2025 | Louisville Startup Awards | KYX | Sponsored by JPMorganChase",
    description:
      "The ecosystem event of Louisville. An extremely local celebration of the founders, operators, and enablers who keep Louisville's startup scene moving.",
    images: ["https://cdn.kycombinator.com/TheLouies2025.gif"],
  },
};

export default function Louies2025Page() {

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
            <p className="text-white/70 text-sm md:text-base mt-4">
              Solyco Capital, 111 West Main Street, LOUIESville, KY
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
                  <div className="overflow-hidden rounded-2xl border border-border shadow-lg bg-background">
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-left">
                        <thead className="bg-gradient-to-r from-muted via-muted/90 to-muted border-b-2 border-primary/20">
                          <tr>
                            <th className="px-5 py-4 md:px-8 md:py-5 font-bold text-foreground text-sm md:text-base uppercase tracking-wider border-r border-border/30 first:border-l-0">
                              Award
                            </th>
                            <th className="px-5 py-4 md:px-8 md:py-5 font-bold text-foreground text-sm md:text-base uppercase tracking-wider border-r border-border/30">
                              Description
                            </th>
                            <th className="px-5 py-4 md:px-8 md:py-5 font-bold text-foreground text-sm md:text-base uppercase tracking-wider whitespace-nowrap border-r border-border/30">
                              Presented By
                            </th>
                            <th className="px-5 py-4 md:px-8 md:py-5 font-bold text-foreground text-sm md:text-base uppercase tracking-wider">
                              Nominees
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {categoryAwards.map((award, index) => (
                            <tr 
                              key={award.name} 
                              className={`align-top transition-all duration-200 ${
                                index < categoryAwards.length - 1 ? 'border-b border-primary-200' : ''
                              } ${
                                index % 2 === 0 
                                  ? 'bg-background hover:bg-muted/40' 
                                  : 'bg-muted/20 hover:bg-muted/50'
                              }`}
                            >
                              <td className="px-5 py-5 md:px-8 md:py-6 border-r border-border/20">
                                <span className="text-sm md:text-base font-bold text-foreground leading-tight">
                                  {award.name}
                                </span>
                              </td>
                              <td className="px-5 py-5 md:px-8 md:py-6 max-w-md">
                                <p className="text-xs md:text-sm text-foreground/85 leading-relaxed">
                                  {award.description ? (
                                    award.description
                                  ) : (
                                    <span className="italic text-muted-foreground">
                                      Description coming soon.
                                    </span>
                                  )}
                                </p>
                              </td>
                              <td className="px-5 py-5 md:px-8 md:py-6 whitespace-nowrap">
                                <span className="text-xs md:text-sm text-foreground/80">
                                  {award.presentedBy ? (
                                    <span className="font-medium">{award.presentedBy}</span>
                                  ) : (
                                    <span className="italic text-muted-foreground">
                                      To be announced
                                    </span>
                                  )}
                                </span>
                              </td>
                              <td className="px-5 py-5 md:px-8 md:py-6 min-w-[200px]">
                                {award.nominees && award.nominees.length > 0 ? (
                                  <ul className="list-none space-y-2">
                                    {award.nominees.map((nominee, idx) => (
                                      <li 
                                        key={idx} 
                                        className="text-xs md:text-sm text-foreground/85 flex items-start gap-2"
                                      >
                                        <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                                        <span className="leading-relaxed">{nominee}</span>
                                      </li>
                                    ))}
                                  </ul>
                                ) : (
                                  <span className="italic text-muted-foreground text-xs md:text-sm">
                                    Nominations pending
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
            Voting for The Louies 2025 is open. Tell us who&apos;s out
            here building, operating, enabling, and generally doing the most
            for Louisville&apos;s startup ecosystem.
          </p>
          <ul className="list-disc list-inside text-sm md:text-base text-foreground/80 space-y-1 mb-4">
            <li>Vote for founders, operators, and ecosystem builders</li>
            <li>Tell us why they deserve a Louie</li>
            <li>Help shape the slate for public voting</li>
          </ul>
          <a
            href="https://form.kycombinator.com/to/cfb78019-6778-4603-995c-bc3644bb1577"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold bg-primary text-foreground-900 shadow-sm hover:bg-primary/90 transition"
          >
            Vote Here
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
