"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Eyebrow, SerifHeading } from "../components/fm";

export default function AdminHeader() {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function logout() {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {
      // ignore — redirect regardless
    }
    router.replace("/admin/login");
  }

  return (
    <div className="border-b border-[#16130f]">
      <Container className="flex items-end justify-between gap-6 py-8">
        <div className="flex flex-col gap-1.5">
          <Eyebrow>KYX Admin</Eyebrow>
          <SerifHeading as="h1" className="text-[40px] leading-none md:text-[52px]">
            Dashboard.
          </SerifHeading>
        </div>
        <button
          type="button"
          onClick={logout}
          disabled={loggingOut}
          className="inline-flex items-center justify-center bg-[#16130f] px-4 py-2.5 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.08em] text-[#f4f1ea] transition-colors duration-150 hover:bg-[#2c2820] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kyx-purple)] disabled:opacity-60"
        >
          {loggingOut ? "Logging out…" : "Logout"}
        </button>
      </Container>
    </div>
  );
}
