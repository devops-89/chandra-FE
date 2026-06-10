export default function BasicInfoFields() {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:gap-6">
        <div>
          <label className="block mb-2 text-xs md:text-sm font-medium">Full Name</label>

          <input
            type="text"
            placeholder="John Doe"
            className="w-full h-12 border-slate-300 md:h-12 border rounded-lg md:rounded-xl px-4 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
          />
        </div>

        <div>
          <label className="block mb-2 text-xs md:text-sm font-medium">Phone Number</label>

          <input
            type="tel"
            placeholder="+91 9876543210"
            className="w-full h-12 md:h-12 border-slate-300 border rounded-lg md:rounded-xl px-4 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
          />
        </div>
      </div>

      <div>
        <label className="block mb-2 mt-4 text-xs md:text-sm font-medium">
          Professional Email Address
        </label>

        <input
          type="email"
          placeholder="john@example.com"
          className="w-full h-12 md:h-12 border border-slate-300 rounded-lg md:rounded-xl px-4 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
        />
      </div>
    </>
  );
}
