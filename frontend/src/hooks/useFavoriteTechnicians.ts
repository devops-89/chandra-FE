import { customerDashboardService } from '@/services/customerDashboard/customerDashboard.service';

export const useFavoriteTechnicians = () => {
  const technicians =
    customerDashboardService.getFavoriteTechnicians();

  return {
    technicians,
  };
};