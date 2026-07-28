"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const field =
  "w-full border border-[#cec7b8] bg-transparent px-4 py-3 text-[15px] text-[#16130f] outline-none focus:border-[#16130f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)]";
const labelCls =
  "font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.1em] text-[#57503f]";

export default function AdminLoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect") || "/admin";

  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("dan@kycombinator.com");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [note, setNote] = useState("");

  async function requestCode(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    setNote("");
    try {
      const res = await fetch("/api/admin/request-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStep("code");
        setNote(`If ${email} is an admin, a 6-digit code is on its way. Check your email.`);
      } else {
        const d = await res.json().catch(() => ({}));
        setError(d?.error || "Could not send a code.");
      }
    } catch {
      setError("Could not send a code. Try again.");
    }
    setBusy(false);
  }

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      if (res.ok) {
        router.replace(redirect.startsWith("/") ? redirect : "/admin");
        router.refresh();
        return;
      }
      const d = await res.json().catch(() => ({}));
      setError(d?.error || "Invalid code.");
      setBusy(false);
    } catch {
      setError("Login failed. Try again.");
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-[420px] flex-col justify-center px-5 py-16">
      <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.14em] text-[var(--kyx-purple)]">
        KYX Admin
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-instrument-serif)] text-[40px] leading-none tracking-[-0.02em]">
        Sign in.
      </h1>

      {step === "email" ? (
        <form onSubmit={requestCode} noValidate className="mt-8 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className={labelCls}>Admin email</span>
            <input
              className={field}
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          {error && (
            <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[12px] text-[#b3261e]" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={busy}
            className="mt-2 inline-flex items-center justify-center bg-[#16130f] px-6 py-4 font-[family-name:var(--font-ibm-plex-mono)] text-[12px] uppercase tracking-[0.08em] text-[#f4f1ea] transition-colors duration-150 hover:bg-[#2c2820] disabled:opacity-60"
          >
            {busy ? "Sending…" : "Email me a code"}
          </button>
        </form>
      ) : (
        <form onSubmit={signIn} noValidate className="mt-8 flex flex-col gap-4">
          {note && <p className="text-[14px] leading-[1.5] text-[#4a443a]">{note}</p>}
          <label className="flex flex-col gap-1.5">
            <span className={labelCls}>6-digit code</span>
            <input
              className={`${field} font-[family-name:var(--font-ibm-plex-mono)] text-[20px] tracking-[0.4em]`}
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              autoFocus
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            />
          </label>
          {error && (
            <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[12px] text-[#b3261e]" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={busy || code.length !== 6}
            className="mt-2 inline-flex items-center justify-center bg-[var(--kyx-purple)] px-6 py-4 font-[family-name:var(--font-ibm-plex-mono)] text-[12px] uppercase tracking-[0.08em] text-[#f9f7f2] transition-colors duration-150 hover:bg-[#4f29a6] disabled:opacity-60"
          >
            {busy ? "Verifying…" : "Sign in"}
          </button>
          <button
            type="button"
            onClick={() => {
              setStep("email");
              setCode("");
              setError("");
              setNote("");
            }}
            className="self-start font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#7d766a] underline-offset-2 hover:underline"
          >
            ← Use a different email
          </button>
        </form>
      )}
    </main>
  );
}
