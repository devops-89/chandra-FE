import BookingInfo from "./BookingInfo";
import ComplaintTimeline from "./ComplaintTimeline";
import CustomerInfo from "./CustomerInfo";
import TechnicianInfo from "./TechnicianInfo";

interface Props {
  open: boolean;
  onClose: () => void;
}

const ComplaintDetailsDrawer = ({
  open,
  onClose,
}: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40">
      <div className="absolute right-0 h-full width:700px overflow-y-auto bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              Complaint Details
            </h2>

            <p className="text-slate-500">
              CMP001
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg border px-4 py-2"
          >
            Close
          </button>
        </div>

        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4">
          <h3 className="font-semibold text-red-700">
            Poor Service Quality
          </h3>

          <p className="mt-2 text-sm text-slate-600">
            Customer reported that the service
            was not completed properly and
            requested a follow-up visit.
          </p>
        </div>

        <div className="space-y-6">
          <ComplaintTimeline />

          <div className="grid gap-6 lg:grid-cols-2">
            <CustomerInfo />
            <TechnicianInfo />
          </div>

          <BookingInfo />

          <div className="rounded-2xl border bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold">
              Resolution Actions
            </h3>

            <div className="flex flex-wrap gap-3">
              <button className="rounded-xl bg-emerald-600 px-5 py-3 text-white">
                Resolve Complaint
              </button>

              <button className="rounded-xl bg-amber-500 px-5 py-3 text-white">
                Issue Refund
              </button>

              <button className="rounded-xl border px-5 py-3">
                Reassign Technician
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetailsDrawer;