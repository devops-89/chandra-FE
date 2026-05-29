import Image from 'next/image';

import type { ServiceImageProps } from '@/types/services.types';

export function ServiceImage({
  src,
  alt,
}: ServiceImageProps) {
  return (
    <div className="relative h-52 w-full">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain object-bottom"
      />
    </div>
  );
}