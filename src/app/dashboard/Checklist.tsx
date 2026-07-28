"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Onboarding } from "@/lib/gallery";
import { SLACK_INVITE } from "@/app/site";

const NEWSLETTER_URL = "https://kycombinator.beehiiv.com/";

type Item = { key: keyof Onboarding; label: string; href: string; external: boolean };
const ITEMS: Item[] = [
  { key: "slack", label: "Join the Slack", href: SLACK_INVITE, external: true },
  { key: "newsletter", label: "Subscribe to the newsletter", href: NEWSLETTER_URL, external: true },
  { key: "event", label: "Attend an event", href: "/events", external: false },
];

export default function Checklist({ onboarding }: { onboarding: Onboarding }) {
  const router = useRouter();
  const [state, setState] = useState<Onboarding>({
    slack: !!onboarding.slack,
    newsletter: !!onboarding.newsletter,
    event: !!onboarding.event,
  });
  const [busy, setBusy] = useState(false);

  async function toggle(key: keyof Onboarding) {
    if (busy) return;
    const next = { ...state, [key]: !state[key] };
    setState(next); // optimistic
    setBusy(true);
    try {
      await fetch("/api/member/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ onboarding: next }),
      });
      router.refresh();
    } catch {
      setState(state); // revert
    }
    setBusy(false);
  }

  const done = ITEMS.filter((i) => state[i.key]).length;

  return (
    <div className="flex flex-col">
      <p className="mb-4 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#7d766a]">
        {done} of {ITEMS.length} done
      </p>
      <ul className="flex flex-col">
        {ITEMS.map((item, i) => {
          const checked = !!state[item.key];
          return (
            <li
              key={item.key}
              className={
                "flex items-center gap-4 border-t border-[#d8d2c5] py-4 " +
                (i === ITEMS.length - 1 ? "border-b" : "")
              }
            >
              <button
                type="button"
                role="checkbox"
                aria-checked={checked}
                aria-label={`Mark "${item.label}" ${checked ? "not done" : "done"}`}
                onClick={() => toggle(item.key)}
                disabled={busy}
                className={
                  "flex h-6 w-6 shrink-0 items-center justify-center border transition-colors " +
                  (checked
                    ? "border-[var(--kyx-purple)] bg-[var(--kyx-purple)] text-[#f9f7f2]"
                    : "border-[#cec7b8] text-transparent hover:border-[#16130f]")
                }
              >
                ✓
              </button>
              <span
                className={
                  "flex-1 text-[16px] " +
                  (checked ? "text-[#7d766a] line-through" : "text-[#16130f]")
                }
              >
                {item.label}
              </span>
              <a
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--kyx-purple)] underline-offset-2 hover:underline"
              >
                Open →
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
