"use client";

import Link from 'next/link';
import { 
  Box, Card, CardHeader, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button, Chip, CircularProgress 
} from '@mui/material';
import { ChevronRight } from '@mui/icons-material';

import { useRecentBookings } from "@/hooks/useRecentBookings";

const RecentBookings = () => {
  const { bookings } = useRecentBookings();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'success';
      case 'cancelled': return 'error';
      case 'pending': return 'warning';
      case 'active': return 'info';
      default: return 'default';
    }
  };

  return (
    <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
      <CardHeader 
        title={
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Recent Bookings</Typography>
        }
        action={
          <Button 
            component={Link} 
            href="/customer/bookings" 
            endIcon={<ChevronRight />}
            color="success"
            sx={{ fontWeight: 600 }}
          >
            View All
          </Button>
        }
        sx={{ borderBottom: '1px solid', borderColor: 'divider', px: 3, py: 2.5 }}
      />
      
      {!bookings ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
          <CircularProgress color="success" />
        </Box>
      ) : bookings.length === 0 ? (
        <Box sx={{ p: 6, textAlign: 'center' }}>
          <Typography color="text.secondary" sx={{ fontWeight: 500 }} gutterBottom>No Bookings Found</Typography>
          <Typography variant="body2" color="text.disabled">Your recent bookings will appear here.</Typography>
        </Box>
      ) : (
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ bgcolor: 'grey.50' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Service</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Status</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600, color: 'text.secondary' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking: any) => (
                <TableRow 
                  key={booking.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: 'grey.50' } }}
                >
                  <TableCell>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                      #{booking.id || booking.bookingId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {booking.service?.name || booking.serviceName || "Service"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {booking.scheduledAt 
                        ? new Date(booking.scheduledAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                        : booking.bookingDate || "-"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={booking.status} 
                      size="small"
                      color={getStatusColor(booking.status) as any}
                      sx={{ fontWeight: 600, borderRadius: 1 }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Button 
                      component={Link}
                      href={`/customer/bookings/${booking.id || booking.bookingId}`}
                      size="small"
                      color="success"
                      sx={{ fontWeight: 600 }}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Card>
  );
};

export default RecentBookings;
