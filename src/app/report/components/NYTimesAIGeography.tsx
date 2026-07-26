export default function NYTimesAIGeography() {
  return (
    <div className="space-y-8 text-[#16130f]">
      <section className="border border-[#d8d2c5] bg-[#eae5da] p-6">
        <h2 className="mb-4 text-lg font-semibold">Sources &amp; References</h2>
        <ul className="space-y-2">
          <li className="flex flex-wrap items-center gap-2">
            <a
              href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4874104"
              className="text-[var(--kyx-purple)] underline hover:opacity-70"
              target="_blank"
              rel="noopener noreferrer"
            >
              SSRN Research Paper
            </a>
            <a
              href="/reports/ssrn-4874104.pdf"
              download
              className="text-sm text-[#57503f] hover:opacity-70"
            >
              (Download PDF)
            </a>
          </li>
          <li>
            <a
              href="https://threadreaderapp.com/thread/1871946968148439260.html?utm_source=tldrnewsletter#google_vignette"
              className="text-[var(--kyx-purple)] underline hover:opacity-70"
              target="_blank"
              rel="noopener noreferrer"
            >
              Thread Reader Summary
            </a>
          </li>
          <li>
            <a
              href="https://www.nytimes.com/2024/12/26/technology/ai-economy-workers.html"
              className="text-[var(--kyx-purple)] underline hover:opacity-70"
              target="_blank"
              rel="noopener noreferrer"
            >
              Original NYTimes Article
            </a>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Overview</h2>
        <p className="mb-4 leading-[1.7] text-[#4a443a]">
          The New York Times analysis explores how artificial intelligence
          adoption could reshape America&apos;s economic geography, potentially
          benefiting midsize cities across the Midwest, Mid-Atlantic, and South
          regions. This shift could create new opportunities for economic growth
          outside traditional tech hubs.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">
          Key Advantages of Midsize Cities
        </h2>
        <div className="border border-[#d8d2c5] bg-[#eae5da] p-6">
          <ul className="list-inside list-disc space-y-2 text-[#4a443a]">
            <li>Educated workforce ready for AI adoption</li>
            <li>More affordable housing compared to major tech hubs</li>
            <li>Workers in industries less likely to be disrupted by AI</li>
            <li>Lower operating costs for businesses</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Case Study: Chattanooga</h2>
        <div className="border border-[#d8d2c5] bg-[#eae5da] p-6">
          <h3 className="mb-3 text-xl font-semibold">Success Stories</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="border border-[#d8d2c5] bg-[#f4f1ea] p-4">
              <h4 className="mb-2 font-semibold">Truck Parking Club</h4>
              <p className="text-[#57503f]">
                An &quot;Airbnb for truck parking&quot; startup demonstrating
                innovative use of technology
              </p>
            </div>
            <div className="border border-[#d8d2c5] bg-[#f4f1ea] p-4">
              <h4 className="mb-2 font-semibold">Shappi</h4>
              <p className="text-[#57503f]">
                A consumer goods shipping marketplace showing local tech
                ecosystem growth
              </p>
            </div>
            <div className="border border-[#d8d2c5] bg-[#f4f1ea] p-4">
              <h4 className="mb-2 font-semibold">EPB</h4>
              <p className="text-[#57503f]">
                City-owned utility offering quantum network access
              </p>
            </div>
            <div className="border border-[#d8d2c5] bg-[#f4f1ea] p-4">
              <h4 className="mb-2 font-semibold">Municipal AI</h4>
              <p className="text-[#57503f]">
                AI chatbot implementation for city services
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Broader Implications</h2>
        <div className="max-w-none leading-[1.7] text-[#4a443a]">
          <p>
            The spread of AI technology beyond traditional tech hubs represents
            a significant shift in America&apos;s economic landscape. This
            transformation could create new opportunities in regions that have
            historically struggled economically, following patterns similar to
            past technological shifts that reshaped American geography.
          </p>
          <p className="mt-4">
            As AI adoption increases, midsize cities could leverage these
            technologies to:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Increase local business productivity</li>
            <li>Attract remote workers and tech talent</li>
            <li>Develop specialized tech ecosystems</li>
            <li>Create new economic opportunities</li>
          </ul>
        </div>
      </section>

      <section className="border border-[#d8d2c5] bg-[#eae5da] p-6">
        <h2 className="mb-4 text-2xl font-bold">Looking Forward</h2>
        <p className="leading-[1.7] text-[#4a443a]">
          The research suggests that the geographic distribution of AI benefits
          could help create a more balanced national economy, with growth
          opportunities spread across multiple regions rather than concentrated
          in a few coastal tech hubs. This could lead to more sustainable and
          equitable economic development across the United States.
        </p>
      </section>
    </div>
  );
}
