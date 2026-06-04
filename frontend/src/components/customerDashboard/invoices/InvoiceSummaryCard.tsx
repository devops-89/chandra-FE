export default function InvoiceSummaryCard() {
  return (
    <div
      className="
        rounded-3xl
        bg-white
        p-6
        shadow-sm
      "
    >
      <h2 className="text-xl font-bold">
        Spending Summary
      </h2>

      <div className="mt-6 space-y-4">
        <div className="flex justify-between">
          <span>Total Invoices</span>
          <span>12</span>
        </div>

        <div className="flex justify-between">
          <span>Total Paid</span>
          <span>₹12,450</span>
        </div>

        <div className="flex justify-between">
          <span>Pending</span>
          <span>₹499</span>
        </div>
      </div>
    </div>
  );
}