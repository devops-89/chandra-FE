export interface AvailabilityResult {
  type: 'success' | 'error';
  message: string;
}

export interface AvailabilityContent {
  title: string;
  image: string;
}