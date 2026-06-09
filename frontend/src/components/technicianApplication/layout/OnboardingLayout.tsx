import type { ReactNode } from "react";

import OnboardingBenefits from "./OnboardingBenefits";
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

      <main className="max-w-7xl mx-auto px-16 py-10">
        <div className="flex gap-12">
          <OnboardingSidebar
            currentStep={currentStep}
          />

          <div className="flex-1">
            {children}
          </div>

          <OnboardingBenefits currentStep={currentStep} />
        </div>
      </main>

      {currentStep === 0 && <OnboardingFooter />}
    </>
  );
}