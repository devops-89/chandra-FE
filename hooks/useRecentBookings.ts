import { CustomerDashboardControllers } from '@/api/customerDashboardControllers';


export const useRecentBookings = () => {
  const bookings =
    CustomerDashboardControllers.getRecentBookings();

  return {
    bookings,
  };
};