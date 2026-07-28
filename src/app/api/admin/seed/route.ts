import { NextResponse } from "next/server";
import { putEvent, listEvents } from "@/lib/gallery";
import { featuredEvents } from "@/app/components/home/data";

export const dynamic = "force-dynamic";

const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Idempotent: seeds the current featured events into the table (stable ids from
// the name, so re-running updates rather than duplicates). Gated by middleware.
export async function POST() {
  const existing = await listEvents();
  if (existing.length > 0) {
    return NextResponse.json({ ok: true, seeded: 0, note: "Events already exist." });
  }
  let seeded = 0;
  for (let i = 0; i < featuredEvents.length; i++) {
    const e = featuredEvents[i];
    await putEvent({
      id: slug(e.title),
      name: e.title,
      tagline: e.tagline,
      when: e.when,
      href: e.href,
      order: i,
      published: true,
    });
    seeded++;
  }
  return NextResponse.json({ ok: true, seeded });
}
