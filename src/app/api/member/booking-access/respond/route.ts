import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySession } from "@/lib/adminAuth";
import { respondBookingAccess, getBookingAccess, getUser, galleryConfigured } from "@/lib/gallery";
import { sendMemberEmail } from "@/lib/email";

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

  // Let the requester know the decision.
  const owner = await getUser(session.email);
  const ownerName = owner?.name || session.email.split("@")[0];
  if (action === "approve") {
    const link = owner?.bookingLink;
    await sendMemberEmail(requester, `${ownerName} approved your booking request`, "You're approved", [
      `${ownerName} approved your request to book time.`,
      link ? `Book here: ${link}` : "You can now see their booking link in the KYX directory: https://kycombinator.com/directory",
    ]);
  } else {
    await sendMemberEmail(requester, `Update on your booking request`, "Booking request update", [
      `${ownerName} isn't able to share their booking link right now.`,
    ]);
  }

  return NextResponse.json({ ok: true });
}
