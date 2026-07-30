import { NextResponse } from "next/server";
import { putUser, deleteUser, type UserRole } from "@/lib/gallery";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ROLES: UserRole[] = ["member", "admin"];

// Add / update a user. Gated by middleware.
export async function POST(request: Request) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const email = String(body?.email || "").trim().toLowerCase();
  const name = String(body?.name || "").trim().slice(0, 120);
  const role = String(body?.role || "member") as UserRole;
  const cinderblock = body?.cinderblock === undefined ? undefined : !!body.cinderblock;
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  }
  if (!ROLES.includes(role)) {
    return NextResponse.json({ error: "Invalid role." }, { status: 400 });
  }
  const user = await putUser({ email, name, role, cinderblock });
  return NextResponse.json({ ok: true, user });
}

// Remove a user. The bootstrap admin (ADMIN_EMAIL) always retains access, so
// this can't lock everyone out.
export async function DELETE(request: Request) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const email = String(body?.email || "").trim().toLowerCase();
  if (!email) return NextResponse.json({ error: "Missing email." }, { status: 400 });
  await deleteUser(email);
  return NextResponse.json({ ok: true });
}
