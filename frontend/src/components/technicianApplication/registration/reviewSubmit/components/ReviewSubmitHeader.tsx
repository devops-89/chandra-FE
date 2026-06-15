'use client';

import type { ReviewSubmitHeaderProps } from '@/types/technicianApplication/reviewSubmit.types';

export default function ReviewSubmitHeader({
  title = 'Review Your Application',
  description = 'Please take a moment to double-check your information. Once submitted, your profile will be sent to our onboarding team for manual verification.',
}: ReviewSubmitHeaderProps) {
  return (
    <header className="mb-12">
      <h1 className="text-3xl md:text-5xl font-bold text-on-surface mb-4">{title}</h1>
      <p className="text-lg text-slate-500 max-w-2xl">{description}</p>
    </header>
  );
}
