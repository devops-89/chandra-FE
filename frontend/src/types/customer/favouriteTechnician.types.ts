export interface FavouriteTechnician {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  profileImage: string | null;

  technicianProfile: {
    id: number;
    status: string;
  };

  addedAt: string;
}

export interface GetFavouriteTechniciansResponse {
  success: boolean;
  statusCode: number;
  message: string;

  data: {
    success: boolean;
    message: string;
    data: FavouriteTechnician[];
  };
}