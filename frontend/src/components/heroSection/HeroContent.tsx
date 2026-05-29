import Link from 'next/link';

import GroupAvatars from '@/components/common/AvatarGroup';
import { heroContent } from '@/constants/hero/heroContent';

const HeroContent = () => {
  const { cta, description, heading, label, headingHighlight } = heroContent;

  return (
    <div className="relative z-10 max-w-2xl text-center lg:text-left">
      <p className="mb-5 inline-flex rounded-full border border-emerald-200 bg-emerald-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-emerald-700 shadow-sm backdrop-blur">
        {label}
      </p>

      <h1 className="text-5xl leading-tight text-slate-950 sm:text-6xl lg:text-7xl xl:text-8xl tracking-tighter font-extrabold">
        {heading}{' '}
        <span className="text-emerald-600">{headingHighlight}</span>
      </h1>

      <p className="mt-8 max-w-152 text-lg leading-[1.8] text-slate-600 sm:text-lg lg:mx-0">
        {description}
      </p>

      <div className="mt-8 flex items-center gap-6 sm:gap-10 sm:flex-row lg:justify-start">
        <Link
          href={cta.href}
          className="inline-flex h-13 items-center justify-center rounded-full bg-emerald-600 px-8 text-base font-bold text-white shadow-xl shadow-emerald-900/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4"
        >
          {cta.label}
        </Link>

        <div className="flex items-center gap-5">
          <GroupAvatars />

          <div className="text-left">
            <p className="text text-slate-900">
              500+ Customers
            </p>
            <p className="text-xs text-slate-500">
              Trust our platform
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;