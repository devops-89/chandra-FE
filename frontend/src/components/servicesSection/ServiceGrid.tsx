'use client';

import Grid from '@mui/material/Grid';

import { ServiceCard } from '@/components/servicesSection/ServiceCard';
import { servicesData } from '@/constants/services/serviceData';

export function ServiceGrid() {
  return (
    <Grid container spacing={3}>
      {servicesData.map((service) => (
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