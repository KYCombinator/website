"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export type Profile = {
  name: string;
  company: string;
  bookingLink: string;
  photoUrl: string;
};

const field =
  "w-full border border-[#cec7b8] bg-transparent px-4 py-3 text-[15px] text-[#16130f] outline-none placeholder:text-[#a39c8d] focus:border-[#16130f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)]";
const labelCls =
  "font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.1em] text-[#57503f]";
const ACCEPT = ["image/jpeg", "image/png", "image/webp"];

export default function ProfileForm({ profile }: { profile: Profile }) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(profile.name);
  const [company, setCompany] = useState(profile.company);
  const [bookingLink, setBookingLink] = useState(profile.bookingLink);
  const [preview, setPreview] = useState(profile.photoUrl);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState("");

  function pickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!ACCEPT.includes(f.type)) return fail("Photo must be JPEG, PNG, or WebP.");
    if (f.size > 15 * 1024 * 1024) return fail("Photo must be under 15 MB.");
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setStatus("idle");
    setError("");
  }

  async function uploadAvatar(f: File): Promise<string> {
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

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (status === "saving") return;
    setStatus("saving");
    setError("");
    try {
      const payload: Record<string, unknown> = { name, company, bookingLink };
      if (file) payload.photoKey = await uploadAvatar(file);
      const res = await fetch("/api/member/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        return fail(d?.error || "Could not save.");
      }
      setFile(null);
      setStatus("saved");
      router.refresh();
    } catch {
      fail("Could not save. Try again.");
    }
  }
  function fail(m: string) {
    setStatus("error");
    setError(m);
  }

  const initial = (name || profile.name || "?").trim().charAt(0).toUpperCase();

  return (
    <form onSubmit={save} className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-5">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden border border-[#d8d2c5] bg-[#eae5da]">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="flex h-full w-full items-center justify-center font-[family-name:var(--font-instrument-serif)] text-[32px] text-[#7d766a]">
              {initial}
            </span>
          )}
        </div>
        <div>
          <input
            ref={fileRef}
            type="file"
            accept={ACCEPT.join(",")}
            onChange={pickFile}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="inline-flex items-center border border-[#cec7b8] px-4 py-2.5 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#16130f] transition-colors duration-150 hover:border-[#16130f]"
          >
            {preview ? "Change photo" : "Upload photo"}
          </button>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className={labelCls}>Name</span>
          <input className={field} value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelCls}>Company</span>
          <input className={field} value={company} onChange={(e) => setCompany(e.target.value)} />
        </label>
      </div>
      <label className="flex flex-col gap-1.5">
        <span className={labelCls}>Booking link</span>
        <input
          className={field}
          value={bookingLink}
          onChange={(e) => setBookingLink(e.target.value)}
          placeholder="https://cal.com/you"
          inputMode="url"
        />
        <span className="text-[12px] text-[#7d766a]">
          Where people can book time with you (Calendly, Cal.com, etc.).
        </span>
      </label>

      {status === "error" && (
        <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[12px] text-[#b3261e]" role="alert">
          {error}
        </p>
      )}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={status === "saving"}
          className="inline-flex items-center bg-[var(--kyx-purple)] px-6 py-3.5 font-[family-name:var(--font-ibm-plex-mono)] text-[12px] uppercase tracking-[0.08em] text-[#f9f7f2] transition-colors duration-150 hover:bg-[#4f29a6] disabled:opacity-60"
        >
          {status === "saving" ? "Saving…" : "Save profile"}
        </button>
        {status === "saved" && (
          <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#4a443a]">
            Saved ✓
          </span>
        )}
      </div>
    </form>
  );
}
