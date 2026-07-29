"use client";

import { useRef, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 15 * 1024 * 1024; // 15 MB each
const MAX_FILES = 20;

const fieldCls =
  "w-full border border-[#cec7b8] bg-transparent px-4 py-3 text-[15px] text-[#16130f] outline-none placeholder:text-[#a39c8d] focus:border-[#16130f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)]";
const labelCls =
  "font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.1em] text-[#57503f]";

// Signed-in member photo upload. Lets a member push one or more photos to an
// event at once — useful for seeding the initial gallery. Each file goes
// straight to S3 via a presigned URL, then /api/member/photo records them as
// pending (attribution is the member's own name/email, from the session).
export default function ContributePhotos({
  events,
  submitterName,
}: {
  events: { id: string; name: string }[];
  submitterName: string;
}) {
  const [eventId, setEventId] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function fail(m: string) {
    setStatus("error");
    setMessage(m);
  }

  function clearError() {
    if (status === "error") {
      setStatus("idle");
      setMessage("");
    }
  }

  function reset() {
    setEventId("");
    setFiles([]);
    setDone(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function onFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    clearError();
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

    if (!eventId) return fail("Pick an event.");
    if (files.length === 0) return fail("Choose at least one photo.");
    if (files.length > MAX_FILES) return fail(`Up to ${MAX_FILES} photos at a time.`);
    for (const f of files) {
      if (!ALLOWED_TYPES.includes(f.type)) return fail(`"${f.name}" isn't a JPEG, PNG, or WebP.`);
      if (f.size > MAX_BYTES) return fail(`"${f.name}" is over 15 MB — pick a smaller one.`);
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
      reset();
    } catch {
      fail("Something went wrong during upload. Try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-[#d8d2c5] bg-[#eae5da] p-6">
        <p className="font-[family-name:var(--font-instrument-serif)] text-[26px] leading-none text-[#16130f]">
          Thanks — your photos are pending review.
        </p>
        <p className="mt-3 max-w-[420px] text-[15px] leading-[1.6] text-[#4a443a]">
          Every submission gets a quick look. Once approved, they show up on the events
          page, credited to you.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 inline-flex items-center justify-center border border-[#cec7b8] px-5 py-3 font-[family-name:var(--font-ibm-plex-mono)] text-[12px] uppercase tracking-[0.08em] text-[#16130f] transition-colors duration-150 hover:border-[#16130f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)]"
        >
          Add more
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5 border border-[#d8d2c5] p-6">
      <label className="flex flex-col gap-1.5">
        <span className={labelCls}>Event *</span>
        <select
          className={fieldCls}
          value={eventId}
          onChange={(e) => {
            clearError();
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
        <span className={labelCls}>Photos *</span>
        <input
          ref={fileInputRef}
          className={fieldCls}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp"
          onChange={onFilesChange}
        />
        <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[10px] text-[#7d766a]">
          {files.length > 0
            ? `${files.length} selected · JPEG, PNG, or WebP — up to 15 MB each`
            : "JPEG, PNG, or WebP — up to 15 MB each. Select multiple to add a batch."}
        </span>
      </label>

      <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.08em] text-[#7d766a]">
        Credited to {submitterName}
      </p>

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
          {status === "submitting"
            ? files.length > 1
              ? `Uploading ${done}/${files.length}…`
              : "Uploading…"
            : `Submit ${files.length || ""} photo${files.length === 1 ? "" : "s"}`.replace("  ", " ").trim()}
        </button>
      </div>
    </form>
  );
}
