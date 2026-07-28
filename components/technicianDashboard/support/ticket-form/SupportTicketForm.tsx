'use client';

import { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { BookingControllers } from '@/api/bookingControllers';
import { useAppSelector } from '@/redux/hooks';

export default function SupportTicketForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [bookingId, setBookingId] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch technician's services from Redux
  const technicianProfile = useAppSelector((state) => state.auth.user?.technicianProfile);
  const technicianServices = technicianProfile?.services || [];

  // Fetch completed bookings state
  const [completedBookings, setCompletedBookings] = useState<any[]>([]);

  useEffect(() => {
    if (isModalOpen) {
      // Fetch completed bookings when modal opens
      const fetchCompletedBookings = async () => {
        try {
          const res = await BookingControllers.getAssignedBookings(1, 100, 'COMPLETED');
          if (res?.data?.data) {
            setCompletedBookings(res.data.data);
          }
        } catch (error) {
          console.error('Error fetching completed bookings:', error);
        }
      };
      fetchCompletedBookings();
    }
  }, [isModalOpen]);

  const handleSubmit = async () => {
    if (!title || !description || !serviceId || !bookingId) {
      alert('Please fill all required fields, including Service ID and Booking ID.');
      return;
    }

    try {
      setLoading(true);
      await BookingControllers.createComplaint({
        title,
        description,
        serviceId: Number(serviceId),
        bookingId: Number(bookingId),
      });
      alert('Complaint created successfully!');
      setTitle('');
      setDescription('');
      setServiceId('');
      setBookingId('');
      setIsModalOpen(false);
    } catch (error: any) {
      alert(error.message || 'Failed to create complaint');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-full transition-colors flex items-center gap-2 shadow-sm"
      >
        <span className="material-symbols-outlined text-sm">add</span>
        Raise Ticket
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900">Raise Support Ticket</h3>
              <p className="text-slate-500 mt-1">Submit your issue and our support team will contact you.</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-slate-700">Subject</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter issue subject"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormControl fullWidth>
                  <InputLabel id="service-select-label">Service</InputLabel>
                  <Select
                    labelId="service-select-label"
                    value={serviceId}
                    label="Service"
                    onChange={(e) => setServiceId(e.target.value)}
                    sx={{ borderRadius: '16px' }}
                  >
                    {technicianServices.filter((s: any) => s.service).length === 0 ? (
                      <MenuItem disabled value="">
                        No services available
                      </MenuItem>
                    ) : (
                      technicianServices
                        .filter((s: any) => s.service)
                        .map((s: any, idx: number) => (
                        <MenuItem key={s.serviceId || s.service.id || idx} value={s.serviceId || s.service.id || s.id || idx}>
                          {s.service.name}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel id="booking-select-label">Completed Booking</InputLabel>
                  <Select
                    labelId="booking-select-label"
                    value={bookingId}
                    label="Completed Booking"
                    onChange={(e) => setBookingId(e.target.value)}
                    sx={{ borderRadius: '16px' }}
                  >
                    {completedBookings.length === 0 ? (
                      <MenuItem disabled value="">
                        No completed bookings
                      </MenuItem>
                    ) : (
                      completedBookings.map((b: any) => (
                        <MenuItem key={b.id} value={b.id}>
                          Booking #{b.id} {b.service?.name ? `(${b.service.name})` : ''}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-slate-700">Description</label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your issue..."
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 resize-none outline-none focus:border-emerald-500"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-3 rounded-2xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-all disabled:opacity-50 cursor-pointer mt-4"
              >
                {loading ? 'Submitting...' : 'Submit Ticket'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}