interface ConfirmButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function ConfirmButton({ onClick, disabled = false }: ConfirmButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (disabled) {
      return;
    }
    
    onClick();
  };

  return (
    <>
    <div className="flex justify-center">
      <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className="
        mt-10 w-1/2 rounded-full bg-emerald-600 px-8 py-4 text-lg font-semibold text-white
        transition-all duration-300 hover:bg-emerald-700 hover:shadow-lg
        cursor-pointer
        active:scale-95 active:shadow-md flex items-center justify-center gap-2
        disabled:opacity-50 disabled:cursor-not-allowed
      "
      style={{ zIndex: 10, position: 'relative' }}
    >
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
      Confirm Booking
    </button>
    </div>
    </>
  );
}