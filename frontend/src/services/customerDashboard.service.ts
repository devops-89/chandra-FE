import { userServiceApi } from '@/api/axios';
import { ENDPOINTS } from '@/api/endpoints';
import type {
  CustomerDashboardStats,
  GetCustomerDashboardStatsResponse,
} from '@/types/customer/dashboard.types';

export const getCustomerDashboardStatsService =
  async (): Promise<CustomerDashboardStats> => {
    const response =
      await userServiceApi.get<GetCustomerDashboardStatsResponse>(
        ENDPOINTS.CUSTOMER_DASHBOARD_STATS,
      );

    return response.data.data.data;
  };