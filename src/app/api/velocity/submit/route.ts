import { NextResponse } from "next/server";
import { createVelocityInterest, galleryConfigured } from "@/lib/gallery";
import { notifyOrganizers, sendSubmissionReceipt } from "@/lib/email";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clip = (v: unknown, n: number) => String(v || "").trim().slice(0, n);

// Velocity 2.0 interest (gauge interest). Public — email required so we can
// follow up. The three requirement confirmations must be affirmed to submit
// (we only want interest from teams that can actually meet the bar).
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

  const company = clip(body?.company, 200);
  const founderName = clip(body?.founderName, 160);
  const email = clip(body?.email, 200);
  const revenue = clip(body?.revenue, 200);
  const customers = clip(body?.customers, 200);
  const metrics = clip(body?.metrics, 2000);
  const quarter = clip(body?.quarter, 60);
  const canTriple = !!body?.canTriple;
  const canCommit = !!body?.canCommit;
  const hasBacker = !!body?.hasBacker;

  if (!company) return NextResponse.json({ error: "Company name is required." }, { status: 400 });
  if (!founderName) return NextResponse.json({ error: "Founder name is required." }, { status: 400 });
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  if (!revenue) return NextResponse.json({ error: "Add your current revenue." }, { status: 400 });
  if (!customers) return NextResponse.json({ error: "Add your current customer count." }, { status: 400 });
  if (!quarter) return NextResponse.json({ error: "Pick when you could start." }, { status: 400 });
  if (!canTriple || !canCommit || !hasBacker) {
    return NextResponse.json(
      { error: "Please confirm you can meet all three requirements to qualify." },
      { status: 400 }
    );
  }

  const rec = await createVelocityInterest({
    company,
    founderName,
    email,
    revenue,
    customers,
    metrics,
    quarter,
    canTriple,
    canCommit,
    hasBacker,
  });

  await notifyOrganizers(
    `New Velocity 2.0 interest — ${company}`,
    `${founderName} (${email}) from ${company} expressed interest in Velocity 2.0.\n\n` +
      `Current revenue: ${revenue}\nCurrent customers: ${customers}\n` +
      `Could start: ${quarter}\n\n` +
      `Other metrics/context:\n${metrics || "—"}\n\n` +
      `Confirmed: 3x revenue+customers ✓ · 12wk in-person ✓ · backer/mentor ✓\n\n` +
      `Review in the admin dashboard: https://kycombinator.com/admin\n\nInterest id: ${rec.id}`
  );
  await sendSubmissionReceipt(email, founderName, "Velocity 2.0 interest");

  return NextResponse.json({ ok: true });
}
