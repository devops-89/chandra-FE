'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { AdminControllers } from '@/api/adminControllers';
import { 
  ArrowBack as ArrowBackIcon, 
  Info as InfoIcon,
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Build as BuildIcon,
  Payments as PaymentsIcon,
  Description as DescriptionIcon
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Grid,
  Paper,
  Typography,
  Rating
} from '@mui/material';

import { BOOKING_STATUS } from '@/types/enums';

interface Props {
  bookingId: string;
}

const getStatusColor = (status: string) => {
  const s = status?.toUpperCase();
  if (s === BOOKING_STATUS.PENDING) return { bgcolor: "#fef3c7", color: "#b45309", border: "1px solid rgba(180, 83, 9, 0.2)" }; // Amber
  if (s === BOOKING_STATUS.ACCEPTED || s === BOOKING_STATUS.ENROUTE || s === BOOKING_STATUS.ARRIVED) return { bgcolor: "#e0f2fe", color: "#0369a1", border: "1px solid rgba(3, 105, 161, 0.2)" }; // Sky Blue
  if (s === BOOKING_STATUS.ONGOING) return { bgcolor: "#f3e8ff", color: "#6b21a8", border: "1px solid rgba(107, 33, 168, 0.2)" }; // Purple
  if (s === BOOKING_STATUS.COMPLETED) return { bgcolor: "#d1fae5", color: "#047857", border: "1px solid rgba(4, 120, 87, 0.2)" }; // Emerald
  if (s === BOOKING_STATUS.CANCELLED) return { bgcolor: "#fee2e2", color: "#b91c1c", border: "1px solid rgba(185, 28, 28, 0.2)" }; // Red
  return { bgcolor: "#f1f5f9", color: "#475569", border: "1px solid rgba(71, 85, 105, 0.2)" };
};

