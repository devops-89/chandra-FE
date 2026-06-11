const categories = [
  {
    id: 1,
    name: "Electrical",
    services: 18,
  },
  {
    id: 2,
    name: "Plumbing",
    services: 14,
  },
  {
    id: 3,
    name: "Cleaning",
    services: 22,
  },
];

const CategoriesTable = () => {
  return (
    <div className="overflow-hidden rounded-2xl border text-slate-400 bg-white">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="p-4 text-left">
              Category
            </th>

            <th className="p-4 text-left">
              Services
            </th>

            <th className="p-4 text-left">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category) => (
            <tr
              key={category.id}
              className="border-t"
            >
              <td className="p-4">
                {category.name}
              </td>

              <td className="p-4">
                {category.services}
              </td>

              <td className="p-4">
                <div className="flex gap-3">
                  <button className="text-emerald-600">
                    Edit
                  </button>

                  <button className="text-red-500">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesTable;