'use client';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface Props {
  title: string;
  actionText?: string;
}

export default function SectionHeader({
  title,
  actionText,
}: Props) {
  return (
    <div className="flex items-center justify-between mb-5">
      <h2 className="text-xl font-semibold text-slate-800">
        {title}
      </h2>

      {actionText && (
        <button className="flex items-center gap-1 text-emerald-700 font-medium">
          {actionText}

          <ChevronRightIcon
            sx={{ fontSize: 18 }}
          />
        </button>
      )}
    </div>
  );
}