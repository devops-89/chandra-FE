export interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
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