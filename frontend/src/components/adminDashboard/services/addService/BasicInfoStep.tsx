const BasicInfoStep = () => {
  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-lg">
        Basic Information
      </h2>

      <input
        placeholder="Service Name"
        className="w-full rounded-xl border p-3"
      />

      <div className="grid gap-4 md:grid-cols-2">
        <select className="rounded-xl border p-3">
          <option>Select Category</option>
        </select>

        <select className="rounded-xl border p-3">
          <option>Select Subcategory</option>
        </select>
      </div>
    </div>
  );
};

export default BasicInfoStep;