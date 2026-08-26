"use client";

import { Box, Button, Card, Chip, CircularProgress, Divider, Grid, Paper,Typography } from "@mui/material";
import { ArrowLeft, CalendarDays, CheckCircle,LayoutGrid, Mail, MapPin, Phone, Star, User, Wallet, Wrench } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { AdminControllers } from "@/api/adminControllers";
import PageLoader from "@/components/adminDashboard/shared/PageLoader";

export default function FinanceBookingDetails({ bookingId }: { bookingId: string | number }) {
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const data = await AdminControllers.getAdminBookingById(bookingId);
        setBooking(data);
      } catch (error) {
        console.error("Failed to fetch booking details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [bookingId]);

  const handleInitiatePayout = async () => {
    try {
      setIsPaying(true);
      const payload = {
        amount: booking.priceBreakdown?.technicianEarning || 0,
        bookingId: booking.id,
        technicianId: booking.technicianId
      };
      await AdminControllers.initiateManualPayout(payload);
      
      // Refresh booking details to reflect new status
      const data = await AdminControllers.getAdminBookingById(bookingId);
      setBooking(data);
    } catch (error) {
      console.error("Failed to initiate payout:", error);
    } finally {
      setIsPaying(false);
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  if (!booking) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography color="error" variant="h6">Booking not found or could not be loaded.</Typography>
      </Box>
    );
  }

  const customerName = booking.customer ? `${booking.customer.firstName} ${booking.customer.lastName}` : "N/A";
  const technicianName = booking.technician ? `${booking.technician.firstName} ${booking.technician.lastName}` : "Not Assigned";
  
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ArrowLeft size={20} className="text-slate-600" />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Booking Details</h1>
              <Chip 
                label={`Status: ${booking.status || "N/A"}`} 
                size="small" 
                icon={<CheckCircle size={14} className="text-emerald-700" />}
                sx={{ fontWeight: 700, backgroundColor: "#d1fae5", color: "#065f46", px: 1 }} 
              />
            </div>
            <p className="text-slate-500 text-sm mt-1 flex items-center gap-2">
              <CalendarDays size={14} /> 
              Scheduled for {booking.scheduledAtIst || new Date(booking.scheduledAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <Grid container spacing={3}>
        {/* Customer Details */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card 
            elevation={0} 
            sx={{ 
              p: 3.5, 
              borderRadius: 4, 
              height: '100%',
              border: '1px solid',
              borderColor: 'slate.100',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
              transition: 'transform 0.2s ease',
              '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3, pb: 2, borderBottom: '1px dashed #e2e8f0' }}>
              <Box sx={{ p: 1, borderRadius: 2, backgroundColor: '#f0fdf4' }}>
                <User size={22} className="text-emerald-600" />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>Customer Profile</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'baseline' }}>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary', minWidth: '80px' }}>Name:</Typography>
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#0f172a', fontSize: '1.05rem' }}>{customerName}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'baseline' }}>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary', minWidth: '80px', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Phone size={16} /> Phone:
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#334155' }}>{booking.customer?.phone || "N/A"}</Typography>
              </Box>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'baseline' }}>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary', minWidth: '80px', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Mail size={16} /> Email:
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#334155' }}>{booking.customer?.email || "N/A"}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'flex-start' }}>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary', minWidth: '80px', display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.2 }}>
                  <MapPin size={16} /> Address:
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: '#334155', flex: 1, lineHeight: 1.5 }}>
                  {booking.address ? `${booking.address.fullAddress}, ${booking.address.city}, ${booking.address.state} - ${booking.address.pincode}` : "N/A"}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>

        {/* Technician Details */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card 
            elevation={0} 
            sx={{ 
              p: 3.5, 
              borderRadius: 4, 
              height: '100%',
              border: '1px solid',
              borderColor: 'slate.100',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
              transition: 'transform 0.2s ease',
              '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3, pb: 2, borderBottom: '1px dashed #e2e8f0' }}>
              <Box sx={{ p: 1, borderRadius: 2, backgroundColor: '#eff6ff' }}>
                <Wrench size={22} className="text-blue-600" />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>Technician Assigned</Typography>
            </Box>
            
            {booking.technician ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'baseline' }}>
                  <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary', minWidth: '80px' }}>Name:</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: '#0f172a', fontSize: '1.05rem' }}>{technicianName}</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'baseline' }}>
                  <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary', minWidth: '80px', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Phone size={16} /> Phone:
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: '#334155' }}>{booking.technician.phone || "N/A"}</Typography>
                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'baseline' }}>
                  <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary', minWidth: '80px', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Mail size={16} /> Email:
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: '#334155' }}>{booking.technician.email || "N/A"}</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
                  <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary', minWidth: '80px', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Star size={16} /> Rating:
                  </Typography>
                  <Chip 
                    icon={<Star size={12} className="text-amber-500" />} 
                    label={booking.technician.overallRating ? `${booking.technician.overallRating} / 5` : "Unrated"} 
                    size="small" 
                    sx={{ fontWeight: 700, backgroundColor: '#fffbeb', color: '#b45309' }} 
                  />
                </Box>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#f8fafc', borderRadius: 3, border: '1px dashed #cbd5e1' }}>
                <Typography color="text.secondary" sx={{ fontWeight: 600 }}>Technician not yet assigned</Typography>
              </Box>
            )}
          </Card>
        </Grid>

        {/* Service Details */}
        <Grid size={{ xs: 12 }}>
          <Card 
            elevation={0} 
            sx={{ 
              p: 3.5, 
              borderRadius: 4, 
              border: '1px solid',
              borderColor: 'slate.100',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
              <Box sx={{ p: 1, borderRadius: 2, backgroundColor: '#f3e8ff' }}>
                <LayoutGrid size={22} className="text-purple-600" />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>Service Information</Typography>
            </Box>
            
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, md: 5 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', mb: 0.5 }}>Service Requested</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#0f172a' }}>{booking.service?.name}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', mb: 0.5 }}>Description</Typography>
                    <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.6 }}>{booking.service?.description}</Typography>
                  </Box>
                </Box>
              </Grid>
              
              <Grid size={{ xs: 12, md: 7 }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', mb: 2 }}>Customer Selections</Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                  {booking.serviceSpecifications && booking.serviceSpecifications.length > 0 ? (
                    booking.serviceSpecifications.map((spec: any, idx: number) => {
                      const specDef = booking.service?.specifications?.find((s: any) => 
                        s.id === spec.specificationId || 
                        (s.type === 'select' && Array.isArray(s.values) && s.values.includes(spec.value))
                      );
                      if (!specDef) return null;
                      
                      const label = specDef.name;
                      return (
                        <Box key={idx} sx={{ display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc', p: 2, borderRadius: 2, border: '1px solid #f1f5f9' }}>
                          <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, mb: 0.5 }}>{label}</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 700, color: '#334155' }}>{spec.value}</Typography>
                        </Box>
                      );
                    })
                  ) : (
                    <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>No additional specifications provided.</Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        {/* Payment & Payout Info */}
        <Grid size={{ xs: 12 }}>
          <Card 
            elevation={0} 
            sx={{ 
              p: 3.5, 
              borderRadius: 4, 
              border: '1px solid #e2e8f0', 
              background: 'linear-gradient(to bottom, #f8fafc, #ffffff)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4, pb: 2, borderBottom: '2px solid #e2e8f0' }}>
              <Box sx={{ p: 1.5, borderRadius: 2, backgroundColor: '#059669', color: 'white', boxShadow: '0 4px 10px rgba(5,150,105,0.2)' }}>
                <Wallet size={24} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a' }}>Payment & Payout Matrix</Typography>
            </Box>
            
            <Grid container spacing={3}>
              {/* Customer Payment */}
              <Grid size={{ xs: 12, md: 4 }}>
                <Paper sx={{ p: 3, borderRadius: 3, border: "1px solid #e2e8f0", height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                  <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 700, letterSpacing: '0.05em' }}>Customer Payment</Typography>
                  <Box sx={{ my: 2 }}>
                    <Chip 
                      label={booking.bookingPaymentStatus || "N/A"} 
                      size="medium" 
                      sx={{ fontWeight: 700, px: 1, backgroundColor: booking.bookingPaymentStatus === 'PAID' ? "#d1fae5" : "#fef3c7", color: booking.bookingPaymentStatus === 'PAID' ? "#065f46" : "#d97706" }} 
                    />
                  </Box>
                  <Divider sx={{ my: 1.5 }} />
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, mb: 0.5 }}>Total Collected</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: "#059669" }}>₹{booking.totalAmount || "0.00"}</Typography>
                </Paper>
              </Grid>
              
              {/* Breakdowns */}
              <Grid size={{ xs: 12, md: 4 }}>
                <Paper sx={{ p: 3, borderRadius: 3, border: "1px dashed #cbd5e1", height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc' }}>
                  <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 700, letterSpacing: '0.05em', mb: 2 }}>Pricing Breakdown</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
                      {booking.service?.pricingRule?.isServiceBasePriceApplied && (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569' }}>Service Base Price</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 700, color: '#0f172a' }}>₹{booking.priceBreakdown?.serviceBasePrice || 0}</Typography>
                        </Box>
                      )}
                      {booking.service?.pricingRule?.isSurgeEnabled && (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569' }}>Surge Charge</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 700, color: '#0f172a' }}>₹{booking.priceBreakdown?.surgeCharge || 0}</Typography>
                        </Box>
                      )}
                      {booking.service?.pricingRule?.isDistanceKmApplied && (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569' }}>Distance Charge</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 700, color: '#0f172a' }}>₹{booking.priceBreakdown?.distanceCharge || 0}</Typography>
                        </Box>
                      )}
                      {booking.service?.pricingRule?.isWeekendApplied && (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569' }}>Weekend Charge</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 700, color: '#0f172a' }}>₹{booking.priceBreakdown?.weekendCharge || 0}</Typography>
                        </Box>
                      )}
                      {booking.service?.pricingRule?.isPeakHourApplied && (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569' }}>Peak Hour Charge</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 700, color: '#0f172a' }}>₹{booking.priceBreakdown?.peakHourCharge || 0}</Typography>
                        </Box>
                      )}
                      {booking.service?.pricingRule?.isEmergencyApplied && (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569' }}>Emergency Charge</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 700, color: '#0f172a' }}>₹{booking.priceBreakdown?.emergencyCharge || 0}</Typography>
                        </Box>
                      )}
                      {booking.service?.pricingRule?.isPlatformFeeApplied && (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569' }}>Platform Fee</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 700, color: '#0f172a' }}>₹{booking.priceBreakdown?.platformFee || 0}</Typography>
                        </Box>
                      )}
                      {booking.service?.pricingRule?.isGstApplied && (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569' }}>GST</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 700, color: '#0f172a' }}>₹{booking.priceBreakdown?.gst || 0}</Typography>
                        </Box>
                      )}
                      <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto', p: 1.5, backgroundColor: '#e0f2fe', borderRadius: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 800, color: '#0369a1' }}>Platform Earning</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 800, color: '#0284c7' }}>₹{booking.priceBreakdown?.platformEarning || 0}</Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
              
              {/* Technician Payout */}
              <Grid size={{ xs: 12, md: 4 }}>
                <Paper sx={{ p: 3, borderRadius: 3, border: "2px solid", borderColor: booking.technicianPayoutStatus === 'PAID' ? '#10b981' : '#e2e8f0', height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                  <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 700, letterSpacing: '0.05em' }}>Technician Payout</Typography>
                  <Box sx={{ my: 2 }}>
                    <Chip 
                      label={booking.technicianPayoutStatus || "N/A"} 
                      size="medium" 
                      sx={{ fontWeight: 700, px: 1, backgroundColor: booking.technicianPayoutStatus === 'PAID' ? "#d1fae5" : "#fef3c7", color: booking.technicianPayoutStatus === 'PAID' ? "#065f46" : "#d97706" }} 
                    />
                  </Box>
                  <Divider sx={{ my: 1.5 }} />
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, mb: 0.5 }}>Payable Amount</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: "#0f172a" }}>₹{booking.priceBreakdown?.technicianEarning || "0.00"}</Typography>
                  
                  {booking.technician?.payoutAccounts && booking.technician.payoutAccounts.length > 0 && (
                    <Box sx={{ mt: 2, p: 2, backgroundColor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0' }}>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: '#475569', mb: 1 }}>Payout Details</Typography>
                      {booking.technician.payoutAccounts.map((acc: any, index: number) => (
                        <Box key={index} sx={{ mb: index !== booking.technician!.payoutAccounts!.length - 1 ? 1.5 : 0 }}>
                          {acc.accountType === 'VPA' ? (
                            <Box>
                              <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>UPI ID</Typography>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: '#0f172a' }}>{acc.upiId || 'N/A'}</Typography>
                            </Box>
                          ) : (
                            <Box>
                              <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>Bank Account</Typography>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: '#0f172a' }}>{acc.bankName} - {acc.accountNumber}</Typography>
                              <Typography variant="caption" sx={{ color: '#64748b', display: 'block', mt: 0.5 }}>IFSC: {acc.ifscCode}</Typography>
                              <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>Holder: {acc.accountHolderName}</Typography>
                            </Box>
                          )}
                        </Box>
                      ))}
                    </Box>
                  )}
                  
                  <Box sx={{ mt: 'auto', pt: 3 }}>
                    <Button 
                      variant="contained" 
                      fullWidth
                      size="large"
                      sx={{ 
                        backgroundColor: "#059669", 
                        "&:hover": { backgroundColor: "#047857" },
                        textTransform: "none",
                        fontWeight: 700,
                        fontSize: '1rem',
                        py: 1.2,
                        borderRadius: 2,
                        boxShadow: booking.technicianPayoutStatus !== 'PAID' ? '0 8px 20px -6px rgba(5,150,105,0.4)' : 'none'
                      }}
                      disabled={isPaying || booking.technicianPayoutStatus === 'PAID' || booking.bookingPaymentStatus !== 'PAID'}
                      onClick={handleInitiatePayout}
                    >
                      {isPaying ? <CircularProgress size={24} color="inherit" /> : (booking.technicianPayoutStatus === 'PAID' ? 'Payout Completed' : 'Initiate Payout')}
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
