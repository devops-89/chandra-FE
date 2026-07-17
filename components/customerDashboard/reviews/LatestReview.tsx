import { Star } from "lucide-react";

import { EmptyState } from "@/components/customerDashboard/shared";
import { useLatestReview } from "@/hooks/useLatestReview";

const LatestReview = () => {
  const { review } = useLatestReview();

  return (
    <section className="space-y-6">
      <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
        Your Latest Review
      </h4>

      {!review ? (
        <EmptyState
          title="No Reviews Yet"
          description="Your latest review will appear here."
        />
      ) : (
        <div className="rounded-xl bg-emerald-600 p-6 text-white">
          <div className="mb-3 flex gap-0.5">
            {Array.from({ length: review.rating }).map((_, index) => (
              <Star
                key={index}
                className="h-4 w-4 fill-white text-white"
              />
            ))}
          </div>
          <p className="mb-4 text-sm font-medium italic leading-relaxed">
            &ldquo;{review.comment}&rdquo;
          </p>
          <p className="text-[11px] font-bold opacity-80">
            — {review.serviceName} ({review.createdAt})
          </p>
        </div>
      )}
    </section>
  );
};

export default LatestReview;

