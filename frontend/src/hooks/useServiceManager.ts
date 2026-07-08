'use client';

import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateService } from '@/redux/slices/servicesSlice';
import { deleteService } from '@/redux/slices/servicesSlice';
import type { AdminService, EditServiceFormData } from '@/types/admin/service.types';

export function useServiceManager() {
  const dispatch = useAppDispatch();
  const services = useAppSelector((state) => state.services.items);

  // ── Edit ────────────────────────────────────────────────────────
  const [editTarget, setEditTarget] = useState<AdminService | null>(null);

  const openEdit  = (service: AdminService) => setEditTarget(service);
  const closeEdit = () => setEditTarget(null);

  const saveEdit = (data: EditServiceFormData) => {
    if (!editTarget) return;

    try {
      dispatch(
    updateService({
    id: editTarget.id,
    name: data.name,
    description: data.description,
    isActive: data.isActive,

    serviceBasePrice: parseFloat(data.serviceBasePrice) || 0,
    perHourRate: data.perHourRate
      ? parseFloat(data.perHourRate)
      : undefined,
    perKmRate: data.perKmRate
      ? parseFloat(data.perKmRate)
      : undefined,
    platformFee: data.platformFee
      ? parseFloat(data.platformFee)
      : undefined,
    gst: data.gst
      ? parseFloat(data.gst)
      : undefined,
    emergencyCharge: data.emergencyCharge
      ? parseFloat(data.emergencyCharge)
      : undefined,
    specifications: data.specifications?.map(({ name, type, isRequired, values }) => ({
      name,
      type: type as 'text' | 'number' | 'select' | 'image',
      isRequired,
      values,
    })),
  })
).unwrap();

  closeEdit();
  } catch (error) {
    console.error(error);
  }
  };

  // ── Delete ───────────────────────────────────────────────────────
  const [deleteTarget, setDeleteTarget] = useState<AdminService | null>(null);

  const openDelete  = (service: AdminService) => setDeleteTarget(service);
  const closeDelete = () => setDeleteTarget(null);

  const confirmDelete = async () => {
  if (!deleteTarget) return;

  try {
    await dispatch(
      deleteService(deleteTarget.id)
    ).unwrap();

    closeDelete();
  } catch (error) {
    console.error('Failed to delete service:', error);
  }
};

  return {
    services,
    editTarget,   openEdit,   closeEdit,   saveEdit,
    deleteTarget, openDelete, closeDelete, confirmDelete,
  };
}
