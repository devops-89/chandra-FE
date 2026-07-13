import ReviewFilters from "./list/ReviewFilters";
import ReviewsTable from "./list/ReviewsTable";
import ReviewStats from "./stats/ReviewStats";

const Reviews = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Reviews & Ratings
        </h1>
        <p className="text-slate-500">Manage customer feedback and ratings</p>
      </div>

      {/* <ReviewStats /> */}
      {/* <ReviewFilters /> */}
      <ReviewsTable />
    </div>
  );
};

export default Reviews;
