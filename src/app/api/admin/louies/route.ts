import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/adminAuth";
import { galleryConfigured, listLouiesNominations, deleteLouiesNomination } from "@/lib/gallery";
export const dynamic = "force-dynamic";
function authorized() { return verifySession(cookies().get(SESSION_COOKIE)?.value)?.role === "admin"; }
export async function GET() {
  if (!authorized()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!galleryConfigured()) return NextResponse.json({ error: "Storage not configured" }, { status: 503 });
  return NextResponse.json(await listLouiesNominations(), { headers: { "Cache-Control": "no-store" } });
}
export async function DELETE(request: Request) {
  if (!authorized()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!galleryConfigured()) return NextResponse.json({ error: "Storage not configured" }, { status: 503 });
  const id = new URL(request.url).searchParams.get("id") || "";
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id))
    return NextResponse.json({ error: "Invalid nomination ID" }, { status: 400 });
  await deleteLouiesNomination(id);
  return new Response(null, { status: 204 });
}
