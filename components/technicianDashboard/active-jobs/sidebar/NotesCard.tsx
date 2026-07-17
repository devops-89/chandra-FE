'use client';

import { InfoOutlined } from '@mui/icons-material';

export default function NotesCard() {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        border-slate-200
        p-6
        shadow-sm
      "
    >
      <div className="flex items-center gap-3 mb-4">
        <InfoOutlined className="text-amber-500" />

        <h3
          className="
            text-lg
            font-bold
            text-slate-900
          "
        >
          Customer Notes
        </h3>
      </div>

      <div
        className="
          rounded-2xl
          bg-amber-50
          border
          border-amber-100
          p-4
        "
      >
        <p
          className="
            text-sm
            text-slate-700
            leading-relaxed
          "
        >
          Please call before arrival.
          Security gate requires visitor entry.
          Customer prefers service between
          10:00 AM and 12:00 PM.
        </p>
      </div>
    </div>
  );
}