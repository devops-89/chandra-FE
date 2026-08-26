'use client';

import Image from 'next/image';
import { useEffect,useState } from 'react';

import type { ServiceImageProps } from '@/types/services.types';

export function ServiceImage({
  src,
  alt,
  alignRight,
}: ServiceImageProps) {
  const [imgSrc, setImgSrc] = useState(src || '/images/service-placeholder.png');

  useEffect(() => {
    setImgSrc(src || '/images/service-placeholder.png');
  }, [src]);

  // S3 presigned URLs are slow for Next.js server-side optimization.
  // Pass them through unoptimized so the browser fetches directly.
  const isExternalUrl = imgSrc.startsWith('http://') || imgSrc.startsWith('https://');

  return (
    <div className={`relative bg-slate-100 h-56 w-full flex overflow-hidden ${alignRight ? 'justify-end' : ''}`}>
      <Image
        src={imgSrc}
        alt={alt}
        width={500}
        height={320}
        className="object-cover object-top w-full h-full"
        unoptimized={isExternalUrl}
        onError={() => setImgSrc('/images/service-placeholder.png')}
      />
    </div>
  );
}