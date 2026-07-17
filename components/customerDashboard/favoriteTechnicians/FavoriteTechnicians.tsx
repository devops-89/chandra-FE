'use client';

import { useEffect } from 'react';

import TechnicianCard from '@/components/customerDashboard/favoriteTechnicians/TechnicianCard';
import { EmptyState } from '@/components/customerDashboard/shared';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchFavouriteTechnicians } from '@/redux/slices/favouriteTechnicianSlice';

const FavoriteTechnicians = () => {
  const dispatch = useAppDispatch();

  const {
    technicians,
    isLoading,
    error,
  } = useAppSelector(
    (state) => state.favouriteTechnicians,
  );

  useEffect(() => {
    dispatch(fetchFavouriteTechnicians());
  }, [dispatch]);

  if (isLoading) {
    return (
      <section className="space-y-6">
        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
          Favorite Technicians
        </h4>

        <p className="text-slate-500">Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="space-y-6">
        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
          Favorite Technicians
        </h4>

        <p className="text-red-500">{error}</p>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
        Favorite Technicians
      </h4>

      {technicians.length === 0 ? (
        <EmptyState
          title="No Favorite Technicians"
          description="Your favorite technicians will appear here."
        />
      ) : (
        <div className="space-y-4">
          {technicians.map((technician) => (
            <TechnicianCard
              key={technician.id}
              technician={technician}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default FavoriteTechnicians;