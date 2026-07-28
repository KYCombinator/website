import { NextResponse } from "next/server";
import { putEvent, listEvents, createApprovedPhoto, putUser } from "@/lib/gallery";
import { featuredEvents } from "@/app/components/home/data";

export const dynamic = "force-dynamic";

const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Calendar fields (month + action) per event name — merged into the unified
// events so the homepage calendar is DB-driven too.
const CALENDAR: Record<string, { month: string; action: string; href?: string }> = {
  "The Louies": { month: "DEC", action: "Attend" },
  HackKentucky: { month: "SEP", action: "Register", href: "https://luma.com/hy24ycd1" },
};

// A calendar-only event (no carousel photos).
const CALENDAR_ONLY = [
  {
    name: "Block Party",
    tagline: "Netflix & chill is low agency.",
    when: "October",
    month: "OCT",
    action: "Register",
    href: "https://luma.com/3ggtx98x",
  },
];

// Idempotent: seeds the current featured events (with their curated photos as
// pre-approved) + calendar-only events + the bootstrap admin user. Gated by
// middleware. Skips entirely if events already exist.
export async function POST() {
  const existing = await listEvents();
  if (existing.length > 0) {
    return NextResponse.json({ ok: true, seeded: 0, note: "Events already exist." });
  }

  let events = 0;
  let photos = 0;

  for (let i = 0; i < featuredEvents.length; i++) {
    const e = featuredEvents[i];
    const cal = CALENDAR[e.title];
    const id = slug(e.title);
    await putEvent({
      id,
      name: e.title,
      tagline: e.tagline,
      when: e.when,
      href: cal?.href ?? e.href,
      month: cal?.month ?? "",
      action: cal?.action ?? "",
      order: i,
      published: true,
    });
    events++;
    for (const p of e.photos) {
      await createApprovedPhoto({ eventId: id, url: p.src, submitterName: "KYX" });
      photos++;
    }
  }

  for (let j = 0; j < CALENDAR_ONLY.length; j++) {
    const c = CALENDAR_ONLY[j];
    await putEvent({
      id: slug(c.name),
      name: c.name,
      tagline: c.tagline,
      when: c.when,
      month: c.month,
      action: c.action,
      href: c.href,
      order: featuredEvents.length + j,
      published: true,
    });
    events++;
  }

  // Bootstrap admin user (so the users list isn't empty).
  await putUser({ email: "dan@kycombinator.com", name: "Dan Ross-Li", role: "admin" });

  return NextResponse.json({ ok: true, events, photos });
}
