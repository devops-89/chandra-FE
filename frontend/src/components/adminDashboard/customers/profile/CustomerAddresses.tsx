const CustomerAddresses = () => {
  return (
    <div className="rounded-2xl border bg-white p-6">
      <h3 className="mb-4 text-lg font-semibold">
        Saved Addresses
      </h3>

      <div className="space-y-3">
        <div className="rounded-xl border p-4">
          Home — Sector 62, Noida
        </div>

        <div className="rounded-xl border p-4">
          Office — Sector 18, Noida
        </div>
      </div>
    </div>
  );
};

export default CustomerAddresses;