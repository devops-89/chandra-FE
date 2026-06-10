const EditServiceForm = () => {
  return (
    <form className="space-y-4 rounded-2xl border bg-white p-6">
      <h2 className="text-xl font-semibold">
        Edit Service
      </h2>

      <input
        defaultValue="AC Repair"
        className="w-full rounded-xl border p-3"
      />

      <input
        defaultValue="499"
        className="w-full rounded-xl border p-3"
      />

      <select className="w-full rounded-xl border p-3">
        <option>Active</option>
        <option>Inactive</option>
      </select>

      <button
        type="submit"
        className="rounded-xl bg-emerald-600 px-5 py-3 text-white"
      >
        Save Changes
      </button>
    </form>
  );
};

export default EditServiceForm;