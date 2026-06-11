'use client';

import { useRouter } from 'next/navigation';

import { TechnicianDashboardLayout } from '@/components/dashboard/technician';

export default function TechnicianDashboard() {
  const router = useRouter();

  return (
    <TechnicianDashboardLayout>
      {/* Overview Stats Section */}
      <section className="grid grid-cols-4 gap-6 mb-10">
        <div className="bg-surface-white p-6 rounded-xl ambient-shadow border border-surface-container/50">
          <div className="flex justify-between items-start mb-4">
            <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">
              search
            </span>
            <span className="text-success-mint bg-emerald-deep/10 text-emerald-mint text-[10px] font-bold px-2 py-1 rounded-full">
              +2 new
            </span>
          </div>
          <p className="text-charcoal-light font-label-md">Available Jobs</p>
          <h3 className="text-3xl font-bold text-on-surface mt-1">12</h3>
        </div>

        <div className="bg-surface-white p-6 rounded-xl ambient-shadow border border-surface-container/50">
          <div className="flex justify-between items-start mb-4">
            <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">
              pending_actions
            </span>
          </div>
          <p className="text-charcoal-light font-label-md">Active Jobs</p>
          <h3 className="text-3xl font-bold text-on-surface mt-1">2</h3>
        </div>

        <div className="bg-surface-white p-6 rounded-xl ambient-shadow border border-surface-container/50">
          <div className="flex justify-between items-start mb-4">
            <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">
              payments
            </span>
          </div>
          <p className="text-charcoal-light font-label-md">Today's Earnings</p>
          <h3 className="text-3xl font-bold text-on-surface mt-1">₹1,450</h3>
        </div>

        <div className="bg-surface-white p-6 rounded-xl ambient-shadow border border-surface-container/50">
          <div className="flex justify-between items-start mb-4">
            <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">
              account_balance_wallet
            </span>
            <span className="text-primary font-label-sm border-b border-primary cursor-pointer">
              Withdraw
            </span>
          </div>
          <p className="text-charcoal-light font-label-md">Wallet Balance</p>
          <h3 className="text-3xl font-bold text-on-surface mt-1">₹8,200</h3>
        </div>
      </section>

      <div className="bento-grid">
        {/* Nearby Job Listings */}
        <section className="col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="font-headline-md text-on-surface">Nearby Jobs</h4>
            <a className="text-primary font-label-md hover:underline" href="#">
              View All Map
            </a>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Job Card 1 */}
            <div className="bg-surface-white p-6 rounded-xl ambient-shadow border border-surface-container/50 group hover:border-primary/30 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-success-mint text-emerald-deep font-label-sm px-3 py-1 rounded-full">
                  AC Deep Cleaning
                </span>
                <span className="text-charcoal-light font-label-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">schedule</span> 2:30 PM
                </span>
              </div>
              <h5 className="font-headline-sm text-lg mb-1">Arjun K.</h5>
              <p className="text-charcoal-light font-body-md mb-4 flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px]">near_me</span> 2.4 km away
              </p>
              <div className="flex items-center justify-between py-4 border-y border-surface-container mb-6">
                <span className="text-charcoal-light font-label-md uppercase">Payout</span>
                <span className="text-xl font-bold text-emerald-600">₹850</span>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 py-3 bg-emerald-600 cursor-pointer text-white font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-md shadow-primary/10">
                  Accept
                </button>
                <button className="flex-1 py-3 border cursor-pointer border-outline-variant text-secondary font-bold rounded-xl hover:bg-red-50 hover:text-red-500 hover:border-red-300 transition-all">
                  Reject
                </button>
              </div>
            </div>

            {/* Job Card 2 */}
            <div className="bg-surface-white p-6 rounded-xl ambient-shadow border border-surface-container/50 group hover:border-primary/30 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-secondary-container text-secondary font-label-sm px-3 py-1 rounded-full">
                  Kitchen Plumbing
                </span>
                <span className="text-charcoal-light font-label-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">schedule</span> 4:00 PM
                </span>
              </div>
              <h5 className="font-headline-sm text-lg mb-1">Sarah M.</h5>
              <p className="text-charcoal-light font-body-md mb-4 flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px]">near_me</span> 4.1 km away
              </p>
              <div className="flex items-center justify-between py-4 border-y border-surface-container mb-6">
                <span className="text-charcoal-light font-label-md uppercase">Payout</span>
                <span className="text-xl font-bold text-emerald-600">₹450</span>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 py-3 bg-primary cursor-pointer text-white font-bold rounded-xl hover:bg-emerald-deep transition-all shadow-md shadow-primary/10">
                  Accept
                </button>
                <button className="flex-1 py-3 border cursor-pointer border-outline-variant text-secondary font-bold rounded-xl hover:bg-red-50 hover:text-red-500 hover:border-red-300 transition-all">
                  Reject
                </button>
              </div>
            </div>
          </div>

          {/* Active Job Tracker */}
          <div className="mt-10">
            <h4 className="font-headline-md text-on-surface mb-6">Active Job</h4>
            <div className="bg-surface-white p-8 rounded-xl ambient-shadow border-l-8 border-primary relative overflow-hidden">
              {/* Background Decoration */}
              <div className="absolute right-0 top-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>

              <div className="flex justify-between items-start mb-8 relative z-10">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h5 className="text-2xl font-bold">Full House Deep Cleaning</h5>
                    <span className="bg-primary/10 text-primary font-label-sm px-3 py-1 rounded-full animate-pulse">
                      Travelling
                    </span>
                  </div>
                  <p className="text-charcoal-light font-body-lg flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">location_on</span>
                    Sector 52, Gurgaon, Apartment 402
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-charcoal-light font-label-sm">ETA</p>
                  <p className="text-2xl font-extrabold text-primary">12 Mins</p>
                </div>
              </div>

              {/* Stepper Tracker */}
              <div className="relative flex justify-between items-center mb-8 px-2">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-surface-container-high -translate-y-1/2 z-0"></div>
                <div className="absolute top-1/2 left-0 w-[60%] h-0.5 bg-primary -translate-y-1/2 z-0"></div>

                {/* Step: Assigned */}
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
                    <span className="material-symbols-outlined text-[20px]">check</span>
                  </div>
                  <span className="font-label-sm text-primary font-bold">Assigned</span>
                </div>

                {/* Step: Accepted */}
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
                    <span className="material-symbols-outlined text-[20px]">check</span>
                  </div>
                  <span className="font-label-sm text-primary font-bold">Accepted</span>
                </div>

                {/* Step: Travelling */}
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-white border-4 border-primary text-primary flex items-center justify-center shadow-md">
                    <span className="material-symbols-outlined text-[20px]">directions_car</span>
                  </div>
                  <span className="font-label-sm text-primary font-bold">Travelling</span>
                </div>

                {/* Step: Started */}
                <div className="relative z-10 flex flex-col items-center gap-2 opacity-40">
                  <div className="w-10 h-10 rounded-full bg-surface-container text-secondary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">play_arrow</span>
                  </div>
                  <span className="font-label-sm">Started</span>
                </div>

                {/* Step: Completed */}
                <div className="relative z-10 flex flex-col items-center gap-2 opacity-40">
                  <div className="w-10 h-10 rounded-full bg-surface-container text-secondary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">task_alt</span>
                  </div>
                  <span className="font-label-sm">Completed</span>
                </div>
              </div>

              {/* Quick Actions Row */}
              <div className="grid grid-cols-4 gap-4 mt-8 pt-8 border-t border-surface-container">
                <button className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-surface-container transition-all">
                  <div className="w-12 h-12 rounded-full bg-on-secondary-container/5 flex items-center justify-center text-on-secondary-container">
                    <span className="material-symbols-outlined">call</span>
                  </div>
                  <span className="font-label-sm">Call</span>
                </button>

                <button className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-surface-container transition-all">
                  <div className="w-12 h-12 rounded-full bg-on-secondary-container/5 flex items-center justify-center text-on-secondary-container">
                    <span className="material-symbols-outlined">chat</span>
                  </div>
                  <span className="font-label-sm">Chat</span>
                </button>

                <button className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-surface-container transition-all">
                  <div className="w-12 h-12 rounded-full bg-on-secondary-container/5 flex items-center justify-center text-on-secondary-container">
                    <span className="material-symbols-outlined">map</span>
                  </div>
                  <span className="font-label-sm">Navigate</span>
                </button>

                <button className="flex flex-col items-center gap-2 p-3 rounded-xl bg-primary text-white hover:bg-emerald-deep transition-all shadow-md shadow-primary/20">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined">play_circle</span>
                  </div>
                  <span className="font-label-sm font-bold">Start Job</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Sidebar Content (Earnings & Activity) */}
        <aside className="col-span-4 space-y-8">
          {/* Earnings Overview */}
          <div className="bg-surface-white p-6 rounded-xl ambient-shadow border border-surface-container/50">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-label-md uppercase tracking-widest text-charcoal-light">
                Performance
              </h4>
              <span className="text-primary font-label-sm bg-primary/5 px-2 py-1 rounded">
                Weekly
              </span>
            </div>

            <div className="flex items-end gap-3 h-32 mb-6">
              <div className="flex-1 bg-surface-container rounded-t-lg transition-all hover:bg-primary/40 h-[60%]"></div>
              <div className="flex-1 bg-surface-container rounded-t-lg transition-all hover:bg-primary/40 h-[45%]"></div>
              <div className="flex-1 bg-surface-container rounded-t-lg transition-all hover:bg-primary/40 h-[80%]"></div>
              <div className="flex-1 bg-surface-container rounded-t-lg transition-all hover:bg-primary/40 h-[95%]"></div>
              <div className="flex-1 bg-primary rounded-t-lg h-[70%]"></div>
              <div className="flex-1 bg-surface-container rounded-t-lg transition-all hover:bg-primary/40 h-[30%]"></div>
              <div className="flex-1 bg-surface-container rounded-t-lg transition-all hover:bg-primary/40 h-[50%]"></div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-charcoal-light font-body-md">Total Earnings</span>
                <span className="font-bold text-on-surface">₹12,400</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-charcoal-light font-body-md">Hours Online</span>
                <span className="font-bold text-on-surface">32h 15m</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-charcoal-light font-body-md">Jobs Completed</span>
                <span className="font-bold text-on-surface">18</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-surface-white p-6 rounded-xl ambient-shadow border border-surface-container/50">
            <h4 className="font-label-md uppercase tracking-widest text-charcoal-light mb-6">
              Recent Activity
            </h4>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-success-mint flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[16px]">task_alt</span>
                  </div>
                  <div className="w-0.5 h-10 bg-surface-container mt-2"></div>
                </div>
                <div className="flex-1">
                  <p className="text-on-surface font-body-md font-bold">Job Completed</p>
                  <p className="text-charcoal-light text-sm">Full House Cleaning at Sector 45</p>
                  <span className="text-charcoal-light font-label-sm mt-1 block opacity-60">
                    11:30 AM
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed-variant">
                    <span className="material-symbols-outlined text-[16px]">account_balance_wallet</span>
                  </div>
                  <div className="w-0.5 h-10 bg-surface-container mt-2"></div>
                </div>
                <div className="flex-1">
                  <p className="text-on-surface font-body-md font-bold">Payment Credited</p>
                  <p className="text-emerald-deep font-bold text-sm">+₹600.00</p>
                  <span className="text-charcoal-light font-label-sm mt-1 block opacity-60">
                    10:45 AM
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-[16px]">info</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-on-surface font-body-md font-bold">Doc Verified</p>
                  <p className="text-charcoal-light text-sm">New vehicle papers approved</p>
                  <span className="text-charcoal-light font-label-sm mt-1 block opacity-60">
                    Yesterday
                  </span>
                </div>
              </div>
            </div>

            <button className="w-full mt-6 py-2 text-primary font-label-md hover:bg-primary/5 transition-all rounded-lg">
              View Full History
            </button>
          </div>

          {/* Loyalty Card */}
          <div className="bg-gradient-to-br from-primary to-emerald-deep p-6 rounded-xl text-white relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10">
              <h4 className="font-headline-sm text-lg mb-1">ServicePro Star</h4>
              <p className="text-white/80 text-sm mb-4">
                Complete 5 more jobs to reach Gold level.
              </p>
              <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden mb-2">
                <div className="bg-white h-full w-[80%] rounded-full"></div>
              </div>
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                <span>Silver</span>
                <span>Gold</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <style>{`
        .ambient-shadow {
          box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.05);
        }
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 24px;
        }
      `}</style>
    </TechnicianDashboardLayout>
  );
}
