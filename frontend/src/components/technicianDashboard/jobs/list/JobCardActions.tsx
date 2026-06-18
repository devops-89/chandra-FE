import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface JobCardActionsProps {
  onAccept?: () => void;
  onReject?: () => void;
  onViewDetails?: () => void;
}

export default function JobCardActions({
  onAccept,
  onReject,
  onViewDetails,
}: JobCardActionsProps) {
  return (
    <>
      <div className="border-t border-slate-200 my-6" />

      <div
        className="
          flex
          flex-col
          lg:flex-row
          gap-4
          items-center
        "
      >
        <button
          onClick={onAccept}
          className="
            flex-1
            w-full
            py-4
            rounded-2xl
            cursor-pointer
            bg-emerald-600
            text-white
            font-semibold
            hover:bg-emerald-700
            transition-all
          "
        >
          Accept Job
        </button>

        <button
          onClick={onReject}
          className="
            flex-1
            w-full
            py-4
            rounded-2xl
            border
            cursor-pointer
            border-slate-300
            text-slate-700
            font-semibold
            hover:bg-slate-50
          "
        >
          Reject
        </button>

        <button
          onClick={onViewDetails}
          className="
            flex
            items-center
            gap-2
            cursor-pointer
            hover:underline
            text-emerald-500
            font-semibold
            whitespace-nowrap
          "
        >
          View Details

          <ArrowForwardIcon />
        </button>
      </div>
    </>
  );
}