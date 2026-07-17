import ComplaintStatCard from "./ComplaintStatCard";

const ComplaintStats = () => {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
      <ComplaintStatCard title="Open Complaints" value="18" />
      <ComplaintStatCard title="In Progress" value="7" />
      <ComplaintStatCard title="Resolved" value="126" />
      <ComplaintStatCard title="Refund Requests" value="5" />
    </div>
  );
};

export default ComplaintStats;
