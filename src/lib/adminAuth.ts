import jwt from "jsonwebtoken";
import { timingSafeEqual } from "crypto";

// Admin session auth for the /admin portal. HS256 tokens signed here (Node) and
// also verifiable at the edge in middleware via Web Crypto (see middleware.ts).
// The passcode + secret come from env (set as repo/SST secrets); if unset, the
// admin login fails closed.

export const ADMIN_COOKIE = "kyx_admin";

const SECRET = process.env.ADMIN_JWT_SECRET || "";
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "dan@kycombinator.com").toLowerCase();
const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || "";

export function adminAuthConfigured() {
  return SECRET.length > 0 && ADMIN_PASSCODE.length > 0;
}

function safeEqual(a: string, b: string) {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

export function verifyCredentials(email: string, passcode: string): boolean {
  if (!adminAuthConfigured()) return false;
  const emailOk = safeEqual(String(email || "").trim().toLowerCase(), ADMIN_EMAIL);
  const passOk = safeEqual(String(passcode || "").trim(), ADMIN_PASSCODE);
  return emailOk && passOk;
}

export function signAdminToken(): string {
  return jwt.sign({ role: "admin", email: ADMIN_EMAIL }, SECRET, { expiresIn: "7d" });
}

export function verifyAdminToken(token: string | undefined | null): boolean {
  if (!token || !SECRET) return false;
  try {
    const p = jwt.verify(token, SECRET) as { role?: string };
    return p?.role === "admin";
  } catch {
    return false;
  }
}
