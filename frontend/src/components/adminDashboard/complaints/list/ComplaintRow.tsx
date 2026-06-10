import type { Complaint } from "@/constants/admin/complaintData";

interface Props {
  complaint: Complaint;
}

const ComplaintRow = ({ complaint }: Props) => {
  return (
    <tr className="border-b">
      <td className="p-4">{complaint.id}</td>

      <td className="p-4">
        {complaint.customerName}
      </td>

      <td className="p-4">
        {complaint.issueType}
      </td>

      <td className="p-4">
        <span
          className={`rounded-full px-3 py-1 text-xs ${
            complaint.priority === "High"
              ? "bg-red-100 text-red-700"
              : complaint.priority === "Medium"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {complaint.priority}
        </span>
      </td>

      <td className="p-4">
        {complaint.status}
      </td>

      <td className="p-4">
        {complaint.createdAt}
      </td>

      <td className="p-4">
        <button className="text-emerald-600">
          View
        </button>
      </td>
    </tr>
  );
};

export default ComplaintRow;