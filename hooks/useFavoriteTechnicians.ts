import { CustomerDashboardControllers } from '@/api/customerDashboardControllers';


export const useFavoriteTechnicians = () => {
  const technicians =
    CustomerDashboardControllers.getFavoriteTechnicians();

  return {
    technicians,
  };
};