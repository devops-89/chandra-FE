const CustomerReviews = () => {
  return (
    <div className="rounded-2xl bg-white p-6">
      <h3 className="mb-4 text-lg font-semibold">
        Reviews
      </h3>

      <div className="space-y-4">
        <div className="rounded-xl border-4 border-emerald-600 p-4">
          ⭐⭐⭐⭐⭐ Excellent technician
        </div>

        <div className="rounded-xl border-4 border-emerald-600 p-4">
          ⭐⭐⭐⭐ Good service
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;