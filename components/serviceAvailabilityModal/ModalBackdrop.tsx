interface ModalBackdropProps {
  children: React.ReactNode;
}

export function ModalBackdrop({ children }: ModalBackdropProps) {
  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/60 backdrop-blur-sm
        px-4
      "
      aria-modal="true"
      role="dialog"
    >
      {children}
    </div>
  );
}
