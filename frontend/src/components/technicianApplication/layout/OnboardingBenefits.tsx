type Props = {
  currentStep?: number;
};

export default function OnboardingBenefits({
  currentStep = 0,
}: Props) {
  // Only show benefits content on Personal Info (Step 0)
  if (currentStep !== 0) {
    // Return empty placeholder to maintain layout
    return <aside className="w-72 shrink-0" />;
  }

  return (
    <aside className="w-72 shrink-0">
      <h2 className="text-4xl font-bold text-[#00875A]">
        Registration
      </h2>
    </aside>
  );
}
