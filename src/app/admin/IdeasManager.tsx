"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { IdeaRecord, IdeaStatus } from "@/lib/gallery";

const metaCls =
  "font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#57503f]";

const STATUSES: IdeaStatus[] = ["new", "approved", "rejected"];

function fmtDate(iso: string) {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function StatusPill({ status }: { status: IdeaStatus }) {
  return (
    <span
      className={`inline-flex items-center border px-2.5 py-1 font-[family-name:var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.1em] ${
        status === "new"
          ? "border-[var(--kyx-purple)] text-[var(--kyx-purple)]"
          : status === "approved"
          ? "border-[#16130f] bg-[#16130f] text-[#f4f1ea]"
          : "border-[#e0b4ae] text-[#b3261e]"
      }`}
    >
      {status}
    </span>
  );
}

export default function IdeasManager({ items }: { items: IdeaRecord[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  async function setStatus(id: string, status: IdeaStatus) {
    if (busy) return;
    setBusy(id);
    try {
      const res = await fetch("/api/admin/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) router.refresh();
    } catch {
      // ignore
    } finally {
      setBusy(null);
    }
  }

  if (items.length === 0) {
    return <p className="text-[15px] text-[#4a443a]">No ideas yet.</p>;
  }

  return (
    <div className="flex flex-col gap-5">
      {items.map((it) => {
        const pending = busy === it.id;
        return (
          <div key={it.id} className="border border-[#d8d2c5] p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex flex-col gap-1">
                <p className={metaCls}>
                  {it.submitterEmail || "anonymous"} · {fmtDate(it.createdAt)}
                </p>
              </div>
              <StatusPill status={it.status} />
            </div>

            <p className="mt-3 whitespace-pre-wrap text-[16px] leading-[1.6] text-[#16130f]">
              {it.idea}
            </p>
            {it.twist && (
              <p className="mt-3 whitespace-pre-wrap text-[14px] leading-[1.6] text-[#4a443a]">
                <span className={metaCls}>Twist:</span> {it.twist}
              </p>
            )}

            <div className="mt-5 flex flex-wrap gap-2">
              {STATUSES.map((s) => {
                const active = it.status === s;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatus(it.id, s)}
                    disabled={pending || active}
                    className={`inline-flex items-center justify-center px-4 py-2 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)] disabled:opacity-60 ${
                      active
                        ? "bg-[#16130f] text-[#f4f1ea]"
                        : "border border-[#cec7b8] text-[#16130f] hover:border-[#16130f]"
                    }`}
                  >
                    {active ? `● ${s}` : s}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
