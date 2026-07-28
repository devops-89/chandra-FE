'use client';

import { useEffect } from 'react';
import { Box, Card, CardHeader, CardContent, Typography, Button, IconButton, CircularProgress } from '@mui/material';
import { LocationOn, ChevronRight, Edit } from '@mui/icons-material';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchCustomerAddresses } from '@/redux/slices/customerProfileSlice';

export default function SavedAddressesWidget() {
  const dispatch = useAppDispatch();
  const { profile, isLoading } = useAppSelector((state) => state.customerProfile);

  const addresses = profile?.addresses || [];
  const displayAddresses = addresses.slice(0, 2); // Show up to 2 addresses

  return (
    <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', height: '100%' }}>
      <CardHeader 
        title={
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Saved Addresses</Typography>
        }
        action={
          <Button 
            component={Link} 
            href="/customer/addresses" 
            endIcon={<ChevronRight />}
            color="success"
            size="small"
            sx={{ fontWeight: 600 }}
          >
            Manage
          </Button>
        }
        sx={{ borderBottom: '1px solid', borderColor: 'divider', px: 3, py: 2 }}
      />
      
      <CardContent sx={{ p: 0 }}>
        {isLoading && addresses.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress color="success" size={30} />
          </Box>
        ) : addresses.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography color="text.secondary" sx={{ fontWeight: 500 }} gutterBottom>No Addresses Saved</Typography>
            <Button component={Link} href="/customer/addresses/add" variant="outlined" color="success" size="small" sx={{ mt: 1, borderRadius: 2 }}>
              Add New Address
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {displayAddresses.map((address: any, index: number) => (
              <Box 
                key={address.id || index}
                sx={{ 
                  p: 3, 
                  display: 'flex', 
                  alignItems: 'flex-start',
                  gap: 2,
                  borderBottom: index !== displayAddresses.length - 1 ? '1px solid' : 'none',
                  borderColor: 'divider',
                  '&:hover': { bgcolor: 'grey.50' }
                }}
              >
                <Box sx={{ p: 1.5, bgcolor: 'success.50', borderRadius: 2, color: 'success.main' }}>
                  <LocationOn fontSize="small" />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                    {address.label || 'Address'}
                    {address.isDefault && (
                      <Typography component="span" variant="caption" sx={{ ml: 1, color: 'success.main', bgcolor: 'success.50', px: 1, py: 0.2, borderRadius: 1, fontWeight: 600 }}>
                        Default
                      </Typography>
                    )}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {address.fullAddress}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
