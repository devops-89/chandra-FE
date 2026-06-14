'use client';

import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import {motion} from 'framer-motion';
import { useState } from 'react';

import type { TechnicianApproval } from '@/types/admin.types';

import StatusBadge from '../shared/StatusBadge';
import ApprovalActions from './ApprovalActions';
import TechnicianDetailsModal from './TechnicianDetailsModal';

interface Props {
  technician: TechnicianApproval;
}

export default function TechnicianApprovalCard({
  technician,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="rounded-2xl bg-white hover:shadow-lg p-5 cursor-default"
    >
      <Card
        elevation={0}
        className="
          p-5
          rounded-2xl
        "
      >
        <div className="flex flex-col md:flex-row gap-5">
          <Avatar
            sx={{
              width: 72,
              height: 72,
              bgcolor: '#10b981',
              position: "static"
            }}
          >
            {technician.name
              .split(' ')
              .map(
                (word: string) =>
                  word[0]
              )
              .join('')}
          </Avatar>

          <div className="flex-1">
            <div className="flex justify-between">
              <div>
                <h4 className="font-semibold text-lg">
                  {technician.name}
                </h4>

                <p className="text-sm text-slate-500">
                  {technician.experience}{' '}
                  Years Experience
                </p>
              </div>

              <StatusBadge
                label={
                  technician.verified
                    ? 'DOCS VERIFIED'
                    : 'PENDING'
                }
                type={
                  technician.verified
                    ? 'success'
                    : 'warning'
                }
              />
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {technician.skills.map(
                (skill: string) => (
                  <span
                    key={skill}
                    className="
                      px-3
                      py-1
                      rounded-2xl
                      bg-emerald-100
                      text-emerald-700
                      text-xs
                      font-medium
                    "
                  >
                    {skill}
                  </span>
                )
              )}
            </div>

            <ApprovalActions
                onApprove={() =>
                console.log('approved')
                }
                onReject={() =>
                console.log('rejected')
                }
                onView={() =>
                setOpen(true)
                }
            />
          </div>
        </div>
      </Card>
      </motion.div>
      <TechnicianDetailsModal
        open={open}
        onClose={() => setOpen(false)}
        technician={technician}
      />
    </>
  );
}