import Image from 'next/image';

import type { ServiceImageProps } from '@/types/services.types';

export function ServiceImage({
  src,
  alt,
  alignRight,
}: ServiceImageProps) {
  return (
    <div className={`relative bg-amber-30 h-56 w-full flex ${alignRight ? 'justify-end' : ''}`}>
      <Image
        src={src}
        alt={alt}
        width={500}
        height={320}
        className="object-contain object-bottom"
      />
    </div>
  );
}