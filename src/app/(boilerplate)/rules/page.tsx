import { Container, PageHero, SerifHeading } from "@/app/components/fm";

export default function RulesPage() {
  const rules = [
    {
      title: "Be Respectful",
      description:
        "Maintain respectful behavior toward all individuals on-site, including attendees, speakers, and staff. Discrimination, harassment, or offensive conduct of any kind will not be tolerated.",
    },
    {
      title: "Coworking Space Awareness",
      description:
        "Acknowledge that this is a coworking space with other people's personal and company possessions. Please act responsibly and avoid disturbing their work environment.",
    },
    {
      title: "No Smoking",
      description:
        "Smoking is strictly prohibited anywhere on the premises, including outdoor areas.",
    },
    {
      title: "No Alcohol",
      description:
        "Consumption or possession of alcohol is not allowed on the premises at any time.",
    },
    {
      title: "No Relationships",
      description:
        "Engaging in romantic or physical relationships on-site is not permitted. Maintain professionalism and appropriate boundaries.",
    },
    {
      title: "Restricted Hours",
      description: "No entry is allowed between 11:00 PM and 7:00 AM each day.",
    },
    {
      title: "Noise Control",
      description:
        "Keep noise levels to a minimum to respect others working on-site. Loud music or disruptive sounds are prohibited.",
    },
    {
      title: "Cleanliness",
      description:
        "Keep common areas, kitchens, and coworking spaces clean and tidy. Please clean up after yourself.",
    },
    {
      title: "No Dangerous Items",
      description:
        "Weapons, hazardous materials, or any dangerous objects are strictly prohibited on the premises.",
    },
    {
      title: "Emergency Protocols",
      description:
        "Familiarize yourself with emergency exits and protocols. In case of an emergency, notify staff immediately.",
    },
    {
      title: "Use of Equipment",
      description:
        "Only use shared equipment (such as office supplies, printers, or coffee machines) responsibly and return them to their proper place.",
    },
    {
      title: "Visitor Policy",
      description:
        "Unauthorized guests are not permitted without prior approval from management.",
    },
    {
      title: "Security",
      description:
        "Ensure doors remain secure when entering or leaving the premises. Report any suspicious behavior to staff.",
    },
    {
      title: "Compliance",
      description:
        "Follow all instructions from Story staff and adhere to venue policies at all times.",
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Community rules."
        intro="To create a safe, respectful, and productive environment for all participants, please review and acknowledge the following rules for staying on the Story premises. These rules are in place to protect everyone and maintain a professional atmosphere."
      />

      <section>
        <Container className="py-16 lg:py-20">
          <div className="max-w-[720px] flex flex-col">
            {rules.map((rule, index) => (
              <div
                key={index}
                className={
                  "grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-1.5 border-t border-[#d8d2c5] py-6 " +
                  (index === rules.length - 1 ? "border-b" : "")
                }
              >
                <span
                  aria-hidden
                  className="font-[family-name:var(--font-ibm-plex-mono)] text-[13px] tabular-nums text-[var(--kyx-purple)] pt-0.5"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="font-[family-name:var(--font-ibm-plex-sans)] text-[18px] font-medium text-[#16130f]">
                  {rule.title}
                </h2>
                <p className="col-start-2 text-[15px] leading-[1.7] text-[#4a443a]">
                  {rule.description}
                </p>
              </div>
            ))}

            <div className="mt-8 border border-[#d8d2c5] border-l-4 border-l-[var(--kyx-purple)] p-5">
              <p className="text-[15px] leading-[1.7] text-[#4a443a]">
                Violation of these rules may result in immediate removal from the
                premises and potential ban from future events. We take these rules
                seriously to ensure everyone&apos;s safety and comfort.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
