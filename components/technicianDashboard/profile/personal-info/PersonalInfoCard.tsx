'use client';

import AddressInfo from './AddressInfo';
import ContactInfo from './ContactInfo';

export default function PersonalInfoCard() {
  return (
    <div
      className="
        bg-white
        border
        h-full
        border-slate-200
        rounded-3xl
        p-6
        space-y-8
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
        Personal Information
      </h3>

      <ContactInfo />

      <div className="my-6 border-t border-slate-200" />

      <AddressInfo />
    </div>
  );
}