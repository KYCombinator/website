"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export type Account = {
  name: string;
  email: string;
  photoUrl: string;
  isAdmin: boolean;
};

// Header account widget: a round avatar (photo or initial) that opens an
// accordion menu with the member's links and sign-out. Closes on outside
// click or Escape.
export default function AccountMenu({ account }: { account: Account }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const initial = (account.name || account.email || "?").trim().charAt(0).toUpperCase();

  const links = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Directory", href: "/directory" },
    ...(account.isAdmin ? [{ label: "Admin", href: "/admin" }] : []),
  ];

  async function signOut() {
    if (busy) return;
    setBusy(true);
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    setOpen(false);
    router.replace("/login");
    router.refresh();
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Account menu"
        className="flex h-9 w-9 items-center justify-center overflow-hidden border border-[#cec7b8] bg-[#eae5da] transition-colors duration-150 hover:border-[#16130f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)]"
      >
        {account.photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={account.photoUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <span className="font-[family-name:var(--font-instrument-serif)] text-[18px] leading-none text-[#57503f]">
            {initial}
          </span>
        )}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+8px)] z-50 w-60 border border-[#16130f] bg-[#f4f1ea] shadow-[4px_4px_0_0_#16130f]"
        >
          <div className="flex flex-col gap-0.5 border-b border-[#d8d2c5] px-4 py-3">
            <span className="font-[family-name:var(--font-ibm-plex-sans)] text-[15px] font-medium text-[#16130f]">
              {account.name}
            </span>
            <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] text-[#7d766a]">
              {account.email}
            </span>
          </div>
          <div className="flex flex-col py-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="px-4 py-2.5 font-[family-name:var(--font-ibm-plex-sans)] text-[14px] text-[#3e3930] transition-colors duration-150 hover:bg-[#eae5da] focus-visible:bg-[#eae5da] focus-visible:outline-none"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="border-t border-[#d8d2c5] p-1">
            <button
              type="button"
              onClick={signOut}
              disabled={busy}
              role="menuitem"
              className="w-full px-4 py-2.5 text-left font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#b3261e] transition-colors duration-150 hover:bg-[#f3e3e0] focus-visible:bg-[#f3e3e0] focus-visible:outline-none disabled:opacity-60"
            >
              {busy ? "Signing out…" : "Sign out"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
