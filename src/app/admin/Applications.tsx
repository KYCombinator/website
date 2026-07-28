"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ApplicationRecord, AppStatus } from "@/lib/gallery";

const metaCls =
  "font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#57503f]";

const STATUSES: AppStatus[] = ["new", "reviewed", "archived"];

function fmtDate(iso: string) {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
}

function StatusPill({ status }: { status: AppStatus }) {
  return (
    <span
      className={`inline-flex items-center border px-2.5 py-1 font-[family-name:var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.1em] ${
        status === "new"
          ? "border-[var(--kyx-purple)] text-[var(--kyx-purple)]"
          : status === "reviewed"
          ? "border-[#16130f] text-[#16130f]"
          : "border-[#cec7b8] text-[#8a8272]"
      }`}
    >
      {status}
    </span>
  );
}

export default function Applications({ items }: { items: ApplicationRecord[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  async function setStatus(id: string, status: AppStatus) {
    if (busy) return;
    setBusy(id);
    try {
      const res = await fetch("/api/admin/applications", {
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
    return <p className="text-[15px] text-[#4a443a]">No applications yet.</p>;
  }

  return (
    <div className="flex flex-col gap-5">
      {items.map((a) => {
        const pending = busy === a.id;
        return (
          <div key={a.id} className="border border-[#d8d2c5] p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex flex-col gap-1">
                <p className="font-[family-name:var(--font-instrument-serif)] text-[24px] leading-none text-[#16130f]">
                  {a.name}
                </p>
                <p className={metaCls}>
                  {a.email}
                  {a.company ? ` · ${a.company}` : ""}
                </p>
                <p className={metaCls}>{fmtDate(a.createdAt)}</p>
              </div>
              <StatusPill status={a.status} />
            </div>

            {a.building && (
              <p className="mt-4 whitespace-pre-wrap text-[15px] leading-[1.6] text-[#4a443a]">
                {a.building}
              </p>
            )}

            {a.links && (
              <p className="mt-3 text-[14px] break-words text-[#16130f]">
                {a.links.split(/\s+/).filter(Boolean).map((l, i) => {
                  const href = /^https?:/.test(l) ? l : `https://${l}`;
                  return (
                    <a
                      key={i}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mr-3 inline-block border-b border-[var(--kyx-purple)] pb-0.5 hover:opacity-70"
                    >
                      {l}
                    </a>
                  );
                })}
              </p>
            )}

            <div className="mt-5 flex flex-wrap gap-2">
              {STATUSES.map((s) => {
                const active = a.status === s;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatus(a.id, s)}
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
