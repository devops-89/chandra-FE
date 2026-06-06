interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div className="mt-8 rounded-lg border-2 border-red-200 bg-red-50 p-4">
      <p className="font-medium text-red-600">{message}</p>
    </div>
  );
}