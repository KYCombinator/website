export default function WhyStartupsSection() {
  return (
    <div className="mb-16 space-y-12">
      {/* Why Focus on Startups Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 via-teal-600/10 to-cyan-600/10 rounded-2xl blur-3xl" />
        <div className="relative bg-gradient-to-br from-background-800/50 to-background-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-1 w-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
            <span className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">
              Our Focus
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Why Focus on Startups?
          </h2>
          <div className="space-y-6">
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Startups are the only type of company capable of generating the scale of impact
              KYX is designed to create. They drive job creation, wealth generation, a culture
              of innovation, increased capital flows into the region, and founder alumni who
              reinvest in the ecosystem. Small businesses and consultancies enrich the region
              but do not meaningfully shift the economic trajectory of a city or state. Startups
              do.
            </p>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed font-semibold bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-l-4 border-emerald-500 pl-6 py-4 rounded-r-lg">
              In summary: a startup is built for scale, speed and outsized impact. It&apos;s not defined
              by funding or headcount; it&apos;s defined by the founder&apos;s ambition and the company&apos;s
              ability to become something much bigger than it is today. That&apos;s why KYX focuses on
              startups—because those are the companies that create momentum, gravity, and
              long‑term transformation for Kentucky.
            </p>
          </div>
        </div>
      </div>

      {/* Out of Scope Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/10 via-orange-600/10 to-red-600/10 rounded-2xl blur-3xl" />
        <div className="relative bg-gradient-to-br from-background-800/50 to-background-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-1 w-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />
            <span className="text-sm font-semibold text-amber-400 uppercase tracking-wider">
              Our Boundaries
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            What&apos;s Out of Scope
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
            To stay disciplined, we explicitly exclude:
          </p>
          <ul className="space-y-4">
            <li className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-red-500/5 to-orange-500/5 border border-red-500/20 hover:border-red-500/40 transition-all duration-200">
              <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-red-500 to-orange-500 mt-2" />
              <div>
                <strong className="text-red-400 font-bold text-lg">Not Venture‑Backable</strong>
                <span className="text-gray-400 ml-2">—</span>
                <span className="text-gray-300 ml-2">
                  Great businesses, but not aligned with our mission.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-amber-500/5 to-yellow-500/5 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-200">
              <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 mt-2" />
              <div>
                <strong className="text-amber-400 font-bold text-lg">Funding Goldilocks</strong>
                <span className="text-gray-400 ml-2">—</span>
                <span className="text-gray-300 ml-2">
                  We avoid &quot;just enough money to survive but not enough to grow.&quot;
                </span>
              </div>
            </li>
            <li className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-orange-500/5 to-red-500/5 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-200">
              <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 mt-2" />
              <div>
                <strong className="text-orange-400 font-bold text-lg">Committees / Initiatives</strong>
                <span className="text-gray-400 ml-2">—</span>
                <span className="text-gray-300 ml-2">
                  We&apos;re not building economic development theater.
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

