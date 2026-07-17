import Image from 'next/image';

import type { ServiceImageProps } from '@/types/services.types';

export function ServiceImage({
  src,
  alt,
  alignRight,
}: ServiceImageProps) {
  // S3 presigned URLs are slow for Next.js server-side optimization.
  // Pass them through unoptimized so the browser fetches directly.
  const isExternalUrl = src.startsWith('http://') || src.startsWith('https://');

  return (
    <div className={`relative bg-amber-30 h-56 w-full object-fill flex ${alignRight ? 'justify-end' : ''}`}>
      <Image
        src={src}
        alt={alt}
        width={500}
        height={320}
        className="object-cover object-top"
        unoptimized={isExternalUrl}
      />
    </div>
  );
}