"use client";

import { useState } from "react";

export type AccessState = "self" | "approved" | "pending" | "none";

const bookLink =
  "mt-auto inline-flex w-fit border-b border-[var(--kyx-purple)] pb-0.5 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#16130f] transition-opacity duration-150 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)]";
const requestBtn =
  "mt-auto inline-flex w-fit items-center border border-[#cec7b8] px-3 py-1.5 font-[family-name:var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.08em] text-[#16130f] transition-colors duration-150 hover:border-[#16130f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)] disabled:opacity-60";
const mutedNote =
  "mt-auto font-[family-name:var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.08em] text-[#a39c8d]";

// Per-directory-card control for a member's booking link. The link is only
// shown when the viewer owns it (self) or has been approved; otherwise the
// viewer can request access, which the owner approves from their dashboard.
export default function BookingAccessButton({
  targetEmail,
  targetName,
  hasBooking,
  initialState,
  bookingUrl,
}: {
  targetEmail: string;
  targetName: string;
  hasBooking: boolean;
  initialState: AccessState;
  bookingUrl?: string;
}) {
  const [state, setState] = useState<AccessState>(initialState);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  if (!hasBooking) return null;

  if (state === "self" || state === "approved") {
    return bookingUrl ? (
      <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className={bookLink}>
        Book time →
      </a>
    ) : (
      <span className={mutedNote}>Booking link available</span>
    );
  }

  if (state === "pending") {
    return <span className={mutedNote}>Request pending · awaiting approval</span>;
  }

  async function requestAccess() {
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/member/booking-access/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target: targetEmail }),
      });
      if (res.ok) {
        const d = await res.json().catch(() => ({}));
        setState(d?.status === "approved" ? "approved" : "pending");
      } else {
        const d = await res.json().catch(() => ({}));
        setError(d?.error || "Could not send request.");
      }
    } catch {
      setError("Could not send request.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-auto flex flex-col gap-1.5">
      <button
        type="button"
        onClick={requestAccess}
        disabled={busy}
        className={requestBtn}
        aria-label={`Request access to ${targetName}'s booking link`}
      >
        {busy ? "Requesting…" : "Request to book"}
      </button>
      {error && (
        <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[10px] text-[#b3261e]">
          {error}
        </span>
      )}
    </div>
  );
}
