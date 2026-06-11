import type { Technician } from "@/constants/admin/technicianData";

interface Props {
  technician: Technician;
}

const TechnicianRow = ({ technician }: Props) => {
  return (
    <tr>
      <td className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white">
            {technician.name[0]}
          </div>

          <div>
            <p className="font-medium">
              {technician.name}
            </p>

            <p className="text-sm text-slate-500">
              {technician.city}
            </p>
          </div>
        </div>
      </td>

      <td className="p-4">
        {technician.experience} Years
      </td>

      <td className="p-4">
        ⭐ {technician.rating}
      </td>

      <td className="p-4">
        {technician.completedJobs}
      </td>

      <td className="p-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            technician.status === "Active"
              ? "bg-emerald-100 text-emerald-700"
              : technician.status === "Pending"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {technician.status}
        </span>
      </td>

      <td className="p-4">
        <button className="text-emerald-600 hover:underline cursor-pointer">
          View
        </button>
      </td>
    </tr>
  );
};

export default TechnicianRow;