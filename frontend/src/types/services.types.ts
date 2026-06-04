export interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
  slug: string;
  gridSize: {
    md: number;
  };
}

export interface ServiceImageProps {
  src: string;
  alt: string;
  alignRight?: boolean;
}

export interface ServiceCardProps {
  service: Service;
  alignRight?: boolean;
}

export type Props = {
  service: string;
  date: string;
  time: string;
  status: string;
};