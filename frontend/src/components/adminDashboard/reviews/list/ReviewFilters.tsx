const ReviewFilters = () => {
  return (
    <div className="rounded-2xl border bg-white p-4">
      <div className="flex flex-wrap gap-4">
        <input
          placeholder="Search reviews..."
          className="h-11 flex-1 rounded-xl border px-4"
        />

        <select className="h-11 rounded-xl border px-4">
          <option>All Ratings</option>
          <option>5 Stars</option>
          <option>4 Stars</option>
          <option>3 Stars</option>
          <option>2 Stars</option>
          <option>1 Star</option>
        </select>

        <select className="h-11 rounded-xl border px-4">
          <option>All Status</option>
          <option>Published</option>
          <option>Hidden</option>
        </select>
      </div>
    </div>
  );
};

export default ReviewFilters;