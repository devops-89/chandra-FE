interface AvailabilityUnavailableProps {
  onClose: () => void;
}

export function AvailabilityUnavailable({ onClose }: AvailabilityUnavailableProps) {
  return (
    <div className="flex flex-col items-center gap-5 py-4 text-center">
      {/* Icon */}
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 text-4xl">
        ❌
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-900">
          Services Not Available Yet
        </h2>
        <p className="text-slate-500">
          We haven&apos;t launched in your area yet, but we&apos;re expanding fast. Leave your details and we&apos;ll notify you when we go live.
        </p>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="
          w-full rounded-full
          bg-slate-900 px-6 py-3.5
          text-base font-semibold text-white
          transition-all duration-300
          hover:bg-slate-700 active:scale-[0.98]
          cursor-pointer
        "
      >
        Notify Me
      </button>

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
