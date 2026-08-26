'use client';

import { ChevronRight, Star } from '@mui/icons-material';
import { Avatar, Box, Button, Card, CardContent, CardHeader, CircularProgress,Typography } from '@mui/material';
import Link from 'next/link';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchFavouriteTechnicians } from '@/redux/slices/favouriteTechnicianSlice';

export default function FavoriteTechWidget() {
  const dispatch = useAppDispatch();
  const { technicians, isLoading } = useAppSelector((state) => state.favouriteTechnicians);

  useEffect(() => {
    dispatch(fetchFavouriteTechnicians());
  }, [dispatch]);

  const displayTechs = technicians.slice(0, 3); // Show top 3

  return (
    <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', height: '100%' }}>
      <CardHeader 
        title={
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Favorite Pros</Typography>
        }
        action={
          <Button 
            component={Link} 
            href="/customer/profile/favorite-technicians" 
            endIcon={<ChevronRight />}
            color="success"
            size="small"
            sx={{ fontWeight: 600 }}
          >
            View All
          </Button>
        }
        sx={{ borderBottom: '1px solid', borderColor: 'divider', px: 3, py: 2 }}
      />
      
      <CardContent sx={{ p: 0 }}>
        {isLoading && technicians.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress color="success" size={30} />
          </Box>
        ) : technicians.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography color="text.secondary" sx={{ fontWeight: 500 }}>No Favorite Pros Yet</Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {displayTechs.map((tech, index) => (
              <Box 
                key={tech.id}
                sx={{ 
                  p: 3, 
                  display: 'flex', 
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: index !== displayTechs.length - 1 ? '1px solid' : 'none',
                  borderColor: 'divider',
                  '&:hover': { bgcolor: 'grey.50' }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar 
                    src={tech.profileImage || undefined} 
                    sx={{ width: 48, height: 48, bgcolor: 'success.100', color: 'success.dark', fontWeight: 'bold' }}
                  >
                    {tech.firstName?.[0] || 'T'}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                      {tech.firstName} {tech.lastName}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Star sx={{ fontSize: 16, color: '#f59e0b' }} />
                      <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                        Top Rated
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Button 
                  variant="outlined" 
                  color="success" 
                  size="small" 
                  sx={{ borderRadius: 2, minWidth: 'auto', px: 2 }}
                  component={Link}
                  href={`/customer/services`}
                >
                  Book
                </Button>
              </Box>
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
