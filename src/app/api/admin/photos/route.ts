import { NextResponse } from "next/server";
import { setPhotoStatus, deletePhoto, getPhoto, type PhotoStatus } from "@/lib/gallery";
import { sendStatusUpdate } from "@/lib/email";

export const dynamic = "force-dynamic";

// Map an action to a status. "pending" un-approves a photo (sends it back to
// the queue). Gated by middleware (admin session required).
const STATUS_BY_ACTION: Record<string, PhotoStatus> = {
  approve: "approved",
  reject: "rejected",
  pending: "pending",
};

export async function POST(request: Request) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const id = String(body?.id || "");
  const action = String(body?.action || "");
  const status = STATUS_BY_ACTION[action];
  if (!id || !status) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const photo = await getPhoto(id);
  await setPhotoStatus(id, status);
  if (photo?.submitterEmail) {
    await sendStatusUpdate(photo.submitterEmail, photo.submitterName, "photo", status);
  }
  return NextResponse.json({ ok: true });
}

// Permanently delete a photo (record + S3 object).
export async function DELETE(request: Request) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const id = String(body?.id || "");
  if (!id) {
    return NextResponse.json({ error: "Missing id." }, { status: 400 });
  }
  await deletePhoto(id);
  return NextResponse.json({ ok: true });
}
