"use client";

import { AnimatePresence } from "framer-motion";
import { ClipboardList,UserCog } from "lucide-react";
import { useState } from "react";

import type { Technician} from "@/constants/admin/technicianData";
import {techniciansData } from "@/constants/admin/technicianData";

import DocumentViewerModal from "./approvals/DocumentViewerModal";
import VerificationDrawer from "./approvals/VerificationDrawer";
import VerificationQueue from "./approvals/VerificationQueue";
import TechnicianFilters from "./list/TechnicianFilters";
import TechniciansTable from "./list/TechniciansTable";

const Technicians = () => {
  const [technicians, setTechnicians] = useState<Technician[]>(techniciansData);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [skillFilter, setSkillFilter] = useState("All Skills");
  const [activeTab, setActiveTab] = useState<"all" | "pending">("all");

  // State for All Technicians detail drawer
  const [selectedTech, setSelectedTech] = useState<Technician | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [viewingDoc, setViewingDoc] = useState<{ name: string; techName: string } | null>(null);

  // Filter handler for All Technicians tab
  const filteredTechnicians = technicians.filter((tech) => {
    // Search query match
    const matchesSearch =
      tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.id.toLowerCase().includes(searchQuery.toLowerCase());

    // Status filter match
    const matchesStatus =
      statusFilter === "All Status" || tech.status === statusFilter;

    // Skill filter match
    const matchesSkill =
      skillFilter === "All Skills" || tech.skills.includes(skillFilter);

    return matchesSearch && matchesStatus && matchesSkill;
  });

  // Pending technicians for the approvals queue
  const pendingTechnicians = technicians.filter(
    (tech) =>
      tech.status === "Pending" &&
      (tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tech.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const pendingCount = technicians.filter(
    (tech) => tech.status === "Pending"
  ).length;

  const handleApprove = (id: string) => {
    setTechnicians((prev) =>
      prev.map((tech) =>
        tech.id === id ? { ...tech, status: "Active" } : tech
      )
    );
  };

  const handleReject = (id: string, reason: string, notes: string) => {
    setTechnicians((prev) =>
      prev.map((tech) =>
        tech.id === id
          ? {
              ...tech,
              status: "Suspended",
              rejectionReason: reason,
              rejectionNotes: notes,
            }
          : tech
      )
    );
  };

  const handleToggleSuspend = (id: string) => {
    setTechnicians((prev) =>
      prev.map((tech) => {
        if (tech.id === id) {
          const isCurrentlyActive = tech.status === "Active";
          return {
            ...tech,
            status: isCurrentlyActive ? "Suspended" : "Active",
            // Reset rejection details if reactivating
            rejectionReason: isCurrentlyActive ? "Administrative Suspension" : undefined,
            rejectionNotes: isCurrentlyActive ? "Suspended by Administrator" : undefined,
          };
        }
        return tech;
      })
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Technicians
          </h1>
          <p className="text-slate-500">
            Verify profiles, view documents, and manage approval status
          </p>
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => {
            setActiveTab("all");
            setSearchQuery("");
          }}
          className={`flex items-center gap-2 px-6 py-3 border-b-2 font-medium text-sm transition-all duration-200 cursor-pointer ${
            activeTab === "all"
              ? "border-emerald-600 text-emerald-600 bg-emerald-50/30"
              : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"
          }`}
        >
          <UserCog size={16} />
          All Technicians
          <span className="ml-1 rounded-full bg-emerald-600 px-2 py-0.5 text-xs text-white">
            {technicians.length}
          </span>
        </button>

        <button
          onClick={() => {
            setActiveTab("pending");
            setSearchQuery("");
          }}
          className={`flex items-center gap-2 px-6 py-3 border-b-2 font-medium text-sm transition-all duration-200 relative cursor-pointer ${
            activeTab === "pending"
              ? "border-emerald-600 text-emerald-600 bg-emerald-50/30"
              : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"
          }`}
        >
          <ClipboardList size={16} />
          Pending Approvals
          {pendingCount > 0 && (
            <span className="ml-1 rounded-full bg-amber-500 px-2.5 py-0.5 text-xs text-white animate-pulse">
              {pendingCount}
            </span>
          )}
        </button>
      </div>

      {activeTab === "all" ? (
        <div className="space-y-6">
          <TechnicianFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            skillFilter={skillFilter}
            setSkillFilter={setSkillFilter}
          />
          <TechniciansTable
            technicians={filteredTechnicians}
            onToggleSuspend={handleToggleSuspend}
            onViewDetails={(tech) => {
              setSelectedTech(tech);
              setIsDrawerOpen(true);
            }}
          />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Search bar on approvals queue for quick searching */}
          <div className="rounded-2xl bg-white p-4 border border-slate-200">
            <input
              placeholder="Search pending applications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 w-full rounded-xl border border-slate-300 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all text-sm"
            />
          </div>
          <VerificationQueue
            pendingTechnicians={pendingTechnicians}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        </div>
      )}

      {/* Drawer and Document Viewer for All Technicians Tab */}
      <VerificationDrawer
        open={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedTech(null);
        }}
        technician={selectedTech}
        onApprove={(tech) => {
          handleApprove(tech.id);
          setIsDrawerOpen(false);
        }}
        onReject={(tech) => {
          handleReject(tech.id, "Administrative Suspension", "Suspended from Profile Review Drawer.");
          setIsDrawerOpen(false);
        }}
        onViewDoc={(docName, techName) => setViewingDoc({ name: docName, techName })}
      />

      <AnimatePresence>
        {viewingDoc && (
          <DocumentViewerModal
            open={!!viewingDoc}
            onClose={() => setViewingDoc(null)}
            documentName={viewingDoc.name}
            technicianName={viewingDoc.techName}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Technicians;
