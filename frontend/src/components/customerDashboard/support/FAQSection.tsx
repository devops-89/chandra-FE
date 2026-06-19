import { faqs } from '@/constants/dashboard/faqs';

import FAQItem from './FAQItem';

export default function FAQSection() {
  return (
    <section
      className="
        rounded-3xl
        bg-white
        p-6
        shadow-lg
        text-slate-700
      "
    >
      <h2 className="mb-6 text-xl font-bold">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq) => (
          <FAQItem
            key={faq.id}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </div>
    </section>
  );
}