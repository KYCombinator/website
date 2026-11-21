"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { VelocityRecord, VelocityStatus } from "@/lib/gallery";
import TagEditor from "./TagEditor";
import TagFilterBar from "./TagFilterBar";

const metaCls =
  "font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#57503f]";

const STATUSES: VelocityStatus[] = ["new", "approved", "rejected"];

function fmtDate(iso: string) {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function StatusPill({ status }: { status: VelocityStatus }) {
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
      {status === "approved" ? "qualified" : status}
    </span>
  );
}

export default function VelocityManager({ items }: { items: VelocityRecord[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>([]);

  const allTags = [...new Set(items.flatMap((a) => a.tags ?? []))].sort();
  const filtered =
    selected.length === 0 ? items : items.filter((a) => (a.tags ?? []).some((t) => selected.includes(t)));
  const toggleTag = (t: string) =>
    setSelected((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]));

  async function setStatus(id: string, status: VelocityStatus) {
    if (busy) return;
    setBusy(id);
    try {
      const res = await fetch("/api/admin/velocity", {
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
    return <p className="text-[15px] text-[#4a443a]">No interest yet.</p>;
  }

  return (
    <div className="flex flex-col">
      <TagFilterBar all={allTags} selected={selected} onToggle={toggleTag} onClear={() => setSelected([])} count={filtered.length} total={items.length} />
      <div className="flex flex-col gap-5">
        {filtered.map((v) => {
          const pending = busy === v.id;
          return (
            <div key={v.id} className="border border-[#d8d2c5] p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <p className="font-[family-name:var(--font-instrument-serif)] text-[24px] leading-none text-[#16130f]">
                    {v.company}
                  </p>
                  <p className={metaCls}>
                    {v.founderName} · {v.email} · {fmtDate(v.createdAt)}
                  </p>
                </div>
                <StatusPill status={v.status} />
              </div>

              <dl className="mt-4 grid gap-2 sm:grid-cols-2">
                <div className="flex gap-2">
                  <dt className={metaCls}>Revenue</dt>
                  <dd className="text-[14px] text-[#4a443a]">{v.revenue}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className={metaCls}>Customers</dt>
                  <dd className="text-[14px] text-[#4a443a]">{v.customers}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className={metaCls}>Could start</dt>
                  <dd className="text-[14px] text-[#4a443a]">{v.quarter}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className={metaCls}>Confirmed</dt>
                  <dd className="text-[14px] text-[#4a443a]">
                    {[v.canTriple && "3×", v.canCommit && "12wk in-person", v.hasBacker && "backer"]
                      .filter(Boolean)
                      .join(" · ") || "—"}
                  </dd>
                </div>
              </dl>

              {v.metrics && (
                <p className="mt-3 whitespace-pre-wrap text-[15px] leading-[1.6] text-[#4a443a]">
                  <span className={metaCls}>Context:</span> {v.metrics}
                </p>
              )}

              <div className="mt-5 flex flex-wrap gap-2">
                {STATUSES.map((s) => {
                  const active = v.status === s;
                  const label = s === "approved" ? "qualified" : s;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setStatus(v.id, s)}
                      disabled={pending || active}
                      className={`inline-flex items-center justify-center px-4 py-2 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)] disabled:opacity-60 ${
                        active ? "bg-[#16130f] text-[#f4f1ea]" : "border border-[#cec7b8] text-[#16130f] hover:border-[#16130f]"
                      }`}
                    >
                      {active ? `● ${label}` : label}
                    </button>
                  );
                })}
              </div>

              <TagEditor kind="velocity" id={v.id} tags={v.tags ?? []} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
