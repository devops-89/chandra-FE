export default function ProfileForm() {
  return (
    <div
      className="
        rounded-3xl
        bg-white
        p-6
        shadow-sm
      "
    >
      <h2 className="mb-6 text-xl font-bold">
        Personal Information
      </h2>

      <div className="grid gap-5">
        <input
          defaultValue="Chandra Kumar"
          placeholder="Full Name"
          className="rounded-xl border p-4"
        />

        <input
          defaultValue="chandra@email.com"
          placeholder="Email"
          className="rounded-xl border p-4"
        />

        <input
          defaultValue="+91 9876543210"
          placeholder="Phone"
          className="rounded-xl border p-4"
        />

        <button
          className="
            rounded-xl
            bg-emerald-600
            px-6
            py-3
            text-white
          "
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}