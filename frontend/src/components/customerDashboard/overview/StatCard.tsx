import type { Props } from '@/types/statTypes/stats.types';

export default function StatCard({
  title,
  value,
  icon,
}: Props) {
  return (
    <div
      className="
        rounded-3xl
        bg-white
        p-6
        shadow-sm
      "
    >
      <div className="mb-4 text-emerald-700">
        {icon}
      </div>

      <h3
        className="
          text-3xl
          font-bold
        "
      >
        {value}
      </h3>

      <p
        className="
          mt-2
          text-sm
          text-slate-500
        "
      >
        {title}
      </p>
    </div>
  );
}