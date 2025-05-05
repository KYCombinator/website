import { AlertTriangle, Check } from "lucide-react";

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
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Story Space Rules
            </h1>
            <p className="text-lg text-gray-600">
              To create a safe, respectful, and productive environment for all
              participants, please review and acknowledge the following rules
              for staying on the Story premises. These rules are in place to
              protect everyone and maintain a professional atmosphere.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="space-y-6">
              {rules.map((rule, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="mt-1">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {rule.title}
                    </h3>
                    <p className="mt-1 text-gray-600">{rule.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-yellow-50 rounded-lg flex gap-4">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
              <p className="text-yellow-700">
                Violation of these rules may result in immediate removal from
                the premises and potential ban from future events. We take these
                rules seriously to ensure everyone&apos;s safety and comfort.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
