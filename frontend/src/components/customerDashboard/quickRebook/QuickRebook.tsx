import RebookCard from "@/components/customerDashboard/quickRebook/RebookCard";
import { EmptyState } from "@/components/customerDashboard/shared";
import { rebookServices } from "@/constants/customerDashboard/dashboard/rebookServices";

const QuickRebook = () => {
  return (
    <section className="mt-17 space-y-6">
      <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
        Quick Rebook
      </h4>

      {rebookServices.length === 0 ? (
        <EmptyState
          title="No Services Found"
          description="Previously booked services will appear here."
        />
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {rebookServices.map((service) => (
            <RebookCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </section>
  );
};

export default QuickRebook;
