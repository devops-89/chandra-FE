export default function EmailVerificationCard() {
  return (
    <div className="border rounded-2xl p-5 bg-gray-50">
      <h4 className="font-semibold">
        Email Verification
      </h4>

      <p className="text-sm text-gray-500 mt-1">
        Verification link will be sent to email.
      </p>

      <button
        type="button"
        className="mt-4 border rounded-xl px-4 py-2"
      >
        Send Link
      </button>
    </div>
  );
}