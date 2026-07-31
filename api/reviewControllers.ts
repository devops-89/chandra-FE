import { userSecuredApi } from './config';

export const ReviewControllers = {
  getAllReviews: async () => {
    return await userSecuredApi.get('/bookings/my-reviews');
  },
};
