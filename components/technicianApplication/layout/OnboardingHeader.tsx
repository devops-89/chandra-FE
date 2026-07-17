export default function OnboardingHeader() {
  return (
    <header className="border-b bg-white sticky top-0 z-20">
      <div className="w-full px-4 md:px-21 h-14 md:h-16 flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-bold text-emerald-700">
          HiChandra
        </h1>

        <button type="button" className="text-xs md:text-sm text-gray-600 cursor-pointer hover:text-emerald-600 transition-colors">
          Save & Exit
        </button>
      </div>
    </header>
  );
}