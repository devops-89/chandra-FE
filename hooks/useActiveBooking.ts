import { CustomerDashboardControllers } from '@/api/customerDashboardControllers';


export const useActiveBooking = () => {
  const activeBooking = CustomerDashboardControllers.getActiveBooking();

  return {
    activeBooking,
  };
};
