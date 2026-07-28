import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: [
    '/account/:path*',
    '/admin',
    '/admin/:path*',
    '/api/admin/:path*',
  ],
};

const APP_ID = process.env.NEXT_PUBLIC_APP_ID!;
const JWT_SECRET = process.env.JWT_SECRET || 'cinderblock';
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || '';
const ADMIN_COOKIE = 'kyx_admin';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ── Admin portal ──────────────────────────────────────────────────────────
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    // The login page + login endpoint are public.
    if (pathname === '/admin/login' || pathname === '/api/admin/login') {
      return NextResponse.next();
    }
    const token = req.cookies.get(ADMIN_COOKIE)?.value;
    const payload = ADMIN_JWT_SECRET ? await verifyJwt(token || '', ADMIN_JWT_SECRET) : null;
    const valid =
      payload &&
      payload.role === 'admin' &&
      (!payload.exp || payload.exp * 1000 > Date.now());
    if (!valid) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      const url = req.nextUrl.clone();
      url.pathname = '/admin/login';
      url.search = `?redirect=${encodeURIComponent(pathname)}`;
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // ── Account (existing behavior) ─────────────────────────────────────────────
  const token = req.cookies.get(`hzzh.${APP_ID}.token`)?.value;
  const url = req.nextUrl.clone();

  if (!token) {
    url.pathname = 'https://auth.kycombinator.com';
    url.searchParams.set('redirect', req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  const payload = await verifyJwt(token, JWT_SECRET);
  const isExpired = !payload || (payload.exp && payload.exp * 1000 < Date.now());

  if (isExpired) {
    url.pathname = '/soft-refresh';
    url.searchParams.set('redirect', req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// ✅ HMAC JWT verifier that works in Edge runtime
async function verifyJwt(token: string, secret: string): Promise<any | null> {
  const [headerB64, payloadB64, signatureB64] = token.split('.');
  if (!headerB64 || !payloadB64 || !signatureB64) return null;

  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  );

  const data = `${headerB64}.${payloadB64}`;
  const signature = Uint8Array.from(atob(base64UrlToBase64(signatureB64)), c => c.charCodeAt(0));

  const isValid = await crypto.subtle.verify('HMAC', key, signature, enc.encode(data));
  if (!isValid) return null;

  try {
    const json = atob(base64UrlToBase64(payloadB64));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function base64UrlToBase64(input: string): string {
    return input.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(input.length / 4) * 4, '=');
  }
