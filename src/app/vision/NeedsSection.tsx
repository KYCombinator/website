import { Container, Eyebrow, SerifHeading } from "@/app/components/fm";

export default function NeedsSection() {
  const foundersNeeds = [
    {
      title: "Advisors / Knowledge",
      description:
        "Specific, high‑leverage expertise, not generic mentorship. Founders need access to people who've actually built, scaled, raised, and sold, tactical advice (pricing, unit economics, hiring, GTM, product strategy), fast iteration cycles, and honest feedback.",
    },
    {
      title: "Peers",
      description:
        "Other ambitious founders who push them and normalize high achievement. A strong peer group raises ambition, sharpens thinking, and normalizes velocity.",
    },
    {
      title: "Lifestyle",
      description:
        "An environment where living well and building hard can coexist. Good housing, schools, culture, recreation, and a rhythm of life that enables recovery and high performance are retention strategies.",
    },
    {
      title: "Topophilia",
      description:
        "Emotional and cultural affinity for place. Founders need to feel connected to the community through real relationships, traditions, identity, belonging, and a sense that their people are here. This emotional glue keeps founders in the region even when they start traveling for customers or raising capital.",
    },
  ];

  const startupsNeeds = [
    {
      title: "Talent",
      description:
        "Engineers, operators, designers, product people, and sales talent. A Series‑A‑bound startup becomes real when it has the team to execute. Access to the right people and the ability to recruit fast are the single biggest gating factors for scaling.",
    },
    {
      title: "Customers",
      description:
        "Early adopters plus pathways to enterprise‑level buyers. A startup lives or dies on its ability to get real customers. Series A is traction‑driven; customer access accelerates learning, revenue, and the storytelling needed for institutional capital.",
    },
    {
      title: "Capital",
      description:
        "Local and national investors who understand venture‑scale ambition. Startups need pre‑seed and seed capital to reach proof points, investors who understand technology and risk, a clear path to national VC firms, and local capital that is founder‑first.",
    },
    {
      title: "Organization",
      description:
        "The systems, hiring, process, and discipline expected at the series‑A level. To raise a true Series A, a startup must mature beyond raw hustle. Basic org structure, instrumentation, technical stability, and operational cadence convert early promise into scalable performance.",
    },
  ];

  const NeedsColumn = ({
    label,
    heading,
    needs,
  }: {
    label: string;
    heading: string;
    needs: { title: string; description: string }[];
  }) => (
    <div className="flex flex-col gap-4">
      <Eyebrow>{label}</Eyebrow>
      <SerifHeading as="h3" className="text-[26px] leading-none md:text-[30px]">
        {heading}
      </SerifHeading>
      <div className="mt-1 flex flex-col">
        {needs.map((need, i) => (
          <div
            key={need.title}
            className={
              "grid gap-1.5 border-t border-[#d8d2c5] py-5 " +
              (i === needs.length - 1 ? "border-b" : "")
            }
          >
            <h4 className="font-[family-name:var(--font-instrument-serif)] text-[22px] leading-none">
              {need.title}
            </h4>
            <p className="text-[14px] leading-[1.6] text-[#4a443a] [text-wrap:pretty]">
              {need.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="border-b border-[#16130f] bg-[#eae5da]">
      <Container className="py-16 lg:py-[72px]">
        <Eyebrow className="mb-4">The requirements</Eyebrow>
        <SerifHeading className="text-[32px] leading-none md:text-[40px]">
          What&apos;s needed.
        </SerifHeading>
        <p className="mt-6 max-w-[720px] text-[18px] leading-[1.6] text-[#4a443a] [text-wrap:pretty]">
          Producing 10 real Series‑A companies requires simultaneously supporting founders
          and startups with the right ingredients.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <NeedsColumn label="Founders need" heading="For the founder." needs={foundersNeeds} />
          <div className="lg:border-l lg:border-[#d3ccbd] lg:pl-16">
            <NeedsColumn label="Startups need" heading="For the company." needs={startupsNeeds} />
          </div>
        </div>
      </Container>
    </section>
  );
}
