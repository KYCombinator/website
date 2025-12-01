export default function VisionHero() {
  return (
    <div className="mb-16 space-y-12">
      {/* Vision Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-2xl blur-3xl" />
        <div className="relative bg-gradient-to-br from-background-800/50 to-background-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
            <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">
              Our Vision
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            Vision
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-4xl">
            Build Kentucky into a regional startup powerhouse where ambitious founders can
            start, scale, and stay—creating a self-sustaining engine of venture‑backable
            companies and economic dynamism.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-orange-600/10 rounded-2xl blur-3xl" />
        <div className="relative bg-gradient-to-br from-background-800/50 to-background-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-1 w-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
            <span className="text-sm font-semibold text-purple-400 uppercase tracking-wider">
              Our Mission
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Mission
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Grow high-agency, high-velocity founders in Louisville.
          </p>
        </div>
      </div>

      {/* KYX Path Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 via-red-600/10 to-pink-600/10 rounded-2xl blur-3xl" />
        <div className="relative bg-gradient-to-br from-background-800/50 to-background-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-1 w-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full" />
            <span className="text-sm font-semibold text-orange-400 uppercase tracking-wider">
              The Path Forward
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            KYX: The Path to 10 Venture‑Backable Series A Startups
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Our north star is simple and measurable:{" "}
            <strong className="text-white font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              create 10 venture‑backable, Series‑A‑ready startups in Kentucky by 2030
            </strong>
            . Everything KYX does—community, programming, partnerships, capital formation—is
            purpose‑built around turning that outcome into reality.
          </p>
        </div>
      </div>
    </div>
  );
}


