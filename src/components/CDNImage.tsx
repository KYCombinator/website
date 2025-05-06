import Image, { ImageProps } from 'next/image';

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

/**
 * Custom loader for Next.js <Image /> to use CDN paths
 */
const cdnLoader = ({ src }: { src: string }): string => cdnPath(src);

/**
 * Wrapper component for <Image /> that automatically applies the CDN loader
 */
export default function CDNImage(props: ImageProps) {
  return <Image {...props} loader={cdnLoader} unoptimized />;
}
