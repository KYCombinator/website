"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { EventRecord } from "@/lib/gallery";

const fieldCls =
  "w-full border border-[#cec7b8] bg-transparent px-4 py-3 text-[15px] text-[#16130f] outline-none placeholder:text-[#a39c8d] focus:border-[#16130f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)]";
const labelCls =
  "font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.1em] text-[#57503f]";
const metaCls =
  "font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#57503f]";

const primaryBtn =
  "inline-flex items-center justify-center bg-[var(--kyx-purple)] px-4 py-2 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#f9f7f2] transition-colors duration-150 hover:bg-[#4f29a6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)] disabled:opacity-60";
const darkBtn =
  "inline-flex items-center justify-center bg-[#16130f] px-4 py-2 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#f4f1ea] transition-colors duration-150 hover:bg-[#2c2820] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)] disabled:opacity-60";
const outlineBtn =
  "inline-flex items-center justify-center border border-[#cec7b8] px-4 py-2 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#16130f] transition-colors duration-150 hover:border-[#16130f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)] disabled:opacity-60";
const destructiveBtn =
  "inline-flex items-center justify-center border border-[#e0b4ae] px-4 py-2 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#b3261e] transition-colors duration-150 hover:bg-[#f3e3e0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)] disabled:opacity-60";

type Draft = {
  id?: string;
  name: string;
  tagline: string;
  when: string;
  month: string;
  href: string;
  order: string;
  published: boolean;
};

const emptyDraft: Draft = {
  name: "",
  tagline: "",
  when: "",
  month: "",
  href: "/events",
  order: "",
  published: true,
};

function toDraft(e: EventRecord): Draft {
  return {
    id: e.id,
    name: e.name,
    tagline: e.tagline,
    when: e.when,
    month: e.month,
    href: e.href,
    order: String(e.order ?? ""),
    published: e.published,
  };
}

export default function EventsManager({ events }: { events: EventRecord[] }) {
  const router = useRouter();
  const [draft, setDraft] = useState<Draft | null>(null);
  const [busy, setBusy] = useState(false);

  const set =
    (k: keyof Draft) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value =
        e.target instanceof HTMLInputElement && e.target.type === "checkbox"
          ? e.target.checked
          : e.target.value;
      setDraft((d) => (d ? { ...d, [k]: value } : d));
    };

  async function save() {
    if (!draft || busy) return;
    if (!draft.name.trim()) return;
    setBusy(true);
    try {
      const res = await fetch("/api/admin/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: draft.id,
          name: draft.name,
          tagline: draft.tagline,
          when: draft.when,
          month: draft.month,
          href: draft.href,
          order: draft.order.trim() === "" ? undefined : Number(draft.order),
          published: draft.published,
        }),
      });
      if (res.ok) {
        setDraft(null);
        router.refresh();
      }
    } catch {
      // ignore
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    if (busy) return;
    if (!window.confirm("Delete this event? This cannot be undone.")) return;
    setBusy(true);
    try {
      const res = await fetch("/api/admin/events", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) router.refresh();
    } catch {
      // ignore
    } finally {
      setBusy(false);
    }
  }

  async function seed() {
    if (busy) return;
    setBusy(true);
    try {
      const res = await fetch("/api/admin/seed", { method: "POST" });
      if (res.ok) router.refresh();
    } catch {
      // ignore
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        <button type="button" className={primaryBtn} disabled={busy} onClick={() => setDraft({ ...emptyDraft })}>
          Add event
        </button>
        {events.length === 0 && (
          <button type="button" className={outlineBtn} disabled={busy} onClick={seed}>
            Seed default events
          </button>
        )}
      </div>

      {draft && (
        <div className="border border-[#d8d2c5] bg-[#eae5da] p-6">
          <p className={`${metaCls} mb-4`}>{draft.id ? "Edit event" : "New event"}</p>
          <div className="grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className={labelCls}>Name *</span>
                <input className={fieldCls} value={draft.name} onChange={set("name")} />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className={labelCls}>When</span>
                <input className={fieldCls} value={draft.when} onChange={set("when")} />
              </label>
            </div>
            <label className="flex flex-col gap-1.5">
              <span className={labelCls}>Tagline</span>
              <textarea className={`${fieldCls} min-h-[80px] resize-y`} value={draft.tagline} onChange={set("tagline")} />
            </label>
            <div className="grid gap-5 sm:grid-cols-3">
              <label className="flex flex-col gap-1.5">
                <span className={labelCls}>Month</span>
                <input className={fieldCls} value={draft.month} onChange={set("month")} placeholder="JAN" />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className={labelCls}>Order</span>
                <input className={fieldCls} value={draft.order} onChange={set("order")} type="number" inputMode="numeric" />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className={labelCls}>Href</span>
                <input className={fieldCls} value={draft.href} onChange={set("href")} placeholder="/events" />
              </label>
            </div>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={draft.published} onChange={set("published")} className="h-4 w-4 accent-[var(--kyx-purple)]" />
              <span className={labelCls}>Published</span>
            </label>
            <div className="flex gap-2">
              <button type="button" className={primaryBtn} disabled={busy} onClick={save}>
                {busy ? "Saving…" : "Save"}
              </button>
              <button type="button" className={outlineBtn} disabled={busy} onClick={() => setDraft(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {events.length === 0 ? (
        <p className="text-[15px] text-[#4a443a]">No events yet.</p>
      ) : (
        <div className="overflow-x-auto border border-[#d8d2c5]">
          <table className="w-full border-collapse text-left text-[14px]">
            <thead>
              <tr className="border-b border-[#d8d2c5]">
                {["Name", "When", "Month", "Order", "Published", ""].map((h, i) => (
                  <th key={i} className={`${metaCls} px-4 py-3`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {events.map((e) => (
                <tr key={e.id} className="border-b border-[#d8d2c5] align-top last:border-b-0">
                  <td className="px-4 py-3 text-[#16130f]">{e.name}</td>
                  <td className="px-4 py-3 text-[#4a443a]">{e.when}</td>
                  <td className="px-4 py-3 text-[#4a443a]">{e.month}</td>
                  <td className="px-4 py-3 text-[#4a443a]">{e.order}</td>
                  <td className="px-4 py-3 text-[#4a443a]">{e.published ? "yes" : "no"}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button type="button" className={darkBtn} disabled={busy} onClick={() => setDraft(toDraft(e))}>
                        Edit
                      </button>
                      <button type="button" className={destructiveBtn} disabled={busy} onClick={() => remove(e.id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
