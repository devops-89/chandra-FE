'use client';

import FAQItem from './FAQItem';
// import FAQSearch from './FAQSearch';

const faqs = [
  {
    question: 'When will I receive my payment?',
    answer:
      'Payments are usually credited within 24-48 hours after successful job completion.',
  },
  {
    question: 'How do I update my service area?',
    answer:
      'Go to Profile → Availability Settings and update your service radius.',
  },
  {
    question: 'What happens if a customer cancels?',
    answer:
      'Cancellation policies depend on the job stage and may include compensation.',
  },
  {
    question: 'How can I contact support quickly?',
    answer:
      'Use Live Chat or Call Support from the Get Support dashboard.',
  },
  {
    question: 'How do I change my bank account?',
    answer:
      'Navigate to Profile → Bank Details and update your account information.',
  },
];

export default function FAQSection() {
  return (
    <div
      className="
        bg-white
        border
        border-slate-200
        rounded-3xl
        p-6
        shadow-sm
      "
    >
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900">
          Frequently Asked Questions
        </h3>

        <p className="text-slate-500 mt-1">
          Find answers to common technician queries.
        </p>
      </div>

      {/* <FAQSearch /> */}

      <div className="mt-6 space-y-4">
        {faqs.map((faq) => (
          <FAQItem
            key={faq.question}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </div>
    </div>
  );
}