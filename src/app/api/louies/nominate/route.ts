import { NextResponse } from "next/server";
import { nominationsOpen } from "@/data/louies2026";
import { nominationSchema } from "@/lib/louiesValidation";
import { createLouiesNomination, galleryConfigured } from "@/lib/gallery";
export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  if (!nominationsOpen) return NextResponse.json({ error: "Nominations are not open yet." }, { status: 403 });
  if (!galleryConfigured()) return NextResponse.json({ error: "Nominations are temporarily unavailable." }, { status: 503 });
  const text = await request.text();
  if (text.length > 120000) return NextResponse.json({ error: "Submission is too large." }, { status: 413 });
  let body: unknown;
  try { body = JSON.parse(text); } catch { return NextResponse.json({ error: "Invalid submission." }, { status: 400 }); }
  const parsed = nominationSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Check your contact information and add a nominee name for each nomination. Company and reason are optional." }, { status: 400 });
  try {
    const record = await createLouiesNomination(parsed.data);
    return NextResponse.json({ ok: true, id: record.id });
  } catch {
    return NextResponse.json({ error: "We couldn't save your nominations. Please try again." }, { status: 503 });
  }
}
