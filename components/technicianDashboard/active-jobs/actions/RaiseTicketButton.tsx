'use client';

import { useState } from 'react';

import { BookingControllers } from '@/api/bookingControllers';
import { useAppDispatch } from '@/redux/hooks';
import { showSnackbar } from '@/redux/slices/snackbarSlice';

import { useJobContext } from '../JobContext';

export default function RaiseTicketButton() {
  const currentJob = useJobContext();
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title || !description) {
      dispatch(showSnackbar({ message: 'Please fill in both Subject and Description.', severity: 'error' }));
      return;
    }

    if (!currentJob?.rawId || !currentJob?.serviceId) {
      dispatch(showSnackbar({ message: 'Missing Booking ID or Service ID. Cannot raise ticket.', severity: 'error' }));
      return;
    }

    try {
      setLoading(true);
      await BookingControllers.createComplaint({
        title,
        description,
        serviceId: currentJob.serviceId,
        bookingId: currentJob.rawId,
      });
      dispatch(showSnackbar({ message: 'Complaint created successfully!', severity: 'success' }));
      setTitle('');
      setDescription('');
      setIsModalOpen(false);
    } catch (error: any) {
      dispatch(showSnackbar({ message: error.message || 'Failed to create complaint', severity: 'error' }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="
          h-14
          px-8
          w-full
          sm:w-auto
          rounded-2xl
          border
          border-red-200
          bg-red-50
          text-red-600
          flex
          items-center
          justify-center
          gap-2
          font-semibold
          transition-all
          cursor-pointer
          hover:bg-red-100
        "
      >
        <span className="material-symbols-outlined text-[20px]">warning</span>
        Raise Ticket
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-xs text-left">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900">Raise Support Ticket</h3>
              <p className="text-slate-500 mt-1">Submit your issue for Booking #{currentJob?.rawId}</p>
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
