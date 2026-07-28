import jwt from "jsonwebtoken";

// Admin session auth for the /admin portal. Sign-in is passwordless: a 6-digit
// code is emailed to the allowlisted admin address, verified, then exchanged
// for an HS256 session token (also verifiable at the edge in middleware via Web
// Crypto). The only secret required is ADMIN_JWT_SECRET.

export const ADMIN_COOKIE = "kyx_admin";

const SECRET = process.env.ADMIN_JWT_SECRET || "";
export const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "dan@kycombinator.com").toLowerCase();

export function adminAuthConfigured() {
  return SECRET.length > 0;
}

export function signAdminToken(email?: string): string {
  return jwt.sign(
    { role: "admin", email: (email || ADMIN_EMAIL).toLowerCase() },
    SECRET,
    { expiresIn: "7d" }
  );
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
