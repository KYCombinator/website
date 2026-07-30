import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySession } from "@/lib/adminAuth";
import {
  updateUserProfile,
  isValidPhotoKey,
  photoUrlForKey,
  type Onboarding,
  type ProfileItem,
} from "@/lib/gallery";

export const dynamic = "force-dynamic";

const clip = (v: unknown, n: number) => String(v ?? "").trim().slice(0, n);

const MAX_ITEMS = 20;

// Normalize a free-form list ({text, url}[]): trim, drop entries with no text,
// keep only http(s) urls, and cap the count.
function cleanItems(v: unknown): ProfileItem[] {
  if (!Array.isArray(v)) return [];
  const out: ProfileItem[] = [];
  for (const raw of v) {
    const text = clip((raw as any)?.text, 280);
    if (!text) continue;
    const url = clip((raw as any)?.url, 500);
    out.push(url && /^https?:\/\//i.test(url) ? { text, url } : { text });
    if (out.length >= MAX_ITEMS) break;
  }
  return out;
}

// Update the signed-in user's own profile (name, company, booking link, photo)
// and onboarding checklist. Gated by middleware; the email comes from the
// session, never the body, so a user can only edit themselves.
export async function POST(request: Request) {
  const store = await cookies();
  const session = verifySession(store.get(SESSION_COOKIE)?.value);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const patch: {
    name?: string;
    company?: string;
    bookingLink?: string;
    photoUrl?: string;
    onboarding?: Onboarding;
    working?: ProfileItem[];
    needs?: ProfileItem[];
  } = {};

  if (body?.working !== undefined) patch.working = cleanItems(body.working);
  if (body?.needs !== undefined) patch.needs = cleanItems(body.needs);

  if (body?.name !== undefined) patch.name = clip(body.name, 120);
  if (body?.company !== undefined) patch.company = clip(body.company, 160);

  if (body?.bookingLink !== undefined) {
    const link = clip(body.bookingLink, 500);
    if (link && !/^https?:\/\//i.test(link)) {
      return NextResponse.json({ error: "Booking link must start with http(s)://" }, { status: 400 });
    }
    patch.bookingLink = link;
  }

  if (body?.photoKey !== undefined) {
    const key = String(body.photoKey || "");
    if (key && !isValidPhotoKey(key)) {
      return NextResponse.json({ error: "Invalid photo." }, { status: 400 });
    }
    patch.photoUrl = key ? photoUrlForKey(key) : "";
  }

  if (body?.onboarding !== undefined && body.onboarding && typeof body.onboarding === "object") {
    patch.onboarding = {
      slack: !!body.onboarding.slack,
      newsletter: !!body.onboarding.newsletter,
      event: !!body.onboarding.event,
    };
  }

  const user = await updateUserProfile(session.email, patch);
  return NextResponse.json({
    ok: true,
    profile: {
      name: user.name,
      company: user.company ?? "",
      bookingLink: user.bookingLink ?? "",
      photoUrl: user.photoUrl ?? "",
      onboarding: user.onboarding ?? {},
    },
  });
}
