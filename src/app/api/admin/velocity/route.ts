import { NextResponse } from "next/server";
import { setVelocityStatus, getVelocityInterest, type VelocityStatus } from "@/lib/gallery";
import { sendStatusUpdate } from "@/lib/email";

export const dynamic = "force-dynamic";

const STATUSES: VelocityStatus[] = ["new", "approved", "rejected"];

// Approve (qualify) / reject a Velocity 2.0 interest submission. Gated by
// middleware (admin session). Emails the applicant on a decision.
export async function POST(request: Request) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const id = String(body?.id || "");
  const status = String(body?.status || "") as VelocityStatus;
  if (!id || !STATUSES.includes(status)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const rec = await getVelocityInterest(id);
  await setVelocityStatus(id, status);
  if (rec?.email) {
    await sendStatusUpdate(rec.email, rec.founderName, "Velocity 2.0 application", status);
  }
  return NextResponse.json({ ok: true });
}
