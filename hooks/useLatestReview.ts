import { CustomerDashboardControllers } from '@/api/customerDashboardControllers';


export const useLatestReview = () => {
  const review =
    CustomerDashboardControllers.getLatestReview();

  return {
    review,
  };
};