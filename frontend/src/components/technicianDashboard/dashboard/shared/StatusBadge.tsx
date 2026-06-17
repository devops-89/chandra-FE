'use client';

interface StatusBadgeProps {
  label: string;
  variant?: 'success' | 'primary' | 'warning';
}

export default function StatusBadge({
  label,
  variant = 'success',
}: StatusBadgeProps) {
  const variants = {
    success:
      'bg-emerald-100 text-emerald-700',

    primary:
      'bg-emerald-50 text-emerald-600',

    warning:
      'bg-amber-100 text-amber-700',
  };

  return (
    <span
      className={`
        px-2 py-1
        rounded-full
        text-[10px]
        md:text-xs
        font-semibold
        ${variants[variant]}
      `}
    >
      {label}
    </span>
  );
}