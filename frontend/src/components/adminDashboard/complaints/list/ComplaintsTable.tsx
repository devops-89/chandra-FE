import { complaintsData } from "@/constants/admin/complaintData";

import ComplaintCard from "./ComplaintCard";

const ComplaintsTable = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-400 bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {complaintsData.map((complaint) => (
          <ComplaintCard key={complaint.id} complaint={complaint} />
        ))}
      </div>
    </div>
  );
};

export default ComplaintsTable;
