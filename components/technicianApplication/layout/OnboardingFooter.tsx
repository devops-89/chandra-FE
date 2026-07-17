export default function OnboardingFooter() {
  return (
    <section className="mt-8 mb-8 px-4 md:px-0">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <div className="text-center">
          <span className="material-symbols-outlined text-emerald-700 text-3xl md:text-4xl mb-2 md:mb-3 block">
            speed
          </span>
          <h5 className="font-medium text-sm md:text-base mb-1">Fast Approval</h5>
          <p className="text-xs md:text-sm text-gray-600 px-2 md:px-4">
            Get vetted and start working in as little as 48 hours.
          </p>
        </div>
        <div className="text-center">
          <span className="material-symbols-outlined text-emerald-700 text-3xl md:text-4xl mb-2 md:mb-3 block">
            payments
          </span>
          <h5 className="font-medium text-sm md:text-base mb-1">Weekly Payouts</h5>
          <p className="text-xs md:text-sm text-gray-600 px-2 md:px-4">
            Direct deposit of your earnings every Tuesday morning.
          </p>
        </div>
        <div className="text-center">
          <span className="material-symbols-outlined text-emerald-700 text-3xl md:text-4xl mb-2 md:mb-3 block">
            shield
          </span>
          <h5 className="font-medium text-sm md:text-base mb-1">Insured Work</h5>
          <p className="text-xs md:text-sm text-gray-600 px-2 md:px-4">
            Every job booked through HiChandra is fully insured.
          </p>
        </div>
      </div>
    </section>
  );
}
