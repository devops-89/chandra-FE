'use client';

import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

import AdminCreateBookingForm from '@/components/adminDashboard/bookings/create/AdminCreateBookingForm';

export default function CreateBookingPage() {
  const router = useRouter();

  return (
    <div className="space-y-6 w-full max-w-7xl pb-10">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Create Booking</h1>
          <p className="text-slate-500">Book a service on behalf of a customer</p>
        </div>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
          variant="outlined"
          sx={{
            borderRadius: 2,
            borderColor: "#059669",
            color: "#059669",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": {
              borderColor: "#047857",
              bgcolor: "rgba(5, 150, 105, 0.04)",
            },
          }}
        >
          Back
        </Button>
      </div>
      <AdminCreateBookingForm />
    </div>
  );
}
