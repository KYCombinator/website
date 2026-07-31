import { NextResponse } from "next/server";
import { setIdeaStatus, getIdea, type IdeaStatus } from "@/lib/gallery";
import { sendStatusUpdate } from "@/lib/email";

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
  const idea = await getIdea(id);
  await setIdeaStatus(id, status);
  if (idea?.submitterEmail) {
    await sendStatusUpdate(idea.submitterEmail, "", "Vibe Code Night idea", status);
  }
  return NextResponse.json({ ok: true });
}
