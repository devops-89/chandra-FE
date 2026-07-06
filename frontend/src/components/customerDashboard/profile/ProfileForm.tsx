'use client';

import { useAppSelector } from '@/redux/hooks';

export default function ProfileForm() {
const profile = useAppSelector(
  (state) => state.customerProfile.profile
);

  return (
    <div
      className="
        rounded-3xl
        bg-white
        p-6
        shadow-lg
      "
    >
      <h2 className="mb-6 text-xl font-bold text-slate-950">
        Personal Information
      </h2>

      <div className="grid gap-5">
        <input
          defaultValue={profile?.firstName ?? ''}
          placeholder="First Name"
          className="rounded-xl border border-emerald-600 outline-emerald-600 p-4 text-slate-700"
        />

        <input
          defaultValue={profile?.lastName ?? ''}
          placeholder="Last Name"
          className="rounded-xl border border-emerald-600 outline-emerald-600 p-4 text-slate-700"
        />

        <input
          defaultValue={profile?.email ?? ''}
          placeholder="Email"
          className="rounded-xl border border-emerald-600 outline-emerald-600 p-4 text-slate-700"
        />

        <input
          defaultValue={profile?.phone ?? ''}
          placeholder="Phone"
          className="rounded-xl border border-emerald-600 outline-emerald-600 p-4 text-slate-700"
        />

        <button
          className="rounded-xl bg-emerald-600 px-6 py-3 cursor-pointer text-white transition-all duration-300 hover:bg-emerald-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}