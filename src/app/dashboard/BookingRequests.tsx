"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export type Requester = { email: string; name: string };

const primaryBtn =
  "inline-flex items-center justify-center bg-[var(--kyx-purple)] px-4 py-2 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#f9f7f2] transition-colors duration-150 hover:bg-[#4f29a6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)] disabled:opacity-60";
const outlineBtn =
  "inline-flex items-center justify-center border border-[#cec7b8] px-4 py-2 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#16130f] transition-colors duration-150 hover:border-[#16130f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)] disabled:opacity-60";
const destructiveBtn =
  "inline-flex items-center justify-center border border-[#e0b4ae] px-4 py-2 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#b3261e] transition-colors duration-150 hover:bg-[#f3e3e0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)] disabled:opacity-60";
const metaCls =
  "font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#7d766a]";

function Row({ r, children }: { r: Requester; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#d8d2c5] py-4 last:border-b">
      <div className="flex flex-col">
        <span className="text-[15px] font-medium text-[#16130f]">{r.name}</span>
        <span className={metaCls}>{r.email}</span>
      </div>
      <div className="flex gap-2">{children}</div>
    </div>
  );
}

// Manage who can see your booking link: approve/deny incoming requests and
// revoke standing access. Lives on the member dashboard.
export default function BookingRequests({
  pending,
  approved,
}: {
  pending: Requester[];
  approved: Requester[];
}) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  async function respond(requester: string, action: "approve" | "deny") {
    if (busy) return;
    setBusy(requester);
    try {
      const res = await fetch("/api/member/booking-access/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requester, action }),
      });
      if (res.ok) router.refresh();
    } catch {
      // ignore
    } finally {
      setBusy(null);
    }
  }

  if (pending.length === 0 && approved.length === 0) {
    return (
      <p className="text-[15px] leading-[1.6] text-[#4a443a]">
        No booking requests yet. When someone asks to book time with you, approve or deny it here.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {pending.length > 0 && (
        <div className="flex flex-col">
          <span className={`${metaCls} mb-1`}>Pending · {pending.length}</span>
          {pending.map((r) => (
            <Row key={r.email} r={r}>
              <button type="button" className={primaryBtn} disabled={busy === r.email} onClick={() => respond(r.email, "approve")}>
                {busy === r.email ? "…" : "Approve"}
              </button>
              <button type="button" className={outlineBtn} disabled={busy === r.email} onClick={() => respond(r.email, "deny")}>
                Deny
              </button>
            </Row>
          ))}
        </div>
      )}

      {approved.length > 0 && (
        <div className="flex flex-col">
          <span className={`${metaCls} mb-1`}>Has access · {approved.length}</span>
          {approved.map((r) => (
            <Row key={r.email} r={r}>
              <button type="button" className={destructiveBtn} disabled={busy === r.email} onClick={() => respond(r.email, "deny")}>
                {busy === r.email ? "…" : "Revoke"}
              </button>
            </Row>
          ))}
        </div>
      )}
    </div>
  );
}
