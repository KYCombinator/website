import { NextResponse } from "next/server";
import { setPhotoStatus } from "@/lib/gallery";

export const dynamic = "force-dynamic";

// Approve / reject a pending photo. Gated by middleware (admin cookie required).
export async function POST(request: Request) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const id = String(body?.id || "");
  const action = String(body?.action || "");
  if (!id || (action !== "approve" && action !== "reject")) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  await setPhotoStatus(id, action === "approve" ? "approved" : "rejected");
  return NextResponse.json({ ok: true });
}
