"use client";

import { useRef, useState } from "react";
import Link from "next/link";

type Status = "idle" | "submitting" | "success" | "error";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 15 * 1024 * 1024; // 15 MB each
const MAX_FILES = 20;

const outlineBtn =
  "inline-flex items-center justify-center border border-[#cec7b8] px-5 py-2.5 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#16130f] transition-colors duration-150 hover:border-[#16130f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)] disabled:opacity-60";
const purpleBtn =
  "inline-flex items-center justify-center bg-[var(--kyx-purple)] px-5 py-2.5 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#f9f7f2] transition-colors duration-150 hover:bg-[#4f29a6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)] disabled:opacity-60";
const fieldCls =
  "w-full border border-[#cec7b8] bg-transparent px-4 py-3 text-[15px] text-[#16130f] outline-none placeholder:text-[#a39c8d] focus:border-[#16130f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)]";
const monoNote =
  "font-[family-name:var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.08em] text-[#7d766a]";

// Per-event photo contribution, scoped to one event and requiring a signed-in
// member. The event is fixed (no dropdown) and attribution comes from the
// session server-side, so the member only picks files. Files go straight to S3
// via presigned URLs, then /api/member/photo records them as pending.
export default function EventPhotoUpload({
  eventId,
  eventName,
  signedIn,
}: {
  eventId: string;
  eventName: string;
  signedIn: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Signed-out: invite to log in (returns here afterward). No upload UI.
  if (!signedIn) {
    return (
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-[#d8d2c5] pt-5">
        <span className={monoNote}>Have photos from {eventName}?</span>
        <Link
          href="/login?redirect=/events"
          className="border-b border-[var(--kyx-purple)] pb-0.5 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#16130f] transition-opacity duration-150 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)]"
        >
          Log in to add them →
        </Link>
      </div>
    );
  }

  function fail(m: string) {
    setStatus("error");
    setMessage(m);
  }

  function reset() {
    setFiles([]);
    setDone(0);
    setStatus("idle");
    setMessage("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function onFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (status === "error") {
      setStatus("idle");
      setMessage("");
    }
    setFiles(Array.from(e.target.files ?? []));
  }

  async function uploadOne(file: File): Promise<string> {
    const urlRes = await fetch("/api/gallery/upload-url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contentType: file.type }),
    });
    if (!urlRes.ok) throw new Error("upload-url");
    const { key, uploadUrl } = (await urlRes.json()) as { key: string; uploadUrl: string };
    const putRes = await fetch(uploadUrl, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": file.type },
    });
    if (!putRes.ok) throw new Error("s3");
    return key;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    if (files.length === 0) return fail("Choose at least one photo.");
    if (files.length > MAX_FILES) return fail(`Up to ${MAX_FILES} photos at a time.`);
    for (const f of files) {
      if (!ALLOWED_TYPES.includes(f.type)) return fail(`"${f.name}" isn't a JPEG, PNG, or WebP.`);
      if (f.size > MAX_BYTES) return fail(`"${f.name}" is over 15 MB.`);
    }

    setStatus("submitting");
    setMessage("");
    setDone(0);
    try {
      const keys: string[] = [];
      for (const f of files) {
        keys.push(await uploadOne(f));
        setDone((d) => d + 1);
      }
      const res = await fetch("/api/member/photo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId, keys }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        return fail(d?.error || "Could not submit. Try again.");
      }
      setStatus("success");
      setFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch {
      fail("Something went wrong during upload. Try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[#d8d2c5] pt-5">
        <span className="font-[family-name:var(--font-instrument-serif)] text-[20px] leading-none text-[#16130f]">
          Thanks — pending review.
        </span>
        <button type="button" className={outlineBtn} onClick={() => setStatus("idle")}>
          Add more
        </button>
      </div>
    );
  }

  // Signed-in, collapsed: a single button to reveal the picker.
  if (!open) {
    return (
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[#d8d2c5] pt-5">
        <button type="button" className={outlineBtn} onClick={() => setOpen(true)}>
          + Add a photo
        </button>
      </div>
    );
  }

  // Signed-in, expanded: file picker + submit, scoped to this event.
  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4 border-t border-[#d8d2c5] pt-5">
      <div className="flex flex-col gap-1.5">
        <span className={monoNote}>Add photos to {eventName}</span>
        <input
          ref={fileInputRef}
          className={fieldCls}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp"
          onChange={onFilesChange}
        />
        <span className={monoNote}>
          {files.length > 0
            ? `${files.length} selected · reviewed before appearing`
            : "JPEG, PNG, or WebP — up to 15 MB each."}
        </span>
      </div>

      {status === "error" && (
        <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[12px] text-[#b3261e]" role="alert">
          {message}
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        <button type="submit" className={purpleBtn} disabled={status === "submitting"}>
          {status === "submitting"
            ? files.length > 1
              ? `Uploading ${done}/${files.length}…`
              : "Uploading…"
            : "Submit"}
        </button>
        <button
          type="button"
          className={outlineBtn}
          disabled={status === "submitting"}
          onClick={() => {
            setOpen(false);
            reset();
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
