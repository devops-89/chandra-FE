'use client';

import AadhaarCard from './AadhaarCard';
import PanCard from './PanCard';
import DrivingLicenseCard from './TradeLicenseCard';

export default function DocumentsCard() {
  return (
    <div
      className="
        bg-white
        border
        border-slate-200
        rounded-3xl
        p-6
        shadow-sm
      "
    >
      <h3
        className="
          text-xl
          font-bold
          text-slate-900
          mb-6
        "
      >
        Verification Documents
      </h3>

      <div className="space-y-4">
        <AadhaarCard />
        <PanCard />
        <DrivingLicenseCard />
      </div>
    </div>
  );
}