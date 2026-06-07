import { customerDashboardService } from '@/services/customerDashboard/customerDashboard.service';

export const useRecentBookings = () => {
  const bookings =
    customerDashboardService.getRecentBookings();

  return {
    bookings,
  };
};