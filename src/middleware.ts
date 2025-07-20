import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(req: NextRequest) {
  const APP_ID = process.env.NEXT_PUBLIC_APP_ID;
  const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || "cinderblock";

  const token = req.cookies.get(`hzzh.${APP_ID}.token`)?.value;
  const refresh = req.cookies.get(`hzzh.${APP_ID}.refresh`)?.value;

  console.log("APP_ID", APP_ID);
  console.log("JWT_SECRET", JWT_SECRET);
  console.log("token", token);
  console.log("refresh", refresh);

  try {
    if (token) {
      jwt.verify(token, JWT_SECRET);
      return NextResponse.next();
    }
  } catch (err) {
    console.warn("Access token invalid/expired:", err instanceof Error ? err.message : err);
    // fall through to refresh attempt
  }

  if (refresh) {
    try {
      const payload = jwt.verify(refresh, JWT_SECRET) as { email: string };
      const newToken = jwt.sign({ email: payload.email }, JWT_SECRET, { expiresIn: "15m" });

      const res = NextResponse.next();
      res.cookies.set(`hzzh.${APP_ID}.token`, newToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        path: '/',
        maxAge: 60 * 15,
        domain: 'kycombinator.com',
      });
      return res;
    } catch (err) {
      console.warn("Refresh token invalid/expired:", err instanceof Error ? err.message : err);
    }
  }

  return NextResponse.redirect("https://auth.kycombinator.com/?redirect_uri=https://www.kycombinator.com&status=expired");
}

export const config = {
  matcher: [
    "/account/:path*",
    "/dashboard/:path*"
  ],
};
