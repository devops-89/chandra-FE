'use client';

import Link from 'next/link';

import { onboardingSteps } from '@/constants/technicianApplication/onboardingSteps';
import { isOnboardingLockEnabled, isStepComplete } from '@/lib/onboarding/onboardingProgress';
import { useAppSelector } from '@/redux/hooks';

type Props = {
  currentStep: number;
};

const stepRoutes = [
  '/technician/onboarding/register',
  '/technician/onboarding/skills-equipment',
  '/technician/onboarding/document-upload',
  '/technician/onboarding/service-area',
  '/technician/onboarding/bank-details',
  '/technician/onboarding/review-submit',
];

export default function OnboardingSidebar({ currentStep }: Props) {
  const lockEnabled = isOnboardingLockEnabled();
  const { user } = useAppSelector((state) => state.auth);
  const isExistingTechnician = Boolean(user && user.role === 'TECHNICIAN');

  return (
    <aside className="w-72 shrink-0 sticky top-0 h-screen overflow-y-auto p-6">
      <h2 className="text-2xl font-bold text-[#00875A]">Registration</h2>

      <p className="text-gray-500 mt-2">
        Step {currentStep + 1} of {onboardingSteps.length}
      </p>

      <div className="mt-8 space-y-3">
        {onboardingSteps.map((step, index) => {
          if (isExistingTechnician && index === 0) return null;

          const isActive  = index === currentStep;
          // A step is accessible when: lock is off, OR it's step 0 (or step 1 for existing techs), OR the previous step is done
          const accessible = !lockEnabled || (isExistingTechnician ? index === 1 : index === 0) || isStepComplete(index - 1);
          const done       = lockEnabled && isStepComplete(index);

          if (!accessible) {
            // Locked — render a non-interactive div
            return (
              <div
                key={step}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-gray-400 cursor-not-allowed select-none"
                title="Complete the previous step first"
              >
                <span>{step}</span>
                <span className="text-xs">🔒</span>
              </div>
            );
          }

          return (
            <Link
              key={step}
              href={stepRoutes[index]}
              className={`flex items-center justify-between rounded-xl px-4 py-3 cursor-pointer transition-colors duration-200 ${
                isActive
                  ? 'bg-green-100 text-[#00875A]'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span>{step}</span>
              {done && !isActive && (
                <span className="text-xs text-emerald-600">✓</span>
              )}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
