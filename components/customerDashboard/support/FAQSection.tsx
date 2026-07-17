import { faqs } from '@/constants/dashboard/faqs';

import FAQItem from './FAQItem';

export default function FAQSection() {
  return (
    <section
      className="
        rounded-3xl
        bg-white
        p-4
        shadow-lg
        text-slate-700
        sm:p-6
      "
    >
      <h2 className="mb-4 text-lg font-bold sm:mb-6 sm:text-xl">
        Frequently Asked Questions
      </h2>

      <div className="space-y-3 sm:space-y-4">
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