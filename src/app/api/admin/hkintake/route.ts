import { NextResponse } from "next/server";
import { setHkIntakeStatus, type HkStatus } from "@/lib/gallery";

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
  await setHkIntakeStatus(id, status);
  return NextResponse.json({ ok: true });
}
