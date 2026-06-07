import TechnicianCard from "@/components/customerDashboard/favoriteTechnicians/TechnicianCard";
import { EmptyState } from "@/components/customerDashboard/shared";
import { useFavoriteTechnicians } from "@/hooks/useFavoriteTechnicians";

const FavoriteTechnicians = () => {
  const { technicians } = useFavoriteTechnicians();

  return (
    <section className="space-y-6">
      <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
        Favorite Technicians
      </h4>

      {technicians.length === 0 ? (
        <EmptyState
          title="No Favorite Technicians"
          description="Your favorite technicians will appear here."
        />
      ) : (
        <div className="space-y-4 text-black">
          {technicians.map((technician) => (
            <TechnicianCard key={technician.id} technician={technician} />
          ))}
        </div>
      )}
    </section>
  );
};

export default FavoriteTechnicians;
