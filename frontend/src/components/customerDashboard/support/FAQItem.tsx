'use client';

import { useState } from 'react';

import { ChevronDown } from 'lucide-react';

interface Props {
  question: string;
  answer: string;
}

export default function FAQItem({
  question,
  answer,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-slate-200">
      <button
        onClick={() => setOpen(!open)}
        className="
          flex
          w-full
          items-center
          justify-between
          p-4
          text-left
        "
      >
        <span className="font-medium">
          {question}
        </span>

        <ChevronDown
          className={`
            transition-transform
            ${open ? 'rotate-180' : ''}
          `}
        />
      </button>

      {open && (
        <div className="border-t p-4 text-slate-600">
          {answer}
        </div>
      )}
    </div>
  );
}