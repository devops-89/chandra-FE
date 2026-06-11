import { complaintsData } from "@/constants/admin/complaintData";

import ComplaintRow from "./ComplaintRow";

const ComplaintsTable = () => {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-width:700px">
          <thead className="bg-emerald-600 text-white">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Issue</th>
              <th className="p-4 text-left">Priority</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {complaintsData.map((complaint) => (
              <ComplaintRow key={complaint.id} complaint={complaint} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplaintsTable;
