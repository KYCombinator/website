import { NextResponse } from "next/server";
import { createApplication, galleryConfigured } from "@/lib/gallery";
import { notifyOrganizers, sendSubmissionReceipt } from "@/lib/email";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clip = (v: unknown, n: number) => String(v || "").trim().slice(0, n);

// Cinderblock application (replaces form.kycombinator.com). Stores the
// application for the admin dashboard and emails the organizers.
export async function POST(request: Request) {
  if (!galleryConfigured()) {
    return NextResponse.json({ error: "Applications not configured." }, { status: 501 });
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = clip(body?.name, 120);
  const email = clip(body?.email, 200);
  const company = clip(body?.company, 160);
  const building = clip(body?.building, 4000);
  const links = clip(body?.links, 1000);

  if (!name) return NextResponse.json({ error: "Your name is required." }, { status: 400 });
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  if (!building) return NextResponse.json({ error: "Tell us what you're building." }, { status: 400 });

  const app = await createApplication({ name, email, company, building, links });

  await notifyOrganizers(
    `New Cinderblock application — ${name}`,
    `${name} (${email})${company ? ` · ${company}` : ""} applied to Cinderblock.\n\n` +
      `Building:\n${building}\n\nLinks: ${links || "—"}\n\n` +
      `Review in the admin dashboard: https://kycombinator.com/admin\n\nApplication id: ${app.id}`
  );
  await sendSubmissionReceipt(email, name, "Cinderblock application");

  return NextResponse.json({ ok: true });
}
