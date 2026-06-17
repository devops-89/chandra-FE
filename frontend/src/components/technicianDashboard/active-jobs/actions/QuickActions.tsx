'use client';

import CallCustomerButton from './CallCustomerButton';
import NavigateButton from './NavigateButton';
import StartJobButton from './StartJobButton';

export default function QuickActions() {
  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold mb-5">
        Quick Actions
      </h3>

      <div className="grid md:grid-cols-3 gap-4">
        <CallCustomerButton />
        <NavigateButton />
        <StartJobButton />
      </div>
    </div>
  );
}