import Link from 'next/link';

interface AvailabilitySuccessProps {
  onClose: () => void;
}

export function AvailabilitySuccess({ onClose }: AvailabilitySuccessProps) {
  return (
    <div className="flex flex-col items-center gap-5 py-4 text-center">
      {/* Icon */}
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-4xl">
        ✅
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-900">
          Services Available In Your Area!
        </h2>
        <p className="text-slate-500">
          Great news — HiChandra services are live in your pincode. Book a service today.
        </p>
      </div>

      <Link
        href="/services"
        onClick={onClose}
        className="
          w-full rounded-full
          bg-emerald-600 px-6 py-3.5
          text-base font-semibold text-white
          transition-all duration-300
          hover:bg-emerald-700 active:scale-[0.98]
          text-center
        "
      >
        Explore Services
      </Link>

      <button
        type="button"
        onClick={onClose}
        className="text-sm text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
      >
        Close
      </button>
    </div>
  );
}
