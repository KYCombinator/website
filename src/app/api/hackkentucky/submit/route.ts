import { NextResponse } from "next/server";
import {
  createHkIntake,
  isValidPhotoKey,
  photoUrlForKey,
  galleryConfigured,
  type HkKind,
  type HkField,
} from "@/lib/gallery";
import { notify, HACKKENTUCKY_EMAIL } from "@/lib/email";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const KINDS: HkKind[] = ["sponsor", "bounty", "speak", "volunteer"];
const clip = (v: unknown, n: number) => String(v || "").trim().slice(0, n);

// Public HackKentucky get-involved submission (sponsor / bounty / speak /
// volunteer). Email is required and links the submission to that address — no
// login. Stores the record for the admin queue and emails the HK inbox.
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

  const kind = String(body?.kind || "") as HkKind;
  if (!KINDS.includes(kind)) {
    return NextResponse.json({ error: "Invalid form." }, { status: 400 });
  }
  const name = clip(body?.name, 160);
  const email = clip(body?.email, 200);
  if (!name) return NextResponse.json({ error: "Your name is required." }, { status: 400 });
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }

  const fields: HkField[] = Array.isArray(body?.fields)
    ? body.fields
        .map((f: any) => ({ label: clip(f?.label, 120), value: clip(f?.value, 4000) }))
        .filter((f: HkField) => f.label && f.value)
        .slice(0, 30)
    : [];

  const logoKey = String(body?.logoKey || "");
  if (logoKey && !isValidPhotoKey(logoKey)) {
    return NextResponse.json({ error: "Invalid logo." }, { status: 400 });
  }

  const rec = await createHkIntake({
    kind,
    name,
    email,
    fields,
    logoUrl: logoKey ? photoUrlForKey(logoKey) : undefined,
  });

  const detail = fields.map((f) => `${f.label}: ${f.value}`).join("\n");
  await notify(
    HACKKENTUCKY_EMAIL,
    `HackKentucky ${kind} — ${name}`,
    `${name} (${email}) submitted the ${kind} form.\n\n${detail || "(no extra fields)"}\n\n` +
      `Review in the admin dashboard: https://kycombinator.com/admin\n\nSubmission id: ${rec.id}`
  );

  return NextResponse.json({ ok: true });
}
