const PayoutDetails = () => {
  return (
    <div className="rounded-2xl border bg-white p-6">
      <h3 className="mb-4 text-lg font-semibold">
        Payout Details
      </h3>

      <div className="space-y-3">
        <p>Technician: Arjun Sharma</p>
        <p>Amount: ₹12,500</p>
        <p>Status: Pending</p>
        <p>Date: 15 Aug 2025</p>
      </div>
    </div>
  );
};

export default PayoutDetails;