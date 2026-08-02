"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldCls =
  "w-full border border-[#cec7b8] bg-transparent px-4 py-3 text-[15px] text-[#16130f] outline-none placeholder:text-[#a39c8d] focus:border-[#16130f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)]";
const labelCls =
  "font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.1em] text-[#57503f]";

export default function ApplyForm({
  defaultName = "",
  defaultEmail = "",
}: {
  defaultName?: string;
  defaultEmail?: string;
}) {
  const [form, setForm] = useState({
    name: defaultName,
    email: defaultEmail,
    company: "",
    building: "",
    links: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    if (!form.name.trim()) return fail("Your name is required.");
    if (!EMAIL_RE.test(form.email.trim())) return fail("Enter a valid email.");
    if (!form.building.trim()) return fail("Tell us what you're building.");

    setStatus("submitting");
    setMessage("");
    try {
      const res = await fetch("/api/cinderblock/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        const d = await res.json().catch(() => ({}));
        fail(d?.error || "Could not submit. Try again.");
      }
    } catch {
      fail("Could not submit. Try again.");
    }
  }
  function fail(m: string) {
    setStatus("error");
    setMessage(m);
  }

  if (status === "success") {
    return (
      <div className="border border-[#d8d2c5] bg-[#eae5da] p-8">
        <p className="font-[family-name:var(--font-instrument-serif)] text-[28px] leading-none text-[#16130f]">
          Application received.
        </p>
        <p className="mt-3 max-w-[520px] text-[15px] leading-[1.6] text-[#4a443a]">
          Thanks, {form.name.split(" ")[0] || "there"}. We read every application. If it&apos;s a
          fit, someone from KYX will be in touch.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex max-w-[620px] flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className={labelCls}>Your name *</span>
          <input className={fieldCls} value={form.name} onChange={set("name")} autoComplete="name" />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelCls}>Email *</span>
          <input className={fieldCls} value={form.email} onChange={set("email")} type="email" autoComplete="email" />
        </label>
      </div>
      <label className="flex flex-col gap-1.5">
        <span className={labelCls}>Company / project</span>
        <input className={fieldCls} value={form.company} onChange={set("company")} />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className={labelCls}>What are you building? *</span>
        <textarea className={`${fieldCls} min-h-[140px] resize-y`} value={form.building} onChange={set("building")} />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className={labelCls}>Links (site, GitHub, demo)</span>
        <input className={fieldCls} value={form.links} onChange={set("links")} placeholder="https://" />
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
          {status === "submitting" ? "Submitting…" : "Submit application"}
        </button>
      </div>
    </form>
  );
}
