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
      <h2 className="text-xl font-bold text-slate-950">
        Spending Summary
      </h2>

      <div className="mt-6 space-y-4 text-sm text-slate-700">
        <div className="flex justify-between">
          <span>Total Invoices</span>
          <span>12</span>
        </div>

        <div className="flex justify-between font-semibold text-emerald-600">
          <span>Total Paid</span>
          <span>₹12,450</span>
        </div>

        <div className="flex justify-between text-slate-700">
          <span>Pending</span>
          <span>₹499</span>
        </div>
      </div>
    </div>
  );
}