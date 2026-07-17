const TransactionFilters = () => {
  return (
    <div className="rounded-2xl border bg-white p-4">
      <div className="flex gap-4">
        <input
          placeholder="Search Transaction..."
          className="h-11 flex-1 rounded-xl border px-4"
        />

        <select className="h-11 rounded-xl border px-4">
          <option>All Status</option>
          <option>Success</option>
          <option>Pending</option>
          <option>Failed</option>
        </select>
      </div>
    </div>
  );
};

export default TransactionFilters;