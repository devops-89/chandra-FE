export default function OnboardingHeader() {
  return (
    <header className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#00875A]">
          HiChandra
        </h1>

        <button className="text-sm text-gray-600 hover:text-black">
          Save & Exit
        </button>
      </div>
    </header>
  );
}