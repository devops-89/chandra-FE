import Image from 'next/image';

import { heroContent } from '@/constants/hero/heroContent';

const HeroImage = () => {
  const { image } = heroContent;

  return (
    <div className="relative z-10 mx-auto w-full max-w-xl lg:max-w-none">
      <div className="relative overflow-hidden rounded-4xl border border-white/80 bg-white/70 p-3 shadow-2xl shadow-slate-900/10 backdrop-blur">
        <div className="relative aspect-4/3 overflow-hidden rounded-3xl bg-emerald-50 sm:aspect-5/4 lg:aspect-4/3">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="(min-width: 1024px) 46vw, (min-width: 640px) 80vw, 92vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="absolute -bottom-5 left-6 hidden rounded-2xl border border-white/80 bg-white/90 px-5 py-4 shadow-xl shadow-slate-900/10 backdrop-blur sm:block">
        <p className="text-sm font-bold text-slate-950">Same-day slots</p>
        <p className="mt-1 text-xs font-medium text-slate-500">Available in selected areas</p>
      </div>
    </div>
  );
};

export default HeroImage;
