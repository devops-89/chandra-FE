import { customerDashboardService } from '@/services/customerDashboard/customerDashboard.service';

export const useInvoices = () => {
  const invoices =
    customerDashboardService.getInvoices();

  return {
    invoices,
  };
};