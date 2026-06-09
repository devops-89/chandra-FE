import type { BrandTagProps } from '@/types/technicianApplication/skillTagging.types';

export default function BrandTag({
  name,
  onRemove,
}: BrandTagProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1">
      <span className="text-sm font-medium text-emerald-700">{name}</span>
      <button
        onClick={onRemove}
        className="cursor-pointer text-emerald-700 hover:text-emerald-900"
        type="button"
      >
        <svg
          className="h-4 w-4"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}
