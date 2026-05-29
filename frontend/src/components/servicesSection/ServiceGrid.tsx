'use client';

import Grid from '@mui/material/Grid';
import { services } from '@/constants/services/serviceData';
import { ServiceCard } from './ServiceCard';

export function ServiceGrid() {
  return (
    <Grid container spacing={3}>
      {services.map((service) => (
        <Grid
          key={service.id}
          size={{
            xs: 12,
            md: service.gridSize.md,
          }}
        >
          <ServiceCard service={service} />
        </Grid>
      ))}
    </Grid>
  );
}