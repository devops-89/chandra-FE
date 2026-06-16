'use client';

import { useState } from 'react';

import type { Booking } from '@/constants/admin/bookingData';
import { techniciansData } from '@/constants/admin/technicianData';

interface Props {
  open: boolean;
  booking: Booking;
  onClose: () => void;
  onConfirm?: (technicianName: string) => void;
}

const ReassignTechnicianModal = ({ open, booking, onClose, onConfirm }: Props) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [reason, setReason] = useState('');
  const [search, setSearch] = useState('');

  if (!open) return null;

  const activeTechnicians = techniciansData.filter(
    (t) => t.status === 'Active' && t.name !== booking.technician,
  );

  const filtered = activeTechnicians.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.skills.some((s) => s.toLowerCase().includes(search.toLowerCase())) ||
      t.city.toLowerCase().includes(search.toLowerCase()),
  );

  const selectedTech = activeTechnicians.find((t) => t.id === selected);

  const handleConfirm = () => {
    if (!selectedTech) return;
    onConfirm?.(selectedTech.name);
    setSelected(null);
    setReason('');
    setSearch('');
  };

  const handleClose = () => {
    setSelected(null);
    setReason('');
    setSearch('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl bg-white shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Reassign Technician</h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Booking{' '}
              <span className="font-medium text-emerald-600">{booking.id}</span>
              {' — '}
              {booking.service}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Current Technician */}
        <div className="px-6 pt-4">
          <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">
            Current Technician
          </label>
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs shrink-0">
              {booking.technician
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)}
            </div>
            <span className="text-sm font-medium text-slate-800">{booking.technician}</span>
          </div>
        </div>

        {/* Search new technician */}
        <div className="px-6 pt-4 pb-2">
          <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">
            Select New Technician
          </label>
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by name, skill, or city…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
            />
          </div>
        </div>

        {/* Technician List */}
        <div className="flex-1 overflow-y-auto px-6 pb-2 space-y-3 min-h-0" style={{ maxHeight: '260px' }}>
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-sm">
              No other active technicians found
            </div>
          ) : (
            filtered.map((tech) => {
              const isSelected = selected === tech.id;
              return (
                <button
                  key={tech.id}
                  onClick={() => setSelected(isSelected ? null : tech.id)}
                  className={`w-full text-left rounded-xl border p-4 transition-all duration-150 ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-200'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="shrink-0 h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm">
                        {tech.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900 text-sm truncate">{tech.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{tech.city} · {tech.experience} yrs exp</p>
                      </div>
                    </div>

                    <div className="shrink-0 flex flex-col items-end gap-1">
                      <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold">
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {tech.rating}
                      </div>
                      <span className="text-[10px] text-slate-400">{tech.completedJobs} jobs</span>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {tech.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {isSelected && (
                    <div className="mt-2 flex items-center gap-1 text-emerald-600 text-xs font-medium">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Selected
                    </div>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Reason */}
        <div className="px-6 pt-3 pb-2">
          <label className="block text-xs font-medium text-slate-600 mb-1.5">
            Reason for Reassignment <span className="text-red-400">*</span>
          </label>
          <textarea
            rows={2}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter the reason for reassignment…"
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all resize-none"
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50 rounded-b-2xl">
          {selectedTech ? (
            <p className="text-sm text-slate-600">
              Reassigning to{' '}
              <span className="font-semibold text-slate-900">{selectedTech.name}</span>
            </p>
          ) : (
            <p className="text-sm text-slate-400">Select a technician above</p>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleClose}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={!selected || !reason.trim()}
              className="rounded-xl bg-emerald-600 px-5 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              Reassign
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReassignTechnicianModal;