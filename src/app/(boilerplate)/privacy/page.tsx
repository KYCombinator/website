import { Container, PageHero, SerifHeading } from "@/app/components/fm";

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy policy."
        intro="How we collect, use, and protect the information you share with us."
      />

      <section>
        <Container className="py-16 lg:py-20">
          <div className="max-w-[720px] flex flex-col gap-6">
            <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#7d766a]">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <div className="flex flex-col gap-3">
              <SerifHeading as="h2" className="text-[24px] md:text-[28px] mt-4">
                1. Information We Collect
              </SerifHeading>
              <p className="text-[15px] leading-[1.7] text-[#4a443a]">
                We collect information that you provide directly to us when using
                our services, including:
              </p>
              <ul className="list-disc pl-5 flex flex-col gap-1.5 text-[15px] leading-[1.7] text-[#4a443a] marker:text-[var(--kyx-purple)]">
                <li>Name and contact information</li>
                <li>Profile information</li>
                <li>Communications and interactions within our community</li>
                <li>
                  Information about your participation in events and programs
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <SerifHeading as="h2" className="text-[24px] md:text-[28px] mt-4">
                2. How We Use Your Information
              </SerifHeading>
              <p className="text-[15px] leading-[1.7] text-[#4a443a]">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-5 flex flex-col gap-1.5 text-[15px] leading-[1.7] text-[#4a443a] marker:text-[var(--kyx-purple)]">
                <li>Provide and improve our services</li>
                <li>Communicate with you about events and updates</li>
                <li>Facilitate community interactions</li>
                <li>Analyze and improve our platform&apos;s performance</li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <SerifHeading as="h2" className="text-[24px] md:text-[28px] mt-4">
                3. Information Sharing
              </SerifHeading>
              <p className="text-[15px] leading-[1.7] text-[#4a443a]">
                We do not sell your personal information. We may share your
                information with:
              </p>
              <ul className="list-disc pl-5 flex flex-col gap-1.5 text-[15px] leading-[1.7] text-[#4a443a] marker:text-[var(--kyx-purple)]">
                <li>Other community members (based on your privacy settings)</li>
                <li>Service providers who assist in our operations</li>
                <li>When required by law or to protect rights</li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <SerifHeading as="h2" className="text-[24px] md:text-[28px] mt-4">
                4. Data Security
              </SerifHeading>
              <p className="text-[15px] leading-[1.7] text-[#4a443a]">
                We implement reasonable security measures to protect your personal
                information. However, no method of transmission over the Internet
                is 100% secure.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <SerifHeading as="h2" className="text-[24px] md:text-[28px] mt-4">
                5. Your Rights
              </SerifHeading>
              <p className="text-[15px] leading-[1.7] text-[#4a443a]">
                You have the right to:
              </p>
              <ul className="list-disc pl-5 flex flex-col gap-1.5 text-[15px] leading-[1.7] text-[#4a443a] marker:text-[var(--kyx-purple)]">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of certain data collection</li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <SerifHeading as="h2" className="text-[24px] md:text-[28px] mt-4">
                6. Changes to Privacy Policy
              </SerifHeading>
              <p className="text-[15px] leading-[1.7] text-[#4a443a]">
                We may update this privacy policy from time to time. We will
                notify you of any changes by posting the new policy on this page.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <SerifHeading as="h2" className="text-[24px] md:text-[28px] mt-4">
                7. Contact Us
              </SerifHeading>
              <p className="text-[15px] leading-[1.7] text-[#4a443a]">
                If you have any questions about this Privacy Policy, please
                contact us.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
