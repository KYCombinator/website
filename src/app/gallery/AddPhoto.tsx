"use client";

import { useRef, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 15 * 1024 * 1024; // 15 MB

const fieldCls =
  "w-full border border-[#cec7b8] bg-transparent px-4 py-3 text-[15px] text-[#16130f] outline-none placeholder:text-[#a39c8d] focus:border-[#16130f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)]";
const labelCls =
  "font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.1em] text-[#57503f]";

// Client-side photo submission for the public gallery. Three-step flow:
//   1. POST /api/gallery/upload-url  → { key, uploadUrl }
//   2. PUT the file directly to S3 via uploadUrl
//   3. POST /api/gallery/submit      → { ok: true }  (photo lands in "pending")
export default function AddPhoto({ events }: { events: { id: string; name: string }[] }) {
  const [eventId, setEventId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function fail(m: string) {
    setStatus("error");
    setMessage(m);
  }

  function reset() {
    setEventId("");
    setName("");
    setEmail("");
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (status === "error") {
      setStatus("idle");
      setMessage("");
    }
    setFile(e.target.files?.[0] ?? null);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;

    if (!eventId) return fail("Pick an event.");
    if (!file) return fail("Choose a photo to upload.");
    if (!ALLOWED_TYPES.includes(file.type)) return fail("Only JPEG, PNG, or WebP images.");
    if (file.size > MAX_BYTES) return fail("That photo is over 15 MB — please pick a smaller one.");
    if (!name.trim()) return fail("Add your name for attribution.");
    if (!EMAIL_RE.test(email.trim())) return fail("Enter a valid email.");

    setStatus("submitting");
    setMessage("");
    try {
      // 1. Get a presigned upload URL.
      const urlRes = await fetch("/api/gallery/upload-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contentType: file.type }),
      });
      if (!urlRes.ok) {
        const d = await urlRes.json().catch(() => ({}));
        return fail(d?.error || "Could not start the upload. Try again.");
      }
      const { key, uploadUrl } = (await urlRes.json()) as { key: string; uploadUrl: string };

      // 2. Upload the file directly to S3.
      const putRes = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });
      if (!putRes.ok) return fail("Upload failed. Try again.");

      // 3. Record the submission for review.
      const submitRes = await fetch("/api/gallery/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key,
          eventId,
          submitterName: name.trim(),
          submitterEmail: email.trim(),
        }),
      });
      if (!submitRes.ok) {
        const d = await submitRes.json().catch(() => ({}));
        return fail(d?.error || "Could not submit. Try again.");
      }

      setStatus("success");
      reset();
    } catch {
      fail("Something went wrong. Try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-[#d8d2c5] bg-[#eae5da] p-6">
        <p className="font-[family-name:var(--font-instrument-serif)] text-[26px] leading-none text-[#16130f]">
          Thanks — your photo is pending review.
        </p>
        <p className="mt-3 max-w-[520px] text-[15px] leading-[1.6] text-[#4a443a]">
          We look over every submission. Once it&apos;s approved it&apos;ll show up here in the
          gallery.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setMessage("");
          }}
          className="mt-5 inline-flex items-center justify-center border border-[#cec7b8] px-5 py-3 font-[family-name:var(--font-ibm-plex-mono)] text-[12px] uppercase tracking-[0.08em] text-[#16130f] transition-colors duration-150 hover:border-[#16130f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)]"
        >
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex max-w-[620px] flex-col gap-5 border border-[#d8d2c5] p-6">
      <label className="flex flex-col gap-1.5">
        <span className={labelCls}>Event *</span>
        <select
          className={fieldCls}
          value={eventId}
          onChange={(e) => {
            if (status === "error") {
              setStatus("idle");
              setMessage("");
            }
            setEventId(e.target.value);
          }}
        >
          <option value="">Select an event…</option>
          {events.map((ev) => (
            <option key={ev.id} value={ev.id}>
              {ev.name}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5">
        <span className={labelCls}>Photo *</span>
        <input
          ref={fileInputRef}
          className={fieldCls}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={onFileChange}
        />
        <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[10px] text-[#7d766a]">
          JPEG, PNG, or WebP — up to 15 MB.
        </span>
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className={labelCls}>Your name *</span>
          <input
            className={fieldCls}
            value={name}
            onChange={(e) => {
              if (status === "error") {
                setStatus("idle");
                setMessage("");
              }
              setName(e.target.value);
            }}
            autoComplete="name"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelCls}>Your email *</span>
          <input
            className={fieldCls}
            value={email}
            onChange={(e) => {
              if (status === "error") {
                setStatus("idle");
                setMessage("");
              }
              setEmail(e.target.value);
            }}
            type="email"
            autoComplete="email"
          />
        </label>
      </div>

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
          {status === "submitting" ? "Submitting…" : "Submit photo"}
        </button>
      </div>
    </form>
  );
}
