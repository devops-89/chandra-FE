import Link from 'next/link';

import type { Props } from '@/types/dashboardTypes/dashboard.types';

export default function ActionCard({
  title,
  description,
  href,
  icon,
}: Props) {
  return (
    <Link
      href={href}
      className="
        rounded-3xl
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      <div className="mb-4 text-emerald-700">
        {icon}
      </div>

      <h3 className="font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        {description}
      </p>
    </Link>
  );
}