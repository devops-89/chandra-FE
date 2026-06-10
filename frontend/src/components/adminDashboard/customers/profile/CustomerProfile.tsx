import CustomerAddresses from "./CustomerAddresses";
import CustomerBookings from "./CustomerBookings";
import CustomerOverview from "./CustomerOverview";
import CustomerReviews from "./CustomerReviews";

const CustomerProfile = () => {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border bg-white p-6">
        <div className="flex items-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-600 text-2xl font-bold text-white">
            R
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              Rahul Sharma
            </h2>

            <p className="text-slate-500">
              rahul@gmail.com
            </p>
          </div>
        </div>
      </div>

      <CustomerOverview />

      <div className="grid gap-6 lg:grid-cols-2">
        <CustomerBookings />
        <CustomerAddresses />
      </div>

      <CustomerReviews />
    </div>
  );
};

export default CustomerProfile;