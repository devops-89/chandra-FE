'use client';

import {
  Email,
  Person,
  Phone,
} from '@mui/icons-material';

import { useAppSelector } from '@/redux/hooks';

export default function ContactInfo() {
  const technician = useAppSelector(
    (state) => state.technicianProfile.profile
  );
  return (
    <div className="space-y-5">
      <div className="flex gap-4">
        <Person className="text-emerald-500" />

        <div>
          <p className="text-sm text-slate-500">
            Full Name
          </p>

          <p className="font-semibold text-slate-900">
            {technician
            ? `${technician.firstName} ${technician.lastName}`
            : 'Loading...'}
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <Phone className="text-emerald-500" />

        <div>
          <p className="text-sm text-slate-500">
            Phone Number
          </p>

          <p className="font-semibold text-slate-900">
            {technician?.phone ?? 'Loading...'}
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <Email className="text-emerald-500" />

        <div>
          <p className="text-sm text-slate-500">
            Email Address
          </p>

          <p className="font-semibold text-slate-900">
            {technician?.email ?? 'Loading...'}
          </p>
        </div>
      </div>
    </div>
  );
}