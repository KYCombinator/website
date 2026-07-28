import { NextResponse } from "next/server";
import { authConfigured } from "@/lib/adminAuth";
import { createLoginCode, checkLoginRateLimit, recordLoginFailure } from "@/lib/gallery";
import { sendLoginCode } from "@/lib/email";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clientIp(request: Request) {
  const xff = request.headers.get("x-forwarded-for") || "";
  return xff.split(",")[0].trim() || "unknown";
}

// Emails a 6-digit sign-in code to a known user. Rate-limited; always responds
// generically so it can't be used to probe who has an account.
export async function POST(request: Request) {
  if (!authConfigured()) {
    return NextResponse.json({ error: "Login is not configured on this environment." }, { status: 501 });
  }

  const ip = clientIp(request);
  const rl = await checkLoginRateLimit(ip);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: `Too many attempts. Try again in ${Math.ceil(rl.retryAfter / 60)} min.` },
      { status: 429 }
    );
  }

  let email = "";
  try {
    const body = await request.json();
    email = String(body?.email || "");
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Any valid email gets a code — a brand-new email creates an account on
  // first sign-in (self-signup). Invalid formats just count against the limit.
  if (EMAIL_RE.test(email)) {
    try {
      const code = await createLoginCode(email);
      await sendLoginCode(email.trim().toLowerCase(), code);
    } catch (err) {
      console.error("sendLoginCode failed:", err);
      return NextResponse.json({ error: "Could not send the code. Try again." }, { status: 502 });
    }
  } else {
    await recordLoginFailure(ip);
  }

  return NextResponse.json({ ok: true });
}
