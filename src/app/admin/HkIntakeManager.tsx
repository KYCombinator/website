"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { HkIntakeRecord, HkStatus, HkKind } from "@/lib/gallery";
import TagEditor from "./TagEditor";
import TagFilterBar from "./TagFilterBar";

const metaCls =
  "font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#57503f]";

const STATUSES: HkStatus[] = ["new", "approved", "rejected"];
const KINDS: (HkKind | "all")[] = ["all", "sponsor", "bounty", "speak", "volunteer"];

function fmtDate(iso: string) {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function StatusPill({ status }: { status: HkStatus }) {
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

export default function HkIntakeManager({ items }: { items: HkIntakeRecord[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [kind, setKind] = useState<HkKind | "all">("all");
  const [selected, setSelected] = useState<string[]>([]);

  const allTags = [...new Set(items.flatMap((a) => a.tags ?? []))].sort();
  const filtered = items.filter((a) => {
    if (kind !== "all" && a.kind !== kind) return false;
    if (selected.length > 0 && !(a.tags ?? []).some((t) => selected.includes(t))) return false;
    return true;
  });
  const toggleTag = (t: string) =>
    setSelected((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]));

  async function setStatus(id: string, status: HkStatus) {
    if (busy) return;
    setBusy(id);
    try {
      const res = await fetch("/api/admin/hkintake", {
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
    return <p className="text-[15px] text-[#4a443a]">No submissions yet.</p>;
  }

  return (
    <div className="flex flex-col">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className={metaCls}>Form</span>
        {KINDS.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setKind(k)}
            aria-pressed={kind === k}
            className={
              "border px-2.5 py-1 font-[family-name:var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.08em] transition-colors duration-150 " +
              (kind === k
                ? "border-[#16130f] bg-[#16130f] text-[#f4f1ea]"
                : "border-[#cec7b8] text-[#16130f] hover:border-[#16130f]")
            }
          >
            {k}
          </button>
        ))}
        <span className={metaCls}>
          · {filtered.length} of {items.length}
        </span>
      </div>

      <TagFilterBar all={allTags} selected={selected} onToggle={toggleTag} onClear={() => setSelected([])} count={filtered.length} total={items.length} />

      <div className="flex flex-col gap-5">
        {filtered.map((it) => {
          const pending = busy === it.id;
          return (
            <div key={it.id} className="border border-[#d8d2c5] p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  {it.logoUrl && (
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden border border-[#d8d2c5] bg-[#f4f1ea]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={it.logoUrl} alt="" className="h-full w-full object-contain" />
                    </div>
                  )}
                  <div className="flex flex-col gap-1">
                    <p className="font-[family-name:var(--font-instrument-serif)] text-[22px] leading-none text-[#16130f]">
                      {it.name}
                      <span className="ml-2 align-middle font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[var(--kyx-purple)]">
                        {it.kind}
                      </span>
                    </p>
                    <p className={metaCls}>
                      {it.email} · {fmtDate(it.createdAt)}
                    </p>
                  </div>
                </div>
                <StatusPill status={it.status} />
              </div>

              {it.fields.length > 0 && (
                <dl className="mt-4 flex flex-col gap-2">
                  {it.fields.map((f, i) => (
                    <div key={i} className="grid gap-0.5 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-4">
                      <dt className={metaCls}>{f.label}</dt>
                      <dd className="whitespace-pre-wrap text-[15px] leading-[1.55] text-[#4a443a]">{f.value}</dd>
                    </div>
                  ))}
                </dl>
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
                        active ? "bg-[#16130f] text-[#f4f1ea]" : "border border-[#cec7b8] text-[#16130f] hover:border-[#16130f]"
                      }`}
                    >
                      {active ? `● ${s}` : s}
                    </button>
                  );
                })}
              </div>

              <TagEditor kind="hkintake" id={it.id} tags={it.tags ?? []} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
