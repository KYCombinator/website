"use client";

import { useRef, useState } from "react";
import type { IntakeConfig } from "./intake";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ACCEPT = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 15 * 1024 * 1024;

const fieldCls =
  "w-full border border-[#cec7b8] bg-transparent px-4 py-3 text-[15px] text-[#16130f] outline-none placeholder:text-[#a39c8d] focus:border-[#16130f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)]";
const labelCls =
  "font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.1em] text-[#57503f]";

// One form for any HackKentucky get-involved kind. Name + Email are always
// present and required; the rest come from the kind's config. Public — the
// email links the submission to that person (no login).
export default function IntakeForm({ config }: { config: IntakeConfig }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [values, setValues] = useState<Record<string, string>>({});
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const logoRef = useRef<HTMLInputElement>(null);

  const setVal = (n: string, v: string) => setValues((s) => ({ ...s, [n]: v }));
  function fail(m: string) {
    setStatus("error");
    setMessage(m);
  }

  function pickLogo(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!ACCEPT.includes(f.type)) return fail("Logo must be JPEG, PNG, or WebP.");
    if (f.size > MAX_BYTES) return fail("Logo must be under 15 MB.");
    setLogo(f);
    setLogoPreview(URL.createObjectURL(f));
    if (status === "error") {
      setStatus("idle");
      setMessage("");
    }
  }

  async function uploadLogo(f: File): Promise<string> {
    const r = await fetch("/api/gallery/upload-url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contentType: f.type }),
    });
    if (!r.ok) throw new Error("upload-url");
    const { key, uploadUrl } = await r.json();
    const put = await fetch(uploadUrl, { method: "PUT", body: f, headers: { "Content-Type": f.type } });
    if (!put.ok) throw new Error("s3");
    return key;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    if (!name.trim()) return fail("Your name is required.");
    if (!EMAIL_RE.test(email.trim())) return fail("A valid email is required.");
    for (const f of config.fields) {
      if (f.required && !(values[f.name] || "").trim()) return fail(`${f.label} is required.`);
    }

    setStatus("submitting");
    setMessage("");
    try {
      const fields = config.fields
        .map((f) => ({ label: f.label, value: (values[f.name] || "").trim() }))
        .filter((f) => f.value);
      const payload: Record<string, unknown> = {
        kind: config.kind,
        name: name.trim(),
        email: email.trim(),
        fields,
      };
      if (config.logo && logo) payload.logoKey = await uploadLogo(logo);

      const res = await fetch("/api/hackkentucky/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
      <div className="max-w-[620px] border border-[#d8d2c5] bg-[#eae5da] p-8">
        <p className="font-[family-name:var(--font-instrument-serif)] text-[28px] leading-none text-[#16130f]">
          Got it — thank you.
        </p>
        <p className="mt-3 max-w-[520px] text-[15px] leading-[1.6] text-[#4a443a]">
          Your {config.eyebrow.toLowerCase()} submission is in. We&apos;ll be in touch at{" "}
          <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[#16130f]">{email}</span>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex max-w-[620px] flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className={labelCls}>Your name *</span>
          <input className={fieldCls} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelCls}>Email *</span>
          <input className={fieldCls} value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" />
        </label>
      </div>

      {config.fields.map((f) => (
        <label key={f.name} className="flex flex-col gap-1.5">
          <span className={labelCls}>
            {f.label}
            {f.required ? " *" : ""}
          </span>
          {f.type === "textarea" ? (
            <textarea
              className={`${fieldCls} min-h-[110px] resize-y`}
              value={values[f.name] || ""}
              onChange={(e) => setVal(f.name, e.target.value)}
              placeholder={f.placeholder}
            />
          ) : f.type === "select" ? (
            <select className={fieldCls} value={values[f.name] || ""} onChange={(e) => setVal(f.name, e.target.value)}>
              <option value="">Select…</option>
              {f.options?.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          ) : (
            <input
              className={fieldCls}
              value={values[f.name] || ""}
              onChange={(e) => setVal(f.name, e.target.value)}
              placeholder={f.placeholder}
            />
          )}
        </label>
      ))}

      {config.logo && (
        <div className="flex flex-col gap-1.5">
          <span className={labelCls}>Logo (optional)</span>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden border border-[#d8d2c5] bg-[#eae5da]">
              {logoPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoPreview} alt="" className="h-full w-full object-contain" />
              ) : (
                <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[10px] uppercase text-[#a39c8d]">Logo</span>
              )}
            </div>
            <input ref={logoRef} type="file" accept={ACCEPT.join(",")} onChange={pickLogo} className="hidden" />
            <button
              type="button"
              onClick={() => logoRef.current?.click()}
              className="inline-flex items-center border border-[#cec7b8] px-4 py-2.5 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#16130f] transition-colors duration-150 hover:border-[#16130f]"
            >
              {logoPreview ? "Change logo" : "Upload logo"}
            </button>
          </div>
        </div>
      )}

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
          {status === "submitting" ? "Submitting…" : config.submitLabel}
        </button>
      </div>
    </form>
  );
}
