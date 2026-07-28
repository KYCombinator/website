import { NextResponse } from "next/server";
import { SESSION_COOKIE, authConfigured, signSession } from "@/lib/adminAuth";
import {
  verifyLoginCode,
  getUserRole,
  checkLoginRateLimit,
  recordLoginFailure,
  clearLoginFailures,
} from "@/lib/gallery";

export const dynamic = "force-dynamic";

function clientIp(request: Request) {
  const xff = request.headers.get("x-forwarded-for") || "";
  return xff.split(",")[0].trim() || "unknown";
}

// Verifies the emailed code and issues the session cookie (carrying the role).
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
  let code = "";
  try {
    const body = await request.json();
    email = String(body?.email || "");
    code = String(body?.code || "").trim();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const role = /^\d{6}$/.test(code) ? await getUserRole(email) : null;
  const ok = role !== null && (await verifyLoginCode(email, code));
  if (!ok || role === null) {
    await recordLoginFailure(ip);
    return NextResponse.json({ error: "Invalid or expired code." }, { status: 401 });
  }

  await clearLoginFailures(ip);
  const res = NextResponse.json({ ok: true, role });
  res.cookies.set(SESSION_COOKIE, signSession(email, role), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
