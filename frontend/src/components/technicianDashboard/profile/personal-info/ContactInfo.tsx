'use client';

import {
  Email,
  Person,
  Phone,
} from '@mui/icons-material';

export default function ContactInfo() {
  return (
    <div className="space-y-5">
      <div className="flex gap-4">
        <Person className="text-emerald-500" />

        <div>
          <p className="text-sm text-slate-500">
            Full Name
          </p>

          <p className="font-semibold text-slate-900">
            Vikram Singh
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
            +91 98765 43210
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
            vikram@example.com
          </p>
        </div>
      </div>
    </div>
  );
}