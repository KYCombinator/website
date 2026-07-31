import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySession } from "@/lib/adminAuth";
import {
  createPhoto,
  getEvent,
  getUser,
  isValidPhotoKey,
  photoUrlForKey,
  galleryConfigured,
} from "@/lib/gallery";
import { notifyOrganizers, sendSubmissionReceipt } from "@/lib/email";

export const dynamic = "force-dynamic";

const MAX_KEYS = 20;

// Record one or more photo submissions from a signed-in member. The files were
// already uploaded to S3 via presigned URLs; here we validate the keys and
// create a pending photo per key. Attribution comes from the session — a member
// can only submit as themselves. Gated by middleware (/api/member/*).
export async function POST(request: Request) {
  if (!galleryConfigured()) {
    return NextResponse.json({ error: "Gallery not configured." }, { status: 501 });
  }

  const store = await cookies();
  const session = verifySession(store.get(SESSION_COOKIE)?.value);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const eventId = String(body?.eventId || "");
  const keys: string[] = Array.isArray(body?.keys) ? body.keys.map((k: unknown) => String(k)) : [];

  if (keys.length === 0) {
    return NextResponse.json({ error: "No photos to submit." }, { status: 400 });
  }
  if (keys.length > MAX_KEYS) {
    return NextResponse.json({ error: `Up to ${MAX_KEYS} photos at a time.` }, { status: 400 });
  }
  if (!keys.every(isValidPhotoKey)) {
    return NextResponse.json({ error: "Invalid upload." }, { status: 400 });
  }

  const event = await getEvent(eventId);
  if (!event) {
    return NextResponse.json({ error: "Pick an event." }, { status: 400 });
  }

  const user = await getUser(session.email);
  const submitterName = (user?.name || session.email.split("@")[0]).slice(0, 120);

  for (const key of keys) {
    await createPhoto({
      eventId,
      key,
      url: photoUrlForKey(key),
      submitterName,
      submitterEmail: session.email,
    });
  }

  await notifyOrganizers(
    `New photo submission${keys.length > 1 ? "s" : ""} — ${event.name}`,
    `${submitterName} (${session.email}) submitted ${keys.length} photo${keys.length > 1 ? "s" : ""} ` +
      `for "${event.name}" from their member dashboard.\n\n` +
      `Review in the admin dashboard: https://kycombinator.com/admin`
  );
  await sendSubmissionReceipt(
    session.email,
    submitterName,
    keys.length > 1 ? "photos" : "photo"
  );

  return NextResponse.json({ ok: true, count: keys.length });
}
