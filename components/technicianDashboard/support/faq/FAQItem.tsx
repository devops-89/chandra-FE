'use client';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
    <div
      className="
        border
        border-slate-200
        rounded-2xl
        overflow-hidden
      "
    >
      <button
        onClick={() => setOpen(!open)}
        className="
          w-full
          flex
          items-center
          justify-between
          p-5
          text-left
          hover:bg-slate-50
          transition-all
        "
      >
        <span
          className="
            font-semibold
            text-slate-900
          "
        >
          {question}
        </span>

        <ExpandMoreIcon
          className={`
            transition-transform
            duration-300
            ${open ? 'rotate-180' : ''}
          `}
        />
      </button>

      {open && (
        <div
          className="
            px-5
            pb-5
            text-slate-600
            leading-relaxed
          "
        >
          {answer}
        </div>
      )}
    </div>
  );
}