"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const QUARTERS = ["Q1 2027", "Q2 2027", "Q3 2027", "Q4 2027", "Flexible — whenever it runs"];

const CRITERIA = [
  "3× our revenue and customers within the 12-week sprint.",
  "At least one founder working in-person at Cinderblock for all 12 weeks.",
  "A qualified backer / mentor secured — we can introduce you, but won't assign one.",
];

const fieldCls =
  "w-full border border-[#cec7b8] bg-transparent px-4 py-3 text-[15px] text-[#16130f] outline-none placeholder:text-[#a39c8d] focus:border-[#16130f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)]";
const labelCls =
  "font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.1em] text-[#57503f]";

export default function VelocityForm() {
  const [form, setForm] = useState({
    company: "",
    founderName: "",
    email: "",
    revenue: "",
    customers: "",
    metrics: "",
  });
  const [quarters, setQuarters] = useState<string[]>([]);
  const [acknowledged, setAcknowledged] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const toggleQuarter = (q: string) =>
    setQuarters((s) => (s.includes(q) ? s.filter((x) => x !== q) : [...s, q]));

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
    if (quarters.length === 0) return fail("Pick at least one time you could start.");
    if (!acknowledged) return fail("Please acknowledge the criteria to qualify.");

    setStatus("submitting");
    setMessage("");
    try {
      const res = await fetch("/api/velocity/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, quarters, acknowledged }),
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

      <fieldset className="flex flex-col gap-3 border border-[#d8d2c5] p-5">
        <legend className={`${labelCls} px-1`}>When could you start? Pick all that work *</legend>
        {QUARTERS.map((q) => (
          <label key={q} className="flex items-center gap-3 text-[15px] leading-[1.5] text-[#16130f]">
            <input
              type="checkbox"
              checked={quarters.includes(q)}
              onChange={() => toggleQuarter(q)}
              className="h-4 w-4 shrink-0 accent-[var(--kyx-purple)]"
            />
            <span>{q}</span>
          </label>
        ))}
      </fieldset>

      <fieldset className="flex flex-col gap-3 border border-[#d8d2c5] p-5">
        <legend className={`${labelCls} px-1`}>Acknowledge the criteria *</legend>
        <p className="text-[14px] leading-[1.5] text-[#57503f]">To qualify, your company must reach:</p>
        <ul className="flex flex-col gap-1.5 pl-1">
          {CRITERIA.map((c) => (
            <li key={c} className="flex gap-2 text-[15px] leading-[1.5] text-[#16130f]">
              <span className="text-[var(--kyx-purple)]">—</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
        <label className="mt-1 flex items-start gap-3 border-t border-[#e2ddd1] pt-3 text-[15px] leading-[1.5] text-[#16130f]">
          <input
            type="checkbox"
            checked={acknowledged}
            onChange={(e) => setAcknowledged(e.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 accent-[var(--kyx-purple)]"
          />
          <span>I understand these criteria and acknowledge my company is prepared to meet them.</span>
        </label>
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
