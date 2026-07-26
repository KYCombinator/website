import { Container, PageHero, SerifHeading } from "@/app/components/fm";

export default function WaiverPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Liability waiver."
        intro="Please read these agreements carefully before attending or submitting media."
      />

      <section>
        <Container className="py-16 lg:py-20">
          <div className="max-w-[720px] flex flex-col gap-10">
            {/* Liability Waiver Section */}
            <div className="flex flex-col gap-4">
              <SerifHeading as="h2" className="text-[24px] md:text-[28px]">
                Release and Waiver of Liability
              </SerifHeading>

              <p className="text-[15px] leading-[1.7] text-[#4a443a]">
                I, for myself and on behalf of my heirs and personal
                representatives, hereby{" "}
                <span className="font-medium text-[#16130f]">
                  RELEASE AND HOLD HARMLESS
                </span>{" "}
                KYC / Story / HackKentucky, its officers, employees, volunteers,
                sponsors, and agents (&quot;Releasees&quot;) from any and all
                claims, injuries, damages, losses or expenses I may suffer,{" "}
                <span className="font-medium text-[#16130f]">
                  WHETHER ARISING FROM NEGLIGENCE OR OTHERWISE
                </span>
                , to the fullest extent permitted by law.
              </p>

              <div className="border border-[#d8d2c5] border-l-4 border-l-[var(--kyx-purple)] p-5">
                <p className="text-[15px] leading-[1.7] text-[#4a443a]">
                  This waiver does not apply to claims arising from gross
                  negligence or willful misconduct of the Releasees.
                </p>
              </div>
            </div>

            {/* Media Consent Section */}
            <div className="flex flex-col gap-4">
              <SerifHeading as="h2" className="text-[24px] md:text-[28px]">
                Media Consent Agreement
              </SerifHeading>

              <p className="text-[15px] leading-[1.7] text-[#4a443a]">
                By attending and/or submitting media to KYC / Story /
                HackKentucky I agree to the following:
              </p>

              <p className="text-[15px] leading-[1.7] text-[#4a443a]">
                I authorize KYC / Story / HackKentucky to use, reproduce, and
                distribute any media (photos, videos, or audio) captured of me
                at the event or submitted by me. This includes, but is not
                limited to, promotional, educational, social media, print, or
                web content without restriction or compensation. I understand
                that my consent is granted indefinitely unless I withdraw it in
                writing.
              </p>
            </div>

            {/* Electronic Signature Notice */}
            <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#7d766a] border-t border-[#d8d2c5] pt-6">
              This waiver was last updated on March 1st, 2025 at 12:00 PM EST.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
