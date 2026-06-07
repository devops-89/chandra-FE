import type { ActiveBooking } from "@/types/dashboardTypes/customerDashboard/customerDashboard.types";

export const activeBooking: ActiveBooking = {
  id: "HC-9821",
  serviceName: "Solar Cleaning",
  bookingDate: "Oct 24, 2024",
  bookingTime: "09:00 AM",
  technician: {
    id: "T003",
    name: "Amit Kumar",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBhmIQ2m8yCHdnMRXXUo4sPAtgwC9-AcC48mbooiSL-U6wbtbXokeTx9ieJFQlTQ5zKmdqHZIErnB0mFxM1u3cwxKiOawy6-vInnfWkfGQorlCJNrVp72TwpkNsK4L3tN01Z_tBNHjYlC6MuqlLFfKlCHF14LIy5B3SVYMl6hf7buEog8RLaS9lcnRaYc-xzZCHMSeOUndrU-C3wDxVV-c5HZ7s6RFzTBDDKvIYPySZQ25yn7uDoxjI5lRUQpA6MSN5iCMVC_s3ApY",
    eta: "15 mins",
  },
  status: "on-way",
};
