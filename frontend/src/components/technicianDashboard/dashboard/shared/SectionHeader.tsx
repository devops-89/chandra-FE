'use client';

interface SectionHeaderProps {
  title: string;
  actionText?: string;
  onAction?: () => void;
}

export default function SectionHeader({
  title,
  actionText,
  onAction,
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h4 className="text-lg md:text-xl font-bold text-slate-900">
        {title}
      </h4>

      {actionText && (
        <button
          type="button"
          onClick={onAction}
          className="
            text-emerald-600
            text-sm
            font-medium
            hover:underline
          "
        >
          {actionText}
        </button>
      )}
    </div>
  );
}