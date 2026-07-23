"use client";
import { AnimatePresence } from "framer-motion";
import { ClipboardList, UserCog } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { userSecuredApi } from "@/api/config";
import { ServiceControllers } from '@/api/serviceControllers';
import type { Technician, VerificationDocument } from "@/constants/admin/technicianData";

import DocumentViewerModal from "./approvals/DocumentViewerModal";
import VerificationDrawer from "./approvals/VerificationDrawer";
import TechniciansTable from "./list/TechniciansTable";
import { useAppDispatch } from '@/redux/hooks';
import { showSnackbar } from '@/redux/slices/snackbarSlice';

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

const Technicians = () => {
  const dispatch = useAppDispatch();
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All Status" | TechnicianStatus>("All Status");

  // State for All Technicians detail drawer
  const [selectedTech, setSelectedTech] = useState<Technician | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const router = useRouter();
  const [viewingDoc, setViewingDoc] = useState<{ name: string; techName: string; url?: string } | null>(null);

  const fetchTechnicians = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Build service map first
      const serviceMap: Record<number, string> = {};
      try {
        const services = await ServiceControllers.getAllServices();
        services.forEach((s) => {
          serviceMap[s.id] = s.name;
        });
      } catch (err) {
        console.error("Failed to fetch services", err);
      }

      let url = "/users/all?role=TECHNICIAN&page=1&limit=10000";
      if (statusFilter !== "All Status") {
        url += `&technicianProfileStatus=${statusFilter}`;
      }
      
      const res = await userSecuredApi.get(url);

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
            id: `${u.id}`,
            profileId: null,
            profileUserId: null,
            name: `${u.firstName || ""} ${u.lastName || ""}`.trim() || u.username || "Unknown",
            avatar: u.profileImage || "",
            experience: 0,
            city: "—",
            skills: [],
            rating: 0,
            completedJobs: 0,
            status: "NO_PROFILE",
            email: u.email || "",
            phone: u.phone || "",
            appliedAt: u.createdAt ? u.createdAt.split("T")[0] : "",
            documents: [],
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
          id: `${u.id}`,
          profileId,
          profileUserId,
          name: `${u.firstName || ""} ${u.lastName || ""}`.trim() || u.username || "Unknown",
          avatar: u.profileImage || "",
          experience: profile.yearsOfExperience || 0,
          city:
            profile.locations?.find((loc) => loc.isActive || loc.isDefault)?.city ||
            profile.locations?.[0]?.city ||
            "—",
          skills,
          rating,
          completedJobs: 0,
          status,
          email: u.email || "",
          phone: u.phone || "",
          appliedAt: u.createdAt ? u.createdAt.split("T")[0] : "",
          documents: docs,
          rejectionReason: profile.rejectionReason || undefined,
        };
      };

      const mappedTechnicians = extract(res).map(mapUserToTechnician);
      setTechnicians(mappedTechnicians);
    } catch (err) {
      console.error("Error fetching technicians", err);
      const e = err as Error;
      setError(e?.message || "Failed to load technicians");
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchTechnicians();
  }, [fetchTechnicians]);

  // ── Instant lookup — no extra filtering needed ────────────────────────────
  const filteredTechnicians = technicians;

  const [actionLoading, setActionLoading] = useState<Record<string, boolean>>({});

  const setLoading = (id: string, val: boolean) =>
    setActionLoading((prev) => ({ ...prev, [id]: val }));

  const findTechnician = (id: string) => technicians.find((t) => t.id === id);

  const getProfileUserIdForAction = (id: string, action: string) => {
    const technician = findTechnician(id);

    if (!technician) {
      return null;
    }

    if (!technician.profileUserId) {
      return null;
    }


    return technician.profileUserId;
  };

  const handleApprove = async (id: string) => {
    const profileUserId = getProfileUserIdForAction(id, "approve");
    if (!profileUserId) return;

    setLoading(id, true);
    try {
      await userSecuredApi.patch(`/users/admin/technician/status/${profileUserId}`, { status: 'APPROVED' });

      setTechnicians((prev) => prev.map((t) => t.id === id ? { ...t, status: "APPROVED" as TechnicianStatus } : t));
      dispatch(showSnackbar({ message: 'Technician status changed to Approved', severity: 'success' }));
    } catch (err) {
      console.error('Failed to approve technician', err);

    } finally {
      setLoading(id, false);
    }
  };

  const handleReject = async (id: string, reason: string, notes: string) => {
    const profileUserId = getProfileUserIdForAction(id, "reject");
    if (!profileUserId) return;

    setLoading(id, true);
    try {
      await userSecuredApi.patch(`/users/admin/technician/status/${profileUserId}`, { status: 'REJECTED' });

      setTechnicians((prev) => prev.map((t) => t.id === id ? { ...t, status: "REJECTED" as TechnicianStatus, rejectionReason: reason, rejectionNotes: notes } : t));
      dispatch(showSnackbar({ message: 'Technician status changed to Rejected', severity: 'success' }));
    } catch (err) {
      console.error('Failed to reject technician', err);

    } finally {
      setLoading(id, false);
    }
  };

  const handleChangeStatus = async (id: string, newStatus: TechnicianStatus) => {
    if (newStatus === "APPROVED") {
      await handleApprove(id);
    } else if (newStatus === "REJECTED") {
      await handleReject(id, "Administrative Rejection", "Status changed from table dropdown.");
    } else if (newStatus === "PENDING_APPROVAL") {
      // Toggle back to pending
      const target = technicians.find((t) => t.id === id);
      if (!target) return;
      const profileUserId = getProfileUserIdForAction(id, "reactivate");
      if (!profileUserId) return;

      setLoading(id, true);
      try {
        await userSecuredApi.patch(`/users/admin/technician/status/${profileUserId}`, { status: newStatus });

        const updatedTarget = {
          ...target,
          status: newStatus,
          rejectionReason: undefined,
          rejectionNotes: undefined,
        };
        setTechnicians((prev) => prev.map((t) => t.id === id ? updatedTarget : t));
        dispatch(showSnackbar({ message: 'Technician status changed to Pending', severity: 'success' }));
      } catch (err) {
        console.error('Failed to change technician status', err);

      } finally {
        setLoading(id, false);
      }
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
        <div>
          <Link href="/admin/technicians/add">
            <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors">
              <UserCog size={18} />
              Add Technician
            </button>
          </Link>
        </div>
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
          <div className="space-y-6">
            <TechniciansTable
              technicians={filteredTechnicians}
              statusFilter={statusFilter}
              setStatusFilter={(val) => setStatusFilter(val as "All Status" | TechnicianStatus)}
              actionLoading={actionLoading}
              onChangeStatus={handleChangeStatus}
              onViewDetails={(tech) => {
                router.push(`/admin/technicians/${tech.id}`);
              }}
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
