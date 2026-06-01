import Image from 'next/image';

import { ChooseUs } from '@/constants/chooseUs/ChooseUs';

import { ChooseStats } from './ChooseStats';

export function ChooseImage() {
  return (
    <div>
      <div className="relative h-112 overflow-hidden">
        <Image
          src={ChooseUs.image.src}
          alt={ChooseUs.image.alt}
          fill
          className="object-cover"
        />
      </div>

      <ChooseStats />
    </div>
  );
}