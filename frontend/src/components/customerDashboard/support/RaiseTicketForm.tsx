'use client';

import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { createComplaint, updateComplaint } from '@/redux/slices/complaintSlice';

export default function RaiseTicketForm() {
  const dispatch = useAppDispatch();

  const { isLoading } = useAppSelector(
    (state) => state.complaint
  );

  const [complaintId, setComplaintId] = useState<number | null>(null);

  const [bookingId, setBookingId] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const loadComplaint = (complaint: {
    id: number;
    bookingId: number;
    serviceId: number;
    title: string;
    description: string;
  }) => {
    setComplaintId(complaint.id);
    setBookingId(String(complaint.bookingId));
    setServiceId(String(complaint.serviceId));
    setTitle(complaint.title);
    setDescription(complaint.description);
  };

  const handleSubmit = async () => {
    setSuccess('');
    setError('');

    if (
      !bookingId ||
      !serviceId ||
      !title.trim() ||
      !description.trim()
    ) {
      setError('Please fill all fields.');
      return;
    }

    try {
      if (complaintId) {
        await dispatch(
          updateComplaint({
            id: complaintId,
            bookingId: Number(bookingId),
            serviceId: Number(serviceId),
            title,
            description,
          })
        ).unwrap();

        setSuccess('Complaint updated successfully.');
      } else {
        await dispatch(
          createComplaint({
            bookingId: Number(bookingId),
            serviceId: Number(serviceId),
            title,
            description,
          })
        ).unwrap();

        setSuccess('Complaint submitted successfully.');
      }

      setComplaintId(null);
      setBookingId('');
      setServiceId('');
      setTitle('');
      setDescription('');
    } catch (err) {
      setError(
        typeof err === 'string'
          ? err
          : complaintId
          ? 'Failed to update complaint.'
          : 'Failed to submit complaint.'
      );
    }
  };

  return (
    <div
      className="
        rounded-3xl
        bg-white
        p-6
        shadow-lg
      "
    >
      <h2 className="mb-6 text-xl font-bold">
        Raise Support Ticket
      </h2>

      <div className="space-y-4">
        <select
          value={bookingId}
          onChange={(e) => setBookingId(e.target.value)}
          className="
            w-full
            rounded-xl
            border
            border-emerald-600
            outline-emerald-600
            p-4
          "
        >
          <option value="">Select Booking</option>
        </select>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Complaint Subject"
          className="
            w-full
            rounded-xl
            border
            border-emerald-600
            outline-emerald-600
            p-4
          "
        />

        <textarea
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your issue..."
          className="
            w-full
            rounded-xl
            border
            border-emerald-600
            outline-emerald-600
            p-4
          "
        />

        {error && (
          <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">
            {success}
          </div>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          className="
            rounded-xl
            bg-emerald-600
            px-6
            py-3
            cursor-pointer
            text-white
            hover:bg-emerald-700
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {isLoading
            ? complaintId
              ? 'Updating...'
              : 'Submitting...'
            : complaintId
              ? 'Update Ticket'
              : 'Submit Ticket'}
        </button>
      </div>
    </div>
  );
}