import React from 'react';
import PublicNavbar from '@/components/common/PublicNavbar';
import PublicFooter from '@/components/common/PublicFooter';

export default function TermsOfServicePage() {
  return (
    <>
      <PublicNavbar />
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-12 bg-white min-h-screen">
        <h1 className="text-4xl font-bold mb-8 text-slate-900">Terms of Service</h1>
      
      <div className="prose prose-slate max-w-none">
        <p className="mb-6">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-emerald-800">1. Acceptance of Terms</h2>
          <p className="mb-4 text-slate-700 leading-relaxed">
            By accessing and using HiChandra ("the Services"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-emerald-800">2. Description of Services</h2>
          <p className="mb-4 text-slate-700 leading-relaxed">
            HiChandra connects customers with independent service providers ("Technicians") offering various home services, including but not limited to electrical, plumbing, and cleaning services. We act solely as a platform to facilitate these connections and do not directly provide the services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-emerald-800">3. User Responsibilities</h2>
          <p className="mb-4 text-slate-700 leading-relaxed">
            As a user of the Services, you agree to:
          </p>
          <ul className="list-disc pl-6 mb-4 text-slate-700 space-y-2">
            <li>Provide accurate and complete information when creating an account.</li>
            <li>Maintain the confidentiality of your account credentials.</li>
            <li>Be present or have a designated representative present during scheduled service appointments.</li>
            <li>Pay for services rendered according to the agreed-upon rates.</li>
            <li>Treat Technicians with respect and provide a safe working environment.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-emerald-800">4. Limitation of Liability</h2>
          <p className="mb-4 text-slate-700 leading-relaxed">
            To the maximum extent permitted by applicable law, HiChandra shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of the Services.
          </p>
        </section>
      </div>
    </div>
    <PublicFooter />
    </>
  );
}
