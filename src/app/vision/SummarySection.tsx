import { Container, Eyebrow, SerifHeading } from "@/app/components/fm";

export default function SummarySection() {
  return (
    <section className="bg-[#16130f] text-[#f4f1ea]">
      <Container className="py-16 lg:py-[72px]">
        <Eyebrow className="mb-4">The bottom line</Eyebrow>
        <SerifHeading className="text-[32px] leading-none md:text-[40px]">
          In summary.
        </SerifHeading>
        <p className="mt-6 max-w-[760px] text-[18px] leading-[1.6] text-[#a5a094] [text-wrap:pretty] md:text-[19px]">
          KYX exists to{" "}
          <strong className="font-semibold text-[#f4f1ea]">
            turn Kentucky into a generator of venture‑backable, Series‑A‑worthy startups
          </strong>
          . KYX delivers the critical infrastructure required to produce Series‑A‑caliber
          companies: founder development, early validation, startup acceleration, talent
          pipelines, customer introductions, and capital readiness. In parallel, we engage
          community partners, corporations, and institutions to support and retain the next
          generation of high‑growth companies.
        </p>
      </Container>
    </section>
  );
}
