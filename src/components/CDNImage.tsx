/**
 * Utility to prefix paths with the CDN base URL
 */
export const cdnPath = (path: string): string => {
  const base = process.env.NEXT_PUBLIC_CDN_URL || '';

  if (process.env.NODE_ENV === 'production' && !base) {
    console.warn('⚠️ NEXT_PUBLIC_CDN_URL is not set in production.');
  }

  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
};