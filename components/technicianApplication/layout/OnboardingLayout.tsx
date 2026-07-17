import type { ReactNode } from "react";

import OnboardingFooter from "./OnboardingFooter";
import OnboardingHeader from "./OnboardingHeader";
import OnboardingSidebar from "./OnboardingSidebar";

type Props = {
  children: ReactNode;
  currentStep?: number;
};

export default function OnboardingLayout({
  children,
  currentStep = 0,
}: Props) {
  return (
    <>
      <OnboardingHeader />

      {/* Mobile Header - Only visible on mobile */}
      <div className="md:hidden bg-white sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex justify-between items-start mb-3">
            <h2 className="text-lg font-bold text-emerald-700">
              Registration
            </h2>
            <span className="text-xs font-medium text-gray-500">
              Step {currentStep + 1} of 6
            </span>
          </div>
          {/* Progress Bar */}
          <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 transition-all duration-300"
              style={{ width: `${((currentStep + 1) / 6) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <main className="bg-[#F8F9FA] px-4 md:px-16 py-6 md:py-10">
        <div className="flex gap-8 md:gap-12">
          {/* Desktop Sidebar - Hidden on mobile */}
          <div className="hidden md:block">
            <OnboardingSidebar
              currentStep={currentStep}
            />
          </div>

          {/* Main Content - Responsive */}
          <div className="flex-1 max-w-full md:flex-1 w-full md:w-auto">
            {/* Mobile Container - Max width on mobile */}
            <div className="md:max-w-none max-w-2xl mx-auto w-full">
              {children}
            </div>
          </div>
        </div>
      </main>

      {currentStep === 0 && <OnboardingFooter />}
    </>
  );
}