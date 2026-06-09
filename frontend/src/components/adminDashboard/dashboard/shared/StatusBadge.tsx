'use client';

interface Props {
  label: string;
  type?: 'success' | 'warning' | 'error' | 'info';
}

export default function StatusBadge({
  label,
  type = 'success',
}: Props) {
  const styles = {
    success:
      'bg-emerald-100 text-emerald-700',
    warning:
      'bg-yellow-100 text-yellow-700',
    error:
      'bg-red-100 text-red-700',
    info:
      'bg-slate-100 text-slate-700',
  };

  return (
    <span
      className={`
        px-3
        py-1
        rounded-full
        text-xs
        font-semibold
        ${styles[type]}
      `}
    >
      {label}
    </span>
  );
}