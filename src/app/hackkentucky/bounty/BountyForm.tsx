"use client";

import { useRef, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const ACCEPT = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 15 * 1024 * 1024;

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
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState("");
  const logoRef = useRef<HTMLInputElement>(null);

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

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
    if (!form.title.trim()) return fail("Give the bounty a title.");
    if (!form.build.trim()) return fail("Describe what to build.");

    setStatus("submitting");
    setMessage("");
    try {
      const payload: Record<string, unknown> = { ...form };
      if (logo) payload.logoKey = await uploadLogo(logo);
      const res = await fetch("/api/member/bounty", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ sponsor: "", title: "", build: "", prize: "", judging: "", links: "" });
        setLogo(null);
        setLogoPreview("");
        if (logoRef.current) logoRef.current.value = "";
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
      <div className="flex flex-col gap-1.5">
        <span className={labelCls}>Sponsor logo (optional)</span>
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
