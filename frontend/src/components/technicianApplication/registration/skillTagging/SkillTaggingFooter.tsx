import Link from 'next/link';

interface SkillTaggingFooterProps {
  onNext: () => void;
}

export default function SkillTaggingFooter({
  onNext,
}: SkillTaggingFooterProps) {
  return (
    <div className="flex gap-4 pt-8">
      <Link
        href="/technicianOnboarding/personal-info"
        className="rounded-lg border border-gray-300 px-6 py-2 font-medium text-gray-700 hover:bg-gray-50"
      >
        Back To Profile
      </Link>
      <button
        onClick={onNext}
        className="rounded-lg bg-emerald-700 px-6 py-2 cursor-pointer font-medium text-white hover:bg-emerald-800"
      >
        Next Step
      </button>
    </div>
  );
}
