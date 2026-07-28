import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySession } from "@/lib/adminAuth";
import {
  updateUserProfile,
  isValidPhotoKey,
  photoUrlForKey,
  type Onboarding,
} from "@/lib/gallery";

export const dynamic = "force-dynamic";

const clip = (v: unknown, n: number) => String(v ?? "").trim().slice(0, n);

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
  } = {};

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
