export default function BasicInfoFields() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 text-sm font-medium">
            Full Name
          </label>

          <input
            type="text"
            placeholder="John Doe"
            className="w-full h-12 border rounded-xl px-4"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            Phone Number
          </label>

          <input
            type="tel"
            placeholder="+91 9876543210"
            className="w-full h-12 border rounded-xl px-4"
          />
        </div>
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium">
          Professional Email Address
        </label>

        <input
          type="email"
          placeholder="john@example.com"
          className="w-full h-12 border rounded-xl px-4"
        />
      </div>
    </>
  );
}