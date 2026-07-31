import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createIdea, galleryConfigured } from "@/lib/gallery";
import { SESSION_COOKIE, verifySession } from "@/lib/adminAuth";
import { notifyOrganizers, sendSubmissionReceipt } from "@/lib/email";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clip = (v: unknown, n: number) => String(v || "").trim().slice(0, n);

// Vibe Code Night challenge-idea submission (mirrors the Google Form). Public —
// anyone can submit. If the visitor is signed in we record their email for
// attribution. Lands in the admin queue as "new" for approval.
export async function POST(request: Request) {
  if (!galleryConfigured()) {
    return NextResponse.json({ error: "Submissions not configured." }, { status: 501 });
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const idea = clip(body?.idea, 2000);
  const twist = clip(body?.twist, 2000);
  const name = clip(body?.name, 160);
  if (!idea) {
    return NextResponse.json({ error: "Add your challenge idea." }, { status: 400 });
  }

  // Prefer the form's email; fall back to the session if signed in.
  const store = await cookies();
  const session = verifySession(store.get(SESSION_COOKIE)?.value);
  const bodyEmail = clip(body?.email, 200);
  const submitterEmail = EMAIL_RE.test(bodyEmail) ? bodyEmail : session?.email || "";
  if (!EMAIL_RE.test(submitterEmail)) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }

  const rec = await createIdea({ idea, twist, submitterEmail });

  await notifyOrganizers(
    "New Vibe Code Night idea",
    `A challenge idea was submitted${submitterEmail ? ` by ${submitterEmail}` : ""}.\n\n` +
      `Idea:\n${idea}\n\n` +
      `Twist:\n${twist || "—"}\n\n` +
      `Review in the admin dashboard: https://kycombinator.com/admin\n\nIdea id: ${rec.id}`
  );
  await sendSubmissionReceipt(submitterEmail, name, "Vibe Code Night idea");

  return NextResponse.json({ ok: true });
}
