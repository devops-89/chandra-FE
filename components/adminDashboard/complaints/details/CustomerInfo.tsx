const CustomerInfo = () => {
  return (
    <div className="rounded-2xl border bg-white p-6">
      <h3 className="mb-4 text-lg font-semibold">
        Customer Information
      </h3>

      <div className="space-y-3">
        <p>Name: Rahul Sharma</p>
        <p>Email: rahul@gmail.com</p>
        <p>Phone: +91 9876543210</p>
        <p>City: Noida</p>
      </div>
    </div>
  );
};

export default CustomerInfo;