'use client';

import { useRouter } from 'next/navigation';

export default function TechnicianDashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-linear-to-b from-primary/5 to-surface p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-on-surface mb-2">
            Technician Dashboard
          </h1>
          <p className="text-lg text-secondary">
            Manage your work, availability, and profile
          </p>
        </div>

        {/* Welcome Card */}
        <div className="bg-white rounded-2xl shadow-md border border-outline-variant/30 p-8 md:p-12 mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-on-surface mb-2">
                Welcome to your Dashboard!
              </h2>
              <p className="text-secondary mb-6">
                You're all set. Your profile is approved and you can start accepting service requests.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => router.push('/dashboard/technician/profile')}
                  className="inline-block px-6 py-3 bg-primary hover:bg-emerald-deep text-on-primary rounded-lg font-medium transition-colors"
                >
                  Edit Profile
                </button>
              </div>
            </div>
            <div className="hidden md:block text-6xl">👨‍🔧</div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-md border border-outline-variant/30 p-6">
            <div className="text-primary text-4xl mb-3">📋</div>
            <h3 className="text-lg font-semibold text-on-surface mb-2">
              Active Bookings
            </h3>
            <p className="text-3xl font-bold text-primary">0</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-outline-variant/30 p-6">
            <div className="text-primary text-4xl mb-3">⭐</div>
            <h3 className="text-lg font-semibold text-on-surface mb-2">
              Your Rating
            </h3>
            <p className="text-3xl font-bold text-primary">—</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-outline-variant/30 p-6">
            <div className="text-primary text-4xl mb-3">💰</div>
            <h3 className="text-lg font-semibold text-on-surface mb-2">
              Earnings
            </h3>
            <p className="text-3xl font-bold text-primary">$0</p>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => router.push('/dashboard/technician/profile')}
            className="bg-white rounded-2xl shadow-md border border-outline-variant/30 p-6 hover:shadow-lg transition-shadow text-left"
          >
            <h3 className="text-xl font-bold text-on-surface mb-2">Profile</h3>
            <p className="text-secondary">Manage your profile information</p>
          </button>

          <button
            onClick={() => router.push('/')}
            className="bg-white rounded-2xl shadow-md border border-outline-variant/30 p-6 hover:shadow-lg transition-shadow text-left"
          >
            <h3 className="text-xl font-bold text-on-surface mb-2">Availability</h3>
            <p className="text-secondary">Set your work hours and availability</p>
          </button>

          <button
            onClick={() => router.push('/')}
            className="bg-white rounded-2xl shadow-md border border-outline-variant/30 p-6 hover:shadow-lg transition-shadow text-left"
          >
            <h3 className="text-xl font-bold text-on-surface mb-2">Bookings</h3>
            <p className="text-secondary">View and manage your service bookings</p>
          </button>

          <button
            onClick={() => router.push('/')}
            className="bg-white rounded-2xl shadow-md border border-outline-variant/30 p-6 hover:shadow-lg transition-shadow text-left"
          >
            <h3 className="text-xl font-bold text-on-surface mb-2">Earnings</h3>
            <p className="text-secondary">Track your income and payments</p>
          </button>
        </div>
      </div>
    </div>
  );
}
