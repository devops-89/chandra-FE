'use client';

interface Props {
  title: string;
  description?: string;
}

export default function EmptyState({
  title,
  description,
}: Props) {
  return (
    <div className="py-12 text-center">
      <h3 className="text-lg font-semibold text-slate-700">
        {title}
      </h3>

      {description && (
        <p className="text-sm text-slate-500 mt-2">
          {description}
        </p>
      )}
    </div>
  );
}