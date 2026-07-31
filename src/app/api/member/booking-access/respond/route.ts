import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySession } from "@/lib/adminAuth";
import { respondBookingAccess, getBookingAccess, galleryConfigured } from "@/lib/gallery";

export const dynamic = "force-dynamic";

// The signed-in member (the target) approves or denies a request for their
// booking link. Gated by middleware (/api/member/*). Only the target can act,
// and only on a request actually made to them.
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

  const requester = String(body?.requester || "").trim().toLowerCase();
  const action = String(body?.action || "");
  if (!requester || (action !== "approve" && action !== "deny")) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // The request must exist and be addressed to this member.
  const existing = await getBookingAccess(requester, session.email);
  if (!existing) {
    return NextResponse.json({ error: "No such request." }, { status: 404 });
  }

  await respondBookingAccess(session.email, requester, action === "approve");
  return NextResponse.json({ ok: true });
}
