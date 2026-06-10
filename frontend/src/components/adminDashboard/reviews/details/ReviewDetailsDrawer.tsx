interface Props {
  open: boolean;
  onClose: () => void;
}

const ReviewDetailsDrawer = ({
  open,
  onClose,
}: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40">
      <div className="absolute right-0 h-full width:550px bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            Review Details
          </h2>

          <button
            onClick={onClose}
            className="text-slate-500"
          >
            Close
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="font-medium">
              Customer
            </h4>

            <p className="text-slate-600">
              Rahul Sharma
            </p>
          </div>

          <div>
            <h4 className="font-medium">
              Technician
            </h4>

            <p className="text-slate-600">
              Arjun Sharma
            </p>
          </div>

          <div>
            <h4 className="font-medium">
              Service
            </h4>

            <p className="text-slate-600">
              AC Repair
            </p>
          </div>

          <div>
            <h4 className="font-medium">
              Rating
            </h4>

            <p className="text-yellow-500">
              ⭐⭐⭐⭐⭐
            </p>
          </div>

          <div>
            <h4 className="font-medium">
              Review
            </h4>

            <div className="mt-2 rounded-xl border p-4">
              Excellent service and very
              professional technician.
            </div>
          </div>

          <div className="flex gap-3">
            <button className="rounded-xl bg-emerald-600 px-4 py-2 text-white">
              Publish
            </button>

            <button className="rounded-xl bg-red-600 px-4 py-2 text-white">
              Hide Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetailsDrawer;