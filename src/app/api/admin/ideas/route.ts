import { NextResponse } from "next/server";
import { setIdeaStatus, type IdeaStatus } from "@/lib/gallery";

export const dynamic = "force-dynamic";

const STATUSES: IdeaStatus[] = ["new", "approved", "rejected"];

// Approve / reject a Vibe Code Night idea. Gated by middleware (admin session).
export async function POST(request: Request) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const id = String(body?.id || "");
  const status = String(body?.status || "") as IdeaStatus;
  if (!id || !STATUSES.includes(status)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  await setIdeaStatus(id, status);
  return NextResponse.json({ ok: true });
}
