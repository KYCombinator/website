import React from "react";
import Link from "next/link";

const tools = [
  {
    name: "Mercury",
    description: "Mercury is a platform for online banking. It's the #1 bank for startups.",
    url: "https://mercury.com/r/kycombinator",
    youGet: "Get a $250 bonus when you sign up and deposit $10,000 in the first 90 days.",
    weGet: "We receive $250",
  },
  {
    name: "PayFwd",
    description: "PayFwd is a payroll platform for startups.",
    url: "https://payfwd.com/",
    youGet: "Get a $250 bonus when you sign up and deposit $10,000 in the first 90 days.",
    weGet: "We receive $250",
  }
];

export default function StartupToolsPage() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Startup Tools We Recommend</h1>
      <p className="text-gray-600 mb-8">
        These are tools we use and love. Some links may be affiliate or partner links, which means
        we might get a small benefit if you sign up — at no extra cost to you.
      </p>
      <div className="space-y-6">
        {tools.map((tool) => (
          <div
            key={tool.name}
            className="p-6 border rounded-lg shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-2xl font-semibold mb-2">{tool.name}</h2>
            <p className="text-gray-700 mb-3">{tool.description}</p>
            <div className="mb-2">
              <strong>What you get:</strong> <span className="text-gray-800">{tool.youGet}</span>
            </div>
            <div className="mb-4">
              <strong>What KYX gets:</strong> <span className="text-gray-800">{tool.weGet}</span>
            </div>
            <Link
              href={tool.url}
              className="text-blue-600 hover:underline"
              target="_blank"
            >
              Visit {tool.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
