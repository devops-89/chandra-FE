"use client";
/* eslint-disable simple-import-sort/imports */
import { useEffect, useState, useCallback } from "react";

import { AnimatePresence } from "framer-motion";
import { ClipboardList, UserCog } from "lucide-react";

import { userServiceApi } from "@/api/axios";
import { getAllServicesService } from "@/services/service.service";
import type { Technician, VerificationDocument } from "@/constants/admin/technicianData";

import DocumentViewerModal from "./approvals/DocumentViewerModal";
import VerificationDrawer from "./approvals/VerificationDrawer";
import VerificationQueue from "./approvals/VerificationQueue";
import TechniciansTable from "./list/TechniciansTable";

const Technicians = () => {
  type RawUser = {
    id?: number | string;
    technicianProfile?: {
      status?: string;
      aadharUrl?: string;
      panUrl?: string;
      policeCertUrl?: string;
      tradeLicenseUrl?: string;
      selfieUrl?: string;
      yearsOfExperience?: number;
      locations?: { isActive?: boolean; isDefault?: boolean; city?: string }[];
      services?: { serviceId?: number }[];
      rejectionReason?: string;
    };
    firstName?: string;
    lastName?: string;
    username?: string;
    profileImage?: string;
    overallRating?: string | number;
    status?: string;
    email?: string;
    phone?: string;
    createdAt?: string;
  };
  const [allTechnicians, setAllTechnicians] = useState<Technician[]>([]);
  const [pendingTechnicians, setPendingTechnicians] = useState<Technician[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [skillFilter, _setSkillFilter] = useState("All Skills");
  const [activeTab, setActiveTab] = useState<"all" | "pending">("all");

  // State for All Technicians detail drawer
  const [selectedTech, setSelectedTech] = useState<Technician | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [viewingDoc, setViewingDoc] = useState<{ name: string; techName: string } | null>(null);

  const fetchTechnicians = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const serviceMap: Record<number, string> = {};
      try {
        const services = await getAllServicesService();
        services.forEach((s) => {
          serviceMap[s.id] = s.name;
        });
      } catch (err) {
        console.error("Failed to fetch services", err);
      }

      const allRes = await userServiceApi.get("/users/all?role=TECHNICIAN");
      const allUsers = allRes.data?.data?.data || allRes.data?.data || [];

      const pendingRes = await userServiceApi.get("/users/all?role=TECHNICIAN&technicianProfileStatus=PENDING_APPROVAL");
      const pendingUsers = pendingRes.data?.data?.data || pendingRes.data?.data || [];

      const mapUserToTechnician = (u: RawUser): Technician => {
        const profile = u.technicianProfile;
        const docStatus = profile?.status === "APPROVED" ? "Approved" : profile?.status === "REJECTED" ? "Rejected" : "Pending";

        const docs: VerificationDocument[] = [];
        if (profile) {
          if (profile.aadharUrl) {
            docs.push({
              name: "Aadhaar Card",
              type: "Identity Proof",
              status: docStatus,
              url: profile.aadharUrl,
            });
          }
          if (profile.panUrl) {
            docs.push({
              name: "PAN Card",
              type: "Tax ID",
              status: docStatus,
              url: profile.panUrl,
            });
          }
          if (profile.policeCertUrl) {
            docs.push({
              name: "Police Clearance Certificate",
              type: "Certification",
              status: docStatus,
              url: profile.policeCertUrl,
            });
          }
          if (profile.tradeLicenseUrl) {
            docs.push({
              name: "Trade License",
              type: "Certification",
              status: docStatus,
              url: profile.tradeLicenseUrl,
            });
          }
          if (profile.selfieUrl) {
            docs.push({
              name: "Selfie",
              type: "Verification Photo",
              status: docStatus,
              url: profile.selfieUrl,
            });
          }
        }

        let status: "Active" | "Pending" | "Suspended" = "Pending";
        if (profile?.status === "APPROVED") {
          status = "Active";
        } else if (profile?.status === "REJECTED") {
          status = "Suspended";
        }
        if (u.status === "SUSPENDED") {
          status = "Suspended";
        }

        return {
          id: `${u.id ?? ""}`,
          name: `${u.firstName || ""} ${u.lastName || ""}`.trim() || u.username || "Unknown",
          avatar: u.profileImage || "",
          experience: profile?.yearsOfExperience || 0,
          city:
            profile?.locations?.find((loc) => loc?.isActive || loc?.isDefault)?.city ||
            profile?.locations?.[0]?.city ||
            "Noida",
          skills: profile?.services?.map((s) => serviceMap[s.serviceId as number]).filter(Boolean) || [],
          rating: u.overallRating ? Number(u.overallRating) : 0,
          completedJobs: 0,
          status,
          email: u.email || "",
          phone: u.phone || "",
          appliedAt: u.createdAt ? u.createdAt.split("T")[0] : "",
          documents: docs,
          rejectionReason: profile?.rejectionReason || undefined,
        };
      };

      setAllTechnicians(allUsers.map(mapUserToTechnician));
      setPendingTechnicians(pendingUsers.map(mapUserToTechnician));
    } catch (err: unknown) {
      console.error("Error fetching technicians", err);
      const e = err as Error;
      setError(e?.message || "Failed to load technicians");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    (async () => {
      await fetchTechnicians();
    })();
  }, [fetchTechnicians]);

  // Filter handler for All Technicians tab
  const filteredTechnicians = allTechnicians.filter((tech) => {
    // Status filter match
    const matchesStatus =
      statusFilter === "All Status" || tech.status === statusFilter;

    // Skill filter match
    const matchesSkill =
      skillFilter === "All Skills" || tech.skills.includes(skillFilter);

    return matchesStatus && matchesSkill;
  });

  // Pending technicians for the approvals queue filtered by search
  const pendingTechniciansFiltered = pendingTechnicians.filter(
    (tech) =>
      tech.status === "Pending" &&
      (tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tech.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const pendingCount = pendingTechnicians.length;

  const handleApprove = (id: string) => {
    setAllTechnicians((prev) =>
      prev.map((tech) =>
        tech.id === id ? { ...tech, status: "Active" } : tech
      )
    );
    setPendingTechnicians((prev) =>
      prev.filter((tech) => tech.id !== id)
    );
  };

  const handleReject = (id: string, reason: string, notes: string) => {
    setAllTechnicians((prev) =>
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
    setPendingTechnicians((prev) =>
      prev.filter((tech) => tech.id !== id)
    );
  };

  const handleToggleSuspend = (id: string) => {
    setAllTechnicians((prev) =>
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
          className={`flex items-center gap-2 px-6 py-3 border-b-2 font-medium text-sm transition-all duration-200 cursor-pointer ${activeTab === "all"
              ? "border-emerald-600 text-emerald-600 bg-emerald-50/30"
              : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"
            }`}
        >
          <UserCog size={16} />
          All Technicians
          {!isLoading && (
            <span className="ml-1 rounded-full bg-emerald-600 px-2 py-0.5 text-xs text-white">
              {allTechnicians.length}
            </span>
          )}
        </button>

        <button
          onClick={() => {
            setActiveTab("pending");
            setSearchQuery("");
          }}
          className={`flex items-center gap-2 px-6 py-3 border-b-2 font-medium text-sm transition-all duration-200 relative cursor-pointer ${activeTab === "pending"
              ? "border-emerald-600 text-emerald-600 bg-emerald-50/30"
              : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"
            }`}
        >
          <ClipboardList size={16} />
          Pending Approvals
          {!isLoading && pendingCount > 0 && (
            <span className="ml-1 rounded-full bg-amber-500 px-2.5 py-0.5 text-xs text-white animate-pulse">
              {pendingCount}
            </span>
          )}
        </button>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600" />
          <span className="ml-3 text-sm text-slate-500">Loading technicians…</span>
        </div>
      )}

      {/* Error state */}
      {!isLoading && error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-5">
          <p className="text-sm font-medium text-red-700">{error}</p>
          <button
            type="button"
            onClick={fetchTechnicians}
            className="mt-3 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      {!isLoading && !error && (
        <>
          {activeTab === "all" ? (
            <div className="space-y-6">
              <TechniciansTable
                technicians={filteredTechnicians}
                allTechnicians={allTechnicians}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
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
                pendingTechnicians={pendingTechniciansFiltered}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            </div>
          )}
        </>
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
