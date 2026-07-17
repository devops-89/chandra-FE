import Link from 'next/link';

interface SkillTaggingFooterProps {
  onNext: () => void;
  disabled?: boolean;
}

export default function SkillTaggingFooter({
  onNext,
  disabled = false,
}: SkillTaggingFooterProps) {
  return (
    <div className="flex gap-4 pt-8 border-t border-gray-200">
      <Link
        href="/technician/onboarding/register"
        className="rounded-lg border border-gray-300 px-6 py-2 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
      >
        ← Back To Profile
      </Link>
      <button
        type="button"
        onClick={onNext}
        disabled={disabled}
        className={`rounded-lg px-6 py-2 font-medium text-white transition-colors ${
          disabled
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-emerald-700 cursor-pointer hover:bg-emerald-800'
        }`}
      >
        Save &amp; Continue →
      </button>
    </div>
  );
}
