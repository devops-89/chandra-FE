'use client';

interface JobActionsProps {
  onAccept?: () => void;
  onReject?: () => void;
}

export default function JobActions({
  onAccept,
  onReject,
}: JobActionsProps) {
  return (
    <div className="flex gap-3">
      <button
        type="button"
        onClick={onAccept}
        className="
          flex-1
          h-12
          px-6
          bg-emerald-700
          text-white
          text-sm
          font-bold
          rounded-full
          cursor-pointer
          hover:bg-emerald-800
          active:scale-[0.98]
          focus:outline-none
          focus:ring-2
          focus:ring-emerald-600/40
          transition-all
          duration-200
          shadow-sm
          hover:shadow-md
          flex
          items-center
          justify-center
        "
      >
        Accept
      </button>

      <button
        type="button"
        onClick={onReject}
        className="
          flex-1
          h-12
          px-6
          border
          border-slate-200
          text-slate-700
          text-sm
          font-bold
          rounded-full
          cursor-pointer
          hover:bg-slate-50
          hover:border-slate-300
          active:scale-[0.98]
          focus:outline-none
          focus:ring-2
          focus:ring-slate-200
          transition-all
          duration-200
          flex
          items-center
          justify-center
        "
      >
        Reject
      </button>
    </div>
  );
}