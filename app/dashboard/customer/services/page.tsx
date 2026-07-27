'use client';

import { useState } from 'react';

import TokenPaymentModal from '@/components/booking/TokenPaymentModal';
import DashboardLayout from '@/components/customerDashboard/layout/DashboardLayout';
import LifetimeBookingAccess from '@/components/customerDashboard/overview/LifetimeBookingAccess';
import { ServiceGrid } from '@/components/servicesSection/ServiceGrid';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchCustomerProfile } from '@/redux/slices/customerProfileSlice';

export default function DashboardServicesPage() {
  const dispatch = useAppDispatch();

  const { profile } = useAppSelector((state) => state.customerProfile);

  const [showAccessModal, setShowAccessModal] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const hasAccess = profile?.isTokenPaid === true;

  const handleCardClick = () => {
    if (!hasAccess) {
      setShowAccessModal(true);
    }
  };

  const handlePaymentSuccess = () => {
    setIsPaymentModalOpen(false);
    setShowAccessModal(false);
    void dispatch(fetchCustomerProfile());
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Services</h1>
          <p className="mt-1 text-sm text-slate-500">
            Browse and book available services
          </p>
        </div>

        <ServiceGrid
          linkPrefix="/dashboard/customer/services"
          onCardClick={hasAccess ? undefined : handleCardClick}
        />
      </div>

      {/* Lifetime Access popup — shown when a locked user clicks a service card */}
      {showAccessModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
          onClick={() => setShowAccessModal(false)}
        >
          <div
            className="w-full max-w-4xl animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <LifetimeBookingAccess onUnlock={() => setIsPaymentModalOpen(true)} />
          </div>
        </div>
      )}

      <TokenPaymentModal
        open={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSuccess={handlePaymentSuccess}
        mode="lifetime"
      />
    </DashboardLayout>
  );
}
