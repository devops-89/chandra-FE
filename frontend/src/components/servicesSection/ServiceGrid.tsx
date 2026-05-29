'use client';

import Grid from '@mui/material/Grid';

import { ServiceCard } from '@/components/servicesSection/ServiceCard';
import { services } from '@/constants/services/serviceData';

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