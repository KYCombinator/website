import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  adminAuthConfigured,
  verifyCredentials,
  signAdminToken,
} from "@/lib/adminAuth";
import {
  checkLoginRateLimit,
  recordLoginFailure,
  clearLoginFailures,
} from "@/lib/gallery";

export const dynamic = "force-dynamic";

function clientIp(request: Request) {
  const xff = request.headers.get("x-forwarded-for") || "";
  return xff.split(",")[0].trim() || "unknown";
}

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
  let passcode = "";
  try {
    const body = await request.json();
    email = String(body?.email || "");
    passcode = String(body?.passcode || "");
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!verifyCredentials(email, passcode)) {
    await recordLoginFailure(ip);
    return NextResponse.json({ error: "Incorrect email or passcode." }, { status: 401 });
  }

  await clearLoginFailures(ip);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, signAdminToken(), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
