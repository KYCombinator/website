import jwt from "jsonwebtoken";
import type { UserRole } from "./gallery";

// Unified session auth. Sign-in is passwordless for everyone: a 6-digit code is
// emailed to a known user's address, verified, then exchanged for an HS256
// session token carrying { email, role } — also verifiable at the edge in
// middleware via Web Crypto. The only secret required is ADMIN_JWT_SECRET.

export const SESSION_COOKIE = "kyx_session";

const SECRET = process.env.ADMIN_JWT_SECRET || "";

export function authConfigured() {
  return SECRET.length > 0;
}

export type Session = { email: string; role: UserRole };

export function signSession(email: string, role: UserRole): string {
  return jwt.sign({ email: email.toLowerCase(), role }, SECRET, { expiresIn: "7d" });
}

export function verifySession(token: string | undefined | null): Session | null {
  if (!token || !SECRET) return null;
  try {
    const p = jwt.verify(token, SECRET) as { email?: string; role?: UserRole };
    if (!p?.email || (p.role !== "admin" && p.role !== "member")) return null;
    return { email: p.email, role: p.role };
  } catch {
    return null;
  }
}
