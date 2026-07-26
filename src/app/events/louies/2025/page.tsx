import type { Metadata } from "next";
import { awards } from "@/data/louies";
import { Container, PageHero, Eyebrow, SerifHeading, Button } from "@/app/components/fm";

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

const SCHEDULE: [string, string][] = [
  ["5:00 PM", "Networking"],
  ["5:45 PM", "Velocity"],
  ["6:30 PM", "The LOUIES"],
];

export default function Louies2025Page() {
  const categories = Array.from(new Set(awards.map((award) => award.category)));

  return (
    <>
      {/* Hero */}
      <PageHero
        eyebrow="Louisville Startup Awards"
        title="The LOUIES 2025."
        intro="The ecosystem event of Louisville. An extremely local celebration of the founders, operators, and enablers who keep Louisville's startup scene moving."
      >
        <Button
          href="https://luma.com/8rgsdubd"
          external
          variant="primary"
        >
          Register for The LOUIES
        </Button>
      </PageHero>

      {/* Schedule + location strip */}
      <section className="border-b border-[#16130f]">
        <div className="grid grid-cols-1 font-[family-name:var(--font-ibm-plex-mono)] md:grid-cols-3">
          {SCHEDULE.map(([time, label], i) => (
            <div
              key={time}
              className={
                "flex items-baseline gap-3 px-5 py-[22px] md:px-7 lg:px-10 " +
                (i < SCHEDULE.length - 1
                  ? "border-b border-[#d8d2c5] md:border-b-0 md:border-r"
                  : "")
              }
            >
              <span className="text-[15px] uppercase tracking-[0.08em] text-[var(--kyx-purple)]">
                {time}
              </span>
              <span className="text-[11px] uppercase tracking-[0.1em] text-[#7d766a]">
                {label}
              </span>
            </div>
          ))}
        </div>
        <Container className="py-4">
          <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#7d766a]">
            Solyco Capital, 111 West Main Street, LOUIESville, KY
          </p>
        </Container>
      </section>

      <Nominations />

      {/* Awards by Category */}
      <section className="border-b border-[#16130f]">
        <Container className="py-16 lg:py-[72px]">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-3">
              <Eyebrow>The slate</Eyebrow>
              <SerifHeading className="text-[32px] leading-none md:text-[40px]">
                2025 award categories.
              </SerifHeading>
              <p className="max-w-[560px] text-[15px] leading-[1.65] text-[#57503f]">
                These are the Louies. Some serious, some chaotic, all very
                Louisville.
              </p>
            </div>
            <p className="max-w-[280px] font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase leading-[1.6] tracking-[0.06em] text-[#7d766a]">
              Each award can be paired with a presenting sponsor. As partners
              confirm, you&apos;ll see &quot;Presented by&quot; filled in below.
            </p>
          </div>

          <div className="mt-12 flex flex-col gap-12">
            {categories.map((category) => {
              const categoryAwards = awards.filter(
                (award) => award.category === category
              );
              return (
                <div key={category} className="flex flex-col gap-4">
                  <Eyebrow>{category}</Eyebrow>
                  <div className="flex flex-col">
                    {categoryAwards.map((award, index) => (
                      <div
                        key={award.name}
                        className={
                          "grid gap-x-8 gap-y-3 border-t border-[#d8d2c5] py-6 md:grid-cols-[minmax(0,1fr)_240px] " +
                          (index === categoryAwards.length - 1 ? "border-b" : "")
                        }
                      >
                        <div className="flex flex-col gap-2">
                          <h3 className="font-[family-name:var(--font-ibm-plex-sans)] text-[18px] font-medium text-[#16130f]">
                            {award.name}
                          </h3>
                          <p className="max-w-[560px] text-[15px] leading-[1.65] text-[#4a443a]">
                            {award.description ? (
                              award.description
                            ) : (
                              <span className="italic text-[#7d766a]">
                                Description coming soon.
                              </span>
                            )}
                          </p>
                          <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#7d766a]">
                            {award.presentedBy ? (
                              <>Presented by {award.presentedBy}</>
                            ) : (
                              "Presenter to be announced"
                            )}
                          </p>
                        </div>
                        <div>
                          {award.nominees && award.nominees.length > 0 ? (
                            <ul className="flex flex-col gap-1.5">
                              {award.nominees.map((nominee, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2 text-[14px] leading-[1.5] text-[#57503f]"
                                >
                                  <span className="mt-0.5 text-[var(--kyx-purple)]">
                                    ·
                                  </span>
                                  <span>{nominee}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#7d766a]">
                              Nominations pending
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <Nominations />
    </>
  );
}

function Nominations() {
  return (
    <section className="border-b border-[#16130f] bg-[#eae5da]">
      <Container className="flex flex-col gap-4 py-16 lg:py-[72px]">
        <Eyebrow>Nominations &amp; voting</Eyebrow>
        <SerifHeading className="max-w-[640px] text-[32px] leading-none md:text-[40px]">
          Who&apos;s doing the most for Louisville?
        </SerifHeading>
        <p className="max-w-[620px] text-[16px] leading-[1.6] text-[#4a443a]">
          Voting for The Louies 2025 is open. Tell us who&apos;s out here
          building, operating, enabling, and generally doing the most for
          Louisville&apos;s startup ecosystem.
        </p>
        <ul className="flex max-w-[620px] flex-col gap-1.5">
          {[
            "Vote for founders, operators, and ecosystem builders",
            "Tell us why they deserve a Louie",
            "Help shape the slate for public voting",
          ].map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-[16px] leading-[1.5] text-[#4a443a]"
            >
              <span className="mt-0.5 text-[var(--kyx-purple)]">·</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-2">
          <Button
            href="https://form.kycombinator.com/to/cfb78019-6778-4603-995c-bc3644bb1577"
            external
            variant="primary"
          >
            Vote here
          </Button>
        </div>
        <p className="max-w-[620px] font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#7d766a]">
          Once nominations close, we&apos;ll publish finalists and open up
          community voting for select categories.
        </p>
      </Container>
    </section>
  );
}
