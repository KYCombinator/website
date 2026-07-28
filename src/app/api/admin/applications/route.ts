import { NextResponse } from "next/server";
import { setApplicationStatus, type AppStatus } from "@/lib/gallery";

export const dynamic = "force-dynamic";

const STATUSES: AppStatus[] = ["new", "reviewed", "archived"];

// Update a Cinderblock application's status. Gated by middleware.
export async function POST(request: Request) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const id = String(body?.id || "");
  const status = String(body?.status || "") as AppStatus;
  if (!id || !STATUSES.includes(status)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  await setApplicationStatus(id, status);
  return NextResponse.json({ ok: true });
}
