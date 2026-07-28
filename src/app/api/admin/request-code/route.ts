import { NextResponse } from "next/server";
import { adminAuthConfigured } from "@/lib/adminAuth";
import {
  createLoginCode,
  checkLoginRateLimit,
  recordLoginFailure,
  isAdminUser,
} from "@/lib/gallery";
import { sendLoginCode } from "@/lib/email";

export const dynamic = "force-dynamic";

function clientIp(request: Request) {
  const xff = request.headers.get("x-forwarded-for") || "";
  return xff.split(",")[0].trim() || "unknown";
}

// Emails a 6-digit sign-in code to the allowlisted admin address. Rate-limited.
// Always responds generically so it can't be used to probe the admin email.
export async function POST(request: Request) {
  if (!adminAuthConfigured()) {
    return NextResponse.json(
      { error: "Admin login is not configured on this environment." },
      { status: 501 }
    );
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

  if (await isAdminUser(email)) {
    try {
      const code = await createLoginCode(email);
      await sendLoginCode(email.trim().toLowerCase(), code);
    } catch (err) {
      console.error("sendLoginCode failed:", err);
      return NextResponse.json({ error: "Could not send the code. Try again." }, { status: 502 });
    }
  } else {
    // Unknown email: count it against the rate limit, respond generically.
    await recordLoginFailure(ip);
  }

  return NextResponse.json({ ok: true });
}
