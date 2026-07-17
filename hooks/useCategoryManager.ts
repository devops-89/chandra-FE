'use client';

import { useState } from 'react';

import { categoriesData } from '@/constants/admin/categoryData';
import type { Category, CategoryFormData, SubcategoryFormData } from '@/types/admin/category.types';

/** Generates a simple unique id — replace with uuid in production */
const uid = (prefix: string) =>
  `${prefix}${Date.now().toString(36).toUpperCase()}`;

/**
 * useCategoryManager
 *
 * Manages the full category + subcategory tree in local state.
 * Import this hook wherever you need to read or mutate categories.
 *
 * Usage:
 *   const { categories, addCategory, addSubcategory, ... } = useCategoryManager();
 */
export function useCategoryManager() {
  const [categories, setCategories] = useState<Category[]>(categoriesData);

  /* ── Derived helpers ──────────────────────────────────────────── */

  /** Returns the names of all top-level categories (for <select> options) */
  const categoryNames = categories.map((c) => c.name);

  /** Returns subcategory names for a given category name */
  const getSubcategories = (categoryName: string): string[] => {
    const cat = categories.find((c) => c.name === categoryName);
    return cat ? cat.subcategories.map((s) => s.name) : [];
  };

  /* ── Add Category ──────────────────────────────────────────────── */
  const addCategory = (data: CategoryFormData): void => {
    const trimmed = data.name.trim();
    if (!trimmed) return;

    // Prevent duplicates (case-insensitive)
    const exists = categories.some(
      (c) => c.name.toLowerCase() === trimmed.toLowerCase(),
    );
    if (exists) return;

    setCategories((prev) => [
      ...prev,
      { id: uid('CAT'), name: trimmed, subcategories: [] },
    ]);
  };

  /* ── Edit Category ─────────────────────────────────────────────── */
  const editCategory = (id: string, data: CategoryFormData): void => {
    const trimmed = data.name.trim();
    if (!trimmed) return;

    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, name: trimmed } : c)),
    );
  };

  /* ── Delete Category ───────────────────────────────────────────── */
  const deleteCategory = (id: string): void => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  /* ── Add Subcategory ───────────────────────────────────────────── */
  const addSubcategory = (data: SubcategoryFormData): void => {
    const trimmed = data.name.trim();
    if (!trimmed || !data.categoryId) return;

    setCategories((prev) =>
      prev.map((c) => {
        if (c.id !== data.categoryId) return c;

        // Prevent duplicates within the category
        const exists = c.subcategories.some(
          (s) => s.name.toLowerCase() === trimmed.toLowerCase(),
        );
        if (exists) return c;

        return {
          ...c,
          subcategories: [
            ...c.subcategories,
            { id: uid('SUB'), name: trimmed },
          ],
        };
      }),
    );
  };

  /* ── Edit Subcategory ──────────────────────────────────────────── */
  const editSubcategory = (
    categoryId: string,
    subcategoryId: string,
    data: { name: string },
  ): void => {
    const trimmed = data.name.trim();
    if (!trimmed) return;

    setCategories((prev) =>
      prev.map((c) => {
        if (c.id !== categoryId) return c;
        return {
          ...c,
          subcategories: c.subcategories.map((s) =>
            s.id === subcategoryId ? { ...s, name: trimmed } : s,
          ),
        };
      }),
    );
  };

  /* ── Delete Subcategory ─────────────────────────────────────────── */
  const deleteSubcategory = (categoryId: string, subcategoryId: string): void => {
    setCategories((prev) =>
      prev.map((c) => {
        if (c.id !== categoryId) return c;
        return {
          ...c,
          subcategories: c.subcategories.filter((s) => s.id !== subcategoryId),
        };
      }),
    );
  };

  return {
    categories,
    categoryNames,
    getSubcategories,
    addCategory,
    editCategory,
    deleteCategory,
    addSubcategory,
    editSubcategory,
    deleteSubcategory,
  };
}
