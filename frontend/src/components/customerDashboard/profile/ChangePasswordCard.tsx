export default function ChangePasswordCard() {
  return (
    <div
      className="
        rounded-3xl
        bg-white
        p-6
        shadow-sm
      "
    >
      <h2 className="mb-6 text-xl font-bold text-slate-950">
        Change Password
      </h2>

      <div className="grid gap-4">
        <input
          type="password"
          placeholder="Current Password"
          className="rounded-xl border p-4 text-slate-700"
        />

        <input
          type="password"
          placeholder="New Password"
          className="rounded-xl border p-4 text-slate-700"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="rounded-xl border p-4 text-slate-700"
        />

        <button
          className="
            rounded-xl
            border
            px-6
            py-3
            bg-emerald-600
            text-white
            transition-all
            duration-300
            hover:bg-emerald-700
          "
        >
          Update Password
        </button>
      </div>
    </div>
  );
}