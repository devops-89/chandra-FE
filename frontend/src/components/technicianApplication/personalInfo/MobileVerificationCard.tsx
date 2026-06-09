export default function MobileVerificationCard() {
  return (
    <div className="border rounded-2xl p-5 bg-gray-50">
      <h4 className="font-semibold">
        Mobile OTP Verification
      </h4>

      <p className="text-sm text-gray-500 mt-1">
        A 6-digit OTP will be sent to your mobile.
      </p>

      <button
        type="button"
        className="mt-4 border rounded-xl px-4 py-2"
      >
        Send OTP
      </button>
    </div>
  );
}