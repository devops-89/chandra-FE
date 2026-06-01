import type { AvailabilityResult } from '@/types/serviceAvailability.types';

interface AvailabilityStatusProps {
  result: AvailabilityResult | null;
}

export const AvailabilityStatus = ({
  result,
}: AvailabilityStatusProps) => {
  if (!result) return null;

  const isSuccess = result.type === 'success';

  return (
    <div
      className={`
        rounded-2xl
        border
        px-5
        py-4
        text-center
        text-lg
        leading-relaxed
        md:text-xl
        ${
          isSuccess
            ? 'border-green-500 text-green-500'
            : 'border-red-500 text-red-500'
        }
      `}
    >
      {result.message}
    </div>
  );
};