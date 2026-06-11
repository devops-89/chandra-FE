import { reviewsData } from "@/constants/admin/reviewData";

import ReviewRow from "./ReviewRow";

const ReviewsTable = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-400 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-emerald-600 text-white">
            <tr>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Technician</th>
              <th className="p-4 text-left">Service</th>
              <th className="p-4 text-left">Rating</th>
              <th className="p-4 text-left">Comment</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {reviewsData.map((review) => (
              <ReviewRow key={review.id} review={review} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewsTable;
