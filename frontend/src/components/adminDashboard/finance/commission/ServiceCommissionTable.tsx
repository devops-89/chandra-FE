const services = [
  {
    name: "AC Repair",
    commission: 15,
  },
  {
    name: "Plumbing",
    commission: 12,
  },
  {
    name: "Solar Cleaning",
    commission: 18,
  },
];

const ServiceCommissionTable = () => {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white">
      <div className="border-b p-5">
        <h3 className="font-semibold">
          Service Commission Settings
        </h3>
      </div>

      <table className="w-full">
        <thead className="bg-emerald-600 text-white">
          <tr>
            <th className="p-4 text-left">
              Service
            </th>

            <th className="p-4 text-left">
              Commission
            </th>

            <th className="p-4 text-left">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {services.map((service) => (
            <tr
              key={service.name}
              className="border-b"
            >
              <td className="p-4">
                {service.name}
              </td>

              <td className="p-4">
                {service.commission}%
              </td>

              <td className="p-4">
                <button className="text-emerald-600">
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceCommissionTable;