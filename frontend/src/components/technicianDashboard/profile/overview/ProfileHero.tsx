'use client';

import Image from 'next/image';

import { useAppSelector } from '@/redux/hooks';

import VerificationBadge from './VerificationBadge';

export default function ProfileHero() {
  const technician = useAppSelector(
    (state) => state.technicianProfile.profile
  );
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
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div
          className="
            h-28
            w-28
            rounded-full
            overflow-hidden
            border-4
            border-emerald-100
          "
        >
          <Image
            src={
              technician?.profileImage ??
              '/images/technician-avatar.png'
            }
            alt="Technician"
            width={120}
            height={120}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <h2 className="text-3xl font-bold text-slate-900">
              {technician
              ? `${technician.firstName} ${technician.lastName}`
              : 'Loading...'}
            </h2>

            <VerificationBadge />
          </div>

          <p className="mt-2 text-slate-500">
            {technician?.role === 'TECHNICIAN'
            ? 'Technician'
            : technician?.role}
          </p>

          <p className="mt-1 text-slate-400">
            Joined{' '}
            {technician
            ? new Date(technician.createdAt).toLocaleDateString(
              'en-IN',
              {
                month: 'long',
                year: 'numeric',
              }
            )
            : ''}
          </p>
        </div>

        <button
          className="
            px-6
            py-3
            rounded-2xl
            bg-emerald-600
            text-white
            font-semibold
            cursor-pointer
            hover:bg-emerald-700
            transition-all
          "
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}