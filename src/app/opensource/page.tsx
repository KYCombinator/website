import { Container, PageHero, Eyebrow, SerifHeading, Button } from "../components/fm";

const GUIDELINES: [string, string][] = [
  [
    "1. Code of Conduct",
    "We are committed to providing a welcoming and inspiring community for all. Please read and follow our Code of Conduct to help us create a positive environment for everyone.",
  ],
  [
    "2. Contributing Guidelines",
    "We welcome contributions from the community! Please read our contributing guidelines before submitting pull requests or opening issues.",
  ],
  [
    "3. License",
    "This project is licensed under the MIT License - see the LICENSE file for details.",
  ],
];

export default function OpenSourcePage() {
  return (
    <>
      <PageHero
        eyebrow="Open source"
        title="Built in the open."
        intro="KYC is proud to be an open source project. We believe in transparency, collaboration, and community-driven development."
      >
        <Button href="https://github.com/KYCombinator/" variant="dark">
          View on GitHub
        </Button>
      </PageHero>

      {/* Repository */}
      <section className="border-b border-[#16130f]">
        <Container className="grid grid-cols-1 gap-8 py-16 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-14 lg:py-[72px]">
          <div className="flex flex-col gap-3">
            <Eyebrow>Repository</Eyebrow>
            <SerifHeading className="text-[32px] leading-none md:text-[40px]">
              Our GitHub.
            </SerifHeading>
          </div>
          <div className="flex flex-col items-start gap-6">
            <p className="max-w-[640px] text-[16px] leading-[1.6] text-[#4a443a] [text-wrap:pretty]">
              You can find our source code and contribute to the project on GitHub.
            </p>
            <a
              href="https://github.com/KYCombinator/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#16130f] px-6 py-4 font-[family-name:var(--font-ibm-plex-mono)] text-[12px] uppercase tracking-[0.08em] text-[#f4f1ea] transition-colors duration-150 hover:bg-[#2c2820] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)]"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View on GitHub
            </a>
          </div>
        </Container>
      </section>

      {/* Guidelines */}
      <section className="border-b border-[#16130f] bg-[#eae5da]">
        <Container className="grid grid-cols-1 gap-8 py-16 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-14 lg:py-[72px]">
          <div className="flex flex-col gap-3">
            <Eyebrow>Ground rules</Eyebrow>
            <SerifHeading className="text-[32px] leading-none md:text-[40px]">
              Open source guidelines.
            </SerifHeading>
          </div>
          <div className="flex flex-col">
            {GUIDELINES.map(([term, desc], i) => (
              <div
                key={term}
                className={
                  "grid gap-2 border-t border-[#d8d2c5] py-6 " +
                  (i === GUIDELINES.length - 1 ? "border-b" : "")
                }
              >
                <h3 className="font-[family-name:var(--font-ibm-plex-sans)] text-[18px] font-medium text-[#16130f]">
                  {term}
                </h3>
                <p className="max-w-[640px] text-[15px] leading-[1.65] text-[#4a443a]">
                  {desc}
                </p>
              </div>
            ))}
            <div className="grid gap-2 border-t border-b border-[#d8d2c5] py-6">
              <h3 className="font-[family-name:var(--font-ibm-plex-sans)] text-[18px] font-medium text-[#16130f]">
                4. Getting Started
              </h3>
              <p className="max-w-[640px] text-[15px] leading-[1.65] text-[#4a443a]">
                To get started with development:
              </p>
              <ol className="mt-1 max-w-[640px] list-inside list-decimal text-[15px] leading-[1.65] text-[#4a443a]">
                <li>Fork the repository</li>
                <li>Create your feature branch</li>
                <li>Commit your changes</li>
                <li>Push to the branch</li>
                <li>Create a new Pull Request</li>
              </ol>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
