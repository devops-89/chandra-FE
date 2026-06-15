import type { Review } from "@/constants/admin/reviewData";

interface Props {
  review: Review;
}

const ReviewCard = ({ review }: Props) => {
  return (
    <div className="border border-slate-200 rounded-2xl bg-white p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between cursor-default">
      <div>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white text-base font-semibold shrink-0">
              {review.customerName[0]}
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 leading-snug">
                {review.customerName}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {review.date}
              </p>
            </div>
          </div>

          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
              review.status === "Published"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {review.status}
          </span>
        </div>

        <div className="mt-4 space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-medium">{review.serviceName}</span>
            <span className="font-semibold text-amber-500 flex items-center gap-0.5">
              ⭐ {review.rating}
            </span>
          </div>
          <p className="text-xs text-slate-600 font-medium">
            Technician: <span className="text-slate-800">{review.technicianName}</span>
          </p>
        </div>

        <p className="mt-4 text-sm text-slate-600 italic leading-relaxed line-clamp-3">
          "{review.comment}"
        </p>
      </div>

      <div className="flex justify-end mt-4 pt-3 border-t border-slate-100">
        <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm hover:underline cursor-pointer">
          View
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;
