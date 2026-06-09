'use client';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
} from '@mui/material';

import type { TechnicianApproval } from '@/types/admin.types';

interface Props {
  open: boolean;
  onClose: () => void;
  technician: TechnicianApproval |null;
}

export default function TechnicianDetailsModal({
  open,
  onClose,
  technician,
}: Props) {
  if (!technician) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        Technician Details
      </DialogTitle>

      <DialogContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold">
              {technician.name}
            </h4>

            <p className="text-slate-500">
              {technician.experience} Years Experience
            </p>
          </div>

          <Divider />

          <div>
            <p>
              <strong>Email:</strong>{' '}
              {technician.email}
            </p>

            <p>
              <strong>Phone:</strong>{' '}
              {technician.phone}
            </p>

            <p>
              <strong>Address:</strong>{' '}
              {technician.address}
            </p>
          </div>

          <Divider />

          <div>
            <h5 className="font-medium mb-2">
              Skills
            </h5>

            <div className="flex flex-wrap gap-2">
              {technician.skills.map(
                (skill: string) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}