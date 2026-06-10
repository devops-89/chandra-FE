import ReviewStatCard from "./ReviewStatCard";

const ReviewStats = () => {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <ReviewStatCard
        title="Total Reviews"
        value="2,486"
      />

      <ReviewStatCard
        title="Average Rating"
        value="4.8"
      />

      <ReviewStatCard
        title="5 Star Reviews"
        value="1,932"
      />

      <ReviewStatCard
        title="Hidden Reviews"
        value="18"
      />
    </div>
  );
};

export default ReviewStats;