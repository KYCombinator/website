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
      const response = await fetch('https://api.kycombinator.com/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh }),
      });

      if (response.ok) {
        // The API should handle setting the new token cookie
        return NextResponse.next();
      } else {
        console.warn("Refresh token invalid/expired:", response.statusText);
      }
    } catch (err) {
      console.warn("Error refreshing token:", err instanceof Error ? err.message : err);
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
