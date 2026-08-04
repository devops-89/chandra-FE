'use client';

import { Box, Card, CardContent, CircularProgress, Typography } from '@mui/material';

import { DASHBOARD_STATS_DATA } from '@/constants/customerDashboard/sidebar/dashboardStats';
import { useAppSelector } from '@/redux/hooks';
import type { StatsCardProps } from '@/types/dashboardTypes/dashboardOverview.types';

function StatsCard({ icon: Icon, title, value, isHighlighted = false }: StatsCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        transition: 'transform 0.2s, box-shadow 0.2s',
        height: '100%',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3,
        },
      }}
    >
      <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box
            sx={{
              backgroundColor: isHighlighted ? 'success.50' : 'grey.50',
              p: 1.5,
              borderRadius: 2,
              display: 'flex',
            }}
          >
            <Icon className={`w-6 h-6 ${isHighlighted ? 'text-emerald-600' : 'text-slate-600'}`} />
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'medium' }} gutterBottom>
          {title}
        </Typography>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: isHighlighted ? 'success.main' : 'text.primary',
          }}
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default function HeroBookingCard() {
  const { stats, isLoading } = useAppSelector(
    (state) => state.customerDashboard,
  );

  const dashboardStats = [
    {
      ...DASHBOARD_STATS_DATA[0],
      value: stats?.totalBookings ?? 0,
    },
    {
      ...DASHBOARD_STATS_DATA[1],
      value: stats?.upcomingBookings ?? 0,
    },
    {
      ...DASHBOARD_STATS_DATA[2],
      value: stats?.activeBookings ?? 0,
    },
    {
      ...DASHBOARD_STATS_DATA[3],
      value: stats?.savedAddresses ?? 0,
    },
  ];

  return (
    <Box component="section" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h6" color="text.primary" sx={{ fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>
        Dashboard Overview
      </Typography>

      {isLoading && !stats ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
          <CircularProgress color="success" />
        </Box>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' }, gap: 3 }}>
          {dashboardStats.map((stat, index) => (
            <Box key={index}>
              <StatsCard
                icon={stat.icon}
                title={stat.title}
                value={stat.value}
                isHighlighted={stat.isHighlighted}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}