"use client";

import { useState } from "react";

import DeleteCategoryModal from "@/components/adminDashboard/services/manageService/DeleteServiceModal";
import EditServiceForm from "@/components/adminDashboard/services/manageService/EditServiceForm";


const initialCategories = [
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
  const [categoriesData, setCategoriesData] =
    useState(initialCategories);

  const [selectedCategory, setSelectedCategory] =
    useState<(typeof initialCategories)[0] | null>(
      null
    );

  const [openEditModal, setOpenEditModal] =
    useState(false);

  const [openDeleteModal, setOpenDeleteModal] =
    useState(false);

  const handleUpdateCategory = (
    updatedCategory: {
      id: number;
      name: string;
      services: number;
    }
  ) => {
    setCategoriesData((prev) =>
      prev.map((category) =>
        category.id === updatedCategory.id
          ? updatedCategory
          : category
      )
    );

    setOpenEditModal(false);
  };

  const handleDeleteCategory = () => {
    if (!selectedCategory) return;

    setCategoriesData((prev) =>
      prev.filter(
        (category) =>
          category.id !== selectedCategory.id
      )
    );

    setOpenDeleteModal(false);
  };

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-slate-300 bg-white">
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
            {categoriesData.map((category) => (
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
                  <div className="flex gap-4">
                    <button
                      className="font-medium text-emerald-600 hover:underline"
                      onClick={() => {
                        setSelectedCategory(
                          category
                        );
                        setOpenEditModal(true);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="font-medium text-red-500 hover:underline"
                      onClick={() => {
                        setSelectedCategory(
                          category
                        );
                        setOpenDeleteModal(true);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EditServiceForm
        service={selectedCategory && openEditModal ? {
          id: selectedCategory.id,
          name: selectedCategory.name,
          category: '',
          subcategory: '',
          price: 0,
          duration: '',
          status: 'Active' as const,
          image: '',
          bookings: 0
        } : null}
        onClose={() =>
          setOpenEditModal(false)
        }
        onSave={(data) => {
          if (selectedCategory) {
            handleUpdateCategory({
              id: selectedCategory.id,
              name: data.name || selectedCategory.name,
              services: selectedCategory.services
            });
          }
        }}
      />

      <DeleteCategoryModal
        service={selectedCategory && openDeleteModal ? {
          id: selectedCategory.id,
          name: selectedCategory.name,
          category: '',
          subcategory: '',
          price: 0,
          duration: '',
          status: 'Active' as const,
          image: '',
          bookings: 0
        } : null}
        onClose={() =>
          setOpenDeleteModal(false)
        }
        onDelete={handleDeleteCategory}
      />
    </>
  );
};

export default CategoriesTable;