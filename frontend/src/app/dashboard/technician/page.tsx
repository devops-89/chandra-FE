'use client';

import { TechnicianDashboardLayout } from '@/components/dashboard/technician';

export default function TechnicianDashboard() {
  return (
    <TechnicianDashboardLayout>
      {/* Overview Stats Section - 2 columns mobile, 4 columns desktop */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-10">
        <div className="bg-surface-white p-4 md:p-6 rounded-lg md:rounded-xl ambient-shadow border border-surface-container/50">
          <div className="flex justify-between items-start mb-3 md:mb-4">
            <span className="material-symbols-outlined text-primary bg-primary/10 p-1.5 md:p-2 rounded-lg text-xl md:text-2xl">
              search
            </span>
            <span className="text-success-mint bg-emerald-deep/10 text-emerald-mint text-[9px] md:text-[10px] font-bold px-1.5 md:px-2 py-0.5 md:py-1 rounded-full">
              +2 new
            </span>
          </div>
          <p className="text-charcoal-light text-xs md:text-sm">Available Jobs</p>
          <h3 className="text-2xl md:text-3xl font-bold text-on-surface mt-1">12</h3>
        </div>

        <div className="bg-surface-white p-4 md:p-6 rounded-lg md:rounded-xl ambient-shadow border border-surface-container/50">
          <div className="flex justify-between items-start mb-3 md:mb-4">
            <span className="material-symbols-outlined text-primary bg-primary/10 p-1.5 md:p-2 rounded-lg text-xl md:text-2xl">
              pending_actions
            </span>
          </div>
          <p className="text-charcoal-light text-xs md:text-sm">Active Jobs</p>
          <h3 className="text-2xl md:text-3xl font-bold text-on-surface mt-1">2</h3>
        </div>

        <div className="bg-surface-white p-4 md:p-6 rounded-lg md:rounded-xl ambient-shadow border border-surface-container/50">
          <div className="flex justify-between items-start mb-3 md:mb-4">
            <span className="material-symbols-outlined text-primary bg-primary/10 p-1.5 md:p-2 rounded-lg text-xl md:text-2xl">
              payments
            </span>
          </div>
          <p className="text-charcoal-light text-xs md:text-sm">Today&apos;s Earnings</p>
          <h3 className="text-2xl md:text-3xl font-bold text-on-surface mt-1">₹1,450</h3>
        </div>

        <div className="bg-surface-white p-4 md:p-6 rounded-lg md:rounded-xl ambient-shadow border border-surface-container/50">
          <div className="flex justify-between items-start mb-3 md:mb-4">
            <span className="material-symbols-outlined text-primary bg-primary/10 p-1.5 md:p-2 rounded-lg text-xl md:text-2xl">
              account_balance_wallet
            </span>
            <span className="text-primary text-[10px] md:text-xs border-b border-primary cursor-pointer">
              Withdraw
            </span>
          </div>
          <p className="text-charcoal-light text-xs md:text-sm">Wallet Balance</p>
          <h3 className="text-2xl md:text-3xl font-bold text-on-surface mt-1">₹8,200</h3>
        </div>
      </section>

      <div className="bento-grid">
        {/* Nearby Job Listings */}
        <section className="col-span-12 lg:col-span-8 space-y-4 md:space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-lg md:text-xl font-bold text-on-surface">Nearby Jobs</h4>
            <a className="text-primary text-xs md:text-sm font-medium hover:underline" href="#">
              View All Map
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Job Card 1 */}
            <div className="bg-surface-white p-4 md:p-6 rounded-lg md:rounded-xl ambient-shadow border border-surface-container/50 group hover:border-primary/30 transition-all duration-300">
              <div className="flex justify-between items-start mb-3 md:mb-4">
                <span className="bg-success-mint text-emerald-deep text-xs md:text-sm px-2 md:px-3 py-1 rounded-full">
                  AC Deep Cleaning
                </span>
                <span className="text-charcoal-light text-xs md:text-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm md:text-base">schedule</span>{' '}
                  2:30 PM
                </span>
              </div>
              <h5 className="font-semibold text-base md:text-lg mb-1">Arjun K.</h5>
              <p className="text-charcoal-light text-sm md:text-base mb-3 md:mb-4 flex items-center gap-1">
                <span className="material-symbols-outlined text-base md:text-lg">near_me</span> 2.4
                km away
              </p>
              <div className="flex items-center justify-between py-3 md:py-4 border-y border-surface-container mb-4 md:mb-6">
                <span className="text-charcoal-light text-xs md:text-sm uppercase">Payout</span>
                <span className="text-lg md:text-xl font-bold text-emerald-600">₹850</span>
              </div>
              <div className="flex gap-2 md:gap-3">
                <button
                  type="button"
                  className="flex-1 py-2.5 md:py-3 bg-emerald-600 cursor-pointer text-white text-sm md:text-base font-bold rounded-lg md:rounded-xl hover:bg-emerald-700 transition-all shadow-md shadow-primary/10"
                >
                  Accept
                </button>
                <button
                  type="button"
                  className="flex-1 py-2.5 md:py-3 border cursor-pointer border-outline-variant text-secondary text-sm md:text-base font-bold rounded-lg md:rounded-xl hover:bg-red-50 hover:text-red-500 hover:border-red-300 transition-all"
                >
                  Reject
                </button>
              </div>
            </div>

            {/* Job Card 2 */}
            <div className="bg-surface-white p-4 md:p-6 rounded-lg md:rounded-xl ambient-shadow border border-surface-container/50 group hover:border-primary/30 transition-all duration-300">
              <div className="flex justify-between items-start mb-3 md:mb-4">
                <span className="bg-secondary-container text-secondary text-xs md:text-sm px-2 md:px-3 py-1 rounded-full">
                  Kitchen Plumbing
                </span>
                <span className="text-charcoal-light text-xs md:text-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm md:text-base">schedule</span>{' '}
                  4:00 PM
                </span>
              </div>
              <h5 className="font-semibold text-base md:text-lg mb-1">Sarah M.</h5>
              <p className="text-charcoal-light text-sm md:text-base mb-3 md:mb-4 flex items-center gap-1">
                <span className="material-symbols-outlined text-base md:text-lg">near_me</span> 4.1
                km away
              </p>
              <div className="flex items-center justify-between py-3 md:py-4 border-y border-surface-container mb-4 md:mb-6">
                <span className="text-charcoal-light text-xs md:text-sm uppercase">Payout</span>
                <span className="text-lg md:text-xl font-bold text-emerald-600">₹450</span>
              </div>
              <div className="flex gap-2 md:gap-3">
                <button
                  type="button"
                  className="flex-1 py-2.5 md:py-3 bg-primary cursor-pointer text-white text-sm md:text-base font-bold rounded-lg md:rounded-xl hover:bg-emerald-deep transition-all shadow-md shadow-primary/10"
                >
                  Accept
                </button>
                <button
                  type="button"
                  className="flex-1 py-2.5 md:py-3 border cursor-pointer border-outline-variant text-secondary text-sm md:text-base font-bold rounded-lg md:rounded-xl hover:bg-red-50 hover:text-red-500 hover:border-red-300 transition-all"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>

          {/* Active Job Tracker */}
          <div className="mt-6 md:mt-10">
            <h4 className="text-lg md:text-xl font-bold text-on-surface mb-4 md:mb-6">
              Active Job
            </h4>
            <div className="bg-surface-white p-4 md:p-8 rounded-lg md:rounded-xl ambient-shadow border-l-4 md:border-l-8 border-primary relative overflow-hidden">
              {/* Background Decoration */}
              <div className="absolute right-0 top-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>

              <div className="flex flex-col md:flex-row justify-between items-start gap-3 md:gap-0 mb-6 md:mb-8 relative z-10">
                <div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mb-2">
                    <h5 className="text-lg md:text-2xl font-bold">Full House Deep Cleaning</h5>
                    <span className="bg-primary/10 text-primary text-xs md:text-sm px-2 md:px-3 py-1 rounded-full animate-pulse w-fit">
                      Travelling
                    </span>
                  </div>
                  <p className="text-charcoal-light text-sm md:text-base flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-base md:text-xl">
                      location_on
                    </span>
                    Sector 52, Gurgaon, Apartment 402
                  </p>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-charcoal-light text-xs md:text-sm">ETA</p>
                  <p className="text-xl md:text-2xl font-extrabold text-primary">12 Mins</p>
                </div>
              </div>

              {/* Stepper Tracker - Scrollable on mobile */}
              <div className="overflow-x-auto mb-6 md:mb-8 pb-2">
                <div className="relative flex justify-between items-center min-w-[600px] md:min-w-0 px-2">
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-surface-container-high -translate-y-1/2 z-0"></div>
                  <div className="absolute top-1/2 left-0 w-[60%] h-0.5 bg-primary -translate-y-1/2 z-0"></div>

                  {/* Step: Assigned */}
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
                      <span className="material-symbols-outlined text-base md:text-xl">check</span>
                    </div>
                    <span className="text-xs md:text-sm text-primary font-bold whitespace-nowrap">
                      Assigned
                    </span>
                  </div>

                  {/* Step: Accepted */}
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
                      <span className="material-symbols-outlined text-base md:text-xl">check</span>
                    </div>
                    <span className="text-xs md:text-sm text-primary font-bold whitespace-nowrap">
                      Accepted
                    </span>
                  </div>

                  {/* Step: Travelling */}
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white border-2 md:border-4 border-primary text-primary flex items-center justify-center shadow-md">
                      <span className="material-symbols-outlined text-base md:text-xl">
                        directions_car
                      </span>
                    </div>
                    <span className="text-xs md:text-sm text-primary font-bold whitespace-nowrap">
                      Travelling
                    </span>
                  </div>

                  {/* Step: Started */}
                  <div className="relative z-10 flex flex-col items-center gap-2 opacity-40">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-surface-container text-secondary flex items-center justify-center">
                      <span className="material-symbols-outlined text-base md:text-xl">
                        play_arrow
                      </span>
                    </div>
                    <span className="text-xs md:text-sm whitespace-nowrap">Started</span>
                  </div>

                  {/* Step: Completed */}
                  <div className="relative z-10 flex flex-col items-center gap-2 opacity-40">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-surface-container text-secondary flex items-center justify-center">
                      <span className="material-symbols-outlined text-base md:text-xl">
                        task_alt
                      </span>
                    </div>
                    <span className="text-xs md:text-sm whitespace-nowrap">Completed</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions Row */}
              <div className="grid grid-cols-4 gap-2 md:gap-4 mt-6 md:mt-8 pt-6 md:pt-8 border-t border-surface-container">
                <button
                  type="button"
                  className="flex flex-col items-center gap-1 md:gap-2 p-2 md:p-3 rounded-lg md:rounded-xl hover:bg-surface-container transition-all"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-on-secondary-container/5 flex items-center justify-center text-on-secondary-container">
                    <span className="material-symbols-outlined text-lg md:text-2xl">call</span>
                  </div>
                  <span className="text-xs md:text-sm">Call</span>
                </button>

                <button
                  type="button"
                  className="flex flex-col items-center gap-1 md:gap-2 p-2 md:p-3 rounded-lg md:rounded-xl hover:bg-surface-container transition-all"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-on-secondary-container/5 flex items-center justify-center text-on-secondary-container">
                    <span className="material-symbols-outlined text-lg md:text-2xl">chat</span>
                  </div>
                  <span className="text-xs md:text-sm">Chat</span>
                </button>

                <button
                  type="button"
                  className="flex flex-col items-center gap-1 md:gap-2 p-2 md:p-3 rounded-lg md:rounded-xl hover:bg-surface-container transition-all"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-on-secondary-container/5 flex items-center justify-center text-on-secondary-container">
                    <span className="material-symbols-outlined text-lg md:text-2xl">map</span>
                  </div>
                  <span className="text-xs md:text-sm">Navigate</span>
                </button>

                <button
                  type="button"
                  className="flex flex-col items-center gap-1 md:gap-2 p-2 md:p-3 rounded-lg md:rounded-xl bg-primary text-white hover:bg-emerald-deep transition-all shadow-md shadow-primary/20"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-lg md:text-2xl">
                      play_circle
                    </span>
                  </div>
                  <span className="text-xs md:text-sm font-bold">Start Job</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Sidebar Content (Earnings & Activity) */}
        <aside className="col-span-12 lg:col-span-4 space-y-6 md:space-y-8">
          {/* Earnings Overview */}
          <div className="bg-surface-white p-4 md:p-6 rounded-lg md:rounded-xl ambient-shadow border border-surface-container/50">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h4 className="text-xs md:text-sm uppercase tracking-widest text-charcoal-light">
                Performance
              </h4>
              <span className="text-primary text-xs md:text-sm bg-primary/5 px-2 py-1 rounded">
                Weekly
              </span>
            </div>

            <div className="flex items-end gap-2 md:gap-3 h-24 md:h-32 mb-4 md:mb-6">
              <div className="flex-1 bg-surface-container rounded-t-lg transition-all hover:bg-primary/40 h-[60%]"></div>
              <div className="flex-1 bg-surface-container rounded-t-lg transition-all hover:bg-primary/40 h-[45%]"></div>
              <div className="flex-1 bg-surface-container rounded-t-lg transition-all hover:bg-primary/40 h-[80%]"></div>
              <div className="flex-1 bg-surface-container rounded-t-lg transition-all hover:bg-primary/40 h-[95%]"></div>
              <div className="flex-1 bg-primary rounded-t-lg h-[70%]"></div>
              <div className="flex-1 bg-surface-container rounded-t-lg transition-all hover:bg-primary/40 h-[30%]"></div>
              <div className="flex-1 bg-surface-container rounded-t-lg transition-all hover:bg-primary/40 h-[50%]"></div>
            </div>

            <div className="space-y-3 md:space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-charcoal-light text-sm md:text-base">Total Earnings</span>
                <span className="font-bold text-on-surface text-sm md:text-base">₹12,400</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-charcoal-light text-sm md:text-base">Hours Online</span>
                <span className="font-bold text-on-surface text-sm md:text-base">32h 15m</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-charcoal-light text-sm md:text-base">Jobs Completed</span>
                <span className="font-bold text-on-surface text-sm md:text-base">18</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-surface-white p-4 md:p-6 rounded-lg md:rounded-xl ambient-shadow border border-surface-container/50">
            <h4 className="text-xs md:text-sm uppercase tracking-widest text-charcoal-light mb-4 md:mb-6">
              Recent Activity
            </h4>

            <div className="space-y-4 md:space-y-6">
              <div className="flex gap-3 md:gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-success-mint flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-sm md:text-base">task_alt</span>
                  </div>
                  <div className="w-0.5 h-8 md:h-10 bg-surface-container mt-2"></div>
                </div>
                <div className="flex-1">
                  <p className="text-on-surface text-sm md:text-base font-bold">Job Completed</p>
                  <p className="text-charcoal-light text-xs md:text-sm">
                    Full House Cleaning at Sector 45
                  </p>
                  <span className="text-charcoal-light text-xs mt-1 block opacity-60">
                    11:30 AM
                  </span>
                </div>
              </div>

              <div className="flex gap-3 md:gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed-variant">
                    <span className="material-symbols-outlined text-sm md:text-base">
                      account_balance_wallet
                    </span>
                  </div>
                  <div className="w-0.5 h-8 md:h-10 bg-surface-container mt-2"></div>
                </div>
                <div className="flex-1">
                  <p className="text-on-surface text-sm md:text-base font-bold">Payment Credited</p>
                  <p className="text-emerald-deep font-bold text-xs md:text-sm">+₹600.00</p>
                  <span className="text-charcoal-light text-xs mt-1 block opacity-60">
                    10:45 AM
                  </span>
                </div>
              </div>

              <div className="flex gap-3 md:gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-surface-container flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-sm md:text-base">info</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-on-surface text-sm md:text-base font-bold">Doc Verified</p>
                  <p className="text-charcoal-light text-xs md:text-sm">
                    New vehicle papers approved
                  </p>
                  <span className="text-charcoal-light text-xs mt-1 block opacity-60">
                    Yesterday
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="w-full mt-4 md:mt-6 py-2 text-primary text-sm md:text-base hover:bg-primary/5 transition-all rounded-lg"
            >
              View Full History
            </button>
          </div>

          {/* Loyalty Card */}
          <div className="bg-linear-to-br from-primary to-emerald-deep p-4 md:p-6 rounded-lg md:rounded-xl text-white relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 w-20 h-20 md:w-24 md:h-24 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10">
              <h4 className="text-base md:text-lg font-bold mb-1">ServicePro Star</h4>
              <p className="text-white/80 text-xs md:text-sm mb-3 md:mb-4">
                Complete 5 more jobs to reach Gold level.
              </p>
              <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden mb-2">
                <div className="bg-white h-full w-[80%] rounded-full"></div>
              </div>
              <div className="flex justify-between items-center text-[9px] md:text-[10px] font-bold uppercase tracking-widest">
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
          gap: 16px;
        }
        @media (min-width: 768px) {
          .bento-grid {
            gap: 24px;
          }
        }
      `}</style>
    </TechnicianDashboardLayout>
  );
}
