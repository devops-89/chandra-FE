import { servicesData } from '@/constants/services/serviceData';
import type { Service } from '@/types/services.types';

export const findServiceBySlug = (slug: string): Service | undefined => {
  return servicesData.find(service => service.slug === slug);
};

export const findServiceByTitle = (title: string): Service | undefined => {
  return servicesData.find(service => service.title.toLowerCase() === title.toLowerCase());
};

export const getAllServiceSlugs = (): string[] => {
  return servicesData.map(service => service.slug);
};