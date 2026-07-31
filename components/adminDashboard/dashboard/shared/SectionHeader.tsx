'use client';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useRouter } from 'next/navigation';

interface Props {
  title: string;
  actionText?: string;
}

export default function SectionHeader({
  title,
  actionText,
}: Props) {
  const router= useRouter();
  return (
    <div className="flex items-center justify-between mb-2">
      <h2 className="text-xl font-semibold text-slate-800">
        {title}
      </h2>

      {actionText && (
        <button className="flex items-center gap-1 hover:underline cursor-pointer text-emerald-700 font-medium"
          onClick={() => router.push('/admin/technicians')}>
          {actionText}

          <ChevronRightIcon
            sx={{ fontSize: 18 }}
          />
        </button>
      )}
    </div>
  );
}
