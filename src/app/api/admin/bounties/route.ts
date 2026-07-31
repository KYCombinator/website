import { NextResponse } from "next/server";
import { setBountyStatus, type BountyStatus } from "@/lib/gallery";

export const dynamic = "force-dynamic";

const STATUSES: BountyStatus[] = ["new", "approved", "rejected"];

// Approve / reject a bounty. Gated by middleware (admin session).
export async function POST(request: Request) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const id = String(body?.id || "");
  const status = String(body?.status || "") as BountyStatus;
  if (!id || !STATUSES.includes(status)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  await setBountyStatus(id, status);
  return NextResponse.json({ ok: true });
}
