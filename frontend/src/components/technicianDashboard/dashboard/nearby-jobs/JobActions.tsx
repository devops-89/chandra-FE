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
          py-3
          bg-emerald-600
          text-white
          text-sm
          md:text-base
          font-bold
          rounded-xl
          hover:bg-emerald-700
          transition-all
          shadow-md
          shadow-emerald-600/10
        "
      >
        Accept
      </button>

      <button
        type="button"
        onClick={onReject}
        className="
          flex-1
          py-3
          border
          border-slate-300
          text-slate-700
          text-sm
          md:text-base
          font-bold
          rounded-xl
          hover:bg-red-50
          hover:text-red-500
          hover:border-red-300
          transition-all
        "
      >
        Reject
      </button>
    </div>
  );
}