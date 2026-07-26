import { Container, PageHero, SerifHeading } from "@/app/components/fm";

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of service."
        intro="The terms that govern your access to and use of KYX's services."
      />

      <section>
        <Container className="py-16 lg:py-20">
          <div className="max-w-[720px] flex flex-col gap-6">
            <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#7d766a]">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <div className="flex flex-col gap-3">
              <SerifHeading as="h2" className="text-[24px] md:text-[28px] mt-4">
                1. Agreement to Terms
              </SerifHeading>
              <p className="text-[15px] leading-[1.7] text-[#4a443a]">
                By accessing or using KYC&apos;s services, you agree to be bound
                by these Terms of Service. If you disagree with any part of the
                terms, you do not have permission to access our services.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <SerifHeading as="h2" className="text-[24px] md:text-[28px] mt-4">
                2. Use of Services
              </SerifHeading>
              <p className="text-[15px] leading-[1.7] text-[#4a443a]">
                Our services are provided for building and supporting the Kentucky
                startup ecosystem. You agree to use our services only for lawful
                purposes and in accordance with these Terms.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <SerifHeading as="h2" className="text-[24px] md:text-[28px] mt-4">
                3. Intellectual Property
              </SerifHeading>
              <p className="text-[15px] leading-[1.7] text-[#4a443a]">
                The service and its original content, features, and functionality
                are owned by KYC and are protected by international copyright,
                trademark, patent, trade secret, and other intellectual property
                laws.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <SerifHeading as="h2" className="text-[24px] md:text-[28px] mt-4">
                4. User Contributions
              </SerifHeading>
              <p className="text-[15px] leading-[1.7] text-[#4a443a]">
                Any content you contribute to our community must be accurate,
                lawful, and not violate the rights of any third party. We reserve
                the right to remove any content that violates these terms.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <SerifHeading as="h2" className="text-[24px] md:text-[28px] mt-4">
                5. Termination
              </SerifHeading>
              <p className="text-[15px] leading-[1.7] text-[#4a443a]">
                We may terminate or suspend your access to our services
                immediately, without prior notice or liability, for any reason
                whatsoever, including without limitation if you breach the Terms.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <SerifHeading as="h2" className="text-[24px] md:text-[28px] mt-4">
                6. Changes to Terms
              </SerifHeading>
              <p className="text-[15px] leading-[1.7] text-[#4a443a]">
                We reserve the right to modify or replace these Terms at any time.
                We will provide notice of any changes by posting the new Terms on
                this page.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <SerifHeading as="h2" className="text-[24px] md:text-[28px] mt-4">
                7. Contact Us
              </SerifHeading>
              <p className="text-[15px] leading-[1.7] text-[#4a443a]">
                If you have any questions about these Terms, please contact us.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
