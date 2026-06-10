interface Props {
  open: boolean;
  onClose: () => void;
}

const ReleasePayoutModal = ({
  open,
  onClose,
}: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-2xl bg-white p-6">
        <h2 className="mb-3 text-xl font-semibold">
          Release Payout
        </h2>

        <p className="mb-5 text-slate-500">
          Confirm technician payout release.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border px-4 py-2"
          >
            Cancel
          </button>

          <button className="rounded-xl bg-emerald-600 px-4 py-2 text-white">
            Release
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReleasePayoutModal;