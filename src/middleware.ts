import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req: NextRequest) {
  const APP_ID = process.env.APP_ID;
  
  const token = req.cookies.get(`hzzh.${APP_ID}.token`)?.value;

  if (!token) {
    return NextResponse.redirect("https://auth.kycombinator.com/?redirect_uri=https://www.kycombinator.com");
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET || "cinderblock");
    return NextResponse.next();
  } catch {
    return NextResponse.redirect("https://auth.kycombinator.com/?redirect_uri=https://www.kycombinator.com");
  }
}

export const config = {
  matcher: [
    "/account/:path*",
    "/dashboard/:path*"
  ],
};
