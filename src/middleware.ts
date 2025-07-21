// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req: NextRequest) {
  const APP_ID = process.env.NEXT_PUBLIC_APP_ID;
  const JWT_SECRET = process.env.JWT_SECRET || "cinderblock";
  const token = req.cookies.get(`hzzh.${APP_ID}.token`)?.value;
  const url = req.nextUrl.clone();

  if (!token) {
    url.pathname = '/soft-refresh';
    url.searchParams.set('redirect', req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  try {
    const payload = jwt.decode(token) as jwt.JwtPayload | null;

    if (!payload || typeof payload !== 'object' || !payload.exp) {
      // malformed token
      return NextResponse.redirect('https://auth.kycombinator.com?redirect=' + req.nextUrl.pathname);
    }

    const isExpired = payload.exp * 1000 < Date.now();
    if (isExpired) {
      url.pathname = '/soft-refresh';
      url.searchParams.set('redirect', req.nextUrl.pathname);
      return NextResponse.redirect(url);
    }

    jwt.verify(token, JWT_SECRET); // will throw if tampered
    return NextResponse.next();
  } catch (err) {
    console.log("invalid token:", err);
    return NextResponse.redirect('https://auth.kycombinator.com?redirect=' + req.nextUrl.pathname);
  }
}

export const config = {
  matcher: ['/account/:path*'], // adjust for your protected routes
};
