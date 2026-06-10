const PaymentInfo = () => {
  return (
    <div className="rounded-2xl border bg-white p-6">
      <h3 className="mb-4 text-lg font-semibold">
        Payment Details
      </h3>

      <div className="space-y-2">
        <p>Amount: ₹499</p>
        <p>Method: UPI</p>
        <p>Status: Paid</p>
      </div>
    </div>
  );
};

export default PaymentInfo;