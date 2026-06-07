import { customerDashboardService } from '@/services/customerDashboard/customerDashboard.service';

export const useLatestReview = () => {
  const review =
    customerDashboardService.getLatestReview();

  return {
    review,
  };
};