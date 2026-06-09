'use client';

interface ActionButtonProps {
  label: string;
  variant?: 'approve' | 'reject' | 'view';
  onClick?: () => void;
}

export default function ActionButton({
  label,
  variant = 'view',
  onClick,
}: ActionButtonProps) {
  const styles = {
    approve:
      'bg-emerald-700 text-white hover:bg-emerald-800',
    reject:
      'bg-slate-100 text-slate-700 hover:bg-slate-200',
    view:
      'text-emerald-700 hover:bg-emerald-50',
  };

  return (
    <button
      onClick={onClick}
      className={`
        px-4
        py-2
        rounded-lg
        text-sm
        font-medium
        transition-all
        ${styles[variant]}
      `}
    >
      {label}
    </button>
  );
}