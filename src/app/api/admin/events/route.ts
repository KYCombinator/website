import { NextResponse } from "next/server";
import { putEvent, deleteEvent } from "@/lib/gallery";

export const dynamic = "force-dynamic";

const clip = (v: unknown, n: number) => String(v ?? "").trim().slice(0, n);

// Create or update an event. Gated by middleware.
export async function POST(request: Request) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const name = clip(body?.name, 160);
  if (!name) return NextResponse.json({ error: "Event name is required." }, { status: 400 });

  const event = await putEvent({
    id: body?.id ? String(body.id) : undefined,
    name,
    tagline: clip(body?.tagline, 300),
    when: clip(body?.when, 120),
    nextDate: clip(body?.nextDate, 120),
    month: clip(body?.month, 12).toUpperCase(),
    action: clip(body?.action, 40),
    href: clip(body?.href, 500), // blank = next event is TBD (no link)
    order: Number.isFinite(body?.order) ? Number(body.order) : undefined,
    published: body?.published === undefined ? undefined : !!body.published,
  });
  return NextResponse.json({ ok: true, event });
}

// Delete an event.
export async function DELETE(request: Request) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const id = String(body?.id || "");
  if (!id) return NextResponse.json({ error: "Missing id." }, { status: 400 });
  await deleteEvent(id);
  return NextResponse.json({ ok: true });
}
