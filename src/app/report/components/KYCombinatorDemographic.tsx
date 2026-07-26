const MONO_LABEL =
  "font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.14em] text-[var(--kyx-purple)]";
const SERIF_HEADING =
  "font-[family-name:var(--font-instrument-serif)] tracking-[-0.02em] text-[#16130f]";

const DIVERGENCE_1974 = [
  "Atlanta had grown to 180% of Louisville's size (80% larger)",
  "Nashville closed the gap (74.5% of Louisville's size)",
  "Indianapolis surpassed Louisville (136% of Louisville's size)",
  "Austin was gaining ground (42.2% of Louisville's size)",
];

const DIVERGENCE_2020 = [
  "Atlanta exploded to 473% of Louisville's size (373% larger)",
  "Nashville surpassed Louisville (156.6% - now 56% larger)",
  "Indianapolis continued growing (164% - now 64% larger)",
  "Austin dramatically surpassed Louisville (177.7% - now 77% larger)",
];

const CHARTS = [
  {
    title: "Interactive Population Growth Comparison",
    src: "https://kycombinator-public.s3.us-east-1.amazonaws.com/population_relative_animation.html",
    label: "Population Growth Animation",
  },
  {
    title: "Population Growth Projections",
    src: "https://kycombinator-public.s3.us-east-1.amazonaws.com/population_projections.html",
    label: "Population Projections",
  },
  {
    title: "Median Income Trends",
    src: "https://kycombinator-public.s3.us-east-1.amazonaws.com/median_income_relative_animation.html",
    label: "Median Income Animation",
  },
  {
    title: "Total Income Comparison",
    src: "https://kycombinator-public.s3.us-east-1.amazonaws.com/total_income_relative_animation_no_ny.html",
    label: "Total Income Animation",
  },
];

function RuledList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col">
      {items.map((item, i) => (
        <li
          key={item}
          className={
            "flex gap-3 border-t border-[#d8d2c5] py-3 text-[15px] leading-[1.6] text-[#4a443a] " +
            (i === items.length - 1 ? "border-b" : "")
          }
        >
          <span aria-hidden className="text-[var(--kyx-purple)]">
            —
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function KYCDemographic() {
  return (
    <div className="flex flex-col gap-14">
      <section className="flex flex-col gap-4">
        <p className={MONO_LABEL}>Historical Context</p>
        <h2 className={`${SERIF_HEADING} text-[30px] leading-none md:text-[36px]`}>
          A major economic center.
        </h2>
        <p className="text-[16px] leading-[1.7] text-[#4a443a]">
          In 1950, Louisville was a major economic center in the Southeast
          United States. At the time, Louisville was:
        </p>
        <RuledList
          items={[
            "Nearly twice the size of Nashville (Nashville was 55.7% of Louisville)",
            "Larger than Atlanta (Atlanta was 116% of Louisville)",
            "Slightly larger than Indianapolis (Indianapolis was 95.7% of Louisville)",
            "Almost 4 times larger than Austin (Austin was just 27.8% of Louisville)",
          ]}
        />
      </section>

      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <p className={MONO_LABEL}>The Divergence</p>
          <h2 className={`${SERIF_HEADING} text-[30px] leading-none md:text-[36px]`}>
            The gap widens.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="border border-[#d8d2c5] bg-[#eae5da] p-6">
            <h3 className={`${SERIF_HEADING} mb-3 text-[24px] leading-none`}>
              By 1974
            </h3>
            <RuledList items={DIVERGENCE_1974} />
          </div>
          <div className="border border-[#d8d2c5] bg-[#eae5da] p-6">
            <h3 className={`${SERIF_HEADING} mb-3 text-[24px] leading-none`}>
              By 2020
            </h3>
            <RuledList items={DIVERGENCE_2020} />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <p className={MONO_LABEL}>Data Visualization</p>
          <h2 className={`${SERIF_HEADING} text-[30px] leading-none md:text-[36px]`}>
            The numbers, moving.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {CHARTS.map((chart) => (
            <div key={chart.src} className="border border-[#d8d2c5] p-6">
              <h3 className="mb-3 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.14em] text-[#57503f]">
                {chart.title}
              </h3>
              <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                <iframe
                  src={chart.src}
                  className="absolute left-0 top-0 h-full w-full border-0"
                  title={chart.label}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-l-2 border-[var(--kyx-purple)] pl-6">
        <p className={`${MONO_LABEL} mb-3`}>Looking Forward</p>
        <p className="mb-4 text-[16px] leading-[1.7] text-[#4a443a]">
          While some suggest Louisville could catch up to Nashville or
          Indianapolis within 10 years, the historical trends tell a different
          story. The data suggests that reaching Nashville&apos;s current
          position could take 30 years of sustained, intentional growth and
          development.
        </p>
        <p className="text-[16px] leading-[1.7] text-[#4a443a]">
          Progress isn&apos;t achieved through pronouncements alone - it
          requires significant, sustained actionability and strategic investment
          in our community&apos;s future.
        </p>
      </section>
    </div>
  );
}
