"use client";

import { CalendarMonth, AccessTime, Refresh, ChevronRight } from '@mui/icons-material';
import { Box, Button, Card, CardContent, Typography, Chip, IconButton } from '@mui/material';
import Link from "next/link";

interface ActiveBookingCardProps {
  activeBooking: any;
}

const ActiveBookingCard = ({ activeBooking }: ActiveBookingCardProps) => {
  if (!activeBooking) {
    return (
      <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', p: 4, bgcolor: 'grey.50' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Typography color="text.secondary" sx={{ fontWeight: 500 }}>No Active Bookings</Typography>
          <Typography variant="body2" color="text.disabled">You don't have any upcoming services right now.</Typography>
          <Button component={Link} href="/customer/services" variant="outlined" color="success" sx={{ mt: 1, borderRadius: 2 }}>
            Book a Service
          </Button>
        </Box>
      </Card>
    );
  }

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #10b981 0%, #34d399 100%)',
        }
      }}
    >
      <Box sx={{ 
        bgcolor: 'success.main', 
        px: { xs: 2, sm: 4 }, 
        py: 2, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Refresh fontSize="small" sx={{ color: 'white', animation: 'spin 3s linear infinite' }} />
          <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 700, textTransform: 'uppercase' }}>
            {activeBooking.status}
          </Typography>
        </Box>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>
          Booking ID: B-{String(activeBooking.id).replace(/\D/g, '')}
        </Typography>
      </Box>

      <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 3 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary' }}>
              {(activeBooking as any).service?.name || (activeBooking as any).serviceName || "Service Booking"}
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ p: 1, bgcolor: 'success.50', borderRadius: 2, display: 'flex' }}>
                  <CalendarMonth sx={{ fontSize: 20, color: 'success.main' }} />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  {(activeBooking as any).scheduledAt || (activeBooking as any).bookingDate ? new Date((activeBooking as any).scheduledAt || (activeBooking as any).bookingDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "-"}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ p: 1, bgcolor: 'success.50', borderRadius: 2, display: 'flex' }}>
                  <AccessTime sx={{ fontSize: 20, color: 'success.main' }} />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  {(activeBooking as any).scheduledAt || (activeBooking as any).bookingDate ? new Date((activeBooking as any).scheduledAt || (activeBooking as any).bookingDate).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) : "-"}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Button
            component={Link}
            href={`/customer/bookings/${activeBooking.id}`}
            variant="contained"
            color="success"
            endIcon={<ChevronRight />}
            sx={{ 
              borderRadius: 2,
              px: 3,
              py: 1.5,
              fontWeight: 600,
              boxShadow: 'none',
              '&:hover': {
                boxShadow: 2,
              },
              width: { xs: '100%', md: 'auto' }
            }}
          >
            View Booking
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ActiveBookingCard;
