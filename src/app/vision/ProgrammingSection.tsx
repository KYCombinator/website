import { Container, Eyebrow, SerifHeading } from "@/app/components/fm";

export default function ProgrammingSection() {
  const mainPrograms = [
    { name: "Jan – KYX Internship Program", status: "new", tagline: "Working at one company is low agency" },
    { name: "Feb – HackKentucky Main", status: "active", tagline: "Sleep is low agency" },
    { name: "Mar – Build n' Chill", status: "discontinued", note: "will be discontinued" },
    { name: "April – Casino Night", status: "new", tagline: "Luck is low agency" },
    { name: "May – Relocate", status: "new", tagline: "SF is low agency" },
    { name: "Sept – HacktheTrack", status: "active", note: "partnership", tagline: "Spectating is low agency" },
    { name: "Sept – Velocity", status: "active", tagline: "Pre-Revenue is low agency" },
    { name: "Sept – Rally Innovation Conference", status: "active", tagline: "Linkedin is low agency" },
    { name: "Sept – HackKentucky – Fall Cincinnati", status: "new", tagline: "Sleep is low agency" },
    { name: "Oct – Block Party", status: "active", tagline: "Netflix & Chill is low agency" },
    { name: "Nov – HackKentucky Fall", status: "discontinued", note: "moving to September in Cincinnati" },
    { name: "Dec – Velocity Demo Day / The LOUIES", status: "active", tagline: "Pre-Revenue is low agency" },
  ];

  const communityPrograms = [
    { name: "Fire & Ice", status: "active", tagline: "Comfort is low agency" },
    { name: "Vibe Code / Poker Night", status: "active", tagline: "Loneliness is low agency" },
    { name: "Speaker Series", status: "new", tagline: "Complacency is low agency" },
  ];

  type Program = { name: string; status: string; note?: string; tagline?: string };

  const ProgramList = ({
    programs,
    title,
    description,
  }: {
    programs: Program[];
    title: string;
    description: string;
  }) => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <SerifHeading as="h3" className="text-[26px] leading-none md:text-[30px]">
          {title}
        </SerifHeading>
        <p className="text-[14px] leading-[1.6] text-[#7d766a]">{description}</p>
      </div>
      <div className="mt-1 flex flex-col">
        {programs.map((program, index) => {
          const isDiscontinued = program.status === "discontinued";
          return (
            <div
              key={index}
              className={
                "grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4 gap-y-1 border-t border-[#d8d2c5] py-4 " +
                (index === programs.length - 1 ? "border-b" : "")
              }
            >
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span
                  className={
                    "font-[family-name:var(--font-ibm-plex-sans)] text-[16px] font-medium " +
                    (isDiscontinued ? "text-[#7d766a] line-through" : "text-[#16130f]")
                  }
                >
                  {program.name}
                </span>
                {program.note && (
                  <span className="text-[13px] text-[#7d766a]">({program.note})</span>
                )}
              </div>
              {program.status === "new" && (
                <span className="col-start-2 row-start-1 justify-self-end font-[family-name:var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.1em] text-[var(--kyx-purple)]">
                  New
                </span>
              )}
              {isDiscontinued && (
                <span className="col-start-2 row-start-1 justify-self-end font-[family-name:var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.1em] text-[#7d766a]">
                  Discontinued
                </span>
              )}
              {program.tagline && (
                <p className="col-span-2 font-[family-name:var(--font-ibm-plex-mono)] text-[12px] italic text-[#7d766a]">
                  {program.tagline}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <section className="border-b border-[#16130f]">
      <Container className="py-16 lg:py-[72px]">
        <Eyebrow className="mb-4">Our programs</Eyebrow>
        <SerifHeading className="text-[32px] leading-none md:text-[40px]">
          KYX programming.
        </SerifHeading>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <ProgramList
            programs={mainPrograms}
            title="Main programs"
            description="These are headline events which are large initiatives for the community"
          />
          <div className="lg:border-l lg:border-[#d3ccbd] lg:pl-16">
            <ProgramList
              programs={communityPrograms}
              title="Community programs"
              description="These programs foster community engagement and culture"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
