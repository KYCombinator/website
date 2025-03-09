export default function NYTimesAIGeography() {
  return (
    <div className="space-y-8">
      <section className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Sources & References</h2>
        <ul className="space-y-2">
          <li>
            <a 
              href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4874104"
              className="text-blue-600 hover:underline flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              SSRN Research Paper
              <a 
                href="/reports/ssrn-4874104.pdf" 
                download
                className="text-sm text-purple-600 hover:text-purple-800"
              >
                (Download PDF)
              </a>
            </a>
          </li>
          <li>
            <a 
              href="https://threadreaderapp.com/thread/1871946968148439260.html?utm_source=tldrnewsletter#google_vignette"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Thread Reader Summary
            </a>
          </li>
          <li>
            <a 
              href="https://www.nytimes.com/2024/12/26/technology/ai-economy-workers.html"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Original NYTimes Article
            </a>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Overview</h2>
        <p className="mb-4">
          The New York Times analysis explores how artificial intelligence adoption could reshape America&apos;s economic geography, potentially benefiting midsize cities across the Midwest, Mid-Atlantic, and South regions. This shift could create new opportunities for economic growth outside traditional tech hubs.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Key Advantages of Midsize Cities</h2>
        <div className="bg-gray-50 p-6 rounded-lg">
          <ul className="list-disc list-inside space-y-2">
            <li>Educated workforce ready for AI adoption</li>
            <li>More affordable housing compared to major tech hubs</li>
            <li>Workers in industries less likely to be disrupted by AI</li>
            <li>Lower operating costs for businesses</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Case Study: Chattanooga</h2>
        <div className="bg-purple-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Success Stories</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded shadow">
              <h4 className="font-semibold mb-2">Truck Parking Club</h4>
              <p className="text-gray-600">An &quot;Airbnb for truck parking&quot; startup demonstrating innovative use of technology</p>
            </div>
            <div className="p-4 bg-white rounded shadow">
              <h4 className="font-semibold mb-2">Shappi</h4>
              <p className="text-gray-600">A consumer goods shipping marketplace showing local tech ecosystem growth</p>
            </div>
            <div className="p-4 bg-white rounded shadow">
              <h4 className="font-semibold mb-2">EPB</h4>
              <p className="text-gray-600">City-owned utility offering quantum network access</p>
            </div>
            <div className="p-4 bg-white rounded shadow">
              <h4 className="font-semibold mb-2">Municipal AI</h4>
              <p className="text-gray-600">AI chatbot implementation for city services</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Broader Implications</h2>
        <div className="prose max-w-none">
          <p>
            The spread of AI technology beyond traditional tech hubs represents a significant shift in America&apos;s economic landscape. This transformation could create new opportunities in regions that have historically struggled economically, following patterns similar to past technological shifts that reshaped American geography.
          </p>
          <p className="mt-4">
            As AI adoption increases, midsize cities could leverage these technologies to:
          </p>
          <ul className="mt-2">
            <li>Increase local business productivity</li>
            <li>Attract remote workers and tech talent</li>
            <li>Develop specialized tech ecosystems</li>
            <li>Create new economic opportunities</li>
          </ul>
        </div>
      </section>

      <section className="bg-blue-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Looking Forward</h2>
        <p>
          The research suggests that the geographic distribution of AI benefits could help create a more balanced national economy, with growth opportunities spread across multiple regions rather than concentrated in a few coastal tech hubs. This could lead to more sustainable and equitable economic development across the United States.
        </p>
      </section>
    </div>
  )
}
