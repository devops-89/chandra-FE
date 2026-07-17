'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

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
    <div className="rounded-2xl border border-slate-500">
      <button
        onClick={() => setOpen(!open)}
        className="
          flex
          w-full
          items-center
          justify-between
          p-4
          text-left
          cursor-pointer
        "
      >
        <span className="font-medium text-slate-700">
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
        <div className="font-medium border-t p-4 text-slate-500">
          {answer}
        </div>
      )}
    </div>
  );
}