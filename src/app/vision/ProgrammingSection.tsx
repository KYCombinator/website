export default function ProgrammingSection() {
  const mainPrograms = [
    { name: "Jan – KYX Internship Program", status: "new", tagline: "Working at one company is low agency" },
    { name: "Feb – HackKentucky Main", status: "active", tagline: "Sleep is low agency" },
    { name: "Mar – Build n' Chill", status: "discontinued", note: "will be discontinued" },
    { name: "April – Casino Night", status: "new", tagline: "Luck is low agency" },
    { name: "May – Relocate", status: "new", tagline: "SF is low agency" },
    { name: "Sept – HacktheTrack", status: "active", note: "partnership", tagline: "Spectating is low agency" },
    { name: "Sept – Velocity", status: "active", tagline: "Pre-Revenue is low agency" },
    { name: "Sept – Rally Innovation Conference", status: "active", tagline: "Linkedin is low agency" },
    { name: "Sept – HackKentucky – Fall Cincinnati", status: "new", tagline: "Sleep is low agency" },
    { name: "Oct – Block Party", status: "active", tagline: "Netflix & Chill is low agency" },
    { name: "Nov – HackKentucky Fall", status: "discontinued", note: "moving to September in Cincinnati" },
    { name: "Dec – Velocity Demo Day / The LOUIES", status: "active", tagline: "Pre-Revenue is low agency" },
  ];

  const communityPrograms = [
    { name: "Fire & Ice", status: "active", tagline: "Comfort is low agency" },
    { name: "Vibe Code / Poker Night", status: "active", tagline: "Loneliness is low agency" },
    { name: "Speaker Series", status: "new", tagline: "Complacency is low agency" },
  ];

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "discontinued":
        return {
          text: "text-red-400",
          bg: "bg-red-500/10",
          border: "border-red-500/30",
          bullet: "bg-red-500",
        };
      case "new":
        return {
          text: "text-green-400",
          bg: "bg-green-500/10",
          border: "border-green-500/30",
          bullet: "bg-green-500",
        };
      default:
        return {
          text: "text-gray-300",
          bg: "bg-gray-500/5",
          border: "border-gray-500/20",
          bullet: "bg-gray-500",
        };
    }
  };

  const ProgramList = ({ programs, title, description }: { programs: typeof mainPrograms; title: string; description: string }) => (
    <div className="mb-8">
      <h3 className="text-2xl font-semibold mb-2 text-white">{title}</h3>
      <p className="mb-4 text-gray-400 text-sm">{description}</p>
      <ul className="space-y-2">
        {programs.map((program, index) => {
          const styles = getStatusStyles(program.status);
          return (
            <li
              key={index}
              className={`flex items-start gap-3 p-3 rounded-lg ${styles.bg} ${styles.border} border transition-all duration-200`}
            >
              <div className={`flex-shrink-0 w-2 h-2 rounded-full ${styles.bullet} mt-2`} />
              <div className="flex-1">
                <div className="flex items-center flex-wrap gap-2">
                  <span className={`${styles.text} font-medium`}>
                    {program.name}
                  </span>
                  {program.note && (
                    <span className="text-gray-500 text-sm">({program.note})</span>
                  )}
                  {program.status === "new" && (
                    <span className="px-2 py-0.5 text-xs font-semibold bg-green-500/20 text-green-400 rounded border border-green-500/30">
                      NEW
                    </span>
                  )}
                  {program.status === "discontinued" && (
                    <span className="px-2 py-0.5 text-xs font-semibold bg-red-500/20 text-red-400 rounded border border-red-500/30">
                      DISCONTINUED
                    </span>
                  )}
                </div>
                {program.tagline && (
                  <p className="text-gray-400 text-sm italic mt-1">
                    {program.tagline}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <div className="relative mb-16">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 via-amber-600/10 to-yellow-600/10 rounded-2xl blur-3xl" />
      <div className="relative bg-gradient-to-br from-background-800/50 to-background-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-1 w-12 bg-gradient-to-r from-primary-500 to-primary-900 rounded-full" />
          <span className="text-sm font-semibold text-primary-400 uppercase tracking-wider">
            Our Programs
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
          KYX Programming
        </h2>

        <ProgramList
          programs={mainPrograms}
          title="Main Programs"
          description="These are headline events which are large initiatives for the community"
        />

        <ProgramList
          programs={communityPrograms}
          title="Community Programs"
          description="These programs foster community engagement and culture"
        />
      </div>
    </div>
  );
}

