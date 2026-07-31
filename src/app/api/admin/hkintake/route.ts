import { NextResponse } from "next/server";
import { setHkIntakeStatus, getHkIntake, type HkStatus } from "@/lib/gallery";
import { sendStatusUpdate } from "@/lib/email";

export const dynamic = "force-dynamic";

const STATUSES: HkStatus[] = ["new", "approved", "rejected"];

// Approve / reject a HackKentucky get-involved submission. Gated by middleware
// (admin session).
export async function POST(request: Request) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const id = String(body?.id || "");
  const status = String(body?.status || "") as HkStatus;
  if (!id || !STATUSES.includes(status)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const rec = await getHkIntake(id);
  await setHkIntakeStatus(id, status);
  if (rec?.email) {
    await sendStatusUpdate(rec.email, rec.name, `HackKentucky ${rec.kind} submission`, status);
  }
  return NextResponse.json({ ok: true });
}
