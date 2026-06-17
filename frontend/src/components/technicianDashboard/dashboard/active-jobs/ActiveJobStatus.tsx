'use client';

interface Props {
  status: string;
}

export default function ActiveJobStatus({
  status,
}: Props) {
  return (
    <span
      className="
        bg-emerald-100
        text-emerald-700
        text-xs
        md:text-sm
        px-3
        py-1
        rounded-full
        animate-pulse
        font-medium
      "
    >
      {status}
    </span>
  );
}