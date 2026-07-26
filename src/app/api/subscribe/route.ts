import { NextResponse } from "next/server";

// Newsletter subscribe endpoint for the homepage community band.
//
// Forwards to the beehiiv v2 API when credentials are configured. Set these on
// the dev/prod environment for live delivery:
//   BEEHIIV_API_KEY         — a beehiiv API key with subscription write access
//   BEEHIIV_PUBLICATION_ID  — the publication id (looks like "pub_xxxxxxxx")
// The public list embed id (3cab38c3-d1b9-4443-bdb3-2a0de2d047a6) is NOT the
// publication id — grab the real pub id from the beehiiv dashboard.
//
// Without credentials the route returns 501 so the form can surface an honest
// "not configured" state rather than silently pretending success.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let email: string;
  try {
    const body = await request.json();
    email = typeof body?.email === "string" ? body.email.trim() : "";
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  }

  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;

  if (!apiKey || !publicationId) {
    return NextResponse.json(
      { error: "Newsletter is not configured on this environment." },
      { status: 501 }
    );
  }

  try {
    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          reactivate_existing: false,
          send_welcome_email: true,
          utm_source: "kycombinator.com",
          utm_medium: "homepage",
        }),
      }
    );

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("beehiiv subscribe failed:", res.status, detail);
      return NextResponse.json(
        { error: "Could not subscribe. Try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("beehiiv subscribe error:", err);
    return NextResponse.json(
      { error: "Could not subscribe. Try again." },
      { status: 502 }
    );
  }
}
