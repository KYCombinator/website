import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Container, Eyebrow, SerifHeading } from "@/app/components/fm";
import { SESSION_COOKIE, verifySession } from "@/lib/adminAuth";
import LogoutButton from "./LogoutButton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard | KYX",
};

const LINKS = [
  { label: "Photo gallery", desc: "Browse event photos and submit your own.", href: "/gallery" },
  { label: "Events", desc: "What's coming up on the KYX calendar.", href: "/events" },
  { label: "The community", desc: "Join Slack and see how to get involved.", href: "/slack" },
  { label: "Apply to Cinderblock", desc: "A desk in the room for high-agency builders.", href: "/cinderblock/apply" },
];

export default async function DashboardPage() {
  const store = await cookies();
  const session = verifySession(store.get(SESSION_COOKIE)?.value);
  if (!session) redirect("/login?redirect=/dashboard");

  const name = session.email.split("@")[0];

  return (
    <>
      <section className="border-b border-[#16130f]">
        <Container className="flex flex-col gap-6 py-16 lg:py-20">
          <div className="flex flex-col gap-3">
            <Eyebrow>Member dashboard</Eyebrow>
            <SerifHeading as="h1" className="text-[44px] leading-none md:text-[60px]">
              Welcome, {name}.
            </SerifHeading>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[12px] uppercase tracking-[0.08em] text-[#7d766a]">
              {session.email}
            </span>
            <span
              className={
                "px-2 py-0.5 font-[family-name:var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.1em] " +
                (session.role === "admin"
                  ? "bg-[var(--kyx-purple)] text-[#f9f7f2]"
                  : "border border-[#d8d2c5] text-[#57503f]")
              }
            >
              {session.role}
            </span>
            <LogoutButton />
          </div>
        </Container>
      </section>

      {session.role === "admin" && (
        <section className="border-b border-[#16130f] bg-[#16130f] text-[#f4f1ea]">
          <Container className="flex flex-wrap items-center justify-between gap-4 py-8">
            <div>
              <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.12em] text-[#c3a8f5]">
                Admin
              </p>
              <p className="mt-1 text-[16px]">Moderate photos, manage events, users, and applications.</p>
            </div>
            <Link
              href="/admin"
              className="inline-flex items-center bg-[var(--kyx-purple)] px-6 py-4 font-[family-name:var(--font-ibm-plex-mono)] text-[12px] uppercase tracking-[0.08em] text-[#f9f7f2] transition-colors duration-150 hover:bg-[#4f29a6]"
            >
              Open admin dashboard →
            </Link>
          </Container>
        </section>
      )}

      <section>
        <Container className="py-16 lg:py-[72px]">
          <Eyebrow className="mb-8">Quick links</Eyebrow>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="flex flex-col gap-2 border border-[#d8d2c5] p-6 transition-colors duration-150 hover:border-[#16130f]"
              >
                <span className="font-[family-name:var(--font-instrument-serif)] text-[24px] leading-none text-[#16130f]">
                  {l.label}
                </span>
                <span className="text-[15px] leading-[1.5] text-[#4a443a]">{l.desc}</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
