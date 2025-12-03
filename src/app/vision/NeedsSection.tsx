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

  return (
    <div className="relative mb-16">
      <div className="absolute inset-0 bg-gradient-to-r from-teal-600/10 via-cyan-600/10 to-blue-600/10 rounded-2xl blur-3xl" />
      <div className="relative bg-gradient-to-br from-background-800/50 to-background-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-1 w-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full" />
          <span className="text-sm font-semibold text-teal-400 uppercase tracking-wider">
            The Requirements
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
          What&apos;s Needed
        </h2>
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
          Producing 10 real Series‑A companies requires simultaneously supporting founders
          and startups with the right ingredients.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Founders Need Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/5 via-teal-600/5 to-cyan-600/5 rounded-xl blur-xl" />
            <div className="relative bg-gradient-to-br from-background-800/30 to-background-900/30 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-1 w-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
                <h3 className="text-2xl font-bold text-white">Founders Need</h3>
              </div>
              <ul className="space-y-4">
                {foundersNeeds.map((need, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 mt-2" />
                    <div>
                      <strong className="text-emerald-400 font-bold text-lg block mb-1">
                        {need.title}
                      </strong>
                      <p className="text-gray-300 leading-relaxed text-sm">
                        {need.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Startups Need Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/5 via-blue-600/5 to-indigo-600/5 rounded-xl blur-xl" />
            <div className="relative bg-gradient-to-br from-background-800/30 to-background-900/30 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-1 w-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
                <h3 className="text-2xl font-bold text-white">Startups Need</h3>
              </div>
              <ul className="space-y-4">
                {startupsNeeds.map((need, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 mt-2" />
                    <div>
                      <strong className="text-cyan-400 font-bold text-lg block mb-1">
                        {need.title}
                      </strong>
                      <p className="text-gray-300 leading-relaxed text-sm">
                        {need.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}






