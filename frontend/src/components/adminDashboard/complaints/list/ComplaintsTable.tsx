import { complaintsData } from "@/constants/admin/complaintData";

import ComplaintRow from "./ComplaintRow";

const ComplaintsTable = () => {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="p-4 text-left">
              ID
            </th>

            <th className="p-4 text-left">
              Customer
            </th>

            <th className="p-4 text-left">
              Issue
            </th>

            <th className="p-4 text-left">
              Priority
            </th>

            <th className="p-4 text-left">
              Status
            </th>

            <th className="p-4 text-left">
              Date
            </th>

            <th className="p-4 text-left">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {complaintsData.map((complaint) => (
            <ComplaintRow
              key={complaint.id}
              complaint={complaint}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintsTable;