"use client";
/* eslint-disable simple-import-sort/imports */
import { useEffect, useState, useCallback } from "react";

import { AnimatePresence } from "framer-motion";
import { ClipboardList, UserCog } from "lucide-react";

import { userServiceApi } from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";
import { getAllServicesService } from "@/services/service.service";
import type { Technician, VerificationDocument } from "@/constants/admin/technicianData";

import DocumentViewerModal from "./approvals/DocumentViewerModal";
import VerificationDrawer from "./approvals/VerificationDrawer";
import VerificationQueue from "./approvals/VerificationQueue";
import TechniciansTable from "./list/TechniciansTable";

type TechnicianStatus = "APPROVED" | "PENDING_APPROVAL" | "REJECTED";

type RawTechnicianProfile = {
  id: number | string | null;
  userId?: number | string | null;
  yearsOfExperience?: number | null;
  status?: TechnicianStatus | string | null;
  rejectionReason?: string | null;
  aadharUrl?: string | null;
  panUrl?: string | null;
  policeCertUrl?: string | null;
  tradeLicenseUrl?: string | null;
  selfieUrl?: string | null;
  services?: Array<{ serviceId?: number | null }>;
  locations?: Array<{
    city?: string | null;
    isActive?: boolean | null;
    isDefault?: boolean | null;
  }>;
};

type RawUser = {
  id: number | string;
  email?: string | null;
  username?: string | null;
  phone?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  profileImage?: string | null;
  createdAt?: string | null;
  overallRating?: number | string | null;
  technicianProfileId?: number | string | null;
  technicianProfile: RawTechnicianProfile | null;
};

type RawUsersResponsePayload = RawUser[] | { data?: RawUser[] | { data?: RawUser[] } };

// Pre-fetched data keyed by status (plus "All Status" for the unfiltered list)
export type PrefetchedData = {
  "All Status": Technician[];
  APPROVED: Technician[];
  PENDING_APPROVAL: Technician[];
  REJECTED: Technician[];
};

const EMPTY_PREFETCH: PrefetchedData = {
  "All Status": [],
  APPROVED: [],
  PENDING_APPROVAL: [],
  REJECTED: [],
};

const Technicians = () => {
  const [prefetchedData, setPrefetchedData] = useState<PrefetchedData>(EMPTY_PREFETCH);

  const [pendingTechnicians, setPendingTechnicians] = useState<Technician[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All Status" | TechnicianStatus>("All Status");
  const [activeTab, setActiveTab] = useState<"all" | "pending">("all");

  // State for All Technicians detail drawer
  const [selectedTech, setSelectedTech] = useState<Technician | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [viewingDoc, setViewingDoc] = useState<{ name: string; techName: string; url?: string } | null>(null);

  const fetchTechnicians = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setActionError(null);
    try {
      // Build service map first
      const serviceMap: Record<number, string> = {};
      try {
        const services = await getAllServicesService();
        services.forEach((s) => {
          serviceMap[s.id] = s.name;
        });
      } catch (err) {
        console.error("Failed to fetch services", err);
      }


      // ── Fire all 4 requests in parallel ──────────────────────────────────
      const [allRes, approvedRes, pendingRes, rejectedRes] = await Promise.all([
        userServiceApi.get("/users/all?role=TECHNICIAN"),
        userServiceApi.get("/users/all?role=TECHNICIAN&technicianProfileStatus=APPROVED"),
        userServiceApi.get("/users/all?role=TECHNICIAN&technicianProfileStatus=PENDING_APPROVAL"),
        userServiceApi.get("/users/all?role=TECHNICIAN&technicianProfileStatus=REJECTED"),
      ]);

      const extract = (res: { data?: RawUsersResponsePayload }): RawUser[] => {
        const root = res.data;
        if (Array.isArray(root)) return root;

        const nested = root?.data;
        if (Array.isArray(nested)) return nested;
        if (!Array.isArray(nested) && Array.isArray(nested?.data)) return nested.data;

        return [];
      };

      const mapUserToTechnician = (u: RawUser): Technician => {
        const profile = u.technicianProfile;

        // Users with no technicianProfile cannot be approved/rejected
        if (!profile) {
          return {
            id:          `${u.id}`,
            profileId:   null,
            profileUserId: null,
            name:        `${u.firstName || ""} ${u.lastName || ""}`.trim() || u.username || "Unknown",
            avatar:      u.profileImage || "",
            experience:  0,
            city:        "—",
            skills:      [],
            rating:      0,
            completedJobs: 0,
            status:      "NO_PROFILE",
            email:       u.email || "",
            phone:       u.phone || "",
            appliedAt:   u.createdAt ? u.createdAt.split("T")[0] : "",
            documents:   [],
            rejectionReason: undefined,
          };
        }

        const profileId = profile.id === null ? null : `${profile.id}`;
        const profileUserId = profile.userId == null ? null : `${profile.userId}`;

        const docStatus =
          profile.status === "APPROVED" ? "APPROVED"
          : profile.status === "REJECTED" ? "REJECTED"
          : "PENDING_APPROVAL";

        const docs: VerificationDocument[] = [];
        if (profile.aadharUrl)
          docs.push({ name: "Aadhaar Card", type: "Identity Proof", status: docStatus, url: profile.aadharUrl });
        if (profile.panUrl)
          docs.push({ name: "PAN Card", type: "Tax ID", status: docStatus, url: profile.panUrl });
        if (profile.policeCertUrl)
          docs.push({ name: "Police Clearance Certificate", type: "Certification", status: docStatus, url: profile.policeCertUrl });
        if (profile.tradeLicenseUrl)
          docs.push({ name: "Trade License", type: "Certification", status: docStatus, url: profile.tradeLicenseUrl });
        if (profile.selfieUrl)
          docs.push({ name: "Selfie", type: "Verification Photo", status: docStatus, url: profile.selfieUrl });

        let status: TechnicianStatus = "PENDING_APPROVAL";
        if (profile.status === "APPROVED") status = "APPROVED";
        else if (profile.status === "REJECTED") status = "REJECTED";

        const skills =
          profile.services
            ?.map((s) => (s.serviceId == null ? undefined : serviceMap[s.serviceId]))
            .filter((skill): skill is string => Boolean(skill)) || [];
        const rating =
          typeof u.overallRating === "number"
            ? u.overallRating
            : u.overallRating
              ? parseFloat(u.overallRating)
              : 0;

        return {
          id:          `${u.id}`,
          profileId,
          profileUserId,
          name:        `${u.firstName || ""} ${u.lastName || ""}`.trim() || u.username || "Unknown",
          avatar:      u.profileImage || "",
          experience:  profile.yearsOfExperience || 0,
          city:
            profile.locations?.find((loc) => loc.isActive || loc.isDefault)?.city ||
            profile.locations?.[0]?.city ||
            "—",
          skills,
          rating,
          completedJobs: 0,
          status,
          email:       u.email || "",
          phone:       u.phone || "",
          appliedAt:   u.createdAt ? u.createdAt.split("T")[0] : "",
          documents:   docs,
          rejectionReason: profile.rejectionReason || undefined,
        };
      };


      // ── Populate the pre-fetched map ──────────────────────────────────────
      const mapped: PrefetchedData = {
        "All Status": extract(allRes).map(mapUserToTechnician),
        APPROVED: extract(approvedRes).map(mapUserToTechnician),
        PENDING_APPROVAL: extract(pendingRes).map(mapUserToTechnician),
        REJECTED: extract(rejectedRes).map(mapUserToTechnician),
      };

      setPrefetchedData(mapped);
      setPendingTechnicians(mapped.PENDING_APPROVAL);
    } catch (err) {
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

  // ── Instant lookup — no extra filtering needed ────────────────────────────
  const filteredTechnicians = prefetchedData[statusFilter];

  // Pending technicians for the approvals queue filtered by search
  const pendingTechniciansFiltered = pendingTechnicians.filter(
    (tech) =>
      tech.status === "PENDING_APPROVAL" &&
      (tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tech.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const pendingCount = pendingTechnicians.length;

  const [actionLoading, setActionLoading] = useState<Record<string, boolean>>({});

  const setLoading = (id: string, val: boolean) =>
    setActionLoading((prev) => ({ ...prev, [id]: val }));

  const findTechnician = (id: string) =>
    pendingTechnicians.find((t) => t.id === id) ??
    prefetchedData["All Status"].find((t) => t.id === id);

  const getProfileUserIdForAction = (id: string, action: string) => {
    const technician = findTechnician(id);

    if (!technician) {
      setActionError(`Unable to ${action}. Technician record was not found.`);
      return null;
    }

    if (!technician.profileUserId) {
      setActionError(`Unable to ${action} ${technician.name}. Technician profile userId is not available yet.`);
      console.warn("Technician status action skipped because technicianProfile.userId is missing", {
        action,
        technicianUserId: technician.id,
        technicianProfileId: technician.profileId,
      });
      return null;
    }

    setActionError(null);
    return technician.profileUserId;
  };

  const handleApprove = async (id: string) => {
    const profileUserId = getProfileUserIdForAction(id, "approve");
    if (!profileUserId) return;

    setLoading(id, true);
    try {
      await userServiceApi.patch(`${ENDPOINTS.UPDATE_TECHNICIAN_STATUS}/${profileUserId}`, { status: 'APPROVED' });
      setActionError(null);
      // Move from PENDING → APPROVED in all relevant buckets
      const approvedEntry = pendingTechnicians.find((t) => t.id === id) ??
        prefetchedData["All Status"].find((t) => t.id === id);
      setPrefetchedData((prev) => ({
        "All Status": prev["All Status"].map((t) =>
          t.id === id ? { ...t, status: "APPROVED" as TechnicianStatus } : t
        ),
        APPROVED: approvedEntry
          ? [...prev.APPROVED, { ...approvedEntry, status: "APPROVED" as TechnicianStatus }]
          : prev.APPROVED,
        PENDING_APPROVAL: prev.PENDING_APPROVAL.filter((t) => t.id !== id),
        REJECTED: prev.REJECTED,
      }));
      setPendingTechnicians((prev) => prev.filter((tech) => tech.id !== id));
    } catch (err) {
      console.error('Failed to approve technician', err);
      setActionError("Failed to approve technician. Please try again.");
    } finally {
      setLoading(id, false);
    }
  };

  const handleReject = async (id: string, reason: string, notes: string) => {
    const profileUserId = getProfileUserIdForAction(id, "reject");
    if (!profileUserId) return;

    setLoading(id, true);
    try {
      await userServiceApi.patch(`${ENDPOINTS.UPDATE_TECHNICIAN_STATUS}/${profileUserId}`, { status: 'REJECTED' });
      setActionError(null);
      const rejectedEntry = pendingTechnicians.find((t) => t.id === id) ??
        prefetchedData["All Status"].find((t) => t.id === id);
      setPrefetchedData((prev) => ({
        "All Status": prev["All Status"].map((t) =>
          t.id === id ? { ...t, status: "REJECTED" as TechnicianStatus, rejectionReason: reason, rejectionNotes: notes } : t
        ),
        APPROVED: prev.APPROVED.filter((t) => t.id !== id),
        PENDING_APPROVAL: prev.PENDING_APPROVAL.filter((t) => t.id !== id),
        REJECTED: rejectedEntry
          ? [...prev.REJECTED, { ...rejectedEntry, status: "REJECTED" as TechnicianStatus, rejectionReason: reason, rejectionNotes: notes }]
          : prev.REJECTED,
      }));
      setPendingTechnicians((prev) => prev.filter((tech) => tech.id !== id));
    } catch (err) {
      console.error('Failed to reject technician', err);
      setActionError("Failed to reject technician. Please try again.");
    } finally {
      setLoading(id, false);
    }
  };

  const handleToggleSuspend = async (id: string) => {
    const target = prefetchedData["All Status"].find((t) => t.id === id);
    if (!target) {
      setActionError("Unable to update technician status. Technician record was not found.");
      return;
    }
    const isCurrentlyActive = target.status === "APPROVED";
    const newStatus: TechnicianStatus = isCurrentlyActive ? "REJECTED" : "PENDING_APPROVAL";
    const profileUserId = getProfileUserIdForAction(id, isCurrentlyActive ? "reject" : "reactivate");
    if (!profileUserId) return;

    setLoading(id, true);
    try {
      await userServiceApi.patch(`${ENDPOINTS.UPDATE_TECHNICIAN_STATUS}/${profileUserId}`, { status: newStatus });
      setActionError(null);
      const updatedTarget = {
        ...target,
        status: newStatus,
        rejectionReason: isCurrentlyActive ? "Administrative Rejection" : undefined,
        rejectionNotes: isCurrentlyActive ? "Rejected by Administrator" : undefined,
      };
      setPrefetchedData((prev) => ({
        "All Status": prev["All Status"].map((t) => (t.id === id ? updatedTarget : t)),
        APPROVED: isCurrentlyActive
          ? prev.APPROVED.filter((t) => t.id !== id)
          : prev.APPROVED,
        PENDING_APPROVAL: isCurrentlyActive
          ? prev.PENDING_APPROVAL
          : [...prev.PENDING_APPROVAL, updatedTarget],
        REJECTED: isCurrentlyActive
          ? [...prev.REJECTED, updatedTarget]
          : prev.REJECTED.filter((t) => t.id !== id),
      }));
      if (!isCurrentlyActive) {
        setPendingTechnicians((prev) => [...prev, updatedTarget]);
      }
    } catch (err) {
      console.error('Failed to toggle technician status', err);
      setActionError("Failed to update technician status. Please try again.");
    } finally {
      setLoading(id, false);
    }
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
              {prefetchedData["All Status"].length}
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

      {!isLoading && !error && actionError && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
          {actionError}
        </div>
      )}

      {!isLoading && !error && (
        <>
          {activeTab === "all" ? (
            <div className="space-y-6">
              <TechniciansTable
                technicians={filteredTechnicians}
                allTechnicians={prefetchedData["All Status"]}
                approvedCount={prefetchedData.APPROVED.length}
                pendingCount={prefetchedData.PENDING_APPROVAL.length}
                rejectedCount={prefetchedData.REJECTED.length}
                statusFilter={statusFilter}
                setStatusFilter={(val) => setStatusFilter(val as "All Status" | TechnicianStatus)}
                actionLoading={actionLoading}
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
                actionLoading={actionLoading}
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
          handleReject(tech.id, "Administrative Rejection", "Rejected from Profile Review Drawer.");
          setIsDrawerOpen(false);
        }}
        onViewDoc={(docName, techName, docUrl) => setViewingDoc({ name: docName, techName, url: docUrl })}
      />

      <AnimatePresence>
        {viewingDoc && (
          <DocumentViewerModal
            open={!!viewingDoc}
            onClose={() => setViewingDoc(null)}
            documentName={viewingDoc.name}
            technicianName={viewingDoc.techName}
            documentUrl={viewingDoc.url}
          />
        )}
      </AnimatePresence>

    </div>
  );
};

export default Technicians;
