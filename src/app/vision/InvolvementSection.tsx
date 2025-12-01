export default function InvolvementSection() {
  const involvementOptions = [
    {
      title: "Leadership & Partnership",
      description: "Join the KYX Advisory Board, become a corporate partner, or sponsor events.",
      color: "from-blue-500 to-indigo-500",
      bgColor: "from-blue-500/10 to-indigo-500/10",
      borderColor: "border-blue-500/30",
    },
    {
      title: "Direct Support",
      description: "Share expertise as a speaker or mentor.",
      color: "from-indigo-500 to-purple-500",
      bgColor: "from-indigo-500/10 to-purple-500/10",
      borderColor: "border-indigo-500/30",
    },
    {
      title: "Community Action",
      description: "Volunteer at events to create the connective tissue that keeps the ecosystem alive.",
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-500/10 to-pink-500/10",
      borderColor: "border-purple-500/30",
    },
  ];

  return (
    <div className="relative mb-16">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 rounded-2xl blur-3xl" />
      <div className="relative bg-gradient-to-br from-background-800/50 to-background-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
          <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">
            Get Involved
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
          How to Get Involved
        </h2>
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
          There are multiple ways individuals and institutions can meaningfully contribute to the
          mission:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {involvementOptions.map((option, index) => (
            <div
              key={index}
              className={`relative p-6 rounded-xl bg-gradient-to-br ${option.bgColor} border ${option.borderColor} hover:border-opacity-60 transition-all duration-200 group`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`h-1.5 w-8 bg-gradient-to-r ${option.color} rounded-full`} />
                <h3 className={`text-xl font-bold bg-gradient-to-r ${option.color} bg-clip-text text-transparent`}>
                  {option.title}
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed text-sm">
                {option.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


