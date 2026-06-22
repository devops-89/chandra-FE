export default function ProfileForm() {
  return (
    <div
      className="
        rounded-3xl
        bg-white
        p-6
        shadow-lg
      "
    >
      <h2 className="mb-6 text-xl font-bold text-slate-950">
        Personal Information
      </h2>

      <div className="grid gap-5">
        <input
          defaultValue="Chandra Kumar"
          placeholder="Full Name"
          className="rounded-xl border border-emerald-600 outline-emerald-600 p-4 text-slate-700"
        />

        <input
          defaultValue="chandra@email.com"
          placeholder="Email"
          className="rounded-xl border border-emerald-600 outline-emerald-600 p-4 text-slate-700"
        />

        <input
          defaultValue="+91 9876543210"
          placeholder="Phone"
          className="rounded-xl border border-emerald-600 outline-emerald-600 p-4 text-slate-700"
        />

        <button
          className="rounded-xl bg-emerald-600 px-6 py-3 cursor-pointer text-white transition-all duration-300 hover:bg-emerald-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}