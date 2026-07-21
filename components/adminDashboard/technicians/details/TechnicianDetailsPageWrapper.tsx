'use client';

import { ArrowBack as ArrowBackIcon, Cancel as CancelIcon, CheckCircle as CheckIcon, Close as CloseIcon,Info as InfoIcon, InsertDriveFile as DocIcon } from '@mui/icons-material';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Typography} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { userSecuredApi } from '@/api/config';

interface Props {
  technicianId: string;
}

const InfoItem = ({ label, value }: { label: string, value: React.ReactNode }) => (
  <Box sx={{ display: 'flex', alignItems: 'flex-start', p: 2, borderRadius: 3, transition: 'all 0.3s ease', '&:hover': { bgcolor: 'rgba(0,0,0,0.02)', transform: 'translateY(-2px)' } }}>
    <Box sx={{ p: 1.5, borderRadius: '12px', bgcolor: 'rgba(5, 150, 105, 0.1)', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 2 }}>
      <InfoIcon sx={{ fontSize: 22 }} />
    </Box>
    <Box sx={{ flex: 1 }}>
      <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, mb: 0.5 }}>{label}</Typography>
      <Typography variant="body1" component="div" sx={{ fontWeight: 600, color: 'text.primary', wordBreak: 'break-word' }}>{value || "—"}</Typography>
    </Box>
  </Box>
);

const BooleanItem = ({ label, isTrue }: { label: string, isTrue: boolean }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', p: 1.5, borderRadius: 2, bgcolor: isTrue ? '#d1fae5' : '#fee2e2' }}>
    {isTrue ? <CheckIcon sx={{ color: '#047857', mr: 1, fontSize: 20 }} /> : <CancelIcon sx={{ color: '#b91c1c', mr: 1, fontSize: 20 }} />}
    <Typography variant="body2" sx={{ fontWeight: 600, color: isTrue ? '#047857' : '#b91c1c' }}>{label}</Typography>
  </Box>
);

