import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: [
    '/admin',
    '/admin/:path*',
    '/api/admin/:path*',
    '/dashboard',
    '/dashboard/:path*',
    '/directory',
    '/directory/:path*',
    '/api/member/:path*',
    '/account',
    '/account/:path*',
  ],
};

const SECRET = process.env.ADMIN_JWT_SECRET || '';
const SESSION_COOKIE = 'kyx_session';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // The old /account route is retired in favor of the member dashboard.
  if (pathname === '/account' || pathname.startsWith('/account/')) {
    const url = req.nextUrl.clone();
    url.pathname = '/dashboard';
    url.search = '';
    return NextResponse.redirect(url);
  }

  const session = SECRET ? await verifyJwt(req.cookies.get(SESSION_COOKIE)?.value || '', SECRET) : null;
  const valid = session && (!session.exp || session.exp * 1000 > Date.now());
  const isAdmin = valid && session.role === 'admin';
  const isApi = pathname.startsWith('/api/');

  // Admin area requires an admin session.
  if (pathname === '/admin' || pathname.startsWith('/admin/') || pathname.startsWith('/api/admin')) {
    if (!isAdmin) {
      if (isApi) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      return redirectToLogin(req, pathname);
    }
    return NextResponse.next();
  }

  // Member area requires any valid session.
  if (!valid) {
    if (isApi) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return redirectToLogin(req, pathname);
  }
  return NextResponse.next();
}

function redirectToLogin(req: NextRequest, from: string) {
  const url = req.nextUrl.clone();
  url.pathname = '/login';
  url.search = `?redirect=${encodeURIComponent(from)}`;
  return NextResponse.redirect(url);
}

// HMAC (HS256) JWT verifier that works in the Edge runtime.
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
  const signature = Uint8Array.from(atob(base64UrlToBase64(signatureB64)), (c) => c.charCodeAt(0));

  const isValid = await crypto.subtle.verify('HMAC', key, signature, enc.encode(data));
  if (!isValid) return null;

  try {
    return JSON.parse(atob(base64UrlToBase64(payloadB64)));
  } catch {
    return null;
  }
}

function base64UrlToBase64(input: string): string {
  return input.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(input.length / 4) * 4, '=');
}
