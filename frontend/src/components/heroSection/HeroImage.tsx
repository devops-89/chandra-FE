import Image from 'next/image';

import { heroContent } from '@/constants/hero/heroContent';

const HeroImage = () => {
  const { image } = heroContent;

  return (
    <div className="relative z-10 mx-auto w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-none">
      <div className="relative overflow-hidden rounded-3xl border border-white/80 bg-white/70 p-2 shadow-2xl shadow-slate-900/10 backdrop-blur sm:p-3 lg:rounded-4xl">
        <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-emerald-50 sm:aspect-5/4 sm:rounded-3xl lg:aspect-4/3">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>

      <div className="absolute -bottom-5 left-4 hidden rounded-2xl border border-white/80 bg-white/90 px-4 py-3 shadow-xl shadow-slate-900/10 backdrop-blur sm:block sm:left-6 sm:px-5 sm:py-4 lg:left-8">
        <p className="text-sm font-bold text-slate-950">Same-day slots</p>
        <p className="mt-1 text-xs font-medium text-slate-500">Available in selected areas</p>
      </div>
    </div>
  );
};

export default HeroImage;
