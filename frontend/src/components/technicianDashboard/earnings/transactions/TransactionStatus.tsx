'use client';

interface Props {
  status: string;
}

export default function TransactionStatus({
  status,
}: Props) {
  return (
    <span
      className={`
        px-3
        py-1
        rounded-full
        text-xs
        font-semibold

        ${
          status === 'Completed'
            ? 'bg-emerald-100 text-emerald-700'
            : 'bg-amber-100 text-amber-700'
        }
      `}
    >
      {status}
    </span>
  );
}