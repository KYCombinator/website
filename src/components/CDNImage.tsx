import Image, { ImageProps } from 'next/image';

const cdnLoader = ({ src }: { src: string }) => {
  const baseUrl = process.env.NEXT_PUBLIC_CDN_URL || '';
  return `${baseUrl}${src.startsWith('/') ? src : `/${src}`}`;
};

export default function CDNImage(props: ImageProps) {
  return <Image {...props} loader={cdnLoader} unoptimized />;
}