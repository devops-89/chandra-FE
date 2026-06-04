export default function AddressPreview() {
  return (
    <section
      className="
        rounded-3xl
        bg-white
        p-6
        shadow-sm
      "
    >
      <div className="mb-6 flex justify-between">
        <h2 className="text-xl font-bold">
          Saved Addresses
        </h2>

        <button className="text-emerald-700">
          Add New
        </button>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border p-4">
          <h3 className="font-semibold">
            Home
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Sector 48, Gurgaon
          </p>
        </div>

        <div className="rounded-2xl border p-4">
          <h3 className="font-semibold">
            Office
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Cyber City, Gurgaon
          </p>
        </div>
      </div>
    </section>
  );
}