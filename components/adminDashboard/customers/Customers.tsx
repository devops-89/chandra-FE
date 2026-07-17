import CustomerFilters from "./list/CustomerFilters";
import CustomersTable from "./list/CustomersTable";

const Customers = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Customers
        </h1>
        <p className="text-slate-500">Manage all registered customers</p>
      </div>

      <CustomerFilters />
      <CustomersTable />
    </div>
  );
};

export default Customers;
