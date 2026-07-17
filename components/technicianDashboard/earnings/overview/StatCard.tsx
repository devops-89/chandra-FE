'use client';

interface Props {
  title: string;
  value: string;
  change: string;
}

export default function StatCard({
  title,
  value,
  change,
}: Props) {
  return (
    <div
      className="
        bg-white
        border
        border-slate-200
        rounded-3xl
        p-5
        shadow-sm
      "
    >
      <div className="flex justify-between items-start">
        <p className="text-slate-500 text-sm">
          {title}
        </p>

        <span
          className="
            text-xs
            px-2
            py-1
            rounded-full
            bg-emerald-100
            text-emerald-700
            font-medium
          "
        >
          {change}
        </span>
      </div>

      <h3
        className="
          mt-4
          text-3xl
          font-bold
          text-slate-900
        "
      >
        {value}
      </h3>
    </div>
  );
}