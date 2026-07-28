import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminAuthConfigured, signAdminToken } from "@/lib/adminAuth";
import {
  verifyLoginCode,
  checkLoginRateLimit,
  recordLoginFailure,
  clearLoginFailures,
  isAdminUser,
} from "@/lib/gallery";

export const dynamic = "force-dynamic";

function clientIp(request: Request) {
  const xff = request.headers.get("x-forwarded-for") || "";
  return xff.split(",")[0].trim() || "unknown";
}

// Verifies the emailed 6-digit code and issues the admin session cookie.
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
  let code = "";
  try {
    const body = await request.json();
    email = String(body?.email || "");
    code = String(body?.code || "").trim();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const ok =
    /^\d{6}$/.test(code) &&
    (await isAdminUser(email)) &&
    (await verifyLoginCode(email, code));
  if (!ok) {
    await recordLoginFailure(ip);
    return NextResponse.json({ error: "Invalid or expired code." }, { status: 401 });
  }

  await clearLoginFailures(ip);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, signAdminToken(email), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
