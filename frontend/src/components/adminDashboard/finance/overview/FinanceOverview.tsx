import RevenueCards from "./RevenueCards";

const FinanceOverview = () => {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <RevenueCards
        title="Total Revenue"
        value="₹12.8L"
      />

      <RevenueCards
        title="Pending Payouts"
        value="₹58K"
      />

      <RevenueCards
        title="Transactions"
        value="1,245"
      />

      <RevenueCards
        title="Success Rate"
        value="98.5%"
      />
    </div>
  );
};

export default FinanceOverview;