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
        width={500}
        height={300}
        className="object-contain object-bottom"
      />
    </div>
  );
}