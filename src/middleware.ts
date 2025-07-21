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
    jwt.verify(token, JWT_SECRET);
    return NextResponse.next();
  } catch {
    url.pathname = '/soft-refresh';
    url.searchParams.set('redirect', req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ['/account/:path*'], // adjust for your protected routes
};
