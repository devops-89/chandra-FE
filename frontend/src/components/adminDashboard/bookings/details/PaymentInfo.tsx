interface Props {
  amount: number;
}

const PaymentInfo = ({ amount }: Props) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <h3 className="mb-4 text-lg font-semibold text-slate-900">Payment Details</h3>

      <div className="space-y-2">
        <p className="text-sm text-slate-700">
          <span className="text-slate-400 text-xs uppercase tracking-wider block mb-0.5">Amount</span>
          ₹{amount}
        </p>
        <p className="text-sm text-slate-700">
          <span className="text-slate-400 text-xs uppercase tracking-wider block mb-0.5">Method</span>
          UPI
        </p>
        <p className="text-sm text-slate-700">
          <span className="text-slate-400 text-xs uppercase tracking-wider block mb-0.5">Status</span>
          <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
            Paid
          </span>
        </p>
      </div>
    </div>
  );
};

export default PaymentInfo;