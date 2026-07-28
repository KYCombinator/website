import { NextResponse } from "next/server";
import {
  createPhoto,
  getEvent,
  isValidPhotoKey,
  photoUrlForKey,
  galleryConfigured,
} from "@/lib/gallery";
import { notifyOrganizers } from "@/lib/email";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Record a photo submission (status: pending) after the browser uploaded the
// file to S3 via the presigned URL. Notifies organizers.
export async function POST(request: Request) {
  if (!galleryConfigured()) {
    return NextResponse.json({ error: "Gallery not configured." }, { status: 501 });
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const key = String(body?.key || "");
  const eventId = String(body?.eventId || "");
  const submitterName = String(body?.submitterName || "").trim().slice(0, 120);
  const submitterEmail = String(body?.submitterEmail || "").trim().slice(0, 200);

  if (!isValidPhotoKey(key)) {
    return NextResponse.json({ error: "Invalid upload." }, { status: 400 });
  }
  if (!submitterName) {
    return NextResponse.json({ error: "Add your name for attribution." }, { status: 400 });
  }
  if (!EMAIL_RE.test(submitterEmail)) {
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  }
  const event = await getEvent(eventId);
  if (!event) {
    return NextResponse.json({ error: "Pick an event." }, { status: 400 });
  }

  const photo = await createPhoto({
    eventId,
    key,
    url: photoUrlForKey(key),
    submitterName,
    submitterEmail,
  });

  await notifyOrganizers(
    `New photo submission — ${event.name}`,
    `${submitterName} (${submitterEmail}) submitted a photo for "${event.name}".\n\n` +
      `Review it in the admin dashboard: https://kycombinator.com/admin\n\nPhoto id: ${photo.id}`
  );

  return NextResponse.json({ ok: true });
}
