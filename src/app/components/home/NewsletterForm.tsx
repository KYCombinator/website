"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Newsletter field for the dark community band. Transparent underline input +
// mono SUBSCRIBE button, matching the design. Inline validation and inline
// success/error — no modal, no redirect.
export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;

    if (!EMAIL_RE.test(email.trim())) {
      setStatus("error");
      setMessage("Enter a valid email.");
      return;
    }

    setStatus("submitting");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus("error");
        setMessage(data?.error || "Could not subscribe. Try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Could not subscribe. Try again.");
    }
  }

  if (status === "success") {
    return (
      <p
        className="border-b border-[#565044] pb-1 pt-2.5 font-[family-name:var(--font-ibm-plex-mono)] text-[13px] text-[#f4f1ea]"
        role="status"
        aria-live="polite"
      >
        You&apos;re on the list.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      <form
        onSubmit={onSubmit}
        noValidate
        className="flex items-center border-b border-[#565044] pb-1"
      >
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@company.com"
          aria-label="Email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") {
              setStatus("idle");
              setMessage("");
            }
          }}
          className="min-w-0 flex-1 border-0 bg-transparent py-2.5 font-[family-name:var(--font-ibm-plex-mono)] text-[13px] text-[#f4f1ea] placeholder:text-[#7d766a] outline-none focus-visible:outline-none"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="shrink-0 border-0 bg-transparent px-1 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#f4f1ea] transition-opacity duration-150 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)] disabled:opacity-50"
        >
          {status === "submitting" ? "…" : "Subscribe →"}
        </button>
      </form>
      {status === "error" && (
        <p
          className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] text-[#e0a3a3]"
          role="alert"
        >
          {message}
        </p>
      )}
    </div>
  );
}
