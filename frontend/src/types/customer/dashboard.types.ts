export interface CustomerDashboardStats {
  totalBookings: number;
  upcomingBookings: number;
  activeBookings: number;
  savedAddresses: number;
}

export interface GetCustomerDashboardStatsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    success: boolean;
    message: string;
    data: CustomerDashboardStats;
  };
}