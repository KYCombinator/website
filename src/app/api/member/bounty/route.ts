import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySession } from "@/lib/adminAuth";
import {
  createBounty,
  getUser,
  isValidPhotoKey,
  photoUrlForKey,
  galleryConfigured,
} from "@/lib/gallery";
import { notifyOrganizers } from "@/lib/email";

export const dynamic = "force-dynamic";

const clip = (v: unknown, n: number) => String(v || "").trim().slice(0, n);

// Submit a sponsor bounty. Requires a signed-in member (gated by middleware at
// /api/member/*); the submitter is taken from the session. Lands in the admin
// queue as "new" for approval.
export async function POST(request: Request) {
  if (!galleryConfigured()) {
    return NextResponse.json({ error: "Submissions not configured." }, { status: 501 });
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

  const title = clip(body?.title, 200);
  const build = clip(body?.build, 4000);
  if (!title) return NextResponse.json({ error: "Give the bounty a title." }, { status: 400 });
  if (!build) return NextResponse.json({ error: "Describe what to build." }, { status: 400 });

  // Optional sponsor logo (already uploaded to S3 via the presigned URL).
  const logoKey = String(body?.logoKey || "");
  if (logoKey && !isValidPhotoKey(logoKey)) {
    return NextResponse.json({ error: "Invalid logo." }, { status: 400 });
  }

  const user = await getUser(session.email);
  const submitterName = (user?.name || session.email.split("@")[0]).slice(0, 120);

  const rec = await createBounty({
    sponsor: clip(body?.sponsor, 200),
    title,
    build,
    prize: clip(body?.prize, 400),
    judging: clip(body?.judging, 2000),
    links: clip(body?.links, 1000),
    logoUrl: logoKey ? photoUrlForKey(logoKey) : undefined,
    submitterName,
    submitterEmail: session.email,
  });

  await notifyOrganizers(
    `New bounty — ${rec.title}`,
    `${submitterName} (${session.email})${rec.sponsor ? ` · ${rec.sponsor}` : ""} submitted a bounty.\n\n` +
      `Title: ${rec.title}\n\nBuild:\n${rec.build}\n\nPrize: ${rec.prize || "—"}\n\n` +
      `How to win:\n${rec.judging || "—"}\n\nLinks: ${rec.links || "—"}\n\n` +
      `Review in the admin dashboard: https://kycombinator.com/admin\n\nBounty id: ${rec.id}`
  );

  return NextResponse.json({ ok: true });
}