const DocumentLink = ({ label, url, onClick }: { label: string, url: string, onClick: () => void }) => {
  if (!url) return null;
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', p: 2, border: '1px solid #e2e8f0', borderRadius: 2 }}>
      <DocIcon sx={{ color: '#64748b', mr: 2 }} />
      <Box sx={{ flex: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>{label}</Typography>
        <Typography 
          onClick={onClick} 
          sx={{ fontSize: '0.875rem', color: '#0ea5e9', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
        >
          View Document
        </Typography>
      </Box>
    </Box>
  );
};

const TechnicianDetailsPageWrapper = ({ technicianId }: Props) => {
  const router = useRouter();
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [technician, setTechnician] = useState<any>(null);
  const [isPending, setIsPending] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState<{ url: string, label: string } | null>(null);

  useEffect(() => {
    if (!technicianId) return;
    userSecuredApi.get(`/users/${technicianId}`)
      .then((res) => {
        // Handle deeply nested response structure { data: { data: { id: ... } } }
        const responseData = res.data;
        const techData = responseData.data?.data || responseData.data || responseData;
        setTechnician(techData);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsPending(false));
  }, [technicianId]);

  if (isPending) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
        <CircularProgress sx={{ color: '#059669' }} />
      </Box>
    );
  }

  if (!technician) {
    return (
      <Paper sx={{ p: 6, m: 4, textAlign: 'center', borderRadius: 4, boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
        <Typography color="error" variant="h6" sx={{ fontWeight: 600 }}>Failed to load technician details.</Typography>
      </Paper>
    );
  }

  const name = ((technician.firstName || '') + ' ' + (technician.lastName || '')).trim() || technician.username || 'Unknown';
  const profile = technician.technicianProfile || {};
  const status = profile.status || 'NO_PROFILE';


  return (
    <Box sx={{ p: { xs: 2, md: 4 }, minHeight: '100vh', bgcolor: '#f8fafc' }}>
      <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a' }}>Technician Details</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>View full profile of this technician.</Typography>
        </Box>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
          variant="outlined"
          sx={{
            borderRadius: 2,
            borderColor: "#059669",
            color: "#059669",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": {
              borderColor: "#047857",
              bgcolor: "rgba(5, 150, 105, 0.04)",
            },
          }}
        >
          Back
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid size={{xs:12, md:6}}>
          <Paper sx={{ p: 3, borderRadius: 4, mb: 3, border: '1px solid #e2e8f0', boxShadow: 'none' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b', mb: 3 }}>
              Personal Info
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <InfoItem label="Full Name" value={name} />
              <InfoItem label="Email" value={technician.email || 'N/A'} />
              <InfoItem label="Phone" value={technician.phone || 'N/A'} />
              <InfoItem label="Role" value={technician.role} />
              <InfoItem label="Languages" value={profile.languages?.join(', ') || 'N/A'} />
            </Box>
          </Paper>

          <Paper sx={{ p: 3, borderRadius: 4, mb: 3, border: '1px solid #e2e8f0', boxShadow: 'none' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b', mb: 3 }}>
              Expertise & Services
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <InfoItem label="Brand Expertise" value={
                profile.brandExpertise?.length > 0 
                  ? profile.brandExpertise.map((b: { brandName: string }) => b.brandName).join(', ') 
                  : 'None Listed'
              } />
              <InfoItem label="Total Services Assigned" value={profile.services?.length || 0} />
            </Box>
          </Paper>

          <Paper sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0', boxShadow: 'none' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b', mb: 3 }}>
              Locations
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {profile.locations?.length > 0 ? (
                profile.locations.map((loc: { latitude: string | number, longitude: string | number, serviceRadiusKm: string | number }, idx: number) => (
                  <InfoItem 
                    key={idx} 
                    label={`Location ${idx + 1}`} 
                    value={`Lat: ${loc.latitude}, Lng: ${loc.longitude} | Radius: ${loc.serviceRadiusKm}km`} 
                  />
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">No locations set.</Typography>
              )}
            </Box>
          </Paper>
        </Grid>
        
        {/* Right Column */}
        <Grid size={{xs:12, md:6}}>
          <Paper sx={{ p: 3, borderRadius: 4, mb: 3, border: '1px solid #e2e8f0', boxShadow: 'none' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b', mb: 3 }}>
              Professional Profile
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <InfoItem label="Approval Status" value={
                <Chip 
                  label={status} 
                  size="small" 
                  sx={{ 
                    fontWeight: 600, 
                    borderRadius: 1,
                    bgcolor: status === 'APPROVED' ? '#d1fae5' : status === 'PENDING_APPROVAL' ? '#fef3c7' : '#fee2e2',
                    color: status === 'APPROVED' ? '#047857' : status === 'PENDING_APPROVAL' ? '#b45309' : '#b91c1c',
                  }} 
                />
              } />
              <InfoItem label="Job Status" value={
                <Chip 
                  label={profile.jobStatus || 'UNKNOWN'} 
                  size="small" 
                  sx={{ 
                    fontWeight: 600, 
                    borderRadius: 1,
                    bgcolor: profile.jobStatus === 'ONLINE' ? '#e0f2fe' : '#f1f5f9',
                    color: profile.jobStatus === 'ONLINE' ? '#0369a1' : '#475569',
                  }} 
                />
              } />
              <InfoItem label="Experience (Years)" value={profile.yearsOfExperience || 0} />
            </Box>
          </Paper>

          <Paper sx={{ p: 3, borderRadius: 4, mb: 3, border: '1px solid #e2e8f0', boxShadow: 'none' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b', mb: 3 }}>
              Equipment & Assets
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <BooleanItem label="Has Ladder" isTrue={!!profile.hasLadder} />
              <BooleanItem label="Has AC Gauges" isTrue={!!profile.hasACGauges} />
              <BooleanItem label="Has Safety Eq." isTrue={!!profile.hasSafetyEquipment} />
              <BooleanItem label="Has Vehicle" isTrue={!!profile.hasVehicle} />
            </Box>
          </Paper>

          <Paper sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0', boxShadow: 'none' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b', mb: 3 }}>
              Documents
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {profile.selfieUrl && <DocumentLink label="Selfie Photo" url={profile.selfieUrl} onClick={() => setSelectedDoc({ url: profile.selfieUrl, label: "Selfie Photo" })} />}
              {profile.aadharUrl && <DocumentLink label="Aadhar Card" url={profile.aadharUrl} onClick={() => setSelectedDoc({ url: profile.aadharUrl, label: "Aadhar Card" })} />}
              {profile.panUrl && <DocumentLink label="PAN Card" url={profile.panUrl} onClick={() => setSelectedDoc({ url: profile.panUrl, label: "PAN Card" })} />}
              {profile.policeCertUrl && <DocumentLink label="Police Certificate" url={profile.policeCertUrl} onClick={() => setSelectedDoc({ url: profile.policeCertUrl, label: "Police Certificate" })} />}
              {profile.tradeLicenseUrl && <DocumentLink label="Trade License" url={profile.tradeLicenseUrl} onClick={() => setSelectedDoc({ url: profile.tradeLicenseUrl, label: "Trade License" })} />}
              
              {!profile.selfieUrl && !profile.aadharUrl && !profile.panUrl && !profile.policeCertUrl && !profile.tradeLicenseUrl && (
                <Typography variant="body2" color="text.secondary">No documents uploaded.</Typography>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={!!selectedDoc} onClose={() => setSelectedDoc(null)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {selectedDoc?.label}
          <IconButton onClick={() => setSelectedDoc(null)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ display: 'flex', justifyContent: 'center', p: 4, bgcolor: '#f1f5f9' }}>
          {selectedDoc && (
            // eslint-disable-next-line @next/next/no-img-element
            <img 
              src={selectedDoc.url} 
              alt={selectedDoc.label} 
              style={{ maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain', borderRadius: '8px' }} 
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default TechnicianDetailsPageWrapper;
