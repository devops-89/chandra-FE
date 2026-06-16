'use client';

import { useState } from 'react';

import { useServices } from '@/redux/ServiceContext';
import type { AdminService, EditServiceFormData } from '@/types/admin/service.types';

/**
 * useServiceManager
 *
 * Manages the services list in local state.
 * Exposes helpers consumed by EditServiceForm and DeleteServiceModal.
 * Import this hook in ServicesTable (or any parent) and pass the
 * returned handlers / state down as props.
 */
export function useServiceManager() {
  // Seed from the static constants file; in a real app this would come from an API.
  const { services, setServices, } = useServices();

  // ── Edit ────────────────────────────────────────────────────────
  const [editTarget, setEditTarget] = useState<AdminService | null>(null);

  const openEdit = (service: AdminService) => setEditTarget(service);

  const closeEdit = () => setEditTarget(null);

  /**
   * Persists the edited values back into the list.
   * Replace the `setServices` body with an API call + optimistic update
   * when you wire up a backend.
   */
  const saveEdit = (data: EditServiceFormData) => {
    if (!editTarget) return;

    setServices((prev) =>
      prev.map((s) =>
        s.id === editTarget.id
          ? {
            ...s,
            name: data.name,
            category: data.category,
            subcategory: data.subcategory,
            price: parseFloat(data.price) || s.price,
            duration: data.duration,
            status: data.status,
          }
          : s,
      ),
    );

    closeEdit();
  };

  // ── Delete ───────────────────────────────────────────────────────
  const [deleteTarget, setDeleteTarget] = useState<AdminService | null>(null);

  const openDelete = (service: AdminService) => setDeleteTarget(service);

  const closeDelete = () => setDeleteTarget(null);

  /**
   * Removes the service from the list.
   * Replace with an API call when you wire up a backend.
   */
  const confirmDelete = () => {
    if (!deleteTarget) return;

    setServices((prev) => prev.filter((s) => s.id !== deleteTarget.id));

    closeDelete();
  };

  return {
    // list
    services,

    // edit
    editTarget,
    openEdit,
    closeEdit,
    saveEdit,

    // delete
    deleteTarget,
    openDelete,
    closeDelete,
    confirmDelete,
  };
}
