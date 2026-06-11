'use client';

export default function TechnicianProfile() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-surface p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-on-surface mb-2">
            Your Profile
          </h1>
          <p className="text-lg text-secondary">
            Manage your professional information
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-md border border-outline-variant/30 p-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-on-surface mb-4">
                Profile Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-2 border border-outline-variant rounded-lg bg-surface"
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-4 py-2 border border-outline-variant rounded-lg bg-surface"
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="Your phone number"
                    className="w-full px-4 py-2 border border-outline-variant rounded-lg bg-surface"
                    disabled
                  />
                </div>
              </div>
            </div>

            <hr className="border-outline-variant/30" />

            <div>
              <h3 className="text-lg font-bold text-on-surface mb-4">
                Skills & Expertise
              </h3>
              <p className="text-secondary">
                Your skills and certifications will appear here during full implementation.
              </p>
            </div>

            <hr className="border-outline-variant/30" />

            <div>
              <h3 className="text-lg font-bold text-on-surface mb-4">
                Service Area
              </h3>
              <p className="text-secondary">
                Your service coverage will be displayed here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
