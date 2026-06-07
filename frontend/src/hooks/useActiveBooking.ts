import { customerDashboardService } from "@/services/customerDashboard/customerDashboard.service";

export const useActiveBooking = () => {
  const activeBooking = customerDashboardService.getActiveBooking();

  return {
    activeBooking,
  };
};
