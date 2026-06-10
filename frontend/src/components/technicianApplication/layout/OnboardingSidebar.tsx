import Link from 'next/link';

import { onboardingSteps } from "@/constants/technicianApplication/onboardingSteps";

type Props = {
  currentStep: number;
};

const stepRoutes = [
  '/technicianOnboarding/personal-info',
  '/technicianOnboarding/skill-tagging',
  '/technicianOnboarding/document-upload',
  '/technicianOnboarding/tool-inventory',
  '/technicianOnboarding/service-area',
  '/technicianOnboarding/review-submit',
];

export default function OnboardingSidebar({
  currentStep,
}: Props) {
  return (
    <aside className="w-72 shrink-0 sticky top-0 h-screen overflow-y-auto p-6">
      <h2 className="text-2xl font-bold text-[#00875A]">
        Registration
      </h2>

      <p className="text-gray-500 mt-2">
        Step {currentStep + 1} of {onboardingSteps.length}
      </p>

      <div className="mt-8 space-y-3">
        {onboardingSteps.map((step, index) => (
          <Link
            key={step}
            href={stepRoutes[index]}
            className={`block rounded-xl px-4 py-3 cursor-pointer transition-colors duration-200 ${
              index === currentStep
                ? "bg-green-100 text-[#00875A]"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {step}
          </Link>
        ))}
      </div>
    </aside>
  );
}