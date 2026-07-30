import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createIdea, galleryConfigured } from "@/lib/gallery";
import { SESSION_COOKIE, verifySession } from "@/lib/adminAuth";
import { notifyOrganizers } from "@/lib/email";

export const dynamic = "force-dynamic";

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
  if (!idea) {
    return NextResponse.json({ error: "Add your challenge idea." }, { status: 400 });
  }

  const store = await cookies();
  const session = verifySession(store.get(SESSION_COOKIE)?.value);
  const submitterEmail = session?.email || "";

  const rec = await createIdea({ idea, twist, submitterEmail });

  await notifyOrganizers(
    "New Vibe Code Night idea",
    `A challenge idea was submitted${submitterEmail ? ` by ${submitterEmail}` : ""}.\n\n` +
      `Idea:\n${idea}\n\n` +
      `Twist:\n${twist || "—"}\n\n` +
      `Review in the admin dashboard: https://kycombinator.com/admin\n\nIdea id: ${rec.id}`
  );

  return NextResponse.json({ ok: true });
}
