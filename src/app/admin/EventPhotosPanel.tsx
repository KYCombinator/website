"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { PhotoRecord, PhotoStatus } from "@/lib/gallery";

const metaCls =
  "font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#57503f]";
const primaryBtn =
  "inline-flex items-center justify-center bg-[var(--kyx-purple)] px-3 py-1.5 font-[family-name:var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.08em] text-[#f9f7f2] transition-colors duration-150 hover:bg-[#4f29a6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)] disabled:opacity-60";
const outlineBtn =
  "inline-flex items-center justify-center border border-[#cec7b8] px-3 py-1.5 font-[family-name:var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.08em] text-[#16130f] transition-colors duration-150 hover:border-[#16130f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)] disabled:opacity-60";
const destructiveBtn =
  "inline-flex items-center justify-center border border-[#e0b4ae] px-3 py-1.5 font-[family-name:var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.08em] text-[#b3261e] transition-colors duration-150 hover:bg-[#f3e3e0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)] disabled:opacity-60";

const STATUS_STYLE: Record<PhotoStatus, string> = {
  approved: "bg-[var(--kyx-purple)] text-[#f9f7f2]",
  pending: "border border-[#d8d2c5] text-[#57503f]",
  rejected: "border border-[#e0b4ae] text-[#b3261e]",
};

function fmtDate(iso: string) {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

// Inspect / moderate / delete every photo attached to one event (all statuses).
export default function EventPhotosPanel({
  eventName,
  photos,
  onClose,
}: {
  eventName: string;
  photos: PhotoRecord[];
  onClose: () => void;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  async function setStatus(id: string, action: "approve" | "pending") {
    if (busy) return;
    setBusy(id);
    try {
      const res = await fetch("/api/admin/photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action }),
      });
      if (res.ok) router.refresh();
    } catch {
      // ignore
    } finally {
      setBusy(null);
    }
  }

  async function remove(id: string) {
    if (busy) return;
    if (!window.confirm("Delete this photo? This removes the file permanently and cannot be undone.")) {
      return;
    }
    setBusy(id);
    try {
      const res = await fetch("/api/admin/photos", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) router.refresh();
    } catch {
      // ignore
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="border border-[#d8d2c5] bg-[#eae5da] p-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className={metaCls}>
          Photos — {eventName} · {photos.length}
        </p>
        <button type="button" className={outlineBtn} onClick={onClose}>
          Close
        </button>
      </div>

      {photos.length === 0 ? (
        <p className="text-[15px] text-[#4a443a]">No photos for this event yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((p) => {
            const pending = busy === p.id;
            return (
              <div key={p.id} className="flex flex-col gap-3 border border-[#d8d2c5] bg-[#f4f1ea] p-3">
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.url}
                    alt=""
                    className="aspect-[4/3] w-full border border-[#d8d2c5] object-cover"
                    loading="lazy"
                  />
                </a>
                <div className="flex flex-col gap-1">
                  <span
                    className={
                      "w-fit px-2 py-0.5 font-[family-name:var(--font-ibm-plex-mono)] text-[9px] uppercase tracking-[0.1em] " +
                      STATUS_STYLE[p.status]
                    }
                  >
                    {p.status}
                  </span>
                  <p className={metaCls}>{p.submitterName || "—"}</p>
                  {p.submitterEmail && (
                    <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[10px] text-[#7d766a]">
                      {p.submitterEmail}
                    </p>
                  )}
                  <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[10px] text-[#7d766a]">
                    {fmtDate(p.createdAt)}
                  </p>
                </div>
                <div className="mt-auto flex flex-wrap gap-2">
                  {p.status === "approved" ? (
                    <button type="button" className={outlineBtn} disabled={pending} onClick={() => setStatus(p.id, "pending")}>
                      {pending ? "…" : "Unapprove"}
                    </button>
                  ) : (
                    <button type="button" className={primaryBtn} disabled={pending} onClick={() => setStatus(p.id, "approve")}>
                      {pending ? "…" : "Approve"}
                    </button>
                  )}
                  <button type="button" className={destructiveBtn} disabled={pending} onClick={() => remove(p.id)}>
                    {pending ? "…" : "Delete"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
