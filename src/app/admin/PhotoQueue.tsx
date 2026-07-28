"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { PhotoRecord } from "@/lib/gallery";

const metaCls =
  "font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#57503f]";

function fmtDate(iso: string) {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export default function PhotoQueue({
  photos,
  eventNames,
}: {
  photos: PhotoRecord[];
  eventNames: Record<string, string>;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  async function act(id: string, action: "approve" | "reject") {
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

  if (photos.length === 0) {
    return <p className="text-[15px] text-[#4a443a]">No photos waiting.</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {photos.map((p) => {
        const pending = busy === p.id;
        return (
          <div key={p.id} className="flex flex-col gap-3 border border-[#d8d2c5] p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.url}
              alt=""
              className="aspect-[4/3] w-full object-cover border border-[#d8d2c5]"
              loading="lazy"
            />
            <div className="flex flex-col gap-1">
              <p className="font-[family-name:var(--font-instrument-serif)] text-[20px] leading-none text-[#16130f]">
                {eventNames[p.eventId] || p.eventId}
              </p>
              <p className={metaCls}>
                {p.submitterName} · {p.submitterEmail}
              </p>
              <p className={metaCls}>{fmtDate(p.createdAt)}</p>
            </div>
            <div className="mt-auto flex gap-2">
              <button
                type="button"
                onClick={() => act(p.id, "approve")}
                disabled={pending}
                className="inline-flex items-center justify-center bg-[var(--kyx-purple)] px-4 py-2 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#f9f7f2] transition-colors duration-150 hover:bg-[#4f29a6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)] disabled:opacity-60"
              >
                {pending ? "…" : "Approve"}
              </button>
              <button
                type="button"
                onClick={() => act(p.id, "reject")}
                disabled={pending}
                className="inline-flex items-center justify-center border border-[#e0b4ae] px-4 py-2 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#b3261e] transition-colors duration-150 hover:bg-[#f3e3e0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)] disabled:opacity-60"
              >
                {pending ? "…" : "Reject"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
