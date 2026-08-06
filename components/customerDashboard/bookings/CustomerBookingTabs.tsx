'use client';

import { Box, Tab, Tabs, Typography } from '@mui/material';

export type CustomerBookingTab =
  | 'all'
  | 'pending'
  | 'accepted'
  | 'completed'
  | 'cancelled';

interface Props {
  active: CustomerBookingTab;
  onChange: (tab: CustomerBookingTab) => void;
}

const CustomerBookingTabs = ({ active, onChange }: Props) => {
  const tabs: { id: CustomerBookingTab; label: string }[] = [
    { id: 'all', label: 'All Bookings' },
    { id: 'pending', label: 'Pending' },
    { id: 'accepted', label: 'Accepted' },
    { id: 'completed', label: 'Completed' },
    { id: 'cancelled', label: 'Cancelled' },
  ];

  return (
    <Tabs
      value={active}
      onChange={(_, newValue) => onChange(newValue)}
      variant="scrollable"
      scrollButtons="auto"
      sx={{
        minHeight: 48,
        '& .MuiTabs-indicator': {
          backgroundColor: '#059669',
          height: 3,
          borderRadius: '3px 3px 0 0',
        },
        borderBottom: '1px solid #e2e8f0',
        mb: 2,
        px: { xs: 0, sm: 2 },
      }}
    >
      {tabs.map((val) => (
        <Tab
          key={val.id}
          value={val.id}
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                variant="body2"
                sx={{ fontWeight: active === val.id ? 700 : 500 }}
              >
                {val.label}
              </Typography>
            </Box>
          }
          sx={{
            textTransform: 'none',
            minWidth: 'auto',
            px: { xs: 2, sm: 3 },
            color: '#64748b',
            '&.Mui-selected': { color: '#059669' },
          }}
        />
      ))}
    </Tabs>
  );
};

export default CustomerBookingTabs;
