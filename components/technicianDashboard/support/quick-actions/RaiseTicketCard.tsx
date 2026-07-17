'use client';

import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';

export default function RaiseTicketCard() {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        border-slate-200
        p-6
        shadow-sm
        hover:border-emerald-500
        transition-all
      "
    >
      <div
        className="
          h-14
          w-14
          rounded-2xl
          bg-emerald-100
          flex
          items-center
          justify-center
        "
      >
        <ConfirmationNumberOutlinedIcon className="text-emerald-600" />
      </div>

      <h3 className="mt-5 text-xl font-bold">
        Raise Ticket
      </h3>

      <p className="mt-2 text-slate-500">
        Create a support request for payment,
        account, or job issues.
      </p>

      <button
        className="
          mt-6
          w-full
          py-3
          rounded-2xl
          bg-emerald-500
          text-white
          font-semibold
        "
      >
        Create Ticket
      </button>
    </div>
  );
}