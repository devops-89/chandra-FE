'use client';

import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  deleteServiceAction,
  updateService,
} from '@/redux/slices/servicesSlice';
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

    dispatch(
      updateService({
        id:          editTarget.id,
        name:        data.name,
        description: data.description,
        isActive:    data.isActive,
        pricingRule: {
          serviceBasePrice: parseFloat(data.serviceBasePrice) || 0,
          perHourRate:      data.perHourRate     ? parseFloat(data.perHourRate)     : undefined,
          perKmRate:        data.perKmRate       ? parseFloat(data.perKmRate)       : undefined,
          platformFee:      data.platformFee     ? parseFloat(data.platformFee)     : undefined,
          gst:              data.gst             ? parseFloat(data.gst)             : undefined,
          emergencyCharge:  data.emergencyCharge ? parseFloat(data.emergencyCharge) : undefined,
        },
      })
    );

    closeEdit();
  };

  // ── Delete ───────────────────────────────────────────────────────
  const [deleteTarget, setDeleteTarget] = useState<AdminService | null>(null);

  const openDelete  = (service: AdminService) => setDeleteTarget(service);
  const closeDelete = () => setDeleteTarget(null);

  const confirmDelete = () => {
    if (!deleteTarget) return;
    dispatch(deleteServiceAction(deleteTarget.id));
    closeDelete();
  };

  return {
    services,
    editTarget,   openEdit,   closeEdit,   saveEdit,
    deleteTarget, openDelete, closeDelete, confirmDelete,
  };
}
