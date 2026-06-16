interface Props {
  customer: string;
}

const CustomerInfo = ({ customer }: Props) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <h3 className="mb-4 text-lg font-semibold text-slate-900">Customer Information</h3>

      <div className="space-y-2">
        <p className="text-sm text-slate-700">
          <span className="text-slate-400 text-xs uppercase tracking-wider block mb-0.5">Name</span>
          {customer}
        </p>
        <p className="text-sm text-slate-700">
          <span className="text-slate-400 text-xs uppercase tracking-wider block mb-0.5">Phone</span>
          +91 9876543210
        </p>
        <p className="text-sm text-slate-700">
          <span className="text-slate-400 text-xs uppercase tracking-wider block mb-0.5">City</span>
          Noida
        </p>
      </div>
    </div>
  );
};

export default CustomerInfo;