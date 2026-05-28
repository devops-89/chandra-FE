import Link from 'next/link';

import { heroContent } from '@/constants/hero/heroContent';

const HeroContent = () => {
  const { cta, description, heading, label } = heroContent;

  return (
    <div className="relative z-10 max-w-2xl text-center lg:text-left">
      <p className="mb-5 inline-flex rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-wide text-emerald-700 shadow-sm backdrop-blur">
        {label}
      </p>

      <h1 className="text-4xl font-black leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
        {heading}
      </h1>

      <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg lg:mx-0">
        {description}
      </p>

      <div className="mt-8 flex justify-center lg:justify-start">
        <Link
          href={cta.href}
          className="inline-flex h-13 items-center justify-center rounded-full bg-emerald-600 px-8 text-base font-bold text-white shadow-xl shadow-emerald-900/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4"
        >
          {cta.label}
        </Link>
      </div>
    </div>
  );
};

export default HeroContent;
