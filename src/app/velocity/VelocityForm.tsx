"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const QUARTERS = ["Q1 2027", "Q2 2027", "Q3 2027", "Q4 2027", "Flexible — whenever it runs"];

const fieldCls =
  "w-full border border-[#cec7b8] bg-transparent px-4 py-3 text-[15px] text-[#16130f] outline-none placeholder:text-[#a39c8d] focus:border-[#16130f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)]";
const labelCls =
  "font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.1em] text-[#57503f]";

const REQUIREMENTS: { key: "canTriple" | "canCommit" | "hasBacker"; label: string }[] = [
  { key: "canTriple", label: "We can 3× our revenue and customers within 12 weeks." },
  { key: "canCommit", label: "At least one founder can commit to 12 weeks in-person at Cinderblock." },
  { key: "hasBacker", label: "We can secure a backer / mentor for the program." },
];

export default function VelocityForm() {
  const [form, setForm] = useState({
    company: "",
    founderName: "",
    email: "",
    revenue: "",
    customers: "",
    metrics: "",
    quarter: "",
  });
  const [reqs, setReqs] = useState({ canTriple: false, canCommit: false, hasBacker: false });
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  function fail(m: string) {
    setStatus("error");
    setMessage(m);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    if (!form.company.trim()) return fail("Company name is required.");
    if (!form.founderName.trim()) return fail("Founder name is required.");
    if (!EMAIL_RE.test(form.email.trim())) return fail("A valid email is required.");
    if (!form.revenue.trim()) return fail("Add your current revenue.");
    if (!form.customers.trim()) return fail("Add your current customer count.");
    if (!form.quarter) return fail("Pick when you could start.");
    if (!reqs.canTriple || !reqs.canCommit || !reqs.hasBacker)
      return fail("Please confirm all three requirements to qualify.");

    setStatus("submitting");
    setMessage("");
    try {
      const res = await fetch("/api/velocity/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, ...reqs }),
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

  if (status === "success") {
    return (
      <div className="max-w-[640px] border border-[#d8d2c5] bg-[#eae5da] p-8">
        <p className="font-[family-name:var(--font-instrument-serif)] text-[28px] leading-none text-[#16130f]">
          Interest noted — thank you.
        </p>
        <p className="mt-3 max-w-[520px] text-[15px] leading-[1.6] text-[#4a443a]">
          We&apos;re gauging interest for Velocity 2.0. We&apos;ll reach out to{" "}
          <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[#16130f]">{form.email}</span>{" "}
          with next steps once the cohort firms up.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex max-w-[640px] flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className={labelCls}>Company name *</span>
          <input className={fieldCls} value={form.company} onChange={set("company")} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelCls}>Founder name *</span>
          <input className={fieldCls} value={form.founderName} onChange={set("founderName")} autoComplete="name" />
        </label>
      </div>
      <label className="flex flex-col gap-1.5">
        <span className={labelCls}>Email *</span>
        <input className={fieldCls} value={form.email} onChange={set("email")} type="email" autoComplete="email" />
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className={labelCls}>Current revenue *</span>
          <input className={fieldCls} value={form.revenue} onChange={set("revenue")} placeholder="e.g. $2K MRR" />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelCls}>Current customers *</span>
          <input className={fieldCls} value={form.customers} onChange={set("customers")} placeholder="e.g. 8 paying" />
        </label>
      </div>
      <label className="flex flex-col gap-1.5">
        <span className={labelCls}>Other current metrics / context</span>
        <textarea className={`${fieldCls} min-h-[100px] resize-y`} value={form.metrics} onChange={set("metrics")} placeholder="Growth rate, what you're building, anything else worth knowing." />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className={labelCls}>When could you start the cohort? *</span>
        <select className={fieldCls} value={form.quarter} onChange={set("quarter")}>
          <option value="">Select…</option>
          {QUARTERS.map((q) => (
            <option key={q} value={q}>
              {q}
            </option>
          ))}
        </select>
      </label>

      <fieldset className="flex flex-col gap-3 border border-[#d8d2c5] p-5">
        <legend className={`${labelCls} px-1`}>Can you meet the requirements? *</legend>
        {REQUIREMENTS.map((r) => (
          <label key={r.key} className="flex items-start gap-3 text-[15px] leading-[1.5] text-[#16130f]">
            <input
              type="checkbox"
              checked={reqs[r.key]}
              onChange={(e) => setReqs((s) => ({ ...s, [r.key]: e.target.checked }))}
              className="mt-1 h-4 w-4 shrink-0 accent-[var(--kyx-purple)]"
            />
            <span>{r.label}</span>
          </label>
        ))}
      </fieldset>

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
          {status === "submitting" ? "Submitting…" : "Register interest"}
        </button>
      </div>
    </form>
  );
}
