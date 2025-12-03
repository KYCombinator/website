export default function SummarySection() {
  return (
    <div className="relative mb-16">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 via-blue-600/10 to-indigo-600/10 rounded-2xl blur-3xl" />
      <div className="relative bg-gradient-to-br from-background-800/50 to-background-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-1 w-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
          <span className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">
            The Bottom Line
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
          In Summary
        </h2>
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-4xl">
          KYX exists to <strong className="text-white font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            turn Kentucky into a generator of venture‑backable, Series‑A‑worthy startups
          </strong>. KYX delivers the critical infrastructure required
          to produce Series‑A‑caliber companies: founder development, early validation,
          startup acceleration, talent pipelines, customer introductions, and capital
          readiness. In parallel, we engage community partners, corporations, and
          institutions to support and retain the next generation of high‑growth
          companies.
        </p>
      </div>
    </div>
  );
}