const BookingDetailsPageWrapper = ({ bookingId }: Props) => {
  const router = useRouter();
  
  const [booking, setBooking] = useState<any>(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    if (!bookingId) return;
    AdminControllers.getAdminBookingById(bookingId)
      .then(setBooking)
      .catch((err) => console.error(err))
      .finally(() => setIsPending(false));
  }, [bookingId]);

  if (isPending) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
        <CircularProgress sx={{ color: '#059669' }} />
      </Box>
    );
  }

  if (!booking) {
    return (
      <Paper sx={{ p: 6, m: 4, textAlign: 'center', borderRadius: 4, boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
        <Typography color="error" variant="h6" sx={{ fontWeight: 600 }}>Failed to load booking details.</Typography>
      </Paper>
    );
  }

  const customerName = ((booking.customer?.firstName || '') + ' ' + (booking.customer?.lastName || '')).trim() || booking.customer?.username || 'Unknown Customer';
  const technicianName = booking.technician ? ((booking.technician?.firstName || '') + ' ' + (booking.technician?.lastName || '')).trim() || booking.technician?.username : 'Unassigned';

  const InfoItem = ({ label, value, icon }: { label: string, value: React.ReactNode, icon?: React.ReactNode }) => (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', p: 2, borderRadius: 3, border: '1px solid #f8fafc', bgcolor: '#fafafa', transition: 'all 0.2s ease', '&:hover': { bgcolor: '#f1f5f9', borderColor: '#e2e8f0', transform: 'translateY(-1px)' } }}>
      <Box sx={{ p: 1.5, borderRadius: '10px', bgcolor: '#ffffff', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 2, boxShadow: '0 2px 4px rgba(0,0,0,0.02)', border: '1px solid #f1f5f9' }}>
        {icon || <InfoIcon sx={{ fontSize: 20 }} />}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 700, mb: 0.25, textTransform: 'uppercase', letterSpacing: '0.04em', fontSize: '0.7rem' }}>{label}</Typography>
        <Typography variant="body1" sx={{ fontWeight: 600, color: '#0f172a', wordBreak: 'break-word', fontSize: '0.95rem' }}>{value || "—"}</Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, minHeight: '100vh', bgcolor: '#f8fafc' }}>
      <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a' }}>Booking Details</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>View full details of this service request.</Typography>
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

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4 }}>
        {/* Left Card: Summary */}
        <Box sx={{ width: { xs: '100%', lg: '35%' }, flexShrink: 0, position: 'sticky', top: 24 }}>
          <Paper 
            sx={{ 
              borderRadius: 4, 
              overflow: 'hidden', 
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)', 
              border: '1px solid rgba(255,255,255,0.5)',
              bgcolor: '#ffffff',
              mb: 3
            }} 
          >
            <Box sx={{ height: 120, background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', position: 'relative' }}>
              <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.2, background: 'radial-gradient(circle at top right, #ffffff 0%, transparent 60%)' }} />
            </Box>
            
            <Box sx={{ px: 4, pb: 4, pt: 0, textAlign: 'center', position: 'relative' }}>
              <Avatar 
                sx={{ 
                  width: 100, 
                  height: 100, 
                  mx: 'auto', 
                  mt: '-50px', 
                  mb: 2, 
                  bgcolor: '#047857',
                  border: '6px solid #ffffff',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  fontSize: '2.5rem',
                  fontWeight: 700
                }}
              >
                {customerName[0]?.toUpperCase() || "C"}
              </Avatar>
              
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, color: '#0f172a' }}>
                {customerName}
              </Typography>
              
              <Typography variant="body2" sx={{ color: '#64748b', mb: 3, fontWeight: 500, fontSize: '0.85rem' }}>
                {booking.customer?.email || booking.customer?.phone || 'Customer'}
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Chip 
                  label={booking.status || "Pending"}
                  sx={{ 
                    ...getStatusColor(booking.status),
                    fontWeight: 700,
                    borderRadius: '8px',
                    px: 1,
                    textTransform: 'capitalize'
                  }} 
                />
                <Chip 
                  label={`₹${booking.totalAmount || 0}`}
                  sx={{ 
                    bgcolor: '#f1f5f9',
                    color: '#475569',
                    fontWeight: 700,
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0'
                  }} 
                />
              </Box>
            </Box>
          </Paper>

          {/* Cancellation Reason Red Block */}
          {booking.status === 'CANCELLED' && booking.cancellationReason && (
            <Paper
              sx={{
                p: 2.5,
                borderRadius: 4,
                bgcolor: '#fff1f2', // soft rose background
                border: '1px solid #ffe4e6',
                boxShadow: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: 1
              }}
            >
              <Typography variant="caption" sx={{ fontWeight: 800, color: '#e11d48', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: 0.75 }}>
                <InfoIcon sx={{ fontSize: 16 }} /> Cancelled by Customer
              </Typography>
              <Typography variant="body2" sx={{ color: '#881337', fontWeight: 500, lineHeight: 1.6 }}>
                {booking.cancellationReason}
              </Typography>
            </Paper>
          )}
        </Box>

        {/* Right Card: Full Details */}
        <Box sx={{ width: { xs: '100%', lg: '65%' } }}>
          <Paper 
            sx={{ 
              p: { xs: 3, md: 4 }, 
              borderRadius: 4, 
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
              border: '1px solid #f1f5f9',
              bgcolor: '#ffffff'
            }} 
          >
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 4, color: '#0f172a', display: 'flex', alignItems: 'center' }}>
              <Box component="span" sx={{ width: 8, height: 24, bgcolor: '#059669', borderRadius: 4, mr: 2 }} />
              Service & Details
            </Typography>
                     <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <InfoItem icon={<BuildIcon fontSize="small" />} label="Service Requested" value={booking.service?.name} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <InfoItem icon={<CalendarIcon fontSize="small" />} label="Scheduled Date" value={new Date(booking.scheduledAt).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <InfoItem icon={<PersonIcon fontSize="small" />} label="Technician Assigned" value={technicianName} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <InfoItem icon={<PhoneIcon fontSize="small" />} label="Technician Phone" value={booking.technician?.phone || 'N/A'} />
              </Grid>
              
              {booking.address && (
                <Grid size={{ xs: 12 }}>
                  <InfoItem 
                    icon={<LocationIcon fontSize="small" />}
                    label="Service Address" 
                    value={`${booking.address.fullAddress || ''}, ${booking.address.city || ''}, ${booking.address.state || ''} - ${booking.address.pincode || ''}`} 
                  />
                </Grid>
              )}
            </Grid>

            {/* Specifications Section */}
            {booking.serviceSpecifications && booking.serviceSpecifications.length > 0 && (
              <>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, mt: 5, color: '#0f172a', display: 'flex', alignItems: 'center' }}>
                  <Box component="span" sx={{ width: 8, height: 24, bgcolor: '#059669', borderRadius: 4, mr: 2 }} />
                  Service Specifications
                </Typography>
                <Grid container spacing={2}>
                  {booking.serviceSpecifications.map((spec: any, idx: number) => {
                    const specDef = booking.service?.specifications?.find((s: any) => 
                      s.id === spec.specificationId || 
                      (s.type === 'select' && Array.isArray(s.values) && s.values.includes(spec.value))
                    );
                    if (!specDef) return null;

                    const label = specDef.name;
                    return (
                      <Grid size={{ xs: 12, sm: 6 }} key={idx}>
                        <InfoItem icon={<DescriptionIcon fontSize="small" />} label={label} value={spec.value} />
                      </Grid>
                    );
                  })}
                </Grid>
              </>
            )}

            {/* Price Breakdown */}
            {booking.priceBreakdown && (
              <>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, mt: 5, color: '#0f172a', display: 'flex', alignItems: 'center' }}>
                  <Box component="span" sx={{ width: 8, height: 24, bgcolor: '#059669', borderRadius: 4, mr: 2 }} />
                  Price Breakdown
                </Typography>
                <Grid container spacing={2}>
                  {booking.service?.pricingRule?.isServiceBasePriceApplied && (
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <InfoItem icon={<PaymentsIcon fontSize="small" />} label="Base Price" value={`₹${booking.priceBreakdown.serviceBasePrice || 0}`} />
                    </Grid>
                  )}
                  {booking.service?.pricingRule?.isSurgeEnabled && (
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <InfoItem icon={<PaymentsIcon fontSize="small" />} label="Surge Charge" value={`₹${booking.priceBreakdown.surgeCharge || 0}`} />
                    </Grid>
                  )}
                  {booking.service?.pricingRule?.isDistanceKmApplied && (
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <InfoItem icon={<PaymentsIcon fontSize="small" />} label="Distance Charge" value={`₹${booking.priceBreakdown.distanceCharge || 0}`} />
                    </Grid>
                  )}
                  {booking.service?.pricingRule?.isWeekendApplied && (
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <InfoItem icon={<PaymentsIcon fontSize="small" />} label="Weekend Charge" value={`₹${booking.priceBreakdown.weekendCharge || 0}`} />
                    </Grid>
                  )}
                  {booking.service?.pricingRule?.isPeakHourApplied && (
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <InfoItem icon={<PaymentsIcon fontSize="small" />} label="Peak Hour Charge" value={`₹${booking.priceBreakdown.peakHourCharge || 0}`} />
                    </Grid>
                  )}
                  {booking.service?.pricingRule?.isEmergencyApplied && (
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <InfoItem icon={<PaymentsIcon fontSize="small" />} label="Emergency Charge" value={`₹${booking.priceBreakdown.emergencyCharge || 0}`} />
                    </Grid>
                  )}
                  {booking.service?.pricingRule?.isPlatformFeeApplied && (
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <InfoItem icon={<PaymentsIcon fontSize="small" />} label="Platform Fee" value={`₹${booking.priceBreakdown.platformFee || 0}`} />
                    </Grid>
                  )}
                  {booking.service?.pricingRule?.isGstApplied && (
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <InfoItem icon={<PaymentsIcon fontSize="small" />} label="GST" value={`₹${booking.priceBreakdown.gst || 0}`} />
                    </Grid>
                  )}
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <InfoItem icon={<PaymentsIcon fontSize="small" />} label="Total Amount" value={`₹${booking.totalAmount || 0}`} />
                  </Grid>
                </Grid>
              </>
            )}
            {/* Reviews Section */}
            {(booking.customerReview || booking.technicianReview) && (
              <>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, mt: 5, color: '#0f172a', display: 'flex', alignItems: 'center' }}>
                  <Box component="span" sx={{ width: 8, height: 24, bgcolor: '#059669', borderRadius: 4, mr: 2 }} />
                  Reviews
                </Typography>
                <Grid container spacing={3}>
                  {booking.customerReview && (
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Box sx={{ p: 3, borderRadius: 3, border: '1px solid #e2e8f0', bgcolor: '#f8fafc', height: '100%' }}>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: '#475569', mb: 1, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                          Customer Review
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Rating value={booking.customerRating || 0} readOnly size="small" sx={{ color: '#f59e0b' }} />
                          <Typography variant="body2" sx={{ ml: 1, fontWeight: 600, color: '#334155' }}>
                            {booking.customerRating || 0}/5
                          </Typography>
                        </Box>
                        <Typography variant="body1" sx={{ color: '#1e293b', fontStyle: 'italic' }}>
                          "{booking.customerReview}"
                        </Typography>
                      </Box>
                    </Grid>
                  )}
                  {booking.technicianReview && (
                    <Grid size={{ xs: 12, md: 6 }}>
                      <Box sx={{ p: 3, borderRadius: 3, border: '1px solid #e2e8f0', bgcolor: '#f8fafc', height: '100%' }}>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: '#475569', mb: 1, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                          Technician Review
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Rating value={booking.technicianRating || 0} readOnly size="small" sx={{ color: '#f59e0b' }} />
                          <Typography variant="body2" sx={{ ml: 1, fontWeight: 600, color: '#334155' }}>
                            {booking.technicianRating || 0}/5
                          </Typography>
                        </Box>
                        <Typography variant="body1" sx={{ color: '#1e293b', fontStyle: 'italic' }}>
                          "{booking.technicianReview}"
                        </Typography>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </>
            )}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default BookingDetailsPageWrapper;
