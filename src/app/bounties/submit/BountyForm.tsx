"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const fieldCls =
  "w-full border border-[#cec7b8] bg-transparent px-4 py-3 text-[15px] text-[#16130f] outline-none placeholder:text-[#a39c8d] focus:border-[#16130f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)]";
const labelCls =
  "font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.1em] text-[#57503f]";

export default function BountyForm() {
  const [form, setForm] = useState({
    sponsor: "",
    title: "",
    build: "",
    prize: "",
    judging: "",
    links: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  function fail(m: string) {
    setStatus("error");
    setMessage(m);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    if (!form.title.trim()) return fail("Give the bounty a title.");
    if (!form.build.trim()) return fail("Describe what to build.");

    setStatus("submitting");
    setMessage("");
    try {
      const res = await fetch("/api/member/bounty", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ sponsor: "", title: "", build: "", prize: "", judging: "", links: "" });
      } else {
        const d = await res.json().catch(() => ({}));
        fail(d?.error || "Could not submit. Try again.");
      }
    } catch {
      fail("Could not submit. Try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="max-w-[620px] border border-[#d8d2c5] bg-[#eae5da] p-8">
        <p className="font-[family-name:var(--font-instrument-serif)] text-[28px] leading-none text-[#16130f]">
          Bounty received.
        </p>
        <p className="mt-3 max-w-[520px] text-[15px] leading-[1.6] text-[#4a443a]">
          Thanks — we review every bounty. Once it&apos;s approved it&apos;ll be part of the
          challenge lineup.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 inline-flex items-center justify-center border border-[#cec7b8] px-5 py-3 font-[family-name:var(--font-ibm-plex-mono)] text-[12px] uppercase tracking-[0.08em] text-[#16130f] transition-colors duration-150 hover:border-[#16130f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)]"
        >
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex max-w-[620px] flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className={labelCls}>Sponsor / organization</span>
          <input className={fieldCls} value={form.sponsor} onChange={set("sponsor")} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelCls}>Bounty title *</span>
          <input className={fieldCls} value={form.title} onChange={set("title")} />
        </label>
      </div>
      <label className="flex flex-col gap-1.5">
        <span className={labelCls}>What should hackers build? *</span>
        <textarea className={`${fieldCls} min-h-[140px] resize-y`} value={form.build} onChange={set("build")} />
      </label>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className={labelCls}>Prize / reward</span>
          <input className={fieldCls} value={form.prize} onChange={set("prize")} placeholder="e.g. $500 + swag" />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelCls}>Resource links (API, docs, repo)</span>
          <input className={fieldCls} value={form.links} onChange={set("links")} placeholder="https://" />
        </label>
      </div>
      <label className="flex flex-col gap-1.5">
        <span className={labelCls}>How to win (judging criteria)</span>
        <textarea className={`${fieldCls} min-h-[100px] resize-y`} value={form.judging} onChange={set("judging")} />
      </label>

      {status === "error" && (
        <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[12px] text-[#b3261e]" role="alert">
          {message}
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center bg-[var(--kyx-purple)] px-6 py-4 font-[family-name:var(--font-ibm-plex-mono)] text-[12px] uppercase tracking-[0.08em] text-[#f9f7f2] transition-colors duration-150 hover:bg-[#4f29a6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)] disabled:opacity-60"
        >
          {status === "submitting" ? "Submitting…" : "Submit bounty"}
        </button>
      </div>
    </form>
  );
}
