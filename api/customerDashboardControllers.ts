import { activeBooking } from '@/constants/customerDashboard/dashboard/activeBooking.data';
import { favoriteTechnicians } from '@/constants/customerDashboard/dashboard/FavouriteTechnician.data';
import { recentBookings } from '@/constants/customerDashboard/dashboard/recentBookings.data';
import { reviews } from '@/constants/customerDashboard/dashboard/reviews.data';

export const CustomerDashboardControllers = {
  getActiveBooking() {
    return activeBooking;
  },

  getRecentBookings() {
    return recentBookings;
  },

  getFavoriteTechnicians() {
    return favoriteTechnicians;
  },

  getLatestReview() {
    return reviews[0];
  },
};
