import { Container, Eyebrow, SerifHeading } from "@/app/components/fm";

export default function InvolvementSection() {
  const involvementOptions = [
    {
      title: "Leadership & Partnership",
      description: "Join the KYX Advisory Board, become a corporate partner, or sponsor events.",
    },
    {
      title: "Direct Support",
      description: "Share expertise as a speaker or mentor.",
    },
    {
      title: "Community Action",
      description: "Volunteer at events to create the connective tissue that keeps the ecosystem alive.",
    },
  ];

  return (
    <section className="border-b border-[#16130f] bg-[#eae5da]">
      <Container className="py-16 lg:py-[72px]">
        <Eyebrow className="mb-4">Get involved</Eyebrow>
        <SerifHeading className="text-[32px] leading-none md:text-[40px]">
          How to get involved.
        </SerifHeading>
        <p className="mt-6 max-w-[720px] text-[18px] leading-[1.6] text-[#4a443a] [text-wrap:pretty]">
          There are multiple ways individuals and institutions can meaningfully contribute to
          the mission:
        </p>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {involvementOptions.map((option, index) => (
            <div
              key={index}
              className="flex flex-col gap-3 border border-[#d8d2c5] p-6"
            >
              <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.1em] text-[var(--kyx-purple)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-[family-name:var(--font-instrument-serif)] text-[24px] leading-none">
                {option.title}
              </h3>
              <p className="text-[15px] leading-[1.6] text-[#4a443a] [text-wrap:pretty]">
                {option.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
