'use client';

import { BuildCircle,ChevronRight } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardHeader, CircularProgress,Typography } from '@mui/material';
import Link from 'next/link';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';

export default function ServicesWidget() {
  const dispatch = useAppDispatch();
  const { items: services, isLoading } = useAppSelector((state) => state.services);

  const displayServices = services.slice(0, 2);

  return (
    <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
      <CardHeader 
        title={
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Featured Services</Typography>
        }
        action={
          <Button 
            component={Link} 
            href="/customer/services" 
            endIcon={<ChevronRight />}
            color="success"
            sx={{ fontWeight: 600 }}
          >
            View All
          </Button>
        }
        sx={{ borderBottom: '1px solid', borderColor: 'divider', px: 3, py: 2.5 }}
      />
      
      <CardContent sx={{ p: 0 }}>
        {isLoading && services.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress color="success" size={30} />
          </Box>
        ) : services.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography color="text.secondary" sx={{ fontWeight: 500 }}>No services available right now.</Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {displayServices.map((service, index) => (
              <Box 
                key={service.id}
                sx={{ 
                  p: 3, 
                  display: 'flex', 
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: index !== displayServices.length - 1 ? '1px solid' : 'none',
                  borderColor: 'divider',
                  '&:hover': { bgcolor: 'grey.50' },
                  flexWrap: 'wrap',
                  gap: 2
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ p: 1.5, bgcolor: 'success.50', borderRadius: 2, color: 'success.main', display: 'flex' }}>
                    <BuildCircle />
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                      {service.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400 }}>
                      {service.description || 'Professional service for your needs'}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Button 
                    variant="contained" 
                    color="success" 
                    size="small" 
                    sx={{ borderRadius: 2, boxShadow: 'none' }}
                    component={Link}
                    href={`/customer/booking?service=${service.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    Book
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
