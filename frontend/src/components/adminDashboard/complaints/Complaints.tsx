import ComplaintFilters from "./list/ComplaintFilters";
import ComplaintsTable from "./list/ComplaintsTable";
import ComplaintStats from "./stats/ComplaintStats";

const Complaints = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Complaints
        </h1>

        <p className="text-slate-500">
          Track and resolve customer issues
        </p>
      </div>

      <ComplaintStats />

      <ComplaintFilters />

      <ComplaintsTable />
    </div>
  );
};

export default Complaints;