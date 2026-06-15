import CustomerAddresses from "./CustomerAddresses";
import CustomerBookings from "./CustomerBookings";
import CustomerOverview from "./CustomerOverview";
import CustomerReviews from "./CustomerReviews";

const CustomerProfile = () => {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border-4 border-emerald-600 bg-white p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
          <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-emerald-600 text-xl sm:text-2xl font-bold text-white flex-shrink-0">
            R
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold">Rahul Sharma</h2>
            <p className="text-slate-500">rahul@gmail.com</p>
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
