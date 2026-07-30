"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const fieldCls =
  "w-full border border-[#cec7b8] bg-transparent px-4 py-3 text-[15px] text-[#16130f] outline-none placeholder:text-[#a39c8d] focus:border-[#16130f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)]";
const labelCls =
  "font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.1em] text-[#57503f]";

export default function IdeaForm() {
  const [idea, setIdea] = useState("");
  const [twist, setTwist] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  function fail(m: string) {
    setStatus("error");
    setMessage(m);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    if (!idea.trim()) return fail("Add your challenge idea.");

    setStatus("submitting");
    setMessage("");
    try {
      const res = await fetch("/api/ideas/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea: idea.trim(), twist: twist.trim() }),
      });
      if (res.ok) {
        setStatus("success");
        setIdea("");
        setTwist("");
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
          Idea received.
        </p>
        <p className="mt-3 max-w-[520px] text-[15px] leading-[1.6] text-[#4a443a]">
          Thanks for the submission. We review every idea — the good ones show up as
          challenges at a future Vibe Code Night.
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
      <label className="flex flex-col gap-1.5">
        <span className={labelCls}>What is your challenge idea? *</span>
        <textarea
          className={`${fieldCls} min-h-[120px] resize-y`}
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="e.g. Build a tool that turns a voice memo into a to-do list"
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className={labelCls}>Any useful constraints, ingredients, or twists?</span>
        <textarea
          className={`${fieldCls} min-h-[100px] resize-y`}
          value={twist}
          onChange={(e) => setTwist(e.target.value)}
          placeholder="Optional — a required API, a time limit, a theme…"
        />
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
          {status === "submitting" ? "Submitting…" : "Submit idea"}
        </button>
      </div>
    </form>
  );
}
