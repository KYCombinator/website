import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req: NextRequest) {
  const token = req.cookies.get("kycombinator_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET || "cinderblock");
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: [
    "/account",
    "/account/:path*",
    "/dashboard/:path*"
  ],
};
