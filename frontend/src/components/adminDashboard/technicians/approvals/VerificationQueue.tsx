"use client";

import { AnimatePresence } from "framer-motion";
import { useState } from "react";

import type { Technician } from "@/constants/admin/technicianData";

import ApprovalModal from "./ApprovalModal";
import DocumentViewerModal from "./DocumentViewerModal";
import RejectionModal from "./RejectionModal";
import VerificationCard from "./VerificationCard";
import VerificationDrawer from "./VerificationDrawer";

interface Props {
  pendingTechnicians: Technician[];
  onApprove: (id: string) => void;
  onReject: (id: string, reason: string, notes: string) => void;
}

const VerificationQueue = ({ pendingTechnicians, onApprove, onReject }: Props) => {
  const [selectedTech, setSelectedTech] = useState<Technician | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const [approvingTech, setApprovingTech] = useState<Technician | null>(null);
  const [rejectingTech, setRejectingTech] = useState<Technician | null>(null);
  const [viewingDoc, setViewingDoc] = useState<{ name: string; techName: string } | null>(null);

  const handleOpenDrawer = (tech: Technician) => {
    setSelectedTech(tech);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedTech(null);
  };

  return (
    <div className="space-y-4">
      {pendingTechnicians.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-slate-400 text-sm font-medium">All applications have been reviewed. No pending approvals!</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="font-semibold text-slate-800 text-sm uppercase tracking-wider">
              Pending Queue ({pendingTechnicians.length})
            </h2>
          </div>
          {pendingTechnicians.map((tech) => (
            <VerificationCard
              key={tech.id}
              technician={tech}
              onApprove={() => setApprovingTech(tech)}
              onReject={() => setRejectingTech(tech)}
              onReview={() => handleOpenDrawer(tech)}
            />
          ))}
        </div>
      )}

      {/* Verification Detail Slide-in Drawer */}
      <VerificationDrawer
        open={isDrawerOpen}
        onClose={handleCloseDrawer}
        technician={selectedTech}
        onApprove={(tech) => {
          handleCloseDrawer();
          setApprovingTech(tech);
        }}
        onReject={(tech) => {
          handleCloseDrawer();
          setRejectingTech(tech);
        }}
        onViewDoc={(docName, techName) => setViewingDoc({ name: docName, techName })}
      />

      <AnimatePresence>
        {/* Document Viewer Modal */}
        {viewingDoc && (
          <DocumentViewerModal
            open={!!viewingDoc}
            onClose={() => setViewingDoc(null)}
            documentName={viewingDoc.name}
            technicianName={viewingDoc.techName}
          />
        )}

        {/* Approval Checklist Modal */}
        {approvingTech && (
          <ApprovalModal
            open={!!approvingTech}
            onClose={() => setApprovingTech(null)}
            technicianName={approvingTech.name}
            onConfirm={() => onApprove(approvingTech.id)}
          />
        )}

        {/* Rejection Cause Modal */}
        {rejectingTech && (
          <RejectionModal
            open={!!rejectingTech}
            onClose={() => setRejectingTech(null)}
            technicianName={rejectingTech.name}
            onConfirm={(reason, notes) => onReject(rejectingTech.id, reason, notes)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default VerificationQueue;