import type { Props } from '@/types/services.types';

export default function ServiceCard({
  service,
  date,
  time,
  status,
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
      <div className="flex justify-between">
        <h3 className="font-semibold">
          {service}
        </h3>

        <span
          className="
            rounded-full
            bg-emerald-100
            px-3
            py-1
            text-xs
            font-medium
            text-emerald-700
          "
        >
          {status}
        </span>
      </div>

      <p className="mt-4 text-slate-500">
        {date}
      </p>

      <p className="text-slate-500">
        {time}
      </p>
    </div>
  );
}