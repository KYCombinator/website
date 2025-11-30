import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative bg-background-900 py-16 md:py-20">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 via-teal-600/10 to-cyan-600/10" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="relative bg-gradient-to-br from-background-800/50 to-background-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-1 w-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
            <span className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">
              Stay Connected
            </span>
            <div className="h-1 w-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
            Join Our Community
          </h2>
          <p className="text-lg md:text-xl text-gray-300 text-center mb-8 leading-relaxed">
            Connect with founders, get updates on events, and be part of Kentucky&apos;s startup ecosystem.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Join Slack Card */}
            <Link
              href="https://join.slack.com/t/kycombinator/shared_invite/zt-2viueybdu-QNv80gAKk~sJZ9paWebGVQ"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 hover:border-purple-500/60 transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-1.5 w-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                <h3 className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Join Slack
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed text-sm mb-4">
                Connect with founders, share resources, and stay in the loop with real-time community updates.
              </p>
              <div className="flex items-center text-purple-400 font-semibold group-hover:text-purple-300 transition-colors">
                <span>Join Now</span>
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </div>
            </Link>

            {/* Newsletter Card */}
            <div className="relative p-6 rounded-xl bg-gradient-to-br from-primary-500/10 to-primary-700/10 border border-primary-500/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-1.5 w-8 bg-gradient-to-r from-primary-500 to-primary-700 rounded-full" />
                <h3 className="text-xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
                  Newsletter
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed text-sm mb-4">
                Get the latest updates on events, programs, and startup news delivered to your inbox.
              </p>
              <div>
                <iframe
                  src="https://embeds.beehiiv.com/3cab38c3-d1b9-4443-bdb3-2a0de2d047a6?slim=true"
                  width="100%"
                  frameBorder="0"
                  scrolling="no"
                  style={{
                    borderRadius: "0.5rem",
                    backgroundColor: "transparent",
                  }}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

