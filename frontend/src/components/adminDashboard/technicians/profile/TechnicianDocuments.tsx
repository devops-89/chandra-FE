const TechnicianDocuments = () => {
  return (
    <div className="rounded-2xl border bg-white p-6">
      <h3 className="mb-4 text-lg font-semibold">
        Documents
      </h3>

      <div className="space-y-3">
        <div className="rounded-xl border p-4">
          Aadhaar Card
        </div>

        <div className="rounded-xl border p-4">
          PAN Card
        </div>

        <div className="rounded-xl border p-4">
          Experience Certificate
        </div>
      </div>
    </div>
  );
};

export default TechnicianDocuments;