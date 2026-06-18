'use client';

import PersonOutlineIcon from '@mui/icons-material/PersonOutlineOutlined';

export default function AccountSettings() {
  return (
    <div
      className="
        bg-white
        border
        border-slate-200
        rounded-3xl
        p-6
        h-full
        shadow-sm
        flex
        flex-col
      "
    >
      <div className="flex items-center gap-3 mb-6">
        <PersonOutlineIcon className="text-emerald-500" />

        <h3 className="text-xl font-bold">
          Account Settings
        </h3>
      </div>

      <div className="space-y-4 mt-auto">
        <button
          className="
            w-full
            text-left
            p-4
            text-emerald-600
            hover:underline
            cursor-pointer
            rounded-2xl
            bg-slate-50
          "
        >
          Edit Profile Information
        </button>

        {/* <button
          className="
            w-full
            text-left
            p-4
            text-emerald-600
            hover:underline
            cursor-pointer
            rounded-2xl
            bg-slate-50
          "
        >
          Change Profile Picture
        </button> */}
      </div>
    </div>
  );
}