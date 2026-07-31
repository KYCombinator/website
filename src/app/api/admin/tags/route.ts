import { NextResponse } from "next/server";
import { setSubmissionTags, type TaggableKind } from "@/lib/gallery";

export const dynamic = "force-dynamic";

const KINDS: TaggableKind[] = ["application", "idea", "hkintake"];
const MAX_TAGS = 20;

// Set the tags on a submission (application / idea / bounty). Gated by
// middleware (admin session). Tags are normalized: trimmed, de-duped, capped.
export async function POST(request: Request) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const kind = String(body?.kind || "") as TaggableKind;
  const id = String(body?.id || "");
  if (!KINDS.includes(kind) || !id) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const raw = Array.isArray(body?.tags) ? body.tags : [];
  const seen = new Set<string>();
  const tags: string[] = [];
  for (const t of raw) {
    const tag = String(t || "").trim().slice(0, 40);
    const key = tag.toLowerCase();
    if (tag && !seen.has(key)) {
      seen.add(key);
      tags.push(tag);
      if (tags.length >= MAX_TAGS) break;
    }
  }
  await setSubmissionTags(kind, id, tags);
  return NextResponse.json({ ok: true, tags });
}
