import React from 'react';
import PublicNavbar from '@/components/common/PublicNavbar';
import PublicFooter from '@/components/common/PublicFooter';

export default function PrivacyPolicyPage() {
  return (
    <>
      <PublicNavbar />
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-12 bg-white min-h-screen">
        <h1 className="text-4xl font-bold mb-8 text-slate-900">Privacy Policy</h1>
      
      <div className="prose prose-slate max-w-none">
        <p className="mb-6">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-emerald-800">1. Information We Collect</h2>
          <p className="mb-4 text-slate-700 leading-relaxed">
            We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us. This information may include: name, email, phone number, postal address, profile picture, payment method, items requested, delivery notes, and other information you choose to provide.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-emerald-800">2. How We Use Your Information</h2>
          <p className="mb-4 text-slate-700 leading-relaxed">
            We may use the information we collect about you to:
          </p>
          <ul className="list-disc pl-6 mb-4 text-slate-700 space-y-2">
            <li>Provide, maintain, and improve our Services.</li>
            <li>Perform internal operations, including to prevent fraud and abuse of our Services.</li>
            <li>Send you communications we think will be of interest to you.</li>
            <li>Personalize and improve the Services.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-emerald-800">3. Sharing of Information</h2>
          <p className="mb-4 text-slate-700 leading-relaxed">
            We may share the information we collect about you as described in this Statement or as described at the time of collection or sharing, including as follows:
          </p>
          <ul className="list-disc pl-6 mb-4 text-slate-700 space-y-2">
            <li>With independent service providers (Technicians) to enable them to provide the Services you request.</li>
            <li>In response to a request for information by a competent authority if we believe disclosure is in accordance with applicable law.</li>
          </ul>
        </section>
      </div>
    </div>
    <PublicFooter />
    </>
  );
}
