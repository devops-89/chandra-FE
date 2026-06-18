'use client';

import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';

export default function ContactInfoCard() {
  return (
    <div
      className="
        bg-white
        border
        border-slate-200
        rounded-3xl
        p-6
        mt-4
        shadow-sm
        m-auto
      "
    >
      <h3 className="text-xl font-bold mb-6">
        Contact Support
      </h3>

      <div className="space-y-5">
        <div className="flex gap-4">
          <PhoneOutlinedIcon className="text-emerald-500" />

          <div>
            <p className="text-sm text-slate-500">
              Support Helpline
            </p>

            <p className="font-semibold">
              +91 1800-123-4567
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <EmailOutlinedIcon className="text-emerald-500" />

          <div>
            <p className="text-sm text-slate-500">
              Email Support
            </p>

            <p className="font-semibold">
              support@hichandra.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}