'use client';

export interface SubmitButtonProps {
  isLoading: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}

export default function SubmitButton({ 
  isLoading, 
  disabled = false, 
  children = 'Submit Service Request' 
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading || disabled}
      className="
        w-full
        rounded-full
        bg-emerald-600
        px-8
        py-4
        text-lg
        font-semibold
        text-white
        transition-all
        duration-300
        cursor-pointer
        hover:bg-emerald-700
        hover:shadow-lg
        active:scale-95
        active:shadow-md
        disabled:opacity-50
        disabled:cursor-not-allowed
        flex
        items-center
        justify-center
        gap-2
      "
    >
      {isLoading ? (
        <>
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          Processing...
        </>
      ) : (
        <>
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          {children}
        </>
      )}
    </button>
  );
}