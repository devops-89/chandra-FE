interface Props {
  open: boolean;
  bookingId?: string;
  onClose: () => void;
  onConfirm?: () => void;
}

const CancelBookingModal = ({
  open,
  bookingId,
  onClose,
  onConfirm,
}: Props) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-5">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <span className="text-xl text-red-600">⚠️</span>
          </div>

          <h2 className="text-xl font-semibold text-slate-900">
            Cancel Booking
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Are you sure you want to cancel booking{" "}
            <span className="font-medium text-slate-700">
              {bookingId || "HC-1001"}
            </span>
            ?
          </p>
        </div>

        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Cancellation Reason
          </label>

          <textarea
            rows={4}
            placeholder="Enter cancellation reason..."
            className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-red-400"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2 font-medium"
          >
            Keep Booking
          </button>

          <button
            onClick={onConfirm}
            className="rounded-xl bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
          >
            Cancel Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelBookingModal;