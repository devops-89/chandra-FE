'use client';

import { Settings, Shield, Star } from '@mui/icons-material';
import { Avatar, Box, Button, Card, CardContent, CircularProgress,LinearProgress, Typography } from '@mui/material';
import Link from 'next/link';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';

export default function ProfileSummaryWidget() {
  const dispatch = useAppDispatch();
  const { profile, isLoading } = useAppSelector((state) => state.customerProfile);

  if (isLoading && !profile) {
    return (
      <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', height: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', minHeight: 200 }}>
          <CircularProgress color="success" />
        </Box>
      </Card>
    );
  }

  if (!profile) {
    return null;
  }

  // Calculate profile completion percentage (mock logic)
  const completionFields = [profile.firstName, profile.phone, profile.profileImage];
  const completedCount = completionFields.filter(Boolean).length;
  const completionPercentage = Math.round((completedCount / completionFields.length) * 100);

  return (
    <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', height: '100%' }}>
      <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Profile Summary</Typography>
          <Button 
            component={Link} 
            href="/customer/profile"
            size="small"
            startIcon={<Settings fontSize="small" />}
            sx={{ color: 'text.secondary', '&:hover': { bgcolor: 'grey.100' }, fontSize: { xs: '0.75rem', sm: '1rem' } }}
          >
            Manage
          </Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          <Avatar 
            src={profile.profileImage || undefined} 
            sx={{ width: 64, height: 64, bgcolor: 'success.main', fontSize: '1.5rem' }}
          >
            {profile.firstName?.[0] || 'C'}
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', lineHeight: 1.2 }}>
              {profile.firstName} {profile.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {profile.email}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
              <Shield sx={{ fontSize: 16, color: 'success.main' }} />
              <Typography variant="caption" sx={{ fontWeight: 600, color: 'success.main' }}>
                Verified User
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ mt: 'auto' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>Profile Completion</Typography>
            <Typography variant="body2" color="success.main" sx={{ fontWeight: 'bold' }}>{completionPercentage}%</Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={completionPercentage} 
            color="success"
            sx={{ height: 8, borderRadius: 4, bgcolor: 'success.50' }} 
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Star sx={{ color: '#f59e0b' }} />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>Loyalty Points</Typography>
            </Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
              0
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
