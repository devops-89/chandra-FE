interface Props {
  open: boolean;
  onClose: () => void;
}

const VerificationDrawer = ({ open, onClose }: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40">
      <div className="absolute right-0 h-full w-full max-w-[500px] bg-white p-6 overflow-y-auto">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">Technician Details</h2>

          <button
            onClick={onClose}
            className="rounded-xl border px-4 py-2 hover:bg-slate-50 transition-colors"
          >
            Close
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <h4 className="font-medium">Personal Details</h4>
            <p className="text-slate-500">Arjun Sharma</p>
          </div>

          <div>
            <h4 className="font-medium">Documents</h4>

            <div className="space-y-2">
              <div className="rounded-lg border p-3">Aadhaar.pdf</div>
              <div className="rounded-lg border p-3">PAN.pdf</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="rounded-xl bg-emerald-600 px-5 py-3 cursor-pointer text-white hover:bg-emerald-700 transition-colors">
              Approve
            </button>

            <button className="rounded-xl border px-5 py-3 cursor-pointer hover:bg-slate-50 transition-colors">
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationDrawer;
