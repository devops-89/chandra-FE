import { CustomerDashboardControllers } from '@/api/customerDashboardControllers';


export const useInvoices = () => {
  const invoices =
    CustomerDashboardControllers.getInvoices();

  return {
    invoices,
  };
};