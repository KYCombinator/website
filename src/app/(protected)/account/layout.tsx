'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';

const APP_ID = process.env.NEXT_PUBLIC_APP_ID!;
const JWT_SECRET = process.env.JWT_SECRET || 'cinderblock';
const REFRESH_URL = 'https://api.kycombinator.com/auth/refresh';

async function isValidJWT(token: string): Promise<boolean> {
  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch (err) {
    console.warn('JWT invalid:', err);
    return false;
  }
}

async function refreshAccessToken(): Promise<string | null> {
  try {
    const res = await fetch(REFRESH_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      cache: 'no-store',
    });

    if (!res.ok) return null;
    const { token } = await res.json();
    return token ?? null;
  } catch (err) {
    console.error('Refresh request failed:', err);
    return null;
  }
}

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get(`hzzh.${APP_ID}.token`)?.value;
  const refreshToken = cookieStore.get(`hzzh.${APP_ID}.refresh`)?.value;

  const tokenIsValid = accessToken && await isValidJWT(accessToken);

  if (!tokenIsValid && refreshToken) {
    const newToken = await refreshAccessToken();
    if (newToken && await isValidJWT(newToken)) {
      // Let the API route set the cookie with Set-Cookie header
      // This layout just trusts that if the token is valid, we're good
    } else {
      redirect('/login?status=expired');
    }
  }

  if (!tokenIsValid && !refreshToken) {
    redirect('/login?status=missing');
  }

  return (
    <div className="min-h-screen bg-background-100 text-foreground-900">
      {children}
    </div>
  );
}
