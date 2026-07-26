import { Container, PageHero, Eyebrow, SerifHeading } from "@/app/components/fm";

export default function VisionHero() {
  return (
    <>
      <PageHero
        eyebrow="Our vision"
        title="Start, scale, and stay."
        intro="Build Kentucky into a regional startup powerhouse where ambitious founders can start, scale, and stay—creating a self-sustaining engine of venture-backable companies and economic dynamism."
      />

      {/* Mission + the path forward */}
      <section className="border-b border-[#16130f]">
        <Container className="grid grid-cols-1 gap-12 py-16 lg:grid-cols-2 lg:gap-16 lg:py-[72px]">
          <div className="flex flex-col gap-[18px]">
            <Eyebrow>Our mission</Eyebrow>
            <SerifHeading className="text-[32px] leading-none md:text-[40px]">
              Mission.
            </SerifHeading>
            <p className="text-[18px] leading-[1.6] text-[#4a443a] [text-wrap:pretty]">
              Grow high-agency, high-velocity founders in Louisville.
            </p>
          </div>
          <div className="flex flex-col gap-[18px] lg:border-l lg:border-[#d8d2c5] lg:pl-16">
            <Eyebrow>The path forward</Eyebrow>
            <SerifHeading className="text-[32px] leading-none md:text-[40px]">
              KYX: the path to 10 venture-backable Series A startups.
            </SerifHeading>
            <p className="text-[16px] leading-[1.6] text-[#4a443a] [text-wrap:pretty]">
              Our north star is simple and measurable:{" "}
              <strong className="font-semibold text-[#16130f]">
                create 10 venture-backable, Series-A-ready startups in Kentucky by 2030
              </strong>
              . Everything KYX does—community, programming, partnerships, capital
              formation—is purpose-built around turning that outcome into reality.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
