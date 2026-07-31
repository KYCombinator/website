import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySession } from "@/lib/adminAuth";
import { requestBookingAccess, getUser, galleryConfigured } from "@/lib/gallery";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// A signed-in member requests access to another member's booking link. Gated by
// middleware (/api/member/*). The requester is the session; the target comes
// from the body and must be a real member who has a booking link.
export async function POST(request: Request) {
  if (!galleryConfigured()) {
    return NextResponse.json({ error: "Not configured." }, { status: 501 });
  }
  const store = await cookies();
  const session = verifySession(store.get(SESSION_COOKIE)?.value);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const target = String(body?.target || "").trim().toLowerCase();
  if (!EMAIL_RE.test(target)) {
    return NextResponse.json({ error: "Invalid member." }, { status: 400 });
  }
  if (target === session.email.toLowerCase()) {
    return NextResponse.json({ error: "That's you." }, { status: 400 });
  }

  const targetUser = await getUser(target);
  if (!targetUser) {
    return NextResponse.json({ error: "No such member." }, { status: 404 });
  }
  if (!targetUser.bookingLink) {
    return NextResponse.json({ error: "That member has no booking link." }, { status: 400 });
  }

  const access = await requestBookingAccess(session.email, target);
  return NextResponse.json({ ok: true, status: access.status });
}
