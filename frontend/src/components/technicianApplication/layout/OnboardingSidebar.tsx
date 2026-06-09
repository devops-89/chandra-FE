import { onboardingSteps } from "@/constants/technicianApplication/onboardingSteps";

type Props = {
  currentStep: number;
};

export default function OnboardingSidebar({
  currentStep,
}: Props) {
  return (
    <aside className="w-72 shrink-0">
      <h2 className="text-2xl font-bold text-[#00875A]">
        Registration
      </h2>

      <p className="text-gray-500 mt-2">
        Step {currentStep + 1} of {onboardingSteps.length}
      </p>

      <div className="mt-8 space-y-3">
        {onboardingSteps.map((step, index) => (
          <div
            key={step}
            className={`rounded-xl px-4 py-3 ${
              index === currentStep
                ? "bg-green-100 text-[#00875A]"
                : "text-gray-600"
            }`}
          >
            {step}
          </div>
        ))}
      </div>
    </aside>
  );
}