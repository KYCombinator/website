export default function KYCDemographic() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Historical Context</h2>
        <p className="mb-4">
          In 1950, Louisville was a major economic center in the Southeast United States. At the time, Louisville was:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>Nearly twice the size of Nashville (Nashville was 55.7% of Louisville)</li>
          <li>Larger than Atlanta (Atlanta was 116% of Louisville)</li>
          <li>Slightly larger than Indianapolis (Indianapolis was 95.7% of Louisville)</li>
          <li>Almost 4 times larger than Austin (Austin was just 27.8% of Louisville)</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">The Divergence</h2>
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4">By 1974</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Atlanta had grown to 180% of Louisville&apos;s size (80% larger)</li>
            <li>Nashville closed the gap (74.5% of Louisville&apos;s size)</li>
            <li>Indianapolis surpassed Louisville (136% of Louisville&apos;s size)</li>
            <li>Austin was gaining ground (42.2% of Louisville&apos;s size)</li>
          </ul>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">By 2020</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Atlanta exploded to 473% of Louisville&apos;s size (373% larger)</li>
            <li>Nashville surpassed Louisville (156.6% - now 56% larger)</li>
            <li>Indianapolis continued growing (164% - now 64% larger)</li>
            <li>Austin dramatically surpassed Louisville (177.7% - now 77% larger)</li>
          </ul>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-4">Data Visualization</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Interactive Population Growth Comparison</h3>
            <div className="relative w-full" style={{paddingTop: '56.25%'}}>
              <iframe
                src="https://kycombinator-public.s3.us-east-1.amazonaws.com/population_relative_animation.html"
                className="absolute top-0 left-0 w-full h-full border-0 rounded"
                title="Population Growth Animation"
              />
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Population Growth Projections</h3>
            <div className="relative w-full" style={{paddingTop: '56.25%'}}>
              <iframe
                src="https://kycombinator-public.s3.us-east-1.amazonaws.com/population_projections.html"
                className="absolute top-0 left-0 w-full h-full border-0 rounded"
                title="Population Projections"
              />
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Median Income Trends</h3>
            <div className="relative w-full" style={{paddingTop: '56.25%'}}>
              <iframe
                src="https://kycombinator-public.s3.us-east-1.amazonaws.com/median_income_relative_animation.html"
                className="absolute top-0 left-0 w-full h-full border-0 rounded"
                title="Median Income Animation"
              />
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Total Income Comparison</h3>
            <div className="relative w-full" style={{paddingTop: '56.25%'}}>
              <iframe
                src="https://kycombinator-public.s3.us-east-1.amazonaws.com/total_income_relative_animation_no_ny.html"
                className="absolute top-0 left-0 w-full h-full border-0 rounded"
                title="Total Income Animation"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Looking Forward</h2>
        <p className="mb-4">
          While some suggest Louisville could catch up to Nashville or Indianapolis within 10 years, the historical trends tell a different story. The data suggests that reaching Nashville&apos;s current position could take 30 years of sustained, intentional growth and development.
        </p>
        <p>
          Progress isn&apos;t achieved through pronouncements alone - it requires significant, sustained actionability and strategic investment in our community&apos;s future.
        </p>
      </section>
    </div>
  )
}
