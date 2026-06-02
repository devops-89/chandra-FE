import Link from 'next/link';

import { ChooseUs } from '@/constants/chooseUs/ChooseUs';

export function ChooseCTA() {
  return (
    <Link
      href={ChooseUs.cta.href}
      className="
      inline-flex
      h-14
      items-center
      justify-center
      bg-emerald-600
      px-10
      rounded-full
      font-semibold
      text-white
      transition
      hover:opacity-90
      "
    >
      {ChooseUs.cta.label}
    </Link>
  );
}