
export default function RaiseTicketForm() {
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
        Raise Support Ticket
      </h2>

      <div className="space-y-4">
        <input
          placeholder="Subject"
          className="
            w-full
            rounded-xl
            border
            p-4
          "
        />

        <textarea
          rows={5}
          placeholder="Describe your issue..."
          className="
            w-full
            rounded-xl
            border
            p-4
          "
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
          Submit Ticket
        </button>
      </div>
    </div>
  );
}