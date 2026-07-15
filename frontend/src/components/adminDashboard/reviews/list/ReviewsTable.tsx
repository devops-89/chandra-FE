import { reviewsData } from "@/constants/admin/reviewData";

import ReviewCard from "./ReviewCard";

const ReviewsTable = () => {
  return (
    <div className="overflow-hidden rounded-2xl text-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {reviewsData.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ReviewsTable;
